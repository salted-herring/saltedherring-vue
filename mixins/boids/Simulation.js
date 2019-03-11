import $ from 'jquery'
import Boid from './Boid'

const NUM_BOIDS = 256

function Simulation() {
  let canvas = document.getElementById('boids')
  let canvas$ = $(canvas)

  this.ctx = canvas.getContext('2d')
  this.canvasHeight = canvas$.height()
  this.canvasWidth = canvas$.width()
}

Simulation.prototype = {
  initialize: function() {
    this.getCanvasDimensions()
    this.boids = []
    for (let i = 0; i < NUM_BOIDS; i++) {
      let boid = new Boid(this.canvasWidth / 2, this.canvasHeight / 2, this)
      this.addBoid(boid)
    }
  },
  getCanvasDimensions: function() {
    let canvas = document.getElementById('boids')
    let canvas$ = $(canvas)

    this.ctx = canvas.getContext('2d')
    this.canvasHeight = canvas$.height()
    this.canvasWidth = canvas$.width()
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

    $('canvas#boids').click(function(e) {
      // No need to show the notice once the user has already added a boid
      var clickNotice$ = $('div#click_notice')
      clickNotice$.fadeOut('fast')
      var canvasX = e.pageX
      var canvasY = e.pageY - $('div#header_wrapper').height()
      boid = new Boid(canvasX, canvasY, simulation)
      simulation.addBoid(boid)
      return false
    })

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
