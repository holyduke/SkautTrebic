<template>
  <!-- Login dialog -->
  <v-card justify="center" >    
    <v-dialog v-model="loginDialogForm" width="500">
      <LoginForm/>
    </v-dialog>
    <v-dialog v-model="loginDialogLoader" width="500">
      <LoginLoader/>
    </v-dialog>
   
  </v-card>
</template>

<script>
import LoginForm from "./LoginForm";
import LoginLoader from "./LoginLoader";
// import { mapGetters, mapActions } from "vuex";

export default {
  name: "Login",

  data: () => {
    return {
      // backendAPI: Constants.backendAPI,
      // loginDialog: false,
      // passwordVisible: false,
      // username: null,
      // password: null,
      // dialogLogin: false,
      // dialogForgotPassword: false,
      // wrongPassword: false
    };
  },

  // props: ['bus'],

  methods: {
    
  },

  computed: {
    loginDialogForm: {
      set() {
        // this.$store.dispatch("toggleLoginDialog");
        //console.log("setting loginDialogForm");
        this.$store.dispatch('closeLoginDialog');
      },
      get() {
        return this.$store.getters.getLoginDialogForm;
      },
    },

    loginDialogLoader: {
      set() {
        // this.$store.dispatch("toggleLoginDialog");
        this.$store.dispatch('closeLoginDialog');
      },
      get() {
        return this.$store.getters.getLoginDialogLoader;
      },
    },
  },

  components:  {
    LoginForm,
    LoginLoader
  }
};
</script>

<style scoped>
.dialogLoader {
  z-index: 2000 !important;
}
</style>
