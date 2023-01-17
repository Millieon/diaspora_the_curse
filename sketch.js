// Diaspora Chapter2, Jan-15-2023, Mianlin Hu
// operation manual: run these project files in the zip as a whole
// !!Please run diaspora chap1 code and diaspora chap2 code seperately!!
// Code Structure: 
// -class.js - classes of waterDrop and Leaf; 
// -sketch.js - main functions
// Acknowledgements:
//code reference: P5.js Code from Daniel Shiffman instructional https://editor.p5js.org/chesterdols/sketches/B12rzkBQx
//Waterdrop https://editor.p5js.org/kelsierose94/sketches/MU2Y21aG0
//recursive tree https://editor.p5js.org/mtchl/sketches/ryyW2U5Fx
//Fractal Tree https://editor.p5js.org/codingtrain/sketches/xTjmYXU3q 



var scl = 80;
var cols, rows;
let fr=5;//framerate

var xvec, yvec;
var noiseInc = .1;
var time = 0;
var leaves = [];
var drops=[];
var flowfield;
let startpos=10;//start position of the Rain function

let sc=0.8//scale of the recursive tree
let angle=0;//angle of the tree branch
let len=100;//len of Branch


function setup() { 
  createCanvas(windowWidth,windowHeight);
  cols = floor(windowWidth / scl);
  rows = floor(windowHeight / scl);
  for (var i = 0; i < 100; i++) {
    leaves[i] = new Leaf();
    drops[i]=new waterDrop();
}

  
}


function draw(){
  background(0);
  stroke(255);

  
  if(frameCount<800)
  {
    FlowField();

    for (var i = 0; i < leaves.length; i++) {
     leaves[i].show();
     leaves[i].update();
     leaves[i].edges();
     leaves[i].follow(flowfield);
    }
  }
  else if(frameCount<870){
    frameRate(2);
    scl+=10;
    chaoticLeaves();
  }
  else if(frameCount<1200)
  {
    for(var i=0;i<drops.length;i++)
    {
      frameRate(fr);
      if(fr<10)
      {fr+=0.5;}
      drops[i].show();
      drops[i].update();
    }
  }
  else if(frameCount<1240){
    frameRate(2);
    startpos+=10;
    Rain();
  }
  else if(frameCount<1280)
  {
    frameRate(2);
    DrawTree();
  }
  else if(frameCount<1330)
  {
    frameRate(2);
    strokeWeight(1);
    if(len<200)
    {len+=5;}
    Kaleidoscope();
  }

  }



  function Rain()
  {
  stroke(255);
  for(let x=0;x<width;x+=5)
  {
    let y=randomGaussian(0,startpos);
    line(x-random(5,10),y,x+random(5,10),y+random(50,200));
  }
  }

  function chaoticLeaves()
  {
    
    for(var y=0;y<rows;y++)
  {
    for(var x=0;x<cols;x++)
    {
      
      let x0=x*scl;
      let y0=y*scl;
      let pos = createVector(random(scl/2), random(scl/2));
      
   
      noStroke();
      let diam=scl*pos.x/scl; 

      smooth();
      
      fill(2*pos.x/scl*250);
      ellipse(x0+pos.x,y0+pos.y,diam);
    }
  }
  }
  
  function FlowField(){
    xvec = floor((windowWidth+50) / scl);
    yvec = floor((windowHeight+50) / scl);
    flowfield = new Array(xvec * yvec);

    var yNoise = 0;
    for (var y = 0; y < yvec; y++) {
           var xNoise = 0;
           for (var x = 0; x < xvec; x++) {
                  var vecDirect = noise(xNoise, yNoise, time) * 2*(TWO_PI);
                  var dir = p5.Vector.fromAngle(vecDirect);
                  var index = x + y * xvec;
                  flowfield[index] = dir;
                  dir.setMag(3);
                  xNoise += noiseInc;
                  stroke(180);
                  push();
                  translate(x * scl, y * scl);
                  rotate(dir.heading());
                  line(0, 0, scl, 0);
                  pop();
           }
           yNoise += noiseInc;
           time += .001;
    }
}

function DrawTree()
{
  strokeWeight(10); 
  translate(width/2,height-20); 
  branch(0); 
  if(sc<1)
  {sc+=0.01;}
}

function Kaleidoscope()
{
  angle=random(0,PI/3);
  for(let i=0;i<2*PI;i+=2*PI/6)
  {
    push();
    
    
    translate(width/2,height/2);
    rotate(i);
    Branch(len);

    pop();
  }
}


// Fractal Tree
function Branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 4) {
    push();
    rotate(angle);
    Branch(len * 0.67);
    pop();
    push();
    rotate(-angle);
    Branch(len * 0.67);
    pop();
  }
}


function branch(depth){ 
  if (depth < 10) { 
    line(0,0,0,-height/10); // draw a line going up
    { 
      translate(0,-height/10); // move the space upwards
      rotate(random(-0.05,0.05));  // random wiggle

      if (random(1.0) < 0.6){ // branching   
        rotate(0.3); // rotate to the right
        scale(sc); // scale down
        
        push(); // now save the transform state
        branch(depth + 1); // start a new branch!
        pop(); // go back to saved state
        
        rotate(-0.6); // rotate back to the left 
        
        push(); // save state
        branch(depth + 1);   // start a second new branch 
        pop(); // back to saved state        
     } 
      else { // no branch - continue at the same depth  
        branch(depth);
      } 
    } 
  }
} 


