import { Component, Input, AfterViewInit, ElementRef, Output, EventEmitter } from '@angular/core';

import { Popover } from 'bootstrap';
@Component({
  selector: 'button-popovered',
  templateUrl: './button-popovered.component.html',
  styleUrls: ['./button-popovered.component.less']
})
export class ButtonPopoveredComponent implements AfterViewInit {
  @Input() active:boolean = true;
  @Input() popoverTitle:string = '';
  @Input() popoverContent:string = '';
  @Input() btnClass:string = 'btn btn-xs';
  @Output() onDblClick = new EventEmitter<any>();

  popOverElement!:any;
  constructor(
    private elem: ElementRef,
  ) { }

  ngAfterViewInit(){
    // using set time out for wait the Promises response
    setTimeout(()=>{
      let popOverTrigger = this.elem.nativeElement.querySelector('[data-bs-toggle="popover"]')
      this.popOverElement = new Popover(popOverTrigger);
    },300)

  }
  dblClickHandler(){
    this.onDblClick.emit('dblClick')
  }
}
