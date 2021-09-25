uint8_t mode;
uint8_t pin;
volatile uint8_t portD_pins_to_be_flashed=0;
void setup()
{ 
  DDRD|=1<<4 | 1<<5 | 1<<6 | 1<<7;
  TCCR1A=0;
  TCCR1B=0;
  TCCR1B|=1<<CS12;
  TCNT1=0;
  OCR1A=31250;
  TCCR1B|=1<<WGM12;//CTC MODE
  TIMSK1|=1<<OCIE1A;
  Serial.begin(9600);
  
}

ISR(TIMER1_COMPA_vect){
  static uint8_t desired_state=0;
  desired_state==1?PORTD|=portD_pins_to_be_flashed:PORTD&= ~portD_pins_to_be_flashed;
  desired_state=!desired_state;
}

void loop(){
   if (Serial.available() > 0)
  {
    Serial.println("Recieving");
   
    pin = Serial.read()-48;// send better values
    Serial.println(pin);
    while(true){
      if (Serial.available() > 0){
        mode = Serial.read();// send better values
        break;
      }
    }
    Serial.println(mode);
    
    if(mode=='T'){
      uint8_t desired_state=! ((PIND & (1<<pin))>>pin);
      desired_state==1?PORTD|=1<<pin:PORTD&=~(1<<pin);
      
    }

    if(mode=='F'){
      portD_pins_to_be_flashed|=1<<pin;
    }

    if (mode=='S'){
      portD_pins_to_be_flashed&=~(1<<pin);
      PORTD&=~(1<<pin);
    }
  }

}