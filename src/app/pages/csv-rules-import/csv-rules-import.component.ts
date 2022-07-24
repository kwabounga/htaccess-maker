import { Component, Input, OnInit } from '@angular/core';
import { FilesStuffService } from 'src/app/services/files-stuff.service';
import { HttpClient } from '@angular/common/http';

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

  constructor(protected fileStuffSrv:FilesStuffService,private http: HttpClient) { }
  csv:any
  
  ngOnInit(): void {
  }

  downloadCsvSample(){
    const sample = `scope_id;redirect_type;origin;target;
2;permanent;/test.html;www.test.com;
5;temporary;/test.html;www.test.com/test.html;
`
    this.fileStuffSrv.exportFile('sample.csv',sample);
  }
  uploadCsvRedirect(){
    console.log('csv-rules-import',this.csv)
  }
  onFileSelected(event:any) {
    const file:File = event.target.files[0];
    if (file) {
      file.text().then((text)=>{
        console.log(text)
        this.csv = text;
      })        
    }
  }
}
