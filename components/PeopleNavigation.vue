<template>
  <div
    class="people-navigation">
    <div
      class="project-navigation__nav">
      <nav>
        <ProjectLink
          v-for="(link, index) in people"
          :key="index"
          :id="link.URLSegment"
          :link="link.Link"
          :label="link.MenuTitle" />
      </nav>
    </div>
  </div>
</template>
<script>
import getPeoplePage from '~/apollo/queries/peoplepage'

import ProjectLink from '~/components/ProjectLink'

export default {
  components: {
    ProjectLink
  },
  props: {
    people: {
      type: Array,
      default: function() {
        return []
      }
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
  @import '~bulma/sass/utilities/mixins'

  .people-navigation
    padding-top: rem(100)
    padding-bottom: rem(100)

    .nuxt-link-active
      color: $white
      pointer-events: none

      span
        &:after
          display: none
</style>
