import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mini-button',
  templateUrl: './mini-button.component.html',
  styleUrls: ['./mini-button.component.css'],
  host:{
    class:"btn-close"
  }
})
export class MiniButtonComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }


}
