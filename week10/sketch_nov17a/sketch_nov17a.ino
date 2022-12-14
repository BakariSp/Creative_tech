// Complete Instructions: https://RandomNerdTutorials.com/esp32-digital-inputs-outputs-arduino/

// set pin numbers
const int buttonPin = 13;  // the number of the pushbutton pin
const int ledPin =  12;    // the number of the LED pin

// variable for storing the pushbutton status 
int buttonState = 0;    // current state of the button
int buttonPushCounter = 0;   // counter for the number of button presses       
int lastButtonState = 0;     // previous state of the button

void setup() {
  Serial.begin(115200);  
  // initialize the pushbutton pin as an input
  pinMode(buttonPin, INPUT);
  // initialize the LED pin as an output
  pinMode(ledPin, OUTPUT);
}

void loop() {
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
          
    //      Serial.println(buttonPushCounter);
    // Delay a little bit to avoid bouncing
    delay(50);
  }
  //  Serial.println(buttonState);
  // check if the pushbutton is pressed.
  // if it is, the buttonState is HIGH
  if ((buttonPushCounter -1)%4 == 0) {
    // turn LED on
    digitalWrite(ledPin, HIGH);
  } else {
    // turn LED off
    digitalWrite(ledPin, LOW);
  }
    lastButtonState = buttonState;
}
