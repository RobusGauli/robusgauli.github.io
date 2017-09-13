let agents; 
function setup() {
  createCanvas(windowWidth, windowHeight)
  //agent = new Agent();
  agents = new Agents(20)
  
}

function draw() {
  background(17)
  
  agents.run()
  fill(255, 255, 255, 100)
  textSize(90);
  text("Robus Gauli.", windowWidth/2,  windowHeight/2)
  
}

class Agents {
  constructor() {
    this.agents = []
    for (let i = 0; i < 100; i++) {
        this.agents.push(new Agent())
     }
   }
  
  run() {
    this.agents.forEach(agent => {
      agent.show()
      agent.update()
      agent.bounce()
      agent.seek()
    }) // 
  }
    
 // 
}


class Agent {
  
  constructor() {
    this.position = createVector(random(width), random(height))
    this.velocity = createVector()
    this.acc = createVector()
    
    //some colots with this autonomouse agent
    this.color = {
      r: random(255),
      g: random(255),
      b: random(255),
      t: random(400)
    }
    this.rad = random(4, 14)
  }
  
  show() {
    fill(this.color.r, this.color.g, this.color.b, this.color.t)
    noStroke()
    ellipse(this.position.x, this.position.y, this.rad, this.rad)
    
  }
  
  update() {
    this.applyForce(createVector(random(-0.2, 0.3), random(-0.2, 0.2)))
    this.position.add(this.velocity)
    this.velocity.add(this.acc)
    this.velocity.limit(20)
    this.acc.mult(0)
  }
  
  applyForce(someForce) {
    this.acc.add(someForce)
  }
  
  seek() {
    let target;
    if (random(1) < 0.5) {
      target = createVector(mouseX, mouseY)  
    } else {
      target = createVector(random(width), random(height))
    }
    
    let desiredForce = target.sub(this.position)
    //desiredForce.setMag(3)
    let f = desiredForce.sub(this.velocity)
    f.setMag(1)
    this.applyForce(f)
  }
  
  bounce() {
    if(this.position.x > width || this.position.x < 0) {
      this.velocity.x *= -1
    }
    
    if (this.position.y > height || this.position.y < 0) {
     this.velocity.y *= -1
    }
  }
}