import { Component, Input, OnInit } from '@angular/core';
import trad from '../../../../assets/fr_FR.json';
@Component({
  selector: 'trans',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {
  translation:string = '';
  @Input() txt:string = 'a sentence';
  constructor() { }

  ngOnInit(): void {
    this.translation = trad[this.txt] ?? this.txt;
  }

}
