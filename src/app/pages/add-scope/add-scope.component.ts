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
    label:""
  };
  output:any;
  constructor(private outputHtSrv:OutputHtaccessService) {  }

  ngOnInit(): void {
  }

  saveConfig(event:any){
    console.log('csv-rules-import',event)

    console.log(this.output)
  }
  updatePreview(event?:any){
    this.outputHtSrv.getScopeConfigPreview(this.scope,this.scopeConfig, ['# //...','# some rules','# //...']).then((out)=>{
      this.output = out;
    })
  }
}
