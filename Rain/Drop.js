function Drop() {

	 this.x = random(width);
	 this.y = random(-200, -100);
	 this.yspeed =random(2, 4);


	this.fall = function() {
		this.y = this.y + this.yspeed;
	
		if (this.y > height ) {
			this.y = random(-200, -100);
		}

	} 

	this.show = function() {
	stroke(138, 43, 226);
	line(this.x,this.y,this.x,this.y+10);

	}

}