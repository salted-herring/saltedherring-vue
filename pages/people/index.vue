<template>
  <div class="people-page">
    <Header
      :titleBg="peoplepage.TitleColour.Colour"
      :headerBg="peoplepage.BackgroundColour.Colour"
      :title="peoplepage.Title"
      :introduction="''"
      :introductionClass="''"
      :introductionVariation="'page-thing'"
      :isCentered="true"
      :pageClass="'people-header'">
      <div
        slot="background"
        class="hero-section">
        <Carousel
          v-if="headerImages.length > 1"
          :nav="false"
          :autoplay="true"
          :items="1"
          :loop="true"
          :autoplay-timeout="5000"
          :dots="false"
          class="hero-images">
          <div
            v-for="(image, index) in headerImages"
            :key="index"
            :style="{ 'background-image': 'url(' + image.FitFullScreen + ')' }"
            class="hero-images__image" />
        </Carousel>
        <div
          v-for="(image, index) in headerImages"
          v-else
          :key="index"
          :style="{ 'background-image': 'url(' + image.FitFullScreen + ')', 'background-color': '#' + peoplepage.BackgroundColour.Colour }"
          class="hero-images__image" />
      </div>
    </Header>

    <div
      :style="{ 'background-color': '#' + peoplepage.BackgroundColour.Colour + 'B3' }"
      class="people-content">
      <span
        class="background-text"
        v-text="peoplepage.Title" />
      <div class="container">
        <div class="columns is-centered">
          <div
            class="column people-content__content is-8 cms-content"
            v-html="peoplepage.Content"/>
        </div>
        <Navigation
          :projects="people" />
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

import Carousel from '~/components/Carousel'
import Header from '~/components/Header'
import LatestSection from '~/components/LatestSection'
import Navigation from '~/components/ProjectNavigation'

export default {
  components: { Carousel, Header, LatestSection, Navigation },
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
  asyncData({ store, params }) {
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
          store.commit('meta/setupMeta', { slug: 'people', data: data })
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
    .background-text
      z-index: 200

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

    .background-text
      color: $white

    .project-navigation
      padding: rem(80) 0 rem(200)

      &:after
        background: none
</style>
