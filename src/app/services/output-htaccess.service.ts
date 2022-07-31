import { Injectable } from '@angular/core';
import { Scope, ScopeConfig, Rule,RedirectType } from '../interfaces/interfaces';
/**
 * Some usefull consts to generate the htaccess file
 */
const texts = {
  comments:{
    chara:'#',
    full_line:'###################################################################################',
    label_redirect:'REDIRECTIONS',
  },
  scope_config:{
    comment:'# CONFIG:\n',
    condition_open_tag_start:'<If "%{HTTP_HOST} == \'',
    condition_open_tag_end:'\'">\n',
    condition_close_tag:'</If>',
  }
}
@Injectable({
  providedIn: 'root'
})
/**
 * Ht-access file exporter
 * 
 * Build the htaccess file in the right format
 * add comments, carriage returns,
 */
export class OutputHtaccessService {
  texts = texts
  constructor() { }

  /**
   * Generate the Scope Config output
   * 
   * if rules[] is provided,   the output is good full scoped output
   * @param {Scope} scope 
   * @param {ScopeConfig} scopeConfig 
   * @param {string[]|null} rules 
   * @returns  {Promise<string>} the output
   */
  async getScopeConfigPreview(scope:Scope, scopeConfig:ScopeConfig, rules?:string[]):Promise<string> {
      let header = await this.generateHeaderComment(scope.label);
      return new Promise((resolve,reject)=>{
        let output:string = '\n\n';
        output += header
        output += '\n'
        output += texts.scope_config.comment
        output += scopeConfig.config
        output += '\n\n'
        output += `${texts.scope_config.condition_open_tag_start}${scopeConfig.condition}${texts.scope_config.condition_open_tag_end}`
        output += '\n\n'
        rules?.forEach((rule)=>{
          output += `${rule}\n`
        })
        output += '\n\n'
        output += texts.scope_config.condition_close_tag
        resolve(output);
      })
  }
  /**
   * Generate the formated scope 'Header' comment
   * @param {string} label 
   * @returns {string} scope formated header comment
   */
  async generateHeaderComment(label:string):Promise<string> {
      return new Promise((resolve,reject)=>{
        let output:string  = texts.comments.full_line + '\n';
        let center = ' ' +  texts.comments.label_redirect  + ' ' + label + ' ';
        center = center.padStart((texts.comments.full_line.length + center.length)/2, texts.comments.chara);
        output += center.padEnd(texts.comments.full_line.length, texts.comments.chara) + '\n';
        output += texts.comments.full_line + '\n';
        resolve(output);
      })
  }
  

  /**
   * Generate the rules part of a scope
   * 
   * @param {Rule[]} rules the array of rules to be formated
   * @param {RedirectType[]} redirecTypes the array of redirecTypes for converte rredirect_type_id to the good Redirection Type
   * @returns {Promise<string[]>} all rules lines
   */
  async generateRuleLines(rules:Rule[], redirecTypes:RedirectType[]):Promise<string[]> {
      return new Promise((resolve,reject)=>{
        let rulesString:string[] = [];
        for (const rule of rules) {
          let redValue = redTypByID(rule.redirect_type_id).value;
          rulesString.push(`${rule.active ? '' : '# '}${redValue} ${rule.origin} ${rule.target}`);
        }
        resolve(rulesString);
        function redTypByID(id:number):RedirectType{
          const byId = (element:any) => element.id === id;
          const i = redirecTypes.findIndex(byId);
          if(i >= 0){
            return redirecTypes[i];
          } else {
            return {
                label: 'default',
                value: 'Redirect',
            };
          }
        }
      })
  }
}
