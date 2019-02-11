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
import Footer from '~/components/Footer.vue'
import Menu from '~/components/Menu.vue'

export default {
  components: {
    Menu,
    Footer
  }
}
</script>
