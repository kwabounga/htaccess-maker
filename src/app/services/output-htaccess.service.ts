import { Injectable } from '@angular/core';
const texts = {
  comments:{
    chara:'#',
    full_line:'###################################################################################',
    start_line:'####################',
    label_redirect:'REDIRECTIONS',
  },
  header_scope_config:{

  }
}
@Injectable({
  providedIn: 'root'
})
export class OutputHtaccessService {

  constructor() { }

  async generateHeaderComment(label:string):Promise<string> {
      return new Promise((resolve,reject)=>{
        let output:string  = texts.comments.full_line + '\n';
        let center = texts.comments.start_line + ' ' +  texts.comments.label_redirect  + ' ' + label + ' ';
        //let leftSize = texts.comments.full_line.length - center.length;
        output += center.padEnd(texts.comments.full_line.length, texts.comments.chara) + '\n'
        output += texts.comments.full_line + '\n'
        resolve(output);
      })
  }
}
