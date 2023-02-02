import { Component, OnInit } from '@angular/core';
import { CsvMakerService } from 'src/app/services/csv-maker.service';
import { DataFromIpcService } from 'src/app/services/data-from-ipc.service';
import { FilesStuffService } from 'src/app/services/files-stuff.service';
import { LoggerService } from 'src/app/services/logger.service';
import { getDateSlug, notEmpty } from "src/app/utils/utils";
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
  rulesToBeProcess: any = [];
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
      this.csv = await file.text().then((text: string) => {
        // console.log(text);
        return text;
      });
    }
    if (this.csv.trim() !== '') {
      let tempArray = this.csv.split('\n');
      let csvHeader = tempArray.shift();
      if(!this.checkCsvFormat(csvHeader)){
        console.warn('Please check the csv format');
        return
      }
      let redToBeProcessed = tempArray.filter(notEmpty);
      const rtLength = redToBeProcessed.length;
      for (let ll = 0; ll < rtLength; ll++) {
        const line = redToBeProcessed[ll];
        let l = line.split(';');
        console.log(l)
        this.rulesToBeProcess.push({
          id:l[0],
          scope_id:l[1],
          redirect_type_id:l[2],
          origin:l[3],
          target:l[4]
        })
      }
    }
  }

  buildFile(rules,fileName){
    console.log(`get rules `, rules)
    let csvContent = this.csvSrv.makeCsvFromRules(rules)
    this.fileSrv.exportFile(fileName,csvContent)
  }


  checkCsvFormat(header:string):boolean {
    //id;scope_id;position;redirect_type_id;origin;target;
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
  // Button Actions from the dom
  getIdsFromRules() {
    return this.rulesToBeProcess.map(r => {
      return +r.id;
    })
  }
  comment(){ 
    console.log('IN PROGRESS : comment')
    let allIds = this.getIdsFromRules()
    this.dataSrv.commentRules(allIds)
    .then(r => {
      console.log(r)
      console.log(`Rules [${allIds.join(', ')}] are commented!`)
    })
   }
  uncomment(){ 
    console.log('IN PROGRESS : uncomment')
    let allIds = this.getIdsFromRules()
    this.dataSrv.unCommentRules(allIds)
    .then(r => {
      console.log(r)
      console.log(`Rules [${allIds.join(', ')}] are uncommented!`)
    })
   }
  delete(){ 
    console.log('TODO: delete', this.getIdsFromRules())
   }
  setPermanent(){ 
    console.log('TODO: setPermanent', this.getIdsFromRules())
   }
  setTemporary(){ 
    console.log('TODO: setTemporary', this.getIdsFromRules())
   }

}
