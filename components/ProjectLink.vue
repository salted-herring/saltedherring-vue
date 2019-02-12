<template>
  <nuxt-link
    :to="link"
    class="project-link"
    v-html="label" />
</template>
<script>
export default {
  name: 'ProjectLink',
  props: {
    link: {
      type: String,
      default: '/'
    },
    label: {
      type: String,
      default: ''
    },
    images: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  created() {
    // console.log(this.$axios)
    // console.log(this.createElement)

    // Preload images
    for (let i in this.images) {
      let image = this.images[i]

      // this.$axios({
      //   url: image.FitFullScreen,
      //   method: 'get',
      //   responseType: 'stream'
      // }).then(result => {
      //   // console.log(result.data)
      // })

      // let img = new Image()
      // img.src = image.FitFullScreen
      // console.log(image, img)
    }
    // console.log(this.images)
    // details() {
    //   return this.$store.state.footer.footerList
    // }
  }
}
</script>
<style lang="sass">
  @import '~assets/sass/config/bulma-variables'
  @import '~assets/sass/config/colours'
  @import '~assets/sass/config/fonts'
  @import '~assets/sass/config/typography'
  @import '~assets/sass/imports/mixins'
  @import '~assets/sass/imports/bulma-overrides'

  @import '~bulma/sass/utilities/initial-variables'
  @import '~bulma/sass/utilities/derived-variables'
  @import '~bulma/sass/utilities/mixins'

  a.project-link
    font-weight: $weight-black
    color: $black
    display: table
    font-size: rem(72)
    line-height: em(90, 72)
    text-decoration: none
    position: relative
    left: 50%
    transform: translateX(-50%) rotate(-5deg) skew(-5deg)

    &:after
        position: absolute
        left: 0
        bottom: 1px
        width: 100%
        height: rem(5)
        background: $black
        content: ''
        display: block
        transition: width 0.25s ease

    &:hover
        &:after
            width: 0
</style>
