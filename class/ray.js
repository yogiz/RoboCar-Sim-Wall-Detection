class Ray {
  constructor(angle, distance, parent, hide) {
    this.angle = angle || 0;
    this.distance = distance || 100;
    this.parent = parent || {x:0, y:0, angle:0};
    this.hide = hide || false;
  }
  show(wall, sensorLog){ // show ray, wall params need to be array;
    stroke(255,100);
    strokeWeight(3);
    
    let x = this.parent.x + this.distance * cos(this.parent.angle + this.angle);
    let y = this.parent.y + this.distance * sin(this.parent.angle + this.angle);
    
    
    if(wall){
      for(let i=0; i<wall.length;i++){
        let isIntersect = this.intersection(
          this.parent.x, x, wall[i].a.x,wall[i].b.x,
          this.parent.y, y, wall[i].a.y,wall[i].b.y
        );
        if(isIntersect[0]){
          stroke(255,0,0);
          x = parseInt(isIntersect[1]);
          y = parseInt(isIntersect[2]);
          
          
          // store point to sensorlog. 
          if(sensorLog){
            let xs = (random(0,2) * 10) + x;
            let ys = (random(0,2) * 10) + y;
            let naming = 'x' + xs + 'y' + ys;
            if(!sensorLog[naming]) sensorLog[naming]= {x : xs, y : ys}
          }
          
          
          
        }
      }
    }
    if(this.hide) noStroke();
    line(this.parent.x, this.parent.y, x, y)
    
    
  }

  
  
  
  intersection(x1,x2,x3,x4,y1,y2,y3,y4){
    // source : Intersecting Lines by peanutscratch (https://editor.p5js.org/peanutscratch/sketches/rk7Mi9USz)
    
    let uA,uB;
    let den,numA,numB;
    let intx, inty; // result 
    
    
    den  = (y4-y3) * (x2-x1) - (x4-x3) * (y2-y1);
    numA = (x4-x3) * (y1-y3) - (y4-y3) * (x1-x3);
    numB = (x2-x1) * (y1-y3) - (y2-y1) * (x1-x3);

    //Coincident? - If true, displays intersection in center of line segment
     if (abs(numA) == 0 && abs(numB) == 0 && abs(den) == 0) {
        intx = (x1 + x2) / 2;
        inty = (y1 + y2) / 2;
        return([true, intx, inty]);
     }

     //Parallel? - No intersection
     if (abs(den) == 0) {
        intx = 0;
        inty = 0;
        return([false, intx, inty]);
     }

     //Intersection?
     uA = numA / den;
     uB = numB / den;

     //If both lie w/in the range of 0 to 1 then the intersection point is within both line segments.
     if (uA < 0 || uA > 1 || uB < 0 || uB > 1) {
        intx = 0;
        inty = 0;
        return([false, intx, inty]);
     }
     intx = x1 + uA * (x2 - x1);
     inty = y1 + uA * (y2 - y1);
     return([true, intx, inty]);
  }
  
  
  
}