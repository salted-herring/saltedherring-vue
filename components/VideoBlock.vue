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
        class="video external">
        <iframe
          :src="externalVideoURL"
          width="100%"
          height="100%"
          frameborder="0"
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen />
      </div>
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
    externalVideoURL() {
      if (this.details.VideoSource !== 'External') {
        return null
      }

      let path = this.details.VideoLink

      if (path === null) {
        return null
      }

      let match = path.match(/(https?:\/\/[^\/]+)(.*)/)

      if (match === null) {
        return null
      }

      return (
        'https://player.vimeo.com/video' +
        match[2] +
        '?muted=1&autoplay=0&loop=1&byline=0&title=0&portrait=0'
      )
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
  @import "~assets/sass/mixins/bulma-mixins"

  .video-block
    position: relative

    .video-container
      // max-width: rem(1920)
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

        &.external
          height: 100vh
          position: relative
          max-width: rem(960)
          width: 100%
          margin-left: auto
          margin-right: auto

          iframe
            width: 100%
            height: 100%
            position: absolute

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
