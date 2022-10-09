import { Component, ElementRef, HostBinding, HostListener,OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Offcanvas } from 'bootstrap';
import { filter } from 'rxjs';
import pjson from 'src/package.json';
import { TranslateService } from './components/commons/translate/translate.service';
import { AppActionsFromIpcService } from './services/app-actions-from-ipc.service';
import { DataFromIpcService } from './services/data-from-ipc.service';
import { LocalStorageService } from './services/local-storage.service';
import { LoggerService } from './services/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {'class': 'app-root'}
})
export class AppComponent implements OnInit {

  /* app info */
  title:string = pjson.productName;
  description:string = pjson.description;
  locale:string = navigator.language;
  version = pjson.version;
  versionNotes = pjson['version-notes'][this.version].join('\x0A + ');

  /* parameters */
  configOpened:boolean = false;
  sliderID: string = 'sliderParams';
  KEY_PARAMETER:string = 'KeyM'
  ctrlKey: string = 'Control';
  ctrlKeyPressed: boolean = false;

  history: any =  null;
  localStorage: any =  null;

  /* constructor */
  constructor(
    private elem: ElementRef,
    private t: TranslateService,
    private logger: LoggerService,
    private dataSrv:DataFromIpcService,
    private appSrv:AppActionsFromIpcService,
    private localStorageSrv:LocalStorageService,
    private router: Router
    ) {
    /* focus host on navigation end */
    this.router.events
    .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
    .subscribe((e)=>{
        this.elem.nativeElement.focus();
    })
   }
   async ngOnInit(){
    this.history = await this.dataSrv.getHistory();
    this.localStorage = await this.localStorageSrv.getLocalStorage();
   }
  /* routing */
  routingInfos:any = [
    {
      label:this.t.i18n('Manage'),
      route:'/overview',
      style:'bg-vscode',
      active_class:'active',
      sidebar_button: {
        style:'info',
        size:'30px',
        path:'assets/svg/manage.svg',
      }
    },
    {
      label:this.t.i18n('CSV Import'),
      route:'/csv-rules-import',
      style:'bg-vscode',
      active_class:'active',
      sidebar_button: {
        style:'secondary',
        size:'30px',
        path:'assets/svg/import.svg',
      }
    },
    {
      label:this.t.i18n('Export File'),
      route:'/export-file',
      style:'bg-vscode',
      active_class:'active',
      sidebar_button: {
        style:'success',
        size:'30px',
        path:'assets/svg/export.svg',
      }
    },
    {
      label:this.t.i18n('Add Scope'),
      route:'/add-new-scope',
      style:'bg-vscode',
      active_class:'active',
      sidebar_button: {
        style:'warning',
        size:'30px',
        path:'assets/svg/add.svg',
      }
    },
    {
      label:this.t.i18n('Delete Scope'),
      route:'/delete-scope',
      style:'bg-vscode',
      active_class:'active',
      sidebar_button: {
        style:'danger',
        size:'30px',
        path:'assets/svg/delete.svg',
      }
    },
  ]

  /* host bindings & listeners
      > shortcut `Ctrl + ,` open/close parameters
  */
  @HostBinding('attr.tabIndex') tabIndex = -1;
  @HostBinding('attr.autofocus') autofocus = 'autofocus';
  @HostListener('keydown', ['$event']) keydown (event: KeyboardEvent) {
    /* console.log('keydown', event.key, event.code, (this.ctrlKeyPressed)); */
    if(event.key === this.ctrlKey && !this.ctrlKeyPressed){
      this.ctrlKeyPressed = true;
    }

    if(this.ctrlKeyPressed && event.code === this.KEY_PARAMETER){

      let domElement =this.elem.nativeElement.querySelector('#'+this.sliderID)
      let offCvs = Offcanvas.getInstance(domElement)??new Offcanvas(domElement)

      if(this.configOpened){
        offCvs?.hide()
        this.elem.nativeElement.focus();
        this.logger.log("Close parameters");
      } else {
        offCvs?.show()
        this.logger.log("Open parameters");
      }

      this.toogleConfig()

    }
  }
  @HostListener('keyup', ['$event']) keyup (event: KeyboardEvent) {
    if(event.key === this.ctrlKey && this.ctrlKeyPressed){
      this.ctrlKeyPressed = false;
    }

  }
  setTheme(){
    this.localStorageSrv.setLocalStorageInfo({theme:this.localStorage.theme}).then((response)=>{
      console.log('theme saved', response)
    })
  }
  toogleConfig(){
    this.configOpened = !this.configOpened;
  }
  reload(){
    this.appSrv.reloadApplication();
  }
}
