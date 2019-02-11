<template>
  <nav
    id="main-menu"
    class="navbar is-flex is-transparent is-fixed-top">
    <div
      class="navbar-brand">
      <nuxt-link
        class="navbar-item navbar-logo"
        to="/">
        <img
          src="~assets/img/logo.svg"
          alt="Salted Herring logo"
          width="120">
      </nuxt-link>

    </div>
    <div
      class="navbar-menu">
      <Hamburger />
      <div
        :class="{'is-visible': isMenuVisible}"
        class="navbar-end"
        @mousemove="mouseMove">
        <div
          class="navbar-menu-outer">
          <nuxt-link
            v-for="(link, index) in links"
            :key="index"
            :to="link.Link"
            class="navbar-item"
            active-class="is-active"
            v-text="link.MenuTitle" />
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
    }
  },
  methods: {
    mouseMove(e) {
      if (
        e.target.classList.value.match(/navbar-end/g) === null ||
        this.$store.state.menu.menuHidden
      ) {
        return false
      }

      if (this.$store.state.menu.canHideMenu) {
        this.$store.commit('menu/setMenu', false)
        this.$store.commit('menu/setHamburger', true)
        this.$store.commit('menu/setCanHideMenu', false)
      }
    }
  }
}
</script>
