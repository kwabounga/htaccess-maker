import { Component, OnInit } from '@angular/core';
import { DataMockService } from 'src/app/services/data-mock.service';
import { FilesStuffService } from 'src/app/services/files-stuff.service';

@Component({
  selector: 'app-export-file',
  templateUrl: './export-file.component.html',
  styleUrls: ['./export-file.component.css']
})
export class ExportFileComponent implements OnInit {
  htAccessData:string ='';
  constructor(protected dataMockSrv:DataMockService, protected fileStuffSrv:FilesStuffService) { }

  async ngOnInit(): Promise<void> {
    this.htAccessData = await this.dataMockSrv.generateHtaccessFile()
  }
  exportFile(){
    let d = new Date();
    this.fileStuffSrv.exportFile(`${d.getTime()}-${d.getDate()}-${d.getMonth()}-${d.getFullYear()}.htaccess`,this.htAccessData);
  }
}
