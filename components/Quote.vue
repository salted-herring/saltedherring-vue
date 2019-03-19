<template>
  <blockquote
    v-if="showQuote && quote"
    class="blockquote column has-background-black has-text-light is-4">
    <p
      :style="styles"
      class="blockquote__quote"
      v-html="quote" />
    <footer
      v-if="quoteSource"
      :style="styles"
      class="blockquote__footer">
      <cite
        v-html="quoteSource" />
      <nuxt-link
        v-if="sourceLink.LinkURL !== null"
        :to="sourceLink.LinkURL"
        :target="sourceLink.OpenInNewWindow ? '_blank' : '_self'"
        :style="styles"
        v-text="sourceLink.Title" />
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
    },
    textColour: {
      type: String,
      default: null
    },
    sourceLink: {
      type: Object,
      default: function() {
        return {
          LinkURL: null,
          OpenInNewWindow: null,
          Title: null
        }
      }
    }
  },
  computed: {
    styles() {
      if (this.textColour !== null) {
        return { color: this.textColour }
      }
      return null
    }
  }
}
</script>
