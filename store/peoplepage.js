export const state = () => ({
  peoplepage: {},
  people: {},
  partners: []
})

export const mutations = {
  updatePeoplePageState(state, pageState) {
    state.peoplepage = pageState

    // Sort people & add them to the state
    let people = pageState.People.edges
    let sorted = []

    for (let i in people) {
      let person = people[i].node

      if (!(person.URLSegment in state.people)) {
        state.people[person.URLSegment] = person
      }
      sorted.push(person)
    }

    sorted.sort(function(a, b) {
      return a.Sort - b.Sort
    })

    state.people.sorted = sorted

    // Sort Partners & add them to the state
    let partners = pageState.Partners.edges
    sorted = []

    for (let i in partners) {
      let partner = partners[i].node
      sorted.push(partner)
    }

    sorted.sort(function(a, b) {
      return a.SortOrder - b.SortOrder
    })

    state.partners = sorted

    // process hero images
    let heros = []
    let heroImages = pageState.HeroImages.edges

    for (let i in heroImages) {
      let image = heroImages[i].node
      heros.push(image)
    }

    state.peoplepage.HeroImages = heros
  },

  updatePerson(state, record) {
    if ('slug' in record && 'data' in record) {
      // process hero images
      let heros = []
      let heroImages = record.data.HeroImages.edges

      for (let i in heroImages) {
        let image = heroImages[i].node
        heros.push(image)
      }

      record.data.HeroImages = heros
      record.data.FullRecord = true
      state.people[record.slug] = record.data
    }
  }
}
