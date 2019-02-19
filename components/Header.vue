<template>
  <header
    :style="{ 'background-color': '#' + headerBg }"
    :class="pageClass"
    class="page-header section">
    <div class="container page-header__main-container">
      <div
        :class="{ 'is-centered': isCentered }"
        class="columns">
        <div
          :class="introductionClass"
          class="column introduction cms-content">
          <div
            v-if="introduction"
            :class="introductionVariation"
            :style="{ color: '#' + introductionBg }"
            class="page-introduction"
            v-html="introduction" />
          <slot name="introductionContent"/>
        </div>
      </div>
    </div>
    <div
      :style="{ color: '#' + titleBg }"
      class="background-text">
      {{ title }}
    </div>
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
  }
}
</script>
<style lang="sass">
  @import "~assets/sass/config/bulma-variables"
  @import "~assets/sass/config/colours"
  @import "~assets/sass/imports/mixins"

  .page-header
    &__main-container
      min-height: 100vh
      height: 100%

      .columns
        min-height: 100vh
        display: block
        position: relative

        .column
          min-height: 100vh
          // margin: 0 auto
          // position: relative

      .page-introduction
        position: absolute
        top: rem(300)
        left: 50%
        transform: translateX(-50%)

</style>
