let rayDegree = [0, 0.523599, 5.75959]
let rays = []
let lenRay = 50
let walls = []
let sensorLog = {}

function setup() {
  createCanvas(800, 800);
  // edge wall
  walls.push(new Boundary(0,0,width,0))
  walls.push(new Boundary(0,0,0,height))
  walls.push(new Boundary(width,height,0,height))
  walls.push(new Boundary(width,height,width,0))
  
  // random wall
  for (let i=0; i < 5;i++){
    let ln = 200;
    let x1 = random(ln/2,width-(ln/2));
    let y1 = random(height-(ln/5));
    let x2 = random(x1-ln,x1+ln);
    let y2 = sqrt(sq(ln) - sq(x2-x1))+y1; 
    walls.push(new Boundary(x1,y1,x2,y2))
  }
  
  
  car = new Car(width/2, height/2, 20,2)
  
  for (let i=0; i < rayDegree.length;i++){
    rays.push(new Ray(rayDegree[i], lenRay, car, false)); 
  }
  
}

function draw() {
  
  background(0);
  walls.forEach((wall)=>{
    wall.show();
  })
  
  car.show()
  // car.showTrack()
  rays.forEach((ray)=>{
    ray.show(walls, sensorLog);
  })
  if(sensorLog){
    strokeWeight(3)
    stroke(255,0,0)
    let values = Object.values(sensorLog)
    for(let i=0; i<values.length;i++){
      point(values[i].x, values[i].y)
    }
  }


  textSize(32);
  strokeWeight(0)
  fill(255)
  text('Use WASD to control car movement', 10 , 30);

}


