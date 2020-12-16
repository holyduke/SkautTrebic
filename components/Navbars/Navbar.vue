<template>
  <div>
    <!-- define side nav bar for mobiles -->
    <v-navigation-drawer
      fixed
      v-model="sideNav"
      temporary
      right
      class="mx-auto sideNavigation align-center justify-center"
    >
      <v-list dense nav>
        <v-menu
          rounded
          transition="scale-transition"
          origin="top"
          offset-y
          v-for="item in menuItems"
          :key="item.title"
        >
          <template v-slot:activator="{ on, attrs }">
            <div>
              <v-btn depressed color="#fff" router :to="item.link">
                <v-icon left>{{ item.icon }}</v-icon>
                <strong>{{ item.title }}</strong>
              </v-btn>
              <v-btn
                v-bind="attrs"
                v-on="on"
                v-if="item.subs"
                @click="item.chosen = true"
                depressed
                color="#fff"
                class="text-right"
              >
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </div>
          </template>
          <v-list v-show="item.subs && sideNav && item.chosen">
            <v-list-item
              dense
              outlined
              v-for="subitem in item.subs"
              :key="subitem.title"
              router
              :to="subitem.link"
            >
              <v-list-item-title>{{ subitem.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <AdminNavbarPhone v-if="isContributor" />
      </v-list>

      <!-- add login button  -->
      <template v-if="!isLoggedIn" v-slot:append>
        <div class="my-7">
          <v-btn
            large
            block
            color="#174085"
            @click.stop="setLoginDialogForm(true)"
          >
            <v-icon left>{{ loginButton.icon }}</v-icon>
            <strong>{{ loginButton.title }}</strong>
          </v-btn>
        </div>
      </template>

      <!-- add log out button -->
      <template v-else v-slot:append>
        <div>
          <p class="ml-1">Přihlášen jako:</p>
        </div>

        <v-menu
          top
          open-on-hover
          transition="scale-transition"
          origin="top"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              color="#174085"
              v-bind="attrs"
              v-on="on"
              class="align-self-center mb-4 mt-n2"
            >
              <v-avatar left>
                <v-icon>mdi-account-circle</v-icon>
              </v-avatar>
              {{ getName }}
              <span class="ml-1" v-show="getPrezdivka"
                >({{ getPrezdivka }})</span
              >
              <v-avatar right>
                <v-icon>mdi-chevron-down</v-icon>
              </v-avatar>
            </v-chip>
          </template>
          <v-list>
            <v-list-item @click.stop="logout()">
              <v-list-item-title>
                <v-icon left>{{ logoutButton.icon }}</v-icon>
                {{ logoutButton.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-navigation-drawer>

    <!-- -------------normal top navbar------------------------------------------------------------------------- -->
    <v-app-bar
      app
      color="#f6a800"
      height="64px"
      :hide-on-scroll="$vuetify.breakpoint.mdAndDown ? true : false"
      class="navigation"
      :class="{ mobileView: $vuetify.breakpoint.mdAndDown }"
    >
      <router-link :to="{ name: 'Home' }" tag="span" style="cursor: pointer">
        <v-img
          alt="Skautské logo"
          class="shrink mr-3"
          contain
          src="https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/static/skaut_logo_bnw.png"
          transition="scale-transition"
          width="40"
        />
      </router-link>
      <v-toolbar-title>
        <router-link
          :to="{ name: 'Home' }"
          tag="span"
          style="cursor: pointer"
          class="title"
          >2. KATOLICKÝ ODDÍL TŘEBÍČ</router-link
        >
      </v-toolbar-title>
      <v-chip v-if="development()" class="ml-1 white--text"  color="purple darken-1"> <strong>DEVELOPMENT</strong> </v-chip>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-md-and-down">
        <v-menu
          open-on-hover
          transition="scale-transition"
          origin="top"
          offset-y
          v-for="item in menuItems"
          :key="item.title"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              depressed
              color="#f6a800"
              v-bind="attrs"
              v-on="on"
              router
              :to="item.link"
            >
              <v-icon left>{{ item.icon }}</v-icon>
              <strong>{{ item.title }}</strong>
            </v-btn>
          </template>
          <v-list v-if="item.subs">
            <v-list-item
              v-for="subitem in item.subs"
              :key="subitem.title"
              router
              :to="subitem.link"
            >
              <v-list-item-title>{{ subitem.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- add login button -->
        <template v-if="!isLoggedIn">
          <v-btn
            min-width="160px"
            depressed
            color="#db9600"
            @click.stop="setLoginDialogForm(true)"
          >
            <v-icon left>{{ loginButton.icon }}</v-icon>
            <strong>{{ loginButton.title }}</strong>
          </v-btn>
        </template>

        <!-- add log out button -->
        <template v-if="isLoggedIn">
          <v-menu
            open-on-hover
            transition="scale-transition"
            origin="top"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-chip
                color="#222"
                v-bind="attrs"
                v-on="on"
                class="align-self-center ml-4"
              >
                <v-avatar left>
                  <v-icon>mdi-account-circle</v-icon>
                </v-avatar>
                {{ getName }}
                <span class="ml-1" v-show="getPrezdivka"
                  >({{ getPrezdivka }})</span
                >
                <v-avatar right>
                  <v-icon>mdi-chevron-down</v-icon>
                </v-avatar>
              </v-chip>
            </template>
            <v-list>
              <v-list-item @click.stop="logout()">
                <v-list-item-title>
                  <v-icon left>{{ logoutButton.icon }}</v-icon>
                  {{ logoutButton.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-toolbar-items>
      <v-app-bar-nav-icon
        @click.stop="resetSideNav"
        class="hidden-lg-and-up"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <AdminNavbarPC v-if="isContributor" />

    <Login />

    <v-snackbar v-model="isLoggedIn" v-if="getJustLoggedIn" :timeout="2500"
      >Byli jste úspěšně přihlášeni.</v-snackbar
    >
    <v-snackbar v-model="isLoggedOut" :timeout="2500"
      >Byli jste úspěšně odhlášeni.</v-snackbar
    >

    <v-snackbar v-model="saveSnackbar" :timeout="2100">
      Změny byly úspěšně uloženy
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="$store.commit('setSaveSnackbar', false)"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Env from "@/mixins/Env";

export default {
  data: () => ({
    sideNav: false,
    menuItems: [
      {
        icon: "mdi-newspaper-variant",
        title: "Aktuality",
        link: "/aktuality",
        subs: [
          {
            title: "Skauti",
            link: { name: "Aktuality", params: { oddil: "skauti" } },
          },
          {
            title: "Skautky",
            link: { name: "Aktuality", params: { oddil: "skautky" } },
          },
          {
            title: "Vlčata",
            link: { name: "Aktuality", params: { oddil: "vlcata" } },
          },
          {
            title: "Světlušky",
            link: { name: "Aktuality", params: { oddil: "svetlusky" } },
          },
          {
            title: "Roveři",
            link: { name: "Aktuality", params: { oddil: "roveri" } },
          },
          {
            title: "Oldskauti",
            link: { name: "Aktuality", params: { oddil: "oldskauti" } },
          },
        ],
        chosen: false,
      },
      {
        icon: "mdi-image-multiple",
        title: "Fotogalerie",
        link: "/fotogalerie",
        subs: null,
      },
      {
        icon: "mdi-home-modern",
        title: "Klubovna",
        link: "/klubovna",
        subs: null,
      },
      {
        icon: "mdi-account-group",
        title: "Kontakt",
        link: { name: "KontaktVedouci" },
        subs: [
          {
            title: "Skauti",
            link: { name: "Kontakt", params: { oddil: "skauti" } },
          },
          {
            title: "Skautky",
            link: { name: "Kontakt", params: { oddil: "skautky" } },
          },
          {
            title: "Vlčata",
            link: { name: "Kontakt", params: { oddil: "vlcata" } },
          },
          {
            title: "Světlušky",
            link: { name: "Kontakt", params: { oddil: "svetlusky" } },
          },
          {
            title: "Roveři",
            link: { name: "Kontakt", params: { oddil: "roveri" } },
          },
          {
            title: "Oldskauti",
            link: { name: "Kontakt", params: { oddil: "oldskauti" } },
          },
        ],
        chosen: false,
      },
    ],
    loginButton: {
      icon: "mdi-lock-open",
      title: "Přihlásit se",
    },
    logoutButton: {
      icon: "mdi-lock",
      title: "Odhlásit se",
    },
  }),

  mixins: [Env],


  methods: {
    resetSideNav: function () {
      this.sideNav = !this.sideNav;
      this.menuItems.forEach((element) => {
        element.chosen = false;
      });
    },

    ...mapActions(["setLoginDialogForm", "logout"]),
  },

  computed: {    

    isContributor() {
      return this.$store.getters.isContributor;
    },
    isLoggedIn: {
      set() {},
      get() {
        return this.$store.getters.isLoggedIn;
      },
    },

    isLoggedOut: {
      set() {},
      get() {
        return this.$store.getters.isLoggedOut;
      },
    },

    getPostSaved: {
      set() {},
      get() {
        return this.$store.getters.getPostSaved;
      },
    },

    getName() {
      return this.$store.getters.getName;
    },

    getPrezdivka() {
      return this.$store.getters.getPrezdivka;
    },

    getJustLoggedIn() {
      return this.$store.getters.getJustLoggedIn;
    },

    saveSnackbar: {
      set(value) {
        this.$store.commit("setSaveSnackbar", value);
      },
      get() {
        return this.$store.getters.getSaveSnackbar;
      },
    },
  },
};
</script>

<style scoped>
.sideNavigation {
  max-width: 215px;
  z-index: 101 !important;
}

.title {
  font-family: "skautbold" !important;
  font-size: 1.9rem !important;
  white-space: normal !important;
}

@media only screen and (max-width: 600px) {
  .title {
    font-size: 1.5rem !important;
  }
}

@media only screen and (max-width: 480px) {
  .title {
    font-size: 1.1rem !important;
  }
}

@media only screen and (max-width: 380px) {
  .title {
    font-size: 0.82rem !important;
  }
}

.navigation {
  z-index: 100 !important;
}

</style>