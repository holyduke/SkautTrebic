<template>
  <v-container grid-list-xs align-center class="main-center-limitwidth">
    <h1 class="mb-0">Registrace pro vedoucí</h1>
    <v-divider class="mb-5"></v-divider>
    <p>Následující formulář slouží k umožnění přístupu vedoucím pro administraci webu. Registrace slouží <strong>pouze pro vedoucí</strong>, nikoliv pro rodiče a členy. Každá registrace je manuálně ověřena správcem webu.</p>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step
          :complete="e1 > 1"
          step="1"
        >
          Ověření členství
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          :complete="e1 > 2"
          step="2"
        >
          Potvrzení vedoucího
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          :complete="e1 > 3"
          step="3"
        >
          Registrace
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="4">
          Dokončení
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>        
        <v-stepper-content step="1">
          <v-card
            class="mb-12"
            color="grey lighten-4"
            elevation="1"            
          >
            <v-container grid-list-xs v-if="!isLoggedIn">
              <p class="pa-2">Jdeme na to! Nejdříve se prosím přihlas pod přihlašovacími údaji pro členy našich oddílů:</p>
              <v-col align="center">
                <LoginForm doNotApplyRedirect="true" class="my-5" />
                <v-dialog v-model="loginDialogLoader" width="500">
                <LoginLoader />
                </v-dialog>
              </v-col>              
            </v-container>

            <v-container grid-list-xs v-else>
              <p class="pa-2">Výborně, tvé členství v oddíle již bylo ověřeno.</p>              
              <v-btn
                color="primary"
                @click="e1 = 2"
              >
                Pokračovat
            </v-btn>  
            </v-container>   
          </v-card>
        </v-stepper-content>



        <v-stepper-content step="2">
          <v-card
            class="mb-12"
            color="grey lighten-4"
            elevation="1"            
          >
            <v-container grid-list-xs>
              <p class="pa-2">Registrace je určena <strong>pouze pro vedoucí</strong>. Jestliže jsi vedoucí, pokračuj dále.</p>              
              <v-btn
                color="primary"
                @click="e1 = 3"
              >
                Ano, jsem vedoucí
            </v-btn>  
            </v-container>   
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="3">
          <p class="pa-2">Proveďte registraci. Povinné položky jsou označeny pomocí *</p>   
          <v-card
            class="mb-12"
            color="grey lighten-4"
            elevation="1"
          >
            <!-- TODO: používané username nebo používaný email -->
            <v-form ref="registerForm" v-model="valid" lazy-validation class="px-5">
              <v-row>
                  <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="username" :rules="[rules.required]" label="Uživatelské jméno*" maxlength="20" required></v-text-field>
                      <v-alert dense v-show="showUniqueDemand.username" type="error">Uživatelské jméno již existuje</v-alert>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="email" :rules="emailRules" label="E-mail*" required></v-text-field>
                      <v-alert dense v-show="showUniqueDemand.email" type="error">Email již existuje</v-alert>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="name" :rules="[rules.required]" label="Jméno a příjmení*" maxlength="20" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="prezdivka" label="Přezdívka" maxlength="20" required></v-text-field>
                  </v-col>                  
                  <v-col cols="12">
                      <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Heslo*" hint="Heslo musí mít minimálně 6 znaků" counter @click:append="show1 = !show1"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                      <v-text-field block v-model="verify" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Heslo ještě jednou*" counter @click:append="show1 = !show1"></v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                      <v-btn x-large block :loading="registerRequest" :disabled="!valid" color="primary" @click="validate">Registrovat</v-btn>
                  </v-col>
              </v-row>
            </v-form>          
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-card
            class="mb-12"
            color="grey lighten-4"
            elevation="1"            
          >         
            <v-container grid-list-xs>
              <p class="pa-2">Výborně! Tvá registrace proběhla úspěšně. Nyní prosím kontaktuj správce webu nebo některého z vedoucích a popros je o manuální potvrzení tvého nového účtu.</p>              
            </v-container>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import axios from "axios";
import LoginForm from "../../components/Login/LoginForm";
import LoginLoader from "../../components/Login/LoginLoader";

export default {
  name: 'Register',

  components: {
    LoginForm,
    LoginLoader,
  },

  methods:  {
    validate() {
      if (this.$refs.registerForm.validate()) {
        this.register();
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },

    register()  {
      this.registerRequest = true;
      this.showUniqueDemand.username = false;
      this.showUniqueDemand.email = false;
      axios.post("/auth/local/register", this.getRegisterJson)
        .then((res) =>  {
          console.log("Registration successfull", res);
          this.e1=4;
          this.registerRequest = false;
        })
        .catch((e) => {
          console.log("there has been an error during registration", e.response);

          //email already taken
          if (e.response.data.message[0].messages[0].id == "Auth.form.error.email.taken")  {
            console.log("Houston, we have a problem! Email already taken...");
            this.showUniqueDemand.email = true;
          }

          //username already taken
          if (e.response.data.message[0].messages[0].id == "Auth.form.error.username.taken")  {
            console.log("Houston, we have a problem! Username already taken...");
            this.showUniqueDemand.username = true;
          }

          this.registerRequest = false;
        })
    }
  },

  data () {
    return {
      e1: 1,

      registerRequest:false,  

      valid: true,    
      username: "",
      name: "",
      prezdivka: "",
      email: "",
      password: "",
      verify: "",
      loginPassword: "",
      loginEmail: "",
      emailRules: [
        v => !!v || "Povinný údaj",
        v => /.+@.+\..+/.test(v) || "neplatný email"
      ],
      show1: false,
      rules: {
        required: value => !!value || "Povinný údaj",
        min: v => (v && v.length >= 6) || "Heslo musí mít minimálně 6 znaků",
      },

      //check unique username and email
      showUniqueDemand: {
        username:false,
        email:false
      }
    }
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

    passwordMatch() {
      return () => this.password === this.verify || "Hesla se musí shodovat";
    },

    getRegisterJson() {
      const registerJson = {
        username: this.username,
        jmeno: this.name,
        prezdivka: this.prezdivka,
        password: this.password,
        email: this.email,
        confirmed: false,
        blocked: true,
      }
      return registerJson
    },

    isLoggedIn: {
      set() {},
      get() {
        return this.$store.getters.isLoggedIn;
      },
    },
  },

  created()  {
    console.log("page loaded");
  }
};
</script>

<style scoped>
  h1  {
    font-family: "skautbold";
    font-size: 2.5rem;
  }

  h2  {
    font-family: "skautbold";
  }

  .cont {
    text-align: center;
  }
</style>
