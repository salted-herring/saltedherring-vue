<template>
  <div
    v-if="currentProject !== null"
    class="project-page">
    <Header
      :titleBg="currentProject.TitleColour.Colour"
      :introductionBg="currentProject.TitleColour.Colour"
      :title="currentProject.Title"
      :introduction="currentProject.Introduction"
      :introductionClass="''"
      :introductionVariation="'page-thing'"
      :isCentered="true"
      :pageClass="'project-header'">
      <div
        slot="background"
        :style="heroStyle"
        :class="heroClass"
        class="hero-section">
        <video
          v-if="headerVideo.video !== null"
          ref="headerVideo"
          :data-src="headerVideo.video"
          :data-poster="headerVideo.poster"
          :class="heroClass"
          data-toggle-class="active"
          muted
          autoplay
          loop
          width="100%"
          class="hero-video" />
        <Carousel
          v-else-if="headerImages.length > 1"
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
          :style="{ 'background-image': 'url(' + image.FitFullScreen + ')' }"
          class="hero-images__image" />
      </div>
    </Header>
    <section class="section project-introduction has-background-light">
      <div class="container content-container">
        <div class="columns">
          <aside class="column is-3">
            <div
              v-if="currentProject.Services"
              class="project-tags">
              <div
                class="cms-content cms-content--small"
                v-html="currentProject.Services"/>
            </div>
            <div
              v-if="currentProject.Recognition"
              class="project-tags">
              <div
                class="cms-content cms-content--small"
                v-html="currentProject.Recognition"/>
            </div>
          </aside>

          <div
            class="column project-summary is-6"
            v-html="currentProject.Summary" />
        </div>
      </div>
    </section>
    <section class="section section--no-padding project-blocks">
      <template
        v-for="(block, index) in currentProject.ContentBlocks">
        <TextBlock
          v-if="block.__typename === 'TextBlock'"
          :key="index"
          :details="block" />
        <VideoBlock
          v-if="block.__typename === 'VideoBlock'"
          :key="index"
          :details="block" />
        <ImageBlock
          v-if="block.__typename === 'ImageBlock'"
          :key="index"
          :details="block" />
      </template>
    </section>
    <ProjectNavigation
      v-if="currentProject.RelatedProjects.sorted.length > 0"
      :css-variants="'section related-projects'"
      :title="currentProject.RelatedProjectsTitle"
      :projects="currentProject.RelatedProjects.sorted"
    />
  </div>
</template>
<script>
import lozad from 'lozad'

import getProject from '~/apollo/queries/projectpage'
import readBlocks from '~/apollo/queries/readBlocks'

import Carousel from '~/components/Carousel'
import Header from '~/components/Header'
import ImageBlock from '~/components/ImageBlock'
import LazyImage from '~/components/LazyLoadImage'
import TextBlock from '~/components/TextBlock'
import VideoBlock from '~/components/VideoBlock'
import ProjectNavigation from '~/components/ProjectNavigation'

import Meta from '~/mixins/MetaMixin'
import PageState from '~/mixins/PageState'
import Transition from '~/mixins/TransitionMixin'

export default {
  components: {
    Carousel,
    Header,
    ImageBlock,
    LazyImage,
    TextBlock,
    VideoBlock,
    ProjectNavigation
  },
  mixins: [Meta, PageState, Transition],
  props: {
    isLoaded: {
      type: Boolean,
      default: false
    }
  },
  scrollToTop: false,
  computed: {
    heroClass() {
      return this.isLoaded ? 'is-loaded' : ''
    },
    heroStyle() {
      let styles = {}
      if (
        this.currentProject.BackgroundColour !== null &&
        this.currentProject.BackgroundColour.Colour !== null
      ) {
        styles.backgroundColor =
          '#' + this.currentProject.BackgroundColour.Colour
      }

      if (this.headerVideo.video !== null && this.headerVideo.poster !== null) {
        styles.backgroundImage = 'url(' + this.headerVideo.poster + ')'
      } else if (this.headerImages.length > 1) {
        styles.backgroundImage =
          'url(' + project.HeroImages[0].FitFullScreen + ')'
      }

      return styles
    },
    headerImages() {
      let images = []
      if (this.currentProject !== null) {
        images = this.currentProject.HeroImages
      }
      return images
    },
    headerVideo() {
      let video = null
      let image = null
      let project = this.currentProject

      if (project !== null) {
        if (project.HeroVideo.id !== 0) {
          video = project.HeroVideo.url

          if (video !== null) {
            let match = video.match(/(https?:\/\/[^\/]+)(.*)/)

            if (match !== null) {
              video = match[2]
            }
          }
        }

        if (project.HeroImages.length != 0) {
          image = project.HeroImages[0].FitFullScreen
        }
      }

      return {
        video: video,
        poster: image
      }
    },
    hasVideo() {
      return this.currentProject && this.currentProject.HeroVideo.id !== 0
    },
    currentProject() {
      return this.$store.getters.getCurrentProject
    },
    metaData() {
      return this.$store.state.meta.pages[
        this.$store.getters.getCurrentProject.URLSegment
      ]
    }
  },
  mounted() {
    if (typeof this.$refs['headerVideo'] === 'undefined') {
      return
    }

    const setLoadingState = () => {
      this.isLoaded = true
    }

    this.$refs['headerVideo'].addEventListener('load', setLoadingState)

    this.$once('hook:destroyed', () => {
      if (typeof this.$refs['headerVideo'] === 'undefined') {
        return
      }

      this.$refs['headerVideo'].removeEventListener('load', setLoadingState)
    })

    const observer = lozad(this.$refs['headerVideo'])
    observer.observe()
  },
  asyncData({ store, req, res, params, error }) {
    let slug = params.slug
    let currentProject = null
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
          query: getProject,
          variables: {
            urlSegment: slug
          }
        }
      })
      .then(result => {
        let projects = result.data.data.readProject

        if (projects.length === 1) {
          currentProject = projects[0]
          store.commit('updateProject', currentProject)
          store.commit('menu/setMenuColour', currentProject.HeroMenuColour)
          store.commit('meta/setupMeta', { slug: slug, data: currentProject })
        } else {
          error({ statusCode: 404, message: 'Project not found' })
        }

        return store.app.$axios({
          url: '/graphql/',
          method: 'post',
          withCredentials: true,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          data: {
            query: readBlocks,
            variables: {
              urlSegment: slug
            }
          }
        })
      })
      .then(result => {
        if (currentProject === null) {
          return error({ statusCode: 404, message: 'Project not found' })
        }

        store.commit('updateProjectBlocks', {
          projectId: currentProject.URLSegment,
          blocks: result.data.data.readContentBlocks.edges
        })
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

  .project-introduction
    padding-top: rem(150)
    padding-bottom: rem(0)

    +until($desktop)
      .columns
        display: flex
        flex-direction: column
        align-items: center
        padding-left: rem(100)
        padding-right: rem(100)

        aside,
        .project-summary
          width: 100%
          max-width: rem(900)
          padding-left: 0
          padding-right: 0

        aside
          order: 1
          margin-top: rem(40)
          display: flex

          .project-tags
            width: 50%

    +mobile
      padding-top: rem(40)

      .columns
        display: flex
        flex-direction: column
        align-items: center
        padding-left: rem(30)
        padding-right: rem(30)

        aside,
        .project-summary
          width: 100%
          max-width: rem(900)

        aside
          order: 2
          margin-top: rem(40)
          display: block

          .project-tags
            width: 100%
            margin-bottom: rem(20)

  .project-summary
    font-weight: $weight-bold
    font-size: rem(36)
    line-height: em(40, 36)
    padding-bottom: rem(40)

    +until($widescreen)
      font-size: rem(28)
      line-height: em(36, 28)

  .project-tags
    font-size: rem(18)
    margin-bottom: rem(40)

    +widescreen
      font-size: rem(16)
      line-height: em(22, 16)
    +fullhd
      font-size: rem(18)

    &__label
      font-weight: $weight-bold

    a
      color: $black
      text-decoration: underline

      &:hover
        text-decoration: none

    p
      &:last-child
        margin-bottom: 0

  .project-header
    .page-header__main-container
      .page-introduction
        font-weight: $weight-bold
        font-size: rem(28)
        top: rem(180)

        +mobile
          font-size: rem(24)

        +desktop-only
          top: rem(250)

        +widescreen
          font-size: rem(36)
          top: rem(220)

        +fullhd
          font-size: rem(48)

    .background-text
      top: 50%
      transform-origin: top center
      transform: translate(-50%, -50%) rotate(-5deg) skew(-5deg) translate3d(0, 0, 0)
      backface-visibility: hidden
      display: inline-block
      white-space: normal
      line-height: 1em
      font-size: rem(200)
      width: auto

      +until($desktop)
        font-size: rem(120)

      +mobile
        font-size: rem(60)

  .related-projects
    padding: rem(100) 0
    position: relative
    z-index: 4
    min-height: 100vh

    .page-introduction
      margin-bottom: rem(40)
</style>
