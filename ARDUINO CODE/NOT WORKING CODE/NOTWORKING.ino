#include <Arduino.h>
uint8_t mode;
uint8_t pin;
void setup()
{ 
  
  DDRD|=1<<4 | 1<<5 | 1<<6 | 1<<7;
   Serial.begin(9600);
}

void toggleFlashing() {
  static uint8_t flash_state=1;
  if(flash_state == 1){
  while (true)
    {
     
      PORTD|=(1<<pin);
      unsigned long current_time=millis();
      while(millis()-current_time!=400){}//same as delay(400)...millis returns time elapsed since program started
      PORTD&=~(1<<pin);
      current_time=millis();
      while(millis()-current_time!=400){}//same as delay(400)...millis returns time elapsed since program started
    }
  }
  else {
    PORTD&=~(1<<pin);
  }
  flash_state=!flash_state;
}

void loop()
{
  if (Serial.available() > 0)
  {
    Serial.println("Recieving");
   
    pin = Serial.read()-48;
    Serial.println(pin);
    while(true){
      if (Serial.available() > 0){
        mode = Serial.read();
        break;
      }
    }
    Serial.println(mode);
    
    if(mode=='T'){
      uint8_t desired_state=! ((PIND & (1<<pin))>>pin);
      desired_state==1?PORTD|=1<<pin:PORTD&=~(1<<pin);
    }
    if(mode=='F' || mode=='S'){
      toggleFlashing();
    }
    
    
  }

}

