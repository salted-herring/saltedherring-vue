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
          :video="link.HeroVideo">{{ link.MenuTitle }}</ProjectLink>
      </nav>
    </Header>

    <div class="preview-overlays">
      <PreviewOverlay
        v-for="project in projects"
        :key="project.URLSegment"
        :video="project.PreviewVideo"
        :image="project.PreviewImage" />
    </div>

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
import PreviewOverlay from '~/components/PreviewOverlay'
import Header from '~/components/Header'
import MetaData from '~/mixins/MetaMixin'

export default {
  components: {
    Header,
    ProjectLink,
    PreviewOverlay
  },
  mixins: [MetaData],
  computed: {
    projects() {
      return this.$store.state.projects
    },
    metaData() {
      return this.$store.state.meta.pages.work
    }
  },
  async fetch({ store, params }) {
    if (store.state.workPageData !== null) {
      return false
    }

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
          query: getWorkPage
        }
      })
      .then(result => {
        let returnVal = result.data.data.readWorkPage

        if (returnVal.length === 1) {
          let data = returnVal[0]
          store.commit('menu/setMenuColour', data.HeroMenuColour)
          store.commit('updateWorkPageData', data)
          self.setupMeta(store, 'work', data)
        }
      })
  },

  mounted() {
    this.$store.commit('menu/setMenu', false)
    this.$store.commit('menu/setHamburger', true)
    this.$store.commit('menu/setMenuHidden', false)
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

  @import '~bulma/sass/utilities/initial-variables'
  @import '~bulma/sass/utilities/functions'
  @import '~bulma/sass/utilities/derived-variables'
  @import '~bulma/sass/utilities/mixins'


  .page-header.workpage-header
    height: auto
    min-height: 100vh

    .page-header__main-container
      min-height: 100vh
      height: auto

      .column
        margin-left: auto
        margin-right: auto
        height: auto

      .columns
        min-height: 100vh
        height: 100%

  .workpage-nav
    position: relative
    z-index: 3
    padding-top: rem(400)
    margin-bottom: rem(100)
    // top: 50%
    // left: 50%
    white-space: normal
    transform-origin: top center
    // transform: translateY(50%)
    // margin-bottom: 100%

  .preview-overlays
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%

    video
      object-fit: cover
      position: relative
      z-index: 0
</style>
