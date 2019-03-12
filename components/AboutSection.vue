<template>
  <section
    v-if="section !== null"
    id="about-section"
    class="about-section section">
    <header
      :style="headerStyle"
      class="about-section__header">
      <span
        class="page-introduction"
        v-html="section.HeroIntroduction"/>
      <span
        class="background-text"
        v-text="section.HeroTitle" />
    </header>
    <div class="about-section__content">
      <TextBlock
        v-if="section.Introduction !== null"
        :details="section.Introduction"
        :background-variation="'about-section__introduction'" />
      <Carousel
        v-if="section.Blocks.length != 0"
        :nav="false"
        :autoplay="true"
        :items="1"
        :loop="true"
        :autoplay-timeout="5000"
        :dots="true"
        class="blocks">
        <Block
          v-for="(block, index) in section.Blocks"
          :key="index"
          :index="index"
          :title="block.Title"
          :introduction="block.Introduction"
          :details="block.Details"
          :show-quote="block.ShowQuote"
          :quote="block.Quote"
          :quote-source="block.Source"/>
      </Carousel>
    </div>
  </section>
</template>
<script>
import Block from '~/components/AboutBlock'
import Header from '~/components/Header'
import TextBlock from '~/components/TextBlock'
import Carousel from '~/components/Carousel'

export default {
  components: {
    Block,
    Header,
    TextBlock,
    Carousel
  },
  props: {
    section: {
      type: Object,
      default: null
    }
  },
  computed: {
    headerStyle() {
      let styles = {
        color: '#000000'
      }

      return styles
    }
  }
}
</script>
<style lang="sass">
  /// Config
  @import "~assets/sass/config/bulma-variables"
  @import "~assets/sass/imports/mixins"
  @import "~bulma/sass/utilities/mixins"

  .about-section
    &__header
      width: 100%
      min-height: 100vh
      position: relative

      .page-introduction
        position: absolute
        left: 0
        top: 50%
        translate: transformY(-50%)
        z-index: 2
        font-size: rem(64)
        line-height: em(70, 64)

      .background-text
        position: absolute
        color: $white
</style>
