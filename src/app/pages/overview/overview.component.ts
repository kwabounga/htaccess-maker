import { Component, OnInit } from '@angular/core';
import { ContainerComponent, DraggableComponent } from 'ngx-smooth-dnd';
import { applyDrag } from '../../utils/utils';
import { DataMockService } from 'src/app/services/data-mock.service';
import { DataFromIpcService } from 'src/app/services/data-from-ipc.service';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})

/**
 * Page Rules Overview / Management Component
 */

export class OverviewComponent implements OnInit {

  constructor(private dataSrv:DataFromIpcService) { }

  headerData:any;
  footerData:any;
  redirectTypes:any;
  rules:any= {};
  scopeConfig:any = {
    label: "",
    condition: "",
    position:0,
    config:""
  };
  scopes:any;
  specialRules:any;

  /**
   * Life cycle intitalization function
   */
  async ngOnInit(): Promise<void> {
    this.headerData = await this.dataSrv.getHeaderConfig();
    this.footerData = await this.dataSrv.getFooterConfig();
    this.scopes = await this.dataSrv.getScopesAll();
    this.redirectTypes = await this.dataSrv.getRedirectTypesAll();
    this.scopes.forEach(async (scope:any) => {
      this.scopeConfig[scope.id] = await this.getScopeConfigById(scope.id);
      this.rules[scope.id] = await this.getRulesByScopeId(scope.id);
    }); /**/
    console.log(this.rules);

  }

  /**
   * get  Scope config handler
   * @param {number} id  the scope id
   * @returns {Promise<any>} the scope
   */
  async getScopeConfigById(id:number): Promise<any> {
    return this.dataSrv.getScopesConfigById(id)
    .then((obj)=>{
      console.log('getScopeConfigById',obj);
      return obj;
    })
  }

  /**
   * get  Rules handler
   * @param {number} scope_id  the scope id
   * @returns {Promise<any[]>} the scope
   */
  async getRulesByScopeId(scope_id:number): Promise<any[]> {
    return this.dataSrv.getRulesByScopeId(scope_id)
    .then((obj)=>{
      console.log('getRulesByScopeId', obj);
      return obj;
    })
  }
   // TODO: implement that
  saveConfig(event:any){
    console.log('saveConfig',event)
  }
  saveRule(event:any){
    console.log('saveRule', event)
  }
  updateScope(event:any){
    console.log('updateScope',event)
  }

  /**
   * on drop handler 
   * use by smooth drop
   * @param dropResult  the rules for rearrange the array
   */
  onDrop(dropResult:any) {
    console.log(dropResult)
    this.scopes = applyDrag(this.scopes, dropResult);
  }

  /**
   * update Rules positions handler
   * @param {any[]} event an array of Rules from EventEmitter
   */
  updateRulesPositions(event:any) {
    console.log('updateRulesPositions',event);
    this.dataSrv.updateRulesPosition(event).then((response)=>{
      console.log('position updated',response)
    })
    
  }
}
