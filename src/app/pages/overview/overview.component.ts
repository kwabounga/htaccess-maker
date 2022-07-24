import { Component, OnInit } from '@angular/core';
import { ContainerComponent, DraggableComponent } from 'ngx-smooth-dnd';
import { applyDrag } from '../../utils/utils';
import { DataMockService } from 'src/app/services/data-mock.service';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor(private dataSrv:DataMockService) { }

  headerData:any;
  footerData:any;
  redirectTypes:any;
  rules:any= {};
  scopeConfig:any = {};
  scopes:any;
  specialRules:any;

  async ngOnInit(): Promise<void> {
    this.headerData = await this.dataSrv.getHeaderConfig();
    this.footerData = await this.dataSrv.getFooterConfig();
    this.scopes = await this.dataSrv.getScopesAll();
    this.redirectTypes = await this.dataSrv.getRedirectTypesAll();
    this.scopes.forEach(async (scope:any) => {
      this.scopeConfig[scope.id] = await this.getScopeConfigById(scope.id);
      this.rules[scope.id] = await this.getRulesByScopeId(scope.id);
    });
    // this.specialRules = await this.dataSrv.getFooterConfig();
    console.log(this.rules);

  }
  async getScopeConfigById(id:number) {
    return this.dataSrv.getScopesConfigById(id)
    .then((obj)=>{
      console.log('getScopeConfigById',obj);
      return obj;
    })
  }

  async getRulesByScopeId(scope_id:number) {
    return this.dataSrv.getRulesByScopeId(scope_id)
    .then((obj)=>{
      console.log('getRulesByScopeId', obj);
      return obj;
    })
  }

  saveConfig(event:any){
    console.log('saveConfig',event)
  }
  saveRule(event:any){
    console.log('saveRule', event)
  }
  updateScope(event:any){
    console.log('updateScope',event)
  }
  onDrop(dropResult:any) {
    console.log(dropResult)
    this.scopes = applyDrag(this.scopes, dropResult);
  }
}
