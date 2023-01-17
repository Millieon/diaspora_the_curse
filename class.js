

  class waterDrop{
    constructor(){
      this.x = random(0, width);
      this.y = random(0, -height);
      this.speed = random(5, 10);
      this.gravity = 0;
    }
    show () {
      noStroke();
      fill(255);
      ellipse(this.x, this.y, random(5, 15), random(5, 15));   
    }
    update() {
      this.speed = random(5, 10);
      this.gravity = 1.05;
      this.y = this.y + this.speed*this.gravity;  
      
      if (this.y > height) {
        this.y = random(0, -height);
        this.gravity = 0;
  }
  }
  }

class Leaf {
    constructor() {
      this.pos = createVector(random(width), random(height));
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
      this.maxspeed = 2;
      this.prevPos = this.pos.copy();
    }
  
    update() {
      this.vel.add(this.acc);
      this.vel.limit(this.maxspeed);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
  
    follow(vectors) {
      var x = floor(this.pos.x / scl);
      var y = floor(this.pos.y / scl);
      var index = x + y * cols;
      var force = vectors[index];
      this.applyForce(force);
    }
  
    applyForce(force) {
      this.acc.add(force);
    }
  
    show() {
      stroke(255, 10);
      strokeWeight(1);
      
      line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
      this.updatePrev();
    }
  
    updatePrev() {
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
    }
  
    edges() {
      if (this.pos.x > width) {
        this.pos.x = 0;
        this.updatePrev();
      }
      if (this.pos.x < 0) {
        this.pos.x = width;
        this.updatePrev();
      }
      if (this.pos.y > height) {
        this.pos.y = 0;
        this.updatePrev();
      }
      if (this.pos.y < 0) {
        this.pos.y = height;
        this.updatePrev();
      }
  
    }
  
  }
