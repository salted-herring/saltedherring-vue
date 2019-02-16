<template>
  <div
    v-view="viewHandler"
    class="content-block text-block has-background-light">
    <div class="container">
      <div
        :class="{ 'is-centered': isCentered, 'align-left': alignedLeft, 'align-right': alignedRight }"
        class="columns">
        <blockquote
          v-if="details.ShowQuote && details.Quote"
          ref="blockquote"
          :style="{ 'margin-top': quoteBlockMarginTop }"
          class="blockquote column has-background-black has-text-light">
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
          :style="{ 'margin-top': marginTop }"
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
      quoteMarginTop: 200
    }
  },
  computed: {
    isCentered() {
      return !this.details.showQuote
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
      if (this.quoteMarginTop >= 0) {
        return this.quoteMarginTop + 'px'
      }

      return '0px'
    }
  },
  methods: {
    viewHandler(e) {
      let rect = e.target.element.getBoundingClientRect()
      let textBlockMarginTop = rect.top - 200
      let quoteMarginTop = rect.top - 100
      if (textBlockMarginTop < 0) textBlockMarginTop = 0
      if (quoteMarginTop < 0) quoteMarginTop = 0

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
      max-width: rem(900)
      font-size: rem(24)
      line-height: em(30, 24)
      background: $white
      padding: rem(100) rem(100) rem(70)

      +until($desktop)
        margin: rem(0) auto !important

      p,
      li
        font-weight: $weight-normal
        font-size: rem(24)
        line-height: em(30, 24)

      h1,
      h2
        font-weight: $weight-extrabold
        font-size: rem(60)
        line-height: 1em
        margin-bottom: em(24, 60)

    .columns
      margin-top: 0
      margin-bottom: 0
      justify-content: space-between

      +until($desktop)
        display: flex
        flex-direction: column
        align-items: center

      &.is-centered
        justify-content: center

    .blockquote
      align-self: center

      +until($desktop)
        order: 1
        width: 100%
        max-width: rem(900)
        padding: rem(60) rem(100)
        // max-width: rem(400)
        margin: rem(40) 0 !important

    .align-left
      .blockquote + .text-block__details
        margin-left: rem(100)

    .align-right
      .blockquote
        order: 2
        margin-left: rem(100)

</style>
