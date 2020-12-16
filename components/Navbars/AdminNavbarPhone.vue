<template>
  <div>
    <div v-for="(itemMenu, index) in adminMenu" :key="index">
      <div dark class="upravyTitle mx-n2">
        {{itemMenu.title}}
      </div>
      <div class="d-lg-none" v-for="(subitem, subindex) in itemMenu.items" :key="subindex">
        <v-btn depressed color="#fff" router :to="subitem.link">
          <v-icon left>{{ subitem.icon }}</v-icon>
          <strong>{{subitem.title}}</strong>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminNavbarPhone",

  data() {
    return {      
    };
  },

  computed: {
    items:  function() {
      return this.$store.getters.getAdminMenu.items;
    },

    adminMenu:  function() {
      return this.$store.getters.getAdminMenu;
    }
  },

};
</script>

<style scoped>
.upravyTitle  {
  background-color: #174085;
  color:white;
  padding: 3px 30px
}
</style>

