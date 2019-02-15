<template>
  <div class="content-block video-block has-background-black has-text-white">
    <div class="video-container">
      <video
        v-if="details.VideoSource === 'Internal'"
        :poster="details.OptionalPreview"
        width="100%"
        autoplay
        muted
        loop>
        <source
          :src="internalVideoPath"
          type="video/mp4">
      </video>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VideoBlock',
  props: {
    details: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    internalVideoPath() {
      if (this.details.VideoSource !== 'Internal') {
        return null
      }

      let path = this.details.VideoFile.url

      let match = path.match(/(https?:\/\/[^\/]+)(.*)/)

      if (match === null) {
        return null
      }

      return match[2]
    }
  }
}
</script>
<style lang="sass">
  @import "~assets/sass/config/bulma-variables"
  @import "~assets/sass/config/colours"
  @import "~assets/sass/imports/mixins"

  .video-block
    position: relative

    .video-container
      max-width: rem(1920)
      margin-left: auto
      margin-right: auto
      overflow: hidden

      video
        max-width: 100%
</style>
