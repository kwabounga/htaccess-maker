import { AppEventType } from "../types/AppEventType";
import { AppEvent } from "./AppEvent";

export class NotifyEvent extends AppEvent<string> {
  constructor(payload: string) {
    super(AppEventType.NotifyEvent, payload);
  }
}
