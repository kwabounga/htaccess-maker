import { Component, Input, Output, OnInit, EventEmitter  } from '@angular/core';
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
