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
          :source-link="details.SourceLink"
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
  mounted() {
    this.onScroll()
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
  .text-block

    +mobile
      .cms-content
        padding: rem(60) rem(30) !important

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
        max-width: rem(480)
        padding: rem(40)
        margin: rem(40) 0 !important
        transform: translate3d(0,0,0) !important

      +mobile
        margin-left: auto !important
        margin-right: auto !important
        max-width: rem(300)
        width: 100%
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
