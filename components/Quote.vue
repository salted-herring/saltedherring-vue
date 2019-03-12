<template>
  <blockquote
    v-if="showQuote && quote"
    class="blockquote column has-background-black has-text-light is-4">
    <p
      class="blockquote__quote"
      v-html="quote" />
    <footer
      v-if="quoteSource"
      class="blockquote__footer">
      <cite
        v-html="quoteSource" />
    </footer>
  </blockquote>
</template>
<script>
export default {
  name: 'BlockQuote',
  props: {
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
  }
}
</script>
