
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-preview',
  templateUrl: './code-preview.component.html',
  styleUrls: ['./code-preview.component.less'],
  host: {'class': 'full-h'}
})
export class CodePreviewComponent implements OnInit {
  @Input() preview?:string='';
  @Input() height?:string='';
  protected output:any[] = [];

  constructor() {}

  ngOnInit(): void {


  }
}
