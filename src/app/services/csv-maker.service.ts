import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvMakerService {

  constructor() { }

  /**
   * Build the csv body from bad Redirects array
   * @param {any} bads Bad Redirects to be exported in a csv for check
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
      output += badRed.rule.origin.trim() + ';';
      output += badRed.rule.target.trim() + ';\n';
    });

  return output;
  }

  makeCsvFromRules(rules:any):string {
    let output = 'id;scope_id;redirect_type_id;origin;target;\n';
    rules.forEach((rule:any) => {
      output += rule.id + ';';
      output += rule.scope_id + ';';
      output += rule.redirect_type_id + ';';
      output += rule.origin.trim() + ';';
      output += rule.target.trim() + ';\n';
    });

    return output
  }
}
