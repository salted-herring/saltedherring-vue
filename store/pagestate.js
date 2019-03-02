export const state = () => ({
  backgroundTextOpaque: true
})

export const mutations = {
  updatebackgroundTextOpaque(state, opaque) {
    state.backgroundTextOpaque = opaque
  }
}
