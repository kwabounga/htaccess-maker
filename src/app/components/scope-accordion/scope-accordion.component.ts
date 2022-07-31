import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { ContainerComponent, DraggableComponent } from 'ngx-smooth-dnd';
import { applyDrag } from '../../utils/utils';

@Component({
  selector: 'app-scope-accordion',
  templateUrl: './scope-accordion.component.html',
  styleUrls: ['./scope-accordion.component.css']
})
export class ScopeAccordionComponent implements OnInit {
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

  isOpen = false;
  constructor() { }

  ngOnInit(): void {
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
  }
}
