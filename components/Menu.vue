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
      return this.$store.state.menu.menuVisible
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
    onScroll(e) {
      // let doc = document.documentElement
      // let left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)
      // let top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
      //
      // let height = window.innerHeight - 60
      //
      // if (top >= height) {
      //   // change to black
      //   this.$store.commit('menu/setMenuColour', 'black')
      // } else {
      //   // back to original - be it white or black.
      //   this.$store.commit(
      //     'menu/setMenuColour',
      //     this.$store.state.menu.currentColor
      //   )
      // }
    }
  }
}
</script>
