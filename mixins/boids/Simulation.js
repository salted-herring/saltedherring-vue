import $ from 'jquery'
import Boid from './Boid'

const NUM_BOIDS = 128
const CURSOR_SIZE = 43

function Simulation() {
  let canvas = document.getElementById('boids')
  let canvas$ = $(canvas)

  this.ctx = canvas.getContext('2d')
  this.canvasHeight = canvas$.height()
  this.canvasWidth = canvas$.width()
}

Simulation.prototype = {
  initialize: function() {
    let dim = this.getCanvasDimensions()
    if (!dim) {
      return false
    }

    window.mouseX = 0
    window.mouseY = 0
    window.addEventListener('mousemove', function(e) {
      window.mouseX = e.clientX
      window.mouseY = e.clientY

      let c = CURSOR_SIZE / 2

      let el = document.getElementById('boidscursor')
      el.style.left = window.mouseX - c + 'px'
      el.style.top = window.mouseY - c + 'px'
    })

    this.boids = []
    for (let i = 0; i < NUM_BOIDS; i++) {
      let boid = new Boid(this.canvasWidth / 2, this.canvasHeight / 2, this)
      this.addBoid(boid)
    }
  },
  getCanvasDimensions: function() {
    let canvas = document.getElementById('boids')
    let canvas$ = $(canvas)

    if (canvas === null) {
      return false
    }

    this.ctx = canvas.getContext('2d')
    this.canvasHeight = canvas$.height()
    this.canvasWidth = canvas$.width()

    return true
  },
  addBoid: function(boid) {
    this.boids.push(boid)
  },
  render: function() {
    this.getCanvasDimensions()
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)

    for (let bi in this.boids) {
      this.boids[bi].run(this.boids)
    }
  },
  tick: function() {
    for (let bi in this.boids) {
      this.boids[bi].flock(this.boids)
    }
  },
  run: function() {
    let self = this
    self.tick()

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = (function() {
        return (
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(callback, element) {
            window.setTimeout(callback, 1000 / 60)
          }
        )
      })()
    }

    function animate() {
      self.tick()
      self.render()
      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }
}

export default Simulation
