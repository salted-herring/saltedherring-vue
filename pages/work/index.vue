<template>
  <div class="work-page">
    <ProjectNavigation
      :title="$store.state.workPageData.Introduction"
      :projects="projects"
      :css-variants="'workpage-nav'"
      :background-text="$store.state.workPageData.HeroTitle"
    />

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
            rel="noopener"
            class="awards-programme__link">{{ programme.title }}</a>

          <div class="columns">
            <div
              v-for="(award, i) in programme.awards"
              :key="i"
              class="column award is-3">
              <div class="award__image">
                <LazyImage
                  :lazy-src="award.Image"
                  :width="award.ImageWidth"
                  :height="award.ImageHeight"
                  :background-color="$store.state.awards.backgroundColour"
                />
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
              <LazyImage
                v-if="client.Thumbnail"
                :lazy-src="client.Thumbnail"
                :width="client.ThumbnailWidth"
                :height="client.ThumbnailHeight"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import getWorkPage from '~/apollo/queries/workpage'

import Header from '~/components/Header'
import LazyImage from '~/components/LazyLoadImage'
import ProjectNavigation from '~/components/ProjectNavigation'

import Meta from '~/mixins/MetaMixin'
import PageState from '~/mixins/PageState'
import Transition from '~/mixins/TransitionMixin'

export default {
  components: {
    Header,
    LazyImage,
    ProjectNavigation
  },
  mixins: [Meta, PageState, Transition],
  computed: {
    projects() {
      return this.$store.state.projects.sorted
    },
    metaData() {
      return this.$store.state.meta.pages.work
    }
  },
  asyncData({ store, params }) {
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
          store.commit('meta/setupMeta', { slug: 'work', data: data })
        }
      })
  },

  mounted() {
    this.$store.commit('menu/setMenu', false)
    this.$store.commit('menu/setHamburger', false)
    // this.$store.commit('menu/setMenuHidden', false)
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

  .work-page
    .section
      position: relative
      z-index: 4

    .background-text
      color: $white
      z-index: -1

  .page-header.workpage-header
    height: auto
    min-height: 100vh
    z-index: 4

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
    padding-top: rem(400)
    padding-bottom: 50vh
    white-space: normal
    transform-origin: top center

    &.is-hovered
      a
        color: rgba($white, 0.3)

        &:hover
          color: $white

        span
          &:after
            background: rgba($white, 0.3)
</style>
