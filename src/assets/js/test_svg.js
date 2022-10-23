(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes
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
	var txtFilters = lib.webFontTxtFilters && lib.webFontTxtFilters[family] || [];
	for(var f = 0; f < txtFilters.length; ++f) {
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

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;