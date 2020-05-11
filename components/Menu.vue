<template>
  <nav
    id="main-menu"
    :class="{ 'navbar--is-black': isBlack, 'navbar--is-white': isWhite, 'navbar--is-active': isClicked }"
    class="navbar is-flex is-transparent is-fixed-top">
    <div
      class="navbar-brand">
      <div class="navbar-item navbar-logo">
        <nuxt-link
          to="/">
          <img
            v-if="isBlack"
            src="~/static/img/logo.svg"
            alt="Salted Herring logo"
            width="120">
          <img
            v-else-if="isWhite"
            src="~/static/img/logo-white.svg"
            alt="Salted Herring logo"
            width="120">
        </nuxt-link>
      </div>
    </div>
    <button
      :class="{ 'close-item--is-black': isBlack, 'close-item--is-white': isWhite, 'is-visible' : isChildPage }"
      class="close-item"
      @click="closeChildPage">
      close
    </button>
    <div
      :class="{ 'is-visible' : !isChildPage }"
      class="navbar-menu">
      <Hamburger />
      <div
        :class="{ 'is-visible': isMenuVisible, 'is-clicked': isClicked }"
        class="navbar-end">
        <div
          class="navbar-menu-outer">
          <nuxt-link
            v-for="(link, index) in links"
            :key="index"
            :to="link.Link"
            class="navbar-item"
            active-class="is-active">
            <div
              @mouseover="onMouseOver"
              @mouseout="onMouseOut"
              v-text="link.MenuTitle" />
          </nuxt-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Hamburger from '~/components/Hamburger.vue'

export default {
  name: 'MainNav',
  components: {
    Hamburger
  },
  computed: {
    links() {
      return this.$store.state.menu.menuItems
    },
    isMenuVisible() {
      if (!this.$store.state.menu.menuScrolledIntoView) {
        if (!this.$store.state.menu.menuClicked) {
          return true
        }

        return false
      } else {
        if (this.$store.state.menu.menuClicked) {
          return true
        }
      }

      return false
    },
    menuColour() {
      return this.$store.state.menu.currentColor
    },
    isBlack() {
      return this.$store.state.menu.currentColor === 'black'
    },
    isWhite() {
      return this.$store.state.menu.currentColor === 'white'
    },
    isChildPage() {
      let parts = this.$route.path.replace(/^\/+|\/+$/g, '').split('/')
      return parts.length > 1
    },
    isClicked() {
      return this.$store.state.menu.menuClicked
    }
  },
  methods: {
    onMouseOver: function(e) {
      this.$store.commit('menu/setHoveredText', e.target.innerHTML)
    },
    onMouseOut: function(e) {
      this.$store.commit('menu/setHoveredText', '')
    },
    closeChildPage: function(e) {
      let parts = this.$route.path.replace(/^\/+|\/+$/g, '').split('/')

      if (parts.length > 1) {
        let url = '/'
        for (let i = 0; i < parts.length - 1; i++) {
          url += parts[i] + '/'
        }

        this.$router.push(url)
      }
    }
  }
}
</script>
<style lang="sass">
  /// Config
  @import "~assets/sass/config/colours"
  @import "~assets/sass/config/bulma-variables"
  @import "~assets/sass/imports/mixins"
  @import "~assets/sass/mixins/bulma-mixins"

  .close-item
    position: absolute
    right: rem(60px)
    top: rem(80px)
    width: rem(44px)
    height: rem(44px)
    z-index: 1000
    pointer-events: all
    cursor: pointer
    display: none
    appearance: none
    border: none
    outline: none
    background: none
    text-indent: -10000px
    font-size: 0
    line-height: 0

    +mobile
      top: rem(30)
      right: rem(30)

    &:before,
    &:after
      position: absolute
      top: 50%
      left: 50%
      width: rem(62px)
      height: rem(4px)
      display: block
      content: ''
      background: $black
      transform-origin: center
      transition: all 0.15s cubic-bezier(0.77, 0, 0.175, 1)

    &--is-white
      &:before,
      &:after
        background: $white

    &:before
      transform: translate(-50%, -50%) rotate(45deg)

    &:after
      transform: translate(-50%, -50%) rotate(-45deg)

    &:hover
      &:before,
      &:after
        width: rem(30)

      &:before
        transform: translate(-50%, -50%) rotate(0deg)

      &:after
        transform: translate(-50%, -50%) rotate(0deg)

    &.is-visible
      display: block
</style>
