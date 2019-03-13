<template>
  <nav
    class="about-navigation"
  >
    <nuxt-link
      v-for="(section, index) in sections"
      :key="index"
      :to="'#' + section.Slug"
      :class="{ 'is-active' : section.Slug === $store.state.aboutpage.activeSection }"
      :exact="true"
      :append="false">
      <span
        @click="click">{{ section.HeroTitle }}</span>
    </nuxt-link>
  </nav>
</template>
<script>
export default {
  props: {
    sections: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  mounted() {
    if (typeof window !== 'undefined') {
    }
  },
  methods: {
    click(e) {}
  }
}
</script>
<style lang="sass">
  /// Config
  @import "~assets/sass/config/colours"
  @import "~assets/sass/config/bulma-variables"
  @import "~assets/sass/imports/mixins"
  @import "~bulma/sass/utilities/mixins"

  .about-navigation
    position: fixed
    top: rem(90)
    left: 0
    width: 100%
    z-index: 100
    display: flex
    align-items: center
    justify-content: center

    a
      color: $black
      font-weight: $weight-bold
      font-size: rem(24)
      line-height: 1em
      padding: rem(4) rem(4) rem(4) rem(8)
      background: $picasso

      &:first-child
        padding-left: rem(4)

      &:after
        content: '.'

      &:last-child
        &:after
          content: ''

      &:hover
      &.nuxt-link-active
        text-decoration: underline

</style>
