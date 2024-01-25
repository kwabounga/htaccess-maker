import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/services/logger.service';
import { DataFromIpcService } from 'src/app/services/data-from-ipc.service';
import { Scope } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-locked-rules',
  templateUrl: './locked-rules.component.html',
  styleUrls: ['./locked-rules.component.less'],
  host: {'class': 'app-content'}
})
export class LockedRulesComponent implements OnInit {
  pageLoaded:boolean = false;
  backLinksRefs: any = [];
  scopes:Scope[];

  constructor(
    protected dataSrv: DataFromIpcService,
    private logger: LoggerService,
  ) { }

  async ngOnInit(): Promise<void> {
    console.log('Locked Rules ?!')
    this.scopes = await this.dataSrv.getScopesAll();
    console.log('get all scopes ', this.scopes)
    for (const scope of this.scopes) {
      console.log('scope ID', scope.id)
      let currentScope = await this.dataSrv.getLockedRulesByScopeID(scope.id);
      this.backLinksRefs.push(currentScope)
    }

    console.log('backLinksRefs', this.backLinksRefs)
    //this.pageLoaded= true;
    setTimeout(()=>{
      this.pageLoaded = true;
    },500);
  }
  export(id:any) {
    console.log('TODO: export locked Rules', id)
  }
  onFileSelected(event:any) {
    console.log('TODO: onFileSelected for locked Rules import ', event)
  }
}
