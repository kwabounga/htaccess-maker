import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/services/logger.service';
import { DataFromIpcService } from 'src/app/services/data-from-ipc.service';

@Component({
  selector: 'app-locked-rules',
  templateUrl: './locked-rules.component.html',
  styleUrls: ['./locked-rules.component.less']
})
export class LockedRulesComponent implements OnInit {
  pageLoaded:boolean = false;
  backLinksRefs: any = [];

  constructor(
    protected dataSrv: DataFromIpcService,
    private logger: LoggerService,
  ) { }

  async ngOnInit() {
    this.backLinksRefs = await this.dataSrv.getLockedRulesByScopeID(2);
    console.log('backLinksRefs',this.backLinksRefs)
    setTimeout(()=>{
      this.pageLoaded = true;
    },500)
  }

}
