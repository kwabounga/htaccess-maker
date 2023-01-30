import { Component, OnInit } from '@angular/core';
import { DataMockService } from 'src/app/services/data-mock.service';
import { DataFromIpcService } from 'src/app/services/data-from-ipc.service';
import { FilesStuffService } from 'src/app/services/files-stuff.service';
import { LoggerService } from 'src/app/services/logger.service';
import { getDateSlug } from "src/app/utils/utils";
@Component({
  selector: 'app-export-file',
  templateUrl: './export-file.component.html',
  styleUrls: ['./export-file.component.less'],
  host: {'class': 'app-content app-export-file'}
})
export class ExportFileComponent implements OnInit {
  htAccessData:string ='';
  pageLoaded:boolean = false;
  constructor(
    private logger: LoggerService,
    protected dataSrv:DataFromIpcService,
    protected fileStuffSrv:FilesStuffService
    ) { }

  async ngOnInit(): Promise<void> {
    this.htAccessData = await this.dataSrv.generateHtaccessFile();
    this.pageLoaded = true;
    this.logger.log('ready to export .htaccess file')
  }
  exportFile(){
    // let d = new Date();
    // this.fileStuffSrv.exportFile(`${d.getTime()}-${d.getDate()}-${d.getMonth()}-${d.getFullYear()}.htaccess`,this.htAccessData);
    this.fileStuffSrv.exportFile(`${getDateSlug()}.htaccess`,this.htAccessData);
  }
  hoverButton(){
    this.logger.log('Click to export the file')
  }
  leaveButton(){
    this.logger.clear()
  }
}
