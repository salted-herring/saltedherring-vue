<template>
  <Header
    :title-bg="titleBg"
    :header-bg="headerBg"
    :title="title"
    :is-centered="isCentered"
    :page-class="pageClass"
    :introduction-class="introductionClass"
    :introduction="introduction"
    :introduction-bg="introductionBg"
    :introduction-variation="'generic-header'">
    <div
      v-if="introductionContent !== ''"
      slot="introductionContent"
      v-html="introductionContent" />
    <div
      v-if="outsideContainer !== ''"
      slot="outsideContainer"
      :class="outsideContainerClass"
      class="outside-container"
      v-html="outsideContainer" />
    <div
      slot="background"
      :style="heroStyle"
      :class="heroClass"
      class="hero-section">

      <header-video
        v-if="headerVideo.video != null"
        :header-video="headerVideo" />

      <header-images
        v-else-if="headerImages.length != 0"
        :header-images="headerImages"
        :header-bg="headerBg" />
    </div>
  </Header>
</template>
<script>
import Header from '~/components/Header'
import HeaderImages from '~/components/HeaderImages'
import HeaderVideo from '~/components/HeaderVideo'

export default {
  components: {
    Header,
    HeaderImages,
    HeaderVideo
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
    },
    outsideContainer: {
      type: String,
      default: ''
    },
    outsideContainerClass: {
      type: String,
      default: ''
    },
    introductionClass: {
      type: String,
      default: ''
    },
    introductionContent: {
      type: String,
      default: ''
    },
    introductionBg: {
      type: String,
      default: ''
    }
  }
}
</script>
