<template>
  <div class="work-page">
    <section
      :style="{ 'background-color': '#' + $store.state.workPageData.BackgroundColour.Colour }"
      class="workpage-header page-header section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half introduction cms-content">
            <span
              class="page-introduction"
              v-html="$store.state.workPageData.Introduction" />
            <nav class="workpage-nav">
              <nuxt-link
                v-for="(link, index) in $store.state.projects"
                :key="index"
                :to="link.Link"
                active-class="is-active"
                v-text="link.MenuTitle" />
            </nav>
          </div>
        </div>
      </div>
      <div
        :style="{ color: '#' + $store.state.workPageData.TitleColour.Colour }"
        class="background-text">
        {{ $store.state.workPageData.HeroTitle }}
      </div>
    </section>

    <section
      v-if="$store.state.awards.show"
      :style="{ 'background-color': '#' + $store.state.awards.backgroundColour }"
      class="awards section section--overview">
      <div class="container">
        <header class="section-heading">
          <h2
            class="title"
            v-html="$store.state.awards.title" />
        </header>
        <div
          v-for="(programme, index) in $store.state.awards.awards"
          :key="index"
          class="awards-programme">
          <a
            :href="programme.link.LinkURL"
            :target="programme.link.OpenInNewWindow ? '_blank' : '_self'"
            class="awards-programme__link">{{ programme.title }}</a>

          <div class="columns">
            <div
              v-for="(award, i) in programme.awards"
              :key="i"
              class="column award is-3">
              <div class="award__image">
                <img
                  :src="award.image"
                  alt="">
              </div>

              <span class="award__title">{{ award.title }}</span>

              <ul
                v-for="(details, key) in award.details"
                :key="key">
                <li class="is-flex award__detail">
                  <span class="award__year">{{ details.Year }}</span>
                  <div
                    class="award__details flex-wrap"
                    v-html="details.Details"/>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      v-if="$store.state.clients.show"
      :style="{'background-color': '#' + $store.state.clients.backgroundColour}"
      class="section section--overview">
      <div class="container">
        <header class="section-heading">
          <h2
            class="title"
            v-html="$store.state.clients.title" />
        </header>

        <div class="clients">
          <div class="columns">
            <div
              v-for="(client, i) in $store.state.clients.clients"
              :key="i"
              class="column client is-3">
              <img
                :src="client.url"
                alt="client.title">
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import getWorkPage from '~/apollo/queries/workpage'

export default {
  async fetch({ store, params }) {
    // console.log(store.app)
    // store.app.nuxt.$loading.start()
    return store.app
      .$axios({
        url: '/graphql/',
        method: 'post',
        data: {
          query: getWorkPage
        }
      })
      .then(result => {
        // console.log(result.data.data.readWorkPage)
        let returnVal = result.data.data.readWorkPage

        if (returnVal.length === 1) {
          let data = returnVal[0]
          // let content = data.Content

          // let matches = content.match(
          //   /href=("|')((?!(https?:){0,1}\/\/))([a-z\/A-Z\?0-9-_\{\}]+)("|')/g
          // )
          //
          // for (let i in matches) {
          //   let match = matches[i]
          //   let oldmatch = match
          //   let newmatch = match.replace('href', ':to')
          //   // content.replace(oldmatch, newmatch)
          // }

          store.commit('updateWorkPageData', data)
        }
      })
  },

  mounted() {
    this.$store.commit('menu/setMenu', true)
    this.$store.commit('menu/setHamburger', false)
    this.$store.commit('menu/setMenuHidden', true)
  }
}
</script>

<style lang="sass" scoped>
  @import '~assets/sass/config/bulma-variables'
  @import '~assets/sass/config/colours'
  @import '~assets/sass/config/fonts'
  @import '~assets/sass/config/typography'
  @import '~assets/sass/imports/mixins'
  @import '~assets/sass/imports/bulma-overrides'

  @import '~bulma/sass/utilities/initial-variables'
  @import '~bulma/sass/utilities/functions'
  @import '~bulma/sass/utilities/derived-variables'
  @import '~bulma/sass/utilities/mixins'



  .workpage-nav
    margin: rem(180) auto

    a
      font-weight: $weight-black
      color: $black
      position: relative
      left: 50%
      transform: translateX(-50%) rotate(-5deg) skew(-5deg)
      display: inline-block
      font-size: rem(72)
      line-height: em(90, 72)
      text-decoration: none

      @include until($desktop)
        transform: rotate(-5deg) skew(-5deg)
        left: 0

      &:after
          position: absolute
          left: 0
          bottom: 1px
          width: 100%
          height: rem(5)
          background: $black
          content: ''
          display: block
          transition: width 0.25s ease

      &:hover
          &:after
              width: 0

</style>
