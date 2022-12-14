//flowline
class flowPoint{
  //构造
  constructor(){
    
    this.loc = createVector(random(0,width),random(0,height));
    this.vel = createVector(0,0);
    this.colorIndex = int(random(colorScheme.length));
    
    this.maxSpeed = 1;
    this.maxForce = 0.1;
    this.acc      = createVector(0,0);
    this.force    = createVector(0,0);
    // this.friction = createVector(0.98,0.98);

    this.friction = createVector(0,0);
    
    
    this.push = 1;
    this.mass = random(1,3);

    this.xoff = 0;
    
    this.x = [];
    this.y = [];

    this.life = random(100,2000);
    this.interest  = random(0,1);

  }
  
  //重置
  reset(){
    
  }//重置
  

  
  applyForce(force){
    this.forceIn = p5.Vector.div(force,this.mass);
    this.acc.add(this.forceIn);
  }

  flowing(force){
    let desired = p5.Vector.mult(force,this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    steer.div(2);
    this.applyForce(steer);
  }
  
  
  
  follow(x,y){
    let mousePos = createVector(x,y);
    let dir =  p5.Vector.sub(mousePos, this.loc);
    
    
    dir.normalize();
    dir.mult(0.2);
    this.acc = dir;
  }
  
  
  attractor02(x,y){
    let corePos = createVector(x,y);
    let coreDir = p5.Vector.sub(corePos, this.loc);
    let dis = coreDir.mag();
    constrain(dis,5,25);
    
    let m = (this.G*this.mass*100)/(dis * dis);
    
    coreDir.normalize();
    coreDir.mult(m);
    
    this.acc = coreDir;
  }
  
   
  
  //波动
  wave(){
    this.xoff += 0.03;
     this.loc.y = this.loc.y + map(noise(this.xoff),0,1,-0.5,0.5) ;
    
  }//波动结束
  
  //移动更新
  move(){
    //air firction
    this.friction = this.vel.mult(0.999,0.999);
    // this.vel.add(this.friction);

    //acceleration
    this.vel.add(this.acc);  

    //move funtion
    this.vel.limit(this.maxSpeed);
    this.loc.add(this.vel);
    this.acc.mult(0);
  }//移动


  edgeDetect01(){
      
    if(this.loc.x < 0){
        this.loc.x += width;
    }
    
    if(this.loc.x > width){
        this.loc.x -= width;
    }
    if(this.loc.y < 0){
        this.loc.y += height;
    }
      
    if(this.loc.y > height){
        this.loc.y -= height;
    }
   
  }

  edgeDetect02(){

    let re = -1;
     if(this.loc.x < 0){
      this.vel.x *= re;
    }
    
    if(this.loc.x > width){
     this.vel.x *= re;
    }
    
    if(this.loc.y < 0){
      this.vel.y *= re;
    }
    
    if(this.loc.y > height){
      this.vel.y *= re;
    }
  }
  
   
  display(){
    //stroke(0);
    let transparence = map(this.life,0,2000,100,255);

    fill(255*this.interest,255*this.interest,155,transparence);
    ellipse(this.loc.x, this.loc.y, 7*this.mass, 7*this.mass);
  }
  
  dead(){
      this.life--;
  }
   
}//end of flowLine