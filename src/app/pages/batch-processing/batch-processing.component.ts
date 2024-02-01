import { Component, OnInit } from '@angular/core';
import { CsvMakerService } from 'src/app/services/csv-maker.service';
import { DataFromIpcService } from 'src/app/services/data-from-ipc.service';
import { FilesStuffService } from 'src/app/services/files-stuff.service';
import { LoggerService } from 'src/app/services/logger.service';
import { getDateSlug, notEmpty, getArrayDiff } from "src/app/utils/utils";
import { LockedRule } from 'src/app/interfaces/interfaces';
@Component({
  selector: 'app-batch-processing',
  templateUrl: './batch-processing.component.html',
  styleUrls: ['./batch-processing.component.less'],
  host: {'class': 'app-content'}
})
export class BatchProcessingComponent implements OnInit {
  pageLoaded:boolean = false;
  scopesRefs: any = [];
  rulesRefs: any = [];
  backlinksToBeLocked: any = [];
  currentScopeID:number = null;
  rulesToBeProcess: any = [];
  rulesNotToBeProcess: any = new Set();
  csv: string = '';
  redirectTypes: any = {};


  constructor(
    protected dataSrv: DataFromIpcService,
    private logger: LoggerService,
    private csvSrv: CsvMakerService,
    private fileSrv: FilesStuffService,
    ) { }

  async ngOnInit() {
    this.redirectTypes = await this.dataSrv.getRedirectTypesAll();
    this.scopesRefs = await this.dataSrv.getScopesAll();
    setTimeout(()=>{
      this.pageLoaded = true;
    },500)
  }

  async addLockedRulesForBacklinks(file: any, id: any, scopeName = 'full') {
    console.log('-- addLockedRulesForBacklinks --')
    console.log(file.type, file.name, file.path);
    console.log(file)
    console.log(id,scopeName)
    console.log('-- ----------------------------- --')
    this.csv = await file.text()
    console.log(this.csv)
    console.log('-- ----------------------------- --')
    if (this.csv.trim() !== '') {
      const conf = await this.getScopeConfigById(id);
      // const allCurrentScopeRules = await this.dataSrv.getRulesByScopeId(id)
      let tempArray = this.csv.split('\n');
      console.log(tempArray)
    console.log('-- ----------------------------- --')
      let csvHeader = tempArray.shift();
      console.log(csvHeader)
    console.log('-- ----------------------------- --')
      // if(!this.checkBacklinksCsvFormat(csvHeader)){
      if(!this.csvSrv.checkCsvFormatFrom(csvHeader, ['Page ascore','Source title','Source url','Target url'],',')){
        console.warn('Please check the csv format');
        return;
      }
      let redToBeProcessed = tempArray.filter(notEmpty).join('\n');
      // const regExParams = new RegExp('^(.*)(\?\S*)', 'gm'); // $1 url $2 params
      const regExString = '^https?://rms.'+conf.label.toLowerCase()+'\/\?.*&redir=(\S*)'; // $1 redirect
      console.log('STRING:', regExString)
      const regExRms = new RegExp(regExString, 'g'); //  condition is base domain with  www
      const regExCondition = new RegExp('^https?://'+conf.condition, 'g'); //  condition is base domain with  www
      const regExLabel = new RegExp('^https?://'+conf.label.toLowerCase(), 'g'); // label is only -basedomain-.com
      let mappedRed = this.csvSrv.csvToArray(redToBeProcessed).map((row)=>{
        let target = row[3];
        // replace rms. with the good redirection :
        target = target.replace(regExRms, '$1').replace(/%3A/gm,':').replace(/%2F/gm,'/');
        // replace base domaine with www
        target = target.replace(regExCondition, '');
        // replace base url without www
        target = target.replace(regExLabel, '');

        // remove last part of the url ( params )
        target = target.replace(/^(.*)(\?\S*)/gm, '$1')
        return [row[2],target]
      }).filter((row)=>{
        return (
            row[1] != ''
            && row[1] != '/'
            && row[1].indexOf('rms.')== -1
            && row[1].indexOf('https://media.') == -1
            && row[1].indexOf('.jpg') == -1
            && row[1].indexOf('.png') == -1
            && row[1].indexOf('.gif') == -1
            && row[1].indexOf('.cfm') == -1
            && row[1].indexOf('/catalogsearch/result') == -1
          );
      })
      let temp = []
     this.backlinksToBeLocked = mappedRed.sort().filter(r => {
        if (temp.length === 0 || !temp.includes(r[1])) {
          temp.push(r[1])
          return true
        }
        return false
      })
      console.log(this.backlinksToBeLocked);
      console.log(this.backlinksToBeLocked.length);
      console.log(temp.length);
      if(this.backlinksToBeLocked.length){
        this.currentScopeID = id;

      } else {
        this.currentScopeID = null
      }
    }
  }
  async exportFromGoogleSearchConsole(file: any, id: any, scopeName = 'full') {
    console.log('-- exportFromGoogleSearchConsole --')
    console.log(file.type, file.name, file.path);
    console.log(file)
    console.log(id,scopeName)
    console.log('-- ----------------------------- --')
    this.csv = await file.text()

    if (this.csv.trim() !== '') {
      const conf = await this.getScopeConfigById(id);
      const allCurrentScopeRules = await this.dataSrv.getRulesByScopeId(id)
      let tempArray = this.csv.split('\n');
      let csvHeader = tempArray.shift();

      // if(!this.checkGoogleCsvFormat(csvHeader)){
      if(!this.csvSrv.checkCsvFormatFrom(csvHeader, ['URL','Dernière exploration'])){
        console.warn('Please check the csv format');
        return;
      }

      let redToBeProcessed = tempArray.filter(notEmpty);
      const rtLength = redToBeProcessed.length;
      const regExCondition = new RegExp('^https?://'+conf.condition, 'g');
      redToBeProcessed = redToBeProcessed.map((line)=> {
        return line.split(',')[0].replace(regExCondition, '')
      })
      this.rulesToBeProcess = allCurrentScopeRules.filter(r => redToBeProcessed.indexOf(r.origin) != -1 )
      console.log(allCurrentScopeRules);
      console.log(redToBeProcessed);
      console.log(this.rulesToBeProcess);
      this.rulesNotToBeProcess = new Set();
      /* for (let ll = 0; ll < rtLength; ll++) {
        const url = redToBeProcessed[ll];
        //let url = line.split(',')[0];

        // ici
        console.log(url)

      } */
    }
  }
  async export(id: any, scopeName = 'full') {
    let scope_id = +id;
    this.logger.log(`get rules for scope ${scope_id}`)
    if(scope_id === -1){
      this.rulesRefs = await this.dataSrv.getRulesAll()
    }else{
      scopeName = scopeName.replace(/\W+/g,'_')
      this.rulesRefs = await this.dataSrv.getRulesByScopeId(scope_id)
    }
    this.buildFile(this.rulesRefs,`rules_${scopeName}_${getDateSlug()}_.csv`.toLowerCase())
  }

  async onFileSelected(event: any) {
    console.log('onFileSelected');
    const file: any = event.target.files[0];
    if (file) {
      this.logger.log('need processing the file: ' + file.name)
      console.log(file.type, file.name, file.path);
      this.csv = await file.text()//.then((text: string) => text);
    }
    if (this.csv.trim() !== '') {
      let tempArray = this.csv.split('\n');
      let csvHeader = tempArray.shift();

      // if(!this.checkCsvFormat(csvHeader)){
      if(!this.csvSrv.checkCsvFormatFrom(csvHeader, ['id','scope_id','redirect_type_id','origin','target'])){
        console.warn('Please check the csv format');
        return;
      }
      let redToBeProcessed = tempArray.filter(notEmpty);
      const rtLength = redToBeProcessed.length;
      for (let ll = 0; ll < rtLength; ll++) {
        const line = redToBeProcessed[ll];
        let l = line.split(';');

        this.rulesToBeProcess.push({
          id:l[0],
          scope_id:l[1],
          redirect_type_id:l[2],
          origin:l[3],
          target:l[4]
        })
      }
      this.rulesNotToBeProcess = new Set();
    }
  }

  buildFile(rules,fileName){
    // console.log(`get rules `, rules)
    let csvContent = this.csvSrv.makeCsvFromRules(rules)
    this.fileSrv.exportFile(fileName,csvContent)
  }

  // checkCsvFormatFrom(header:string, format:any=[]):boolean {
  //   let headerOk = true;
  //   let col = header.trim().split(';');
  //   for (let i =  0; i < format.length; i++) {
  //     const column = format[i];
  //     if(col[i] !== column){
  //       console.warn(`the first column must be '${column}' current is '${col[i]}'`);
  //       headerOk = false;
  //     }
  //   }

  //   return headerOk;
  // }
  /**
   * needed format: id;scope_id;position;redirect_type_id;origin;target;
   * @param {string} header the csv header
   * @returns {boolean} good csv format or not
   */

  checkCsvFormat(header:string):boolean {
    let headerOk = true;
    let col = header.trim().split(';');
    if(col[0] !== 'id'){
      console.warn(`the first column must be '${'id'}' current is '${col[0]}'`);
      headerOk = false;
    }
    if(col[1] !== 'scope_id'){
      console.warn(`the second column must be '${'scope_id'}' current is '${col[1]}'`);
      headerOk = false;
    }
    if(col[2] !== 'redirect_type_id'){
      console.warn(`the fourth column must be '${'redirect_type_id'}' current is '${col[2]}'`);
      headerOk = false;
    }
    if(col[3] !== 'origin'){
      console.warn(`the fifth column must be '${'origin'}' current is '${col[3]}'`);
      headerOk = false;
    }
    if(col[4] !== 'target'){
      console.warn(`the sixth column must be '${'target'}' current is '${col[4]}'`);
      headerOk = false;
    }
    return headerOk;
  }
  checkBacklinksCsvFormat(header:string):boolean {

    let headerOk = true;
    let col = header.trim().split(',');
    if(col[2] !== 'Source url'){
      console.warn(`the second column must be '${'Source url'}' current is '${col[2]}'`);
      headerOk = false;
    }
    if(col[3] !== 'Target url'){
      console.warn(`the thirth column must be '${'Target url'}' current is '${col[3]}'`);
      headerOk = false;
    }
    return headerOk;
  }
  checkGoogleCsvFormat(header:string):boolean {
    let headerOk = true;
    let col = header.trim().split(',');
    if(col[0] !== 'URL'){
      console.warn(`the first column must be '${'URL'}' current is '${col[0]}'`);
      headerOk = false;
    }
    if(col[1] !== 'Dernière exploration'){
      console.warn(`the second column must be '${'Dernière exploration'}' current is '${col[1]}'`);
      headerOk = false;
    }
    return headerOk;
  }
  /**
   * get all rules ids from rules array
   */
  getIdsFromRules() {
    return this.rulesToBeProcess.map(r => {
      return +r.id;
    })
  }

  /**
   * get the diff between rules-ids and nto-to-be-processed-rules-ids
   * @returns {any[]}
   */
  getIdsToBeProcessed():any{
    // from csv
    let allIds = this.getIdsFromRules();
    // if uncheck some rules
    let notUseIds = [...this.rulesNotToBeProcess];
    return getArrayDiff(allIds, notUseIds);
  }

  /**
   * comment all the selected rules.
   */
  comment(){
    console.log('IN PROGRESS : comment')
    // getArrayDiff
    let diff = this.getIdsToBeProcessed();
    console.log(diff)
    this.dataSrv.commentRules(diff)
    .then(r => {
      console.log(r)
      console.log(`Rules [${diff.join(', ')}] are commented!`)
    })
  }

  /**
   * uncomment all the selected rules.
   */
  uncomment(){
    console.log('IN PROGRESS : uncomment')
    // getArrayDiff
    let diff = this.getIdsToBeProcessed();
    console.log(diff)
    this.dataSrv.unCommentRules(diff)
    .then(r => {
      console.log(r)
      console.log(`Rules [${diff.join(', ')}] are uncommented!`)
    })
  }

  /**
   * delete all the selected rules.
   */
  delete(){
    console.log('TODO: delete', this.getIdsToBeProcessed())
  }

  /**
   * set permanent all the selected rules.
   */
  setPermanent(){
    console.log('TODO: setPermanent', this.getIdsToBeProcessed())
  }

  /**
   * set temporary all the selected rules.
   */
  setTemporary(){
    console.log('TODO: setTemporary', this.getIdsToBeProcessed())
  }

  /**
   * add/remove the specified rule from the dom list
   */
  setUseIt(event: any) {
    // TODO CONTINUE: HERE
    // console.log(event)
    if(event.use){
      console.log(`use the ${event.rule_id} !`)
      this.rulesNotToBeProcess.delete(event.rule_id);
    }else{
      console.log(`not use the ${event.rule_id} !`)
      this.rulesNotToBeProcess.add(event.rule_id);
    }
  }

  lockRules(event:any): void {
    if(this.currentScopeID != null) {

      let lr = this.backlinksToBeLocked.map(r=>{
        return {
          scope_id:this.currentScopeID,
          source:r[0],
          origin:r[1]
        }
      })
      console.log(lr)
      this.dataSrv.uploadLockedRules(lr)
      .then((r:any) => {
        console.log(r)
        console.log(`Rules [${r.join(', ')}] are Locked!`)
      })
    }

  }
   /**
   * get  Scope config handler
   * @param {number} id  the scope id
   * @returns {Promise<any>} the scope
   */
   async getScopeConfigById(id:number): Promise<any> {
    return this.dataSrv.getScopesConfigById(id)
    .then((obj)=>{
      console.log('getScopeConfigById',obj);
      return obj;
    })
  }
//   csvToArray(text) {
//     let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
//     for (l of text) {
//         if ('"' === l) {
//             if (s && l === p) row[i] += l;
//             s = !s;
//         } else if (',' === l && s) l = row[++i] = '';
//         else if ('\n' === l && s) {
//             if ('\r' === p) row[i] = row[i].slice(0, -1);
//             row = ret[++r] = [l = '']; i = 0;
//         } else row[i] += l;
//         p = l;
//     }
//     return ret;
// };

}
