<template lang="html">
  <div
    :class="{ isloading: loading }"
    class="loading-page">
    <img
      src="~assets/img/loader.gif"
      alt="loading..."
      class="image-loader">
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      // let self = this
      // setTimeout(function() {
      this.loading = false
      // }, 1000)
    }
  }
}
</script>

<style lang="sass" scoped>
.loading-page
  position: fixed
  top: 0
  left: 0
  width: 0
  height: 100%
  background: #fff
  text-align: center
  z-index: 1000
  transition: all 0.25s ease
  overflow: hidden

.isloading
  width: 100%

.image-loader
  display: block
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%) scale(0.75)
</style>
