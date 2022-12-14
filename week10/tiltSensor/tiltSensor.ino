// Complete Instructions: https://RandomNerdTutorials.com/esp32-digital-inputs-outputs-arduino/

#define R A0
#define G A1
#define B A2
// set pin numbers
const int buttonPin = 13;  // the number of the pushbutton pin
const int ledPin =  12;    // the number of the LED pin
#define LED_RGB 27

// variable for storing the pushbutton status 
int buttonState = 0;    // current state of the button
int buttonPushCounter = 0;   // counter for the number of button presses       
int lastButtonState = 0;     // previous state of the button

int light_case = 0;

int brightness = 0;    // how bright the LED is
int fadeAmount = 5;    // how many points to fade the LED by
void setup() {
  Serial.begin(115200);  
  // initialize the pushbutton pin as an input
  pinMode(buttonPin, INPUT);
  // initialize the LED pin as an output
  pinMode(ledPin, OUTPUT);

  pinMode(R,OUTPUT);
  pinMode(G,OUTPUT);
  pinMode(B,OUTPUT);

  pinMode(LED_RGB, OUTPUT);
}

void loop() {
  digitalWrite(LED_RGB, HIGH);
  // read the state of the pushbutton value
  buttonState = digitalRead(buttonPin);
  if (buttonState != lastButtonState) {
    // if the state has changed, increment the counter
    if(buttonState == HIGH){
        buttonPushCounter++;
        Serial.print("button pressed: ");
        Serial.println(buttonPushCounter);
      } 
    // if the current state is HIGH then the button went from off to on:
    // Serial.println(buttonPushCounter);
    // Delay a little bit to avoid bouncing
    delay(50);
  }
  //  Serial.println(buttonState);
  // check if the pushbutton is pressed.
  // if it is, the buttonState is HIGH
  if ((buttonPushCounter -1)%2 == 0) {
    // turn LED on
    digitalWrite(LED_RGB, HIGH);
    digitalWrite(ledPin, HIGH);
    analogWrite(R, 255);
    analogWrite(G, 0); 
    analogWrite(B, 0); 
    delay(300);
    digitalWrite(ledPin, LOW);
    analogWrite(R, 0);
    analogWrite(G, 255); 
    analogWrite(B, 0); 
    delay(300); 
    digitalWrite(ledPin, HIGH);
    analogWrite(R, 0);
    analogWrite(G, 0); 
    analogWrite(B, 255); 
    delay(300); 
  } else {
    // turn LED off
    
    analogWrite(R, 0);
    analogWrite(G, 0); 
    analogWrite(B, 0); 
    digitalWrite(ledPin, LOW); 
    digitalWrite(LED_RGB, LOW);
    delay(random(50, 400)); 
    digitalWrite(LED_RGB, HIGH); 
    delay(random(50, 350)); 
  }
  lastButtonState = buttonState;    
  //  delay(30); 
}
