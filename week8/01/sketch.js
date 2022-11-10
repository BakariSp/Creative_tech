let spaceship;
let enemy = [];
let num_enemy = 10;
let move_speed = 5;


function setup() {
  createCanvas(400, 400);
  spaceship = new SpaceShip();
}

function draw() {
  if(frameCount % 15 ==0){
    generateEnemies(5);
  }
  if (keyIsDown(LEFT_ARROW)) {
    spaceship.pos.x -= move_speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    spaceship.pos.x += move_speed;
  }


  background(220);
  spaceship.shoot();
  spaceship.draw();
  

  enemy.forEach((e, i) =>{
    e.move();
    e.draw();
    if(e.shot(spaceship.bullet) || e.pos.y > height + 20){
      enemy.splice(i, 1);
    }
  })

  console.log("(draw): enemy length: " + enemy.length);


}


function generateEnemies(num) {
  for(let i = 0; i < num; i++) {
    enemy.push(new Enemy());
  }
}
