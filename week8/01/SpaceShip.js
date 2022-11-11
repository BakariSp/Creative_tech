class SpaceShip{
    constructor() {
      this.radius = 10;
      this.pos = createVector(width/2, height - this.radius - 10);

      this.bullet = [];
      this.bullet_speed = 5;
      this.bullet_radius = 1;

      this.collide = false;
      this.color = color(255);
     
    }
    
    shoot(Mouthdist){
      if (Mouthdist > 10){
        this.bullet.push(createVector(this.pos.x, this.pos.y));
      };
      this.bullet.forEach((b) => {
        b.y -= this.bullet_speed;
      });
    }

    collider(e){
      let left = e.pos.x + e.radius >= this.pos.x - this.radius;
      let right = e.pos.x - e.radius <= this.pos.x + this.radius;
      
      let top = e.pos.y + e.radius >= this.pos.y - this.radius;
      let bottom = e.pos.y - e.radius <= this.pos.y + this.radius;

      let ver_bound = top&&bottom;
      let hor_bound = right&&left;
      this.collide = ver_bound && hor_bound;
      console.log(" ver_bound, hor_bound, collide",  ver_bound, hor_bound, this.collide);
      // console.log("collide",  this.collide);
      return this.collide;
    }

    draw() {
      // CircleMode(RADIUS);
      fill(this.color);
      circle(this.pos.x, this.pos.y , this.radius*2);

      fill(255);
      this.bullet.forEach((b) =>{
        circle(b.x, b.y, this.bullet_radius, this.bullet_radius);
      })
    }
  }
  