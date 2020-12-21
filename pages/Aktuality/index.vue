<template>
  <v-container grid-list-xs class="my-3 main-center-limitwidth">
    <!-- <AktualityComponent :selected="selected" /> -->
  </v-container>
</template>

<script>
import AktualityComponent from "~/components/Aktuality/AktualityComponent";



export default {
  name: "Aktuality",

  data() {
    return {
      selected:["skautky",]
    }
  },

  async asyncData({ req, $axios }) {
    console.log('ASYNCDATA');
    const post = await $axios.$get(`/aktualitas/count?`)
    console.log("asnycdata post", post);
    return { post }
  },
  
  component:  {
    AktualityComponent
  }
};
</script>

<style scoped>
</style>
