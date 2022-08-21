import { Component, Input, OnInit, ChangeDetectorRef,ViewChild,ElementRef  } from '@angular/core';
import { FilesStuffService } from 'src/app/services/files-stuff.service';
import { DataMockService } from 'src/app/services/data-mock.service';
import { DataFromIpcService } from 'src/app/services/data-from-ipc.service';
import { RedirectType, Scope, Rule } from 'src/app/interfaces/interfaces';
import { ruleSortByOrigin, ruleSortById } from 'src/app/utils/utils';
import { ElectronService } from 'ngx-electron';
/* import { HttpClient } from '@angular/common/http'; */

@Component({
  selector: 'app-csv-rules-import',
  templateUrl: './csv-rules-import.component.html',
  styleUrls: ['./csv-rules-import.component.css'],
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
  csv: any;
  redirectTypes: any = {};
  redToBeSaved: any[] = []!
  badRedirections: any[] = [];
  redToBeChecked: any[] = [];
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
    private ref: ChangeDetectorRef
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
    console.log(this.redirectTypes)

  }

  // drag and drop file in the  windows
  // https://www.geeksforgeeks.org/drag-and-drop-files-in-electronjs/
  dragEnter(event:any){
    console.log('File is in the Drop Space');
  }
  dragLeave(event:any){
    console.log('File has left the Drop Space');
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

  // TODO: quand pas OK afficher la raison , et trier par raison
  // TODO: donner la posibilité d'exporter les lignes pas bonnes  dans un csv  pour renvoyer à la personne en charge
  // TODO: creation de nouvelle rule line  pour les rules pas bonnes  avec la raison d'affiché

  /**
   * give a csv file sample
   */
  downloadCsvSample() {
    const sample = `magento_scope_id;redirect_type;origin;target;
2;permanent;/test.html;www.test.com;
5;temporary;/test.html;www.test.com/test.html;
`;
    this.fileStuffSrv.exportFile('sample.csv', sample);
  }

  /**
   * Upload safe new redirections
   */
  uploadCsvRedirect() {
    console.log('uploadCsvRedirect', this.redToBeSaved);
    this.dataSrv.uploadRedirections(this.redToBeSaved)
  }
  // TODO: check for redirect loop in the current set would be imported !!

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
      tempArray.shift();
      let redToBeProcessed = tempArray.filter(notEmpty);

      console.log('redToBeProcessed',redToBeProcessed);
      for (const line of redToBeProcessed) {
        console.log('line',line)
        const red: any = {
          perm: 1,
          permanent: 1,
          '301': 1,
          temp: 2,
          temporary: 2,
          "302": 2,
          permExact: 3,
          permanentExact: 3,
          "301E": 3,
          tempExact: 4,
          temporaryExact: 4,
          "302E": 4,
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
        this.redToBeChecked.sort(ruleSortById);
        this.redToBeChecked.sort(ruleSortByOrigin);
      }
      console.log('this.redToBeChecked',this.redToBeChecked);
    }
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
  percent() {
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
      this.badRedirections.push(response)
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
