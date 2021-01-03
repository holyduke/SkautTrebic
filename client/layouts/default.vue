<template>
  <v-app light :dark="false">
    <Navbar />
      <nuxt/>
    <!-- <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <!-- <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>


<style>
:root {
  --color: #243746;
  --color-primary: #158876;
  --color-secondary: #0e2233;
  --bg: #f3f5f4;
  --bg-secondary: #fff;
  --border-color: #ddd;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: var(--bg);
  color: var(--color);
  transition: background-color 0.3s;
}

@font-face {
  font-family: "themix";
  src: url("~assets/fonts/themix/TheMix_LT_400.eot");
  src: url("~assets/fonts/themix/TheMix_LT_400.eot? #iefix")
    format("embedded-opentype");
  src: url("~assets/fonts/themix/TheMix_LT_400.woff") format("woff"),
    url("~assets/fonts/themix/TheMix_LT_400.woff2") format("woff2"),
    url("~assets/fonts/themix/TheMix_LT_400.otf") format("opentype"),
    url("~assets/fonts/themix/TheMix_LT_400.svg#themix") format("svg");
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "themix";
  src: url("~assets/fonts/themix/TheMix_LT_400i.eot");
  src: url("~assets/fonts/themix/TheMix_LT_400i.eot? #iefix")
    format("embedded-opentype");
  src: url("~assets/fonts/themix/TheMix_LT_400i.woff") format("woff"),
    url("~assets/fonts/themix/TheMix_LT_400i.woff2") format("woff2"),
    url("~assets/fonts/themix/TheMix_LT_400i.otf") format("opentype"),
    url("~assets/fonts/themix/TheMix_LT_400i.svg#themix") format("svg");
  font-weight: 400;
  font-style: italic;
}
@font-face {
  font-family: "themix";
  src: url("~assets/fonts/themix/TheMix_LT_700.eot");
  src: url("~assets/fonts/themix/TheMix_LT_700.eot? #iefix")
    format("embedded-opentype");
  src: url("~assets/fonts/themix/TheMix_LT_700.woff") format("woff"),
    url("~assets/fonts/themix/TheMix_LT_700.woff2") format("woff2"),
    url("~assets/fonts/themix/TheMix_LT_700.otf") format("opentype"),
    url("~assets/fonts/themix/TheMix_LT_700.svg#themix") format("svg");
  font-weight: 700;
  font-style: normal;
}
@font-face {
  font-family: "themix";
  src: url("~assets/fonts/themix/TheMix_LT_700i.eot");
  src: url("~assets/fonts/themix/TheMix_LT_700i.eot? #iefix")
    format("embedded-opentype");
  src: url("~assets/fonts/themix/TheMix_LT_700i.woff") format("woff"),
    url("~assets/fonts/themix/TheMix_LT_700i.woff2") format("woff2"),
    url("~assets/fonts/themix/TheMix_LT_700i.otf") format("opentype"),
    url("~assets/fonts/themix/TheMix_LT_700i.svg#themix") format("svg");
  font-weight: 700;
  font-style: italic;
}
@font-face {
  font-family: "skautbold";
  src: url("~assets/fonts/skautbold/skaut-bold-webfont.eot");
  src: url("~assets/fonts/skautbold/skaut-bold-webfont.eot? #iefix")
    format("embedded-opentype");
  src: url("~assets/fonts/skautbold/skaut-bold-webfont.woff") format("woff"),
    url("~assets/fonts/skautbold/skaut-bold-webfont.woff2") format("woff2"),
    url("~assets/fonts/skautbold/skaut-bold-webfont.otf") format("opentype"),
    url("~assets/fonts/skautbold/skaut-bold-webfont.svg#skautbold") format("svg");
  font-weight: normal;
  font-style: normal;
}
:root {
  --myblack: #0b0b0b;
  --myblue: #174085;
  --mygrey: #e8e8e8;
  --myorange: #f6a800;
}
#app {
  font-family: "themix", sans-serif;
  font-weight: 400;
  margin: 0px;
  padding: 0px;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
}

h1 {
  font-family: "skautbold";
  margin: 20px 0 20px 0;
  font-size: 2.5rem;
}

.new5 {
  /* compatibility with Microsoft Edge, white line was added between components */
  display: none;
}

@media screen and (min-width: 1264px) {
  .contributor  {
    padding-left: 250px;
  }
}

.main-center-limitwidth {
  margin: auto;
  max-width: 1500px;
  margin-top: 0px;
  padding-top: 0px;
}
</style>
