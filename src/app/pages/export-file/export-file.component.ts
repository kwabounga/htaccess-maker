import { Component, OnInit } from '@angular/core';
import { DataMockService } from 'src/app/services/data-mock.service';
import { DataFromIpcService } from 'src/app/services/data-from-ipc.service';
import { FilesStuffService } from 'src/app/services/files-stuff.service';

@Component({
  selector: 'app-export-file',
  templateUrl: './export-file.component.html',
  styleUrls: ['./export-file.component.css'],
  host: {'class': 'app-content app-export-file'}
})
export class ExportFileComponent implements OnInit {
  htAccessData:string ='';
  constructor(protected dataSrv:DataFromIpcService, protected fileStuffSrv:FilesStuffService) { }

  async ngOnInit(): Promise<void> {
    this.htAccessData = await this.dataSrv.generateHtaccessFile()
  }
  exportFile(){
    let d = new Date();
    this.fileStuffSrv.exportFile(`${d.getTime()}-${d.getDate()}-${d.getMonth()}-${d.getFullYear()}.htaccess`,this.htAccessData);
  }
}
