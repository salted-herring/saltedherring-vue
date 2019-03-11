import $ from 'jquery'

export default {
  methods: {
    isCanvasSupported() {
      let elem = document.createElement('canvas')
      return !!(elem.getContext && elem.getContext('2d'))
    },
    checkForCanvasSupport() {
      if (!this.isCanvasSupported()) {
        $('div#container').hide()
        //
        // let canvasNotice$ = jQuery('<div id="canvas_notice">Please update your browser to view this experiment.</div>')
        // canvasNotice$.insertAfter($('div#header_wrapper'))
        return false
      } else {
        return true
      }
    },
    resizeCanvas() {
      let canvas$ = $('canvas'),
        height = $(window).height(),
        width = $(window).width()

      canvas$.attr('height', height)
      canvas$.attr('width', width)
    }
  }
}
