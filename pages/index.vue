<template>
  <div id="home-page">
    <Header
      :titleBg="$store.state.homePageData.TitleColour.Colour"
      :title="backgroundTitle"
      :headerBg="$store.state.homePageData.BackgroundColour.Colour"
      :introduction="$store.state.homePageData.Content"
      :introductionClass="'is-offset-1 is-half'"
      :introductionVariation="'page-introduction--left'"
      :isCentered="false"
      :pageClass="'homepage-header'">
      http://www.emergentmind.com/boids
      <canvas
        id="boids"
        slot="background"
        class="boids-canvas"
      />
    </Header>

    <section
      class="section has-background-white">
      <div class="container">
        <header class="section-heading">
          <h2
            class="title"
            v-html="$store.state.homePageData.LatestSectionTitle" />
        </header>

        <div class="latest-content columns">
          <a
            v-for="item in $store.getters.getLatest"
            :key="item.ID"
            :href="item.Link.LinkURL"
            :target="item.OpenInNewWindow ? '_blank' : '_self'"
            :rel="item.OpenInNewWindow ? 'noopener' : ''"
            class="column latest-item is-half">
            <LazyImage
              v-if="item.Image"
              :lazy-src="item.Image"
              :width="item.ImageWidth"
              :height="item.ImageHeight"
              :background-color="'#ffffff'"
            />
            <h3>{{ item.Title }}</h3>
            <p>{{ item.SummaryText }}</p>
            <b class="link-label">Learn more</b>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import getHomePage from '~/apollo/queries/homepage'

import Header from '~/components/Header'
import LazyImage from '~/components/LazyLoadImage'

import Meta from '~/mixins/MetaMixin'
import PageState from '~/mixins/PageState'
import Transition from '~/mixins/TransitionMixin'

/// Boids:
import CanvasInit from '~/mixins/boids/CanvasInit'
import Simulation from '~/mixins/boids/Simulation'

export default {
  components: {
    Header,
    LazyImage
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

  .homepage-header
    .columns
      .column
        position: relative

    .page-header__main-container
      .page-introduction
        position: relative
        top: auto
        margin-top: rem(300)
        transform: none
        left: auto
        margin-bottom: rem(400)

  .boids-canvas
    position: fixed
    top: 0
    left: 0

  .latest-content
    padding-bottom: rem(300)

  .latest-item
    color: $black

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
      max-width: rem(580)

    b,
    p
      font-size: rem(20)
      line-height: em(24, 20)
      font-weight: $weight-medium

    p
      margin-bottom: rem(50)

    b
      text-decoration: underline

  #home-page
    .section:last-child
      padding-top: rem(80)
</style>
