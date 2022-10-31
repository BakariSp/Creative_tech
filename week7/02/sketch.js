let Num_ants = 1;
let Num_foods = 5;

let Dist = [];
let foods = [];
let ants = [];

let Eta = []; // 1/dist
let Tau = []; // density of pheromone
let DeltTau = []; //change of pheromone 
let L_best = []; // best path
let L_ave = []; //average length of path
let BestPath = [];

let all_cities = [];//all cities going to be visited

function setup() {
  createCanvas(400, 400);

  background(255);
  stroke(0);
  strokeWeight(5);

  //create foods and calculate distances
  foods = createFood(foods, Num_foods);
  console.log(foods);
  Eta, Tau = Initialize_eta_tau(Dist, foods);
 
  //create ants
  for(let i = 0; i < Num_ants; i++) {
    ants[i] = new Ants(random(Num_foods));
   
    ants[i].init(Num_foods, foods);
    ants[i].select(Eta, Tau, foods);
    ants[i].update(foods);
  }

  
}

function draw() {
  console.log(foods);
  background(255, 255, 255, 150);

  strokeWeight(5);
  foods.forEach((f) => {
    point(f.x, f.y);
  });

  stroke(0);
  strokeWeight(1);
  
  frameRate(1);
  // background(220);
  for(let i=0; i < Num_ants; i++){
    ants[i].move();
    ants[i].display();
    console.log(ants[i].loc_index, ants[i].next_loc_index);
    console.log(foods[ants[i].loc_index], foods[ants[i].next_loc_index]);
    // console.log(ants[i].pos, ants[i].next_pos);
  }
}

function createFood(F, count){
  for(let i=0; i<count; i++){
    F[i] = createVector(random(width), random(height));
    console.log(F[i]);
  }
  console.log(F);
  return F;
}

function Initialize_eta_tau(Dist, foods){
  let f = foods;
  for(let i=0; i<f.length; i++){
    Eta[i] = [];
    Dist[i] = [];
    Tau[i] = [];
    for(let j=0; j<f.length; j++){
      if(i != j){
        Dist[i][j] = f[i].dist(f[j]);
      }
      else{
        Dist[i][j] = 0.1;
      }
 
      Eta[i][j] = 1/Dist[i][j];
      Tau[i][j] = 0.0001;
    }
  }
  return Eta, Tau;
}

function calculate_deta_eta(ants){
  
  for (let i =0; i<Num_ants; i++) {
    for(let j = 0; j<ants.vistied.length; j++){
    }
  }
}
