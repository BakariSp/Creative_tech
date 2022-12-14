import processing.sound.*;
SoundFile[] myDrums = new SoundFile[4];

float circleRadius = 60;

void setup(){
  size(660, 200);
  
  //kick drum:
  myDrums[0] = new SoundFile(this, "BT7AADA.WAV");
  //snare drum
  myDrums[1] = new SoundFile(this, "ST7T3SA.WAV");
  //closed hat
  myDrums[2] = new SoundFile(this, "HHCD4.WAV");
  //open hat
  myDrums[3] = new SoundFile(this, "HHODA.WAV");
}

void draw(){
  background(0);
  //kick
  fill(255, 0, 0);
  ellipse(100, 100, circleRadius*2, circleRadius*2);
  
  //snare
  fill(0, 255, 0);
  ellipse(250, 100, circleRadius*2, circleRadius*2);
  
  //closed hat
  fill(0, 0, 255);
  ellipse(400, 100, circleRadius*2, circleRadius*2);
  
  //open hat
  fill(255, 0, 255);
  ellipse(550, 100, circleRadius*2, circleRadius*2);
}

void mouseReleased(){
  if(dist(100, 100, mouseX, mouseY) < circleRadius){
    for(SoundFile d : myDrums){
      d.stop();
    }
    myDrums[0].play();
  }
  else if(dist(250, 100, mouseX, mouseY) < circleRadius){
    for(SoundFile d : myDrums){
      d.stop();
    }
    myDrums[1].play();
  }
  else if(dist(400, 100, mouseX, mouseY) < circleRadius){
    for(SoundFile d : myDrums){
      d.stop();
    }
    myDrums[2].play();
  }
  else if(dist(550, 100, mouseX, mouseY) < circleRadius){
    for(SoundFile d : myDrums){
      d.stop();
    }
    myDrums[3].play();
  }
}
