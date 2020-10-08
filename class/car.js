class Car {
  constructor(x, y, s, v, a) {
    this.size = s || 10;
    this.x = x || 0;
    this.y = y || 0;
    this.velocity = v || 10;
    this.angle = a || 4.71239;
    this.angleSpeed = 0.06
    this.points = []
  }

  show() {
    this.update()
    
    push();
    fill(255,200)
    noStroke()
    translate(this.x, this.y);
    rotate(this.angle);
    
    ellipse(0,0, this.size * 2, this.size);
    pop();
  }
  update(){

    // a
    if (keyIsDown(65)) {
      this.angle -= this.angleSpeed;
    }
    // d
    if (keyIsDown(68)) {
      this.angle += this.angleSpeed;
    }
    // w
    if (keyIsDown(87)) {
      this.x = this.x + this.velocity * cos(this.angle);
      this.y = this.y + this.velocity * sin(this.angle);
      this.updatePoint();
    }
    // s
    if (keyIsDown(83)) {
      this.x = this.x - this.velocity * cos(this.angle);
      this.y = this.y - this.velocity * sin(this.angle);
      this.updatePoint();
    }
  }
  updatePoint(){
    this.points.push({x : this.x, y : this.y})
  }
  showTrack(){
    stroke(255,100);
    noFill();
    strokeWeight(3);
    beginShape()
    for(let i = 0; i< this.points.length; i++){
      // if(i%10 != 0) continue;
      let point = this.points[i]
      vertex(point.x, point.y)
    }
    endShape()
  }
}