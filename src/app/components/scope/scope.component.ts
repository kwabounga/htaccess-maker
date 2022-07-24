import { Component, EventEmitter, Input,Output, OnInit } from '@angular/core';
import { Scope } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-scope',
  templateUrl: './scope.component.html',
  styleUrls: ['./scope.component.css']
})
export class ScopeComponent implements OnInit {
  @Input() scope?:any={};

  @Output() onChange = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  updatePreview(){
    this.onChange.emit(this?.scope)
  }
}
