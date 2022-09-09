import { AppEventType } from "../types/AppEventType";
import { AppEvent } from "./AppEvent";

export class ClearNotificationEvent extends AppEvent<string> {
  constructor(payload: string = '') {
    super(AppEventType.NotifyEvent, payload);
  }
}
