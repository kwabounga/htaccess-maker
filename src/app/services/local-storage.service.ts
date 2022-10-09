import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    private electronSrv: ElectronService
    ) { }

    async getLocalStorage():Promise<any> {
      return new Promise (async (resolve, reject)=>{
        this.electronSrv.ipcRenderer.send('get:local:storage');

        const resolver = (_event:any, response: any) => {
          // console.log(response)
          this.electronSrv.ipcRenderer.removeAllListeners(`retrieve:local:storage`)
          console.log(response)
          resolve(response);
        }
        this.electronSrv.ipcRenderer.on(`retrieve:local:storage`, resolver)

      })
    }

    async setLocalStorageInfo(info:any):Promise<any> {
      return new Promise (async (resolve, reject)=>{
        this.electronSrv.ipcRenderer.send('set:local:storage:info', info);
        const resolver = (_event:any, response: any) => {
          // console.log(response)
          this.electronSrv.ipcRenderer.removeAllListeners(`local:storage:info:set`)
          console.log(response)
          resolve(response);
        }
        this.electronSrv.ipcRenderer.on(`local:storage:info:set`, resolver)

      })
    }
}
