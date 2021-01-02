<template>
  <div v-if="priloha.length">
    <v-divider class="mb-5"></v-divider>
    <strong>Soubory ke stažení:</strong>
    <div class="downloadItem py-1 my-3" v-for="(item, index2) in priloha" :key="index2">
      {{item.name}}
      <span class="size">— {{printFileSize(item.size)}}</span>
      <v-btn dark color="#f6a800" class="ml-3" small :href="item.url">
        <v-icon>mdi-download</v-icon>Stáhnout
      </v-btn>
      <v-btn
        v-if="showDeleteBtn"
        dark
        color="error"
        class="ml-3"
        small
        @click="deleteFile(item._id)"
      >
        <v-icon>mdi-delete</v-icon>Smazat
      </v-btn>
    </div>
    <Confirm ref="confirm"></Confirm>

  </div>
</template>

<script>
import axios from "axios";
import Confirm from "@/components/Confirm";


export default {
  name: "FilesToDownload",

  data() {
    return {
    };
  },

  methods: {
    printFileSize: function (s) {
      if (s) {
        if (s>1000) { //MB
          return (s/1000).toFixed(1) + " MB";
        }
        else  {
          return s.toFixed(0) + " kB";
        }
      }
    },

    deleteFile(_id) {
      console.log("trying to delete file",_id);
      this.$refs.confirm.open('Odstranit', 'Opravdu chcete tento soubor smazat? Soubor bude trvale vymazán.', { color: 'error' }).then((confirm) => {
        if (confirm)  {
          axios
            .delete("/upload/files/" + _id)
            .then((response) => {
              console.log("the file was deleted successfully", response);
              const index = this.priloha.findIndex((it) => {
                return it._id == _id;
              });
              this.priloha.splice(index, 1);
            })
            .catch(function (e) {
              console.log("FAIL! File was not deleted...");
              console.log(e);
            });
        }
      })
    },
  },

  props: ['priloha', 'showDeleteBtn'],

  components: {
    Confirm,
  }
};
</script>

<style scoped>
</style>
