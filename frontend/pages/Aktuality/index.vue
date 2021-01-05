<template>
  <v-container grid-list-xs class="my-3 main-center-limitwidth">
    <AktualityComponent v-if="posts" :selected="selected" :posts="posts" />
  </v-container>
</template>

<script>
import AktualityComponent from "~/components/Aktuality/AktualityComponent";



export default {
  name: "Aktuality",

  data() {
    return {
      selected:["skauti", "skautky", "vlčata", "světlušky", "roveři", "oldskauti"]
    }
  },

  async asyncData({ req, $axios }) {
    console.log('ASYNCDATA');
    let posts = await $axios.$get(`/aktualitas`)
    if (posts)  {
      posts = null
    }
    return { posts }
  },
  
  component:  {
    AktualityComponent
  }
};
</script>

<style scoped>
</style>
