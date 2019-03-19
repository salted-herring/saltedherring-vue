<template>
  <div
    class="hero-video">
    <div
      v-if="headerVideo.poster !== null"
      ref="heroVideoPoster"
      :data-background-image="headerVideo.poster"
      :style="{ backgroundImage: 'url(' + headerVideo.poster + ')'}"
      :data-toggle-class="'active'"
      class="hero-video__poster video-lazy" />
    <video
      ref="heroVideo"
      :data-src="headerVideo.video"
      :data-poster="headerVideo.poster"
      :data-toggle-class="'active'"
      :class="{ 'no-poster' : headerVideo.poster === null }"
      muted
      autoplay
      loop
      width="100%"
      class="hero-video__video video-lazy" />
  </div>
</template>
<script>
import lozad from 'lozad'
export default {
  props: {
    headerVideo: {
      type: Object,
      default: function() {
        return {
          video: null,
          poster: null
        }
      }
    },
    heroClass: {
      type: String,
      default: ''
    }
  },
  mounted() {
    const observer = lozad('.video-lazy')
    observer.observe()

    if (typeof this.$refs['heroVideoPoster'] !== 'undefined') {
      observer.triggerLoad(this.$refs['heroVideoPoster'])
    }

    if (typeof this.$refs['heroVideo'] !== 'undefined') {
      observer.triggerLoad(this.$refs['heroVideo'])
    }
  }
}
</script>
<style lang="sass">
  .hero-video
    opacity: 1

    &__poster,
    &__video
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      opacity: 0
      transition: opacity 0.5s 0.25s

    &__poster
      z-index: 1
      background-size: cover

      &.active
        opacity: 1

        + .hero-video__video
          &.active
            opacity: 1

    &__video
      z-index: 0
      object-fit: cover

      &.active
        z-index: 2
        transition: opacity 1s 0.5s

      &.no-poster
        &.active
          opacity: 1

</style>
