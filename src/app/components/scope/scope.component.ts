import { Component, EventEmitter, Input,Output, OnInit } from '@angular/core';
import { Scope } from 'src/app/interfaces/interfaces';
import { DataFromIpcService } from 'src/app/services/data-from-ipc.service';
import { LoggerService } from 'src/app/services/logger.service';
import { TranslateService } from '../commons/translate/translate.service';

@Component({
  selector: 'app-scope',
  templateUrl: './scope.component.html',
  styleUrls: ['./scope.component.less']
})
export class ScopeComponent implements OnInit {
  constructor(
    private t:TranslateService,
    private dataSrv:DataFromIpcService,
    private logger: LoggerService,
  ) { }

  @Input() scope?:any={};
  @Input() isNew = false;

  @Output() onChange = new EventEmitter<any>();
  @Output() onClickSave = new EventEmitter<any>();
  placeHolder= this.t.i18n("place here the html code for the logo. it would be svg or base 64 encoded image (facultative)");
  magentoIdIsFree = true;
  currentScopeMagento = -1;

  ngOnInit(): void {
    this.currentScopeMagento = this.scope.magento_scope_id;
    this.checkIfMagentoScopeIsFree()
  }
  updatePreview(){
    this.onChange.emit(this?.scope)
  }
  checkIfMagentoScopeIsFree(){
    this.dataSrv.getScopeByMagentoId(this.scope.magento_scope_id).then((response)=>{
      this.magentoIdIsFree = (response === undefined)
      if(!this.isNew && !this.magentoIdIsFree){
        this.magentoIdIsFree = (this.currentScopeMagento == this.scope.magento_scope_id);
      }
      let op = null;
      if(this.magentoIdIsFree){
        op = this.t.i18n('Magento id [%0] is free',[this.scope.magento_scope_id])
      }else{
        op = this.t.i18n('Magento id [%0] is allready used',[this.scope.magento_scope_id])
      }
      this.logger.log(op)
    })
  }
  saveConfig(authorized){
    if(!authorized) return;
    this.logger.log('Saving configuration ...')
    this.onClickSave.emit(this?.scope)
  }
}
