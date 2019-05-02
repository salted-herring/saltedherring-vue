<template>
  <h1
    v-if="tag === 'h1'"
    :style="backgroundTextStyles"
    v-text="title" />
  <div
    v-else
    :style="backgroundTextStyles"
    v-text="title" />
</template>
<script>
export default {
  name: 'BackgroundText',
  props: {
    title: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: 'div'
    },
    colour: {
      type: String,
      default: null
    },
    hoverEnabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      rotation: {
        x: -5,
        y: -5,
        initial: {
          x: -5,
          y: -5
        }
      },
      perspective: 1000,
      maxRotation: 8,
      maxRotationX: 20,
      mounted: false,
      mouseX: 0,
      mouseY: 0,
      maxOffset: 5,
      verticalOffset: 0,
      horizontalOffset: 0
    }
  },
  computed: {
    backgroundTextStyles() {
      let colour = ''
      if (this.colour !== null) {
        colour = '#' + this.colour
      }
      let styles = {
        color: colour
      }
      let maxRotation = this.maxRotation
      let perspective = this.perspective

      if (!this.mounted) {
        maxRotation = 1
        perspective = '100%'
      }

      let rotateX = this.rotation.x
      let rotateY = -5
      //this.rotation.y

      let rotate =
        'perspective(' +
        perspective +
        'px) rotateY(' +
        rotateX +
        'deg) rotateZ(' +
        rotateY +
        'deg)'

      styles.transform = 'translate3d(-50%, -50%, 0) ' + rotate + ' skew(-5deg)'

      return styles
    }
  },
  beforeMount() {
    if (this.hoverEnabled) {
      window.addEventListener('mousemove', this.mouseMove)
    }
  },
  mounted() {
    let self = this
    self.mounted = true
  },
  beforeDestroy() {
    if (this.hoverEnabled) {
      window.removeEventListener('mousemove', this.mouseMove)
    }
  },
  methods: {
    getWindowDim() {
      let w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        width = w.innerWidth || e.clientWidth || g.clientWidth,
        height = w.innerHeight || e.clientHeight || g.clientHeight

      return {
        width: width,
        height: height
      }
    },
    mouseMove(event) {
      if (!this.mounted) {
        return false
      }

      let win = this.getWindowDim()
      let mousePos = {
        x: event.clientX,
        y: event.clientY
      }
      let yPercentage = mousePos.y / (win.height / 2)
      let xPercentage = mousePos.x / (win.width / 2)
      let rotationY = this.rotation.initial.y
      let rotationX = this.rotation.initial.x
      let diff = Math.abs(this.maxRotation) - Math.abs(rotationY)
      let offset = 80
      let halfOffset = offset / 2

      if (mousePos.y > win.height / 2 + halfOffset) {
        rotationY -= (1 - yPercentage) * -diff
      }

      diff = Math.abs(this.maxRotationX) - Math.abs(rotationX)

      if (mousePos.x > win.width / 2 + halfOffset) {
        rotationX -= (1 - xPercentage) * -diff
      } else if (mousePos.x < win.width / 2 - halfOffset) {
        rotationX += (1 - xPercentage) * diff
      }

      this.rotation.y = rotationY
      this.rotation.x = rotationX

      // Calculate x/y offset.
      // this.verticalOffset = ...
      // yPercentage = mousePos.y / win.height
      xPercentage = mousePos.x - win.width / 2
      this.horizontalOffset = xPercentage * 100

      // console.log(
      //   this.horizontalOffset,
      //   100 + this.maxOffset,
      //   this.horizontalOffset > 100.0 + this.maxOffset
      // )

      if (xPercentage > 0) {
        this.horizontalOffset = 50 + this.maxOffset
      } else {
        this.horizontalOffset = 50 - this.maxOffset
      }
    }
  },
  render(createElement) {
    return createElement(this.tag, this.$slots.default)
  }
}
</script>
<style lang="sass">
  /// Config
  @import "~assets/sass/config/colours"
  @import "~assets/sass/config/bulma-variables"
  @import "~assets/sass/imports/mixins"
  @import "~bulma/sass/utilities/mixins"

  ////
  /// Background text element
  ////
  .background-text
      font-size: rem(200)
      font-weight: $weight-extrabold
      line-height: 1.2em
      letter-spacing: normal
      text-align: center
      display: inline
      position: fixed
      width: 100%
      white-space: nowrap
      left: 50%
      top: 50%
      transform: translate(-50%, -50%) rotate(-5deg) skew(-5deg)
      z-index: 0
      pointer-events: none
      transition: opacity 0.25s ease, perspective 0.25s ease, transform 0.2s

      &--is-not-opaque
        opacity: 0

      +fullhd
        font-size: rem(300)

      +until($desktop)
        font-size: rem(180)

      +touch
        font-size: rem(160)

      +mobile
        font-size: rem(120)
        transform: translate(-50%, -50%) rotate(-5deg) skew(-5deg) !important

</style>
