<template>
  <v-container class="oddily">
    <img src="https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/static/logo_bg.svg" alt="logo_bg" class="logo-bg" />
    <h1>Oddíly</h1>
    <h3>Patříme pod středisko Srdíčko Třebíč.</h3>
    <v-layout row wrap justify-space-around align-center temporary>
      <v-flex xl4 lg4 md6 sm6 xs12 mt-1 class="px-2" v-for="oddil in oddily" :key="oddil._id">
        <OddilCard :oddil="oddil" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

import OddilCard from "./OddilCard";


export default {
  data: () => ({
    show: false,
    oddily: [],
  }),

  created() {
    axios.get("/public-oddils")
      .then((res) => {      
        console.log("oddily loaded", res);
        let loadedOddily = res.data;
        loadedOddily.forEach(laodedOddil => {
          let newOddil = {};
          // newOddil.rot = Math.floor(Math.random() * Math.floor(360));
          newOddil.nazev = laodedOddil.nazev;
          newOddil.vekova_skupina = laodedOddil.vekova_skupina;
          newOddil.popis = laodedOddil.popis;
          newOddil.logo = laodedOddil.logo;
          newOddil.link = laodedOddil.nazev.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); //remove diacritics, see https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
          this.oddily.push(newOddil);
        });
        console.log("All oddily were successfully assigned.", this.oddily);
      })
      .catch((e) => {
        console.log(e);
        this.errors.push(e);
      });
  },

  methods:  {
  },

  components: {
    OddilCard,
  },
};
</script>

<style scoped>
.oddily {
  text-align: center;
  padding-top: 50px;
  position: relative;
}

h1 {
  font-family: "skautbold";
  font-size: 3rem;
}

h3 {
  font-family: "themix";
  font-weight: 200;
  font-size: 1rem;
}

.logo-bg {
  top: 265px;
  left: -200px;
  width: 300px;
  height: auto;
  position: absolute;
  pointer-events: none;
  opacity: 0.1;
  transform: rotate(20deg) scale(2);
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
</style>
