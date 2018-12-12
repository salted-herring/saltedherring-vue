<template>
  <main aria-role="main">
    <Menu/>
    <nuxt/>
  </main>
</template>

<script>
import Menu from '~/components/Menu.vue'

export default {
  components: {
    Menu
  }
}
</script>
