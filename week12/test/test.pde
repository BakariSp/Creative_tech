import processing.serial.*;

Serial myPort;

void setup() {
  size(500,500);
  printArray(Serial.list());
  myPort = new Serial(this, Serial.list()[0], 9600);
  myPort.bufferUntil('\n');
  fill(255, 0, 0);
}

float diameter = 50;
void draw() {
  background(0);
  
  circle(width/2, height/2, diameter);
}

String incomingValue;
String trim_value;
float button_value = 0;

int pre_state = 0;
int current_state = 0;
boolean bkg = true;
boolean changeAllowed = true;

void serialEvent(Serial conn){
  incomingValue = conn.readString();
  String[] arrValue = split(trim(incomingValue), ',');
  if(arrValue.length == 2){
    button_value = float(arrValue[0]);
    diameter = map(float(arrValue[1]), 0, 4095, 0, width);
    //button_value = button_value;
    if(bkg){
      fill(255, 0, 0);
      background(0);
    }else{
      fill(0, 255, 0);
      background(255);
    }
    current_state = int(button_value);
    bkg = state_change(pre_state, current_state);
    pre_state = current_state;
  }
  
  //println(arrValue[0], arrValue[1]);
  
}

int changes = 0;
boolean state_change(int pre_state, int current_state){
  if(pre_state != current_state){
    changes++;
  }
  if(changes % 4 == 0){
    println(changes);
    return true;
  }
  return false;
}

void button_state_change(float button_value,boolean changeAllowed){
  
}
