<template>
  <div
    id="about-page"
    :style="{ backgroundColor: BackgroundColour }"
    class="about-page">
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

import AboutSection from '~/components/AboutSection'

import Meta from '~/mixins/MetaMixin'

export default {
  components: {
    AboutSection
  },
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
  asyncData({ store, params, error }) {
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
        store.commit('meta/setupMeta', { slug: 'about', data: page[0] })
      })
  }
}
</script>
<style lang="sass">
  .about-page
    display: block
    width: 100%
    height: 100%

    .about-section
      &:first-child
        .about-section__header
          min-height: 100vh
</style>
