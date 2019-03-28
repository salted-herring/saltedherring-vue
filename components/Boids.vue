<template>
  <canvas
    id="boids"
    ref="canvas"
    :class="{ 'show' : show }"
    class="boids-canvas"
    width="500"
    height="500"/>
</template>
<script>
import Utils from '~/components/boids/js/util'
import Vector from '~/components/boids/js/vector'
import Prey from '~/components/boids/js/prey'
import Predator from '~/components/boids/js/predator'

export default {
  data: () => ({
    show: false,
    creatureColour: '#63EEEA',
    prey: [],
    predators: [],
    mousePosition: new Vector(0, 0),
    limits: {
      weights: {
        separation: { min: 0, max: 10 },
        alignment: { min: 0, max: 10 },
        cohesion: { min: 0, max: 10 },
        flee: { min: 0, max: 500 }
      },
      prey: {
        speed: { min: 0.0, max: 10.0 }
      },
      predator: {
        speed: { min: 0.0, max: 1000.0 }
      }
    },
    config: {
      weights: {
        separation: 1.5,
        alignment: 3.5,
        cohesion: 1.3,
        flee: 37
      },
      prey: {
        speed: 7,
        number: 128,
        maxTurnAngle: 0.02,
        minSeparation: 40.0,
        predatorSightDist: 300,
        minFlockDist: 300
      },
      predator: {
        speed: 75,
        number: 1,
        killDist: 5,
        maxTurnAngle: 0.02
      },
      env: {
        delay: 50
      }
    }
  }),
  mounted() {
    this.resizeCanvas()

    this.run()
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeCanvas)
    window.addEventListener('mousemove', this.mouseMove)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeCanvas)
    window.removeEventListener('mousemove', this.mouseMove)
  },
  methods: {
    init() {
      let prey = []
      let predators = []

      for (let i = 0; i < this.config.prey.number; ++i) {
        prey.push(Prey.create(this.config.prey.speed, this.config.env.screen))
      }
      for (var i = 0; i < this.config.predator.number; ++i) {
        predators.push(
          Predator.create(this.config.predator.speed, this.config.env.screen)
        )
      }

      return {
        prey: prey,
        predators: predators
      }
    },
    run() {
      this.updateCanvas()

      // Initialize the prey and predators.
      let creatures = this.init()
      this.config.preyList = creatures.prey
      this.config.predatorList = creatures.predators

      this.play()
    },
    play() {
      let self = this

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
        self.show = true
        self.loop(
          self.config.env.ctx,
          self.config.preyList,
          self.config.predatorList
        )
        requestAnimationFrame(animate)
      }

      requestAnimationFrame(animate)
    },
    loop(ctx, preyList, predatorList) {
      this.render(ctx, preyList, predatorList)
      this.move(preyList, predatorList)
    },
    move(preyList, predatorList) {
      this.movePredators(predatorList, preyList)
      this.movePrey(preyList, predatorList)
    },
    render(ctx, preyList, predatorList) {
      let self = this
      let predatorColour = Utils.hexToRgbA(this.creatureColour, 0)

      ctx.clearRect(0, 0, this.config.env.screen.x, this.config.env.screen.y)

      preyList.forEach(function(prey) {
        prey.draw(ctx, self.creatureColour)
      })

      predatorList.forEach(function(predator) {
        predator.draw(ctx, predatorColour)
      })
    },
    movePrey(preyList, predatorList) {
      let self = this
      let neighbourDists = Prey.calcNeighbourDists(
        preyList,
        this.config.prey.minSeparation,
        this.config.env.screen
      )
      let meanHeading = Prey.calcMeanHeading(preyList)

      preyList.forEach(function(prey, index) {
        prey.move(
          predatorList,
          self.config.prey.maxTurnAngle,
          self.config.prey.predatorSightDist,
          neighbourDists.tooFar[index],
          meanHeading,
          neighbourDists.tooClose[index],
          neighbourDists.dist[index],
          self.config.prey.minFlockDist,
          self.config.env.screen,
          self.config.weights,
          self.config.prey.speed
        )
      })
    },
    movePredators(predatorList, preyList) {
      let self = this
      predatorList.forEach(function(predator) {
        predator.move(
          preyList,
          self.config.predator.speed,
          self.config.predator.maxTurnAngle,
          self.config.predator.killDist,
          self.config.env.ctx,
          self.config.env.screen,
          self.mousePosition
        )
      })
    },
    resizeCanvas() {
      this.updateCanvas()
    },
    updateCanvas() {
      let canvas = document.getElementById('boids')
      let ctx = canvas.getContext('2d')
      ctx.strokeStyle = 'none'

      let w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        width = w.innerWidth || e.clientWidth || g.clientWidth,
        height = w.innerHeight || e.clientHeight || g.clientHeight

      canvas.height = height
      canvas.width = width

      this.config.env.screenWidth = canvas.width
      this.config.env.screenHeight = canvas.height
      this.config.env.ctx = ctx
      this.config.env.screen = new Vector(canvas.width, canvas.height)
    },
    mouseMove(e) {
      this.mousePosition = new Vector(e.clientX, e.clientY)
    }
  }
}
</script>
<style lang="sass">
  @import "~assets/sass/config/bulma-variables"
  @import "~assets/sass/config/colours"
  @import "~assets/sass/imports/mixins"
  @import "~bulma/sass/utilities/mixins"

  .boids-canvas
    position: fixed
    top: 0
    left: 0
    display: block
    opacity: 0
    z-index: 0
    transition: opacity 3s cubic-bezier(0.23, 1, 0.32, 1)

    &.show
      opacity: 1.0
</style>
