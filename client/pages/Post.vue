<template>
  <v-container grid-list-xs class="main-center-limitwidth">
    <!-- Loading -->
      <div v-if="loading" class="text-center grey--text align-center justify-center"> 
        <p>Načítám aktualitu...</p>
        <v-progress-circular
        :size="80"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-else>      
      <div
        :class="{
          'ma-0': $vuetify.breakpoint.mdAndDown,
          marginlg: $vuetify.breakpoint.lg,
          marginxl: $vuetify.breakpoint.xl,
        }"
      >
        <v-layout row wrap justify-space-around class="heading mx-0">
          <v-flex xs12 sm8 md9 lg10 xl10>
            <div class="outer ml-5">
              <div>
                <h1>{{ aktualita.nadpis }}</h1>
                <v-divider class="mb-2"></v-divider>
                <h4>Zveřejněno: {{ getCETDate }}</h4>
                <h4 v-if="authorAvailable">
                  Autor:
                  <v-chip
                    class="ml-1 autorChip"
                    color="default"
                    text-color="#555"
                    small
                  >
                    <v-avatar left>
                      <v-icon>mdi-account-circle</v-icon>
                    </v-avatar>
                    {{ aktualita.autor.jmeno }}
                    <span class="ml-2" v-show="aktualita.autor.prezdivka"
                      >({{ aktualita.autor.prezdivka }})</span
                    >
                  </v-chip>
                </h4>
                <h4>
                  Oddíly:
                  <v-chip
                    v-for="(oddil, index) in aktualita.oddils"
                    :key="index"
                    :color="colors[oddil.nazev]"
                    dark
                    class="chip ml-1"
                    small
                    >{{ oddil.nazev }}</v-chip
                  >
                </h4>
              </div>
            </div>
          </v-flex>
          <v-flex xs12 sm4 md3 lg2 xl2>
            <v-img
              class="cover"
              v-if="aktualita.obrazek"
              :src="aktualita.obrazek.url"
            ></v-img>
          </v-flex>
        </v-layout>
        <div class="pa-6 mt-2 zprava">
          <div v-html="aktualita.text"></div>
          <FilesToDownload
            v-if="aktualita.priloha.length"
            :priloha="aktualita.priloha"
            :showDeleteBtn="false"
          />
        </div>
        <v-btn
          large
          class="px-4 mx-2 my-5 white--text float-right"
          v-if="isContributor"
          color="#174085"
          :to="{ name: 'EditPost', params: { _id: aktualita._id } }"
        >
          <v-icon class="mr-1">mdi-pencil</v-icon>Upravit
        </v-btn>
      </div>
    </div>    
  </v-container>
</template>

<script>
import axios from "axios";
// import Constants from "@/constants.js";
import FilesToDownload from "@/components/Aktuality/FilesToDownload";

export default {
  name: "Post",

  data() {
    return {
      loading: false,
      colors: Constants.colors,
      backendAPI: Constants.backendAPI,
      aktualita: null,
      text: "",
    };
  },

  methods: {
    getMinutes(aktualita) {
      return (
        (aktualita.createdAtCET.getMinutes() < 10 ? "0" : "") +
        aktualita.createdAtCET.getMinutes()
      );
    },

    convertTimeToCET: function (aktualita) {
      aktualita.createdAtCET = new Date(aktualita.createdAt);
    },

    // convertToHTML: function (markdown) {
    //   var showdown = require("showdown");
    //   var converter = new showdown.Converter();
    //   converter.setOption("simpleLineBreaks", true); // makes sure that line end will make <br> tag
    //   return converter.makeHtml(markdown);
    // },
  },

  computed: {
    authorAvailable() {
      try {
        return this.aktualita.autor.jmeno;
      }
      catch {
        return false;
      } 
    },

    getCETDate: function () {
      try {
        // because of asynchronnous programming - it would require object which doesn´t exist yet
        return (
          this.aktualita.createdAtCET.getDate() +
          ". " +
          this.aktualita.createdAtCET.getMonth() +
          ". " +
          this.aktualita.createdAtCET.getFullYear() +
          ", " +
          this.aktualita.createdAtCET.getHours() +
          ":" +
          this.getMinutes(this.aktualita)
        );
      } catch {
        return "";
      }
    },

    // backendAPI() {
    //   return this.$store.getters.getBackendAPI;
    // },

    isContributor() {
      return this.$store.getters.isContributor;
    },
  },

  created() {
    this.loading = true;
    console.log("getting post with _id = " + this.$route.params._id);
    axios
      .get(`/aktualitas/` + this.$route.params._id)
      .then((response) => {
        console.log("received aktualita...", response);
        this.aktualita = response.data;
        this.convertTimeToCET(this.aktualita);
        // this.text = this.convertToHTML(this.aktualita.text);
        document.title = "Skaut" + " - " + this.aktualita.nadpis;
        console.log("response post", response);
        this.loading = false;
      })
      .catch((e) => {
        console.log("aktualita not found",e);
        this.loading = false;
        return this.$router.push('/404');
      });
  },

  components: {
    FilesToDownload,
  },
};
</script>

<style scoped>
.outer {
  display: flex;
  align-items: center;
  height: 100%;
}

.cover {
  float: right;
  height: 100%;
  width: auto;
  max-height: 200px;
}

@media only screen and (max-width: 600px) {
  .cover {
    float: initial;
  }
}

.heading {
  background-color: rgb(249, 249, 249);
  border: 1px solid rgb(224, 218, 208);
  border-radius: 7px;
}

.heading:hover {
  background-color: rgb(249, 245, 245);
}

h1 {
  font-size: 1.9rem;
  text-transform: uppercase;
  font-family: "skautbold";
}

h4 {
  font-weight: normal;
  margin-bottom: 5px;
}

.zprava {
  /* background-color: rgb(247, 247 , 247); */
  border: 1px solid rgb(245, 245, 245);
  border-radius: 7px;
  margin-left: -1px;
  margin-right: -1px;
  word-wrap: break-word;
  min-height: 500px;
}

.zprava:hover {
  border: 1px solid rgb(236, 236, 236);
  background-color: rgb(254, 254, 254);
}

.marginlg {
  margin: 0 70px 0 70px;
}

.marginxl {
  margin: 0 150px 0 150px;
}

.size {
  color: lightgray;
}

/* Images */
.zprava >>> .image {
  margin: 0 auto 0.55em;
  text-align: center;
}

.zprava >>> .image img {
  max-width: 100%;
}

.zprava >>> .image-style-side {
  clear: left;
  float: right;
  margin: 15px;
  max-width: 50%;
}

.zprava >>> figcaption {
  text-align: center;
}

@media only screen and (max-width: 600px) {
  /* display images on mobile fullscreen */
  .zprava {
    padding: 20px 5px !important;
  }

  .zprava >>> .image {
    width: 100% !important;
  }

  .zprava >>> .image-style-side {
    margin: 5px;
    max-width: 60% !important;
  }
}

/* Tables */

.zprava >>> .table table {
  border-spacing: 0;
  border-collapse: collapse;
  /* text-align: center; */
  margin: 15px auto;
}

.zprava >>> .table th {
  border: solid;
  padding: 6.5px;
}

.zprava >>> .table td {
  padding: 6.5px;
  border: solid thin;
}

.zprava >>> .table table th {
  background: hsla(0, 0%, 0%, 5%);
}

/* Media */

.zprava >>> .media {
  padding: 10px;
  /* padding-bottom: 10px; */
}

/* Marker - disable default behaviour */
.zprava >>> mark {
  background-color: white;
}

.zprava >>> .marker-yellow {
  background-color: yellow;
}

.zprava >>> .marker-green {
  background-color: green !important;
}

.zprava >>> .marker-red {
  background-color: red;
}

.zprava >>> .marker-pink {
  background-color: pink;
}

.zprava >>> .marker-blue {
  background-color: blue;
}

.zprava >>> .pen-red {
  background-color: white;
  color: red;
}

.zprava >>> .pen-green {
  background-color: white;
  color: green;
}

/* Font size */
.zprava >>> .text-tiny {
  font-size: 0.5rem;
}

.zprava >>> .text-small {
  font-size: 0.75rem;
}

.zprava >>> .text-big {
  font-size: 1.5rem;
}

.zprava >>> .text-huge {
  font-size: 2.5rem;
}
</style>
