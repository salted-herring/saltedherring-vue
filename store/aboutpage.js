export const state = () => ({
  Sections: [],
  activeSection: null,
  BackgroundColour: ''
})

export const mutations = {
  updateSections(state, results) {
    let sections = []

    for (let i in results.AboutSections.edges) {
      let res = results.AboutSections.edges[i].node
      let section = {
        HeroTitle: res.HeroTitle,
        HeroIntroduction: res.HeroIntroduction,
        Introduction: null,
        Slug: res.Slug,
        Blocks: []
      }

      let introValid = res.Introduction.ID !== '0'

      if (introValid) {
        section.Introduction = res.Introduction
      }

      let sectionBlocks = res.Blocks.edges

      for (let j in sectionBlocks) {
        let block = sectionBlocks[j].node

        section.Blocks.push(block)
      }

      sections.push(section)
    }

    state.Sections = sections
  },
  updateBackgroundColour(state, colour) {
    state.BackgroundColour = '#' + colour.Colour
  }
}
