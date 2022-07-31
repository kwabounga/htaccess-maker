import { Injectable } from '@angular/core';
import { Scope, ScopeConfig, Rule,RedirectType }from '../interfaces/interfaces';
import { OutputHtaccessService } from './output-htaccess.service';
import { ElectronService } from 'ngx-electron';
@Injectable({
  providedIn: 'root',
  useFactory: () => {
      return new DataFromIpcService(new OutputHtaccessService(),new ElectronService());
  }
})
export class DataFromIpcService {

  constructor(
    private ouputSrv:OutputHtaccessService,
    private electronSrv: ElectronService,
    ) { }

  async generateHtaccessFile():Promise<string> {
    return new Promise (async (resolve, reject)=>{
      let htAccessContent= "";
      htAccessContent += await this.getHeaderConfig();
      const scopes:Scope[] = await this.getScopesAll();
      for (const scope of scopes) {
        const scopeConfig = await this.getScopesConfigById(scope.id);
        const rules = await this.getRulesByScopeId(scope.id);
        const redirectTypes = await this.getRedirectTypesAll()
        const rulesString = await this.ouputSrv.generateRuleLines(rules,redirectTypes);
        htAccessContent += await this.ouputSrv.getScopeConfigPreview(scope,scopeConfig,rulesString);
      }
      htAccessContent += await this.getFooterConfig();
      resolve(htAccessContent);
    })
  }

  async getHeaderConfig():Promise<string> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send('get:header_config');
      this.electronSrv.ipcRenderer.on('retrieve:header_config', (_event:any, response: any) => {
        resolve(response);
      })
    })
  }

  async getFooterConfig():Promise<string> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send('get:footer_config');
      this.electronSrv.ipcRenderer.on('retrieve:footer_config', (_event:any, response: any) => {
        resolve(response);
      })
    })
  }


  async getScopesConfig():Promise<string> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send('get:scopes_config');
      this.electronSrv.ipcRenderer.on('retrieve:scopes_config', (_event:any, response: any) => {
        resolve(response);
      })
    })
  }


  async getScopesConfigById (id?:number):Promise<ScopeConfig> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send(`get:scope_config:by_id`, id);
      const resolver = (_event:any, response: any) => {
        console.log(response)
        this.electronSrv.ipcRenderer.removeAllListeners(`retrieve:scope_config:by_id_${id}`)
        resolve(response);
      }
      this.electronSrv.ipcRenderer.on(`retrieve:scope_config:by_id_${id}`, resolver)
    })
    
  }
  

  async getScopeByMagentoId (magento_scope_id?:number):Promise<Scope> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send(`get:scope:by_magento_id`, magento_scope_id);
      const resolver = (_event:any, response: any) => {
        console.log(response)
        this.electronSrv.ipcRenderer.removeAllListeners(`retrieve:scope:by_magento_id_${magento_scope_id}`)
        resolve(response);
      }
      this.electronSrv.ipcRenderer.on(`retrieve:scope:by_magento_id_${magento_scope_id}`, resolver)
    })
  }



  async getScopesAll ():Promise<Scope[]> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send('get:scopes');
      this.electronSrv.ipcRenderer.on('retrieve:scopes', (_event:any, response: any) => {
        resolve(response);
      })
    })
  }



  async getRedirectTypesAll ():Promise<RedirectType[]> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send('get:redirect_types');
      this.electronSrv.ipcRenderer.on('retrieve:redirect_types', (_event:any, response: any) => {
        resolve(response);
      })
    })
  }



  async getRedirectTypesById (id:number):Promise<RedirectType> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send('get:redirect_types:by_id',id);
      this.electronSrv.ipcRenderer.on(`retrieve:redirect_types:by_id_${id}`, (_event:any, response: any) => {
        this.electronSrv.ipcRenderer.removeAllListeners(`retrieve:redirect_types:by_id_${id}`);
        resolve(response);
      })
    })
  }



  async getScopesById (id:number) {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send(`get:scope:by_id`, id);
      const resolver = (_event:any, response: any) => {
        console.log(response)
        this.electronSrv.ipcRenderer.removeAllListeners(`retrieve:scope:by_id_${id}`)
        resolve(response);
      }
      this.electronSrv.ipcRenderer.on(`retrieve:scope:by_id_${id}`, resolver)
    })
  }



  async getRulesByScopeId (scope_id?:number):Promise<Rule[]> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send(`get:rules:by_scope_id`, scope_id);
      const resolver = (_event:any, response: any) => {
        console.log(response)
        this.electronSrv.ipcRenderer.removeAllListeners(`retrieve:rules:by_scope_id_${scope_id}`)
        resolve(response);
      }
      this.electronSrv.ipcRenderer.on(`retrieve:rules:by_scope_id_${scope_id}`, resolver)
    })
  }

  

}
