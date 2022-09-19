import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constructor() { }
  /**
   * reason codes
   */
  public RC = {
    HARDLOOP:333,
    EXISTYET:111,
    SOFTLOOP:322,
    UNKNOWN:500,
  }
}
