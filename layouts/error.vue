<template>
  <Header
    v-if="error.statusCode === 404"
    :titleBg="'000000'"
    :introductionBg="'000000'"
    :title="'Oops'"
    :introduction="''"
    :introductionClass="''"
    :isCentered="true"
    :pageClass="'page-error'">
    <p slot="introductionContent">
      This page doesn't exist. Stink. Maybe try the
      <nuxt-link
        :to="'/'"
        class="underline">
        homepage?
      </nuxt-link>
    </p>
  </Header>
</template>

<script>
import Header from '~/components/Header'
import Transition from '~/mixins/TransitionMixin'

export default {
  components: {
    Header
  },
  mixins: [Transition],
  props: {
    error: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  layout: 'default' // you can set a custom layout for the error page
}
</script>
<style lang="sass">
  .page-error
    .introduction
      display: flex
      flex-direction: row
      align-items: flex-end
      justify-content: center

      p
        margin-bottom: 60px
</style>
