<template>
  <header
    :style="{ 'background-color': '#' + headerBg }"
    :class="cssClasses"
    class="page-header section">
    <div
      class="container page-header__main-container">
      <div
        :class="{ 'is-centered': isCentered }"
        class="columns">
        <div
          :class="introductionClass"
          class="column introduction cms-content">
          <div
            v-if="introduction"
            :class="cssVariants"
            :style="{ color: '#' + introductionBg }"
            class="page-introduction"
            v-html="introduction" />
          <slot name="introductionContent"/>
        </div>
      </div>
    </div>
    <slot name="outsideContainer"/>
    <BackgroundText
      v-if="title"
      :class="{ 'background-text--is-not-opaque': isNotOpaque }"
      :tag="'h1'"
      :title="title"
      :colour="titleBg"
      :hover-enabled="backgroundTextHover"
      class="background-text" />
    <slot name="background"/>
  </header>
</template>
<script>
import BackgroundText from '~/components/BackgroundText'

export default {
  name: 'Header',
  components: { BackgroundText },
  props: {
    isCentered: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    titleBg: {
      type: String,
      default: ''
    },
    pageClass: {
      type: String,
      default: ''
    },
    headerBg: {
      type: String,
      default: ''
    },
    introduction: {
      type: String,
      default: ''
    },
    introductionBg: {
      type: String,
      default: ''
    },
    introductionClass: {
      type: String,
      default: ''
    },
    introductionVariation: {
      type: String,
      default: ''
    },
    backgroundTextHover: {
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
      perspective: 800,
      maxRotation: 8,
      mounted: false,
      mouseX: 0,
      mouseY: 0
    }
  },
  computed: {
    isNotOpaque() {
      return !this.$store.state.pagestate.backgroundTextOpaque
    },
    cssVariants() {
      let css = [this.introductionVariation]

      if (!this.$store.state.pagestate.backgroundTextOpaque) {
        css.push('page-introduction--is-not-opaque')
      }

      return css.join(' ')
    },
    cssClasses() {
      let classes = [this.pageClass]

      if (this.isHovered) {
        classes.push('is-hovered')
      }

      return classes.join(' ')
    },
    backgroundTextStyles() {
      let styles = {
        color: '#' + this.titleBg
      }
      let maxRotation = this.maxRotation
      let perspective = this.perspective

      if (!this.mounted) {
        maxRotation = 1
        perspective = '100%'
      }

      let rotateX = this.rotation.initial.x - this.rotation.x * maxRotation
      let rotateY = this.rotation.initial.y - this.rotation.y * maxRotation
      let absX = Math.abs(rotateX.toFixed(2))
      let absY = Math.abs(rotateY.toFixed(2))

      if (absX < 2.0 || absY < 2.0) {
        perspective = '100%'
        rotateX = this.rotation.initial.x
        rotateY = this.rotation.initial.y
      }

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
          x: event.pageX,
          y: event.pageY
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
  }
}
</script>
<style lang="sass">
  @import "~assets/sass/config/bulma-variables"
  @import "~assets/sass/config/colours"
  @import "~assets/sass/imports/mixins"

  .page-header
    &.is-hovered
      .background-text
        opacity: 0.1

    &__main-container
      min-height: 100vh
      height: 100%

      .columns
        min-height: 100vh
        display: block
        position: relative
        margin-left: 0
        margin-right: 0

        .column
          min-height: 100vh

      .page-introduction
        position: absolute
        top: rem(300)
        left: 50%
        transform: translateX(-50%)

        &--is-not-opaque
          color: $white !important

</style>
