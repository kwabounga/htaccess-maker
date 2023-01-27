import { Component, Input, Output, OnInit, EventEmitter, HostListener, HostBinding, OnChanges,SimpleChanges , ChangeDetectorRef  } from '@angular/core';
import { offset } from '@popperjs/core';
import { applyDrag } from '../../utils/utils';
import { TranslateService } from '../commons/translate/translate.service';
@Component({
  selector: 'app-rules-list',
  templateUrl: './rules-list.component.html',
  styleUrls: ['./rules-list.component.less']
})
export class RulesListComponent implements OnInit, OnChanges {

  constructor(
    private t:TranslateService,
    private ref: ChangeDetectorRef
  ) { }

  @Input() id:number=0;
  @Input() rules:any;
  ruleFilter:string = '';
  ruleFilterLast:string = '$';
  currentIndex:number = 0;
  currentRulesSetLength?:number = 0;
  @Input() scope:any;
  @Input() redirectTypes:any;
  @Input() updateRulesPositionProgress?:boolean;
  @Output()
  onEmitChangeSaveRule = new EventEmitter<any>();
  @Output()
  onEmitUpdateRulesPositions = new EventEmitter<any>();
  searchPlaceHolder = this.t.i18n('search');
  protected rulesSelectedSet:any= {
    first:null,
    last:null,
    set:[]
  }
  private ctrlKey: string = 'Shift';
  private ctrlKeyPressed: boolean = false;
  nbItemsByPages = [20, 30, 60, 100]
  itemsByPage = this.nbItemsByPages[0];
  pager?:any;
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



  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges){
    // console.log(changes)
    if(changes['rules']){
      this.reload()
      //console.log('refreshing dom after rules changes ')
    }
    /* if(changes['rules']){
      // this.pager = this.pagination(this.rules)
      this.ref.detectChanges();
      console.log('refreshing dom after rules changes ')
    } */
    //console.log(changes)

  }
  setNbItemByPage(event:any){
    const nibp = event.target.value;
    this.itemsByPage = +nibp;
    this.currentIndex = 0;
    this.reload()
  }
  reload(){
    this.pager = this?.paginatedRules
    this.ref.detectChanges();
  }
  public onCheck(data:any): void {
    //console.log('onCheck', this.ctrlKeyPressed, data);
    let key = this.rulesSelectedSet.first != null ? 'last' : 'first';
    if(key != 'first' && this.ctrlKeyPressed){
      this.rulesSelectedSet.last = data.checked ? data.id : null
    } else{
      this.rulesSelectedSet.first = data.checked ? data.id : null
      this.rulesSelectedSet.last = null
    }

    if(this.rulesSelectedSet.first!=null && this.rulesSelectedSet.last != null){
      // console.log('rulesSelectedSet', this.rulesSelectedSet);
      this.computeSet(this.rulesSelectedSet.first,this.rulesSelectedSet.last,this.rulesSelectedSet.set)
    }else{
      this.rulesSelectedSet.set = []
    }

  }
  computeSet(f:number,l:number,set:any){
    const a = Math.min(f,l);
    const b = Math.max(f,l);
    // console.log('computeSet',a,b)
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
    //console.log(applyDrag(this.rules, dropResult, (this.currentIndex * this.itemsByPage)));
    this.rules = applyDrag(this.rules, dropResult, (this.currentIndex * this.itemsByPage));
    this.reload()
  }
  searchDelay:any = null;
  onChangeSearchEvent(event:any){
    //console.log('onChangeSearchEvent', event)
    clearTimeout(this.searchDelay);
    this.searchDelay = setTimeout(()=>{
      this.ruleFilter = event.target.value;
      this.reload()
    }, 250)

  }
  get filteredRules():any{
    let ar = [];
    let rf = this.ruleFilter.trim();
    if(rf == ''){
      ar =  this?.rules;
    } else {
      let rg = new RegExp(rf)
        ar = this?.rules?.filter((r:any) =>{
        return rg.test(r.origin) || rg.test(r.target);
      });
    }
    return  ar
  }
  get paginatedRules():any{

    let ar = this?.filteredRules;

    if(this.ruleFilter != this.ruleFilterLast){
      this.ruleFilter = this.ruleFilterLast;
      this.currentIndex = 0;
      // console.log('here!')
    }
    this.currentRulesSetLength = ar?.length;
    //console.log('here')
    if(ar?.length === 0){
      return [];
    }
    let cuIndex = (this.currentIndex * this.itemsByPage)
    return  ar?.slice(cuIndex, Math.min((cuIndex + this.itemsByPage),ar?.length))
  }
  next(){
    ++ this.currentIndex;
    if(this.currentIndex > Math.floor(this?.currentRulesSetLength/this.itemsByPage)){
      this.currentIndex = 0;
    }

    // console.log(this?.currentRulesSetLength)
    // console.log(this.itemsByPage)
    // console.log(this.currentIndex)
    this.reload()
      //console.log('refreshing dom after next ')
  }
  prev(){
    -- this.currentIndex;
    if(this.currentIndex < 0) {
      this.currentIndex = Math.floor(this?.currentRulesSetLength/this.itemsByPage);
    }
    // console.log(this?.currentRulesSetLength)
    // console.log(this.itemsByPage)
    // console.log(this.currentIndex)
    this.reload()
      // console.log('refreshing dom after prev')
  }

}


