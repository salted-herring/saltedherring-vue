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
              <div v-html="$store.state.homepage.pageData.Content" />
            </div>
          </div>
        </div>
      </div>
      <div
        v-bind="{ style: 'color: #' + $store.state.homepage.pageData.TitleColour.Colour }"
        class="background-text">
        hallo
      </div>
    </section>

    <section
      class="section has-background-light">
      <div class="container">
        <header class="section-heading">
          <h2 class="title">Latest</h2>
        </header>

        <div class="latest-content columns">
          <a
            href="https://9low20nwj1bhfw.preview.forestry.io/work/kokako/"
            class="column is-half content-block">

            <p>We welcome Ayla to the team. She is a breath of fresh creative and colourful air.</p>
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
      title: 'Salted Herring Design'
    }
  },
  // async asyncData(context) {
  //   context.app
  //     .$axios({
  //       url: '/graphql/',
  //       method: 'post',
  //       data: {
  //         query: getHomePage
  //       }
  //     })
  //     .then(result => {
  //       let returnVal = result.data.data.readHomePage
  //
  //       if (returnVal.length === 1) {
  //         // store.commit('homepage/updatePageData', returnVal[0])
  //         return {
  //           content: returnVal[0].Content
  //         }
  //       }
  //     })
  //   // console.log('context', context.app)
  // },
  async fetch({ store, params }) {
    await store.app
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
          // alert('yes')
          store.commit('homepage/updatePageData', returnVal[0])
        }
      })
    // console.log('loaded', store.app.$axios)
    // console.log('context', this.$apollo)
    // this.$apollo.query({ HomePage }).then(({ data }) => {
    //   console.log(data)
    // })
    // let { data } = await axios.get(`https://my-api/posts/${params.id}`)
    // return { title: data.title }
    // return await this.$axios
    //   .$get('http://localhost:8145/graphql', { params: getHomePage })
    //   .then(res => {
    //     console.log(res)
    //   })
  }
}
</script>
