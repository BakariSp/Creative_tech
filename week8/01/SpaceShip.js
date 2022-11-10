class SpaceShip{
    constructor() {
      this.radius = 5;
      this.pos = createVector(width/2, height - this.radius - 10);

      this.bullet = [];
      this.bullet_speed = 5;
      this.bullet_radius = 1;
     
    }
    
    shoot(){
        this.bullet.push(createVector(this.pos.x, this.pos.y));
        this.bullet.forEach((b) => {
            b.y -= this.bullet_speed;
        })
    }

    draw() {
      rectMode(RADIUS);
      fill(255);
      rect(this.pos.x, this.pos.y , this.radius, this.radius);

      fill(0);
      this.bullet.forEach((b) =>{
        circle(b.x, b.y, this.bullet_radius, this.bullet_radius);
      })
    }
  }
  