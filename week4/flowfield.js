class flowflied{
    constructor(){
        this.force = [];
        this.resolution = 5;
        this.cols = width/this.resolution;
        this.rows = height/this.resolution;
        for(let i = 0; i < this.cols; i++){
            this.force[i] = [];
            for(let j = 0; j <this.rows ; j++){
                this.force[i][j] = createVector(0,0);
            }
        }
    }

    init(){
        let xoff = 0;
        for(let i = 0; i <this.cols ; i++){
            let yoff = 0;
            for(let j = 0; j <this.rows ; j++){
                let theta = map(noise(xoff,yoff),0,1,0,TWO_PI);
                this.force[i][j] = createVector(cos(theta),sin(theta));
                this.force[i][j].mult(0.2);
                // this.force[i][j] = createVector(0,0);
                yoff+=0.05;
            }
            xoff+=0.05;
        }
    }

    
    effect(x,y){
        let range = 50;
        let column = int(constrain(x/this.resolution,0,this.cols - 1));
        let row = int(constrain(y/this.resolution,0,this.rows - 1));

        for(let i=-range/2;i<range/2;i++){
            for(let j=-range/2;j<range/2;j++){
                let force = createVector(-j,i);
                force.mult(20/abs(i));
                this.force[column+i][row+j].add(force);
            }
        }
    }

    flow(x,y){
        let column = int(constrain(x/this.resolution,0,this.cols - 1));
        let row = int(constrain(y/this.resolution,0,this.rows - 1));
        return this.force[column][row];
    }
}