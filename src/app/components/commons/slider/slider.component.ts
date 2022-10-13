import { Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less']
})
export class SliderComponent implements OnInit {
  @Input() position?: string = 'start';
  @Input() id?: string = 'slider';
  @Input() title?: string = 'title';
  @Input() size?: string = 'title';
  @Output() onClose = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  close(){
    this.onClose.emit()
  }

}
