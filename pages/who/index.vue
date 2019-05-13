<template>
  <div class="people-page">
    <generic-header
      :title-bg="peoplepage.TitleColour.Colour"
      :header-bg="peoplepage.BackgroundColour.Colour"
      :page-class="'people-header'"
      :header-images="headerImages"/>

    <div
      :style="{ 'background-color': '#' + peoplepage.BackgroundColour.Colour + 'E6' }"
      class="people-content">
      <BackgroundText
        :tag="'h1'"
        :title="peoplepage.Title"
        class="background-text" />
      <div class="container">
        <div class="columns is-centered">
          <div
            class="column people-content__content is-8 cms-content"
            v-html="peoplepage.Content"/>
        </div>
        <Navigation
          :people="people" />
      </div>
    </div>
    <LatestSection
      v-if="peoplepage.ShowPartners"
      :title="peoplepage.PartnersTitle"
      :latest-items="partners"
      :column-width="'is-3'" />
  </div>
</template>
<script>
import getPeoplePage from '~/apollo/queries/peoplepage'

import Meta from '~/mixins/MetaMixin'
import PageState from '~/mixins/PageState'
import Transition from '~/mixins/TransitionMixin'

import BackgroundText from '~/components/BackgroundText'
import GenericHeader from '~/components/GenericHeader'
import LatestSection from '~/components/LatestSection'
import Navigation from '~/components/PeopleNavigation'

export default {
  components: { BackgroundText, GenericHeader, LatestSection, Navigation },
  mixins: [Meta, PageState, Transition],
  computed: {
    metaData() {
      return this.$store.state.meta.pages.people
    },
    peoplepage() {
      return this.$store.state.peoplepage.peoplepage
    },
    people() {
      return this.$store.state.peoplepage.people.sorted
    },
    partners() {
      return this.$store.state.peoplepage.partners
    },
    headerImages() {
      return this.$store.state.peoplepage.peoplepage.HeroImages
    }
  },
  asyncData({ store, params, route }) {
    let peoplepage = store.state.peoplepage.peoplepage

    if (Object.keys(peoplepage).length !== 0) {
      return false
    }

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
          query: getPeoplePage
        }
      })
      .then(result => {
        let returnVal = result.data.data.readPeoplePage
        //
        if (returnVal.length === 1) {
          let data = returnVal[0]
          store.commit('peoplepage/updatePeoplePageState', data)
          store.commit('meta/setupMeta', {
            slug: 'people',
            data: data,
            url: process.env.baseUrl + route.fullPath
          })
        }
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
  .people-header
    &.is-hovered
      + .people-content
        .background-text
          opacity: 0.1

  .hero-images__image
    background-blend-mode: multiply

  .people-page
    .latest-section

      .section-heading
        margin-bottom: rem(100)

      .latest-content
        justify-content: center

        +until($widescreen)
          max-width: rem(540)
          margin-left: auto
          margin-right: auto

      .latest-item
        +until($desktop)
          padding-left: rem(30)
          padding-right: rem(30)
        h3
          +until($widescreen)
            font-size: rem(24)



  .people-content
    position: relative
    z-index: 2

    &__content
      h2
        font-size: rem(36)
        line-height: em(40, 36)

    .background-text
      color: $white

    .project-navigation
      padding: rem(80) 0 rem(200)

      &:after
        background: none
</style>
