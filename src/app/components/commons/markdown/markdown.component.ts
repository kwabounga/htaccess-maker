import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { MarkdownService } from './markdown.service';
@Component({
  selector: 'md',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css']
})
export class MarkdownComponent implements OnInit, OnChanges {
  markdown:string = '';
  @Input() src:string = '';
  constructor(
    private m:MarkdownService
    ) { }

  ngOnInit(): void {
    this.markdown = this.m.convert(this.src);
  }
  ngOnChanges(changes: SimpleChanges){
    if(changes['src']){
      this.markdown = this.m.convert(this.src);
    }
  }

}
