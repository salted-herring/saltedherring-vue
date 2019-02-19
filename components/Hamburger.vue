<template>
  <a
    :class="{ 'is-active': active, 'is-hidden': isHamburgerHidden }"
    class="hamburger hamburger--minus js-hamburger"
    role="button"
    @click="toggleActive"
    @mouseover="mouseOver">
    <span class="hamburger-box">
      <span class="hamburger-inner" />
    </span>
  </a>
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
    isHamburgerHidden() {
      if (this.$store.state.menu.menuHidden) {
        return true
      }

      return !this.$store.state.menu.hamburgerVisible
    }
  },
  methods: {
    toggleActive: function(e) {
      e.preventDefault()
      this.active = !this.active
    },
    mouseOver() {
      if (this.$store.state.menu.menuHidden) {
        return false
      }

      this.$store.commit('menu/setMenu', true)
      this.$store.commit('menu/setHamburger', false)
      // wait until menu item is visible before allowing it to be closed
      let self = this
      setTimeout(function() {
        self.$store.commit('menu/setCanHideMenu', true)
      }, 125)
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

    +tablet
      right: rem(30)
      top: rem(40)


    .hamburger-box
      transition: width 0.125s ease
      transform: rotate(-5deg) skew(-5deg)
      transform-origin: right top

    &.is-hidden
      display: block !important

      .hamburger-box
        width: 0
        overflow: hidden
</style>
