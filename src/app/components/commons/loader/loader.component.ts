import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.less'],
  host: {'class': 'app-loader'}
})
export class LoaderComponent implements OnInit {
  @Input() loaded:boolean = false;
  @Input() color:string = 'white';
  constructor() { }

  ngOnInit(): void {
  }

}
