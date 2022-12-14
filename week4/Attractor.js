class Attractor{

    constructor(locX,locY,mass){
      this.loc  = createVector(locX,locY);
      this.mass = mass;
      this.G    = 0.1;
      this.rad  = 20 ; 
      this.timer= 0.0;
      this.xoff = 0.1;
      this.interest = random(0,1);
      this.topInterest = 5;

      this.life = 0;
    }
    
    attract(locX,locY,mass,interest){
        let mLoc  = createVector(locX,locY);
        let force = p5.Vector.sub(this.loc,mLoc);  
        let dis   = force.mag();

        dis = constrain(dis,5,25);
        force.normalize();
        
        // this.gravityWave();
        let strength = (this.G * this.mass * mass) / (dis * dis);
        let like = 1/abs(interest - this.interest);
        constrain(like,0.1,5);
        map(like,0.1,5,-3,5);

        force.mult(strength*like);
        return force;
    }

    gravityWave(){
        let massWave  = this.mass;
        this.timer     = 0.0;
        this.timerStep = 0.3;
        massWave      =  sin(this.timer) * this.mass;
        this.timer += this.timerStep;
        return massWave;
    }

    dead(){
        this.life += 1;
        this.mass -= 0.0001;     
    }
    
    //attractor display
    display(){
        this.mass = constrain(this.mass,0,30);
        this.r = this.rad * this.mass;
        let transparence = map(this.mass,0,8,0,255);
        noStroke();
        fill(255*this.interest,255*this.interest,125,transparence);
        ellipse(this.loc.x,this.loc.y,this.r, this.r);
    }  
  }