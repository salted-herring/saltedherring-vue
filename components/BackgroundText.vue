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
      perspective: 800,
      maxRotation: 16,
      mounted: false,
      mouseX: 0,
      mouseY: 0
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

      let rotateX = this.rotation.initial.x - this.rotation.x * maxRotation
      let rotateY = this.rotation.initial.y - this.rotation.y * maxRotation

      let rotate =
        'perspective(' +
        perspective +
        'px) rotateX(' +
        rotateX +
        'deg) rotateY(' +
        rotateY +
        'deg)'

      styles.transform = 'translate3d(-50%, -50%, 0) ' + rotate + ' skew(-5deg)'

      return styles
    }
  },
  beforeMount() {
    window.addEventListener('mousemove', this.mouseMove)
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.mouseMove)
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
      this.mounted = true

      let win = this.getWindowDim(),
        mousePos = {
          x: event.clientX,
          y: event.clientY
        }

      this.rotation.x = this.calculateRotationPercentage(mousePos.y, win.height)

      this.rotation.y =
        this.calculateRotationPercentage(mousePos.x, win.width) * -1
    },
    calculateRotationPercentage: function(offset, dimension) {
      return (-2 / dimension) * offset + 1
    },
    calculateTranslationPercentage: function(offset, dimension) {
      return (-2 / dimension) * offset + 1
    }
  },
  render(createElement) {
    return createElement(this.tag, this.$slots.default)
  }
}
</script>
