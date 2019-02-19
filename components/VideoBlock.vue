<template>
  <div
    v-if="details.VideoLink"
    :class="sourceCSS"
    class="content-block video-block has-background-light has-text-white">
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
      <div
        v-if="details.VideoSource === 'External'"
        class="video"
        v-html="details.VideoLink"/>
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

      if (path === null) {
        return null
      }

      let match = path.match(/(https?:\/\/[^\/]+)(.*)/)

      if (match === null) {
        return null
      }

      return match[2]
    },
    sourceCSS() {
      return 'video-block--is-' + this.details.VideoSource.toLowerCase()
    }
  }
}
</script>
<style lang="sass">
  @import "~assets/sass/config/bulma-variables"
  @import "~assets/sass/config/colours"
  @import "~assets/sass/imports/mixins"
  @import "~bulma/sass/utilities/mixins"

  .video-block
    position: relative

    &--is-external
      padding: rem(60) 0

    .video-container
      max-width: rem(1920)
      margin-left: auto
      margin-right: auto
      overflow: hidden

      video
        max-width: calc(100% - #{rem(60)})
        height: calc(100vh - #{rem(60)})
        object-fit: cover
        object-position: center top
        margin: 0 auto
        display: block

        +mobile
          max-width: 100%

      .video
        max-width: calc(100% - #{rem(60)})
        margin: 0 auto

        +mobile
          max-width: 100%

      +tablet
        .videoiframe
          > div
            padding-bottom: rem(500) !important

      +until($desktop)
        .videoiframe
          > div
            padding-bottom: rem(300) !important

  .hero-video
    display: block !important

</style>
