<template>
  <div>
    <v-hover v-slot:default="{ hover }">
      <v-card
        class="my-5 mx-auto card"
        max-width="344"
        :elevation="hover ? 5 : 3"
        raised
      >
        <v-img
          v-if="local_img"
          v-show="localFotkaUrlAvailable"
          height="300px"
          :src="getLocalFotkaUrl"
        ></v-img>
        <v-img
          v-else
          v-show="fotka"
          height="300px"
          :src="getFotkaUrl"
        >
        </v-img>
        <v-card-title v-show="jmeno" class="jmeno">
          <div class="jmenoprijmeni">
            {{ jmeno }}            
          </div>
          <div v-if="prezdivka">{{ prezdivka }}</div>
        </v-card-title>
        <v-card-subtitle v-show="funkce" class="fce">{{
          funkce
        }}</v-card-subtitle>
        <div
          v-show="isContributor && showPossibleEditBtn"
          class="text-xs-center"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mb-2 mt-n2 mx-2 editBtn"
                fab
                dark
                v-bind="attrs"
                v-on="on"
                color="#174085"
                :to="{ name: 'EditVedouciView', params: { _id: _id } }"
              >
                <v-icon dark>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Upravit</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mb-2 mt-n2 mx-2 editBtn"
                fab
                dark
                v-bind="attrs"
                v-on="on"
                color="error"
                @click="deleteItem"
              >
                <v-icon dark>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Odstranit</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-show="showRemoveBtn"
                class="mb-2 mt-n2 mx-2 editBtn"
                fab
                dark
                v-bind="attrs"
                v-on="on"
                color="warning"
                @click="removeItem"
              >
                <v-icon dark>mdi-account-remove</v-icon>
              </v-btn>
            </template>
            <span>Odebrat</span>
          </v-tooltip>
        </div>

        <v-divider v-if="telefonParsed || email || popis"></v-divider>

        <!-- facebook icon, email, phone -->
        <v-card-actions>
          <div class="kontakt" align>
            <div v-if="facebook">
              <v-btn icon target="_blank" :href="facebook">
                <v-icon>mdi-facebook</v-icon>
              </v-btn>
            </div>

            <div v-show="telefon" class="telefon">
              <v-icon class="ml-1 mr-3">mdi-phone</v-icon>
              {{ telefonParsed }}
            </div>

            <div v-show="email" class="email">
              <v-icon class="ml-1 mr-3">mdi-email</v-icon>
              {{ email }}
            </div>
          </div>

          <v-spacer></v-spacer>

          <!-- arrow for controling description -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-show="popis"
                large
                icon
                v-bind="attrs"
                v-on="on"
                @click="show = !show"
              >
                <v-icon>{{
                  show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </template>
            <span v-if="!show">Zobrazit popis</span>
            <span v-else>Skrýt popis</span>
          </v-tooltip>
        </v-card-actions>

        <!-- description of person -->
        <v-expand-transition>
          <div v-show="show" class="text-center">
            <v-divider></v-divider>
            <v-card-text>{{ popis }}</v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import FetchImagesMixin from "@/mixins/FetchImagesMixin";

export default {
  name: "PersonCard",

  props: [
    "fotka",
    "jmeno",
    "prezdivka",
    "email",
    "telefon",
    "funkce",
    "popis",
    "facebook",
    "_id",
    "showPossibleEditBtn",
    "local_img",
    "showRemoveBtn",
  ],

  data: () => {
    return {
      // loginConfirmation: false,
      show: false,
    };
  },

  mixins: [FetchImagesMixin],

  methods: {
    deleteItem() {
      this.$emit("deleteItem");
    },

    removeItem() {
      this.$emit("removeItem");
    },
  },

  computed: {
    telefonParsed: function () {
      // make spaces after each 3 digits
      return this.telefon.replace(/(\d{3})/g, "$1 ").replace(/(^\s+|\s+$)/, "");
    },

    localFotkaUrlAvailable()  {
      try {
        if (this.fotka.url) return true;
      } catch (error) {
        return false;
      }
      return false;
    },

    getLocalFotkaUrl()  {
      if (this.fotka == null) {
        return null;
      }
      return this.fotka.url;
    },

    getFotkaUrl() {  
      if (this.fotka) {
        return this.getImageUrlFormatOrLower(this.fotka, "large");
      }    
      else return null;
    },

    isContributor() {
      return this.$store.getters.isContributor;
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 15px;
}

.jmeno {
  display: block;
  text-align: center;
}

.jmenoprijmeni {
  font-size: 1.5rem;
  font-weight: normal;
  display: block;
}

.prezdivka {
  font-weight: normal;
  font-size: 1.2rem;
}

.fce {
  font-family: "themix";
  font-size: 1rem;
  text-align: center;
}

.telefon {
  text-decoration: none !important;
  color: black !important;
}

.kontakt {
  font-family: "themix";
  display: inline-block;
  font-size: 1rem;
  text-align: left;
}
</style>
