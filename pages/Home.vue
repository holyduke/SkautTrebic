<template>
  <div class="home">
    <WelcomeImage />
    <hr class="new5">
    <AboutUs />
    <hr class="new5">
    <Oddily/>
  </div>
</template>

<script>
// @ is an alias to /src
import WelcomeImage from "@/components/WelcomeImage.vue";
import AboutUs from "@/components/AboutUs.vue";
import Oddily from "@/components/Oddily.vue";

export default {
  name: "Home",
  components: {
    WelcomeImage,
    AboutUs,
    Oddily
  }
};
</script>

<style scoped>
hr.new5 {
  border: 10px solid #174085;
  /* border-radius: 5px; */
}
</style>
