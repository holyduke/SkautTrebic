<template>
  <v-container class="main-center-limitwidth" grid-list-xs text-center>
    <div v-if="id">
      <h1 class="heading mb-0" id="Aktuality">Vedoucí</h1>
      <v-divider class="mb-2"></v-divider>
      <KontaktOddil :oddil="id" />
    </div>
    <div v-else>
      <h1 class="heading mb-0">Kontakty na hlavní vedoucí</h1>
      <v-divider class="mb-2"></v-divider>
      <KontaktVudci :vedoucisProps="vedoucis" py-5 />
    </div>
    <p v-if="isContributor">
      <strong>Tip:</strong> Pořadí vedoucích se řídí podle času poslední úpravy.
      Pro umístění na první místo aktualizuj beze změny daného vedoucího.
    </p>
  </v-container>
</template>

<script>
import KontaktVudci from "~/components/Kontakty/KontaktVudci";
import KontaktOddil from "~/components/Kontakty/KontaktOddil";

export default {
  name: "KontaktView",
  data: function () {
    return {
      id: this.$route.params.oddil,
    };
  },

  methods: {
    getMainVedoucis() {
      return new Promise((resolve) => {
        this.$axios
          .$get("/dulezity-vedoucis")
          .then((response) => {
            this.main_contacts = [];
            response.data.forEach((item) => {
              console.log(item);
              this.main_contacts.push(item);
            });
            this.main_contacts.sort(this.compare);
            // this.getRestOfVedoucis();
            console.log("main_contacts", this.main_contacts);
            this.loading = false;
            this.setLoading(false);
            resolve("OK");
          })
          .catch((e) => {
            this.errors.push(e);
            this.loading = false;
            this.setLoading(false);
          });
      });
    },
  },

  computed: {
    isContributor() {
      return this.$store.getters.isContributor;
    },
  },

  async asyncData({ $axios }) {
    console.log("asyncData -----------------------------------");
    const result = await $axios.$get("/dulezity-vedoucis")
    const asyncdata = {
      vedoucis: result
    }
    console.log(asyncdata);
    return asyncdata;
  },

  components: {
    KontaktVudci,
    KontaktOddil,
  },

  watch: {
    $route(to) {
      // react to route changes...
      // this.getVedoucis(to);
      this.id = to.params.oddil;
      // console.log(to,from);
    },
  },
};
</script>

<style scoped>
.heading {
  text-align: left;
}

h1 {
  font-family: "skautbold";
  font-size: 2.5rem;
}
</style>
