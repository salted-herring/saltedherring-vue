<template>
  <div
    :style="style"
    :class="{ 'is-loaded': isLoaded, additionalCss }"
    class="lazyLoad-image">
    <img
      ref="lazy-img"
      :data-src="lazySrc"
      :data-srcset="lazySrcset"
      :width="width"
      :height="height"
      :style="imgStyle"
      data-toggle-class="active"
      class="lozad">
  </div>
</template>
<script>
import lozad from 'lozad'
export default {
  name: 'LazyImage',
  props: {
    backgroundColor: {
      type: String,
      default: '#f5f5f5'
    },
    additionalCss: {
      type: String,
      default: null
    },
    height: {
      type: Number,
      default: 0
    },
    lazySrc: {
      type: String,
      default: null
    },
    lazySrcset: {
      type: String,
      default: null
    },
    width: {
      type: Number,
      default: 0
    },
    trigger: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLoaded: false
    }
  },
  computed: {
    aspectRatio() {
      // Calculate the aspect ratio of the image
      // if the width and the height are given.
      if (!this.width || !this.height) {
        return 1.0
      }

      return (this.height / this.width) * 100
    },
    style() {
      const style = {
        backgroundColor: this.backgroundColor
      }

      if (this.width) {
        style.width = `${this.width}px`
      }

      return style
    },
    imgStyle() {
      const style = {}
      // If the image is still loading and an
      // aspect ratio could be calculated, we
      // apply the calculated aspect ratio by
      // using padding top.
      const applyAspectRatio = !this.isLoaded && this.aspectRatio

      if (applyAspectRatio) {
        // Prevent flash of unstyled image
        // after the image is loaded.
        style.height = 0
        // Scale the image container according
        // to the aspect ratio.
        style.paddingTop = `${this.aspectRatio}%`
      }

      return style
    }
  },
  mounted() {
    const setLoadingState = () => {
      this.isLoaded = true
    }

    this.$refs['lazy-img'].addEventListener('load', setLoadingState)

    this.$once('hook:destroyed', () => {
      if (typeof this.$refs['lazy-img'] === 'undefined') {
        return
      }

      this.$refs['lazy-img'].removeEventListener('load', setLoadingState)
    })

    const observer = lozad(this.$refs['lazy-img'])

    observer.observe()

    // Trigger the observer - useful on carousels.
    if (this.trigger) {
      observer.triggerLoad(this.$refs['lazy-img'])
    }
  }
}
</script>
<style lang="sass" scoped>
  .lazyLoad-image
    transition: height 0.25s, width 0.25s
    display: block
    margin: 0 auto
    max-width: 100%

    &.is-loaded
      img
        opacity: 1

    img
      opacity: 0
      transition: opacity 0.5s 0.5s ease
      max-width: 100%
      height: auto
      display: block
      font-size: 0
      line-height: 0
      margin-left: auto
      margin-right: auto

</style>
