<template lang="html">
  <div
    :class="{ isloading: loading }"
    class="loading-page">
    <p>Loading...</p>
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
      let self = this
      setTimeout(function() {
        self.loading = false
      }, 1000)
    }
  }
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: #000;
  text-align: center;
  z-index: 1000;
  transition: all 0.25s ease;
  overflow: hidden;
}
.isloading {
  width: 100%;
}
</style>
