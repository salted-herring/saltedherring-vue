<template>
  <div class="main-container is-flex flex-direction-column">
    <Menu/>
    <main aria-role="main flex-grow-contents">
      <nuxt/>
    </main>
    <Footer/>
  </div>
</template>

<script>
import Menu from '~/components/Menu.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Menu,
    Footer
  }
}
</script>
