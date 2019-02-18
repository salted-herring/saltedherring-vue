<template>
  <div
    ref="preloaders"
    :style="{ 'background-image': 'url(' + getImage + ')'}"
    class="preview-overlay">
    <video
      v-if="getVideo"
      :poster="getImage"
      autoplay
      muted
      loop
      width="100%">
      <source
        :src="getVideo"
        type="video/mp4">
    </video>
  </div>
</template>
<script>
export default {
  name: 'PreviewOverlay',
  props: {
    video: {
      type: Object,
      default: function() {
        return {
          url: ''
        }
      }
    },
    image: {
      type: Object,
      default: function() {
        return {
          URL: ''
        }
      }
    }
  },
  data() {
    return {
      videoURL: '',
      imageURL: ''
    }
  },
  computed: {
    getImage() {
      return this.imageURL
    },
    getVideo() {
      return this.videoURL
    }
  },
  mounted() {
    let self = this

    if (this.image !== null && this.image.URL !== null) {
      let img = document.createElement('img')
      this.$refs.preloaders.append = img

      img.onload = function() {
        self.imageURL = self.image.URL
      }
      img.src = this.image.URL
    }

    if (this.video !== null && this.video.url !== null) {
      let vid = document.createElement('video')
      let path = this.video.url

      this.$refs.preloaders.append = vid

      let match = path.match(/(https?:\/\/[^\/]+)(.*)/)

      if (match !== null) {
        path = match[2]
        vid.onload = function() {
          self.videoURL = path
        }
        vid.src = path

        this.videoURL = path
      }
    }
  }
}
</script>
