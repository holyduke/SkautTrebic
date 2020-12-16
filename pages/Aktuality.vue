<template>
  <v-container grid-list-xs class="my-3 main-center-limitwidth">
    <h1 class="mb-0" id="Aktuality">Aktuality</h1>
    <v-divider class="mb-2"></v-divider>
    <v-btn
      color="#174085"
      :to="{ name: 'CreatePost' }"
      v-if="isContributor"
      class="my-3 white--text"
      ><v-icon class="pr-2">mdi-message-draw</v-icon>Vytvořit příspěvek</v-btn
    >
    <v-container grid-list-xs class="subtitle">
      <v-row>
        <v-layout row wrap>
          <v-flex xs12 sm12 md4 lg3 xl3 class="filtrtitle"
            >Filtrovat aktuality pro oddíly:</v-flex
          >
          <v-flex xs12 sm12 md8 lg9 xl9>
            <v-row justify="space-around" class="mb-2 mx-2 checkboxes">
              <v-checkbox
                class="black--text mx-1"
                :color="colors['skauti']"
                v-model="selected"
                label="skauti"
                value="skauti"
                @change="checkBoxChange()"
              ></v-checkbox>
              <v-checkbox
                class="black--text mx-1"
                :color="colors['skautky']"
                v-model="selected"
                label="skautky"
                value="skautky"
                @change="checkBoxChange()"
              ></v-checkbox>
              <v-checkbox
                class="black--text mx-1"
                :color="colors['vlčata']"
                v-model="selected"
                label="vlčata"
                value="vlčata"
                @change="checkBoxChange()"
              ></v-checkbox>
              <v-checkbox
                class="black--text mx-1"
                :color="colors['světlušky']"
                v-model="selected"
                label="světlušky"
                value="světlušky"
                @change="checkBoxChange()"
              ></v-checkbox>
              <v-checkbox
                class="black--text mx-1"
                :color="colors['roveři']"
                v-model="selected"
                label="roveři"
                value="roveři"
                @change="checkBoxChange()"
              ></v-checkbox>
              <v-checkbox
                class="black--text mx-1"
                :color="colors['oldskauti']"
                v-model="selected"
                label="oldskauti"
                value="oldskauti"
                @change="checkBoxChange()"
              ></v-checkbox>
            </v-row>
          </v-flex>
        </v-layout>
      </v-row>
    </v-container>

    <!-- previews skeleton loaders -->
    <v-row justify="center">
      <v-col
        v-show="!loaded"
        cols="12"
        xs="12"
        sm="6"
        md="4"
        lg="3"
        xl="3"
        class="mb-3"
        v-for="i in Array(aktualityPerPage)"
        :key="i"
      >
        <AktualitaPreviewLoader />
      </v-col>
    </v-row>
    <!-- previews -->
    <v-row justify="center">
      <v-col
        v-show="loaded"
        cols="12"
        xs="12"
        sm="6"
        md="4"
        lg="3"
        xl="3"
        class="mb-3"
        v-for="aktualita in aktuality"
        :key="aktualita._id"
      >
        <AktualitaPreview
          :aktualita="aktualita"
          :selected="selected"
          :colors="colors"
          class="my-3"
        ></AktualitaPreview>
      </v-col>
    </v-row>
    <v-pagination
      v-model="page"
      :length="pagesCount"
      :total-visible="9"
      color="#174085"
    ></v-pagination>
  </v-container>
</template>

<script>
import axios from "axios";
// import vue-scrollto from "vue-scrollto";
import AktualitaPreview from "../components/Aktuality/AktualitaPreview";
import AktualitaPreviewLoader from "../components/Aktuality/AktualitaPreviewLoader";
import Constants from "@/constants.js";

export default {
  name: "Aktuality",

  data() {
    return {
      loaded: false,
      colors: Constants.colors,
      ableToScroll: false,
      oddilDiacriticsObj: Constants.oddilDiacriticsObj,
      fullSelected: [
        "skauti",
        "skautky",
        "vlčata",
        "světlušky",
        "roveři",
        "oldskauti",
      ],
      selected: [],
      id: "",
      aktuality: [],
      aktualityTotalCount: 0,
      page: 1,
      aktualityPerPage: 8,
      //aktualityPerPage defined in computed
    };
  },

  computed: {
    isContributor() {
      return this.$store.getters.isContributor;
    },

    queryStringGeneral: function () {
      let query = "";
      this.selected.forEach((element) => {
        query += "oddils.nazev=" + element + "&";
      });
      // console.log(query);
      return query;
    },

    queryStringSpecific: function () {
      let query =
        this.queryStringGeneral +
        "_start=" +
        this.startFrom +
        "&_limit=" +
        this.aktualityPerPage +
        "&_sort=createdAt:DESC";
      // console.log(query);
      return query;
    },

    pagesCount: function () {
      return Math.ceil(this.aktualityTotalCount / this.aktualityPerPage);
    },

    startFrom: function () {
      return (this.page - 1) * this.aktualityPerPage;
    },

    options() {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing,
      };
    },
  },

  watch: {
    page: function () {
      this.getAktuality();
    },

    $route() {
      // react to route changes...
      // this.getVedoucis(to);
      // console.log(to,from);
      this.acceptParams();
    },
  },

  methods: {
    getAktualityCount: function () {
      axios
        .get("/aktualitas/count?" + this.queryStringGeneral)
        .then((response) => {
          this.aktualityTotalCount = response.data;
          console.log("pocet aktualit:", this.aktualityTotalCount);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    getAktuality: function () {
      this.loaded = false;
      axios
        .get(`/aktualitas?` + this.queryStringSpecific)
        .then((response) => {
          console.log("axios response received new aktuality");
          this.aktuality = response.data;
          this.aktuality.forEach(this.convertTimeToCET);
          this.loaded = true;
          console.log("before setTiemout");
          this.ableToScroll = true;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    convertTimeToCET: function (aktualita) {
      aktualita.createdAtCET = new Date(aktualita.createdAt);
    },

    checkBoxChange: function () {
      if (this.selected.length) {
        this.page = 1;
        this.getAktualityCount();
        this.getAktuality();
      } else {
        this.aktuality = [];
      }
    },

    onScroll(e) {
      if (typeof window === "undefined") return;
      window.pageYOffset || e.target.scrollTop || 0;
    },

    toTop() {
      console.log("going to top");
      this.$vuetify.goTo(0);
    },

    acceptParams: function () {
      // looking for oddil
      this.id = this.oddilDiacriticsObj[this.$route.params.oddil];
      // console.log("aktualni id je ", this.id);
      if (this.fullSelected.includes(this.id)) {
        this.selected = [this.id];
      } else {
        this.selected = this.fullSelected;
      }
      // get request
      this.checkBoxChange();
    },
  },

  created() {
    this.acceptParams();
  },

  updated() {
    if (this.ableToScroll) {
      //nevim jak to udelat lip, je to naprd ale funguje, po nacteni dat z database se nastavi flag ableToScroll na true
      this.toTop();
      this.ableToScroll = false;
    }
  },

  components: {
    AktualitaPreview,
    AktualitaPreviewLoader,
  },
};
</script>

<style scoped>
.black--text >>> label {
  color: black;
}

h1 {
  font-family: "skautbold";
  margin: 20px 0 20px 0;
  font-size: 2.5rem;
}

.subtitle {
  font-family: "themix";
  font-size: 1.2rem;
}

.filtrtitle {
  display: flex;
  align-items: center;
}

.checkboxes {
  background-color: rgb(245, 245, 245);
  border-radius: 10px;
}
</style>
