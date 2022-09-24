import { Injectable } from '@angular/core';
import { ClearNotificationEvent } from '../events/ClearNotificationEvent';
import { NotifyEvent } from '../events/NotifyEvent';
import { EventQueueService } from './event-queue.service';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  timerReference: any = null;
  constructor(private eventQueueSrv: EventQueueService) { }

  log(msg:string, timeToDisappear:number|null = 3000){
    /* console.log(msg); */
    try{
      clearTimeout(this.timerReference);
    }catch{}
    this.eventQueueSrv.dispatch(new NotifyEvent(msg));
    if (timeToDisappear) {
      this.timerReference = setTimeout(()=>{
        this.eventQueueSrv.dispatch(new ClearNotificationEvent());
      },timeToDisappear)
    }
  }
  clear(){
    try{
      clearTimeout(this.timerReference);
    }catch{}
    this.eventQueueSrv.dispatch(new ClearNotificationEvent());
  }
}
