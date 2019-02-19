<template>
  <div class="image-block has-background-light">
    <Carousel
      v-if="getImages.length > 1"
      :nav="false"
      :autoplay="true"
      :items="1"
      :loop="true"
      :autoplay-timeout="5000"
      :dots="false"
      class="content-block image-block has-background-light">
      <img
        v-for="(image, index) in getImages"
        :key="index"
        :src="image.FitFullScreen"
        class="image-block__image has-background-black">
    </Carousel>
    <img
      v-for="(image, index) in getImages"
      v-else
      :key="index"
      :src="image.FitFullScreen"
      class="image-block__image image-block__image--single has-background-light">
  </div>
</template>
<script>
let components = {}

if (process.client) {
  let Carousel = require('vue-owl-carousel')
  components = {
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
  }
}
</script>
<style lang="sass">
  @import "~assets/sass/config/bulma-variables"
  @import "~assets/sass/config/colours"
  @import "~assets/sass/imports/mixins"
  @import "~bulma/sass/utilities/mixins"

  .image-block
    // height: 100vh
    // min-height: rem(320)
    position: relative

    // +until($desktop)
    //   height: rem(400)
    //   min-height: rem(400)

    &__image
      display: none
      // width: 100%
      // height: 100%
      max-width: rem(1920)
      // background-size: cover
      // background-position: left top
      margin-left: auto
      margin-right: auto

      &--single
        display: block
        height: 100vh

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
      // left: 50%
      // transform: translateX(-50%)

      // +until($desktop)
      //   max-height: rem(400)

    .owl-stage
      transition-timing-function: cubic-bezier(0.86, 0, 0.07, 1)
</style>
