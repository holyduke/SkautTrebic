<template>
  <v-container grid-list-xs class="my-3 main-center-limitwidth">
    <AktualityComponent :selected="selected" />
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
  
  component:  {
    AktualityComponent
  }
};
</script>

<style scoped>
</style>
