<template>
  <div class="main-container is-flex flex-direction-column">
    <Menu/>
    <main
      id="main-container"
      aria-role="main flex-grow-contents">
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
  },
  created() {
    if (process.browser) {
      window.addEventListener('scroll', this.defaultScroll, { passive: true })
    }
  },
  destroyed() {
    if (process.browser) {
      window.removeEventListener('scroll', this.defaultScroll)
    }
  },
  methods: {
    defaultScroll() {
      let firstSection = document.querySelector(
        '#main-container section.section:first-of-type'
      )

      if (firstSection === null) {
        return false
      }

      let sectionTop = firstSection.getBoundingClientRect().top
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop
      let screenWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth

      if (screenWidth <= 1024) {
        this.$store.commit('menu/setmenuScrolledIntoView', true)
        return
      }

      if (sectionTop <= 0) {
        this.$store.commit('menu/setMenuColour', 'black')
        this.$store.commit('menu/setmenuScrolledIntoView', true)
      }

      if (scrollTop === 0) {
        let colour = this.$store.state.menu.currentColor
        this.$store.commit('menu/setMenuColour', colour)
        this.$store.commit('menu/setmenuScrolledIntoView', false)
        this.$store.commit('menu/setMenuClicked', false)
      }
    }
  }
}
</script>
