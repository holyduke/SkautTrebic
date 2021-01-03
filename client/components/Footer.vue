<template>
  <v-card height="100">
    <v-footer absolute class="font-weight-medium">
      <v-col class="text-center" cols="12">
        <v-btn class="mr-1" color="#e8e8e8" elevation="1" x-small to="/registrace">Registrace pro vedoucí</v-btn>
         •   {{ new Date().getFullYear() }}  •
        <a
          target="_blank"
          href="http://dominikjasek.skauting.cz/"
        >Dominik Jašek</a>
      </v-col>
    </v-footer>
  </v-card>
</template>

<style scoped>
a {
  text-decoration: none;
  color: black !important;
  background-color: transparent;
}

a:hover {
  color: #174085 !important;
}
</style>