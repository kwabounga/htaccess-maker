import { Component, OnInit, HostListener } from '@angular/core';
import { AppActionsFromIpcService } from 'src/app/services/app-actions-from-ipc.service';

@Component({
  selector: 'app-mini-button',
  templateUrl: './mini-button.component.html',
  styleUrls: ['./mini-button.component.less'],
  host:{
    class:"btn-close-custom"
  }
})
export class MiniButtonComponent implements OnInit {
  constructor(private appSrv:AppActionsFromIpcService) { }
   @HostListener('click') close () {
    console.log('close');
    this.appSrv.closeApplication();
  }
  ngOnInit(): void {
  }


}
