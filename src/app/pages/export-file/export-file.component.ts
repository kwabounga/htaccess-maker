import { Component, OnInit } from '@angular/core';
import { DataMockService } from 'src/app/services/data-mock.service';

@Component({
  selector: 'app-export-file',
  templateUrl: './export-file.component.html',
  styleUrls: ['./export-file.component.css']
})
export class ExportFileComponent implements OnInit {
  htAccessData:string ='';
  constructor(protected dataMockSrv:DataMockService) { }

  async ngOnInit(): Promise<void> {
    this.htAccessData = await this.dataMockSrv.generateHtaccessFile()
  }
  exportFile(){
    let blob = new Blob([this.htAccessData], { type: 'application/x-extension-htaccess' });
    let url= window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    let d = new Date()
    a.download = `${d.getTime()}-${d.getDate()}-${d.getMonth()}-${d.getFullYear()}.htaccess`;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
