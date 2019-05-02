<template>
  <div
    ref="preloaders"
    :style="getImageStyle"
    :data-id="id"
    :class="{ 'is-visible': isVisible }"
    class="preview-overlay">
    <video
      v-if="getVideo"
      :poster="getImage"
      autoplay
      muted
      loop
      width="100%">
      <source
        :src="getVideo"
        type="video/mp4">
    </video>
  </div>
</template>
<script>
import lozad from 'lozad'
export default {
  name: 'PreviewOverlay',
  props: {
    id: {
      type: String,
      default: ''
    },
    video: {
      type: Object,
      default: function() {
        return {
          url: ''
        }
      }
    },
    image: {
      type: Object,
      default: function() {
        return {
          URL: ''
        }
      }
    }
  },
  data() {
    return {
      videoURL: false,
      imageURL: false
    }
  },
  computed: {
    getImage() {
      return this.imageURL
    },
    getVideo() {
      return this.videoURL
    },
    getImageStyle() {
      let image = this.imageURL

      if (image) {
        return {
          backgroundImage: 'url(' + image + ')'
        }
      }

      return {}
    },
    isVisible() {
      return this.$store.state.workpage.hoveredItem === this.id
    }
  },
  mounted() {
    let self = this

    if (this.image !== null && this.image.URL !== null) {
      let img = document.createElement('img')
      this.$refs.preloaders.append = img

      img.onload = function() {
        self.imageURL = self.image.URL
      }
      img.src = this.image.URL
    }

    if (this.video !== null && this.video.url !== null) {
      let vid = document.createElement('video')
      let path = this.video.url

      this.$refs.preloaders.append = vid

      let match = path.match(/(https?:\/\/[^\/]+)(.*)/)

      if (match !== null) {
        path = match[2]
        vid.onload = function() {
          self.videoURL = path
        }
        vid.src = path

        this.videoURL = path
      }
    }
  }
}
</script>
<style lang="sass">
  @import "~assets/sass/config/bulma-variables"
  @import "~assets/sass/config/colours"
  @import "~assets/sass/imports/mixins"
  @import "~bulma/sass/utilities/mixins"

  .preview-overlay
    display: block
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    opacity: 0
    // transition: opacity 0.5s cubic-bezier(0.895, 0.03, 0.685, 0.22)
    background-position: center

    &.is-visible
      opacity: 1

    video
      object-fit: cover
      position: relative
      z-index: 0
      height: 100%
      width: 100%

      +touch
        display: none
</style>
