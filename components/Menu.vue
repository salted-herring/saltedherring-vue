<template>
  <nav
    id="main-menu"
    :class="{ 'navbar--is-black': isBlack, 'navbar--is-white': isWhite }"
    class="navbar is-flex is-transparent is-fixed-top">
    <div
      class="navbar-brand">
      <nuxt-link
        class="navbar-item navbar-logo"
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
    <div
      class="navbar-menu">
      <Hamburger />
      <div
        :class="{'is-visible': isMenuVisible}"
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
      return this.$store.state.menu.color
    },
    isBlack() {
      return this.$store.state.menu.color === 'black'
    },
    isWhite() {
      return this.$store.state.menu.color === 'white'
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.onScroll, { passive: true })
  },
  mounted() {
    let colour = this.$store.state.menu.color
    this.$store.commit('menu/setMenuCurrentColour', colour)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onMouseOver: function(e) {
      this.$store.commit('menu/setHoveredText', e.target.innerHTML)
    },
    onMouseOut: function(e) {
      this.$store.commit('menu/setHoveredText', '')
    },
    onScroll(e) {}
  }
}
</script>
