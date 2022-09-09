import { Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';
import { AppEvent } from '../events/AppEvent';
import { AppEventType } from '../types/AppEventType';

@Injectable({
  providedIn: 'root'
})
export class EventQueueService {

  constructor() { }

  private eventBrocker = new Subject<AppEvent<any>>();

  on(eventType: AppEventType): Observable<AppEvent<any>> {
    return this.eventBrocker.pipe(filter(event => event.type === eventType));
  }

  dispatch<T>(event: AppEvent<T>): void {
    this.eventBrocker.next(event);
  }
}
