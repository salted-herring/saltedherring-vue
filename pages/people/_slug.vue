<template>
  <div class="person-page">
    <generic-header
      :title="person.Title"
      :title-bg="person.TitleColour.Colour"
      :header-bg="person.BackgroundColour.Colour"
      :page-class="'person-header'"
      :header-images="headerImages"
      :outside-container-class="'cms-content'"
      :outside-container="person.Introduction" />
    <div
      :style="{ 'background-color': '#' + person.BackgroundColour.Colour }"
      class="person-content">
      <div class="container">
        <div class="columns is-centered">
          <div
            class="column person-content__content is-8 cms-content"
            v-html="person.Content"/>
        </div>
      </div>
      <Navigation
        :people="people" />
    </div>
  </div>
</template>
<script>
import getPeoplePage from '~/apollo/queries/peoplepage'
import getPersonPage from '~/apollo/queries/personpage'

import Meta from '~/mixins/MetaMixin'
import PageState from '~/mixins/PageState'
import Transition from '~/mixins/TransitionMixin'

import GenericHeader from '~/components/GenericHeader'
import Navigation from '~/components/PeopleNavigation'

export default {
  components: { GenericHeader, Navigation },
  mixins: [Meta, PageState, Transition],
  computed: {
    person() {
      let person = this.$store.state.peoplepage.people[this.$route.params.slug]

      if (typeof person === 'undefined') {
        person = {
          Title: '',
          Introduction: '',
          TitleColour: {
            Colour: ''
          },
          BackgroundColour: {
            Colour: ''
          }
        }
      }

      return person
    },
    headerImages() {
      let person = this.$store.state.peoplepage.people[this.$route.params.slug]

      return person.HeroImages
    },
    metaData() {
      return this.$store.state.meta.pages['people-' + this.$route.params.slug]
    },
    people() {
      return this.$store.state.peoplepage.people.sorted
    }
  },
  asyncData({ store, params, error }) {
    let slug = params.slug

    if (
      slug in store.state.peoplepage.people &&
      'FullRecord' in store.state.peoplepage.people[slug]
    ) {
      return false
    }

    return store.app
      .$axios({
        url: '/graphql/',
        method: 'post',
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        data: {
          query: getPersonPage,
          variables: {
            urlSegment: slug
          }
        }
      })
      .then(result => {
        let returnVal = result.data.data.readPerson

        if (returnVal.length === 1) {
          store.commit('peoplepage/updatePerson', {
            slug: slug,
            data: returnVal[0]
          })
          store.commit('meta/setupMeta', {
            slug: 'people-' + slug,
            data: returnVal[0]
          })
        } else {
          error({ statusCode: 404, message: 'Person not found' })
        }

        let peoplepage = store.state.peoplepage.peoplepage

        if (Object.keys(peoplepage).length === 0) {
          return store.app.$axios({
            url: '/graphql/',
            method: 'post',
            withCredentials: true,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            data: {
              query: getPeoplePage
            }
          })
        }
      })
      .then(result => {
        if (typeof result === 'undefined') {
          return false
        }

        let returnVal = result.data.data.readPeoplePage
        //
        if (returnVal.length === 1) {
          let data = returnVal[0]
          store.commit('peoplepage/updatePeoplePageState', data)
          store.commit('meta/setupMeta', { slug: 'people', data: data })
        }
      })
  }
}
</script>
<style lang="sass">
  @import '~assets/sass/config/bulma-variables'
  @import '~assets/sass/config/colours'
  @import '~assets/sass/config/fonts'
  @import '~assets/sass/config/typography'
  @import '~assets/sass/imports/mixins'
  @import '~assets/sass/imports/bulma-overrides'
  @import '~bulma/sass/utilities/mixins'
  .person-header
    position: unset
    &.is-hovered
      .background-text
        opacity: 0.1

    .container
      position: unset
      z-index: 10

    .introduction
      display: flex
      align-items: flex-end
      justify-content: flex-end

      p
        font-size: inherit
        font-weight: inherit
        line-height: inherit
        font-style: inherit

    .background-text
      z-index: 1
      margin-top: rem(100)

    .hero-images
      z-index: 0

      +touch
        &:before
          content: ''
          position: absolute
          bottom: 0
          left: 0
          width: 100%
          height: rem(200)
          background: linear-gradient(to bottom, rgba($black, 0) 0%, rgba($black, 0.5) 70%, rgba($black, 1) 100%)
          opacity: 0.5
          display: block
          z-index: 1

      &__image
        background-blend-mode: unset

    .outside-container
      position: fixed
      top: 50%
      right: rem(100)
      transform: translateY(-50%)
      padding: 0
      z-index: 12
      max-width: rem(300)

      +touch
        position: relative
        top: 0
        right: 0
        max-width: 100%
        transform: none
        text-align: center
        margin-top: rem(-60) !important
        padding: 0 rem(60)

        h1,
        h2,
        p,
        strong
          color: $white

    .hero-section
      z-index: 0

  .person-content
    position: relative
    z-index: 2

    .columns
      margin: 0

    .container
      + .people-navigation
        margin-top: rem(-70)

    .background-text
      color: rgba($white, 0.5)
</style>
