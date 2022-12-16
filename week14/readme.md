##Multi-controller music machine

***particles class (the same with last class)***
>
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

***main function***
Added to three buttons and one sensor, translate binary messages to decimal massege, so 3 buttons can present 8 behaviors;
>
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
                if(message == 7){
                cubeReset();
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

***setup and draw function***
>
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


    //if all particles flied away then reset the cube
    void draw(){
        background(0);
        
        stroke(c);
        if (cubePars.size() > 0){
            for(int i=0; i<cubePars.size(); i++){
                Particle part = cubePars.get(i);
                if(part.away){
                    part.move();
                    all_away = true;
                }else{
                    all_away = false;
                }
                part.display(c);
            }
        }
        if(all_away == true){
            println("allawy: ", all_away);
            cubeReset();
        }
        
        cam.rotateX(PI/150);
        cam.rotateY(PI/150);
        cam.rotateZ(PI/120);
    }