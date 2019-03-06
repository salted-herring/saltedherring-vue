export default {
  mounted() {
    this.$store.commit('pagestate/updatebackgroundTextOpaque', true)
    this.$store.commit('workpage/updateHoveredItem', null)
  }
}
