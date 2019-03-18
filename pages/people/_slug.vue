<template>
  <div class="person-page">
    <generic-header
      :title="person.Title"
      :title-bg="person.TitleColour.Colour"
      :header-bg="person.BackgroundColour.Colour"
      :page-class="'people-header'"
      :header-images="headerImages"
      :introduction="person.Introduction" />
    <div
      :style="{ 'background-color': '#' + person.BackgroundColour.Colour }"
      class="people-content">
      <div class="container">
        <div class="columns is-centered">
          <div
            class="column people-content__content is-8 cms-content"
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
      })
      .then(result => {
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
  .people-header
    .background-text
      z-index: 200

  .hero-images__image
    background-blend-mode: multiply

  .people-page
    .latest-section

      .section-heading
        margin-bottom: rem(100)

      .latest-content
        justify-content: center

        +until($widescreen)
          max-width: rem(540)
          margin-left: auto
          margin-right: auto

      .latest-item
        +until($desktop)
          padding-left: rem(30)
          padding-right: rem(30)
        h3
          +until($widescreen)
            font-size: rem(24)



  .people-content
    position: relative
    z-index: 2

    .background-text
      color: $white

    .project-navigation
      padding: rem(80) 0 rem(200)

      &:after
        background: none
</style>
