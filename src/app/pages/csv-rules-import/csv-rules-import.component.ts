import { Component, Input, OnInit, ChangeDetectorRef,ViewChild,ElementRef  } from '@angular/core';
import { FilesStuffService } from 'src/app/services/files-stuff.service';
import { DataMockService } from 'src/app/services/data-mock.service';
import { DataFromIpcService } from 'src/app/services/data-from-ipc.service';
import { RedirectType, Scope, Rule, ScopeConfig } from 'src/app/interfaces/interfaces';
import { ruleSortByOrigin, ruleSortById } from 'src/app/utils/utils';
import { ElectronService } from 'ngx-electron';
import { CsvMakerService } from 'src/app/services/csv-maker.service';
import { EventQueueService } from 'src/app/services/event-queue.service';
import { AppEvent } from 'src/app/events/AppEvent';
import { AppEventType } from 'src/app/types/AppEventType';
import { NotifyEvent } from 'src/app/events/NotifyEvent';
import { ClearNotificationEvent } from 'src/app/events/ClearNotificationEvent';
import { LoggerService } from 'src/app/services/logger.service';
import { Constants } from 'src/app/services/constants';

/* import { HttpClient } from '@angular/common/http'; */

@Component({
  selector: 'app-csv-rules-import',
  templateUrl: './csv-rules-import.component.html',
  styleUrls: ['./csv-rules-import.component.css'],
  host: {'class': 'app-content'}
})
/**
 * Csv Rules Import Page
 */
export class CsvRulesImportComponent implements OnInit {
  protected has_ipc: boolean = false;
  //percent:number = 0;
  progressCount: number;
  rulesChecked = false;
  checkInProgress = false;
  CsvGenerationProgress = false;
  csv: any;
  redirectTypes: any = {};
  scopesRefs: any = {};
  redToBeSaved: any[] = [];
  redToBeUpdated: any[] = [];
  badRedirections: any[] = [];
  redToBeChecked: any[] = [];
  pageLoaded:boolean = false;
  @ViewChild("drag") drag!: any;
  @ViewChild("fileUpload") fileUpload!: any;
  /**
   * constructor
   *
   * @param fileStuffSrv
   * @param dataSrv
   * @param electronSrv
   * @param ref
   */
  constructor(
    protected fileStuffSrv: FilesStuffService,
    protected dataSrv: DataFromIpcService,
    private electronSrv: ElectronService,
    private ref: ChangeDetectorRef,
    private csvSrv : CsvMakerService,
    private eventQueueSrv: EventQueueService,
    private logger: LoggerService,
  ) {
    this.has_ipc = this.electronSrv.isElectronApp;
    this.csv = '';
    this.redToBeChecked = [];
    this.progressCount = 0;

  }

  /**
   * Life cycle intitalization function
   * must be async function because is awaiting the data from dataSrv
   */
  async ngOnInit() {
    this.redirectTypes = await this.dataSrv.getRedirectTypesAll();
    this.scopesRefs = await this.dataSrv.getScopesAll();

    console.log(this.redirectTypes)
    console.log(navigator.onLine)
    this.dataSrv.checkIfOnline().then((response:any)=>{
      this.logger.log(response.ok?`ready to import and check new rules`:`you are not online, the rules check will not work`);
    })

    this.pageLoaded = true;
  }

  // drag and drop file in the  windows
  // https://www.geeksforgeeks.org/drag-and-drop-files-in-electronjs/
  dragEnter(event:any){
    console.log('File is in the Drop Space');
    // this.eventQueueSrv.dispatch(new NotifyEvent('File is in the Drop Space'));
    this.logger.log('File is in the Drop Space');
  }
  dragLeave(event:any){
    console.log('File has left the Drop Space');
    this.logger.clear();
    /* this.eventQueueSrv.dispatch(new ClearNotificationEvent()); */
  }
  dragOver(event:any){
    event.preventDefault();
    event.stopPropagation();
  }
  onDrop(event:any){
    console.log('drop drop')
  }


  /**
   * checkImport Method
   */
  async checkImport() {
    console.log('checkImport??')
    if (this.electronSrv.isElectronApp) {
      console.log('checkImport', this.redToBeChecked);
      await this.initCheckRuleListener(this.redToBeChecked);
      this.electronSrv.ipcRenderer.send('check:rules', this.redToBeChecked);
      this.checkInProgress = true;
    } else {
      console.log('something goes wrong with the check');
    }

  }

  // TODO: creation d'un input pour ajouter des règles à la main

  /**
   * give a csv file sample
   */
   async generateSampleFile() {
    let sample = `magento_scope_id;redirect_type;origin;target;\n`;
    let scopes:Scope[] = await this.dataSrv.getScopesAll();
    for(const scope of scopes){
      console.log('scope',scope)
      let scopeConfig:ScopeConfig = await this.dataSrv.getScopesConfigById(scope.id);
      sample += `${scope.magento_scope_id};perm;/sample;${scopeConfig.condition};\n`;
    }
    return sample;
  }

  async downloadCsvSample() {
    this.CsvGenerationProgress = true;
    let sample = await this.generateSampleFile();
    this.fileStuffSrv.exportFile('sample.csv', sample);
    setTimeout(()=>{
      this.CsvGenerationProgress = false;
    },1000)
  }

  /**
   * Upload safe new redirections
   */
  uploadCsvRedirect() {
    console.log('uploadCsvRedirect', this.redToBeSaved);
    this.dataSrv.uploadRedirections(this.redToBeSaved)
  }
  UpdateExistingRedirections() {
    console.log('UpdateExistingRedirections', this.redToBeUpdated);
    this.dataSrv.updateRulesByImport(this.redToBeUpdated.map((obj) => {
      return obj.rule;
    })).then((response)=>{
      console.log(response);
    })

  }
  ExportBadRedirections() {
    console.log('ExportBadRedirections', this.badRedirections);
    this.fileStuffSrv.exportFile('bad_redirections.csv', this.csvSrv.makeCsvFromBadRedirections(this.badRedirections));

  }

  // TODO: verifier les doublons d'origines dans le tableau d'import des règles

  /**
   * On file selected handler
   *
   * /!\ must be a csv with well formated /!\
   * @see: downloadSample() to get te good format
   *
   * get the file / process and convert into rule[] object
   * ready to be checked
   * @param {string} event the csv content
   */
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
      let csvHeader = tempArray.shift();
      if(!this.checkCsvFormat(csvHeader)){
        console.log('Please check the csv format');
        return
      }
      let redToBeProcessed = tempArray.filter(notEmpty);

      console.log('redToBeProcessed',redToBeProcessed);
      for (const line of redToBeProcessed) {
        console.log('line',line)
        /* get redirection alias from constants */
        const red: any = Constants.RA;

        let l = line.split(';');
        let s: Scope = await this.dataSrv.getScopeByMagentoId(parseInt(l[0])).then((scope:Scope) => {
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
        this.redToBeChecked.sort(ruleSortById);
        this.redToBeChecked.sort(ruleSortByOrigin);
      }
      console.log('this.redToBeChecked',this.redToBeChecked);
    }
  }
  checkCsvFormat(header:string):boolean {
    //magento_scope_id;redirect_type;origin;target;
    let headerOk = true;
    let col = header.trim().split(';');
    if(col[0] !== 'magento_scope_id'){
      console.log(`the first column must be '${'magento_scope_id'}' current is '${col[0]}'`);
      headerOk = false;
    }
    if(col[1] !== 'redirect_type'){
      console.log(`the second column must be '${'magento_scope_id'}' current is '${col[1]}'`);
      headerOk = false;
    }
    if(col[2] !== 'origin'){
      console.log(`the thirth column must be '${'origin'}' current is '${col[2]}'`);
      headerOk = false;
    }
    if(col[3] !== 'target'){
      console.log(`the fourth column must be '${'target'}' current is '${col[4]}'`);
      headerOk = false;
    }
    return headerOk;
  }

  /**
   * change a rule on the fly
   * in the toBeprocessed Redirection array
   * if we see an error before checking rules validity
   * @param {rule} event the rule to be changed
   */
  // TODO: implement changeSave
  changeSave(event: any) {
    console.log('check', event);
  }

  /**
   * Used for progress bar
   * @returns {number} progression percent
   */
  get percent() {
    return (100 * this.progressCount) / this.redToBeChecked.length;
  }

  /**
   * On the fly event registrer for check rule
   * @param rules
   */
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
  /**
   * check Rule handler
   *
   * apply progression for progress bar
   * verify if the response is good or bad
   * remove the associated listener
   * @param _event
   * @param {any} response
   */
  checkHandler = (_event:any, response: any) => {
    this.progressCount++;
    //this.percent = ((100 * this.progressCount) / this.redToBeChecked.length)
    console.log('checked',_event, response);
    if(response.ok){
      // rule ok
      this.redToBeSaved.push(response.rule)
    }else{
      // rule KO
      if(response.reason_code == Constants.RC.EXISTYET){
        this.redToBeUpdated.push(response)
      }else{

        this.badRedirections.push(response)
      }
    }
    // update progression
    if (this.progressCount == this.redToBeChecked.length) {
      this.checkInProgress = false;
      this.rulesChecked = true;
    }
    // remove current listener
    this.electronSrv.ipcRenderer.removeListener(response.channel, this.checkHandler)

    // force update the dom from event, see: readme for more informations
    this.ref.detectChanges();
  }
}
