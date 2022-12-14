##Mulit-controll Processing Project  


https://user-images.githubusercontent.com/46394756/207474270-15e438ab-abc2-456d-8d6a-854b83773bfb.mp4


***partcle class***
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
![4e176678a36bc308ba1f3256dd40f81](https://user-images.githubusercontent.com/46394756/207474166-9855256b-0f2d-4713-abe3-657b721b06db.png)

In the main function, I controll the color of particles, and using sensor_value to controll the inner speed of these particles, if I touch the pressure sensor, then these particles will fly away.
>
    void serialEvent(Serial conn){
        incomingValue = conn.readString();
        String[] arrValue = split(trim(incomingValue), ',');
        if(arrValue.length == 2){
            button_value = float(arrValue[0]);
            sensor_value = float(arrValue[1]);
            if(sensor_value > 2000){

            //boolean value away to define the moving state of the particle
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
            if(button_value == 1){
                //press button to reset the cube
                cubeReset();
            if(colorCount >= cubeColor.length){
                colorCount = 0;
            }
            c = color(cubeColor[colorCount]);
            colorCount++;
            }
        }
    }

***setup & draw function***
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
    }

    void draw(){
        background(0);
        
        stroke(c);
        for(Particle part : cubePars){
            if(part.away){
                part.move();
            }
                part.display(c);
        }
        cam.rotateX(PI/150);
        cam.rotateY(PI/150);
        cam.rotateZ(PI/120);
    }

