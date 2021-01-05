<template>
  <client-only>
    <vue-picture-swipe :items="imgs" :options="options" />
  </client-only>
</template>

<script type="module">
import VuePictureSwipe from 'vue-picture-swipe'

export default {
  name: 'Gallery',
  components: {
    VuePictureSwipe
  },
  props: {
    imgs: {
      type: Array,
      required: true
    },
  }
}
</script>