<template>
  <nav
    id="main-menu"
    class="navbar is-transparent is-fixed-top">
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
      <div
        class="navbar-burger burger">
        <span/>
        <span/>
        <span/>
      </div>
    </div>
    <div
      class="navbar-menu">
      <div
        class="navbar-end">
        <div
          v-for="(link, index) in links"
          :key="index"
          class="navbar-item">
          <router-link
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
export default {
  name: 'MainNav',
  computed: {
    links() {
      return this.$store.state.menu.menuItems
    }
  }
}
</script>
