import { Component, OnInit, Input } from '@angular/core';
import { Rule, Scope } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-rule-line-bad-redirection',
  templateUrl: './rule-line-bad-redirection.component.html',
  styleUrls: ['./rule-line-bad-redirection.component.css']
})
export class RuleLineBadRedirectionComponent implements OnInit {
  @Input()
  reason?:string = '';
  @Input()
  reasonCode?:string = '';
  @Input()
  id: number = 0;

  @Input()
  idr: number = 0;

  @Input()
  rule: Rule = {
    id: 0,
    scope_id: 0,
    redirect_type_id: 1,
    origin: '',
    target: '',
    active: true,
  };
  @Input()
  redirectTypes: any = {};
  @Input()
  scopesRefs: any = {};
  constructor() { }

  ngOnInit(): void {
  }
  getScopeNameById(scope_id:number){
    const src =  this.scopesRefs;
    console.log(src)
    const byId = (element:any) => element.id === scope_id;      
    let i = src.findIndex(byId);
    let r = '';
    if(i >= 0){
      r = src[i].label
    } else {
      r = 'UNKNOWN' 
    }
    return r
  }

}
