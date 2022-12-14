
let FlowPointNum  = 300;
let attractorsNum = 5;
let fieldNum      = 15;
let size = 800;

let Pos1, Pos2;
let windowTransparency = 0;

let aCount = 1;
let pCount = 0;
let fCount = 0;

const MAX_FLOWPOINT_COUNT = FlowPointNum;
const MAX_ATTRACTOR_COUNT = 5;

var colorScheme = ["#E69F66", "#DF843A", "#D8690F", "#B1560D", "#8A430A"];
var shaded = true;
var theShader;
var shaderTexture;
var particles = [];
var attractors = [];
var field = [];

let windowSpeed;


function preload() {
  theShader = new p5.Shader(this.renderer, vertShader, fragShader);
  // soundFormats('mp3', 'wav');
  // my_sound = loadSound('music.wav');
}

function setup() {
  // my_sound.play();
  pixelDensity(1);

  // createCanvas(1920,1080);
  // background(0);

  // let canvas = createCanvas(
	// 	min(windowWidth,windowHeight), 
  //   min(windowWidth,windowHeight),
	// 	WEBGL);

  let canvas = createCanvas(
      size, 
      size,
      WEBGL);

	canvas.canvas.oncontextmenu = () => false;  // Removes right-click menu.
	// noCursor();
	
 
	shaderTexture = createGraphics(size, size, WEBGL);
	shaderTexture.noStroke();
 
  
  // createCanvas(1920,1080,WEBGL); 
  for(let i = 0; i < MAX_FLOWPOINT_COUNT; i++){
    particles[i] = new flowPoint();
  }

  for(let i = 0; i < MAX_ATTRACTOR_COUNT; i++){
    attractors[i] = new Attractor(random(0,width),random(0,height),random(2,8));
  }   


  for(let i=0;i<fieldNum;i++){
    field[i] = new flowflied();
    field[i].init();
  }

  windowSpeed = createVector(-0.1,0);
}

function draw() {

  background(0);
  noStroke();

  
  
  

  let force = createVector(0,0);
  for(let i = 0; i < MAX_FLOWPOINT_COUNT; i++){
    for(let j = 0; j < MAX_ATTRACTOR_COUNT; j++){
     
      particles[i].applyForce(force);
      // particles[i].wave();
 

      particles[i].move();

      particles[i].edgeDetect01();
      
      particles[i].dead();
      attractors[j].dead();

      particles[i].loc.add(windowSpeed);
      attractors[j].loc.add(windowSpeed/MAX_ATTRACTOR_COUNT);

     

      if(particles[i].life <= 0){
        particles[i] = new flowPoint();
      }

      if( attractors[j].mass <= 0){continue;} 
      force = attractors[j].attract(particles[i].loc.x,particles[i].loc.y,particles[i].mass,particles[i].interest); 
      let dis = particles[i].loc.dist(attractors[j].loc);
      if(dis < attractors[j].r){
        attractors[j].mass += 0.2*particles[i].mass;
        particles[i] = new flowPoint();
      }  
    }
  }


  for(let i = 0; i < MAX_FLOWPOINT_COUNT; i++){
    for(let j = 0; j < fCount; j++){
      
      let flowForce = field[j].flow(particles[i].loc.x,particles[i].loc.y);
      particles[i].flowing(flowForce);
      // particles[i].apply(force);

      particles[i].move();
      particles[i].edgeDetect01();
      particles[i].dead();

      if(particles[i].life <= 0){
        particles[i] = new flowPoint();
      }

    }
  }
 



  translate(-width / 2 , -height / 2);
  
  if (shaded) {
    // Display shader.
    shaderTexture.shader(theShader);
    
    let data = serializeSketch();
  
    theShader.setUniform("resolution", [width, height]);
    theShader.setUniform("attractorCount",attractors.length);
    theShader.setUniform("attractors", data.attractors);
    theShader.setUniform("attractorMass",data.attractorMass);
    theShader.setUniform("particleCount", particles.length);
    theShader.setUniform("particles", data.particles);
    theShader.setUniform("particlesInterest", data.particlesInterest);
    theShader.setUniform("colors", data.colors);
    


    shaderTexture.rect(0, 0, width, height);
    texture(shaderTexture);
    
    rect(0, 0, width, height);
  } 
}

//3.5edition
// function mousePressed(){ 
//   Pos1 = createVector(mouseX,mouseY);
// }



// testing add flowcentre
function mousePressed(){
  theShader.setUniform("mult", map(mouseX, 0, width, 0, 1));

  if(fCount<fieldNum){
    field[fCount].effect(mouseX,mouseY);
    fCount++;
    print(field[fCount]);
  }else{
    fCount = 0;
  }


  if(aCount < MAX_ATTRACTOR_COUNT){
    addAttractors();
  }else{
    aCount = 0;
  }

}



function addAttractors(){
  attractors[aCount] = new Attractor(mouseX,mouseY,random(10,30)/2);
  aCount++;
}

// function mousePressed(){ 
//   if(aCount < MAX_ATTRACTOR_COUNT){
//     addAttractors();
//   }else{
//     aCount = 0;
//   }
// }

// function addAttractors(){
//   // let m = Pos1.dist(Pos2)/5;
//   attractors[aCount] = new Attractor(mouseX,mouseY,50);
//   aCount++;
// }


function serializeSketch() {
  data = {"attractors": [], "attractorMass": [], "particles": [],"particlesInterest":[], "colors": []};
  
  for (let i = 0; i < attractors.length; i++) {
    data.attractors.push(
      map(attractors[i].loc.x, 0, width, 0.0, 1.0),
      map(attractors[i].loc.y, 0, height, 1.0, 0.0));
    data.attractorMass.push(attractors[i].mass);
  }

  for (let i = 0; i < particles.length; i++) {
    data.particles.push(
      map(particles[i].loc.x, 0, width, 0.0, 1.0), 
      map(particles[i].loc.y, 0, height, 1.0, 0.0),
      particles[i].mass * particles[i].vel.mag() / 100)

    let itsColor = colorScheme[2];
    data.colors.push(red(itsColor), green(itsColor), blue(itsColor));

    data.particlesInterest.push(particles[i].interest);
  }
  
  return data;
}

// function mouseClicked(){
//   addAttractors();
// }

// function addAttractors(){
//   if(aCount < attractorsNum){
//     attractors[aCount] = new attractors(mouseX,mouseY,random(0.2,5));
//     aCount++;
//   }else{
//     aCount = 1;
//     attractors[aCount] = new attractors(mouseX,mouseY,random(0.2,5));
//   }
// }


function reset(){
  for(let i = 0; i < MAX_FLOWPOINT_COUNT; i++){
    particles[i] = new flowPoint();
  }
}

//remove funtcion
Array.prototype.remove = function(val) { 
  var index = this.indexOf(val); 
  if (index > -1) { 
    this.splice(index, 1); 
  } 
};


