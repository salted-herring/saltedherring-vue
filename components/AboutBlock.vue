<template>
  <div class="about-block">
    <div class="about-block__information">
      <span
        class="about-block__index"
        v-text="getIndex"/>
      <div class="about-block__content">
        <span
          class="about-block__title"
          v-text="title"/>
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
      :quote-source="quoteSource"/>
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
    background: $white
    padding: rem(60) rem(80)
    width: rem(680)
    max-width: 100%
    position: relative
    display: block

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
      font-size: rem(64)
      line-height: rem(70)
      display: block
      transform: rotate(-5deg) skew(-5deg)
      margin-bottom: rem(40)

    &__content
      font-size: rem(24)
      line-height: em(30, 24)

    &__introduction
      font-weight: $weight-bold

      + .about-block__details
        margin-top: rem(40)

    &__details
      transition: max-height 0.25s ease
      overflow: hidden
      max-height: 1px
      // height: 100%
      opacity: 0

      &.is-shown
        opacity: 1
        max-height: rem(10000)

      p
        margin-bottom: 1em

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

    .blockquote
      position: absolute
      top: 0
      left: 100%
      transform: translate(-20%, -80%)
      width: calc(90% - 40px)
      z-index: 1
</style>
