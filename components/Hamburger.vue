<template>
  <button
    :class="{ 'is-active': active, 'is-visible': isVisible }"
    class="hamburger hamburger--minus js-hamburger"
    role="button"
    @click="toggleActive">
    <span class="hamburger-box">
      <span class="hamburger-inner" />
    </span>
  </button>
</template>
<script>
export default {
  name: 'Hamburger',
  data: function() {
    return {
      active: false
    }
  },
  computed: {
    isVisible() {
      if (!this.$store.state.menu.menuScrolledIntoView) {
        return false
      } else {
        if (this.$store.state.menu.menuClicked) {
          return false
        }
      }

      return true
    }
  },
  methods: {
    toggleActive() {
      this.$store.commit('menu/setMenuClicked')
    }
  }
}
</script>
<style lang="sass" scoped>
  /// Config
  @import "~assets/sass/config/bulma-variables"
  @import "~assets/sass/imports/mixins"
  @import "~bulma/sass/utilities/mixins"

  $hamburger-layer-border-radius: 0
  $hamburger-layer-height: 5px
  $hamburger-padding-x: 0px
  $hamburger-padding-y: 0px

  @import '~hamburgers/_sass/hamburgers/hamburgers'

  .hamburger
    margin-left: auto
    cursor: pointer
    align-self: center
    position: absolute
    right: rem(0)
    opacity: 0
    transition: none
    z-index: 2
    transform: scale(1.5)
    transform-origin: top right

    &.is-visible
      opacity: 1
      transform: scale(1)
      transition: all 0.125s

    +tablet
      right: rem(30)
      top: rem(40)

    .hamburger-box
      transition: width 0.125s ease
      transform: rotate(-5deg) skew(-5deg)
      transform-origin: right top
</style>
