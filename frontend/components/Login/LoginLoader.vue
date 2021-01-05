<template>
   <!-- <v-dialog v-model="dialogLogin" hide-overlay persistent width="400"> -->
      <v-card color="#174085" dark>
        <v-card-text>
          Přihlašuji...
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    <!-- </v-dialog> -->
</template>

<script>
export default {
  name: 'LoginLoader',

  methods:  {
    // closeDialog: function() {
    //   this.$store.dispatch("closeDialog");
    //   this.wrongPassword=false;
    //   this.username = null;
    //   this.password = null;
    // }
  },

  computed: {
    // loginDialog: {
    //   set() {
    //     // this.$store.dispatch("toggleLoginDialog");
    //     this.closeDialog();
    //   },
    //   get() {
    //     return this.$store.getters.getLoginDialog;
    //   },
    // },
  }
};
</script>

<style>
</style>
