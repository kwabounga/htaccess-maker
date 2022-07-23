import { Component, Input, Output, OnInit, EventEmitter  } from '@angular/core';
const iconCheck ='✔';
const iconDelete ='❌';
const iconRefresh ='⬆';
@Component({
  selector: 'app-rule-line',
  templateUrl: './rule-line.component.html',
  styleUrls: ['./rule-line.component.css']
})
export class RuleLineComponent implements OnInit {
  icons = {iconCheck,iconDelete,iconRefresh}
  @Input()
  id:number = 0
  
  @Input()
  idr:number = 0

  @Input()
  rule:any = {}

  @Input()
  scope:any = {}

  @Input()
  redirectTypes:any = {}
  toBeDeleted:boolean = false;
  toBeSaved:boolean = false;
  @Output()
  onChangeSave = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  public changeSave(to_be_deleted:boolean): void {
    this.onChangeSave.emit({
      id: this.idr,
      rule: this.rule,
      scope: this.scope,
      to_be_deleted:to_be_deleted
    });
  }
  protected verifChange(){
    this.toBeSaved = true
  }
}