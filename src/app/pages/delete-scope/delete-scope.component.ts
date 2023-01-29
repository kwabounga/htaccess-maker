import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataFromIpcService } from 'src/app/services/data-from-ipc.service';
import { Router } from '@angular/router';
import { findOptionsIdByValue } from '../../utils/utils';
import { TranslateService } from 'src/app/components/commons/translate/translate.service';
import { LoggerService } from 'src/app/services/logger.service';


@Component({
  selector: 'app-delete-scope',
  templateUrl: './delete-scope.component.html',
  styleUrls: ['./delete-scope.component.less'],
  host: {'class': 'app-content'}
})


export class DeleteScopeComponent implements OnInit {
  @ViewChild('deleteModal') modalRef!:any;
  scopeSelected:boolean = false;
  scopeSelectedName:string = '';
  scopeSelectedId:number = -1;
  placeHolder:Promise<string> = this.t.i18n('Choose the scope to delete');
  yesIWantDeleteThisScope:boolean = false
  pageLoaded:boolean = false;
  constructor(
    private logger: LoggerService,
    private dataSrv:DataFromIpcService,
    private router: Router,
    protected t:TranslateService
  ) { }

  scopes:any;
  async ngOnInit(): Promise<void> {
    this.scopes = await this.dataSrv.getScopesAll();
    /* this.placeHolder  */
    this.logger.log('be careful with the deletion, it is not reversible')
    this.yesIWantDeleteThisScope = false;
    this.pageLoaded = true;
  }
  change(event:any){
    const id = event.target.value;
    // console.log(id);
    if(id){
      this.scopeSelectedId = id;
      const i = findOptionsIdByValue(event.target.options,id);

      this.scopeSelectedName = event.target.options[i].text;
      // console.log(this.scopeSelectedName);
      this.scopeSelected = true;
    } else {
      this.scopeSelected = false;
    }
  }
  deleteScopeConfig(){
    // console.log('DELETE SCOPE HERE', this.scopeSelectedId);
    // then navigate to the overview:
    // TODO: delete all associated rules and configuration
    this.dataSrv.deleteScope(this.scopeSelectedId).then((response)=>{
      this.logger.log(`ok the scope ${this.scopeSelectedId} and all references are deleted`)
      setTimeout(()=>{
        this.router.navigate(['/overview']);
      },2000)
    }).catch((e)=>{
      this.logger.log(`something goes wrong with the deletion of the scope ${this.scopeSelectedId}`)
    })

  }
}
