import { Component, OnInit, Input,AfterViewInit,ElementRef} from '@angular/core';
import { EventQueueService } from 'src/app/services/event-queue.service';
import { AppEventType } from 'src/app/types/AppEventType';
import { Router, Event, NavigationEnd} from '@angular/router';
import { DataFromIpcService } from 'src/app/services/data-from-ipc.service';
import { TranslateService } from '../translate/translate.service';
import { Popover } from 'bootstrap';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
      private eventQueueSrv: EventQueueService,
      private router: Router,
      protected dataSrv: DataFromIpcService,
      private elem: ElementRef,
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
  @Input() locale?:string
  output:string = '';
  popOverElement!:any;
  localTitle:Promise<string> = this.t.i18n('language');
  ngOnInit(): void {
    this.eventQueueSrv.on(AppEventType.NotifyEvent).subscribe(event => this.handleEvent(event));
  }
  ngAfterViewInit(){
    // using set time out for wait the Promises response of translation
    setTimeout(()=>{
      let popOverTrigger = this.elem.nativeElement.querySelector('[data-bs-toggle="popover"]')
      this.popOverElement = new Popover(popOverTrigger);
    },200)

  }
  handleEvent(event: any) {
    /* console.log(event)
    console.log(event.payload) */
    this.output = event.payload
  }
}
