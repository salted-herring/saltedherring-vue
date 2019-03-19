<template>
  <div class="home-page">
    <Header
      :titleBg="$store.state.homePageData.TitleColour.Colour"
      :title="backgroundTitle"
      :headerBg="$store.state.homePageData.BackgroundColour.Colour"
      :introduction="$store.state.homePageData.Content"
      :introductionClass="'is-offset-1'"
      :introductionVariation="'page-introduction--left'"
      :isCentered="false"
      :pageClass="'homepage-header'">
      <!-- http://www.emergentmind.com/boids -->
      <canvas
        id="boids"
        slot="background"
        class="boids-canvas"
      />
    </Header>

    <LatestSection
      :title="$store.state.homePageData.LatestSectionTitle"
      :latest-items="$store.getters.getLatest"/>
  </div>
</template>

<script>
import getHomePage from '~/apollo/queries/homepage'

import Header from '~/components/Header'
import LatestSection from '~/components/LatestSection'

import Meta from '~/mixins/MetaMixin'
import PageState from '~/mixins/PageState'
import Transition from '~/mixins/TransitionMixin'

/// Boids:
import CanvasInit from '~/mixins/boids/CanvasInit'
import Simulation from '~/mixins/boids/Simulation'

export default {
  components: {
    Header,
    LatestSection
  },
  mixins: [CanvasInit, Meta, PageState, Transition],
  computed: {
    metaData() {
      return this.$store.state.meta.pages.home
    },
    backgroundTitle() {
      if (this.$store.state.menu.hoveredMenuTitle !== '') {
        return this.$store.state.menu.hoveredMenuTitle
      }
      return this.$store.state.homePageData.HeroTitle
    }
  },
  mounted() {
    this.$store.commit('menu/setMenu', true)
    this.$store.commit('menu/setHamburger', false)

    this.resizeCanvas()

    let simulation = new Simulation()
    simulation.initialize()
    simulation.run()
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeCanvas)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeCanvas)
  },
  asyncData({ store, params }) {
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
          query: getHomePage
        }
      })
      .then(result => {
        let returnVal = result.data.data.readHomePage

        if (returnVal.length === 1) {
          let data = returnVal[0]
          let content = data.Content
          store.commit('menu/setMenuColour', data.HeroMenuColour)
          store.commit('menu/setMenuCurrentColour', data.HeroMenuColour)

          let matches = content.match(
            /href=("|')((?!(https?:){0,1}\/\/))([a-z\/A-Z\?0-9-_\{\}]+)("|')/g
          )

          for (let i in matches) {
            let match = matches[i]
            let oldmatch = match
            let newmatch = match.replace('href', ':to')
          }

          store.commit('updateHomePageData', data)
          store.commit('meta/setupMeta', { slug: 'home', data: data })
        }
      })
  }
}
</script>

<style lang="sass">
  @import "~assets/sass/config/bulma-variables"
  @import "~assets/sass/config/colours"
  @import "~assets/sass/imports/mixins"
  @import "~bulma/sass/utilities/mixins"

  .homepage-header
    .columns
      .column
        position: relative

    .introduction
      +until($tablet)
        padding-left: rem(30) !important
        padding-right: rem(30) !important

      +desktop
        padding-left: rem(60) !important
        padding-right: rem(60) !important

      h1
        +mobile
          text-align: center

      p
        font-size: rem(24)
        font-weight: $weight-normal

        +mobile
          text-align: center

    .page-header__main-container
      .page-introduction
        position: relative
        top: auto
        padding-top: rem(300)
        transform: none
        left: auto
        padding-bottom: rem(400)

        +until($tablet)
          padding-left: 0 !important
          padding-right: 0 !important

  .boids-canvas
    position: fixed
    top: 0
    left: 0

  .home-page
    .section:last-child
      padding-top: rem(80)

    .latest-content.columns
      padding-bottom: rem(300)

    .latest-item
      min-width: rem(300)
      width: 100%
</style>
