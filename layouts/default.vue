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
import Footer from '~/components/Footer'
import Menu from '~/components/Menu'

export default {
  components: {
    Menu,
    Footer
  }
}
</script>
