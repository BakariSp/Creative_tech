class Ant_colony_optimization{
    constructor(ID, num_foods, food_list){
        this.ID = ID;
        this.num_foods = num_foods;
        this.finished = false;
        this.__init(food_list);
    }


    __init(food_list){
        this.alpha = 2;
        this.beta = 1;
        this.path = [];
        this.total_dis = 0.0;
        this.move_count = 0;
        this.current_pos = -1;
        this.open_table_city = food_list;
        // this.open_table_city = [True for i in this.all_foods];
        this.current_index = int(random(this.num_foods));
        this.current_pos = this.current_index;
        this.pos = createVector(random(width),random(height));
        this.path.push(this.current_index);
        this.open_table_city[this.current_index] = false;
        this.move_count = 1;
    }

    __select_next(pheromone_graph, distance_graph){
        this.next_pos = -1;
        let select_prob = [];
        let total_prob = 0;

        //probability to next city
        for(let i = 0; i < this.num_foods; i++){
            if(this.open_table_city[i]){
                select_prob[i] = Math.pow(pheromone_graph[this.current_pos][i], this.alpha) * Math.pow(1.0/distance_graph[this.current_pos][i], this.beta)
                total_prob += select_prob[i]; 
                console.log(select_prob[i]);
            }
        }

        console.log("total prob: " + total_prob);

        if(total_prob > 0){
            //random select by probability
            let temp_prob = random(0, total_prob);
            for(let i = 0; i < this.num_foods; i++){
                if(this.open_table_city[i]){
                    temp_prob -= select_prob[i];
                    if(temp_prob < 0){
                        this.next_pos = i;
                        break;
                    }
                }
            }
        }

        if(this.next_pos == -1){
            next_pos = random(0, this.num_foods -1)
            if(this.open_table_city[next_pos] == false){
                next_pos = random(0, this.num_foods -1);
            }
        }

        return this.next_pos;
    }

    __cal_total_dist(distance_graph){
       
        let temp_distance = 0.0;
        let x = 0;
        let start = 0;
        let end = 0;

        for(let i = 0; i < this.num_foods; i++){
            if(i==0){
                x = this.num_foods - 1;
            }else{
                x = i-1;
            }
            start = this.path[i];
            end = this.path[x];
            console.log("round"+i+": ", start, end);
            temp_distance += distance_graph[start][end];
        }

        end = this.path[0];
        temp_distance += distance_graph[start][end];
        console.log("(from class)temp_dist: " + temp_distance);
        this.total_dist = temp_distance;
    }

    __move(){
        this.path.push(this.next_pos);
        this.open_table_city[this.next_pos] = false;
        this.total_dist += distance_graph[this.current_pos][this.next_pos]
        this.current_pos = this.next_pos;
        this.move_count++;
    }
    

    search_path(pheromone_graph, distance_graph){
        while(this.move_count < this.num_foods){
            this.next_pos = this.__select_next(pheromone_graph, distance_graph);
            this.__move(this.next_pos);
        }

        this.__cal_total_dist(distance_graph);
    }

    draw(foods){
        strokeWeight(2);
        stroke(0);
        if(this.path.length >= 2){
            for(let i = this.path.length -1; i > 0; i--){
                line(foods[i], foods[i-1]);
                console.log("drawing line: "+i);
            }
        }
        
        
    }
}