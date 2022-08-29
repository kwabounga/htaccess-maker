import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataFromIpcService } from 'src/app/services/data-from-ipc.service';

@Component({
  selector: 'app-delete-scope',
  templateUrl: './delete-scope.component.html',
  styleUrls: ['./delete-scope.component.css']
})
export class DeleteScopeComponent implements OnInit {
  @ViewChild('deleteModal') modalRef!:any;
  scopeSelected:boolean = false;
  scopeSelectedName:string = '';
  scopeSelectedId:number = -1;
  constructor(
    private dataSrv:DataFromIpcService
  ) { }

  scopes:any;
  async ngOnInit(): Promise<void> {
    this.scopes = await this.dataSrv.getScopesAll();  
  }
  change(event:any){
    const id = event.target.value;
    console.log(id);
    if(id){
      this.scopeSelectedId = id;
      this.scopeSelectedName = event.target.options[id].text;
      console.log(this.scopeSelectedName);
      this.scopeSelected = true;
    } else {
      this.scopeSelected = false;
    }
  }
  deleteScopeConfig(){
    console.log('DELETE SCOPE HERE')
  }
}
