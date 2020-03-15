<template>
  <div
    class="project-navigation">
    <section
      :class="cssVariants"
      class="project-navigation__nav">
      <span
        :class="introVariant"
        class="page-introduction"
        v-html="title"/>
      <nav
        :class="{ 'is-hovered' : isNotOpaque }">
        <ProjectLink
          v-for="(link, index) in projects"
          :key="index"
          :id="link.URLSegment"
          :link="link.Link"
          :label="link.MenuTitle" />
      </nav>

      <BackgroundText
        v-if="backgroundText !== ''"
        :title="backgroundText"
        :class="{ 'background-text--is-not-opaque': isNotOpaque }"
        class="background-text" />
    </section>

    <div
      class="preview-overlays">
      <PreviewOverlay
        v-for="project in projects"
        :key="project.URLSegment"
        :id="project.URLSegment"
        :video="project.PreviewVideo"
        :image="project.PreviewImage" />
    </div>
  </div>
</template>
<script>
import BackgroundText from '~/components/BackgroundText'
import ProjectLink from '~/components/ProjectLink'
import PreviewOverlay from '~/components/PreviewOverlay'

export default {
  components: {
    BackgroundText,
    ProjectLink,
    PreviewOverlay
  },
  props: {
    backgroundText: {
      type: String,
      default: ''
    },
    projects: {
      type: Array,
      default: function() {
        return []
      }
    },
    cssVariants: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    isNotOpaque() {
      return !this.$store.state.pagestate.backgroundTextOpaque
    },
    introVariant() {
      let css = []

      if (!this.$store.state.pagestate.backgroundTextOpaque) {
        css.push('page-introduction--is-not-opaque')
      }

      return css.join(' ')
    }
  }
}
</script>
<style lang="sass">
  .page-introduction
    &--is-not-opaque
      color: $white

  .project-navigation
    clip: rect(0, auto, auto, 0)
    position: relative

    &:after
      display: block
      content: ''
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      z-index: 2
      background-color: $robins-egg


    &__nav
      position: relative
      z-index: 4

      nav
        &.is-hovered
          a.is-hovered
            opacity: 1
          a
            opacity: 0.1

  .preview-overlays
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    pointer-events: none
    z-index: 3
</style>
