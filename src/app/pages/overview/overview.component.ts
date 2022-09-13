import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { ContainerComponent, DraggableComponent } from 'ngx-smooth-dnd';
import { applyDrag } from '../../utils/utils';
import { DataMockService } from 'src/app/services/data-mock.service';
import { DataFromIpcService } from 'src/app/services/data-from-ipc.service';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { Collapse } from 'bootstrap';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  host: {'class': 'app-content'}
})

/**
 * Page Rules Overview / Management Component
 */

export class OverviewComponent implements OnInit/*, AfterViewInit */{
  @ViewChild('alert') alertRef!: AlertComponent;
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
//   ngAfterViewInit(){
//     var collapseElementList = [].slice.call(document.querySelectorAll('.collapse'))
//     var collapseList = collapseElementList.map(function (collapseEl) {
//     return new Collapse(collapseEl)
// })
//   }
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
   * get Rules handler
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
  // TODO : do an alert system on succes / on error


  // TODO: implement saveHeaderConfig
  saveHeaderConfig(){
    console.log('saveHeaderConfig',this.headerData)
    this.dataSrv.updateHeaderConfig(this.headerData).then((response)=>{
      console.log(response)
      this.alertRef.openAlert('success', 'header config saved!', 2000);
    })
  }
  // TODO: implement saveFooterConfig
  saveFooterConfig(){
    console.log('saveFooterConfig', this.footerData)
    this.dataSrv.updateFooterConfig(this.footerData).then((response)=>{
      console.log(response)
      this.alertRef.openAlert('success', 'footer config saved!', 2000);
    })
  }
  /**
   * save Or delete Rule
   *
   * @param {any} event
   */
  saveRule(event:any){
    console.log('saveRule event', event);
    if(event.to_be_deleted){
      this.dataSrv.deleteRule(event.rule).then((response)=>{
        console.log('rule deleted',response);
        this.alertRef.openAlert('warning', 'the rule has been deleted, ... reload in 2 second', 2000, ()=>{
          window.location.reload();
        });

      })
    }else if(event.to_be_saved){
      this.dataSrv.updateRule(event.rule).then((response)=>{
        console.log('rule updated',response);
        this.alertRef.openAlert('success', 'the rule has been updated, ... reload in 2 second', 2000, ()=>{
          window.location.reload();
        });
      })
    }

  }


  updateScope(event:any){
    console.log('updateScope',event)
    this.dataSrv.updateScope(event).then((response)=>{
      console.log('scope updated', response)
    })
  }
  // TODO: implement saveConfig
  updateScopeConfig(event:any){
    console.log('updateScopeConfig',event.scopeConfig)
    this.dataSrv.updateScopeConfig(event.scopeConfig).then((response)=>{
      console.log('scope updated', response)
    })
  }
  /**
   * on drop handler
   * use by smooth drop
   * @param dropResult  the rules for rearrange the array
   */
   updateScopesPositions(event:any) {
    console.log(event)
    // this.scopes = applyDrag(this.scopes, dropResult);
    // console.log('update ScopesCOnfig');
    this.dataSrv.updateScopesPosition(event).then((response)=>{
      console.log('scope position updated',response)
      // this.scopes
    })
  }

  /**
   * update Rules positions handler
   * @param {any[]} event an array of Rules from EventEmitter
   */
  updateRulesPositions(event:any) {
    console.log('updateRulesPositions',event);
    this.dataSrv.updateRulesPosition(event).then((response)=>{
      console.log('rules position updated',response)
    })

  }
}
