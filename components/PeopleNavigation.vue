<template>
  <div
    class="people-navigation">
    <div
      class="project-navigation__nav">
      <nav>
        <ProjectLink
          v-for="(link, index) in people"
          :key="index"
          :id="link.URLSegment"
          :link="link.Link"
          :label="link.MenuTitle" />
      </nav>
    </div>
  </div>
</template>
<script>
import getPeoplePage from '~/apollo/queries/peoplepage'

import ProjectLink from '~/components/ProjectLink'

export default {
  components: {
    ProjectLink
  },
  props: {
    people: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  asyncData({ store, params }) {
    // let people = store.state.peoplepage.people
    //
    // if ('sorted' in people) {
    //   return false
    // }

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
          query: getPeoplePage
        }
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
