<template>
  <nav
    id="main-menu"
    class="navbar is-transparent is-fixed-top">
    <div
      class="navbar-brand">
      <a
        class="navbar-item navbar-logo"
        href="/">
        <img
          src="~assets/img/logo.svg"
          alt="Salted Herring logo"
          width="120">
      </a>
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
          class="navbar-item" >
          <a
            v-for="(link, index) in links"
            :key="index"
            :href="link.Link"
            v-text="link.MenuTitle"
          />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
module.exports = {
  name: 'main-nav',
  computed: {
    links() {
      return this.$store.state.menu.menuItems
    }
  }
}
</script>
