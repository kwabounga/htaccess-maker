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
  onEmitChange = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  public changeSave(data:any): void {
    this.onEmitChange.emit(data);
  }
}
