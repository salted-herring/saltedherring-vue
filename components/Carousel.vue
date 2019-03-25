<template>
  <div>
    <span
      v-show="showPrev"
      ref="prev">
      <slot name="prev" />
    </span>
    <div
      ref="owlCarousel"
      :class="['owl-carousel', 'owl-theme']">
      <slot />
    </div>
    <span
      v-show="showNext"
      ref="next">
      <slot name="next" />
    </span>
  </div>
</template>
<script>
import $ from 'jquery'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'

import events from './utils/events'
import autoplayEvents from './utils/autoplay-events'

export default {
  name: 'VOwlCarousel',
  props: {
    items: {
      type: Number,
      default: 3
    },
    margin: {
      type: Number,
      default: 0
    },
    loop: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    mouseDrag: {
      type: Boolean,
      default: true
    },
    touchDrag: {
      type: Boolean,
      default: true
    },
    pullDrag: {
      type: Boolean,
      default: true
    },
    freeDrag: {
      type: Boolean,
      default: false
    },
    stagePadding: {
      type: Number,
      default: 0
    },
    merge: {
      type: Boolean,
      default: false
    },
    mergeFit: {
      type: Boolean,
      default: false
    },
    autoWidth: {
      type: Boolean,
      default: false
    },
    autoHeight: {
      type: Boolean,
      default: false
    },
    startPosition: {
      type: Number,
      default: 0
    },
    uRLhashListener: {
      type: Boolean,
      default: false
    },
    nav: {
      type: Boolean,
      default: true
    },
    rewind: {
      type: Boolean,
      default: true
    },
    navText: {
      type: Array,
      default: () => ['next', 'prev']
    },
    navElement: {
      type: String,
      default: 'div'
    },
    slideBy: {
      type: [Number, String],
      default: 1
    },
    slideTransition: {
      type: String,
      default: ''
    },
    dots: {
      type: Boolean,
      default: true
    },
    dotsEach: {
      type: [Number, Boolean],
      default: false
    },
    dotsData: {
      type: Boolean,
      default: false
    },
    lazyLoad: {
      type: Boolean,
      default: false
    },
    lazyLoadEager: {
      type: Number,
      default: 0
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    autoplaySpeed: {
      type: Boolean,
      default: false
    },
    autoplayTimeout: {
      type: Number,
      default: 5000
    },
    autoplayHoverPause: {
      type: Boolean,
      default: false
    },
    smartSpeed: {
      type: Number,
      default: 250
    },
    fluidSpeed: {
      type: [Number, Boolean],
      default: false
    },
    navSpeed: {
      type: [Number, Boolean],
      default: false
    },
    dragEndSpeed: {
      type: [Number, Boolean],
      default: false
    },
    callbacks: {
      type: Boolean,
      default: true
    },
    responsive: {
      type: [Object, Boolean],
      default: () => {}
    },
    responsiveRefreshRate: {
      type: Number,
      default: 200
    },
    responsiveBaseElement: {
      type: String,
      default: 'window'
    },
    video: {
      type: Boolean,
      default: false
    },
    videoHeight: {
      type: [Number, Boolean],
      default: false
    },
    videoWidth: {
      type: [Number, Boolean],
      default: false
    },
    animateOut: {
      type: [String, Boolean],
      default: false
    },
    animateIn: {
      type: [String, Boolean],
      default: false
    },
    fallbackEasing: {
      type: String,
      default: 'swing'
    },
    info: {
      type: Function,
      default: () => {}
    },
    itemElement: {
      type: String,
      default: 'div'
    },
    stageElement: {
      type: String,
      default: 'div'
    },
    navContainer: {
      type: [String, Boolean],
      default: false
    },
    dotsContainer: {
      type: [String, Boolean],
      default: false
    },
    checkVisible: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {
      showPrev: false,
      showNext: true
    }
  },
  mounted: function() {
    if (process.browser) {
      let self = this
      setTimeout(function() {
        if (typeof $(self.$refs.owlCarousel).owlCarousel === 'undefined') {
          require('owl.carousel')
        }

        let options = {
          items: self.items,
          margin: self.margin,
          loop: self.loop,
          center: self.center,
          mouseDrag: self.mouseDrag,
          touchDrag: self.touchDrag,
          pullDrag: self.pullDrag,
          freeDrag: self.freeDrag,
          stagePadding: self.stagePadding,
          merge: self.merge,
          mergeFit: self.mergeFit,
          autoWidth: self.autoWidth,
          autoHeight: self.autoHeight,
          startPosition: self.startPosition,
          uRLhashListener: self.uRLhashListener,
          nav: self.nav,
          rewind: self.rewind,
          navText: self.navText,
          navElement: self.navElement,
          slideBy: self.slideBy,
          slideTransition: self.slideTransition,
          dots: self.dots,
          dotsEach: self.dotsEach,
          dotsData: self.dotsData,
          lazyLoad: self.lazyLoad,
          lazyLoadEager: self.lazyLoadEager,
          autoplay: self.autoplay,
          autoplaySpeed: self.autoplaySpeed,
          autoplayTimeout: self.autoplayTimeout,
          autoplayHoverPause: self.autoplayHoverPause,
          smartSpeed: self.smartSpeed,
          fluidSpeed: self.fluidSpeed,
          navSpeed: self.navSpeed,
          dragEndSpeed: self.dragEndSpeed,
          callbacks: self.callbacks,
          responsive: self.responsive,
          responsiveRefreshRate: self.responsiveRefreshRate,
          responsiveBaseElement: self.responsiveBaseElement,
          video: self.video,
          videoHeight: self.videoHeight,
          videoWidth: self.videoWidth,
          animateOut: self.animateOut,
          animateIn: self.animateIn,
          fallbackEasing: self.fallbackEasing,
          info: self.info,
          itemElement: self.itemElement,
          stageElement: self.stageElement,
          navContainer: self.navContainer,
          dotsContainer: self.dotsContainer,
          checkVisible: self.checkVisible
        }

        const owl = $(self.$refs.owlCarousel).owlCarousel(options)

        $(self.$refs.prev).click(function() {
          owl.trigger('prev.owl.carousel')
        })

        $(self.$refs.next).click(function() {
          owl.trigger('next.owl.carousel')
        })

        events.forEach(eventName => {
          owl.on(`${eventName}.owl.carousel`, event => {
            self.$emit(eventName, event)
          })
        })

        autoplayEvents.forEach(eventName => {
          owl.on(`${eventName}`, event => {
            self.$emit(eventName, event)
          })
        })

        setTimeout(function() {
          owl.trigger('refresh.owl.carousel')
        }, 5000)
      }, 100)
    }
  }
}
</script>
