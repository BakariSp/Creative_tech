class Enemy{
    constructor(){
        this.pos = createVector(random(width), random(-50, 0));
        this.radius = 5;
        this.speed = 5;
        this.got_shot = false;
    }

    move(){
        this.pos.y += this.speed;
    }

    shot(bullet){
        for(let i = 0; i < bullet.length; i++){
            this.got_shot = (bullet[i].x <= this.pos.x + this.radius && bullet[i].y <= this.pos.y + this.radius && bullet[i].x >= this.pos.x - this.radius && bullet[i].y >= this.pos.y - this.radius);
            if(this.got_shot){
                break;
            }
        }
        return this.got_shot;
    }

    draw(){
        rectMode(RADIUS);
        fill(0);
        rect(this.pos.x, this.pos.y , this.radius, this.radius);
    }

}