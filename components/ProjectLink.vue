<template>
  <nuxt-link
    :to="link"
    :class="{ 'is-hovered': isHovered }"
    class="project-link">
    <div
      @mouseover="mouseOver"
      v-html="labelText" />
  </nuxt-link>
</template>
<script>
export default {
  name: 'ProjectLink',
  props: {
    link: {
      type: String,
      default: '/'
    },
    label: {
      type: String,
      default: ''
    },
    ignoreHoveredState: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  },
  computed: {
    labelText() {
      let text = this.label
      let splitLabel = text.trim().split(/\s/)
      let outputLabel = ''

      for (let i in splitLabel) {
        let a = splitLabel[i]

        outputLabel += '<span>' + a + '</span>'

        if (i < splitLabel.length - 1) {
          outputLabel += '<span>&nbsp;</span>'
        }
      }

      return outputLabel
    },
    isHovered() {
      return (
        this.ignoreHoveredState === false &&
        this.$store.state.workpage.hoveredItem === this.id
      )
    }
  },
  methods: {
    mouseOver() {
      this.$store.commit('workpage/updateHoveredItem', this.id)
      this.$store.commit('pagestate/updatebackgroundTextOpaque', false)
    }
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
  @import '~bulma/sass/utilities/derived-variables'
  @import '~bulma/sass/utilities/mixins'

  a.project-link
    font-weight: $weight-black
    color: $black
    display: table
    font-size: rem(72)
    line-height: em(90, 72)
    text-decoration: none
    text-align: center
    position: relative
    left: 50%
    transform: translateX(-50%) rotate(-5deg) skew(-5deg)

    &:hover
        span
          &:after
            width: 0

    &.is-hovered
      color: $white !important

      &:hover
        span
          &:after
            width: 100%

      span
        &:after
          background: $white !important

    span
      display: inline-block
      position: relative

      &:after
          position: absolute
          left: 0
          bottom: 1px
          width: 100%
          height: rem(5)
          background: $black
          content: ''
          display: block
</style>
