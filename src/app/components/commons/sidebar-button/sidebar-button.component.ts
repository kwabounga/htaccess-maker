import { Component, AfterViewInit, Input, ElementRef } from '@angular/core';
import { Tooltip } from 'bootstrap';
import { LoggerService } from 'src/app/services/logger.service';
@Component({
  selector: 'app-sidebar-button',
  templateUrl: './sidebar-button.component.html',
  styleUrls: ['./sidebar-button.component.css']
})
export class SidebarButtonComponent implements AfterViewInit {
  @Input() size:string = '30px';
  @Input() title?:string;
  @Input() route?:string;
  @Input() routeActive:string = 'active';
  @Input() style:string = 'secondary';
  @Input() svg_path?:string;

  tooltipElement!:any;

  constructor(
    private logger: LoggerService,
    private elem: ElementRef
    ) { }
  /* Use AfterViewInit lifcycle  when title is allready defined */
  ngAfterViewInit(){
    // using set time out for wait the Promises response of translation
    setTimeout(()=>{
      let tooltipTrigger = this.elem.nativeElement.querySelector('[data-bs-toggle="tooltip"]')
      this.tooltipElement = new Tooltip(tooltipTrigger);
    },200)

  }
  hideTooltip(){
    this.tooltipElement.hide()
  }
  async hoverButton(){
    this.logger.log(`Click to navigate to ${await this?.route}`)
  }
  leaveButton(){
    this.logger.clear()
  }
}
