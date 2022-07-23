import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-preview',
  templateUrl: './code-preview.component.html',
  styleUrls: ['./code-preview.component.css']
})
export class CodePreviewComponent implements OnInit {
  @Input() preview?:string;
  protected output:any[] = [];

  constructor() {}

  ngOnInit(): void {}
  outputMaker():any[]{
    let ap:string[] = this.preview!.split('\n')
      let op:any[] = []
      for (const element of ap) {
        const l = element.trim();
        op.push({text:l,is_comment:l.startsWith('#')})
      }
      return op

  }
}
