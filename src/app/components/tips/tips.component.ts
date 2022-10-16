import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from 'src/app/components/commons/translate/translate.service';
import tips from 'raw-loader!src/assets/tips/imports.md';
import { LoggerService } from 'src/app/services/logger.service';
@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.less']
})
export class TipsComponent implements OnInit {

  constructor(
    private t:TranslateService,
    public logger:LoggerService
  ) { }

  @Input() tipsFileName = "imports"
  @Output() onToggle = new EventEmitter;
  tipsTitle:Promise<string> = this.t.i18n('Help');
  markdown:string = tips;
  tipsOpen:boolean = false;

  async ngOnInit(): Promise<void> {
    let mod = await import(`!!raw-loader!src/assets/tips/${this.tipsFileName}.md`);
    this.markdown = mod.default;
    console.log(this.markdown)
  }

  toogleTips(){
    console.log('toogleTips');
    this.tipsOpen = !this.tipsOpen;
  }
}
