<template>
  <div class="project-page">
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
        <div
          v-for="(image, index) in headerImages"
          :key="index"
          class="hero-images">
          <div
            :style="{ 'background-image': 'url(' + image.FitFullScreen + ')' }"
            class="hero-images__image" />
        </div>
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
import Header from '~/components/Header'
import ProjectLink from '~/components/ProjectLink'
import getProject from '~/apollo/queries/projectpage'
import readBlocks from '~/apollo/queries/readBlocks'

export default {
  components: {
    Header,
    ProjectLink
  },
  computed: {
    headerImages() {
      let images = []
      if (this.$store.state.currentProject !== null) {
        images = this.$store.state.currentProject.HeroImages
      }
      return images
    },
    headerVideo() {
      let video = null
      let project = this.$store.state.currentProject
      if (project !== null) {
        if (project.HeroVideo.id !== 0) {
          video = project.HeroVideo
        }
      }
      return images
    },
    hasVideo() {
      return (
        this.$store.state.currentProject &&
        this.$store.state.currentProject.HeroVideo.id !== 0
      )
    },
    currentProject() {
      return this.$store.state.currentProject
    }
  },
  async fetch({ store, params }) {
    let slug = params.slug
    // console.log(store.app)
    // store.app.nuxt.$loading.start()
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
          store.app
            .$axios({
              url: '/graphql/',
              method: 'post',
              data: {
                query: readBlocks,
                variables: {
                  urlSegment: slug
                }
              }
            })
            .then(result => {
              // console.log(result.data.data.readWorkPage)
              let blocks = result.data.data.readContentBlocks

              let project = projects[0]
              project.Blocks = blocks

              store.commit('updateProject', project)
            })
        }
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

  .hero-images
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%

    &__image
      display: block
      width: 100%
      height: 100%
      background-size: cover
      background-position: center top

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

  .related-projects
    .page-introduction
      position: absolute
      left: 50%
      top: 25%
      transform: translate(-50%, -25%)

    nav
      margin-top: rem(300)

</style>
