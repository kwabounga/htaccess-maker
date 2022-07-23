import { Component, Input, Output, OnInit, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-rules-list',
  templateUrl: './rules-list.component.html',
  styleUrls: ['./rules-list.component.css']
})
export class RulesListComponent implements OnInit {
  @Input() id:number=0;
  @Input() rules:any;
  @Input() scope:any;
  @Input() redirectTypes:any;

  @Output()
  onChangeSave = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  public changeSave(to_be_deleted:boolean): void {
    this.onChangeSave.emit({
      id: this.id,
      rules: this.rules,
      scope: this.scope,
      to_be_deleted:to_be_deleted
    });
  }
}
