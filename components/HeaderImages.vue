<template>
  <div
    :class="{ 'is-loaded' : isLoaded }"
    class="hero-images">
    <div
      v-for="(image, index) in headerImages"
      :ref="'image_' + index"
      :key="index"
      :data-background-image="image.FitFullScreen"
      :style="{ 'background-color': '#' + headerBg, 'background-image': 'url(' + image.FitFullScreen + ')' }"
      :class="{ 'is-active' : activeImageIndex === index }"
      class="hero-images__image" />
  </div>
</template>
<script>
import lozad from 'lozad'

export default {
  props: {
    headerImages: {
      type: Array,
      default: function() {
        return []
      }
    },
    headerBg: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      totalLoaded: 0,
      activeImageIndex: 0
    }
  },
  computed: {
    isLoaded() {
      return (
        this.totalLoaded >= this.headerImages.length &&
        this.headerImages.length != 0
      )
    }
  },
  mounted() {
    let self = this

    if (this.headerImages.length === 0) {
      return
    }

    const observer = lozad('.hero-images__image', {
      load: function(el) {
        self.totalLoaded++
      }
    })

    observer.observe()

    for (let i in this.headerImages) {
      let im = this.$refs['image_' + i][0]
      observer.triggerLoad(im)
    }

    /// Set up animation of images.
    if (this.headerImages.length > 1) {
      const timeout = 60
      let currentTimeout = 1
      let animation = function() {
        if (!self.isLoaded) {
          requestAnimationFrame(animation)
        }

        if (++currentTimeout >= timeout) {
          if (self.activeImageIndex === self.headerImages.length - 1) {
            self.activeImageIndex = 0
          } else {
            self.activeImageIndex++
          }

          currentTimeout = 1
        }

        requestAnimationFrame(animation)
      }
      requestAnimationFrame(animation)
    }
  }
}
</script>
