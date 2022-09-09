import { AppEventType } from "../types/AppEventType";

export class AppEvent<T> {
  constructor(
    public type: AppEventType,
    public payload: T,
  ) {}
}
