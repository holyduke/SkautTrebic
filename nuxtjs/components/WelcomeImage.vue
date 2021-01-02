<template>
  <div class="welcomeimage" :class="{ 'welcomeimageAdmin': isContributor }">
    <div class="logo" :class="{ 'logoAdmin': isContributor }">
      <img src="https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/static/oranz_vert.svg" alt="skautská lilie" class="svg orange1" />
      <img src="https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/static/oranz_hor_.svg" alt="skautská lilie" class="svg orange2" />
      <img src="https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/static/modr_left.svg" alt="skautská lilie" class="svg blue1" />
      <img src="https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/static/modr_right.svg" alt="skautská lilie" class="svg blue2" />
      <img src="https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/static/drak.svg" alt="skautská lilie" class="svg drak" />
      <img src="https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/static/jazyk.svg" alt="skautská lilie" class="svg jazyk" />
    </div>
    <div class="title" :class="{'titleAdmin': isContributor }">
      <h1>SKAUT</h1>
      <h2>2. Katolické oddíly</h2>
      <h3>Třebíč</h3>
    </div>
  </div>
</template>

<script>
// import { ref } from "vue";
export default {
  // setup() {
  //   // const logo = ref(null);
  //   // const title = ref(null);

  //   return {
  //     logo,
  //     title,
  //   };
  // },

  computed: {
    isContributor() {
      return this.$store.getters.isContributor;
    },
  }
};
</script>

<style scoped>
.logo {
  top: 80px;
  position: relative;
  /* -webkit-filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.2)); */
  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.2));
}

.title {
  /* -webkit-filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.2)); */
  /* filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.2)); */
  text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease 0s;
  padding-bottom: 80px;
}

.svg {
  top: 0px;
  display: block;
  margin: auto;
  position: absolute;
  left: 50%;
  height: auto;
  transition: all 0.2s ease 0s;
  z-index: 1;
}

.orange1 {
  top: 15px;
  /* width: calc(91px); */
  margin-left: calc(-91px / 2);
}

.orange2 {
  top: 114px;
  /* width: calc(289px); */
  margin-left: calc(-289px / 2);
}

.blue1 {
  /* width: calc(331px); */
  margin-left: calc(-331px / 2);
}

.blue2 {
  /* width: calc(331px); */
  margin-left: calc(-331px / 2);
}

.drak {
  top: 133px;
  margin-left: calc(-106px / 2);
}

.jazyk {
  top: 163px;
  transform: rotate(-15deg);
  /* width: calc(97px); */
  margin-left: calc(-92px / 2);
}

.logo:hover .blue1,
.logo:hover .blue2 {
  transform: scale(1.02);
}

.logo:hover .orange1 {
  top: 18px;
  transform: scale(1.05);
}

.logo:hover .orange2 {
  top: 117px;
  transform: scale(1.05);
}

.logo:hover .drak {
  top: 133px;
  transform: scale(1.15);
  transition: all 0.2s ease 0s;
  margin-left: calc(-106px / 2);
}

.logo:hover .jazyk {
  transform: scale(1.17);
  transform: rotate(-15deg);
  transform-origin: 50% 50%;
  top: 160px;
  margin-left: calc(-98px / 2); 
  transition: all 0.2s ease 0s;
  animation: lick 0.6s infinite linear;
}

h1 {
  padding-top: 470px;
  /* top: 520px; */
  font-family: skautbold, sans-serif;
  font-size: 5rem;
  color: #174085;
  margin: 0;
}

h2 {
  margin-top: 35px;
  font-family: skautbold, sans-serif;
  font-size: 3rem;
  color: #174085;
}

h3 {
  margin-top: 20px;
  font-family: skautbold, sans-serif;
  font-size: 3rem;
  color: #174085;
}

.welcomeimage {
  /* width: 100%; */
  /* max-width: 100%; */
  min-height: 100%;
  /* height: 100%; */
  /* object-fit: cover; */
  /* min-height: 900px; */
  /* width: 100%; */
  /* height: auto; */
  /* background-image: url("../../public/taboriste-min.jpg"); */
  background-image: url("https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/static/taboriste_min.jpg");
  /* background-repeat: no-repeat; */
  animation: scaleslider 60s infinite ease-in-out;
  background-size: cover;
  background-position: center;
  /* /* justify-content: center; */
  text-align: center;
  /* align-items: center; */
  padding-top: 1px;
}

@keyframes scaleslider {
  0% {
    background-size: 100%;
  }
  50% {
    background-size: 140%;
  }
  100% {
    background-size: 100%;
  }
}

@keyframes lick {
  0% {
    transform: rotateZ(-17deg);
  }
  15% {
    transform: rotateZ(-19deg);
  }
  40% {
    transform: rotateZ(-11deg);
  }
  65% {
    transform: rotateZ(-9deg);
  }
  100% {
    transform: rotateZ(-17deg);
  }
}

@media screen and (max-width: 1072px) {
  .welcomeimage {
    font-size: 1rem !important;
    animation: none;
  }
}

@media screen and (max-width: 1367px) {
  .welcomeimageAdmin {
    height: 600px;
    animation: none;
  }

  .logoAdmin  {
    top:40px;
  }
  
  .titleAdmin {
    position: relative;
    top: 430px;
  }

  .titleAdmin h1 {
    padding-top: 0;
    font-size: 4rem;
  }

  .titleAdmin h2 {
    font-size: 1.6em !important;
    margin-top: 25px !important;
  }

  .titleAdmin h3 {
    font-size: 1.6em !important;
    margin-top: 12px !important;
  }
}

@media screen and (max-width: 600px) {
  .welcomeimage {
    height: 530px;
    margin-top: -30px;
  }

  .title {
    position: relative;
    top: 360px;
  }

  .title h1 {
    padding-top: 0;
    font-size: 4rem;
  }

  .title h2 {
    font-size: 1.6em !important;
    margin-top: 25px !important;
  }

  .title h3 {
    font-size: 1.6em !important;
    margin-top: 12px !important;
  }

  .logo {
    transform: scale(0.75);
    top: 70px;
  }
}
</style>