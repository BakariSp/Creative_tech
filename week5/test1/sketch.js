let PI = Math.PI;
let angle = PI / 8;
let time = 0;
let my_rect=[];
let cir=[];

function setup() {
  let g = [1,2];
  g.x = 3;
  console.log();
  createCanvas(1200, 1200);
  setRect(width, height, 100);
  // console.log(rect[0].length);
  my_rect.forEach((p, i) =>{
    for (i = 0; i < p.length; i++) {
      p[i].draw_rect(angle);
    }
  });

  // for (i = 0; i< my_rect[0].length; i++) {
  //   for (j = 0; j < my_rect.length; j++){
  //     my_rect[i][j].draw_rect(angle);
  //     console.log(my_rect[i][j].color);
  //   }
  // }
  stroke(255);
  noFill();
}

function draw() {
  // frameRate = 100;
  background(0);
  
  cir.x = mouseX;
  cir.y = mouseY;
  cir.r = 100;
 
  for (i = 1; i< my_rect[0].length; i++) {
    for (j = 1; j < my_rect.length; j++){
      my_rect[i][j].draw_rect(angle);
      if ( frameCount % 60 == 0){
        my_rect[i][j].change_color();
        // my_rect[i][j].detectCollide(cir);
      }
    }
  }

  if ( frameCount % 10 == 0) {
    angle += PI/16;
   
  }
}

function setRect(w, h, step) {
  for (let i = 0; i*step < w; i++) {
    my_rect[i] = [];
    for (let j = 0; j*step < h; j++) {
      pos = [i * step, j * step];
      my_rect[i][j] = new rotate_rect(pos);
      // seed = random(0,100);
     
    }
  }
}

class rotate_rect{
  constructor(pos){
    this.width = 60;
    this.height = 20;
    this.pos = pos;
    this.seed = random(0,100);
    this.color = (0);
    
    
  }

  change_color(){
    let seed = random(0,100);
    this.color = this.randomColor(seed);
  }

  draw_rect(angle){
    // console.log(pos);
    push();
    
    fill(this.color);
    rectMode(CENTER);
    translate(this.pos[0], this.pos[1]);
    rotate(angle*this.seed);
    rect(0, 0, 60, 20);
    pop();
  }

  randomColor(seed){
    let r = random(150, 255) * seed/200 + this.pos[0]/2;
    let g = 255 - random(205, 255) * seed/100 + this.pos[1]/2;
    let b = random(205, 255) * seed/100 + this.pos[0]/2;
    let a = 255;

    r = map(r, 0, (width+255)/2, 0, 255);
    g = map(g, 0, (height+255)/2, 0, 255);
    b = map(b, 0, (width+255)/2, 0, 255);
    let c = color(r, g, b, a)
    return c;
  }

  detectCollide(cir){
    push();
    translate(this.pos[0], this.pos[1]);
    rotate(angle*this.seed);
    this.hit = collideRectCircle(0,0,this.width,this.height,cir.x,cir.y,cir.r);
    pop();
    if (this.hit){
      this.color = 0;
    }
  }

}

