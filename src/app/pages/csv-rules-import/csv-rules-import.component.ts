import { Component, Input, OnInit } from '@angular/core';
import { FilesStuffService } from 'src/app/services/files-stuff.service';
/* import { HttpClient } from '@angular/common/http'; */

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

  constructor(protected fileStuffSrv:FilesStuffService/* ,private http: HttpClient */) { }
  csv:any
  
  ngOnInit(): void {
  }

  downloadCsvSample(){
    const sample = `magento_scope_id;redirect_type;origin;target;
2;permanent;/test.html;www.test.com;
5;temporary;/test.html;www.test.com/test.html;
`
    this.fileStuffSrv.exportFile('sample.csv',sample);
  }
  uploadCsvRedirect(){
    console.log('csv-rules-import',this.csv)
  }
  async onFileSelected(event:any) {
    const file:any = event.target.files[0];
    if (file) {
      console.log(file)
      console.log(file.type,file.name , file.path)
      // console.log(`csv file selected: ${file.path}`)
      this.csv = await file.text().then((text:string)=>{
        console.log(text)
        return text;
      });
    } else {
      this.csv="";
      console.log('no csv file selected')
    }
    if(this.csv.trim()!==""){
      let redToBeSaved:string[] = [];
      let redToBeChecked:string[] = [];
      const notEmpty = (r:string)=> r.trim() !== "";
      let tempArray = this.csv.split('\n');
      tempArray.shift();
      let redToBeProcessed = tempArray.filter(notEmpty);

      console.log(redToBeProcessed)

    }
  }
}
