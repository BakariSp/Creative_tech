import processing.serial.*;
import processing.sound.*;
import peasy.*;
int DIM = 32;
PeasyCam cam;

float[] notes = {261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.00, 415.30, 440.0, 466.16, 493.88, 523.25};
Env env;
float attackTime = 0.001;
float sustainTime = 0.004;
float sustainLevel = 0.3;
float releaseTime = 2.4;

//Sine wave oscillator
SinOsc sineWave;
//Square wave oscillator
SqrOsc sqrWave;

//Low pass filter
LowPass lowPass;
float LPfreq=2500;

Serial myPort;

String incomingValue;
float sensor_value;
int button1_value = 0;
int button2_value = 0;
int button3_value = 0;
int message = 0;

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
  
  sineWave = new SinOsc(this);
  sqrWave = new SqrOsc(this);
  
  env  = new Env(this);
  
  lowPass = new LowPass(this);
  lowPass.process(sqrWave);
}

color c = #ffffff;
PVector speed = new PVector(5, 5, 0);
boolean all_away = false;
void draw(){
  background(0);
  
  stroke(c);
  if (cubePars.size() > 0){
      for(int i=0; i<cubePars.size(); i++){
        Particle part = cubePars.get(i);
        if(part.away){
          part.move();
          all_away = false;
        }else{
          all_away = true;
        }
        part.display(c);
    }
    println(cubePars.size());
  }
  if(all_away == true){
    println("allawy: ", all_away);
    cubeReset();
  }
  
  cam.rotateX(PI/150);
  cam.rotateY(PI/150);
  cam.rotateZ(PI/120);
}


int count = 0;
void serialEvent(Serial conn){
   try {
    incomingValue = conn.readString();
    String[] arrValue = split(trim(incomingValue), ',');
    if(arrValue.length == 4){
      button1_value = int(arrValue[0]);
      button2_value = int(arrValue[1]);
      button3_value = int(arrValue[2]);
      sensor_value = float(arrValue[3]);
      message = button1_value*1 + button2_value*2 + button3_value*4;
      println(button1_value, button2_value, button3_value, sensor_value);
      
      LPfreq = map(sensor_value, 0, 4095, 100, 5000);
      if(message != 0){
        playNote(notes[message - 1]);
        //cubeReset();
        c = color(cubeColor[colorCount]);
        colorCount++;
        if(colorCount >= cubeColor.length){
          colorCount = 0;
        }
      }
      
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
    }
  }
  catch(RuntimeException e) {
    e.printStackTrace();
  }
  
}

//plays the same note on the sine and square wave oscillators
void playNote(float noteFreq) {
  sineWave.play(noteFreq, 0.75);
  env.play(sineWave, attackTime, sustainTime, sustainLevel, releaseTime);
  sqrWave.play(noteFreq, 0.75);
  env.play(sqrWave, attackTime, sustainTime, sustainLevel, releaseTime);
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
