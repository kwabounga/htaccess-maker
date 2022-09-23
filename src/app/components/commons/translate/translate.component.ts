import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef} from '@angular/core';

import { TranslateService } from './translate.service';

@Component({
  selector: 'i18n',
  templateUrl: './translate.component.html'
})
/**
 * Custom translation Module
 *
 * in template:
 * <i18n [txt]="'a sentence'"></i18n> => une phrase
 * <i18n [txt]="'test with injected %0 : %1'" [val]="['valeur',5]"></i18n>
 */
export class TranslateComponent implements OnInit, OnChanges {
  translation:string = '';
  @Input() txt:string = '';
  @Input() val:any = [];

  constructor(
    private t:TranslateService ,
    private ref: ChangeDetectorRef
   ) {}

  async ngOnInit(): Promise<void> {
    this.translation = await this.t.i18n(this.txt,this.val);
    this.ref.detectChanges();
  }
  async ngOnChanges(changes: SimpleChanges) {
    /* console.log(changes) */
    if(changes['val']){
      this.translation = await this.t.i18n(this.txt,this.val);
      this.ref.detectChanges();
    }

  }

}
