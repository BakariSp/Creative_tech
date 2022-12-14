let gridStep = 25;


let posX=[], posY=[];
let p=[];
let scaleSpeed = [];
let mouse_clicked = false;

let holes = [];



function setup() {
  var cnv = createCanvas(1200, 600);
  cnv.style('display', 'block');
  background('#FFFFFF');

  
  // holes= new randomHole(0, 0);
  holes = createHoles(holes);
  console.log(holes);
}


function draw() {

  for(let x=0; x<width/gridStep; x++){
    for(let y=0; y<height/gridStep; y++){
      if (holes[x][y].posX <= mouseX + gridStep*3 && holes[x][y].posY <= mouseY + gridStep*3 && holes[x][y].posX >= mouseX - gridStep*3 && holes[x][y].posY >= mouseY -gridStep*3){
        holes[x][y].on = true;
      }else{
        if(holes[x][y].click_on){
          ;
        }else{
          holes[x][y].on = false;
        }
        
          
      }
      holes[x][y].draw();
      holes[x][y].update();
    }
  }
}

function mouseClicked(){
  console.log(mouseButton);

  if (mouseButton === LEFT){
    mouse_clicked = !mouse_clicked;
    for(let x=0; x<width/gridStep; x++){
      for(let y=0; y<height/gridStep; y++){
        if (holes[x][y].posX <= mouseX + gridStep*3 && holes[x][y].posY <= mouseY + gridStep*3 && holes[x][y].posX >= mouseX - gridStep*3 && holes[x][y].posY >= mouseY -gridStep*3){
          holes[x][y].on = true;
          holes[x][y].click_on = true;
        }
      }
    }
  }else if(mouseButton === RIGHT){
    for(let x=0; x<width/gridStep; x++){
      for(let y=0; y<height/gridStep; y++){
          holes[x][y].on = false;
        }
      }
  }
}
  


function createHoles(holes) {
  for(let x=0; x<width/gridStep; x+=1){
    holes[x] = [];
    for(let y=0; y<height/gridStep; y+=1){
      holes[x][y]  = new randomHole(0, 0);
      holes[x][y].set(x, y);
      holes[x][y].draw();
    }
  }
  return holes;
}



class randomHole {
  constructor(posX, posY) {
    this.posX = posX*gridStep;
    this.posY = posY*gridStep;
    
    this.on = false;
    this.click_on = false;
    this.seed = random(0, 100)/100;

    this.minRadius = 0.15;
    this.radius = 0;

    this.scale = 0.1;
  }

  set(xIn, yIn){
    this.posX = xIn*gridStep;
    this.posY = yIn*gridStep;
    this.p = random(0, 100)/100;
    this.maxRadius = gridStep*this.p*this.seed;
    if (this.p < 0.6){
      this.maxRadius += 5;
    }
   
    this.pNow = this.p;
    this.radius = this.maxRadius;
  }


  draw(){
    let c1 = 255;
    // let c2 = 255 - c1;
    if(this.pNow > 0.6){
      c1 = 255;
    }else{
      c1 = 0;
      // this.maxRadius 
    }
    let c2 = 255-c1

    if(this.on){
      // this.pNow = 0.8;
      this.rectColor = color(c1, 0, c2);
      this.cirColor = color(c2, 0, c1);
    }else{
      // this.pNow = this.p;
      this.cirColor = (c1);
      this.rectColor = (c2);
    }


    if(this.posX <= width && this.posY <= height){
      stroke(0);
      fill(this.rectColor);
      rect(this.posX, this.posY, gridStep, gridStep);

      fill(this.cirColor);
      circle(this.posX + gridStep/2, this.posY + gridStep/2, this.radius);
    }
    
      
  }

  update(){
    this.maxRadius = gridStep*this.pNow;
    this.radius *= 1 + this.scale;
    if(this.radius > this.maxRadius || this.radius < this.minRadius){
      this.scale = this.scale * -1;
    }
  }
}

