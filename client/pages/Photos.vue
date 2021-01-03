<template>
  <v-container grid-list-xs class="px-4 main-center-limitwidth">
    <div class="main-container">
      <h1 class="mb-0" id="Aktuality">Fotogalerie</h1>
      <v-divider class="mb-2"></v-divider>
      <div v-if="skautZoneramaLoading" class="zonerama">
        <v-skeleton-loader
          class="mx-auto"
          style="width: 100%; height: 400px"
          type="card"
        ></v-skeleton-loader>
      </div>
      <div v-show="!skautZoneramaLoading" class="zonerama">
        <iframe
          src="https://www.zonerama.com/Embed/Account/246290?color=blue&autoplay=false&vertical=false"
          target="_blank"
          style="width: 100%; height: 350px"
          scrolling="no"
          @load="skautLoaded()"
          frameborder="0"
          allowTransparency="true"
        ></iframe>
      </div>

      <div v-if="vlcataZoneramaLoading" class="zonerama">
        <v-skeleton-loader
          class="mx-auto"
          style="width: 100%; height: 370px"
          type="card"
        ></v-skeleton-loader>
      </div>
      <div v-show="!vlcataZoneramaLoading" class="zonerama">
        <iframe
          src="https://www.zonerama.com/Embed/Account/24898?color=orange&autoplay=false&vertical=false"
          target="_blank"
          style="width: 100%; height: 350px"
          scrolling="no"
          @load="vlcataLoaded()"
          frameborder="0"
          allowTransparency="true"
        ></iframe>
      </div>

      <div v-if="vlcataZoneramaLoading" class="zonerama">
        <v-skeleton-loader
          class="mx-auto"
          style="width: 100%; height: 370px"
          type="card"
        ></v-skeleton-loader>
      </div>
      <div v-show="!roveriZoneramaLoading" class="zonerama">
        <iframe
          src="https://www.zonerama.com/Embed/Account/260312?color=green&autoplay=false&vertical=false"
          target="_blank"
          style="width: 100%; height: 350px"
          scrolling="no"
          @load="roveriLoaded()"
          frameborder="0"
          allowTransparency="true"
        ></iframe>
      </div>


      <div class="mt-2 zonerama">
        <v-btn
          class="white--text"
          color="#58b220"
          target="_blank"
          href="https://skautky2.rajce.idnes.cz/"
        >
          <strong>Skautky</strong>
        </v-btn>
      </div>
      <!-- <div class="zonerama">
        <iframe src="https://www.zonerama.com/Embed/Account/260312?color=green&autoplay=false&vertical=false" style="width: 720px; height: 330px;" scrolling="no" frameborder="0" allowTransparency="true"></iframe>
      </div> -->
    </div>
  </v-container>
</template>

<script>
// import Constants from "@/constants.js";

export default {
  name: "Photos",

  data() {
    return {
      colors: Constants.colors,
      skautZoneramaLoading: true,
      vlcataZoneramaLoading: true,
      roveriZoneramaLoading: true,
    };
  },

  methods: {
    skautLoaded() {
      this.skautZoneramaLoading = false;
      console.log("skaut loaded");
    },

    vlcataLoaded() {
      this.vlcataZoneramaLoading = false;
      console.log("vlcata loaded");
    },

    roveriLoaded() {
      this.roveriZoneramaLoading = false;
      console.log("roveri loaded");
    }
  },
};
</script>

<style scoped>
h1 {
  font-family: "skautbold";
  margin: 20px 0 20px 0;
  font-size: 2.5rem;
}

.zonerama {
  margin-top: 5px;
  padding: 0 15px;
}

.main-container >>> .pull-menu {
  display: none !important;
}
</style>
