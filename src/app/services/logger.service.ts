import { Injectable } from '@angular/core';
import { NotifyEvent } from '../events/NotifyEvent';
import { EventQueueService } from './event-queue.service';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private eventQueueSrv: EventQueueService) { }

  log(msg:string){
    console.log(msg);
    this.eventQueueSrv.dispatch(new NotifyEvent(msg));
  }
}
