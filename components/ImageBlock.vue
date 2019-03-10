<template>
  <div
    class="image-block has-background-light">
    <Carousel
      v-if="getImages.length > 1"
      ref="carousel"
      :nav="false"
      :autoplay="true"
      :items="1"
      :loop="true"
      :autoplay-timeout="5000"
      :dots="true"
      class="content-block image-block has-background-light">
      <LazyImage
        v-for="(image, index) in getImages"
        :key="index"
        :background-color="'#e4ece4'"
        :lazy-src="image.FitFullScreen"
        :width="image.FitFullScreenWidth"
        :height="image.FitFullScreenHeight"
        :trigger="true"
        :additional-css="'image-block__image has-background-black'"
      />
    </Carousel>
    <LazyImage
      v-for="(image, index) in getImages"
      v-else
      :key="index"
      :background-color="'#e4ece4'"
      :lazy-src="image.FitFullScreen"
      :width="image.FitFullScreenWidth"
      :height="image.FitFullScreenHeight"
    />
  </div>
</template>
<script>
import LazyImage from '~/components/LazyLoadImage'

let components = {
  LazyImage
}

if (process.client) {
  let Carousel = require('vue-owl-carousel')
  components = {
    LazyImage,
    Carousel
  }
}

export default {
  name: 'ImageBlock',
  components: components,
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
  },
  created() {
    // console.log(this.$refs.carousel.elementHandle)
  }
}
</script>
<style lang="sass">
  @import "~assets/sass/config/bulma-variables"
  @import "~assets/sass/config/colours"
  @import "~assets/sass/imports/mixins"
  @import "~bulma/sass/utilities/mixins"

  .image-block
    position: relative

    // padding-bottom: rem(20)

    img
      margin-bottom: 0

    &__image
      display: none
      // max-width: rem(1920)
      margin-left: auto
      margin-right: auto
      width: auto !important
      max-width: 100% !important

      &--single
        display: block
        // height: 100vh

        +until($desktop)
          height: 100%

      &:first-child
        display: block

    @import '~assets/sass/plugins/owl-carousel'

    .owl-carousel
      max-width: rem(1920)
      margin-left: auto
      margin-right: auto
      overflow: hidden
      position: relative
      height: auto

    .owl-stage
      transition-timing-function: cubic-bezier(0.86, 0, 0.07, 1)
</style>
