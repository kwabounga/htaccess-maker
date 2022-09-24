import { Component, OnInit } from '@angular/core';
import { DataFromIpcService } from 'src/app/services/data-from-ipc.service';
import { Scope, ScopeConfig } from '../../interfaces/interfaces';
import { OutputHtaccessService } from '../../services/output-htaccess.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-scope',
  templateUrl: './add-scope.component.html',
  styleUrls: ['./add-scope.component.css'],
  host: {'class': 'app-content'}
})
export class AddScopeComponent implements OnInit {
  scopeSaved:boolean = false;
  scopeConfigSaved:boolean = false;
  id=-1;
  pageLoaded:boolean = false;

  scopeConfig:ScopeConfig  = {
    label: "",
    condition: "",
    config:""
  };

  scope:Scope = {
    label:"",
    magento_scope_id:0,
    logo_svg:'',
  };
  output?:string;
  constructor(private outputHtSrv:OutputHtaccessService,
    private dataSrv:DataFromIpcService,
    private router: Router) {  }

  ngOnInit(): void {
    this.pageLoaded = true;
  }

  // TODO: make this as a sequence: 1/ create Scope then mask the scope form ; 2/ then show the configuration form
  saveScope(event:any){
    console.log('save-scope',event)
    this.dataSrv.uploadScope(event).then((response:any)=>{
      // get the id
      const newScopeId = response[0];
      console.log(`new scope saved ${newScopeId}`);
      this.scopeConfig.scope_id = newScopeId;
      // here show config and hide scope
      this.scopeSaved = true;
    }).catch((e)=>{
      console.log(e);
    })

  }
  saveConfig(event:any){
    console.log('save-scope-config',event)
    this.dataSrv.uploadScopeConfig(this.scopeConfig).then((response:any)=>{
      // get the id
      const newScopeId = response[0];
      console.log(`new scope config saved ${newScopeId}`);
      this.scopeConfig.scope_id = newScopeId;
      // here redirection to the overview
      this.router.navigate(['/overview']);
    }).catch((e)=>{
      console.log(e);
    })
  }
  updatePreview(event?:any){
    this.outputHtSrv.getScopeConfigPreview(this.scope,this.scopeConfig, ['# //...','# some rules','# //...']).then((out)=>{
      this.output = out;
    })
  }
}
