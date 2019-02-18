// Purple Rain
// (138, 43, 226)
// (230, 230, 250) background
var drops;
drops = [1]
drops.length = 400 ;
 

function setup() {
	createCanvas(1010, 510);
	for (var i = 0; i < drops.length; i++) {
		drops[i] = new Drop();
	}
}

function draw() {
	background(230, 230, 250);
	for (var i = 0; i < drops.length; i++) {
	drops[i].fall();
	drops[i].show();
	}	

}

