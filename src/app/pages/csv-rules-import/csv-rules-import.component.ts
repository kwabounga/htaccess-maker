import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FilesStuffService } from 'src/app/services/files-stuff.service';
import { DataMockService } from 'src/app/services/data-mock.service';
import { DataFromIpcService } from 'src/app/services/data-from-ipc.service';
import { RedirectType, Scope, Rule } from 'src/app/interfaces/interfaces';

import { ElectronService } from 'ngx-electron';
/* import { HttpClient } from '@angular/common/http'; */

@Component({
  selector: 'app-csv-rules-import',
  templateUrl: './csv-rules-import.component.html',
  styleUrls: ['./csv-rules-import.component.css'],
})
export class CsvRulesImportComponent implements OnInit {
  protected has_ipc: boolean = false;
  //percent:number = 0;
  progressCount: number;
  rulesChecked = false;
  checkInProgress = false;
  csv: any;
  redirectTypes: any = {};
  redToBeSaved: any[] = [];
  badRedirections: any[] = [];
  redToBeChecked: any[] = [];
  constructor(
    protected fileStuffSrv: FilesStuffService,
    protected dataSrv: DataFromIpcService,
    private electronSrv: ElectronService,
    private ref: ChangeDetectorRef
  ) {
    this.has_ipc = this.electronSrv.isElectronApp;
    this.csv = '';
    this.redToBeChecked = [];
    this.progressCount = 0;
    
  }

  async ngOnInit() {
    this.redirectTypes = await this.dataSrv.getRedirectTypesAll();
    console.log(this.redirectTypes)
  }

  async checkImport() {
    console.log('checkImport??')
    if (this.electronSrv.isElectronApp) {
      console.log('checkImport', this.redToBeChecked);
      await this.initCheckRuleListener(this.redToBeChecked);
      this.electronSrv.ipcRenderer.send('check:rules', this.redToBeChecked);
      this.checkInProgress = true;
    } else {
      console.log('cest la mer noire');
    }
  }

  downloadCsvSample() {
    const sample = `magento_scope_id;redirect_type;origin;target;
2;permanent;/test.html;www.test.com;
5;temporary;/test.html;www.test.com/test.html;
`;
    this.fileStuffSrv.exportFile('sample.csv', sample);
  }
  uploadCsvRedirect() {
    console.log('uploadCsvRedirect', this.redToBeSaved);
    this.dataSrv.uploadRedirections(this.redToBeSaved)
  }
  testSend() {
    console.log('checkImport', this.redToBeChecked);
    this.checkInProgress = !this.checkInProgress;
  }
  async onFileSelected(event: any) {
    console.log('onFileSelected');
    const file: any = event.target.files[0];
    if (file) {
      console.log(file);
      console.log(file.type, file.name, file.path);
      // console.log(`csv file selected: ${file.path}`)
      this.csv = await file.text().then((text: string) => {
        console.log(text);
        return text;
      });
    } else {
      this.csv = '';
      this.redToBeChecked = [];
      this.progressCount = 0;
      console.log('no csv file selected');
    }
    if (this.csv.trim() !== '') {
      console.log('this.csv ok',this.csv)
      const notEmpty = (r: string) => r.trim() !== '';
      let tempArray = this.csv.split('\n');
      tempArray.shift();
      let redToBeProcessed = tempArray.filter(notEmpty);

      console.log('redToBeProcessed',redToBeProcessed);
      for (const line of redToBeProcessed) {
        console.log('line',line)
        const red: any = {
          perm: 1,
          permanent: 1,
          temp: 2,
          temporary: 2,
        };
        let l = line.split(';');
        let s: Scope = await this.dataSrv.getScopeByMagentoId(parseInt(l[0])).then((scope:Scope)=>{
          console.log('scope',scope)
          return scope;
        });
        console.log('after getScopeByMagentoId')
        let r: RedirectType = await this.dataSrv.getRedirectTypesById(
          parseInt(red[l[1]])
        ).then((redType)=>{
          console.log('redType',redType)
          return redType;
        });
        console.log('after getRedirectTypesById')
        this.redToBeChecked.push({
          scope_id: s.id,
          redirect_type_id: r.id,
          origin: l[2],
          target: l[3],
          active: true,
        });
        this.redToBeChecked.sort((a, b) => a.scope_id - b.scope_id);
      }
      console.log('this.redToBeChecked',this.redToBeChecked);
    }
  }
  changeSave(event: any) {
    console.log('check', event);
  }
  percent() {
    return (100 * this.progressCount) / this.redToBeChecked.length;
  }

  async initCheckRuleListener(rules:any[]) {
      for (let id in rules) {
        let channel = `rule:checked:${id}`
        console.log(id, channel);
         if (this.electronSrv.isElectronApp) {
          this.electronSrv.ipcRenderer.on(
            channel,
            this.checkHandler
            
          );
        } 
        
      }
  }
  checkHandler = (_event:any, response: any) => {
    this.progressCount++;
    //this.percent = ((100 * this.progressCount) / this.redToBeChecked.length)
    console.log('checked',_event, response);
    if(response.ok){
      // rule ok
      this.redToBeSaved.push(response.rule)
    }else{
      // rule KO
      this.badRedirections.push(response)
    }
    if (this.progressCount == this.redToBeChecked.length) {
      this.checkInProgress = false;
      this.rulesChecked = true;
    }
    this.electronSrv.ipcRenderer.removeListener(response.channel, this.checkHandler)
    this.ref.detectChanges();
  }
}
