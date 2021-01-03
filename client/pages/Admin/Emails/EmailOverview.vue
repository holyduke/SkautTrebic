<template>
  <v-container grid-list-xs class="main-center-limitwidth"> 
    <h1 class="mb-0">Přehled odeslaných emailů</h1>
    <div class="reloadInfo">Pokud se obsah nenačte, aktualizujte stránku.</div>
    <v-divider class="mb-5"></v-divider>

    <!-- graf -->
    <v-card
      class="elevation-1"
    >
      <v-toolbar
        color="grey lighten-3"
        class="elevation-1"
      >      
        <v-toolbar-title>Statistika posledních 10 dnů</v-toolbar-title>
      </v-toolbar>
      <Graph class="px-2 pt-4 pb-2" :days="10"/>      
    </v-card>

    <!-- detaily -->
    <v-card
      class="mx-auto mt-8"
    >
      <v-toolbar
        color="grey lighten-3"
        class="elevation-1"
      >      
        <v-toolbar-title>Podrobný přehled</v-toolbar-title>
      </v-toolbar>
      <Events />
    </v-card>

  </v-container>
</template>

<script>
// import axios from "axios";
import Graph from "@/components/Email/Graph";
import Events from "@/components/Email/Events";


export default {
  name: 'EmailOverview',

  data() {
    return {
      sliderValue: 7,
      days: 7,
    }
  },

  computed: {
    parameters(){
      let parameters = {
        limit:100
      }
      return parameters;
    },

    // getBreadcrumbs() {
    //   return this.$store.getters.getBreadcrumbs;
    // },
  },

  methods: {
    getSentEmails() {
      // console.log("getting sent emails");
      // axios.get("/email-event-report/?limit=" + this.parameters.limit)
      //   .then((res) => {
      //     console.log("received a response", res);
      //   })
      //   .catch((e) => {
      //     console.log("error while loading emails", e.response)
      //   })
    },

    sliderchange()  {
      console.log("slider value changed");
      this.days = this.sliderValue;
    }
  },

  created() {
    this.getSentEmails();
  },

  components: {
    Graph,
    Events
  }
};
</script>

<style>
h1 {
  font-family: "skautbold";
  margin: 20px 0 20px 0;
  font-size: 2.5rem;
}

.reloadInfo  {
  font-size: 0.75rem;
}
</style>
