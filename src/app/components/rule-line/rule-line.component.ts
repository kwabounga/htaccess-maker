import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Rule, Scope } from 'src/app/interfaces/interfaces';
const iconCheck = '✔';
const iconDelete = '❌';
const iconRefresh = '⬆';
@Component({
  selector: 'app-rule-line',
  templateUrl: './rule-line.component.html',
  styleUrls: ['./rule-line.component.css'],
})
export class RuleLineComponent implements OnInit {
  icons = { iconCheck, iconDelete, iconRefresh };
  @Input()
  movable?: boolean = true;
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
  toBeDeleted: boolean = false;
  toBeSaved: boolean = false;
  @Output()
  onChange = new EventEmitter<any>();

  startStateRule?: Rule;
  constructor() {}

  ngOnInit(): void {
    this.startStateRule = {
      id: this.rule.id,
      scope_id: this.rule.scope_id,
      redirect_type_id: this.rule.redirect_type_id,
      origin: this.rule.origin,
      target: this.rule.target,
      active: this.rule.active,
    };
  }
  public changeSave(to_be_deleted: boolean): void {
    this.onChange.emit({
      id: this.idr,
      rule: this.rule,
      start_stat_rule: this.startStateRule,
      to_be_deleted: to_be_deleted,
      to_be_saved: this.toBeSaved,
    });
  }
  protected verifChange() {
    let tbs = false;
    if (this.rule.redirect_type_id !== this.startStateRule?.redirect_type_id) {
      tbs = true;
    }
    if (this.rule.origin !== this.startStateRule?.origin) {
      tbs = true;
    }
    if (this.rule.target !== this.startStateRule?.target) {
      tbs = true;
    }
    if (this.rule.active !== this.startStateRule?.active) {
      tbs = true;
    }
    this.toBeSaved = tbs;
  }
}
