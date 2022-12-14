#define POT_PIN A2
#define BUTTON_PIN 12
int trim_value = 0;
bool button_value = 0;
void setup() {
  pinMode(POT_PIN, INPUT);
  pinMode(BUTTON_PIN, INPUT);
  Serial.begin(9600);
  while(!Serial);
  
  //  Serial.println("start: ");
  // put your setup code here, to run once:

}

void loop() {
  // put your main code here, to run repeatedly:
  trim_value = analogRead(POT_PIN);
  button_value = digitalRead(BUTTON_PIN);
  Serial.print(button_value);
  Serial.print(',');
  Serial.println(trim_value);
  delay(100);
}
