import { Component, Input, OnInit, ChangeDetectorRef,ViewChild,ElementRef  } from '@angular/core';
import { FilesStuffService } from 'src/app/services/files-stuff.service';
import { DataMockService } from 'src/app/services/data-mock.service';
import { DataFromIpcService } from 'src/app/services/data-from-ipc.service';
import { RedirectType, Scope, Rule, ScopeConfig } from 'src/app/interfaces/interfaces';
import { ruleSortByOrigin, ruleSortById, notEmpty } from 'src/app/utils/utils';
import { ElectronService } from 'ngx-electron';
import { CsvMakerService } from 'src/app/services/csv-maker.service';
import { EventQueueService } from 'src/app/services/event-queue.service';
import { AppEvent } from 'src/app/events/AppEvent';
import { AppEventType } from 'src/app/types/AppEventType';
import { NotifyEvent } from 'src/app/events/NotifyEvent';
import { ClearNotificationEvent } from 'src/app/events/ClearNotificationEvent';
import { LoggerService } from 'src/app/services/logger.service';
import { Constants } from 'src/app/services/constants';
import { TranslateService } from 'src/app/components/commons/translate/translate.service';


@Component({
  selector: 'app-csv-rules-import',
  templateUrl: './csv-rules-import.component.html',
  styleUrls: ['./csv-rules-import.component.less'],
  host: {'class': 'app-content'}
})
/**
 * Csv Rules Import Page
 */
export class CsvRulesImportComponent implements OnInit {
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
    private elemt: ElementRef,
    private t:TranslateService,
  ) {
    this.has_ipc = this.electronSrv.isElectronApp;
    this.csv = '';
    this.redToBeChecked = [];
    this.progressCount = 0;

  }

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
      // console.log('scope',scope)
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
    this.dataSrv.uploadRules(this.redToBeSaved)
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
      // console.log(file);
      console.log(file.type, file.name, file.path);
      // console.log(`csv file selected: ${file.path}`)
      this.csv = await file.text().then((text: string) => {
        // console.log(text);
        return text;
      });
    } else {
      this.csv = '';
      this.redToBeChecked = [];
      this.progressCount = 0;
      console.warn('no csv file selected');
    }
    if (this.csv.trim() !== '') {
      // console.log('this.csv ok',this.csv)
      // const notEmpty = (r: string) => r.trim() !== '';

      let tempArray = this.csv.split('\n');
      let csvHeader = tempArray.shift();
      
      if(!this.checkCsvFormat(csvHeader)){
        console.warn('Please check the csv format');
        return
      }
      let redToBeProcessed = tempArray.filter(notEmpty);
      let currentScope = null;
      let currentRedirectType = null;
      let ci = 0;

      const rtLength = redToBeProcessed.length;
      // console.log('redToBeProcessed',redToBeProcessed);
      for (let ll = 0; ll < rtLength; ll++) {
        const line = redToBeProcessed[ll];
        
        /* get redirection alias from constants */
        const red: any = Constants.RA;

        /* split the current line into tmp array*/
        let l = line.split(';');


        /* Get the current Scope if not the same of preceding element*/
        let s: Scope;
        if(!currentScope || currentScope.magento_scope_id !== parseInt(l[0])) {
          s = await this.dataSrv.getScopeByMagentoId(parseInt(l[0])).then((scope:Scope) => {
            console.log('scope',scope)
            currentScope = scope;
            return scope;
          });
        } else {
          s = currentScope
        }
        /* Get the current RedirectType  if not the same of preceding element*/
        let r: RedirectType;
        if(!currentRedirectType || currentRedirectType.id !== parseInt(red[l[1]])) {
            // console.log('after getScopeByMagentoId')
            r = await this.dataSrv.getRedirectTypesById(
            parseInt(red[l[1]])
          ).then((redType)=>{
            console.log('redType',redType)
            currentRedirectType = redType;
            return redType;
          });
          // console.log('after getRedirectTypesById')
        } else {
          r = currentRedirectType
        }
        

        // add the redirection
        this.redToBeChecked.push({
          scope_id: s.id,
          redirect_type_id: r.id,
          origin: l[2],
          target: l[3],
          active: true,
        });
        console.log(ci,rtLength)
        ci++;
      }
      // for (const line of redToBeProcessed) {
        
      // }
      this.redToBeChecked.sort(ruleSortById);
      this.redToBeChecked.sort(ruleSortByOrigin);
      console.log('END OF PROCESSING');
      console.log('this.redToBeChecked',this.redToBeChecked);
    }
  }
  checkCsvFormat(header:string):boolean {
    //magento_scope_id;redirect_type;origin;target;
    let headerOk = true;
    let col = header.trim().split(';');
    if(col[0] !== 'magento_scope_id'){
      console.warn(`the first column must be '${'magento_scope_id'}' current is '${col[0]}'`);
      headerOk = false;
    }
    if(col[1] !== 'redirect_type'){
      console.warn(`the second column must be '${'magento_scope_id'}' current is '${col[1]}'`);
      headerOk = false;
    }
    if(col[2] !== 'origin'){
      console.warn(`the thirth column must be '${'origin'}' current is '${col[2]}'`);
      headerOk = false;
    }
    if(col[3] !== 'target'){
      console.warn(`the fourth column must be '${'target'}' current is '${col[4]}'`);
      headerOk = false;
    }
    return headerOk;
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
        // console.log(id, channel);
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
    // console.log('checked',_event, response);
    if(response.ok){
      // rule ok
      this.redToBeSaved.push(response.rule)
      if(response.toBeUpdate && response.toBeUpdate.length){
        // console.log('toBeUpdate',response.toBeUpdate, response.rule.target);
        response.toBeUpdate.forEach(r => {
          this.redToBeUpdated.push({ ok: false, rule: {id:r.id,scope_id:r.scope_id,redirect_type_id:r.redirect_type_id,position:r.position,origin:r.origin,target:response.rule.target,active:r.active,added_at:r.added_at}, original_rule:r,  reason: `RETARGETING`, reason_code: '000', channel: 'xxxxxx' })
          /*
          {
            "id": 75,
            "scope_id": 7,
            "redirect_type_id": 1,
            "position": 999,
            "origin": "/fr/collections/apres-la-pluie/",
            "target": "https://www.moulinroty-maboutique.com/les-collections/les-petits/apres-la-pluie.html",
            "active": 1,
            "added_at": "2022-09-21 19:26:04"
          }
          */
        });
      }
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
