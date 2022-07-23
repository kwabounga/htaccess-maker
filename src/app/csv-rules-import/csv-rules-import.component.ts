import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-csv-rules-import',
  templateUrl: './csv-rules-import.component.html',
  styleUrls: ['./csv-rules-import.component.css']
})
export class CsvRulesImportComponent implements OnInit {

  // id=0;

  // scopeConfig:ScopeConfig  = {
  //   label: "",
  //   condition: "",
  //   position:0,
  //   config:""
  // };

  // scope:Scope = {
  //   label:""
  // };

  constructor() { }

  ngOnInit(): void {
  }

  saveConfig(event:any){
    console.log('csv-rules-import',event)
  }

}
