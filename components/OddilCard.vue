<template>
  <v-hover v-slot:default="{hover}">
    <v-card  class="my-5 mx-auto pt-3 card" max-width="344" :elevation="hover ? 3 : 1" raised>
      <div class="brambora">
        <img src="https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/static/brambora.svg" alt="brambora" />
      </div>
      <div class="logo">
        <img :src="oddil.logo.url" :alt="oddil.nazev" />
      </div>

      <div class="rest">
        <v-card-title style="display:block;">
          <h2>{{ oddil.nazev }}</h2>
        </v-card-title>

        <v-card-subtitle>{{ oddil.vekova_skupina }}</v-card-subtitle>

        <v-card-actions>
          <v-btn text color="#174085" router :to="{ name: 'Aktuality', params: {oddil: oddil.link} }">Aktuality</v-btn>

          <v-spacer></v-spacer>

          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-card-text>{{ oddil.popis }}</v-card-text>
          </div>
        </v-expand-transition>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: 'OddilCard',

  data() {
    return {
      show: false,
    }
  },

  props: ['oddil'],
};
</script>

<style scoped>
h2 {
  font-family: "skautbold";
  font-size: 1.3rem;
  z-index: 4;
}

.card {
  position: relative;
  min-height: 260px;
  text-align: center;
  border-radius: 15px;

}

.brambora img {
  width: 55%;
  transform: translate(-50%, 20%);
  position: absolute;
  z-index: 1;
  opacity: 0.65;
  transition: transform 0.5s ease-in-out;
  left: 50%
}

.card:hover .brambora img {
  transform: translate(-50%, 20%) rotate(80deg);
  /* transform: ; */
}

.logo img {
  width: 35%;
  position: absolute;
  z-index: 1;
  transition: transform 0.35s ease-in-out;
  transform: translate(-50%, 0);
  left: 50%
}

.card:hover .logo img {
  transform: translate(-50%, 0) scale(1.08);
}

.rest {
  padding-top: 120px;
  z-index: 5;
  position: relative;
}
</style>
