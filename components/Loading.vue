<template lang="html">
  <div
    :class="{ isloading: getLoading }"
    class="loading-page">
    <img
      src="~static/img/loader.gif"
      alt="loading..."
      class="image-loader">
  </div>
</template>

<script>
export default {
  computed: {
    getLoading() {
      return this.$store.state.loading.loading
    }
  },
  methods: {
    start() {
      this.$store.commit('loading/updateLoading', true)
    },
    finish() {
      let self = this
      setTimeout(function() {
        self.$store.commit('loading/updateLoading', false)
      }, 2000)
    }
  }
}
</script>

<style lang="sass" scoped>
  /// Config
  @import "~assets/sass/config/colours"
  @import "~assets/sass/config/bulma-variables"
  @import "~assets/sass/config/variables"
  @import "~assets/sass/imports/mixins"
  @import "~assets/sass/mixins/bulma-mixins"

  .loading-page
    position: fixed
    top: rem($body-border)
    left: rem($body-border)
    width: 0
    height: calc(100% - #{2*$body-border}px)
    background: $white
    text-align: center
    z-index: 1000
    transition: all 0.25s ease
    transform: translate3d(0, 0, 0)
    overflow: hidden

    +mobile
      top: 0
      left: 0
      height: 100%



  .isloading
    width: calc(100% - #{2*$body-border}px)

    +mobile
      width: 100%

  .image-loader
    display: block
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%) scale(0.75)
</style>
