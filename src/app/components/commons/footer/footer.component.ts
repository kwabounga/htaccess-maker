import { Component, OnInit, Input,AfterViewInit, ElementRef} from '@angular/core';
import { EventQueueService } from 'src/app/services/event-queue.service';
import { AppEventType } from 'src/app/types/AppEventType';
import { Router, Event, NavigationEnd} from '@angular/router';
import { DataFromIpcService } from 'src/app/services/data-from-ipc.service';
import { TranslateService } from '../translate/translate.service';
import { Modal } from 'bootstrap';
import { LoggerService } from 'src/app/services/logger.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit,AfterViewInit {

  constructor(
      private eventQueueSrv: EventQueueService,
      private router: Router,
      protected dataSrv: DataFromIpcService,
      protected elem: ElementRef,
      public logger:LoggerService,
      private t:TranslateService
    ) {
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
            this.dataSrv.checkIfOnline().then((response:any)=>{
              this.online = response.ok
            })
        }
    });

     }
  @Input() online?:boolean
  @Input() version?:string
  @Input() versionNotes?:string
  @Input() allVersionsNotes?:any
  @Input() locale?:string
  output:string = '';
  modalElement!:any;
  versionKeys!:any;
  localTitle:Promise<string> = this.t.i18n('language');
  ngOnInit(): void {
    this.eventQueueSrv.on(AppEventType.NotifyEvent).subscribe(event => this.handleEvent(event));
    this.versionKeys = Object.keys(this.allVersionsNotes).reverse()
  }
  ngAfterViewInit(){

    // using set time out for wait the Promises response
    setTimeout(()=>{
      let modalTrigger = this.elem.nativeElement.querySelector('#footerModal');
      this.modalElement = new Modal(modalTrigger);
    },300)

  }


  async handleEvent(event: any) {
    this.output = await this.t.i18n(event.payload)
  }
  showAllVersionNotes(){
    this.modalElement.toggle()
  }
}
