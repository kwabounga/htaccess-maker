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
/**
 * Data From IPC Service
 *
 * A service to Communicate  with IPC electron
 * under Promises form
 *
 * how it's work?
 *
 * the methods always return Promises that
 * send a custom event to the electron part
 * and subscribe on the fly to the electron response
 * when the event response is retrieved, the promise is resolved with the requested value
 */
export class DataFromIpcService {

  constructor(
    private ouputSrv:OutputHtaccessService,
    private electronSrv: ElectronService,
    ) { }


  /**
   * Generate the .htaccess file from data
   * @returns {Promise<string>} the htaccess body
   */
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

  /**
   * Get the Header Config
   * @returns {Promise<string>} the configuration header
   */
  async getHeaderConfig():Promise<string> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send('get:header_config');
      this.electronSrv.ipcRenderer.on('retrieve:header_config', (_event:any, response: any) => {
        resolve(response);
      })
    })
  }

  /**
   * Get the Footer Config
   * @returns {Promise<string>} the configuration footer
   */
  async getFooterConfig():Promise<string> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send('get:footer_config');
      this.electronSrv.ipcRenderer.on('retrieve:footer_config', (_event:any, response: any) => {
        resolve(response);
      })
    })
  }

/**
 * get the configuration of a specified scope
 * @param {number} id the scope id
 * @returns {Promise<ScopeConfig>} the scope configuration 
 */
  async getScopesConfigById (id?:number):Promise<ScopeConfig> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send(`get:scope_config:by_id`, id);
      const resolver = (_event:any, response: any) => {
        // console.log(response)
        this.electronSrv.ipcRenderer.removeAllListeners(`retrieve:scope_config:by_id_${id}`)
        resolve(response);
      }
      this.electronSrv.ipcRenderer.on(`retrieve:scope_config:by_id_${id}`, resolver)
    })

  }

  /**
  * get the scope of a specified magento id
  * @param {number} magento_scope_id the magento scope id
  * @returns {Promise<Scope>} the scope obj 
  */
  async getScopeByMagentoId (magento_scope_id?:number):Promise<Scope> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send(`get:scope:by_magento_id`, magento_scope_id);
      const resolver = (_event:any, response: any) => {
        // console.log(response)
        this.electronSrv.ipcRenderer.removeAllListeners(`retrieve:scope:by_magento_id_${magento_scope_id}`)
        resolve(response);
      }
      this.electronSrv.ipcRenderer.on(`retrieve:scope:by_magento_id_${magento_scope_id}`, resolver)
    })
  }


  /**
   * get all scopes
   * @returns {Promise<Scope[]} all scopes obj
   */
  async getScopesAll ():Promise<Scope[]> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send('get:scopes');
      this.electronSrv.ipcRenderer.on('retrieve:scopes', (_event:any, response: any) => {
        resolve(response);
      })
    })
  }


/**
   * get all redirect type
   * @returns {Promise<RedirectType[]} all redirect type obj
   */
  async getRedirectTypesAll ():Promise<RedirectType[]> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send('get:redirect_types');
      this.electronSrv.ipcRenderer.on('retrieve:redirect_types', (_event:any, response: any) => {
        resolve(response);
      })
    })
  }


  /**
   * get redirect type by id
   * @param {number} id  the id 
   * @returns {Promise<RedirectType>} the redirect type obj
   */
  async getRedirectTypesById (id:number):Promise<RedirectType> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send('get:redirect_types:by_id',id);
      this.electronSrv.ipcRenderer.on(`retrieve:redirect_types:by_id_${id}`, (_event:any, response: any) => {
        this.electronSrv.ipcRenderer.removeAllListeners(`retrieve:redirect_types:by_id_${id}`);
        resolve(response);
      })
    })
  }


  /**
   * get scope by id
   * @param {number} id  the id  
   * @returns  {Promise<Scope>} the scope obj
   */
  async getScopesById (id:number):Promise<Scope> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send(`get:scope:by_id`, id);
      const resolver = (_event:any, response: any) => {
        // console.log(response)
        this.electronSrv.ipcRenderer.removeAllListeners(`retrieve:scope:by_id_${id}`)
        resolve(response);
      }
      this.electronSrv.ipcRenderer.on(`retrieve:scope:by_id_${id}`, resolver)
    })
  }


  /**
   * get all rules of specified scope
   * @param scope_id the scope id 
   * @returns  {Promise<Rule[]>} all scope associated rules in array 
   */
  async getRulesByScopeId (scope_id?:number):Promise<Rule[]> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send(`get:rules:by_scope_id`, scope_id);
      const resolver = (_event:any, response: any) => {
        // console.log(response)
        this.electronSrv.ipcRenderer.removeAllListeners(`retrieve:rules:by_scope_id_${scope_id}`)
        resolve(response);
      }
      this.electronSrv.ipcRenderer.on(`retrieve:rules:by_scope_id_${scope_id}`, resolver)
    })
  }

  /**
   * delete a rule
   * @param {Rule} rule the rule to be deleted
   * @returns {Promise<boolean>} deleted or not 
   */
  async deleteRule (rule:Rule):Promise<boolean> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send(`delete:rule`, rule);
      const resolver = (_event:any, response: any) => {
        // console.log(response)
        this.electronSrv.ipcRenderer.removeAllListeners(`rule:deleted`)
        resolve(response);
      }
      this.electronSrv.ipcRenderer.on(`rule:deleted`, resolver)
    })
  }
  /**
   * delete a scope by id
   * @param {number} scope_id the id of the scope to be deleted
   * @returns {Promise<boolean>} deleted or not 
   */
  async deleteScope (scope_id:number):Promise<boolean> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send(`delete:scope`, scope_id);
      const resolver = (_event:any, response: any) => {
        // console.log(response)
        this.electronSrv.ipcRenderer.removeAllListeners(`scope:deleted`)
        resolve(response);
      }
      this.electronSrv.ipcRenderer.on(`scope:deleted`, resolver)
    })
  }

  async updateRule (rule:Rule):Promise<boolean> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send(`update:rule`, rule);
      const resolver = (_event:any, response: any) => {
        // console.log(response)
        this.electronSrv.ipcRenderer.removeAllListeners(`rule:updated`)
        resolve(response);
      }
      this.electronSrv.ipcRenderer.on(`rule:updated`, resolver)
    })
  }
  async updateRulesByImport (rules:Rule[]):Promise<boolean> {
    // console.log('updateRulesByImport', rules)
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send(`update:rules`, rules);
      const resolver = (_event:any, response: any) => {
        // console.log(response)
        this.electronSrv.ipcRenderer.removeAllListeners(`rules:updated`)
        resolve(response);
      }
      this.electronSrv.ipcRenderer.on(`rules:updated`, resolver)
    })
  }
  async uploadRedirections (rules?:Rule[]):Promise<boolean> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send(`add:rules`, rules);
      const resolver = (_event:any, response: any) => {
        // console.log(response)
        this.electronSrv.ipcRenderer.removeAllListeners(`rules:added`)
        resolve(response);
      }
      this.electronSrv.ipcRenderer.on(`rules:added`, resolver)
    })
  }

  async uploadScope (scope?:Scope):Promise<boolean> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send(`add:scope`, [scope]);
      const resolver = (_event:any, response: any) => {
        // console.log(response)
        this.electronSrv.ipcRenderer.removeAllListeners(`scope:added`)
        resolve(response);
      }
      this.electronSrv.ipcRenderer.on(`scope:added`, resolver)
    })
  }
  async uploadScopeConfig (scopeConfig?:ScopeConfig):Promise<boolean> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send(`add:scope:config`, [scopeConfig]);
      const resolver = (_event:any, response: any) => {
        // console.log(response)
        this.electronSrv.ipcRenderer.removeAllListeners(`scope:config:added`)
        resolve(response);
      }
      this.electronSrv.ipcRenderer.on(`scope:config:added`, resolver)
    })
  }
  //updateScope
  async updateScope (scope?:Scope):Promise<boolean> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send(`update:scope`, scope);
      const resolver = (_event:any, response: any) => {
        // console.log(response)
        this.electronSrv.ipcRenderer.removeAllListeners(`scope:updated`)
        resolve(response);
      }
      this.electronSrv.ipcRenderer.on(`scope:updated`, resolver)
    })
  }
  //updateScopeConfig
  async updateScopeConfig (scopeConfig?:ScopeConfig):Promise<boolean> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send(`update:scope:config`, scopeConfig);
      const resolver = (_event:any, response: any) => {
        // console.log(response)
        this.electronSrv.ipcRenderer.removeAllListeners(`scope:"config:updated`)
        resolve(response);
      }
      this.electronSrv.ipcRenderer.on(`scope:config:updated`, resolver)
    })
  }
  //updateScopesPosition
  async updateScopesPosition (scopes?:Scope[]):Promise<boolean> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send(`update:scopes:position`, scopes);
      const resolver = (_event:any, response: any) => {
        // console.log(response)
        this.electronSrv.ipcRenderer.removeAllListeners(`scopes:position:updated`)
        resolve(response);
      }
      this.electronSrv.ipcRenderer.on(`scopes:position:updated`, resolver)
    })
  }


  async updateRulesPosition (rules?:Rule[]):Promise<boolean> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send(`update:rules:position`, rules);
      const resolver = (_event:any, response: any) => {
        // console.log(response)
        this.electronSrv.ipcRenderer.removeAllListeners(`rules:position:updated`)
        resolve(response);
      }
      this.electronSrv.ipcRenderer.on(`rules:position:updated`, resolver)
    })
  }

  async updateHeaderConfig (config:string):Promise<boolean> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send(`update:header:config`, config);
      const resolver = (_event:any, response: any) => {
        // console.log(response)
        this.electronSrv.ipcRenderer.removeAllListeners(`header:config:updated`)
        resolve(response);
      }
      this.electronSrv.ipcRenderer.on(`header:config:updated`, resolver)
    })
  }

  async updateFooterConfig (config:string):Promise<boolean> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send(`update:footer:config`, config);
      const resolver = (_event:any, response: any) => {
        // console.log(response)
        this.electronSrv.ipcRenderer.removeAllListeners(`footer:config:updated`)
        resolve(response);
      }
      this.electronSrv.ipcRenderer.on(`footer:config:updated`, resolver)
    })
  }
  async checkIfOnline ():Promise<boolean> {
    return new Promise (async (resolve, reject)=>{
      this.electronSrv.ipcRenderer.send(`online:check`);
      const resolver = (_event:any, response: any) => {
        // // console.log(response)
        this.electronSrv.ipcRenderer.removeAllListeners(`checked:online`)
        resolve(response);
      }
      this.electronSrv.ipcRenderer.on(`checked:online`, resolver)
    })
  }

}
