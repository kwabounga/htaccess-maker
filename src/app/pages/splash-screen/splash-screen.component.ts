import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import pjson from 'src/package.json';
@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.less']
})
export class SplashScreenComponent implements OnInit {

  version = pjson.version;
  constructor(
    private router: Router
    ) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.router.navigate(['/overview']);
    },5000)
  }

}
