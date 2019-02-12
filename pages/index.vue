<template>
  <div id="home-page">
    <Header
      :titleBg="$store.state.homePageData.TitleColour.Colour"
      :title="$store.state.homePageData.HeroTitle"
      :introduction="$store.state.homePageData.Content"
      :introductionClass="'is-offset-1'"
      :introductionVariation="'page-introduction--left'"
      :isCentered="false"
      :pageClass="'homepage-header'" />

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
            class="column latest-item is-half">
            <img
              v-if="item.Image"
              :src="item.Image"
              srcset=""
              alt="">
            <p>{{ item.Title }}<br>{{ item.SummaryText }}</p>
            <b class="link-label">Learn more</b>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import gql from 'graphql-tag'
import getHomePage from '~/apollo/queries/homepage.js'
import Header from '~/components/Header'

export default {
  components: {
    Header
  },
  head() {
    return {
      title: this.MetaTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.MetaDescription
        }
      ]
    }
  },
  computed: {
    MetaTitle() {
      return this.$store.state.homePageData.MetaTitle
    },
    MetaDescription() {
      return this.$store.state.homePageData.MetaDescription
    }
  },
  mounted() {
    this.$store.commit('menu/setMenu', false)
    this.$store.commit('menu/setHamburger', true)
    this.$store.commit('menu/setMenuHidden', false)
  },
  async fetch({ store, params }) {
    // console.log(store.app)
    // store.app.nuxt.$loading.start()
    return store.app
      .$axios({
        url: '/graphql/',
        method: 'post',
        data: {
          query: getHomePage
        }
      })
      .then(result => {
        let returnVal = result.data.data.readHomePage

        if (returnVal.length === 1) {
          let data = returnVal[0]
          let content = data.Content

          let matches = content.match(
            /href=("|')((?!(https?:){0,1}\/\/))([a-z\/A-Z\?0-9-_\{\}]+)("|')/g
          )

          for (let i in matches) {
            let match = matches[i]
            let oldmatch = match
            let newmatch = match.replace('href', ':to')
            // content.replace(oldmatch, newmatch)
          }

          store.commit('updateHomePageData', data)
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
    .page-introduction
      top: 66.67%
      transform: translate(-50%, -66.67%)

  .latest-item
    color: $black

    &:hover
      b
        text-decoration: none

    img
      margin-bottom: rem(70)

    p
      font-size: rem(36)
      line-height: em(40, 36)
      font-weight: $weight-bold
      margin-bottom: rem(50)
      width: 100%
      max-width: rem(580)

    b
      font-size: rem(36)
      line-height: em(40, 36)
      font-weight: $weight-medium
      text-decoration: underline
</style>
