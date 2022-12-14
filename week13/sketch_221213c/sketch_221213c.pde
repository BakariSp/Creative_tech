import peasy.*;
import processing.serial.*;

int DIM = 32;
PeasyCam cam;
Serial myPort;
ArrayList<Particle> cubePars = new ArrayList<Particle>();
color[] cubeColor = new color[4];
int colorCount = 0;

void setup(){
  cubeColor[0] = color(#f5f5f5);
  cubeColor[1] = color(#ef5d24);
  cubeColor[2] = color(#447254);
  cubeColor[3] = color(#c1b696);
  size(600, 600, P3D);
  windowMove(1200, 100);
  cam = new PeasyCam(this, 500);
  cubeReset();
  
  myPort = new Serial(this, Serial.list()[0], 9600);
  myPort.bufferUntil('\n');
}

color c = #ffffff;

PVector speed = new PVector(5, 5, 0);
void draw(){
  background(0);
  //translate(width/2, height/2);
  
  stroke(c);
  for(Particle part : cubePars){
    if(part.away){
      part.move();
    }
    part.display(c);
  }
  cam.rotateX(PI/150);
  cam.rotateY(PI/150);
  cam.rotateZ(PI/120);
}

String incomingValue;
float sensor_value;
float button_value = 0;
int count = 0;

void serialEvent(Serial conn){
  incomingValue = conn.readString();
  String[] arrValue = split(trim(incomingValue), ',');
  if(arrValue.length == 2){
    button_value = float(arrValue[0]);
    sensor_value = float(arrValue[1]);
    if(sensor_value > 2000){
      //cam.rotateX(PI/12);
      //cam.setDistance(500);
      for(Particle part : cubePars){
        if(part.away == true){
          continue;
        }else{
          part.away = true;
          speed =new PVector(random(0, 20),random(0, 20),random(0, 20));
          part.speed = speed;
          count++;
          if(count > 150){
            count = 0;
            break;
          }
        }
      }
    }
    if(button_value == 1){
      //cam.reset();
      //cam.lookAt(0,0,0, 500, 100);
      cubeReset();
      if(colorCount >= cubeColor.length){
        colorCount = 0;
      }
      c = color(cubeColor[colorCount]);
      colorCount++;
    }
    println(button_value, sensor_value);
  }
}

void cubeReset(){
  cubePars = new ArrayList<Particle>();
  for( int i = 0; i < DIM; i++){
    for( int j = 0; j < DIM; j++){
      for( int k = 0; k < DIM; k++){
        float x = map(i, 0, DIM, -100, 100);
        float y = map(j, 0, DIM, -100, 100);
        float z = map(k, 0, DIM, -100, 100);
        
        PVector vec = new PVector(x, y, z);
        Particle part = new Particle(vec);
        cubePars.add(part);
      }
    }
  }
}

class Particle{
  PVector pos;
  PVector speed = new PVector(0,0,0);
  boolean away = false;
  Particle(PVector p){
    pos = p;
  }
  
  void display(color c){
    stroke(c);
    strokeWeight(2);
    point(pos.x, pos.y, pos.z);
  }
  
  void move(){
    pos.add(speed);
  }
}
