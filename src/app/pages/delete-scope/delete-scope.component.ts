import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataFromIpcService } from 'src/app/services/data-from-ipc.service';
import { Router } from '@angular/router';
import { findOptionsIdByValue } from '../../utils/utils';
import { TranslateService } from 'src/app/components/commons/translate/translate.service';


@Component({
  selector: 'app-delete-scope',
  templateUrl: './delete-scope.component.html',
  styleUrls: ['./delete-scope.component.css'],
  host: {'class': 'app-content'}
})


export class DeleteScopeComponent implements OnInit {
  @ViewChild('deleteModal') modalRef!:any;
  scopeSelected:boolean = false;
  scopeSelectedName:string = '';
  scopeSelectedId:number = -1;
  placeHolder:Promise<string> = this.t.i18n('Choose the scope to delete')
  constructor(
    private dataSrv:DataFromIpcService,
    private router: Router,
    protected t:TranslateService
  ) { }

  scopes:any;
  async ngOnInit(): Promise<void> {
    this.scopes = await this.dataSrv.getScopesAll();
    /* this.placeHolder  */
  }
  change(event:any){
    const id = event.target.value;
    console.log(id);
    if(id){
      this.scopeSelectedId = id;
      const i = findOptionsIdByValue(event.target.options,id);
      
      this.scopeSelectedName = event.target.options[i].text;
      console.log(this.scopeSelectedName);
      this.scopeSelected = true;
    } else {
      this.scopeSelected = false;
    }
  }
  deleteScopeConfig(){
    // console.log('DELETE SCOPE HERE', this.scopeSelectedId);
    // then navigate to the overview:
    this.dataSrv.deleteScope(this.scopeSelectedId).then((response)=>{
      console.log(`ok the scope ${this.scopeSelectedId} and all references are deleted`)
      this.router.navigate(['/overview']);
    }).catch((e)=>{
      console.log(`something goes wrong with the deletion of the scope ${this.scopeSelectedId}`)
    })

  }
}
