<template>
  <header
    :style="{ 'background-color': '#' + headerBg }"
    :class="cssClasses"
    class="page-header section">
    <div
      class="container page-header__main-container"
      @mouseover="mouseover"
      @mouseout="mouseover">
      <div
        :class="{ 'is-centered': isCentered }"
        class="columns">
        <div
          :class="introductionClass"
          class="column introduction cms-content">
          <div
            v-if="introduction"
            :class="cssVariants"
            :style="{ color: '#' + introductionBg }"
            class="page-introduction"
            v-html="introduction" />
          <slot name="introductionContent"/>
        </div>
      </div>
    </div>
    <slot name="outsideContainer"/>
    <h1
      v-if="title"
      :style="styles"
      :class="{ 'background-text--is-not-opaque': isNotOpaque }"
      class="background-text"
      v-text="title" />
    <slot name="background"/>
  </header>
</template>
<script>
export default {
  name: 'Header',
  props: {
    isCentered: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    titleBg: {
      type: String,
      default: ''
    },
    pageClass: {
      type: String,
      default: ''
    },
    headerBg: {
      type: String,
      default: ''
    },
    introduction: {
      type: String,
      default: ''
    },
    introductionBg: {
      type: String,
      default: ''
    },
    introductionClass: {
      type: String,
      default: ''
    },
    introductionVariation: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isHovered: false
    }
  },
  computed: {
    isNotOpaque() {
      return !this.$store.state.pagestate.backgroundTextOpaque
    },
    cssVariants() {
      let css = [this.introductionVariation]

      if (!this.$store.state.pagestate.backgroundTextOpaque) {
        css.push('page-introduction--is-not-opaque')
      }

      return css.join(' ')
    },
    cssClasses() {
      let classes = [this.pageClass]

      if (this.isHovered) {
        classes.push('is-hovered')
      }

      return classes.join(' ')
    },
    styles() {
      let styles = {
        color: '#' + this.titleBg
      }

      return styles
    }
  },
  methods: {
    mouseover() {
      this.isHovered = !this.isHovered
    }
  }
}
</script>
<style lang="sass">
  @import "~assets/sass/config/bulma-variables"
  @import "~assets/sass/config/colours"
  @import "~assets/sass/imports/mixins"

  .page-header
    &.is-hovered
      .background-text
        opacity: 0.1

    &__main-container
      min-height: 100vh
      height: 100%

      .columns
        min-height: 100vh
        display: block
        position: relative
        margin-left: 0
        margin-right: 0

        .column
          min-height: 100vh

      .page-introduction
        position: absolute
        top: rem(300)
        left: 50%
        transform: translateX(-50%)

        &--is-not-opaque
          color: $white !important

</style>
