<template>
  <footer class="footer">
    <div class="container">
      <div class="columns">
        <div
          v-for="(detail, index) in details"
          :key="index"
          class="column is-3 footer-detail">
          <span class="footer-detail__title">{{ detail.Title }}</span>
          <div
            class="content"
            v-html="detail.Content" />
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'MainFooter',
  computed: {
    details() {
      return this.$store.state.footer.footerList
    }
  }
}
</script>
