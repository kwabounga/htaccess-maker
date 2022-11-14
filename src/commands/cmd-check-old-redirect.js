const MD5 = require("crypto-js/md5");
const dbAccess = require("../electron/dbAccess");
const fs = require('fs');
const xml2js = require('xml2js');
const fetch = require("node-fetch");
const logger = require('../electron/logger')

let allRules = [];
let currentActivesUrls = [];
console.log(process.argv);
let scopeID = +process.argv[2]
if(!scopeID){
  console.log('no scopeID provided');
  console.log('set default scopeID 2');
  scopeID = 2 // ( default JJ )
  // process.exit(1);
}
console.log(scopeID);
logger.log(scopeID);


execute(scopeID).then((result)=>{
  //console.log(result);

  result.allHashes.forEach((h,i)=>{
    // console.log('>',h,i)
    const have =result.mapUrlHash.has(h);
    if(!have){
      console.log('>', h, i, result.allTargets[i])
    }
  })
})


async function execute(scope_id){
  let scopeInfo = await getScopeInfo(scope_id) // ici setter ds la conf et recuperer les sitemaps à la volée
  let url = 'https://www.jeujouet.com/pub/media/sitemaps/sitemap.xml'
  let mapUrlHash = await getSiteMapUrls(url).then((jsXml)=>{
    
    const urls = jsXml.urlset.url;
    let mapUrl = new Map();

    const l = urls.length;
    for (let i = 0; i < l; i++) {
      const line = urls[i];
      let u = line.loc[0];
      u = (u.slice(-1) == '/')?u.slice(0,-1):u
      mapUrl.set(MD5(u).toString(), u);
    }
    return mapUrl;
  })

  return { mapUrlHash, allTargets:scopeInfo.allRules, allHashes:scopeInfo.allHashes };
}

async function getSiteMapUrls(url){
  let xml = await fetch(url);
  let body  = await xml.text();
  const parser = new xml2js.Parser();
  return parser.parseStringPromise(body);
}

async function getScopeInfo(scope_id) {
  let scope = await dbAccess.getScopeByMagentoID(scopeID).then((scope)=>{return scope[0]});
  let config = await dbAccess.getScopeConfigByScopeID(scope.id).then((scope_config)=>{return scope_config[0]});
  let [allRules, allHashes] = await dbAccess.getRulesByScopeId(scope.id).then((rules)=>{
    const ar = rules.map((r)=>{
      return r.target; 
    })
    const hs = rules.map((r)=>{
      return MD5(r.target).toString(); 
    })
    return [ar, hs];
  })

  return {scope,config,allRules,allHashes};
}