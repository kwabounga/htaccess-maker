import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class AppActionsFromIpcService {

  constructor(
    private electronSrv: ElectronService
    ) { }

    /**
     * Close application call
     * @returns useless Promise
     */
  async closeApplication():Promise<void> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send('app:close');
      resolve();
    })
  }

  /**
     * Reload application call
     * @returns useless Promise
     */
  async reloadApplication():Promise<void> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send('app:reload');
      resolve();
    })
  }
}
