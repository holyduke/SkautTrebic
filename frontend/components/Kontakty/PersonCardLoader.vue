<template>
  <v-card class="my-5 mx-auto card" max-width="344" height="300" outlined>
    <v-skeleton-loader type="image, list-item-two-line"></v-skeleton-loader>
  </v-card>
</template>

<script>
export default {
  name: "PersonCardLoader",
};
</script>

<style scoped>
.card {
  border-radius: 15px;
}
</style>