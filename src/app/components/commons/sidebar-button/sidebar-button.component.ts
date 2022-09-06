import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-button',
  templateUrl: './sidebar-button.component.html',
  styleUrls: ['./sidebar-button.component.css']
})
export class SidebarButtonComponent implements OnInit {
  @Input() size:string = '30px';
  @Input() title?:string;
  @Input() route?:string;
  @Input() routeActive:string = 'active';
  @Input() style:string = 'secondary';
  @Input() svg_path?:string;
  constructor() { }

  ngOnInit(): void {
  }

}
