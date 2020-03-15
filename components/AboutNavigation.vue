<template>
  <nav
    class="about-navigation"
  >
    <nuxt-link
      v-for="(section, index) in sections"
      :key="index"
      :to="'#' + section.Slug"
      :class="{ 'is-active' : section.Slug === $store.state.aboutpage.activeSection }"
      :exact="true"
      :append="false">
      <span
        @click="click">{{ section.HeroTitle }}</span>
    </nuxt-link>
  </nav>
</template>
<script>
export default {
  props: {
    sections: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  mounted() {
    if (typeof window !== 'undefined') {
    }
  },
  methods: {
    click(e) {}
  }
}
</script>
<style lang="sass">
  .about-navigation
    position: absolute
    top: rem(90)
    left: 0
    z-index: 12
    width: 100%
    display: flex
    align-items: center
    justify-content: center

    +until($tablet)
      position: absolute
      overflow: hidden
      padding-top: rem(20)
      padding-left: rem(30)
      padding-right: rem(30)
      flex-wrap: wrap

    a
      color: $black
      font-weight: $weight-bold
      font-size: rem(18)
      line-height: 1em
      padding: rem(4) rem(4) rem(4) rem(8)
      // background: $picasso
      text-decoration: none
      position: relative

      &:before
        position: absolute
        bottom: 0
        left: 8px
        width: 0
        background: $black
        height: 2px
        display: block
        content: ''
        margin-right: rem(14)
        transition: width 0.25s

      +until($tablet)
        font-size: rem(16)
        background: none

      &:first-child
        padding-left: rem(4)

        &:hover
          &:before
            width: calc(100% - 24px)

        &:before
          left: 4px

      &:last-child
        &:after
          display: none

        &:hover
          &:before
            width: calc(100% - 14px)

      &:after
        padding-left: rem(10)
        content: '.'

      &:hover
        &:before
          width: calc(100% - 28px)

</style>
