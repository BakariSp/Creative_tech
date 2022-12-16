#define POT_PIN A2
#define BUTTON1_PIN 13
#define BUTTON2_PIN 12
#define BUTTON3_PIN 27
int trim_value = 0;
bool button1_value = 0;
bool button2_value = 0;
bool button3_value = 0;
void setup() {
  pinMode(POT_PIN, INPUT);
  pinMode(BUTTON1_PIN, INPUT);
  pinMode(BUTTON2_PIN, INPUT);
  pinMode(BUTTON3_PIN, INPUT);
  Serial.begin(9600);
  while(!Serial);
  
  //  Serial.println("start: ");
  // put your setup code here, to run once:

}

void loop() {
  // put your main code here, to run repeatedly:
  trim_value = analogRead(POT_PIN);
  button1_value = digitalRead(BUTTON1_PIN);
  button2_value = digitalRead(BUTTON2_PIN);
  button3_value = digitalRead(BUTTON3_PIN);
  Serial.print(button1_value);
  Serial.print(',');
  Serial.print(button2_value);
  Serial.print(',');
  Serial.print(button3_value);
  Serial.print(',');
  Serial.println(trim_value);
  delay(100);
}
