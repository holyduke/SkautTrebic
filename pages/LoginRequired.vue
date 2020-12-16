<template>
  <v-container grid-list-xs align-center class="my-15 cont main-center-limitwidth">
    <h2>Tento obsah je přístupný pouze pro členy našich oddílů. Pro jeho zobrazení se prosím přihlaste.</h2>
    <v-col align="center">
      <LoginForm class="my-5" />
      <v-dialog v-model="loginDialogLoader" width="500">
      <LoginLoader />
      </v-dialog>
    </v-col>
  </v-container>
</template>

<script>
import LoginForm from "../components/Login/LoginForm";
import LoginLoader from "../components/Login/LoginLoader";

export default {
  name: "LoginRequired",

  components: {
    LoginForm,
    LoginLoader,
  },

  created() {
    // this.$store.commit('setLoginDialogForm',true);
  },

  computed: {
    loginDialogLoader: {
      set() {
        // this.$store.dispatch("toggleLoginDialog");
        this.$store.dispatch("closeLoginDialog");
      },
      get() {
        return this.$store.getters.getLoginDialogLoader;
      },
    },
  },
};
</script>

<style scoped>
.cont {
  text-align: center;
}
</style>
