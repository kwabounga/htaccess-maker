import { Component, ElementRef, HostBinding, HostListener,OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Offcanvas } from 'bootstrap';
import { filter } from 'rxjs';
import pjson from 'src/package.json';
import { TranslateService } from './components/commons/translate/translate.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {'class': 'app-root'}
})
export class AppComponent /*implements OnInit*/ {
  configOpened:boolean = false;
  KEY_PARAMETER:string = 'KeyM'
  title:string = pjson.productName;
  description:string = pjson.description;
  locale:string = navigator.language;
  version = pjson.version;
  versionNotes = pjson['version-notes'][this.version].join('\n');;

  sliderID: string = 'sliderParams';
  ctrlKey: string = 'Control';
  ctrlKeyPressed: boolean = false;
  constructor(
    private elem: ElementRef,
    private t: TranslateService,
    private router: Router
    ) {
    this.router.events
    .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
    .subscribe((e)=>{
        this.elem.nativeElement.focus();
    })

   }
   /* ngOnInit(){
    console.log(pjson['version-notes'])
    console.log(pjson['version-notes'][this.version])
    this.versionNotes = pjson['version-notes'][this.version].join('\n');
   } */
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


  @HostBinding('attr.tabIndex') tabIndex = -1;
  @HostBinding('attr.autofocus') autofocus = 'autofocus';
  @HostListener('keydown', ['$event']) keydown (event: KeyboardEvent) {
    console.log('keydown', event.key, event.code, (this.ctrlKeyPressed));
    if(event.key === this.ctrlKey && !this.ctrlKeyPressed){
      //console.log('keydown', event);
      this.ctrlKeyPressed = true;
    }
    if(this.ctrlKeyPressed && event.code === this.KEY_PARAMETER){
      let domElement =this.elem.nativeElement.querySelector('#'+this.sliderID)
      // let domElement = document.querySelector('#sliderTest')??''
      let offCvs = Offcanvas.getInstance(domElement)??new Offcanvas(domElement)
      if(this.configOpened){
        offCvs?.hide()
      } else {
        offCvs?.show()
      }
      this.toogleConfig()
      console.log("OPEN PARAMETERS",offCvs);

    }
  }
  @HostListener('keyup', ['$event']) keyup (event: KeyboardEvent) {
    //console.log('keyup', event.key);
    if(event.key === this.ctrlKey && this.ctrlKeyPressed){
      //console.log('keyup', event);
      this.ctrlKeyPressed = false;
    }

  }
  toogleConfig(){
    this.configOpened = !this.configOpened;
  }
}
