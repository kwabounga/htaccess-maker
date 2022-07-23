import { Injectable } from '@angular/core';
import { Scope, ScopeConfig } from '../interfaces/interfaces';
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
export class OutputHtaccessService {
  texts = texts
  constructor() { }

  async getScopeConfigPreview(scope:Scope, scopeConfig:ScopeConfig, rules?:string[]):Promise<string> {
      let header = await this.generateHeaderComment(scope.label);
      return new Promise((resolve,reject)=>{
        let output:string = '';
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
}
