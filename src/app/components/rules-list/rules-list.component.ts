import { Component, Input, Output, OnInit, EventEmitter, HostListener, HostBinding  } from '@angular/core';
import { ContainerComponent, DraggableComponent } from 'ngx-smooth-dnd';
import { first } from 'rxjs';
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

  protected rulesSelectedSet:any= {
    first:null,
    last:null,
    set:[]
  }
  private ctrlKey: string = 'Shift';
  private ctrlKeyPressed: boolean = false;

  // first make your component focusable to allow keypress event listening
  @HostBinding('attr.tabIndex') tabIndex = -1;
  @HostListener('keydown', ['$event']) keydown (event: KeyboardEvent) {
    //console.log('keydown', event.key);
    if(event.key === this.ctrlKey && !this.ctrlKeyPressed){
      //console.log('keydown', event);
      this.ctrlKeyPressed = true;
    }
  }
  @HostListener('keyup', ['$event']) keyup (event: KeyboardEvent) {
    //console.log('keyup', event.key);
    if(event.key === this.ctrlKey && this.ctrlKeyPressed){
      //console.log('keyup', event);
      this.ctrlKeyPressed = false;
    }
  }
 
  constructor() { }

  ngOnInit(): void {

  }
  public onCheck(data:any): void {
    //console.log('onCheck', this.ctrlKeyPressed, data);
    let key = this.rulesSelectedSet.first!=null?'last':'first';
    if(key != 'first' && this.ctrlKeyPressed){
      this.rulesSelectedSet.last = data.checked?data.id:null
    } else{
      this.rulesSelectedSet.first = data.checked?data.id:null
      this.rulesSelectedSet.last = null
    }

    if(this.rulesSelectedSet.first!=null && this.rulesSelectedSet.last!=null){
      console.log('rulesSelectedSet', this.rulesSelectedSet);
      this.computeSet(this.rulesSelectedSet.first,this.rulesSelectedSet.last,this.rulesSelectedSet.set)
    }else{
      this.rulesSelectedSet.set = []
    }

  }
  computeSet(f:number,l:number,set:any){
    const a = Math.min(f,l);
    const b = Math.max(f,l);
    console.log('computeSet',a,b)
    for (let i = a; i <= b; i++) {
      set.push(i)
    }
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
