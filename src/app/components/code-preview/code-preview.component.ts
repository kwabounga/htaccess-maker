import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-preview',
  templateUrl: './code-preview.component.html',
  styleUrls: ['./code-preview.component.css'],
  host: {'class': 'full-h'}
})
export class CodePreviewComponent implements OnInit {
  @Input() preview?:string='';
  @Input() height?:string='';
  protected output:any[] = [];

  constructor() {}

  ngOnInit(): void {}
  outputMaker():any[]{
    let ap:string[] = this.preview!.split('\n');
      let op:any[] = []
      for (const element of ap) {
        const l = element.trim();
        op.push({text:element,is_comment:l.startsWith('#')})
      }
      return op

  }
}
