import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Router } from '@angular/router';
import pjson from 'src/package.json';
import lib from 'src/assets/js/test_svg';
import * as createjs from 'createjs-module';
@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.less']
})
export class SplashScreenComponent implements OnInit, AfterViewInit {

  version = pjson.version;
  constructor(
    private router: Router
    ) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.router.navigate(['/overview']);
    },50000)
  }
  ngAfterViewInit() {
    let lib:any = {};
    let images:any = {};
    let ss:any = {};
    (function (lib:any, img, cjs, ss) {

      let p; // shortcut to reference prototypes
      lib.webFontTxtFilters = {};

      // library properties:
      lib.properties = {
        width: 98,
        height: 98,
        fps: 24,
        color: "#FFFFFF",
        webfonts: {},
        manifest: []
      };



      lib.webfontAvailable = function(family) {
        lib.properties.webfonts[family] = true;
        let txtFilters = lib.webFontTxtFilters && lib.webFontTxtFilters[family] || [];
        for(let f = 0; f < txtFilters.length; ++f) {
          txtFilters[f].updateCache();
        }
      };
      // symbols:



      (lib.Symbole1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque 1
        this.shape = new cjs.Shape();
        this.shape.graphics.f().s("#000000").ss(1,1,1).p("AHlAAQAADJiOCOQiOCOjJAAQjIAAiOiOQiOiOAAjJQAAjICOiOQCOiODIAAQDJAACOCOQCOCOAADIg");

        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f("#FFCC66").s().p("AlVFWQiPiNAAjJQAAjICPiNQCNiPDIAAQDJAACNCPQCPCNAADIQAADJiPCNQiNCPjJAAQjIAAiNiPg");

        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

      }).prototype = p = new cjs.MovieClip();
      p.nominalBounds = new cjs.Rectangle(-49.5,-49.5,99,99);


      // stage content:
      (lib.test_svg = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // Calque 1
        this.instance = new lib.Symbole1();
        this.instance.setTransform(49,49);

        this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleY:0.73},14).wait(1));

      }).prototype = p = new cjs.MovieClip();
      p.nominalBounds = new cjs.Rectangle(49,49,98,98);

      })(lib , images, createjs, ss);




      let stage = new createjs.Stage("canvas");
      let logo = new lib.test_svg();

      stage.addChild(logo);
      stage.update();

      createjs.Ticker.setFPS(lib.properties.fps);
      createjs.Ticker.addEventListener("tick", stage);
  }

}
