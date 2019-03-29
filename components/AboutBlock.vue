<template>
  <div class="about-block">
    <div
      :class="{ 'has-quote': showQuote && quote }"
      class="about-block__information">
      <span
        class="about-block__index"
        v-text="getIndex"/>
      <div class="about-block__content">
        <span
          class="about-block__title"
          v-html="title"/>
        <p
          v-if="introduction !== ''"
          class="about-block__introduction"
          v-html="introduction" />
        <div
          :class="{ 'is-shown' : canShowDetails }"
          class="about-block__details"
          v-html="details" />
        <button
          v-if="introduction !== ''"
          :class="{ 'clicked' : canShowDetails }"
          class="about-block__button"
          @click="buttonClick"
        >+</button>
      </div>
    </div>
    <Quote
      :show-quote="showQuote"
      :quote="quote"
      :text-colour="'#fced85'"
      :quote-source="quoteSource"
      :source-link="quoteSourceLink"/>
  </div>
</template>
<script>
import Quote from '~/components/Quote'

export default {
  name: 'AboutBlock',
  components: {
    Quote
  },
  props: {
    index: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: null
    },
    introduction: {
      type: String,
      default: null
    },
    details: {
      type: String,
      default: null
    },
    showQuote: {
      type: Boolean,
      default: false
    },
    quote: {
      type: String,
      default: null
    },
    quoteSource: {
      type: String,
      default: null
    },
    quoteSourceLink: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      detailsShown: false
    }
  },
  computed: {
    getIndex() {
      return this.index + 1
    },
    canShowDetails() {
      return this.detailsShown || this.introduction === ''
    }
  },
  methods: {
    buttonClick() {
      this.detailsShown = !this.detailsShown
    }
  }
}
</script>
<style lang="sass">
  /// Config
  @import "~assets/sass/config/colours"
  @import "~assets/sass/config/bulma-variables"
  @import "~assets/sass/imports/mixins"
  @import "~bulma/sass/utilities/mixins"

  .about-block
    width: rem(500)
    min-width: rem(320)
    max-width: 100%
    position: relative
    display: block

    +until($widescreen)
      width: rem(480)
      // padding: rem(40)

    +until($tablet)
      max-width: rem(500)
      width: 100%

    +until(480px)
      max-width: rem(320)
      width: calc(100% - 60px)
      padding-left: 0
      padding-right: 0

    +fullhd
      padding: rem(60)

    &__information
      background: $white
      padding: rem(40)

      &.has-quote
        padding-bottom: rem(140)

        + .blockquote
          margin-top: rem(-80)
          margin-left: rem(60)
          width: 100%

    &__index
      font-size: rem(64)
      line-height: 1em
      font-weight: $weight-bold
      display: flex
      width: rem(100)
      height: rem(100)
      align-items: center
      justify-content: center
      border-radius: 50%
      background-color: $picasso

    &__title
      font-weight: $weight-extrabold
      font-size: rem(32)
      line-height: em(42, 32)
      display: block
      transform: rotate(-5deg) skew(-5deg)
      margin-bottom: rem(40)
      overflow: hidden

      +until(480px)
        font-size: rem(24) !important

      +until($tablet)
        font-size: rem(36)
        // line-height: em(36, 30)

      +desktop
        font-size: rem(48)
        line-height: em(56, 48)

    &__content
      font-size: rem(18)
      line-height: em(24, 18)

      +until($tablet)
        font-size: rem(16)
        line-height: em(20, 16)

    &__introduction
      font-weight: $weight-bold

      + .about-block__details
        margin-top: rem(40)

    &__details
      overflow: hidden
      max-height: 0
      display: block
      height: 100%
      transition: max-height 0.5s cubic-bezier(0, 1, 0, 1)

      &.is-shown
        transition: max-height 1s ease-in-out
        max-height: rem(10000)

      p
        margin-bottom: 1em
        position: relative

        &:last-child
          margin-bottom: 0

    &__button
      appearance: none
      border: none
      outline: none
      background: none
      font-size: rem(60)
      line-height: 1em
      cursor: pointer
      transform-origin: center
      transition: all 0.25s ease
      display: block
      margin-left: auto
      width: rem(60)

      &:hover
        transform: scale(1.2)

      &.clicked
        transform: rotate(45deg)

        &:hover
          transform: rotate(45deg) scale(1.2)
</style>
