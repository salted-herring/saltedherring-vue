<template>
  <div
    ref="textblockcontainer"
    :class="backgroundVariation"
    class="content-block text-block">
    <div class="container">
      <div
        :class="{ 'is-centered': isCentered, 'align-left': alignedLeft, 'align-right': alignedRight }"
        class="columns">
        <Quote
          ref="blockquote"
          :show-quote="details.ShowQuote"
          :quote="details.Quote"
          :quote-source="details.Source"
          :text-colour="quoteTextColour"
          :style="{ 'transform': 'translate3d(0,' + quoteBlockMarginTop +',0)' }"/>
        <div
          ref="textblock"
          :style="{ 'transform': 'translate3d(0,' + marginTop +',0)' }"
          :class="textblockClasses"
          class="text-block__details column cms-content"
          v-html="details.Content" />
      </div>
    </div>
  </div>
</template>
<script>
import Quote from '~/components/Quote'

export default {
  name: 'TextBlock',
  components: {
    Quote
  },
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
    },
    backgroundVariation: {
      type: String,
      default: 'has-background-light'
    },
    quoteTextColour: {
      type: String,
      default: null
    },
    detailsBackground: {
      type: String,
      default: 'has-background-white'
    },
    last: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      textBlockMarginTop: 0,
      quoteMarginTop: 0,
      originalTextBlockMarginTop: 400,
      originalQuoteMarginTop: 400,
      animateIn: false,
      direction: 'top'
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
      if (this.textBlockMarginTop > 0) {
        return this.textBlockMarginTop + 'px'
      }

      return '0px'
    },
    quoteBlockMarginTop() {
      return this.quoteMarginTop + 'px'
    },
    textblockClasses() {
      let classes = []

      if (this.details.ShowQuote && this.details.Quote) {
        classes.push('is-9')
      }

      if (this.detailsBackground !== null) {
        classes.push(this.detailsBackground)
      }

      return classes
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
    onScroll(e) {
      this.textBlockMarginTop =
        this.originalTextBlockMarginTop + this.calcParallax(1.24)
      this.quoteMarginTop =
        this.originalQuoteMarginTop + this.calcParallax(0.75)
    },
    calcParallax(factor) {
      let containerRect = this.$el.getBoundingClientRect()
      let height = containerRect.height
      let winHeight = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      )
      let viewportOffsetTop = containerRect.top
      let viewportOffsetBottom = viewportOffsetTop - winHeight

      let scrollFactor = viewportOffsetBottom / (winHeight + height)
      return height * scrollFactor * factor
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
        font-size: rem(20)
        line-height: em(28, 20)
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
          font-size: rem(14)
          line-height: em(18, 14)
          width: 100%
          max-width: rem(800)

        +until($tablet)
          max-width: rem(568)

        +mobile
          transform: translate3d(0,0,0) !important

        a
          color: $black
          text-decoration: underline

          &:hover
            text-decoration: none

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

          +mobile
            font-size: rem(16)
            line-height: em(20, 16)

        h1,
        h2
          font-weight: $weight-bold
          font-size: rem(60)
          line-height: 1em
          margin-bottom: 1em

        h3
          font-weight: $weight-normal
          font-size: rem(36)
          line-height: em(46, 36)
          margin-bottom: 1em

          +widescreen
            font-size: rem(48)

          +fullhd
            font-size: rem(60)

          +mobile
            font-size: rem(24)

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
          transform: translate3d(0,0,0) !important

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
