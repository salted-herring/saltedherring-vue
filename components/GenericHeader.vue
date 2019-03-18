<template>
  <Header
    :title-bg="titleBg"
    :header-bg="headerBg"
    :title="title"
    :is-centered="isCentered"
    :page-class="pageClass">
    <div
      v-if="introduction !== ''"
      slot="introductionContent"
      v-html="introduction"
    />
    <div
      slot="background"
      :style="heroStyle"
      :class="heroClass"
      class="hero-section">
      <video
        v-if="headerVideo.video !== null"
        ref="headerVideo"
        :data-src="headerVideo.video"
        :data-poster="headerVideo.poster"
        :class="heroClass"
        data-toggle-class="active"
        muted
        autoplay
        loop
        width="100%"
        class="hero-video" />
      <div
        v-else-if="headerImages.length != 0"
        class="hero-images">
        <div
          v-for="(image, index) in headerImages"
          :key="index"
          :style="{ 'background-image': 'url(' + image.FitFullScreen + ')', 'background-color': '#' + headerBg }"
          class="hero-images__image" />
      </div>
    </div>
  </Header>
</template>
<script>
import Header from '~/components/Header'
export default {
  components: {
    Header
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    titleBg: {
      type: String,
      default: ''
    },
    headerBg: {
      type: String,
      default: ''
    },
    pageClass: {
      type: String,
      default: ''
    },
    isCentered: {
      type: Boolean,
      default: true
    },
    headerImages: {
      type: Array,
      default: function() {
        return []
      }
    },
    headerVideo: {
      type: Object,
      default: function() {
        return {
          video: null,
          poster: null
        }
      }
    },
    heroStyle: {
      type: String,
      default: ''
    },
    heroClass: {
      type: String,
      default: ''
    },
    introduction: {
      type: String,
      default: ''
    }
  }
}
</script>
