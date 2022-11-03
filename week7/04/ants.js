class Ant_particle{
    constructor(){
      this.pos = [width/2, height/2];
      this.grab_food = false;
      // this.next_pos = createVector(random(width), random(height));
      this.speed = 5;
    }
  
    select(food){
      this.next_pos = food[0];
      return this.next_pos;
      // console.log("(select)next pos: "+this.next_pos);
    }
  
    move(){
      this.vel = createVector(this.next_pos[0]-this.pos[0], this.next_pos[1]-this.pos[1]);
      // this.vel = this.next_pos.sub(this.pos);
      this.vel = this.random_move();
      this.vel.normalize();
      this.vel.mult(this.speed);
      console.log("(class move)vel: "+this.vel);
      console.log("(class move)this pos: "+this.pos);
  
      if(this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height){
        this.vel.mult(-1);
      }
      this.pos[0] += this.vel.x;
      this.pos[1] += this.vel.y;
      console.log("(class move)this pos: "+this.pos);
      // if(this.pos == this.next_pos){
      //   this.find = true;
      // }
  
      dist = this.__measure_dist();
    //   console.log("dist= "+dist);
    }

  
    __measure_dist(){
      let dist = 0;
      let x = this.pos[0] - this.next_pos[0];
      let y = this.pos[1] - this.next_pos[1];
      dist = sqrt(x*x + y*y);
  
      if(dist < 4){
        this.grab_food = true;
      }
      return dist;
    }

    get_food(food) {
        if(this.grab_food){
            this.grab_food = false;
            if(food.length > 1){
                food.splice(0,1);
                this.next_pos = this.select(food);
            }else if(food.length ==1){
                food.splice(0,1);
                this.next_pos = [random(width), random(height)];
                this.vel = this.random_move();
            }else{
                this.next_pos = [random(width), random(height)];
                this.vel = this.random_move();
            }
        }
    }
  
    random_move(){
      this.angle_range = PI/6;
      this.angle = random(this.angle_range * -1, this.angle_range);
      this.vel.x = cos(this.angle)*this.vel.x - sin(this.angle)*this.vel.y;
      this.vel.y = sin(this.angle)*this.vel.x + cos(this.angle)*this.vel.y;
      return this.vel;
    }
  
    draw(){
      stroke(0);
      strokeWeight(2);
      point(this.pos[0], this.pos[1]);
    }
  }