<template>
  <div class="content-block text-block has-background-light">
    <div class="container">
      <div
        :class="{ 'is-centered': isCentered, 'align-left': alignedLeft }"
        class="columns">
        <blockquote
          v-if="details.ShowQuote && details.Quote"
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
          class="text-block__details column cms-content"
          v-html="details.Content" />
      </div>
    </div>
  </div>
</template>
<script>
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
  computed: {
    isCentered() {
      return !this.details.showQuote || this.details.Quote === ''
    },
    alignedLeft() {
      return (
        this.details.Alignment === 'left' &&
        this.details.ShowQuote &&
        this.details.Quote !== ''
      )
    }
  }
}
</script>
<style lang="sass">
  @import "~assets/sass/config/bulma-variables"
  @import "~assets/sass/config/colours"
  @import "~assets/sass/imports/mixins"

  .text-block
    .columns
      margin-top: 0
      margin-bottom: 0
      justify-content: space-between

      &.is-centered
        justify-content: center

    &__details
      max-width: rem(900)
      font-size: rem(24)
      line-height: em(30, 24)
      background: $white
      padding: rem(100) rem(100) rem(70)

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

    .align-left
      .blockquote + .text-block__details
        margin-left: rem(100)

    .align-right
      .blockquote
        order: 2

        &+ .text-block__details
        margin-right: rem(100)
</style>
