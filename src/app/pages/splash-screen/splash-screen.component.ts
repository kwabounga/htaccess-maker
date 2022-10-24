import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import pjson from 'src/package.json';
import * as createjs from 'createjs-module';
@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.less']
})
export class SplashScreenComponent implements OnInit, AfterViewInit, OnDestroy {
  stage:any;
  lib:any = {};;
  version = pjson.version;
  constructor(
    private router: Router
    ) { }

  ngOnDestroy(): void {
    console.log('OnDestroy animation')
    this.stage.removeAllChildren();
    this.stage.update();
    createjs.Ticker.removeEventListener("tick",this.stage)
  }
  ngOnInit(): void {
    setTimeout(()=>{
      this.router.navigate(['/overview']);
    },5000)
  }
  ngAfterViewInit() {    
    let images:any = {};
    let ss:any = {};
    (function (lib:any, img, cjs, ss) {

      let p; // shortcut to reference prototypes
// library properties:
lib.properties = {
	width: 600,
	height: 450,
	fps: 60,
	color: "#333333",
	webfonts: {},
	manifest: []
};



lib.webfontAvailable = function(family) { 
	lib.properties.webfonts[family] = true;
	var txtFilters = lib.webFontTxtFilters && lib.webFontTxtFilters[family] || [];
	for(var f = 0; f < txtFilters.length; ++f) {
		txtFilters[f].updateCache();
	}
};
// symbols:



(lib.maker = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Calque 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AiJDlQgBgFACgDIADgCIADgCIgSgDQgJgDgBgIQAggRAkABQgKhgAGiCQAEhgAEgPQACACAYAHQACgBABgGIABgIQgigRgRgBQgFABgCAGQgEAIgCABQgMgEAFgLQAGgLAKAAQgCgCgMgCQgKAAAAgGQAAgIALABIARAAQgDgCgMgCQgLgCgCgEQADgGAHgCIAOgBQASgBABgOIAqAGQAaACANAFIgFAOQgBAIgDAGQAHAIAGgGIAHgGIAGgIQAngaAogOQAEAEgDAFQgEAHADABQAEAEAAgIQABgIAEgBQAjAMAaAwQgDAEgIgDQgJgCgDADQACAFAJAIQAIAHACAFQgVAWgHAZQAEACAKgMQAJgLAFACQAHABgBAHQgCAKACABIgsA7QgfgGgRgVQgTgXAQgcQgBgBgGADQgIADgCgFQAFgOAPgOIANgLIAOgLQgOgTgQADQgOABgOASQgdAkgBAsQAAADACAEIACAHQACAIgGB2QgFB0ABAKQACACAEAAQAEgCADACQADAJgBAKQAZANgCgDQADAEgDAEIgGAGIANABIANABQAPABAEAHQgCAIgKgCQgPgCgDAAQgBABAAAAQAAAAAAAAQAAABAAAAQAAAAABAAIADADQAFAFgCAGQiFgDg7gPgAgXC4QADAGAEABQAEAAADgHQgHABgEgJIgGgMIAAAAIAAAAQgFAIAIAMgAg1C8QALACAIgCQgFgHAAgPQAAgVgCgFQgBAPgCAFQgDAKgJACQgDgCgCgHIgDgLIgHAjIADAAIAPABgAhRCnQAUgngXhrIADCSgAgrBQQARifgVg+QgHBvALBugAhDAqQAJhjgRg1QgKA0ASBkgABVhUQAFAGAIADQgEgUgLgEQgDAGAFAJgAgHh0QgCAOAHAIQgBgHADgPQAEgLgCgFQgGADgDANgAg4i0QASAGAGANQgIAKAKAUQADgIgCgPQgCgSABgIQgFACgKgDIgFgBQgEAAgCACgABojgQABALAGAHQAIAJAIgEIgXgXIAAgBIAAABg");
	this.shape.setTransform(93.3,6.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AABDoQgBgCAAgGIgCgJIgSgBIgSgBQgVgCgJgHQABgHAHgEIAGgDQAFgBACgCQgGgGgbgKQgWgJgFgMQAEgPgMgNQgOgQgCgJQgBABgEAIQgCAFgGgBQgIgSAGgyQAFgrgLgOQAGgHAIgBQAEgUgHgHIAJgjQAGgVAEgMQAMgmAUgQQACgCgCgEQgBgFADgCQAMgEAugdQAggXAbAEQgBAGgFAEIgMAHQAHADAPAEQARADAGADQABgBgEgGQgDgGAEgCQAKADANAOIAKANQAGAJAGAFQAeAgADAHQAMAYgXAWQALAxAAAiQgTAAgKAPQgiAIg0gEIgqgFIgrgEQAeBOAGBAQAKADA9AMIALg9QAHgkAMgRQAHACgCAMIgDAUIALgdQAHgQALgHQgCACAKAIQAlgHAEANQgDAJgOADIgbABQAEAGATgEQATgEAGAGQgMAUgQAxQgRAwgLAVQgEADgFgBQgiApgdAAQgMAAgMgHgAAdDZIgWACQAEANARgDQASgCAGgKIgHAAIgQAAgAAYDNQAZABALgCQgLgCgIAAQgLAAgGADgAghDLQAJACAFgDQgHgGgJgBQgLgCgDAJIACAAIAOABgABIDGQAGgEAEgHQAFgJgFgDQgEAEgUABQgQABgDALIAEAAQANAAAQAGgAAFDCQACAEAGAAQAFAAACgEIgDgBIgFgBIgCAAQgEAAgBACgAgRDAIALADIAEADIgEgDIgDgCIgGgCIgCABgAgSCrQAKADAEgGQgFAAgIgCIgNgEQABAHALACgAA/CKQgGASAIAGQAHgKAIgoIgIAAIAAAAIgJAagAg9A6QAGAJABAjQAAAgAKAIQABgTgIglQgGgcgDAAIgBAAgABrBvIgBACIgFAIQgGAJACAHIAKgaIABgDIACgCIAAAAIAAABIAAgBIAAAAIgCACIgBADgAhWCHIgBgMIAAgKQgBgMgIgCQABAaAJAKgAh2BmIAIAKIAHAKQgFgggQgMQgDAMAJAMgABlBFQgBAHgEARQgFAOADAHQADgMATgMQAUgMAEgNIgDAAQgIAAgcAEgABQBVQgEALADAFIACgIIAFgJQAEgLgEgEQgBAEgFAMgAh/BBQgCAEAFAAQADgBgBgFIgEgFQABABgCAGgAiJAjQgCAVACALQAIg3gEgKIgEAhgAhYA6IAAgcQABgSgDgJQgFAqAHANgABKgGQAIAGAMAAQgBgEgIgCIgHgBIgEABgABDglQgBAJAGgCIgBgFQAAgBAAAAQgBgBAAAAQAAAAgBAAQAAAAgBAAIgBAAgAACgnIgQACQAyAMAUgIQgIgHgZAAIgVABgAgTiSQgIAvgpBDQAMACAEgEIAEgGIADgFQAPgDAiAAQAlAAAPgCQAAhQgHgjQgNAKg3AJgABlgpIAGACIAHACQgKgRgMgiQgNgngHgNQAJA5AUAqgABPg+IAAAHQACAIAFACQACgEgJgUIAAAHgAhEgyQAhg8AFgiIgGAAQgdA8gDAigAhciGIgFAMQgGAOAFAHIAJgUQAFgLACgKIgDgBIgDgBIgEAKgABziBQACAOACAHQALgKgFgOQgEgNgLgFIAFAVgAg8iHQgCAJADAIQACgFADgIQAFgHAAgGIgDgBQgGAAgCAKgAgzijQgJACABAIIAPAAIAHgIQAFgFgGgBIgNAEgAgVinIAEAKQAcgBAPgJIgagDIgGgBQgKAAgFAEgABYinQADgFgFgFIgGgFIgDgDQAHARAEABgAg+i2IAAAHQgBABAAABQAAAAAAABQAAAAAAABQABAAAAABQAEgDAVgCQAQgCAEgIIgGgBQgKAAgdAEgAgGi3QAYAEAIgEIgJgBIgKgDIgFAAQgFAAgDAEgAAQjGIAEAAIAFACQAFABAEgDQgHgBAAgBIgNAAIgIAAQgCABAMABgAgVjKQgHACgCADQAIACAFgEQAHgFgBgDQgCACgIADg");
	this.shape_1.setTransform(58.6,6.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AhnE3QhEgRgTABQgaABgBABIABgVQAPgDAbABIAsAAQgKgFgegCQgcgDgJgHQAMgUAggEQAdgEAfAJQADgMgIg2QgOgBgCAUQgCAagCAEQgNgHgDgVIgDgoQgFAGACAcQADAZgJAEQgHgKgBgQIAAgOIAAgOQgCgdgBg8IgCheIgGhQQgFgzgBgeIgBgSIgBgRQgBgVAJgMQALACADARIACAeIAAAAIAAAAQAEgJACgRIAGgbIhHgCQABgDABgSQALgEA9gBQgIgEgggDQgcgCgIgKQBLgXAnANIAJALIAJAMQgCAIgKALQAAACAFACQAEACAAACIAHgJQADgFAIACQADANgFASIgHAgQgCAcAGBJQAIBFgFAoIA2g3QAhgkAZgTQgkgDgBABQAAgFAAgCIAFgEQgCgDgKgCQgLgBgCgFQAAgHAJgDIAIgCIAGgCQgBgCgJAAQgIAAABgHQANgIAqAAQBZAAAtAbQgDAJgVACQgVACgCALQACABAVAFQAOADgBAMQgJADgMgEQgRgFgEAAIgxBFQguA/gBADQACADADgEQADgFAFACQBqC8ACAHQABAGgDALQABAFAHAEQAIAEgBAIIAAAAIAAAAIAjADQAVABAFAJQgEAHgRACIgcAEQgDABAAAFQAAAGgCADQgkALgygFQgvgEgfgPQAFgWASADQgBgDgIgEQgIgEADgJQAEgBAKABQAOABAFgBQgEgDgSgBQgQgCgEgGQAAgJANAAIAMABIALgBQg0hkgOghIgaAaIgZAbQgBAMADAcQACAZgEANQgBADgFgBQgBgBgBAAQAAAAgBAAQAAAAgBABQAAAAAAAAQgBAKANACQAOABABAHQgBAIgJgCQgOgDgDABQAAAFANAGQALAFgGAJIAQADQAKACAFACQAQAFABAQQgPAHgWAAQgTAAgZgGgAiNEjQAGAAAvALQAhAIAUgHQgjgPgnAAQgQAAgQADgACeEnQg1AEhTgIQBmARAigNgAA3EbIAOgBIgOABQgOAAAAgCIAAgBIAAABQAAACAOAAgABdENQAEAKATACQAQACASgDQghgLgVAAIgDAAgAA1CgIALAfIANAeQAJARAOACIg5huIAKAegAAYC3IAIAPIAJAPQAKARANAGQgSgyg0hBQATApALAVgAh4CdIABgCQAIgQABgBQgDgDgKABIAEATIgBACgAgBBCQgFAHgCAGQAIAMAPAaQAQAaAIAMIgQgzQgKgfgIgSQgBAFgFAGgAhtCKIgBAAgAglBNQgEAJgUASQgPARgEAPQAKgHAngsQgCAAAAgFQAAgBAAAAQAAgBAAgBQgBAAAAAAQgBgBAAAAIgCABgAh6BkQgCAJAEAGIADgGIADgGQAFgIgFgGQgGABgCAKgAiRBJQgCgjAAhYQAAhQgDglQgKCkAPBMgAgSBCIAFgEIgFAEgAgNA+QAHgFAFgGQAGgLgFgIQgIAWgFAIgAh4gUQgBAyADAdQAQgwgShzIAABUgAgjAcQgKANABAGQAPgSA3g3QAtgtAXghQgEABgGgBIgJgCQhABHguA/gAgfgbIgPANIgPAOQgQASgBAUQAVgSAggpIAxhAQgQANgnAtgAAggFQgQAPgEAQQAggaAMgfQgEAFgUAVgAhWgoQgBhYgEgSQgHBCAMAogABmh8QAHACAFgBQAAgFgOABIgIAAQgBABgBAAQAAAAAAAAQgBABAAAAQABAAAAAAIAEAAIAIABgAirjDIAAAUQAAANACgBIAAgUQABgMgDAAIAAAAgAhcj0IAAgGIgWAAQABAFAIAAIAEAAQAHAAACABg");
	this.shape_2.setTransform(17.3,-1.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("ABQDkQgZgUgOgHQACgMgGgGQgWAKgBAXIgoATQgMgGgrAIQgnAHgUgOQAAgEAEgDIAHgEIAAgBIAAABIgNgCQgHgBgBgIQgDAAgEAEQgEADgGgBQgKgMgEgcIgGgtQgBgDgEgGIgEgKQAAgHAIgRQAGgOgFgJQABgGAHgFQAHgGABgEQAVgKApgeQAngaAagLQAJgBgBAHQAsgfAGgGQgEhFAEgnQgMgJgigBQgJAAgTgGQgSgFgGAAQgJACgOAKQgOALgIAAQABAIgDALQgDAKAAAHQAHgCAGgMQAGgKALABQABAIgIAMQgLAOgBAFQAFgBAKgPQAJgPALAAQABAMgMAPQgPASgDAHQAIgEAMgTQALgSAMgDQACALgKAOQgOATgCAEQAEgBAMgPQAKgNANAAQAHAUgLAYQgKAVgRAOQgFgGADgNIADgLIADgJQgFAAgJALQgLANgEACQgPgDgIABQgfgZgKgMQgVgaAEgaQAJAAAHAFIAGAFIAFAFQAGgFgBgJQAAgJgHgCQgBgWASgLIAlgNIgCgOQAUgIAggFQgCgPgBgBQAkgNAuAYIBNAnQAAADAKALQgEAJAGALQAFALgFAGQgJABgIgJQgIgJgJABIgBAIQAAABABAAQAAAAAAAAQABAAAAgBQAAgBABgBQADgEAEACQACAHABAUQAAATADAIQACgEABgRQABgOAGgDQAKADABAQQAAAHgCAUQABABAEAAQAFAAACADIgDCEIgDCGIAMAGIAMAGQAOAJAFAKQAMgVADg8IAAgPIAAgPQABgRAMgDQACAHgBAWQAAAWADAHIADgOQACgJAHAAQAIAYgMA5QgDADgCgBIgDgCIgDgCQgGARgWASQgZAUgHALQgPgGgYgTgAhGDGQgRADgFAJQAEgCAYgBQASgBAEgIIgNgBQgHAAgIABgABODQQAGADACgDIgDgCIgEgDQgGgDgDAEIAAAAIAIAEgAB0DLQALAFALgEQgVgQgMgBQAAALALAFgAiOC0QAAACAAAAQAAABABABQAAAAAAABQABAAAAAAQADgCgBgFQAAgFgEAAIAAAHgABBCzQACACADAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQABAAAAgBQABAAABAAQAAgBABAAQAAgBAAAAQAAgBAAAAIgPgHIAAANIADAAIADAAgAgtAZQgtAfgEARQgEASAKAgQALAkgBASQAIAAATgCQAQgBAJADQAEgGAWgWQAUgRACgNQACgKgJg5QgJg3ABgPQgGALguAggAiLCXQgCAGABAFQAFAAAAgKQAAgKgDgDQABAFgCAHgABFCdQAEADADAAIAAgwQgJgCgEgTIgGgYIAAApQgBAZAKAGQABAEgDAEQgDAEAAADIACAAQADAAADADgAibB1QgBAPAIAMQgBgIAGgQQAEgOgDgIQgMAEgBAPgAAeBuQAHgRACghIAAgdIACgcQgLgCgIgNIAIB6gAikBLQgEAKAFANQAOgDAEgKQAEgKgHgMQgNABgDALgABIBFIgBhAQgBglgGgTQAABWAIAigAh+ArQgJAHgFACQgBAKAHAHQABgKAJgIQALgKACgFQgHABgIAGgAAjgWIgCAEQgBADAFADIACgIQABgFgDgBIgCAEgAApghIAFgxQAEgggJgOQgRBKARAVgAiYh+IADgMQACgIgFgDQgFASAFAFgAAkiTQAAAHAFgBQADgCgCgHQgDgHgCgCIgBAMgAg2jdQAIACAEgCQgFgBgFgDIgJgFQgBAHAIACgAg7jyQAXASAdgKQgFAAgHgDIgNgEQgIgDgHAAQgGAAgGACg");
	this.shape_3.setTransform(-27.8,7.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("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");
	this.shape_4.setTransform(-80.2,6.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-112.7,-52,225.5,104.1);


(lib.htaccess = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Calque 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhxEMQgngKgbgQIAbhnQAWANAiALQAiALAjABQAjgBASgOQATgOgBgZQABgYgRgQQgRgRgqgSQhJgfgggmQgggpABgsQAAgwAZgmQAXgmAtgWQArgWA6gBQAqABAhAIQAiAJAYAMIgbBkQgSgKgagJQgbgJgeAAQggAAgQAOQgQAPgBAWQAAAWASAPQARAQAtASQBEAcAgAmQAhAoAAA3QAABOg3AtQg3AuhiABQgtgBgogJg");
	this.shape.setTransform(171.5,6.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhwEMQgogKgbgQIAahnQAWANAjALQAiALAjABQAjgBASgOQASgOAAgZQABgYgRgQQgRgRgpgSQhKgfgggmQgggpABgsQAAgwAYgmQAZgmAsgWQArgWA6gBQApABAjAIQAhAJAXAMIgaBkQgSgKgagJQgagJgfAAQggAAgQAOQgRAPAAAWQgBAWATAPQARAQAtASQBDAcAiAmQAgAoAAA3QAABOg4AtQg2AuhiABQgtgBgngJg");
	this.shape_1.setTransform(128.9,6.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AhuD1Qg5ghgeg8Qgfg9AAhTQAAhMAchBQAehBA2gmQA2goBNgBQBBAAAwAfQAwAeAaA7QAbA7AABXIgBAcIgCAaIk/AAQADAuAUAcQAVAcAfAOQAfAMAnAAQAnAAAfgGQAhgGAagKIAVBiQgiAOgsAJQgsAIgzAAQhQgBg7gggAgwidQgVATgKAdQgMAcgCAbIC/AAQABgcgJgdQgIgcgVgTQgUgTgigBQghABgWAUg");
	this.shape_2.setTransform(81.3,6.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AhID0Qg6ggggg9Qggg8AAhWQAAhPAhhAQAhg/A/glQA/glBWgBQAjAAAdAGQAdAGASAIIgXBtQgNgHgUgGQgVgFgdAAQgtABggAVQgdAWgQAlQgRAmAAAuQAAA0ATAlQASAlAeATQAgAUApAAQAbAAAVgFQAVgFARgIIAQBrQgTAJgiAHQgiAHgrAAQhNAAg5ghg");
	this.shape_3.setTransform(32.9,6.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AhID0Qg6ggggg9Qggg8AAhWQAAhPAhhAQAhg/A/glQA/glBWgBQAjAAAdAGQAdAGASAIIgXBtQgNgHgUgGQgVgFgdAAQgtABggAVQgdAWgQAlQgRAmAAAuQAAA0ATAlQASAlAeATQAgAUApAAQAbAAAVgFQAVgFARgIIAQBrQgTAJgiAHQgiAHgrAAQhNAAg5ghg");
	this.shape_4.setTransform(-12.1,6.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AiQD/QgkgWgUgkQgTgkAAgsQABhFAlgsQAlgrBBgWQBCgWBUAAQAAgbgIgVQgIgVgVgMQgVgMgkAAQglAAgjAKQgiAKgaAQIgbhcQAbgQAwgOQAwgOA8gBQBTABAuAfQAuAfATAyQASAzAAA7IAADCQAAAkACAhQABAhAEAZIh/AAIgJg4IgDAAQgXAgglARQgjASgtAAQgygBgjgWgAAAAOQgiAIgXAVQgWAVgBAnQABAmATARQAUASAbAAQAQAAAUgJQAVgJAPgUQAPgVABgiIAAhMIgFAAQglAAghAHg");
	this.shape_5.setTransform(-62.8,6.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgaE/QgggUgOgfQgOgggEghQgDggAAgXIAAj1IhFAAIAAhpIBFAAIAAhiICKgoIAACKIB2AAIAABpIh2AAIAADnQAAAwAQAVQAPAWAgAAQAQAAAKgBQAKgBAKgDIADBsQgPAHgZADQgYADgfABQg5gBgfgWg");
	this.shape_6.setTransform(-106.6,-0.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AB9FxIAAk+Ij5AAIAAE+IiOAAIAArhICOAAIAAEnID5AAIAAknICOAAIAALhg");
	this.shape_7.setTransform(-158.8,-3.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-194.8,-62.3,389.7,124.7);


(lib.htaccessMaker = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Calque 2
	this.instance = new lib.maker();
	this.instance.setTransform(16.1,52,1,1,-7.2);
	this.instance.shadow = new cjs.Shadow("#333333",0,0,5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Calque 1
	this.instance_1 = new lib.htaccess();
	this.instance_1.setTransform(0,-13.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-194.8,-76,389.7,202.2);


// stage content:
(lib.logo = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// Calque 3
	this.instance = new lib.htaccessMaker();
	this.instance.setTransform(300.1,351.3,0.645,0.645);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(115).to({_off:false},0).wait(110));

	// Calque 2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhGBHQgdgegBgpQABgpAdgdQAdgdApgBQApABAeAdQAdAdAAApQAAApgdAeQgeAegpAAQgpAAgdgeg");
	this.shape.setTransform(217.6,279.8);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(99).to({_off:false},0).wait(126));

	// Calque 6
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhnBzIACgzIgCABIAAi0IBngyIBnA0IAAC0IgCgBIAAAwIhhA0g");
	this.shape_1.setTransform(299.6,275);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AhnC0IACi0IgCAAIAAizIBngyIBnAzIAAC0IgCgBIAACyIhhAzg");
	this.shape_2.setTransform(299.6,268.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AhnD1IACk0IgCABIAAi2IBngyIBnAzIAAC3IgCgBIAAExIhhAzg");
	this.shape_3.setTransform(299.6,262.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AhnE1IACm1IgCABIAAi2IBngxIBnAzIAAC2IgCgBIAAGyIhhAzg");
	this.shape_4.setTransform(299.6,255.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AhnF2IACo2IgCABIAAi2IBngyIBnAzIAAC2IgCgBIAAI0IhhAzg");
	this.shape_5.setTransform(299.6,249.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AhnG2IACq3IgCABIAAi2IBngyIBnAzIAAC3IgCgBIAAK0IhhA0g");
	this.shape_6.setTransform(299.6,242.7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AhnH3IACs5IgCABIAAi2IBngxIBnAzIAAC2IgCgBIAAM2IhhAzg");
	this.shape_7.setTransform(299.6,236.2);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AhnI4IACu6IgCABIAAi2IBngyIBnAzIAAC3IgCgBIAAO3IhhAzg");
	this.shape_8.setTransform(299.6,229.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AhnJ4IACw7IgCABIAAi2IBngyIBnA0IAAC2IgCgBIAAQ4IhhA0g");
	this.shape_9.setTransform(299.6,223.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AhnK5IACy9IgCABIAAi1IBngyIBnAzIAAC2IgCgBIAAS6IhhAzg");
	this.shape_10.setTransform(299.6,216.9);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AhnL6IAC0+IgCABIAAi2IBngyIBnAzIAAC3IgCgBIAAU7IhhAzg");
	this.shape_11.setTransform(299.6,210.4);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AhnM6IAC2/IgCABIAAi2IBngxIBnAzIAAC2IgCgBIAAW8IhhAzg");
	this.shape_12.setTransform(299.6,203.9);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AhnN7IAC5AIgCAAIAAi1IBngyIBnAzIAAC2IgCgBIAAY+IhhAzg");
	this.shape_13.setTransform(299.6,197.5);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AhnO7IAC7BIgCABIAAi2IBngyIBnAzIAAC3IgCgBIAAa+IhhA0g");
	this.shape_14.setTransform(299.6,191);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AhjO6IABgEIAD68IgkARIjFhhIAAgBIFNiWIFECVIjDBjIgbgPIAAa+IhhA0g");
	this.shape_15.setTransform(299,191);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AhjO6IABgEIAD68IhUAqIjFhiIAAAAIF9ivIF0CtIjDBjIhLgnIAAa+IhhA0g");
	this.shape_16.setTransform(299,191);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AhjO6IAAgEIAD68IhzA5IjFhhIAAAAIGdi/IGUC9IjDBjIhrg3IgBa+IhgA0g");
	this.shape_17.setTransform(299.1,191);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AhjO6IAAgEIAD68IiUBJIjFhiIAAAAIG+jOIG1DNIjDBjIiMhHIgBa+IhgA0g");
	this.shape_18.setTransform(299.1,191);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AhkO6IABgEIAD68Ii0BZIjFhiIAAAAIHdjeIHWDeIjDBjIithYIAAa+IhhA0g");
	this.shape_19.setTransform(299.1,191);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AhkO6IAAgEIAD68IjUBpIjFhiIAAAAIH+juIH3DvIjDBjIjOhpIgBa+IhgA0g");
	this.shape_20.setTransform(299.2,191);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AhlO6IABgEIAD68Ij0B4IjFhhIAAAAIIdj+IIYEAIjDBjIjvh6IAAa+IhhA0g");
	this.shape_21.setTransform(299.2,191);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AhlO6IABgEIAD68IkVCIIjFhiIAAAAII+kNII5EQIjDBjIkQiKIAAa+IhhA0g");
	this.shape_22.setTransform(299.2,191);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AhlO6IAAgEIAD68Ik0CYIjFhiIAAAAIJekdIJZEgIjDBjIkwiaIgBa+IhgA0g");
	this.shape_23.setTransform(299.3,191);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AhoO6IABgEIAD68IlqCzIjFhiIAAgBIKUk3IKSE+IjDBjIlqi4IAAa+IhhA0g");
	this.shape_24.setTransform(299.5,191);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AhqO6IABgEIAD68ImfDNIjFhiIAAAAILKlSILLFbIjEBjImjjVIAAa+IhhA0g");
	this.shape_25.setTransform(299.8,191);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AhsO6IABgEIAD68InUDnIjFhhIAAgBIL/lsIMDF4IjCBjIndjyIAAa+IhhA0g");
	this.shape_26.setTransform(300,191);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AhuO6IAAgEIAD68IoIEBIjFhhIAAgBIM0mGIM9GWIjDBjIoWkQIgBa+IhfA0g");
	this.shape_27.setTransform(300.2,191);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AhsO6IABgEIAD68IogENIjFhiIAAAAINLmSINQGgIjDBjIopkaIAAa+IhhA0g");
	this.shape_28.setTransform(299.9,191);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AhpO6IABgEIAD68Io5EZIjFhiIAAAAINjmeINkGpIjDBjIo8kjIAAa+IhhA0g");
	this.shape_29.setTransform(299.6,191);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AhmO6IAAgEIAD68IpQElIjFhiIAAAAIN6mqIN3GyIjDBjIpOksIgBa+IhgA0g");
	this.shape_30.setTransform(299.4,191);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AhjO6IAAgEIAD68IppExIjFhiIAAgBIOTm1IOKG8IjDBjIphk2IgBa+IhgA0g");
	this.shape_31.setTransform(299.1,191);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AhkO6IAAgEIAD68IppExIjFhiIAAgBIOTm1IOMG9IAABCIjFBeIAAg+Iphk2IgBa+IhgA0g");
	this.shape_32.setTransform(299.2,191);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AhkO6IAAgEIAD68IppExIjFhiIAAgBIOTm1IOMG9IAABWIjFBeIAAhSIphk2IgBa+IhgA0g");
	this.shape_33.setTransform(299.2,191);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AhkO6IAAgEIAD68IppExIjFhiIAAgBIOTm1IOMG9IAABqIjFBeIAAhmIphk2IgBa+IhgA0g");
	this.shape_34.setTransform(299.2,191);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AhkO6IAAgEIAD68IppExIjFhiIAAgBIOTm1IOMG9IAAB+IjFBdIAAh5Iphk2IgBa+IhgA0g");
	this.shape_35.setTransform(299.2,191);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AhkO6IAAgEIAD68IppExIjFhiIAAgBIOTm1IOMG9IAACSIjFBdIAAiNIphk2IgBa+IhgA0g");
	this.shape_36.setTransform(299.2,191);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AhkO6IAAgEIAD68IppExIjFhiIAAgBIOTm1IOMG9IAAE+IjFBeIAAk6Iphk2IgBa+IhgA0g");
	this.shape_37.setTransform(299.2,191);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AhkO6IAAgEIAD68IppExIjFhiIAAgBIOTm1IOMG9IAAHqIjFBcIAAnkIphk2IgBa+IhgA0g");
	this.shape_38.setTransform(299.2,191);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AhkO6IAAgEIAD68IppExIjFhiIAAgBIOTm1IOMG9IAAKUIjFBeIAAqQIphk2IgBa+IhgA0g");
	this.shape_39.setTransform(299.2,191);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AhkO6IAAgEIAD68IppExIjFhiIAAgBIOTm1IOMG9IAANAIjFBeIAAs8Iphk2IgBa+IhgA0g");
	this.shape_40.setTransform(299.2,191);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AhlO6IABgEIAD68IppExIjFhiIAAgBIOTm1IOMG9IAANAIgIAEIAIAQIAAAXQgJDDiMCLQgXAYgZAUQgxAng3AYIgMAFIAAjpIAMgLIALgJQA/hAAThRIALADIAAs8Ipik2IAAa+IhhA0g");
	this.shape_41.setTransform(299.2,191);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AhlO6IABgEIAD68IppExIjFhiIAAgBIOTm1IOMG9IAAM9IAAADIgIAEIAIAQIAAAXQgJDDiMCLQgXAYgZAUQhaBHhtAXIAAjRQA6gWAwgwQA/hAAThRIALADIAAs8Ipik2IAAa+IhhA0g");
	this.shape_42.setTransform(299.2,191);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AhlO6IABgEIAD68IppExIjFhiIAAgBIOTm1IOMG9IAAM9IAAADIgIAEIAIAQIAAAXQgJDDiMCLQgXAYgZAUQiFBpiwAAIgDAAIAAjIIADAAQB+gBBahZQA/hAAThRIALADIAAs8Ipik2IAAa+IhhA0g");
	this.shape_43.setTransform(299.2,191);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AhlO6IABgEIAD68IppExIjFhiIAAgBIOTm1IOMG9IAAM9IAAADIgIAEIAIAQIAAAXQgJDDiMCLQgXAYgZAUQiFBpiwAAQhUAAhKgYIAAjbQBGArBYAAQB+gBBahZQA/hAAThRIALADIAAs8Ipik2IAAa+IhhA0g");
	this.shape_44.setTransform(299.2,191);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AhlO6IABgEIADqsIgBqxIABlfIppExIjFhiIAAgBIOTm1IOMG9IAAM9IAAADIgIAEIAIAQQAADRiVCUQiUCVjRAAQirAAiChiIAAD+IhhA0gABpFhQARBYBCBDQBaBZCAABQB+gBBahZQA/hAAThRIALADIAAs8Ipik2g");
	this.shape_45.setTransform(299.2,191);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("#FF0000").ss(1,1,1).p("ABpK8QCCBiCrAAQDSAACUiUQCUiVAAjSQAAgLgBgKIAAs+IuLm9IuTG1IAAABIABIMABphBIAAgLIABq4IJhE1IgCJTIgCCKQAAAKAAALQAAAmgHAiQgTBRhABAQhZBah+AAQh/AAhahaQhDhDgRhYQAAgCAAgBgAhfFmIgCh7IgCkQQgFhzhUhTQgQgQgRgNQhPg8hoAAQh/AAhaBZQhTBTgGBzIgFMCIjEhkIABqeQAAgDAAgDQAIjCCMiMQAWgWAYgUIACgyIJpkxIAAFfIAAAAQAaAVAZAZQB5B7AeC9ArMmjQCGhqCyAAQCvAACEBmAhfFmIgCBJIgDIHIBtA4IBggzIAAj/QgBAAAAgBQgegWgbgbQh6h8gUiog");
	this.shape_46.setTransform(299.2,191);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AhkO2IAEoHIgBilIABgfIABB7IgBh7IgDkQQgFhzhUhTQgQgQgRgNIB8ifIgBAAIABlfIppExIjFhiIAAgBIOTm1IOMG9IAAM9IAAADIgIAEIAIAQQAADRiVCUQiUCVjRAAQirAAiChiIgBgBQgegWgbgcQh6h8gUinIgBBJIABhJQAUCnB6B8QAbAcAeAWIABABIAAD+IhhA0gABoFdIABAEQARBYBCBDQBaBZCAABQB+gBBahZQA/hAAThRIALADIgCjqIACpSIpik2IAAK4IAAALIAAgLIAAGtIgBgEIABmeQgei9h5h7QgZgZgagVQAaAVAZAZQB5B7AeC9IgBGegAhlO6IABgEIBsA4gABphBIAAAAg");
	this.shape_47.setTransform(299.2,191);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("#FF0000").ss(1,1,1).p("ABpK8QCCBiCrAAQDSAACUiUQCUiVAAjSQAAgLgBgKIAAs+IuLm9IuTG1IAAABIABIMABphBIAAgLIABq4IJhE1IgCJTIgCCKQAAAKAAALQAAAmgHAiQgTBRhABAQhZBah+AAQh/AAhahaQhDhDgRhYQAAgCAAgBgAhfFmIgCh7IgCkQQgFhzhUhTQhDhEhZgQQgdgFgfAAQh/AAhaBZQhTBTgGBzIgFMCIjEhkIABqeQAAgDAAgDQAIjCCMiMQAWgWAYgUIACgyIJpkxIAAFfArMmjQCGhqCyAAQA0AAAxAJQBxAWBdBHQAaAVAZAZQB5B7AeC9AhfFmIgCBJIgDIHIBtA4IBggzIAAj/QgBAAAAgBQgegWgbgbQh6h8gUiog");
	this.shape_48.setTransform(299.2,191);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AhkO2IAEoHIgBilIABgfIgDkQQgFhzhUhTQhEhEhYgQIApjFQBxAWBcBHIABlfIppExIjFhiIAAgBIOTm1IOMG9IAAM9IAAADIgIAEIAIAQQAADRiVCUQiUCVjRAAQirAAiChiIgBgBQgegWgbgcQh6h8gUinIgBh7IABB7IgBBJIABhJQAUCnB6B8QAbAcAeAWIABABIAAD+IhhA0gABoFdIABAEQARBYBCBDQBaBZCAABQB+gBBahZQA/hAAThRIALADIgCjqIACpSIpik2IAAK4IAAALIAAgLIAAGtIgBgEIABmeQgei9h5h7QgZgZgbgVQAbAVAZAZQB5B7AeC9IgBGegAhlO6IABgEIBsA4gABpK8IAAAAgAhfFmgABphBIAAAAg");
	this.shape_49.setTransform(299.2,191);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().s("#FF0000").ss(1,1,1).p("ABpK8QCCBiCrAAQDSAACUiUQCUiVAAjSQAAgLgBgKIAAs+IuLm9IuTG1IAAABIABIMABphBIAAgLIABq4IJhE1IgCJTIgCCKQAAAKAAALQAAAmgHAiQgTBRhABAQhZBah+AAQh/AAhahaQhDhDgRhYQAAgCAAgBgAhfFmIgCh7IgCkQQgFhzhUhTQhZhZh/AAQg1AAguAPQhBAVg1A1QhTBTgGBzIgFMCIjEhkIABqeQAAgDAAgDQAIjCCMiMQAWgWAYgUQBDg1BPgbQBOgaBYAAQCvAACEBmArMmjIACgyIJpkxIAAFfQAaAVAZAZQB5B7AeC9AhfFmIgCBJIgDIHIBtA4IBggzIAAj/QgBAAAAgBQgegWgbgbQh6h8gUiog");
	this.shape_50.setTransform(299.2,191);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AhkO2IAEoHIgBilIABgfIgDkQQgFhzhUhTQhahah+AAQg1ABguAPIhDi+QBNgaBZAAQCvAACDBmIABlfIppExIjFhiIAAgBIOTm1IOMG9IAAM9IAAADIgIAEIAIAQQAADRiVCUQiUCVjRAAQirAAiChiIgBgBQgegWgbgcQh6h8gUinIgBh7IABB7IgBBJIABhJQAUCnB6B8QAbAcAeAWIABABIAAD+IhhA0gABoFdIABAEQARBYBCBDQBaBZCAABQB+gBBahZQA/hAAThRIALADIgCjqIACpSIpik2IAAK4IAAALIAAgLIAAGtIgBgEIABmeQgei9h5h7QgZgZgbgVQAbAVAZAZQB5B7AeC9IgBGegAhlO6IABgEIBsA4gABpK8IAAAAgAhfFmgABphBIAAAAg");
	this.shape_51.setTransform(299.2,191);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#FF0000").ss(1,1,1).p("ABpK8QCCBiCrAAQDSAACUiUQCUiVAAjSQAAgLgBgKIAAs+IuLm9IuTG1IAAABIABIMQAGiNBLhxQAcgqAngmQAWgWAYgUIACgyIJpkxIAAFfQAaAVAZAZQB5B7AeC9IAAgLIABq4IJhE1IgCJTIgCCKQAAAKAAALQAAAmgHAiQgTBRhABAQhZBah+AAQh/AAhahaQhDhDgRhYQAAgCAAgBIAAmfAhfFmIgCh7IgCkQQgFhzhUhTQhZhZh/AAQh/AAhaBZQgVAVgRAYQguBEgFBVIgFMCIjEhkIABqeQAAgDAAgDArMmjQCGhqCyAAQCvAACEBmAhfFmIgCBJIgDIHIBtA4IBggzIAAj/QgBAAAAgBQgegWgbgbQh6h8gUiog");
	this.shape_52.setTransform(299.2,191);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AhkO2IAEoHIgBilIABgfIABB7IgBh7IgDkQQgFhzhUhTQhahah+AAQh/AAhaBaQgVAVgRAYIiqhrQAcgqAngmQAWgWAYgTQCGhrCyAAQCvAACDBmIABlfIppExIjFhiIAAgBIOTm1IOMG9IAAM9IAAADIgIAEIAIAQQAADRiVCUQiUCVjRAAQirAAiChiIgBgBQgegWgbgcQh6h8gUinIgBBJIABhJQAUCnB6B8QAbAcAeAWIABABIAAD+IhhA0gABoFdIABAEQARBYBCBDQBaBZCAABQB+gBBahZQA/hAAThRIALADIgCjqIACpSIpik2IAAK4IAAALIAAgLIAAGtIgBgEIABmeQgei9h5h7QgZgZgbgVQAbAVAZAZQB5B7AeC9IgBGegAhlO6IABgEIBsA4gABphBIAAAAg");
	this.shape_53.setTransform(299.2,191);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#FF0000").ss(1,1,1).p("ABpK8QCCBiCrAAQDSAACUiUQCUiVAAjSQAAgLgBgKIAAs+IuLm9IuTG1IAAABIABIMQAIjCCMiMQAWgWAYgUIACgyIJpkxIAAFfQAaAVAZAZQB5B7AeC9IAAgLIABq4IJhE1IgCJTIgCCKQAAAKAAALQAAAmgHAiQgTBRhABAQhZBah+AAQh/AAhahaQhDhDgRhYQAAgCAAgBIAAmfAhfFmIgCh7IgCkQQgFhzhUhTQhZhZh/AAQh/AAhaBZQhSBSgHByQABACgBAAIAAA5IgFLJIjEhkIABpqIAAg0QAAgDAAgDArMmjQCGhqCyAAQCvAACEBmAhfFmIgCBJIgDIHIBtA4IBggzIAAj/QgBAAAAgBQgegWgbgbQh6h8gUiog");
	this.shape_54.setTransform(299.2,191);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AhkO2IAEoHIgBilIABgfIABB7IgBh7IgDkQQgFhzhUhTQhahah+AAQh/AAhaBaQhSBSgHBzIAAABIAAA5IjIgFIAAg0IAAgGQAIjCCMiMQAWgWAYgTQCGhrCyAAQCvAACDBmIABlfIppExIjFhiIAAgBIOTm1IOMG9IAAM9IAAADIgIAEIAIAQQAADRiVCUQiUCVjRAAQirAAiChiIgBgBQgegWgbgcQh6h8gUinIgBBJIABhJQAUCnB6B8QAbAcAeAWIABABIAAD+IhhA0gABoFdIABAEQARBYBCBDQBaBZCAABQB+gBBahZQA/hAAThRIALADIgCjqIACpSIpik2IAAK4IAAALIAAgLIAAGtIgBgEIABmeQgei9h5h7QgZgZgbgVQAbAVAZAZQB5B7AeC9IgBGegAhlO6IABgEIBsA4gABphBIAAAAg");
	this.shape_55.setTransform(299.2,191);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#FF0000").ss(1,1,1).p("ABpK8QCCBiCrAAQDSAACUiUQCUiVAAjSQAAgLgBgKIAAs+IuLm9IuTG1IAAABIABIMQAIjCCMiMQAWgWAYgUIACgyIJpkxIAAFfQAaAVAZAZQB5B7AeC9IAAgLIABq4IJhE1IgCJTIgCCKQAAAKAAALQAAAmgHAiQgTBRhABAQhZBah+AAQh/AAhahaQhDhDgRhYQAAgCAAgBIAAmfAhfFmIgCh7IgCkQQgFhzhUhTQhZhZh/AAQh/AAhaBZQhTBTgGBzIgCFmIgDGcIjEhkIAAk8IABliQAAgDAAgDArMmjQCGhqCyAAQCvAACEBmAhfFmIgCBJIgDIHIBtA4IBggzIAAj/QgBAAAAgBQgegWgbgbQh6h8gUiog");
	this.shape_56.setTransform(299.2,191);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AhkO2IAEoHIABhJIgBh7IABB7IgBBJIgBilIABgfIgDkQQgFhzhUhTQhahah+AAQh/AAhaBaQhTBTgGBzIgCFmIjHgEIABliIAAgGQAIjCCMiMQAWgWAYgTQCGhrCyAAQCvAACDBmQAbAVAZAZQB5B7AeC9Qgei9h5h7QgZgZgbgVIABlfIppExIjFhiIAAgBIOTm1IOMG9IAAM9IAAADIgIAEIAIAQQAADRiVCUQiUCVjRAAQirAAiChiIgBgBQgegWgbgcQh6h8gUinQAUCnB6B8QAbAcAeAWIABABIAAD+IhhA0gABpFhQARBYBCBDQBaBZCAABQB+gBBahZQA/hAAThRIALADIgCjqIACpSIpik2IAAK4IAAGtIgBgEIABmeIAAgLIAAALIgBGeIABAEIAAAAgAhlO6IABgEIBsA4gABpFhIAAAAg");
	this.shape_57.setTransform(299.2,191);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f().s("#FF0000").ss(1,1,1).p("ABpK8QCCBiCrAAQDSAACUiUQCUiVAAjSQAAgLgBgKIAAs+IuLm9IuTG1IAAABIABIMQAIjCCMiMQAWgWAYgUIACgyIJpkxIAAFfQAaAVAZAZQB5B7AeC9IAAgLIABq4IJhE1IgCJTIgCCKQAAAKAAALQAAAmgHAiQgTBRhABAQhZBah+AAQh/AAhahaQhDhDgRhYQAAgCAAgBIAAmfAhfFmIgCh7IgCkQQgFhzhUhTQhZhZh/AAQh/AAhaBZQhTBTgGBzIgFMCIjEhkIABqeQAAgDAAgDArMmjQCGhqCyAAQCvAACEBmAhfFmIgCBJIgDIHIBtA4IBggzIAAj/QgBAAAAgBQgegWgbgbQh6h8gUiog");
	this.shape_58.setTransform(299.2,191);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AhkO2IAEoHIABhJIgBh7IABB7IgBBJIgBilIABgfIgDkQQgFhzhUhTQhahah+AAQh/AAhaBaQhTBTgGBzIgEMCIjFhkIABqeIAAgGQAIjCCMiMQAWgWAYgTQCGhrCyAAQCvAACDBmQAbAVAZAZQB5B7AeC9Qgei9h5h7QgZgZgbgVIABlfIppExIjFhiIAAgBIOTm1IOMG9IAAM9IAAADIgIAEIAIAQQAADRiVCUQiUCVjRAAQirAAiChiIgBgBQgegWgbgcQh6h8gUinQAUCnB6B8QAbAcAeAWIABABIAAD+IhhA0gABoFdIABAEQARBYBCBDQBaBZCAABQB+gBBahZQA/hAAThRIALADIgCjqIACpSIpik2IAAK4IAAGtIgBgEIABmeIAAgLIAAALIgBGegAhlO6IABgEIBsA4g");
	this.shape_59.setTransform(299.2,191);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().s("#FF0000").ss(1,1,1).p("ABpK8QCCBiCrAAQDSAACUiUQCUiVAAjSQAAgLgBgKIAAs+IuLm9IuTG1IAAABIABIMABphBIAAgLIABq4IJhE1IgCJTIgCCKQAAAKAAALQAAAmgHAiQgTBRhABAQhZBah+AAQh/AAhahaQhDhDgRhYQAAgCAAgBgAhfFmIgCh7IgCkQQgFhzhUhTQhZhZh/AAQh/AAhaBZQhTBTgGBzIgFMCIjEhkIABqeQAAgDAAgDQAIjCCMiMQAWgWAYgUIACgyIJpkxIAAFfQAaAVAZAZQB5B7AeC9ArMmjQCGhqCyAAQCvAACEBmAhfFmIgCBJIgDIHIBtA4IBggzIAAj/QgBAAAAgBQgegWgbgbQh6h8gUiog");
	this.shape_60.setTransform(299.2,191);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AhkO2IAEoHIgBilIABgfIABB7IgBh7IgDkQQgFhzhUhTQhahah+AAQh/AAhaBaQhTBTgGBzIgEMCIjFhkIABqeIAAgGQAIjCCMiMQAWgWAYgTQCGhrCyAAQCvAACDBmIABlfIppExIjFhiIAAgBIOTm1IOMG9IAAM9IAAADIgIAEIAIAQQAADRiVCUQiUCVjRAAQirAAiChiIgBgBQgegWgbgcQh6h8gUinIgBBJIABhJQAUCnB6B8QAbAcAeAWIABABIAAD+IhhA0gABoFdIABAEQARBYBCBDQBaBZCAABQB+gBBahZQA/hAAThRIALADIgCjqIACpSIpik2IAAK4IAAALIAAgLIAAGtIgBgEIABmeQgei9h5h7QgZgZgbgVQAbAVAZAZQB5B7AeC9IgBGegAhlO6IABgEIBsA4gABphBIAAAAg");
	this.shape_61.setTransform(299.2,191);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1}]},46).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_47},{t:this.shape_46}]},1).to({state:[{t:this.shape_49},{t:this.shape_48}]},1).to({state:[{t:this.shape_51},{t:this.shape_50}]},1).to({state:[{t:this.shape_53},{t:this.shape_52}]},1).to({state:[{t:this.shape_55},{t:this.shape_54}]},1).to({state:[{t:this.shape_57},{t:this.shape_56}]},1).to({state:[{t:this.shape_59},{t:this.shape_58}]},1).to({state:[{t:this.shape_61},{t:this.shape_60}]},127).wait(1));

	// CUBE
	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f().s("#CC3300").ss(1,1,1).p("AgSAKIAlgT");
	this.shape_62.setTransform(182,239.4);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f().s("#CC3300").ss(1,1,1).p("AhaAuIC1hb");
	this.shape_63.setTransform(189.3,235.8);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f().s("#CC3300").ss(1,1,1).p("AijBSIFHij");
	this.shape_64.setTransform(196.5,232.1);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f().s("#CC3300").ss(1,1,1).p("AjrB3IHXjt");
	this.shape_65.setTransform(203.8,228.5);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f().s("#CC3300").ss(1,1,1).p("Ak0CbIJpk1");
	this.shape_66.setTransform(211,224.8);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f().s("#CC3300").ss(1,1,1).p("Al8DAIL5l/");
	this.shape_67.setTransform(218.3,221.2);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f().s("#CC3300").ss(1,1,1).p("AnFDkIOLnH");
	this.shape_68.setTransform(225.5,217.6);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f().s("#CC3300").ss(1,1,1).p("AoNEJIQboR");
	this.shape_69.setTransform(232.8,213.9);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f().s("#CC3300").ss(1,1,1).p("ApWEtIStpZ");
	this.shape_70.setTransform(240,210.3);
	this.shape_70._off = true;

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f().s("#CC3300").ss(1,1,1).p("ApIEzIStpWIgggPIypJXg");
	this.shape_71.setTransform(241.8,210.9);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FF6600").s().p("ApkElISppXIAgAPIytJWg");
	this.shape_72.setTransform(241.8,210.9);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f().s("#CC3300").ss(1,1,1).p("ArFD1ISppYIDiBxIysJWg");
	this.shape_73.setTransform(251.5,215.8);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FF6600").s().p("ArFD0ISppXIDiBxIysJWg");
	this.shape_74.setTransform(251.5,215.8);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f().s("#CC3300").ss(1,1,1).p("AsnDEISppYIGmDTIysJWg");
	this.shape_75.setTransform(261.3,220.6);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FF6600").s().p("AsnDEISppYIGmDTIysJWg");
	this.shape_76.setTransform(261.3,220.6);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f().s("#CC3300").ss(1,1,1).p("AuICTISppYIJpE1IytJVg");
	this.shape_77.setTransform(271.1,225.5);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FF6600").s().p("AuJCTISqpYIJoE0IysJWg");
	this.shape_78.setTransform(271.1,225.5);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f().s("#CC3300").ss(1,1,1).p("AvqBiISppXIMsGVIysJWg");
	this.shape_79.setTransform(280.8,230.4);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FF6600").s().p("AvqBiISppXIMsGVIytJWg");
	this.shape_80.setTransform(280.8,230.4);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f().s("#CC3300").ss(1,1,1).p("AxMAyISppYIPwH3IytJWg");
	this.shape_81.setTransform(290.6,235.3);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FF6600").s().p("AxMAxISppXIPwH3IytJWg");
	this.shape_82.setTransform(290.6,235.3);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f().s("#CC3300").ss(1,1,1).p("AAAJYISupYIywpXIyrJXg");
	this.shape_83.setTransform(300.3,240.1);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FF6600").s().p("AytABISrpYISwJXIyuJYg");
	this.shape_84.setTransform(300.3,240.1);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f().s("#CC3300").ss(1,1,1).p("AytABISrpYISwJXIyuJYg");
	this.shape_85.setTransform(300.3,240.1);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f().s("#CC3300").ss(1,1,1).p("ASug7IAAB0IytJbAytg6IAAB4ISuJWAytg6IStJWIABB4Aytg6ISrpZISwJYAAAIcISupX");
	this.shape_86.setTransform(299.9,234.1);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#CC3300").s().p("AABFoIgBh5ISupWIAAB2IytJZgAytjsIAAh6IStJVIABB5g");
	this.shape_87.setTransform(299.9,264.1);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f().s("#CC3300").ss(1,1,1).p("ASuh3IAADsIytJbAyth2IAADwISuJWAAAHgIABDwAyth2IStJWISupXAyth2ISrpZISwJY");
	this.shape_88.setTransform(299.9,228.1);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#CC3300").s().p("AABGkIgBjxISupWIAADuIytJZgAytiwIAAjyIStJVIABDxg");
	this.shape_89.setTransform(299.9,258.1);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f().s("#CC3300").ss(1,1,1).p("ASukrIAAJUIytJbAytkqISrpZISwJYAAAEsIABJYAytkqIAAJYISuJWAytkqIStJWISupX");
	this.shape_90.setTransform(299.9,210.1);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#CC3300").s().p("AABJYIgBpYIABJYIyupWIAApYIStJWISupXIAAJWIytJZg");
	this.shape_91.setTransform(299.9,240.1);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f().s("#CC3300").ss(1,1,1).p("ASulnIAALMIytJbIyupWIAArQISrpZISwJYIyuJXIABLQAAADwIytpW");
	this.shape_92.setTransform(299.9,204.1);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#CC3300").s().p("AABKUIgBrPISupYIAALMIytJbgAytA+IAArQIStJXIABLPg");
	this.shape_93.setTransform(299.9,234.1);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f().s("#CC3300").ss(1,1,1).p("ASumjIAANEIytJbIyupWIAAtIISrpZISwJYIyuJXIABNIAAAC0IytpW");
	this.shape_94.setTransform(299.9,198.1);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#CC3300").s().p("AABLQIgBtHISupYIAANEIytJbgAytB6IAAtIIStJXIABNHg");
	this.shape_95.setTransform(299.9,228.1);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f().s("#CC3300").ss(1,1,1).p("ASunfIAAO8IytJbIyupWIAAvAISrpZISwJYIyuJXIABPAAAAB4IytpW");
	this.shape_96.setTransform(299.9,192.1);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#CC3300").s().p("AABMMIgBu/ISupYIAAO8IytJbgAytC2IAAvAIStJXIABO/g");
	this.shape_97.setTransform(299.9,222.1);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f().s("#CC3300").ss(1,1,1).p("ASuobIAAQ0IytJbIyupWIAAw4ISrpZISwJYIyuJXIytpWAAAA8IABQ4");
	this.shape_98.setTransform(299.9,186.1);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#CC3300").s().p("AytIeIAAw3IStJUIABQ5gAAAA7ISupVIAAQzIytJbgAytoZISrpaISwJZIyuJVgAytoZg");
	this.shape_99.setTransform(299.9,186.1);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f().s("#CC3300").ss(1,1,1).p("ASupXIAASsIytJbAytpVIStJVIABSwASupXIywpYIyrJaIAASvISuJWAAAAAISupX");
	this.shape_100.setTransform(299.9,180.1);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#CC3300").s().p("AABOEIgByvISupYIAASsIytJbgAytEuIAAywIStJXIABSvg");
	this.shape_101.setTransform(299.9,210.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_62}]}).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_65}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_67}]},1).to({state:[{t:this.shape_68}]},1).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_72},{t:this.shape_71}]},1).to({state:[{t:this.shape_74},{t:this.shape_73}]},1).to({state:[{t:this.shape_76},{t:this.shape_75}]},1).to({state:[{t:this.shape_78},{t:this.shape_77}]},1).to({state:[{t:this.shape_80},{t:this.shape_79}]},1).to({state:[{t:this.shape_82},{t:this.shape_81}]},1).to({state:[{t:this.shape_84,p:{x:300.3,y:240.1}},{t:this.shape_83}]},1).to({state:[{t:this.shape_84,p:{x:300.3,y:240.1}},{t:this.shape_85}]},1).to({state:[{t:this.shape_84,p:{x:300.3,y:240.1}},{t:this.shape_85}]},1).to({state:[{t:this.shape_84,p:{x:300.3,y:240.1}},{t:this.shape_85}]},1).to({state:[{t:this.shape_84,p:{x:300.3,y:240.1}},{t:this.shape_85}]},1).to({state:[{t:this.shape_84,p:{x:300.3,y:240.1}},{t:this.shape_83}]},1).to({state:[{t:this.shape_84,p:{x:300.3,y:240.1}},{t:this.shape_85}]},1).to({state:[{t:this.shape_84,p:{x:300.3,y:240.1}},{t:this.shape_85}]},1).to({state:[{t:this.shape_84,p:{x:300.3,y:240.1}},{t:this.shape_85}]},1).to({state:[{t:this.shape_84,p:{x:300.3,y:240.1}},{t:this.shape_85}]},1).to({state:[{t:this.shape_84,p:{x:300.3,y:240.1}},{t:this.shape_83}]},1).to({state:[{t:this.shape_84,p:{x:299.9,y:228.1}},{t:this.shape_87},{t:this.shape_86}]},1).to({state:[{t:this.shape_84,p:{x:299.9,y:216.1}},{t:this.shape_89},{t:this.shape_88}]},1).to({state:[{t:this.shape_84,p:{x:299.9,y:180.1}},{t:this.shape_91},{t:this.shape_90}]},1).to({state:[{t:this.shape_93},{t:this.shape_84,p:{x:299.9,y:168.1}},{t:this.shape_92}]},1).to({state:[{t:this.shape_95},{t:this.shape_84,p:{x:299.9,y:156.1}},{t:this.shape_94}]},1).to({state:[{t:this.shape_97},{t:this.shape_84,p:{x:299.9,y:144.1}},{t:this.shape_96}]},1).to({state:[{t:this.shape_99},{t:this.shape_98}]},1).to({state:[{t:this.shape_84,p:{x:299.9,y:120.1}},{t:this.shape_101},{t:this.shape_100}]},1).to({state:[{t:this.shape_84,p:{x:299.9,y:120.1}},{t:this.shape_101},{t:this.shape_100}]},188).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape_70).wait(8).to({_off:false},0).wait(3).to({_off:true},1).wait(213));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(479.1,314.4,212.3,203.2);
      })(this.lib , images, createjs, ss);

      this.stage = new createjs.Stage("canvas");
      let logo = new this.lib.logo();

      this.stage.addChild(logo);
      this.stage.update();

      createjs.Ticker.setFPS(this.lib.properties.fps);
      createjs.Ticker.addEventListener("tick", this.stage);
  }

}
