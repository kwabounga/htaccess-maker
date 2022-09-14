import { Component, Input, OnInit, Output,EventEmitter,AfterViewInit,ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ContainerComponent, DraggableComponent } from 'ngx-smooth-dnd';
import { applyDrag } from '../../utils/utils';
import { Button } from 'bootstrap';

@Component({
  selector: 'app-scope-accordion',
  templateUrl: './scope-accordion.component.html',
  styleUrls: ['./scope-accordion.component.css']
})
export class ScopeAccordionComponent implements OnInit,AfterViewInit {
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
  @ViewChild('btnAcc') btn!:ElementRef;
  constructor(protected sanitizer: DomSanitizer, private elem: ElementRef) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    /* let btnTriggers = this.elem.nativeElement.querySelectorAll('.accordion-button')
    console.log(btnTriggers)

    this.btnAccordion = btnTriggers.call().map((btnTrigger:any)=>{
      console.log(btnTrigger)
      return new Button(btnTrigger);
    }) */

  }
  clickBtn(event:any){
    this.isOpen=!this.isOpen
    console.log(event.path[0])
    /* this.btnAccordion = new Button(event.path[0])
    console.log(this.btnAccordion)
    this.btnAccordion.toggle() */
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
