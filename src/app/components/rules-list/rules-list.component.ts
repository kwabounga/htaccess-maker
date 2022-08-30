import { Component, Input, Output, OnInit, EventEmitter, HostListener, HostBinding  } from '@angular/core';
import { ContainerComponent, DraggableComponent } from 'ngx-smooth-dnd';
import { applyDrag } from '../../utils/utils';
@Component({
  selector: 'app-rules-list',
  templateUrl: './rules-list.component.html',
  styleUrls: ['./rules-list.component.css']
})
export class RulesListComponent implements OnInit {
  @Input() id:number=0;
  @Input() rules:any;
  ruleFilter:string = '';
  @Input() scope:any;
  @Input() redirectTypes:any;
  @Output()
  onEmitChangeSaveRule = new EventEmitter<any>();
  @Output()
  onEmitUpdateRulesPositions = new EventEmitter<any>();


  private ctrlKey: string = 'Control';
  private ctrlKeyPressed: boolean = false;

  // first make your component focusable to allow keypress event listening
  @HostBinding('attr.tabIndex') tabIndex = -1;
  @HostListener('keydown', ['$event']) keydown (event: KeyboardEvent) {
    //console.log('keydown', event.key);
    if(event.key === this.ctrlKey && !this.ctrlKeyPressed){
      console.log('keydown', event);
      this.ctrlKeyPressed = true;
    }
  }
  @HostListener('keyup', ['$event']) keyup (event: KeyboardEvent) {
    //console.log('keyup', event.key);
    if(event.key === this.ctrlKey && this.ctrlKeyPressed){
      console.log('keyup', event);
      this.ctrlKeyPressed = false;
    }
  }
  @HostListener('click') addAnnotation () {
    console.log('click', this.ctrlKeyPressed);
  }
  constructor() { }

  ngOnInit(): void {
  }
  public changeSaveRule(data:any): void {
    this.onEmitChangeSaveRule.emit(data);
  }
  public updateRulesPositions(): void {
    this.onEmitUpdateRulesPositions.emit(this.rules);
  }
  onDrop(dropResult:any) {
    console.log(dropResult)
    this.rules = applyDrag(this.rules, dropResult);
  }
  onChangeSearchEvent(event:any){
    console.log('onChangeSearchEvent', event)
    this.ruleFilter = event.target.value;
  }
  get filteredRules():any{
    if(this.ruleFilter == '') return this?.rules;
    let rg = new RegExp(this.ruleFilter)
    return this.rules.filter((r:any) =>{
      return rg.test(r.origin) || rg.test(r.target);
    });
  }
}
