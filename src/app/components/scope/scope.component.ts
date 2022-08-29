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
  @Output() onClickSave = new EventEmitter<any>();
  placeHolder= "place here the html code for the logo. it would be svg or base 64 encoded image (facultative)"
  constructor() { }

  ngOnInit(): void {
  }
  updatePreview(){
    this.onChange.emit(this?.scope)
  }
  saveConfig(){
    this.onClickSave.emit(this?.scope)
  }
}
