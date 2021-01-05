<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      class="card"
      outlined
      :elevation="hover ? 5 : 2"
      raised
      max-width="350px"
      :to="{ name: 'Post', params: { _id: aktualita._id } }"
    >
      <div
        v-if="thumbnail_url"
        class="rubrika"
        :style="{ backgroundImage: 'url(' + thumbnail_url + ')' }"
      >
        <div class="chips mx-1">
          <v-chip
            v-for="(oddil, index) in aktualita.oddils"
            :key="index"
            :color="inSelected(oddil.nazev) ? colors[oddil.nazev] : 'default'"
            :dark="inSelected(oddil.nazev) ? true : false"            
            class="chip ml-2 mt-2"
            small
            >{{ oddil.nazev }}</v-chip
          >
        </div>
      </div>
      <div v-else>
        <div class="chips mx-1">
          <v-chip
            v-for="(oddil, index) in aktualita.oddils"
            :key="index"
            :color="inSelected(oddil.nazev) ? colors[oddil.nazev] : 'default'"
            :dark="inSelected(oddil.nazev) ? true : false"            
            class="chip ml-2 mt-2"
            small
            >{{ oddil.nazev }}</v-chip
          >
        </div>
      </div>

      <v-list-item two-line>
        <v-list-item-content class="py-2 ">
          <div class="infoBox">            
            <v-chip
              class="autorChip mr-2"
              color="default"
              text-color="#555"
              small
              v-if="authorAvailable"
            >
              <v-avatar left>
                <v-icon>mdi-account-circle</v-icon>
              </v-avatar>
              {{ aktualita.autor.jmeno }}
              <span class="ml-1" v-show="aktualita.autor.prezdivka"
                >({{ aktualita.autor.prezdivka }})</span
              >
            </v-chip>
            <v-chip
              outlined
              small
              class="my-2"
            >
              {{ getDateText() }}
            </v-chip>
          </div>
          <div class="nadpis headline my-2">{{ aktualita.nadpis }}</div>
          <!-- <v-list-item-subtitle class="text mt-5" v-html="aktualita.text"></v-list-item-subtitle> -->
        </v-list-item-content>

        <v-list-item-avatar
          v-if="aktualita.obrazek"
          tile
          size="160"
          class="d-none d-sm-flex"
          color="grey"
        >
          <v-img :src="aktualita.obrazek.url"></v-img>
        </v-list-item-avatar>
      </v-list-item>
    </v-card>
  </v-hover>
</template>

<script>
import FetchImagesMixin from "@/mixins/FetchImagesMixin";

export default {
  data: () => {
    return {
      // backendAPI: backendAPI.backendAPI,
    };
  },

  mixins: [FetchImagesMixin],

  name: "AktualitaPreview",
  props: ["aktualita", "selected", "colors"],

  methods: {
    inSelected: function (oddil) {
      return this.selected.includes(oddil);
    },  
    
    getDateText() {
      const dayNamings = ["Dnes", "Včera", "Předevčírem", "Před 3 dny", "Před 4 dny"];
      const createdAt = new Date(this.aktualita.createdAtCET);

      for (let index = 0; index < dayNamings.length; index++) {
        let compareDate = new Date();
        compareDate.setDate(compareDate.getDate() - index); 
        // console.log("checking if post was published on date", compareDate);
        if (createdAt.getYear() == compareDate.getYear() && createdAt.getMonth() == compareDate.getMonth() && createdAt.getDate() == compareDate.getDate()) {
          return dayNamings[index];
        }        
      }      
       return String(this.aktualita.createdAtCET.getDate()) + ". " + String(this.aktualita.createdAtCET.getMonth()+1) + ". " + String(this.aktualita.createdAtCET.getFullYear());
    },    

    findFirstImageInPost() {
      var xss = require("xss");
      var list = [];
      xss(this.aktualita.text, {
        onTagAttr: function (tag, name, value) {
          if (tag === "img" && name === "src") {
            list.push(xss.friendlyAttrValue(value));
          }
        },
      });
      console.log("images which are used in text:", list);
      return list[0];
    },
    
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

    thumbnail_url() {
      const thumbnail_url = this.findFirstImageInPost();
      if (thumbnail_url != null)  {
        return thumbnail_url
      }
      return null;
    },

    isContributor() {
      return this.$store.getters.isContributor;
    },
  },

  created() {
    // while (!this.aktualita.text)  {console.log("waiting")}
    // console.log("this.aktualita.text available",this.aktualita.text);
    // console.log(this.thumbnail_url);
  },
};
</script>

<style scoped>
.card {
  border: 0;
}

.text {
  color: black !important;
}

.datum {
  font-size: 0.8rem;
}

.infoBox {
  display: inline;
}

.nadpis {
  font-size: 1.9rem !important;
  font-family: "skautbold" !important;
  font-weight: bold;
}

.rubrika {
  max-width: 100%;
  min-height: 250px;
  background-size: cover;
  background-position: center center;
  /* bottom: 10px; */
  position: relative;
}

.rubrika .chips {
  /* /* margin-bottom: 3px; */
  /* margin-right: 25px; */
  /* padding: 0px 15px 0px 15px; */
  /* position: absolute;
  top: 215px;
  left: 10px; */
  bottom: 12px;
  position: absolute;
}

/* .rubrika .chips .chip { */
  /* border: 2px solid black; */
/* } */

.text >>> .image {
  display: none;
}

.text >>> .media {
  display: none;
}
</style>
