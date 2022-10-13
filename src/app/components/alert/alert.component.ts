import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.less']
})
export class AlertComponent implements OnInit {
  isOpen:boolean = false;
  iconType:string = 'info';
  text:string = 'ceci est une alerte'
  timer:any = null;
  show:string ='show';
  constructor() { }

  ngOnInit(): void {
  }

  openAlert(type:string, text:string, timeMS:null|number=null, callback:any=null){
    this.text = text;
    this.iconType = type;

    if(timeMS){
      this.timer = setTimeout(()=>{
        this.closeAlert(callback);
      },timeMS)
    }
    this.show = 'show';
    this.isOpen = true;
  }
  closeAlert(callback:any=null) {
    if(this.timer){
      clearTimeout(this.timer)
    }


    this.show = '';
    this.text = '';
    setTimeout(()=>{
      this.isOpen = false;
      if(callback){
        callback();
      }
    },500)
  }


}
