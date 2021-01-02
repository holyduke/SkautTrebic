<template>
  <!-- -------------computer admin navbar------------- -->
  <v-navigation-drawer
    stateless
    value="true"
    width="250px"
    class="adminNavbar d-none d-lg-flex lgAndUp"
    color="#444"
    left
    absolute
    dark
  >
    <v-list v-for="(itemMenu, index) in adminMenu" :key="index" dense nav class="py-0 ma-0">
      <div class="upravy py-1 pl-9 mx-n5">
        <div class="upravyTitle my-0 py-0">{{itemMenu.title}}</div>
      </div>

      <v-list-item v-for="(subitem, subindex) in itemMenu.items" :key="subindex" :to="subitem.link">
        <v-list-item-icon>
          <v-icon>{{ subitem.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ subitem.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "AdminNavbarPC",

  data() {
    return {
      model: 3,
    };
  },

  computed: {
    isContributor() {
      return this.$store.getters.isContributor;
    },

    items: function () {
      return this.$store.getters.getAdminMenu.items;
    },

    adminMenu: function () {
      return this.$store.getters.getAdminMenu;
    },
  },
};
</script>

<style scoped>
.adminNavbar {
  margin-top: 64px;
  position: fixed;
  z-index: 2;
  top: 0;
}


.upravy {
  background-color: #222;
}

.upravyTitle {
  color: #ffce48;
}
</style>

