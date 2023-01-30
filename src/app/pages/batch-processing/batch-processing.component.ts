import { Component, OnInit } from '@angular/core';
import { CsvMakerService } from 'src/app/services/csv-maker.service';
import { DataFromIpcService } from 'src/app/services/data-from-ipc.service';
import { FilesStuffService } from 'src/app/services/files-stuff.service';
import { LoggerService } from 'src/app/services/logger.service';
import { getDateSlug } from "src/app/utils/utils";
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
  constructor(
    protected dataSrv: DataFromIpcService,
    private logger: LoggerService,
    private csvSrv: CsvMakerService,
    private fileSrv: FilesStuffService,
    ) { }

  async ngOnInit() {
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
    }
  }
  buildFile(rules,fileName){
    console.log(`get rules `, rules)
    let csvContent = this.csvSrv.makeCsvFromRules(rules)
    this.fileSrv.exportFile(fileName,csvContent)
  }
}
