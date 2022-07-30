import { Injectable } from '@angular/core';
import { Scope, ScopeConfig, Rule,RedirectType }from '../interfaces/interfaces';
import { OutputHtaccessService } from './output-htaccess.service';
@Injectable({
  providedIn: 'root',
  useFactory: () => {
      return new DataFromIpcService(new OutputHtaccessService());
  }
})
export class DataFromIpcService {

  constructor(private ouputSrv:OutputHtaccessService) { }

  
}
