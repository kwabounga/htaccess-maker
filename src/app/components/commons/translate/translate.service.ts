import { Injectable } from '@angular/core';
import pjson from 'src/package.json';
@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  trad:any;
  constructor() { }
  async i18n(txt:string, val:any=[]):Promise<string> {

    let output = txt;
    
    this.trad = await import('../../../../assets/' + (pjson.i18n ?? 'fr_FR') +'.json')
    .catch((reason)=>{
      console.error('You MUST Have ' + ( pjson.i18n ?? 'fr_FR' ) + '.json file in ./assets/ folder')
      console.error(reason)
    });
    
    if(this.trad){
      output = this.trad[txt] ?? txt;
    }else{
      output = txt;
    }
    
    let values = [...val];
    if(values.length){
      values.forEach((v,i) => {
        output = output.replace('%'+i, v);
      });
    }
    return output;
  }
}