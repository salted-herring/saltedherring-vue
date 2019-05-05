<template>
  <section
    v-if="section !== null"
    :id="section.Slug"
    class="about-section section">
    <header
      :style="headerStyle"
      class="about-section__header">
      <span
        class="page-introduction"
        v-html="section.HeroIntroduction"/>
      <BackgroundText
        :title="section.HeroTitle"
        class="background-text" />
    </header>
    <div class="about-section__content">
      <TextBlock
        v-if="section.Introduction !== null"
        :details="section.Introduction"
        :quote-text-colour="'#fced85'"
        :details-background="''"
        :last="last"
        :background-variation="'about-section__introduction'" />
      <Carousel
        v-if="section.Blocks.length != 0"
        :nav="false"
        :autoplay="false"
        :items="3"
        :dots="true"
        :center="false"
        :loop="false"
        :margin="100"
        :animate-in="'slideIn'"
        :animate-out="'slideOut'"
        :smart-speed="1500"
        :drag-end-speed="1500"
        :slide-transition="'cubic-bezier(0.23, 1, 0.32, 1)'"
        :responsive="responsiveData"
        :auto-width="true"
        :auto-height="false"
        class="about-section__blocks">
        <Block
          v-for="(block, index) in section.Blocks"
          :key="index"
          :index="index"
          :title="block.Title"
          :introduction="block.Introduction"
          :details="block.Details"
          :show-quote="block.ShowQuote"
          :quote="block.Quote"
          :quote-source="block.Source"
          :quote-source-link="block.SourceLink"/>
      </Carousel>
    </div>
  </section>
</template>
<script>
import Block from '~/components/AboutBlock'
import BackgroundText from '~/components/BackgroundText'
import Header from '~/components/Header'
import TextBlock from '~/components/TextBlock'
import Carousel from '~/components/Carousel'

export default {
  components: {
    BackgroundText,
    Block,
    Header,
    TextBlock,
    Carousel
  },
  props: {
    section: {
      type: Object,
      default: null
    },
    last: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      responsiveData: {
        0: {
          items: 1,
          margin: 20
        },
        768: {
          items: 2,
          margin: 20
        },
        1000: {
          items: 3,
          margin: 100
        }
      }
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
  @import "~assets/sass/config/variables"
  @import "~assets/sass/config/bulma-variables"
  @import "~assets/sass/imports/mixins"
  @import "~bulma/sass/utilities/mixins"

  .about-section
    // max-width: 100%

    +mobile
      overflow: hidden

    &__header
      width: 100%
      min-height: 80vh
      position: relative
      max-width: 100%
      overflow: hidden

      +until($tablet)
        min-height: rem(300)

      .page-introduction
        position: absolute
        left: 0
        top: 50%
        transform: translateY(-50%)
        z-index: 2
        font-size: rem(48)
        line-height: em(54, 48)
        margin: 0
        padding-left: rem($body-border * 2)
        padding-right: rem($body-border * 2)

        +mobile
          font-size: rem(36)
          line-height: em(42, 36)
          padding-left: rem($body-border)
          padding-right: rem($body-border)

        +widescreen
          font-size: rem(64)
          line-height: em(70, 64)

      .background-text
        position: absolute
        color: $white

    &__blocks
      margin: rem(100) 0

      .owl-carousel
        max-width: calc(100% - 200px)

        +touch
          max-width: calc(100% - 120px)

        +mobile
          max-width: 100%

        margin-left: auto
        margin-right: auto

        .owl-stage-outer
          overflow: visible

          +touch
            .blockquote
              display: none

          +mobile
            margin-left: rem(30)
            margin-right: rem(30)

      .owl-item
        transition: all 0.25s cubic-bezier(0.455, 0.03, 0.515, 0.955)

        .about-block__information
          transition: all 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955)

        .blockquote
          transition: all 0.25s cubic-bezier(0.455, 0.03, 0.515, 0.955)
</style>
