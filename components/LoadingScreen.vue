<template>
  <v-overlay :value="getLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>


export default {
  name: 'LoadingScreen',

  computed: {
    getLoading()  {
      return this.$store.getters.getLoading;
    }
  }
};
</script>

<style scoped>
</style>
