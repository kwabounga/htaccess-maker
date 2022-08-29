import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvMakerService {

  constructor() { }

  /**
   * Build the csv body from bad Redirects array
   * @param {any} bads Bad Redictions to be exported in a csv for check
   * @returns {string} the csv Body to be exported :
   * @see : filesStuffService to generate the csv file
   */
  makeCsvFromBadRedirections(bads:any):string {
    let output = 'reason_code;reason;method;origin;target;\n';
    console.log(bads)
    bads.forEach((badRed:any) => {
      output += badRed.reason_code + ';';
      output += badRed.reason + ';';
      output += badRed.rule.redirect_type_id + ';';
      output += badRed.rule.origin + ';';
      output += badRed.rule.target + ';\n';
    });

  return output;
  }
}
