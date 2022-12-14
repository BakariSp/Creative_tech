let ants = [];
let food = [];
let num_ants = 1;
let num_food = 2;
function setup() {
  createCanvas(400, 400);

  for(let i=0; i<num_food; i++){
    food[i] = createVector(200, 200);
  }
 
  for(let i=0; i<num_ants; i++) {
    ants[i] = new Ant_particle();
  }
  console.log("from setup: ", food);
}

function draw() {
  // food =  createVector(mouseX, mouseY);
  frameRate(1);
  background(220, 220, 220, 150);
  stroke(0)
  strokeWeight(10);


  ants.forEach((ant) => {
    food = ant.move(food);
    ant.draw();
  })
}

function mouseReleased(){
  food.push(createVector(mouseX, mouseY));
  console.log("from mouse function", food);
  // return food;
}

class Ant_particle{
  constructor(){
    this.pos = createVector(random(width), random(height));
    // this.next_pos = createVector(random(width), random(height));
    this.speed = 5;
  }

  move(food){
    console.log("food[0]: ", food[0]);
    this.next_pos = food[0];
    console.log("(class) next_pos = ",this.next_pos); 

    if(food.length > 0){
      this.vel = this.next_pos.sub(this.pos);
      console.log("1");
    }else{
      this.vel = createVector(random(-1,1), random(-1,1));
    }

    this.vel = this.vel.normalize();
    console.log("(class) vel1 = ",this.vel);
    
    


    this.vel.mult(this.speed);
    console.log("(class) vel = ",this.vel);
    this.pos.add(this.vel);
    console.log("(class) this.pos = ",this.pos);
    console.log("(class) next_pos = ",this.next_pos); 

    this.dist = this.pos.sub(this.next_pos);
    this.dist = this.dist.mag();
    console.log("(class) dist = ",this.dist);
    
    if(this.pos.sub(this.next_pos).mag() < 1){
      this.find = true;
    }

    if(this.find){
      this.find = false;
      this.pos = this.next_pos;
      food.splice(0, 1);
    }

    return food;
  }

  draw(){
    point(this.pos);
  }
}