<template>
  <v-card
    elevation="4"
    class="pa-4 mb-5"
    >
      <div >          
        <h2>Implementované funkce</h2>      
        <p>Následující funkce se mi podařilo přidat na web:</p>    
        <v-card
          v-for="(item, index) in features.done" :key="index"
          elevation="2"
          class="my-1"
        >
          <v-card-subtitle>
            <span> ✔️  {{item.popis}} ({{getDate(item.updatedAt)}})</span>
          </v-card-subtitle>
        </v-card>

        <br>
        <br>

        <h2>Plánované funkce</h2>        
        <p>Tyto funkce plánuji přidat. Můžete přidat také vlastní požadavek na novou funkci na webu. Prosím o konkrétní popis problému, aby pro mě bylo jasné, o co se jedná.</p> 
        <v-card
          v-for="(item, index2) in features.notdone" :key="'A' + index2"
          elevation="2"
          class="my-1"
        > 
          <v-card-subtitle>
            <span> ❌  {{item.popis}}</span>
          </v-card-subtitle>
        </v-card>
        <v-card         
          elevation="2"
          class="my-1 "
        >
          <v-card-subtitle>
            <v-text-field
            v-model="newFeatureText"
            counter="250"
            label="Požadavek na novou funkci"
            @keydown.enter="saveNewFeature"
          ></v-text-field>
          <div class="d-flex justify-end mt-4">
            <v-btn :loading="uploading" color="#174085" class="white--text" @click="saveNewFeature">Přidat</v-btn>
          </div>
          
          </v-card-subtitle>

        </v-card>
      </div>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: 'Features',

  data() {
    return {
      features: {
        done: [],
        notdone: []
      },
      show: false,
      newFeatureText: "",
      uploading:false,      
    }
  },

  methods: {
    getDate(updatedAt)  {
      const date = new Date(updatedAt);
      return date.toLocaleDateString('cs-CS');
    },

    saveNewFeature()  {
      if (this.newFeatureText)  {
        console.log("saving new feature");
        this.uploading=true;
        axios.post("/features", {
          'popis': this.newFeatureText
          })
          .then((res) => {
            console.log("res", res);
            this.uploading=false;
            this.features.notdone.push(res.data);
            this.newFeatureText="";
          })
          .catch((e) => {
            console.log("posting new feautre was not successfull", e);
            this.uploading=false;
          });
      }
    },

    getFeatures() {
      axios.get("/features").then((res) => {
        console.log("features", res.data);
        res.data.forEach(f => {
          if (f.done) {
            this.features.done.push(f);
          }
          else {
            this.features.notdone.push(f);
          }
        });
      });
    },

  }, 

  created() {
    this.getFeatures();
  }    
}
</script>

<style scoped>
</style>
