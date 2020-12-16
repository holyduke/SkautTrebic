<template>
  <v-container grid-list-xs class="main-center-limitwidth">
    <h1>Nástěnka</h1>
    <v-row justify="space-around">
      <v-col cols="12" md="6" class="px-200">
        <Features />
      </v-col>
      
      <v-col cols="12" md="6">
        <v-card
          elevation="4"
          class="pa-4 mb-5"
          >
          <h2>Instruktážní video</h2>
          <p>
            V tomto videu najdete všechny základní funkce týkající se skautského webu. 
          </p>
          <section class="video-container">
            <iframe class="video" src="https://www.youtube.com/embed/RcIg3_yEX7Y" frameborder="0" height="200px" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe> 
          </section>
        </v-card>
        <v-card
          elevation="4"
          class="pa-4 my-5"
          >
          <h2>Administrátor</h2>
          <v-card-subtitle>
            <p>Tyto webové stránky vytvořil Dominik Jašek (Šíša). V případě jakýchkoliv dotazů mě kontaktujte na telefonu <a href="tel:732-181-317">732 181 317</a> nebo na <v-btn icon href='https://www.facebook.com/dominikjasekk'><v-icon class="mb-1">mdi-facebook</v-icon></v-btn>.</p>
            <p>Vše dělám ve svém volném čase, tudíž se předem omlouvám za moje výmluvy typu "<i>sorry, nemám teď vůbec čas</i>". Nenechte se ale zastrašit a perte to do mě, já si s tím nějak poradím 🙂</p>
            <p>PS: Velmi rád uvítám výpomoc šikovného programátora se znalostí Vue.js. Rád si s Tebou projdu zdrojový kód a vysvětlím Ti, jak všechno funguje. Pokud máš chuť mi pomoct, ozvi se mi prosím. </p>
          </v-card-subtitle>          
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Features from "@/components/Features";



export default {
  name: "Noticeboard",

  components: {
    Features,
  }
};
</script>

<style scoped>
h1  {
  font-family: "skautbold";
  font-size: 2.5rem;
}

.crossed {
  text-decoration: line-through;
  color:black;
  font-size: 16px;
}

.video-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0;
}
.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
