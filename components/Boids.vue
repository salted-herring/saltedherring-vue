<template>
  <canvas
    id="boids"
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
    prey: [],
    predators: [],
    mousePosition: new Vector(0, 0),
    limits: {
      weights: {
        separation: { min: 0, max: 10 },
        alignment: { min: 0, max: 10 },
        cohesion: { min: 0, max: 10 },
        flee: { min: 0, max: 10 }
      },
      prey: {
        speed: { min: 0.0, max: 10.0 }
      },
      predator: {
        speed: { min: 0.0, max: 10.0 }
      }
    },
    config: {
      weights: {
        separation: 0.5,
        alignment: 3.0,
        cohesion: 0.5,
        flee: 5.0
      },
      prey: {
        speed: 11.0,
        number: 128,
        maxTurnAngle: 0.1,
        minSeparation: 25.0,
        predatorSightDist: 400,
        minFlockDist: 100
      },
      predator: {
        speed: 2.5,
        number: 1,
        killDist: 30.0,
        maxTurnAngle: 0.02
      },
      env: {
        delay: 50
      }
    }
  }),
  mounted() {
    this.resizeCanvas()
    this.show = true

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
      let canvas = document.getElementById('boids')
      let ctx = canvas.getContext('2d')

      this.config.env.screenWidth = canvas.width
      this.config.env.screenHeight = canvas.height
      this.config.env.ctx = ctx
      this.config.env.screen = new Vector(canvas.width, canvas.height)

      // Initialize the prey and predators.
      let creatures = this.init()
      this.config.preyList = creatures.prey
      this.config.predatorList = creatures.predators

      this.render(ctx, this.config.preyList, creatures.predators)
      this.play()
    },
    play() {
      let self = this
      let count = 0
      let interval = setInterval(function() {
        self.loop(
          self.config.env.ctx,
          self.config.preyList,
          self.config.predatorList
        )
      }, self.config.env.delay)
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
      ctx.clearRect(0, 0, this.config.env.screen.x, this.config.env.screen.y)
      preyList.forEach(function(prey) {
        prey.draw(ctx, '#63EEEA')
      })
      predatorList.forEach(function(predator) {
        predator.draw(ctx, 'red')
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
      let canvas = $('canvas')
      let height = $(window).height()
      let width = $(window).width()

      canvas.attr('height', height)
      canvas.attr('width', width)
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
    transition: opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1)

    &.show
      opacity: 1.0

  .boids-cursor
    width: rem(43)
    height: rem(43)
    z-index: 100
    display: block
    background: rgba($robins-egg, 0.2)
    position: fixed
    border-radius: 50%
    top: rem(-100)
    left: rem(-100)
    cursor: none
</style>
