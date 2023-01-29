import { Component, OnInit } from '@angular/core';
import { DataFromIpcService } from 'src/app/services/data-from-ipc.service';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-batch-processing',
  templateUrl: './batch-processing.component.html',
  styleUrls: ['./batch-processing.component.less'],
  host: {'class': 'app-content'}
})
export class BatchProcessingComponent implements OnInit {
  pageLoaded:boolean = false;
  scopesRefs: any = [];
  constructor(
    protected dataSrv: DataFromIpcService,
    private logger: LoggerService,
    ) { }

  async ngOnInit() {
    this.scopesRefs = await this.dataSrv.getScopesAll();
    setTimeout(()=>{
      this.pageLoaded = true;
    },500)
  }
  export(event: any) {
    this.logger.log(event)
  }
  async onFileSelected(event: any) {
    console.log('onFileSelected');
    const file: any = event.target.files[0];
    if (file) {
      this.logger.log('need processing the file: ' + file.name)
    }
  }
}
