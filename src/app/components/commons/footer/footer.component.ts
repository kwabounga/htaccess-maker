import { Component, OnInit } from '@angular/core';
import { AppEvent } from 'src/app/events/AppEvent';
import { EventQueueService } from 'src/app/services/event-queue.service';
import { AppEventType } from 'src/app/types/AppEventType';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  output:string = '';
  constructor(
      private eventQueueSrv: EventQueueService
    ) { }

  ngOnInit(): void {
    this.eventQueueSrv.on(AppEventType.NotifyEvent).subscribe(event => this.handleEvent(event));
  }
  handleEvent(event: any) {
    // Do something with the click event
    console.log(event)
    console.log(event.payload)
    this.output = event.payload
  }
}
