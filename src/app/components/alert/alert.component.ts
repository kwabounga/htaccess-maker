import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  isOpen:boolean = false;
  iconType:string = 'info';
  text:string = 'ceci est une modal'
  timer:any = null;
  show:string ='show';
  constructor() { }

  ngOnInit(): void {
  }

  openModal(type:string, text:string, timeMS:null|number=null, callback:any=null){
    this.text = text;
    this.iconType = type;
    
    if(timeMS){
      this.timer = setTimeout(()=>{
        this.closeModal(callback);
      },timeMS)
    }
    this.show = 'show';
    this.isOpen = true;
  }
  closeModal(callback:any=null) {
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