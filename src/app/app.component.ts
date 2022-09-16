import { Component, ElementRef, HostBinding, HostListener } from '@angular/core';
import { Offcanvas } from 'bootstrap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {'class': 'app-root'}
})
export class AppComponent {
  constructor(private elem: ElementRef) { }
  routingInfos:any = [
    {
      label:'Manage',
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
      label:'CSV Import',
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
      label:'Export File',
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
      label:'Add Scope',
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
      label:'Delete Scope',
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
  configOpened:boolean = false;
  KEY_PARAMETER:string = 'KeyM'
  title:string = 'htaccess-maker';

  sliderID: string = 'sliderParams';
  ctrlKey: string = 'Control';
  ctrlKeyPressed: boolean = false;

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
