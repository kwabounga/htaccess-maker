import { Component, EventEmitter, Input,Output, OnInit } from '@angular/core';
import { Scope } from 'src/app/interfaces/interfaces';
import { DataFromIpcService } from 'src/app/services/data-from-ipc.service';
import { LoggerService } from 'src/app/services/logger.service';
import { TranslateService } from '../commons/translate/translate.service';

@Component({
  selector: 'app-scope',
  templateUrl: './scope.component.html',
  styleUrls: ['./scope.component.css']
})
export class ScopeComponent implements OnInit {
  constructor(
    private t:TranslateService,
    private dataSrv:DataFromIpcService,
    private logger: LoggerService,
  ) { }

  @Input() scope?:any={};

  @Output() onChange = new EventEmitter<any>();
  @Output() onClickSave = new EventEmitter<any>();
  placeHolder= this.t.i18n("place here the html code for the logo. it would be svg or base 64 encoded image (facultative)");
  magentoIdIsFree = true;
  ngOnInit(): void {
  }
  updatePreview(){
    this.onChange.emit(this?.scope)
  }
  checkIfMagentoScopeIsFree(){
    this.dataSrv.getScopeByMagentoId(this.scope.magento_scope_id).then((response)=>{
      this.magentoIdIsFree = (response === undefined)
      this.logger.log(`Magento id [${this.scope.magento_scope_id}] is ${this.magentoIdIsFree?'free':'allready used'}`)
    })
  }
  saveConfig(authorized){
    if(!authorized) return;
    this.logger.log('Saving configuration ...')
    this.onClickSave.emit(this?.scope)
  }
}
