<template lang="html">
  <div
    :class="{ isloading: loading }"
    class="loading-page">
    <img
      src="~static/img/loader.gif"
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
      this.loading = false
    },
    finish() {
      let self = this
      setTimeout(function() {
        self.loading = false
      }, 300)
    }
  }
}
</script>

<style lang="sass" scoped>
.loading-page
  position: fixed
  top: 30px
  left: 30px
  width: 0
  height: calc(100% - 60px)
  background: #fff
  text-align: center
  z-index: 1000
  transition: all 0.25s ease
  transform: translate3d(0, 0, 0)
  overflow: hidden

.isloading
  width: calc(100% - 60px)

.image-loader
  display: block
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%) scale(0.75)
</style>
