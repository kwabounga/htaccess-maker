import { Component, OnInit } from '@angular/core';
import { Scope, ScopeConfig } from '../../interfaces/interfaces';
import { OutputHtaccessService } from '../../services/output-htaccess.service';
@Component({
  selector: 'app-add-scope',
  templateUrl: './add-scope.component.html',
  styleUrls: ['./add-scope.component.css']
})
export class AddScopeComponent implements OnInit {
  id=-1;

  scopeConfig:ScopeConfig  = {
    label: "",
    condition: "",
    position:0,
    config:""
  };

  scope:Scope = {
    label:"",
    magento_scope_id:0,
    logo_svg:'',
  };
  output?:string;
  constructor(private outputHtSrv:OutputHtaccessService) {  }

  ngOnInit(): void {
  }

  // TODO: make this as a sequence: 1/ create Scope then mask the scope form ; 2/ then show the configuration form
  saveScope(event:any){
    console.log('save-scope',event)
    console.log(this.output)
  }
  saveConfig(event:any){
    console.log('save-scope-config',event)
    console.log(this.output)
  }
  updatePreview(event?:any){
    this.outputHtSrv.getScopeConfigPreview(this.scope,this.scopeConfig, ['# //...','# some rules','# //...']).then((out)=>{
      this.output = out;
    })
  }
}
