import Vector from './BoidVectors'

const MAX_SPEED = 5
const MAX_FORCE = 0.025
const DESIRED_SEPARATION = 17
const NEIGHBOR_DISTANCE = 57
const BORDER_OFFSET = 3
const BOID_COLOR = '#63EEEA'
const MAX_RADIUS = 43

function Boid(x, y, simulation) {
  let randomAngle = Math.random() * 2 * Math.PI
  this.velocity = new Vector(Math.cos(randomAngle), Math.sin(randomAngle))
  this.position = new Vector(x, y)
  this.acceleration = new Vector(0, 0)
  this.simulation = simulation
  this.opacity = 1
}

Boid.prototype = {
  render: function(boids) {
    // console.log(window.mouseX, window.mouseY)
    let directionVector = this.velocity.normalize().multiplyBy(19)
    directionVector.iAdd(this.getAvoidDir(boids))

    let inverseVector1 = new Vector(directionVector.y, -directionVector.x)
    let inverseVector2 = new Vector(-directionVector.y, directionVector.x)
    inverseVector1 = inverseVector1.divideBy(3)
    inverseVector2 = inverseVector2.divideBy(3)

    let pos = this.position.add(this.getAvoid())

    this.simulation.ctx.beginPath()
    this.simulation.ctx.moveTo(pos.x, pos.y)
    this.simulation.ctx.lineTo(
      pos.x + inverseVector1.x,
      pos.y + inverseVector1.y
    )
    this.simulation.ctx.lineTo(
      pos.x + directionVector.x,
      pos.y + directionVector.y
    )
    this.simulation.ctx.lineTo(
      pos.x + inverseVector2.x,
      pos.y + inverseVector2.y
    )
    this.simulation.ctx.lineTo(pos.x, pos.y)
    this.simulation.ctx.globalAlpha = this.opacity
    this.simulation.ctx.strokeStyle = BOID_COLOR
    this.simulation.ctx.stroke()
    this.simulation.ctx.fillStyle = BOID_COLOR
    this.simulation.ctx.fill()
  },

  //
  // Rule 1: Boids try to fly towards the centre of mass of neighbouring boids.
  getCohesionVector: function(boids) {
    let totalPosition = new Vector(0, 0)
    let neighborCount = 0
    for (let bi in boids) {
      let boid = boids[bi]
      if (this == boid) {
        continue
      }

      let distance = this.position.getDistance(boid.position)
      if (distance <= NEIGHBOR_DISTANCE) {
        totalPosition = totalPosition.add(boid.position)
        neighborCount++
      }
    }

    if (neighborCount > 0) {
      let averagePosition = totalPosition.divideBy(neighborCount)
      return this.seek(averagePosition)
    } else {
      return new Vector(0, 0)
    }
  },

  seek: function(targetPosition) {
    let desiredVector = targetPosition.subtract(this.position)

    // Scale to the maximum speed
    desiredVector.iSetMagnitude(MAX_SPEED)

    // Steering = Desired minus Velocity
    let steeringVector = desiredVector.subtract(this.velocity)
    steeringVector = steeringVector.limit(MAX_FORCE)

    return steeringVector
  },

  //
  // Rule 2: Boids try to keep a small distance away from other objects (including other boids).
  getSeparationVector: function(boids) {
    let steeringVector = new Vector(0, 0)
    let neighborCount = 0

    for (let bi in boids) {
      let boid = boids[bi]
      if (this == boid) {
        continue
      }

      let distance = this.position.getDistance(boid.position)
      if (distance > 0 && distance < DESIRED_SEPARATION) {
        let deltaVector = this.position.subtract(boid.position)
        deltaVector.iNormalize()
        deltaVector.iDivideBy(distance)
        steeringVector.iAdd(deltaVector)
        neighborCount++
      }
    }

    let averageSteeringVector = new Vector(0, 0)

    if (neighborCount > 0) {
      averageSteeringVector = steeringVector.divideBy(neighborCount)
    }

    if (averageSteeringVector.getMagnitude() > 0) {
      averageSteeringVector.iSetMagnitude(MAX_SPEED)
      averageSteeringVector.iSubtract(this.velocity)
      averageSteeringVector.iLimit(MAX_FORCE)
    }

    return averageSteeringVector
  },

  //
  // Rule 3: Boids try to match velocity with near boids.
  getAlignmentVector: function(boids) {
    let perceivedFlockVelocity = new Vector(0, 0)
    let neighborCount = 0

    for (let bi in boids) {
      let boid = boids[bi]
      if (this == boid) {
        continue
      }

      let distance = this.position.getDistance(boid.position)
      if (distance > 0 && distance < NEIGHBOR_DISTANCE) {
        perceivedFlockVelocity.iAdd(boid.velocity)
        neighborCount++
      }
    }

    if (neighborCount > 0) {
      let averageVelocity = perceivedFlockVelocity.divideBy(neighborCount)
      averageVelocity.iSetMagnitude(MAX_SPEED)

      let steeringVector = averageVelocity.subtract(this.velocity)
      steeringVector.iLimit(MAX_FORCE)

      return steeringVector
    } else {
      return new Vector(0, 0)
    }
  },

  flock: function(boids) {
    let cohesionVector = this.getCohesionVector(boids)
    let separationVector = this.getSeparationVector(boids)
    let alignmentVector = this.getAlignmentVector(boids)

    separationVector.iMultiplyBy(7)

    this.acceleration.iAdd(cohesionVector)
    this.acceleration.iAdd(separationVector)
    this.acceleration.iAdd(alignmentVector)
  },

  getAvoid: function() {
    let mouse = new Vector(window.mouseX, window.mouseY)
    let d = this.position.getDistance(mouse)
    let steer = new Vector(0, 0)

    if (d > 10 && d < MAX_RADIUS) {
      let diff = this.position.subtract(mouse)
      diff.iNormalize()
      mouse.iDivideBy(d)
      mouse.iAdd(diff)

      if (this.opacity === 1.0) {
        this.opacity = Math.random()
      }

      return mouse
    }

    return steer
  },

  getAvoidDir: function(boids) {
    let mouse = new Vector(-window.mouseX, -window.mouseY)
    let steer = new Vector(0, 0)

    for (let i in boids) {
      let boid = boids[i]
      if (boid.position.x === mouse.x && boid.position.y === mouse.y) {
        continue
      }

      let d = mouse.getDistance(boid)

      if (d > 10 && d < MAX_RADIUS) {
        let diff = mouse.subtract(boid)
        diff.iNormalize()
        diff.iDivideBy(d)
        steer.iAdd(diff)
      }
    }

    return steer
  },

  bound: function() {
    if (this.position.x > this.simulation.canvasWidth + BORDER_OFFSET) {
      this.position.x = -BORDER_OFFSET
    }

    if (this.position.x < -BORDER_OFFSET) {
      this.position.x = this.simulation.canvasWidth + BORDER_OFFSET
    }

    if (this.position.y > this.simulation.canvasHeight + BORDER_OFFSET) {
      this.position.y = -BORDER_OFFSET
    }

    if (this.position.y < -BORDER_OFFSET) {
      this.position.y = this.simulation.canvasHeight + BORDER_OFFSET
    }
  },

  update: function() {
    this.velocity.iAdd(this.acceleration)

    // Limit speed
    this.velocity.iLimit(MAX_SPEED)

    this.position.iAdd(this.velocity)
    this.position.iAdd(this.getAvoid())
    //
    this.bound()

    // Reset accelertion to 0 each cycle
    this.acceleration.iMultiplyBy(0)
  },

  run: function(boids) {
    this.flock(boids)
    this.update()
    this.render(boids)
  }
}

export default Boid
