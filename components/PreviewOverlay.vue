<template>
  <div
    ref="video-image"
    :data-id="id"
    :data-background-image="getImage"
    :class="{ 'is-visible': isVisible }"
    class="preview-overlay">
    <video
      v-if="getVideo"
      ref="video"
      :poster="getImage"
      autoplay
      muted
      loop
      width="100%">
      <source
        :data-src="getVideo"
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
      return this.image.URL
    },
    getVideo() {
      if (this.video !== null && this.video.url !== null) {
        let path = this.video.url
        let match = path.match(/(https?:\/\/[^\/]+)(.*)/)

        if (match !== null) {
          return match[2]
        }
      }

      return null
    },
    isVisible() {
      return this.$store.state.workpage.hoveredItem === this.id
    }
  },
  mounted() {
    let self = this
    let observer = lozad(this.$refs['video-image'])
    observer.observe()
    observer.triggerLoad(this.$refs['video-image'])

    if (this.getVideo !== null) {
      observer = lozad(this.$refs['video'])
      observer.observe()
      observer.triggerLoad(this.$refs['video'])
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
    background-size: cover

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
