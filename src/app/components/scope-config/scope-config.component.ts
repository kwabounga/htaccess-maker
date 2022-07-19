import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-scope-config',
  templateUrl: './scope-config.component.html',
  styleUrls: ['./scope-config.component.css'],
})
export class ScopeConfigComponent implements OnInit {
  @Input()
  id = 0;
  @Input()
  scopeConfig: any = {};
  @Input()
  scope: any = {};

  @Output()
  onClickSave = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  public clickSave(): void {
    this.onClickSave.emit({
      id: this.id,
      scopeConfig: this.scopeConfig,
      scope: this.scope,
    });
  }
}
