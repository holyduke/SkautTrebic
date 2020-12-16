<template>
  <v-card class="elevation-12 text-center" width="500">
    <v-toolbar color="#174085" dark flat>
      <v-toolbar-title>Přihlášení</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Uživatelské jméno nebo email"
          v-model="username"
          name="login"
          prepend-icon="mdi-account"
          @keyup.enter="login"
          type="text"
        ></v-text-field>

        <v-text-field
          id="password"
          label="Heslo"
          v-model="password"
          name="password"
          prepend-icon="mdi-lock"
          :append-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="passwordVisible = !passwordVisible"
          @keyup.enter="login"
          :type="passwordVisible ? 'text' : 'password'"
        ></v-text-field>
      </v-form>
    </v-card-text>

    <!-- Inform about wrong password typed -->
    <v-alert
      :value="wrongPassword"
      type="error"
      dense
      outlined
      class="mx-5"
    >Zadali jste špatné jméno nebo heslo</v-alert>

    <!-- Inform about user being block (= waitng for manual confirmation by some vedouci) -->
    <v-alert
      :value="blockedUserMsg"
      type="error"
      dense
      outlined
      class="mx-5"
    >Účet čeká na manuální potvrzení jiným vedoucím. Prosím kontaktuj správce webu nebo kteréhokoliv jiného vedoucího, který má účet aktivní.
    </v-alert>

    <v-card-actions>
      <v-row class="ma-0 pa-0">
        <v-col cols="12" sm="6" md="6" >
          <v-dialog v-model="dialogForgotPassword" width="400">
            <template v-slot:activator="{ on, attrs }">
              <v-btn text color="#174085" dark v-bind="attrs" v-on="on">Zapomněl jsem heslo</v-btn>
            </template>

            <v-card class="forgot-password">
              <v-card-title class="grey lighten-2">Zapomněl jsem heslo</v-card-title>

              <v-card-text
                class="py-3"
              >Přihlašovací údaje jste od nás obdrželi na začátku školního roku. V případě, že jste je zapomněli, kontaktujte prosím kteréhokoliv <a href="/kontakt">vedoucího</a>, rád Vám je sdělí.</v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialogForgotPassword = false">OK</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
        <!-- <v-spacer></v-spacer> -->
        <v-col cols="12" sm="6" md="6">
          <v-btn dark color="#174085" @click="login">Přihlásit se</v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
// import axios from "axios";

export default {
  name: "LoginForm",
  
  props:['doNotApplyRedirect'],

  data: () => {
    return {
      passwordVisible: false,
      dialogForgotPassword: false,
    };
  },

  methods: {
    login: function () {
      this.$store.dispatch('login')
      .then((response) => {
          console.log('reponse', response)
          console.log('loged successfully!! doNotApplyRedirect value = ', this.doNotApplyRedirect);
          this.$store.dispatch('setJwt',response.data.jwt);
          this.$store.dispatch('setName',response.data.user.jmeno);
          this.$store.dispatch('setPrezdivka',response.data.user.prezdivka);
          this.$store.dispatch('setRoleName',response.data.user.role.name);
          this.$store.dispatch('set_id',response.data.user._id);
          this.$store.dispatch("closeLoginDialog");
          this.passwordVisible = false;
          const redirect_url = this.$route.query.redirect || "/aktuality";
          if (!this.doNotApplyRedirect) {
            this.$router.replace(redirect_url).catch(()=>{});
          }
        })
      .catch((error) => {
        console.log('Error 400: wrong username or password:',error.response);
        this.$store.commit('setLoginDialogLoader',false);
        if (error.response.data.message[0].messages[0].id == "Auth.form.error.invalid") {
          this.$store.commit('setWrongPassword',true);
        }
        else if (error.response.data.message[0].messages[0].id == "Auth.form.error.blocked")  {
          this.$store.commit('setBlockedUserMsg',true);
        }
      });
    },


    setLoginDialogLoader: function (value) {
      this.$store.commit("setLoginDialogLoader", value);
    },

    setWrongPassword: function (value) {
      this.$store.commit("setWrongPassword", value);
    },

    setBlockedUserMsg: function (value) {
      this.$store.commit("setBlockedUserMsg", value);
    },
  },

  computed: {
    username: {
      set(newUsername) {
        this.$store.commit("setUsername", newUsername);
      },
      get() {
        return this.$store.getters.getUsername;
      },
    },
    password: {
      set(newPassword) {
        this.$store.commit("setPassword", newPassword);
      },
      get() {
        return this.$store.getters.getPassword;
      },
    },
    wrongPassword: function () {
      return this.$store.getters.getWrongPassword;
    },
    blockedUserMsg: function () {
      return this.$store.getters.getBlockedUserMsg;
    },
  },
};
</script>

<style scoped>
  a:link {
    text-decoration: none;
  }
</style>
