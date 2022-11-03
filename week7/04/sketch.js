let ants = [];
let food = [];
let num_ants = 4;
let num_foods = 20;
function setup() {
  createCanvas(400, 400);
  
  for(let i=0; i<num_foods; i++){
    food[i] = [];
    for(let j=0; j<2; j++){
      food[i][j] = random(400);
    }
  }

  for(let i=0; i<num_ants; i++) {
    ants[i] = new Ant_particle();
    ants[i].select(food);
  }
  console.log("from setup: ", food);
}

function draw() {
  // food =  createVector(mouseX, mouseY);
  // console.log("(main)food:", food[0][0]);
  frameRate(10);
  background(225, 225, 225, 2);
  stroke(0)
  strokeWeight(10);

  food.forEach((f) =>{
    strokeWeight(10);
    stroke(255, 0, 0);
    point(f[0], f[1]);
  })

  ants.forEach((ant) => {
    ant.move();
    ant.draw();
    ant.get_food(food);
    console.log("(Draw)this pos: ", ant.pos);
    console.log("(Draw)next pos: ", ant.next_pos);
  })
}

function mouseReleased(){
  food.push([mouseX, mouseY]);
  // console.log("from mouse function", food);
  // return food;
}

