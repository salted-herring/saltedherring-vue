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
        class="hero-section">
        <video
          v-if="headerVideo.video !== null"
          :src="headerVideo.video"
          :poster="headerVideo.poster"
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
      <div class="container">
        <div class="columns">
          <aside class="column is-3">
            <div
              v-if="currentProject.Services"
              class="project-tags">
              <span class="project-tags__label">Services</span>
              <div
                class="cms-content"
                v-html="currentProject.Services"/>
            </div>
            <div
              v-if="currentProject.Recognition"
              class="project-tags">
              <span class="project-tags__label">Recognition</span>
              <div
                class="cms-content"
                v-html="currentProject.Recognition"/>
            </div>
          </aside>

          <div
            class="column project-summary is-7"
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
    <section
      v-if="currentProject.RelatedProjects.length > 0"
      class="section related-projects has-background-robins-egg">
      <span
        class="page-introduction"
        v-html="currentProject.RelatedProjectsTitle"/>
      <nav>
        <ProjectLink
          v-for="(link, index) in currentProject.RelatedProjects"
          :key="index"
          :link="link.Link"
          :label="link.MenuTitle"/>
      </nav>
    </section>
  </div>
</template>
<script>
import getProject from '~/apollo/queries/projectpage'
import readBlocks from '~/apollo/queries/readBlocks'

import Header from '~/components/Header'
import ProjectLink from '~/components/ProjectLink'
import ImageBlock from '~/components/ImageBlock'
import TextBlock from '~/components/TextBlock'
import VideoBlock from '~/components/VideoBlock'

let Carousel = null

if (process.client) {
  Carousel = require('vue-owl-carousel')
}

export default {
  components: {
    Header,
    ImageBlock,
    ProjectLink,
    TextBlock,
    VideoBlock,
    Carousel
  },
  computed: {
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
          let match = video.match(/(https?:\/\/[^\/]+)(.*)/)

          if (match !== null) {
            video = match[2]
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
    }
  },
  async fetch({ store, params }) {
    let slug = params.slug
    let currentProject = null

    return store.app
      .$axios({
        url: '/graphql/',
        method: 'post',
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
          store.commit('updateProject', projects[0])
        }

        return store.app.$axios({
          url: '/graphql/',
          method: 'post',
          data: {
            query: readBlocks,
            variables: {
              urlSegment: slug
            }
          }
        })
      })
      .then(result => {
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

  .hero-section
    position: fixed
    top: 0
    left: 0
    width: 100vw
    height: 100vh
    z-index: -1

  .hero-video
    position: absolute
    left: 0
    top: 0
    // width: 100%
    height: 100%
    width: auto
    min-width: 100%
    object-fit: cover

  .hero-images
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%

    &__image
      display: none
      width: 100%
      height: 100%
      background-size: cover
      background-position: left top

      &:first-child
        display: block


    @import '~assets/sass/plugins/owl-carousel'

  .project-introduction
    padding-top: rem(150)
    padding-bottom: 0

  .project-summary
    font-weight: $weight-bold
    font-size: rem(36)
    line-height: em(40, 36)

  .project-tags
    font-size: rem(24)

    &:first-child
      margin-bottom: rem(90)

    &__label
      font-weight: $weight-bold

    a
      color: $black
      text-decoration: underline

      &:hover
        text-decoration: none

  .project-header
    .page-header__main-container
      .page-introduction
        font-weight: $weight-bold
        font-size: rem(60)
        top: rem(200)

    .background-text
      top: 50%
      transform: translate(-50%, -50%) rotate(-5deg) skew(-5deg)

  .related-projects
    .page-introduction
      position: absolute
      left: 50%
      top: 25%
      transform: translate(-50%, -25%)

    nav
      margin-top: rem(300)

</style>