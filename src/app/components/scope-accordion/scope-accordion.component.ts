import { Component, Input, Output,EventEmitter,ElementRef, ViewChild } from '@angular/core';
import { applyDrag } from '../../utils/utils';
import { Button } from 'bootstrap';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-scope-accordion',
  templateUrl: './scope-accordion.component.html',
  styleUrls: ['./scope-accordion.component.less']
})
// https://stackoverflow.com/questions/70159067/angular-bootstrap-accordion-animation-is-not-working-on-close-in-production/70927699#70927699
export class ScopeAccordionComponent {
  @Input() scopes:any;
  @Input() scopeConfig:any = {
    label: "",
    condition: "",
    position:0,
    config:""
  };
  @Input() redirectTypes:any;
  @Input() rules:any= {};

  @Output() onConfig = new EventEmitter();
  @Output() onRule = new EventEmitter();
  @Output() onRulesPositions = new EventEmitter();
  @Output() onScope = new EventEmitter();
  @Output() onScopesPosition = new EventEmitter();
  btnAccordion?: Button;
  isOpen = false;
  @Input()updateRulesPositionProgress?: boolean;
  @ViewChild('btnAcc') btn!:ElementRef;
  constructor(
    private logger: LoggerService,
    private elem: ElementRef
    ) { }
  labelDragIt = 'drag it for rearrange';
  log(txt){
    this.logger.log(txt);
  }

  clickBtn(event:any){
    this.isOpen=!this.isOpen
  }
  saveConfig(event:any){
    this.onConfig.emit(event)
  }
  saveRule(event:any){
    this.onRule.emit(event)
  }
  saveRulesPositions(event:any){
    this.onRulesPositions.emit(event)
  }
  updateScope(event:any){
    this.onScope.emit(event)
  }
  onDrop(dropResult:any) {
    console.log(dropResult)
    this.scopes = applyDrag(this.scopes, dropResult);
    this.onScopesPosition.emit(this.scopes)
  }
}
