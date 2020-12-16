import Vue from 'vue'
import VuePictureSwipe from 'vue-picture-swipe'

Vue.component('Gallery', {
  components: {
    VuePictureSwipe
  },
  props: {
    imgs: {
      type: Array,
      required: true
    },
  },
  template: `<vue-picture-swipe :items="imgs" :options="options" />`
})