<template>
  <v-container class="aboutus">
    <v-layout row wrap justify-space-around align-center>
      <v-flex xs12 md6 text-center>
        <h1>O NÁS</h1>
      </v-flex>

      <v-flex xs12 md6 text-center class="popis">
        <p>
          Jsme uskupení 6 skautských oddílů, které spolu úzce spolupracují, proto máme všichni shodné označení oddílu - 2. Patříme pod středisko Srdíčko Třebíč.
          Každý oddíl se schází jednou týdně, jezdí na výpravy, skautské závody a tábor.
          Jsme katolické oddíly, proto se na schůzkách modlíme a snažíme se dbát na duchovní rozvoj dětí.
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
    data: () => ({
        sideNav: false,
        menuItems: [
            {icon: "mdi-newspaper-variant", title: "Aktuality", link: "/aktuality"},
            {icon: "mdi-account-group", title: "O nás", link: "/about"},
            {icon: "mdi-flash", title: "Trafo", link: "/trafo"},
            {icon: "mdi-image-multiple", title: "Fotogalerie", link: "/fotogalerie"},
            {icon: "mdi-card-account-phone", title: "Kontakt", link: "/kontakt"},
        ],
    }),
};
</script>

<style scoped>
p {
  color: white;
}

h1 {
  font-family: "skautbold";
  font-size: 3rem;
  padding: 1em;
  margin-right: 50px;
  color: white;
}

@media screen and (min-width: 960px) {
  h1 {
    border-right: 3px solid #fff;
  }  

  .popis  {
    padding-left:30px;
  }
}

@media screen and (max-width: 960px) {
  .aboutus h1  {
    margin: 0 !important;
    padding:0 20px 5px 20px !important;
  }

  .aboutus {
    padding:10px 20% !important;
  }

  
}

.aboutus {
  padding: 30px 25%;
  position: relative;
  /* display: block; */
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #174085;
  max-width: 100%;
}

/* .logo-bg {
  top: -65px;
  left: -60px;
  width: 300px;
  height: auto;
  position: absolute;
  opacity: 0.08;
  transform: rotate(20deg);
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
} */
</style>