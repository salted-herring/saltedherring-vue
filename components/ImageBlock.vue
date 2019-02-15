<template>
  <Carousel
    v-if="getImages.length > 1"
    :nav="false"
    :autoplay="true"
    :items="1"
    :loop="true"
    :autoplay-timeout="5000"
    :dots="false"
    class="content-block image-block has-background-black">
    <div
      v-for="(image, index) in getImages"
      :key="index"
      :style="{ 'background-image': 'url(' + image.FitFullScreen + ')' }"
      class="image-block__image" />
  </Carousel>
</template>
<script>
let Carousel = null

if (process.client) {
  Carousel = require('vue-owl-carousel')
}
export default {
  name: 'ImageBlock',
  components: {
    Carousel
  },
  props: {
    details: {
      type: Object,
      default: function() {
        return {
          Images: []
        }
      }
    }
  },
  computed: {
    getImages() {
      return this.details.Images
    }
  }
}
</script>
<style lang="sass">
  @import "~assets/sass/config/bulma-variables"
  @import "~assets/sass/config/colours"
  @import "~assets/sass/imports/mixins"

  .image-block
    height: 100vh
    min-height: rem(320)
    position: relative

    &__image
      display: none
      width: 100%
      height: 100%
      background-size: cover
      background-position: left top

      &:first-child
        display: block

    @import '~assets/sass/plugins/owl-carousel'

    .owl-carousel
      max-width: rem(1920)
      margin-left: auto
      margin-right: auto
      overflow: hidden
      left: 50%
      transform: translateX(-50%)

    .owl-stage
      transition-timing-function: cubic-bezier(0.86, 0, 0.07, 1)
</style>
