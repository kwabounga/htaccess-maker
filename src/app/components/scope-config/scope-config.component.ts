import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Scope, ScopeConfig } from 'src/app/interfaces/interfaces';
import { OutputHtaccessService } from 'src/app/services/output-htaccess.service';

@Component({
  selector: 'app-scope-config',
  templateUrl: './scope-config.component.html',
  styleUrls: ['./scope-config.component.css'],
})
export class ScopeConfigComponent implements OnInit {
  @Input() id = 0;
  @Input() scopeConfig:any = {
    label: "",
    condition: "",
    position:0,
    config:""
  };
  @Input() scope: any={};
  @Input() prev?:boolean;

  @Output() onClickSave = new EventEmitter<any>();
  @Output() onPreview = new EventEmitter<any>();

  constructor(protected outputSrv:OutputHtaccessService) {}

  ngOnInit(): void {}

  public clickSave(): void {
    this.onClickSave.emit({
      emitter:'click',
      id: this.id,
      scopeConfig: this.scopeConfig,
      scope: this.scope,
    });
  }
  public updatePreview(): void {
    if(!this.prev) return;
    this.onPreview.emit({
      emitter:'preview',
      id: this.id,
      scopeConfig: this.scopeConfig,
      scope: this.scope,
    });
  }
}
