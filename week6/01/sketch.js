let angle = 0;
let r = 50;

let fx = [];
let fx2 = [];

let draw_pt = [];

let connect_line = [];

let f_count = 0;
let arraw = new p5.Vector(0, 0);
let loc = 0;
let v = 0;
let l = 80;

let cirs = [];
let pt_decay = 0.15;

function setup() {
  createCanvas(1200, 400);
  cirs[0] = new f_circle(0, 0, 50, PI/2);
  cirs[1] = new f_circle(0, 0, 30, PI/4);
  // cirs[2] = new f_circle(0, 0, 15, PI/8);
  // cirs[3] = new f_circle(0, 0, 30, PI/2);
  // cirs[4] = new f_circle(0, 0, 50, PI/4);
  // for(i=0; i<cirs.length-1; i++){
  //   draw_pt[i] = [60];
  //   for(j=0; j<60; j++){
  //     draw_pt[i][j] = new Pix(0,0,0.25);
  //   }
  // }

  for(i=0; i<10; i++){
    connect_line[i] = [];
  }

  v = PI/120;
  l = l+r;

  
  noFill();
}

function draw() {
  if(frameCount == 400){
    cirs.push(new f_circle(0, 0, 15, PI/8));
  }
  
  if(frameCount == 1200){
    cirs.push(new f_circle(0, 0, 30, PI/2));
  }

  if(frameCount == 2000){
    cirs.push(new f_circle(0, 0, 50, PI/4));
  }
  
  // noFill();
  
  background(0);
  stroke(255);

  //translate to the center of window
  translate(width/6, height/2);
  
  
  // fill(255);
  line( l, 0, width, 0);
  line( l, -100,  l, 100);

  for(i=0; i<cirs.length-1; i++){
    if(i % 2 != 0){
      sign = -1;
    }else{
      sign = 1;
    }
    // draw_pt[i] = [];
    circle(cirs[i].x, cirs[i].y, cirs[i].radius * 2);
    cirs[i+1].x = cirs[i].x + cos(cirs[i].angle) * cirs[i].radius;
    cirs[i+1].y = cirs[i].y + sin(cirs[i].angle) * cirs[i].radius * sign;

    line(cirs[i].x, cirs[i].y, cirs[i+1].x, cirs[i+1].y);
    line(cirs[i].x, cirs[i].y, l, cirs[i].y);
    

    // draw_pt[i][frameCount%60].x = cirs[i].x;
    // draw_pt[i][frameCount%60].y = cirs[i].y;
  }

  // console.log(draw_pt[0]);

  line(cirs[cirs.length-1].x, cirs[cirs.length-1].y, l, cirs[cirs.length-1].y);
  
  
  // circle(cirs[0].x, cirs[0].y, cirs[0].radius * 2);
  // cirs[1].x = cos(cirs[0].angle) * cirs[0].radius;
  // cirs[1].y = -sin(cirs[0].angle) * cirs[0].radius;
  
  // line(0, 0, cirs[1].x, cirs[1].y);
  // line(cirs[1].x, cirs[1].y, l, cirs[1].y);

  
  // circle(cirs[1].x, cirs[1].y, cirs[1].radius*2);
  // cirs[2].x = cirs[1].x + cos(cirs[1].angle) * cirs[1].radius;
  // cirs[2].y = cirs[1].y + sin(cirs[1].angle) * cirs[1].radius;

  // line(cirs[1].x, cirs[1].y, cirs[2].x, cirs[2].y);
  // line(cirs[2].x, cirs[2].y, r+l, cirs[2].y);
  
  
  
  
  draw_pt.push(new Pix(cirs[cirs.length-1].x, cirs[cirs.length-1].y, pt_decay));
  draw_pt.forEach((x) =>{
    // x.x += v * frameRate();
    stroke(255 - 255*(1-x.life/100));
    point(x.x, x.y);
    x.update();
    if (x.life < 1){
      draw_pt.shift();
    }
  });

  if (frameCount % 30 ==0){
    console.log(cirs[0].random);
  }
  
  
  for(i=0; i<cirs.length; i++){
    connect_line[i].push(new Pix(l, cirs[i].y, 0.25));
    connect_line[i].forEach((x) =>{
      x.x += v * frameRate();
      stroke(color(255, 255, 255, 255 * x.life/100));
      point(x.x, x.y);
      x.update();
      if (x.life < 1){
        connect_line[i].shift();
      }
    });
  }


  /*
  fx.push(new p5.Vector(l, cirs[1].y));
  fx2.push(new p5.Vector(l, cirs[2].y));
  fx.forEach((x) =>{
    x.x += v * frameRate();
    point(x.x, x.y);
  });

  fx2.forEach((x) =>{
    x.x += v * frameRate();
    point(x.x, x.y);
  });
  */
  

  cirs.forEach((c) => {
    c.update();
    // print(c.angle);
  });

  

 

}

class f_circle {
  constructor(x, y, radius, period){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.period = period;
    this.angle = 0;
    // this.random = int(random(-1,1));
  }

  update(){
    this.angle += this.period/60;
  }
}


class Pix {
  constructor(x, y, decay){
    this.x = x;
    this.y = y;
    this.decay = decay;
    this.life = 100;
  }

  update(){
    this.life -= this.decay;
  }
}

