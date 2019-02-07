<template>
  <div id="home-page">
    <section
      class="homepage-header has-background-light section">
      <div
        class="container">
        <div
          class="content">
          <div
            class="columns">
            <div
              class="column is-half is-offset-1 homepage-introduction">
              <div v-html="$store.state.homePageData.Content" />
            </div>
          </div>
        </div>
      </div>
      <div
        :style="{ color: '#' + $store.state.homePageData.TitleColour.Colour }"
        class="background-text">
        {{ $store.state.homePageData.HeroTitle }}
      </div>
    </section>

    <section
      class="section has-background-light">
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
            class="column is-half content-block">
            <img
              v-if="item.Image"
              :src="item.Image"
              srcset=""
              alt="">
            <p>{{ item.Title }}. {{ item.SummaryText }}</p>
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

export default {
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
          store.commit('updateHomePageData', returnVal[0])
        }
        // store.app.nuxt.$loading.stop()
      })
  }
}
</script>
