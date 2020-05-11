<template>
  <section
    :class="getClasses">
    <div class="container">
      <header class="section-heading">
        <h2
          class="title"
          v-html="title" />
      </header>

      <div class="latest-content columns">
        <template
          v-for="item in latestItems"
        >
          <a
            v-if="item.Link.LinkURL !== null"
            :href="item.Link.LinkURL"
            :target="item.Link.OpenInNewWindow ? '_blank' : '_self'"
            :rel="item.Link.OpenInNewWindow ? 'noopener' : ''"
            :key="item.ID"
            :class="columnWidth"
            class="column latest-item">
            <LazyImage
              v-if="item.Image"
              :lazy-src="item.Image"
              :width="item.ImageWidth"
              :height="item.ImageHeight"
              :background-color="'#ffffff'"
            />
            <h3>{{ item.Title }}</h3>
            <div
              class="summary-text"
              v-html="item.SummaryText" />
            <b
              class="link-label"
              v-text="item.Link.Title" />
          </a>
          <div
            v-else
            :key="item.ID"
            :class="columnWidth"
            class="column latest-item">
            <LazyImage
              v-if="item.Image"
              :lazy-src="item.Image"
              :width="item.ImageWidth"
              :height="item.ImageHeight"
              :background-color="'#ffffff'"
            />
            <h3>{{ item.Title }}</h3>
            <div
              class="summary-text"
              v-html="item.SummaryText" />
          </div>
        </template>

      </div>
    </div>
  </section>
</template>
<script>
import LazyImage from '~/components/LazyLoadImage'
export default {
  name: 'LatestSection',
  components: {
    LazyImage
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    latestItems: {
      type: Array,
      default: null
    },
    columnWidth: {
      type: String,
      default: ''
    },
    sectionClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    getClasses() {
      return `${this.sectionClass} latest-section section has-background-white`
    }
  }
}
</script>
<style lang="sass">
  @import "~assets/sass/config/bulma-variables"
  @import "~assets/sass/config/colours"
  @import "~assets/sass/imports/mixins"
  @import "~assets/sass/mixins/bulma-mixins"

  .latest-section
    padding: rem(100) 0

    .latest-content.columns
      flex-wrap: wrap

      +until($desktop)
        margin: rem(0) rem(60 - 12)
      //
      +mobile
        margin: rem(0) rem(30)

    .latest-item
      color: $black
      min-width: rem(270)

      +mobile
        padding-left: 0
        padding-right: 0

      &:hover
        b
          text-decoration: none

      img
        margin-bottom: rem(70)

      h3
        font-size: rem(30)
        line-height: em(36, 30)
        font-weight: $weight-bold
        margin-bottom: rem(14)

      h3,
      p
        width: 100%
        max-width: rem(460)

      b,
      p
        font-size: rem(18)
        line-height: em(24, 18)
        font-weight: $weight-normal

        +mobile
          font-size: rem(16)
          line-height: em(20, 16)

      .summary-text
        margin-bottom: rem(50)

      a,
      b
        text-decoration: underline
        color: $black

        &:hover
          text-decoration: none
</style>
