/*
// test diff between Rules and LockedRules
const reader = require('../electron/crud/read');

const ids = [ 1, 2111, 2108, 2029, 2028, 2021, 1999, 1987, 1986, 1983, 1973, 1957, 1950, 1939, 1936, 1887, 1864, 1863, 1861, 1849, 1835, 1825, 1805, 1788, 1734, 1732, 1707, 1703, 1657, 1628, 1610, 1607, 1590, 1589, 1555, 1298, 1295, 1291, 1290, 1289, 1288, 1284, 1283, 1282, 1280, 1278, 1276, 1274, 1273, 1272, 1271, 1269, 1268, 1266, 1265, 1263, 1262, 89, 239, 147, 166, 67, 236, 1244, 208, 1200, 1148, 1081, 1074, 1040, 998, 983, 950, 866, 842, 814, 773, 751, 735, 720, 695, 694, 630, 583, 581, 578, 479, 476, 471, 426, 421, 399, 395, 365, 329, 326, 323 ];
const scope_id = 1;

reader.notLockedRulesfilter(ids, scope_id).then((result)=>{
  console.log('get  notLockedRulesfilter for scope id ', scope_id)
  console.log("from")
  console.log(ids)
  console.log("result")
  console.log(result)

  console.log("new length")
  console.log(ids.length, ">", result.length);

}).then(()=>{
  process.exit(0);
});
*/

const bdd = require('../electron/crud/delete');
const bdi = require('../electron/crud/insert');
// delete by scope id
// bdd.deleteLockedRules(1)
// insert
 bdi.insertLockedRules([{scope_id:1,source:'https://fr.google.com',origin:'/sitemap.xml'}])

// delete one
// bdd.deleteLockedRuleById(4)



.then((response)=>{
  console.log(response)
})

.then(()=>{
  process.exit(0);
});
