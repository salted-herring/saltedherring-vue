<template>
  <div
    id="about-page"
    :style="{ backgroundColor: BackgroundColour }"
    class="about-page">
    <Navigation
      :sections="sections"
    />
    <AboutSection
      v-for="(section, index) in sections"
      :key="index"
      :last="index === sections.length - 1"
      :section="section"
    />
  </div>
</template>
<script>
import Query from '~/apollo/queries/aboutpage'

import Navigation from '~/components/AboutNavigation'
import AboutSection from '~/components/AboutSection'

import Meta from '~/mixins/MetaMixin'

export default {
  components: {
    AboutSection,
    Navigation
  },
  scrollToTop: false,
  mixins: [Meta],
  computed: {
    metaData() {
      return this.$store.state.meta.pages.about
    },
    BackgroundColour() {
      return this.$store.state.aboutpage.BackgroundColour
    },
    sections() {
      return this.$store.state.aboutpage.Sections
    }
  },
  mounted() {
    this.$store.commit('menu/setMenuColour', 'black')
    this.$store.commit('menu/setMenuCurrentColour', 'black')
  },
  asyncData({ store, params, error, route, req, env }) {
    let self = this

    return store.app
      .$axios({
        url: '/graphql/',
        method: 'post',
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        data: {
          query: Query
        }
      })
      .then(result => {
        let page = result.data.data.readAboutPage

        if (page === null || page.length !== 1) {
          error({ statusCode: 404, message: 'About page not found' })
        }

        store.commit('aboutpage/updateSections', page[0])
        store.commit(
          'aboutpage/updateBackgroundColour',
          page[0].BackgroundColour
        )
        store.commit('meta/setupMeta', {
          slug: 'about',
          data: page[0],
          url: process.env.baseUrl + route.fullPath
        })
      })
  }
}
</script>
<style lang="sass">
  @import '~assets/sass/config/bulma-variables'
  @import '~assets/sass/config/colours'
  @import '~assets/sass/config/fonts'
  @import '~assets/sass/config/typography'
  @import '~assets/sass/imports/mixins'
  @import '~assets/sass/imports/bulma-overrides'
  @import '~bulma/sass/utilities/mixins'

  .about-page
    display: block
    width: 100%
    height: 100%

    .about-navigation
      + .about-section
        +mobile
          padding-top: rem(100)

    .text-block__details
      padding-top: rem(0)
      padding-bottom: rem(0)
      transform: translate3d(0, 0, 0) !important
</style>
