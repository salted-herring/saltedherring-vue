<template>
  <div class="work-page">
    <Header
      :headerBg="$store.state.workPageData.BackgroundColour.Colour"
      :introduction="$store.state.workPageData.Introduction"
      :titleBg="$store.state.workPageData.TitleColour.Colour"
      :title="$store.state.workPageData.HeroTitle"
      :pageClass="'workpage-header'">
      <nav
        slot="introductionContent"
        class="workpage-nav">
        <ProjectLink
          v-for="(link, index) in projects"
          :key="index"
          :link="link.Link"
          :label="link.MenuTitle"
          :images="link.HeroImages"
          :video="link.HeroVideo">{{ index }} {{ link.MenuTitle }}</ProjectLink>
      </nav>
    </Header>

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
import ProjectLink from '~/components/ProjectLink'
import Header from '~/components/Header'

export default {
  components: {
    ProjectLink,
    Header
  },
  computed: {
    projects() {
      console.log('updated projects')
      return this.$store.state.projects
    }
  },
  async fetch({ store, params }) {
    if (store.state.workPageData !== null) {
      return false
    }

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
    position: relative
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)

</style>
