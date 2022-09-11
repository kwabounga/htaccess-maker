import { Component } from '@angular/core';
import { AppActionsFromIpcService } from './services/app-actions-from-ipc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {'class': 'app-root'}
})
export class AppComponent {
  constructor(private appSrv:AppActionsFromIpcService){}
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
  title:string = 'htaccess-maker';
  close(){
    console.log('close');
    this.appSrv.closeApplication();
  }
}
