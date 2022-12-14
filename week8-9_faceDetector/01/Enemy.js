class Enemy{
    constructor(){
        this.pos = createVector(random(width), random(-50, 0));
        this.radius = 5;
        this.speed = 5;
        this.max_life = 5;
        this.life = this.max_life;
        this.color = color(255,255,255);
        this.got_shot = false;
        this.collided = false;
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
        if(this.got_shot){
            this.life--;
        }
        return this.life;
    }

    draw(){
        this.color.setAlpha(map(this.life, 0, this.max_life, 0, 255));
        rectMode(RADIUS);
        fill(this.color);
        rect(this.pos.x, this.pos.y , this.radius, this.radius);
    }

}