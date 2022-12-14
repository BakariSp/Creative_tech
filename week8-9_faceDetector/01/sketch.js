let spaceship;
let enemy = [];
let num_enemy = 10;
let move_speed = 5;
let score = 0;
let life_counter = 5;

let faceapi;
let detections = [];

let video;
let canvas;

let Mouthdist = 0;

var hit = false;
let reset_ship = false;
const ALERT_TIME = 30;
const RESET_TIME = 60;
let alertTimes = 0;
let resetTimes = 0;

function setup() {
  textSize(32);
  canvas = createCanvas(400, 400);
  video = createCapture(VIDEO);
  video.size(width, height);

  const faceOptions = {
    withLandmarks: true,
    withExpressions: false,
    withDescriptors: false,
    minConfidence: 0.5
  };

  faceapi = ml5.faceApi(video, faceOptions,faceReady);
  spaceship = new SpaceShip();
}


function draw() {
  
  // push();
  // translate(width,0);
  // scale(-1, 1);
  // image(video, 0, 0, 320, 240);
  // pop();
  textSize(12);
  stroke(44, 169, 225);
  strokeWeight(1);
  fill(44, 169, 225);
  if(detections.length > 0){
    const mouth = detections[0].parts.mouth;
    Mouthdist = dist(mouth[18]._x,mouth[18]._y,mouth[14]._x,mouth[14]._y);
    console.log(Mouthdist);
    spaceship.pos.x = map(detections[0].alignedRect._box._x, 0, width, width, 0);
  }
  if(frameCount % 15 ==0){
    generateEnemies(5);
  }
  if (keyIsDown(LEFT_ARROW)) {
    spaceship.pos.x -= move_speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    spaceship.pos.x += move_speed;
  }

  background(0);
  text("Score: "+score, 320, 20);
  text("Lifes: "+life_counter, 320, 50);
  // text(score, 320, 20);
  noStroke();
  fill(255);
  spaceship.shoot(Mouthdist);
  spaceship.draw();
  
  enemy.forEach((e, i) =>{
    e.move();
    e.draw();
    let shot = e.shot(spaceship.bullet) <= 0;
    if(shot|| e.pos.y > height + 20){
      enemy.splice(i, 1);
      if(shot){
        score++;
      }
    }

    hit = collideRectCircle(e.pos.x, e.pos.y, e.radius, e.radius, spaceship.pos.x, spaceship.pos.y, spaceship.radius, spaceship.radius);
    if( !e.collided && !reset_ship && hit){
      // fill(255, 0, 0);
      reset_ship = true;
      e.collided = true;
      hit = false;
      console.log("life counter: "+life_counter);
      life_counter--;
    }
  })

  if(reset_ship){

    console.log(resetTimes);
    if(alertTimes < ALERT_TIME){
      game_alert();
    }
    ship_reset();
  }

  if(life_counter < 0){
    game_end();
  }
  // console.log("(draw): enemy length: " + enemy.length);
}

function faceReady(){
  faceapi.detect(gotFaces);
}

// let interval1 = setInterval(faceReady, 100);

function gotFaces(error, result){
  if(error){
    // console.log(error);
    return;
  }

  detections = result;
  // console.log(detections);
  faceapi.detect(gotFaces);
}

function ship_reset(){
  if(resetTimes > RESET_TIME){
    reset_ship = false;
    resetTimes = 0;
    spaceship.color = color(255, 255, 255);
  }else{
    spaceship.color = color(255, 0, 0);
    resetTimes++;
  }
}

function game_alert(){
  textSize(64);
  textAlign(CENTER);
  // strokeWeight(10);
  stroke(255, 0, 0)
  text("Hited!", width/2, height/2)
  alertTimes++;
}

function game_end(){
  textSize(64);
  textAlign(CENTER);
  strokeWeight(10);
  stroke(255, 0, 0)
  text("Game Over!", width/2, height/2)
  background(225, 0, 0, 100);
  noLoop();
}

function generateEnemies(num) {
  for(let i = 0; i < num; i++) {
    enemy.push(new Enemy());
  }
}
