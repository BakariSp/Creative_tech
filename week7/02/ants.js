class Ants{
    constructor(loc_index){
        this.loc_index = int(loc_index);
        this.all_foods = [];
        this.pos = createVector(0,0);
        this.next_pos = createVector(0,0);

        this.speed = 20;
        this.move_lenght = createVector(0,0);

        this.moving = true;
    
    }

    init(num_foods, foods){
        this.pos = foods[this.loc_index];
        for(let i = 0; i < num_foods; i++){
            this.all_foods[i] =  i;
        }
        this.all_foods.splice(int(this.loc_index),1);
    }

    select(Eta, Tau, foods){
        //calculate Eta and Tau for each ant
        let sum = 0;
        let eta = [];
        let tau = [];
        let possibilities = [];
        if(this.all_foods.length >0){
            for(let i = 0; i < this.all_foods.length; i++){
                eta[i] = Eta[this.loc_index][this.all_foods[i]];
                tau[i] = Tau[this.loc_index][this.all_foods[i]];
                sum += eta[i] * tau[i];
            }
            for(let i=0; i<eta.length; i++){
                possibilities[i] = eta[i]*tau[i] / sum;
            }
        }
        this.possibilities = possibilities;

        //select next food by probability
        let seed = random(0,1);
        let weight_sum = 0;
        for(let i=0; i<this.possibilities.length; i++){
            weight_sum += this.possibilities[i]
            if(seed < weight_sum){
                this.next_loc_index = i;
            }
        }
        this.next_loc_index = this.all_foods[this.next_loc_index];
        this.next_pos = foods[this.next_loc_index];
    }

    update(){
        this.dir = this.next_pos.sub(this.pos);
    }

    move(){
        this.vel = p5.Vector.normalize(this.dir);
        this.vel = this.vel.mult(this.speed);

        while(this.move_lenght.mag() < this.dir.mag() && this.moving){
            this.pos = this.pos.add(this.vel);
            this.move_lenght.add(this.vel);
        }
    }

    display(){
        fill(0, 255, 255);
        circle(this.pos.x, this.pos.y, 10);
        fill(255, 0, 255);
        circle(this.next_pos.x, this.next_pos.y, 10);
    }
}