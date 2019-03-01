<template>
  <div
    v-waypoint="{ active: true, callback: onWaypoint }"
    ref="textblockcontainer"
    class="content-block text-block has-background-light">
    <div class="container">
      <div
        :class="{ 'is-centered': isCentered, 'align-left': alignedLeft, 'align-right': alignedRight }"
        class="columns">
        <blockquote
          v-if="details.ShowQuote && details.Quote"
          ref="blockquote"
          :style="{ 'transform': 'translate3d(0,' + quoteBlockMarginTop +',0)' }"
          class="blockquote column has-background-black has-text-light is-4">
          <p
            class="blockquote__quote"
            v-html="details.Quote" />
          <footer
            v-if="details.Source"
            class="blockquote__footer">
            <cite
              v-html="details.Source" />
          </footer>
        </blockquote>
        <div
          ref="textblock"
          :style="{ 'transform': 'translate3d(0,' + marginTop +',0)' }"
          :class="{ 'is-9' : details.ShowQuote && details.Quote }"
          class="text-block__details column cms-content"
          v-html="details.Content" />
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import checkView from 'vue-check-view'

Vue.use(checkView)

export default {
  name: 'TextBlock',
  props: {
    details: {
      type: Object,
      default: function() {
        return {
          showQuote: false,
          Quote: '',
          Alignment: 'left'
        }
      }
    }
  },
  data() {
    return {
      originalTextBlockMarginTop: 100,
      textBlockMarginTop: 100,
      originalQuoteMarginTop: 200,
      quoteMarginTop: 200,
      animateUp: false
    }
  },
  computed: {
    isCentered() {
      return !(this.details.ShowQuote && this.details.Quote !== '')
    },
    alignedLeft() {
      return (
        this.details.Alignment === 'left' &&
        this.details.ShowQuote &&
        this.details.Quote !== ''
      )
    },
    alignedRight() {
      return (
        this.details.Alignment === 'right' &&
        this.details.ShowQuote &&
        this.details.Quote !== ''
      )
    },
    marginTop() {
      if (this.textBlockMarginTop >= 0) {
        return this.textBlockMarginTop + 'px'
      }

      return '0px'
    },
    quoteBlockMarginTop() {
      return this.quoteMarginTop + 'px'
    }
  },
  created() {
    if (process.browser) {
      window.addEventListener('scroll', this.onScroll, { passive: true })
    }
  },
  destroyed() {
    if (process.browser) {
      window.removeEventListener('scroll', this.onScroll)
    }
  },
  methods: {
    onWaypoint({ going, direction }) {
      if (going === 'in' && direction === 'top') {
        this.animateUp = true
      }
    },
    onScroll(e) {
      if (!this.animateUp) {
        return false
      }

      let rect = this.$refs.textblockcontainer.getBoundingClientRect()
      let top = rect.top
      let textBlockMarginTop = top - 200
      let quoteMarginTop = top - 100

      this.textBlockMarginTop = textBlockMarginTop
      this.quoteMarginTop = quoteMarginTop
    }
  }
}
</script>
<style lang="sass">
  @import "~assets/sass/config/bulma-variables"
  @import "~assets/sass/config/colours"
  @import "~assets/sass/imports/mixins"
  @import "~bulma/sass/utilities/mixins"

  .text-block
    &__details
      // max-width: rem(900)
      font-size: rem(20)
      line-height: em(28, 20)
      background: $white
      padding: rem(100) rem(100) rem(70)
      transform: translate3d(0,0,0)

      +widescreen
        font-size: rem(16) !important
        line-height: em(22, 16) !important

      +fullhd
        font-size: rem(20) !important
        line-height: em(28, 20) !important

      +until($desktop)
        margin: rem(0) auto !important
        padding: rem(60) rem(30) rem(30) !important

      p,
      li
        font-weight: $weight-normal
        font-size: rem(20)
        line-height: em(28, 20)

        +widescreen
          font-size: rem(16)
          line-height: em(22, 16)

        +fullhd
          font-size: rem(20)
          line-height: em(28, 20)

      h1,
      h2
        font-weight: $weight-bold
        font-size: rem(60)
        line-height: 1em
        margin-bottom: 1em

        +widescreen
          font-size: rem(48)

        +fullhd
          font-size: rem(60)

    .columns
      margin-top: 0
      margin-bottom: 0

      +until($desktop)
        display: flex
        flex-direction: column
        align-items: center
        margin: 0

      &.is-centered
        justify-content: center

        .text-block__details
          max-width: rem(900)

    .blockquote
      align-self: center
      z-index: 1
      position: absolute
      transform: translate3d(0,0,0)

      +until($desktop)
        position: relative
        order: 1
        width: 75%
        padding: rem(60) rem(100)
        margin: rem(40) 0 !important

      +mobile
        margin-left: auto !important
        margin-right: auto !important
        width: calc(100% - #{rem(60)})
        padding: rem(40)

    .align-left
      .blockquote + .text-block__details
        align-self: flex-end
        margin-left: auto
        padding-left: rem(240)

        +until($widescreen)
          padding-left: rem(120)

        +until($tablet)
          padding-left: rem(100)


    .align-right

      .blockquote
        order: 2
        right: 0

        + .text-block__details
          padding-right: rem(240)

          +until($widescreen)
            padding-right: rem(120)

          +until($tablet)
            padding-right: rem(100)

</style>
