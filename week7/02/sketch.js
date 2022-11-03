let Num_ants = 1;
let Num_foods = 10;

let foods = [];
let ants = [];

let distance_graph = [];
let pheromone_graph = [];

let food_list = [];
let this_pos = 0;
let next_pos = 0;//all cities going to be visited

function setup() {
  createCanvas(400, 400);
  background(255);
  stroke(0);
  strokeWeight(5);

  //initialize food and food list
  for(let i=0; i<Num_foods; i++){
    foods[i] = createVector(random(width), random(height));
    food_list[i] = true;
    console.log(foods[i]);
  }

  //initialize ant
  for(let i =0; i<Num_ants; i++) {
    ants[i] = new Ant_colony_optimization(i, Num_foods, food_list);
    console.log(ants[i]);
  }

  for(let i = 0; i <Num_foods; i++){
    distance_graph[i] = [];
    pheromone_graph[i] = [];
    for(let j = 0; j <Num_foods; j++){
      distance_graph[i][j] = foods[i].dist(foods[j]);
      pheromone_graph[i][j] = 0.001;
    }
  }

  //using dist and pheromone to select next_pos
  /*while(ants[0].move_count < Num_foods){
    console.log("distance_graph", distance_graph, "pheromone_graph: ", pheromone_graph);
    next_pos = ants[0].__select_next(pheromone_graph, distance_graph);
    console.log("next_pos: " + next_pos);

    //move to next position
    console.log("From pos: " + ants[0].current_pos);
    ants[0].__move();
    console.log("Moving to pos: "+ ants[0].current_pos);
    // console.log("Path: "+ ants[0].path);
  }
  //calculate total distance
  console.log("Path: " + ants[0].path);
  ants[0].__cal_total_dist(distance_graph);
  console.log("Total Distance: " + ants[0].total_dist);*/
}

function draw() {
  background(255, 255, 255, 150);

  strokeWeight(20);
  stroke(0);
  foods.forEach((food) => {
    point(food.x, food.y);
  });
  frameRate(1);

  ants.forEach((ant) => {
    if(ant.move_count < ant.num_foods && !ant.finished){
      ant.next_pos = ant.__select_next(pheromone_graph, distance_graph);
      ant.__move(ant.next_pos);
    }else if( ant.finished == false){
      ant.__cal_total_dist(distance_graph);
      ants.finished = true;
      console.log("(from main)Total Distance: " + ant.total_dist);
    }
    console.log("this_pos: " + ant.current_pos);
    // draw(foods);
    stroke(255,0,0);
    point(foods[ant.current_pos].x, foods[ant.current_pos].y);
    strokeWeight(2);
    console.log("(From main)path length: " + ant.path.length);
    ant.draw(foods);
    console.log("(From main)move count: " + ant.move_count);
    console.log("(From main)path: " + ant.path);
    
  });
  
}
