import Vue from 'vue'

if (process.browser) {
  window.onNuxtReady(() => {
    const VuePreload = require('vue-preload')
    Vue.use(VuePreload)
  })
}
