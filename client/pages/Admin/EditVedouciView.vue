<template>
  <v-container grid-list-xs class="main-center-limitwidth">
    <h1 v-if="editView">Editovat vedoucí - {{ editedPerson.jmeno }}</h1>
    <h1 v-else>Vytvořit nového vedoucího</h1>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container class="inputCont">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="editedPerson.jmeno"
              :rules="textRules"
              required
              @keyup="editedFlag = true"
              label="Jméno a příjmení"
            ></v-text-field>

            <v-text-field
              v-model="editedPerson.prezdivka"
              @keyup="editedFlag = true"
              label="Přezdívka"
            ></v-text-field>

            <v-text-field
              v-model="editedPerson.funkce"
              :rules="textRules"
              required
              @keyup="editedFlag = true"
              label="Funkce"
            ></v-text-field>

            <v-select
              :items="oddily"
              v-model="editedPerson.oddil"
              item-text="nazev"
              item-value="_id"
              label="Oddíl"
            ></v-select>

            <v-row>
              <v-col cols="6">
                <v-file-input
                  show-size
                  accept="image/*"
                  v-model="file"
                  label="Fotka"
                  @change="photoChanged"
                ></v-file-input>
              </v-col>
              <!-- <v-col cols="6">
                <v-btn :loading="loading3" :disabled="loading3" color="#174085" class="mt-3 white--text" @click="loader = 'loading3'">Načíst<v-icon right dark>mdi-cloud-upload</v-icon></v-btn>
              </v-col> -->
              <v-col cols="6">
                <v-btn color="error" class="mt-3 ml-n2" @click="deletePhoto"
                  >Smazat fotku</v-btn
                >
              </v-col>
            </v-row>

            <v-textarea
              v-model="editedPerson.popis"
              @keyup="editedFlag = true"
              outlined
            >
              <template v-slot:label>
                <div>Popis</div>
              </template>
            </v-textarea>

            <v-text-field
              v-model="editedPerson.facebook"
              @keyup="editedFlag = true"
              label="Facebook odkaz"
            ></v-text-field>

            <v-text-field
              v-model="editedPerson.telefon"
              :rules="telephoneRules"
              @keyup="editedFlag = true"
              :counter="25"
              label="Telefon"
            ></v-text-field>

            <v-text-field
              v-model="editedPerson.email"
              :rules="emailRules"
              required="false"
              @keyup="editedFlag = true"
              :counter="40"
              label="Email"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <h1 class="text-center">Náhled</h1>
            <PersonCard
              :fotka="editedPerson.fotka[0]"
              :jmeno="editedPerson.jmeno"
              :prezdivka="editedPerson.prezdivka ? editedPerson.prezdivka : ''"
              :funkce="editedPerson.funkce ? editedPerson.funkce : ''"
              :popis="editedPerson.popis ? editedPerson.popis : ''"
              :email="editedPerson.email ? editedPerson.email : ''"
              :_id="editedPerson._id"
              :telefon="editedPerson.telefon ? editedPerson.telefon : ''"
              :facebook="editedPerson.facebook ? editedPerson.facebook : ''"
              :showPossibleEditBtn="false"
              :local_img="local_img"
            ></PersonCard>
          </v-col>
        </v-row>
        <div class="large-12 medium-12 small-12 cell">
          <!-- <label>File
            <input type="file"  v-on:change="handleFileUpload()"/>
          </label> -->
          <!-- <button v-on:click="submitFile()">Submit</button> -->
        </div>
        <div class="text-center my-12 mx-6">
          <v-btn
            :disabled="!valid"
            :loading="loading"
            large
            width="200px"
            :dark="valid"
            color="#174085"
            @click="save"
            >Uložit</v-btn
          >
        </div>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";
// import router from "@/router";
import PersonCard from "@/components/Kontakty/PersonCard";
// import Constants from "@/constants.js";

export default {
  name: "EditVedouciView",

  data: function () {
    return {
      loading: false,
      deleteFromDBOnSave: false,
      editView: null,
      valid: false,
      textRules: [(v) => !!v || "Toto pole je povinné"],
      telephoneRules: [
        (v) => {
          if (v) {
            if (v.length != 9) {
              return "Telefon mít 9 čísel bez mezer.";
            } else {
              return !isNaN(v) || "Telefon nesmí obsahovat mezery a znaky";
            }
          } else {
            return true;
          }
        },
      ],
      emailRules: [
        (value) => {
          if (value) {
            if (value.length > 0) {
              const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              return pattern.test(value) || "Neplatný e-mail.";
            }
          } else {
            return true;
          }
        },
      ],
      errors: [],
      file: null,
      file_id: null,
      // // oddilDiacriticsObj: Constants.oddilDiacriticsObj,
      originalPerson: null,
      editedPerson: {
        fotka: [],
        jmeno: null,
        prezdivka: null,
        funkce: null,
        email: null,
        telefon: null,
        facebook: null,
        oddil: null,
      },
      local_img: false,
      oddily: [],
      selectedOddilID: null,
      editedFlag: false,
      oddilDiacritics: Constants.oddilDiacriticsObj,
    };
  },

  watch: {
    $route(to, from) {
      console.log(to, from);
      // this.$router.go(to.fullPath);
    },
  },

  methods: {
    setLoading: function (value) {
      // this.$store.commit("setLoading", value);
      this.loading = value;
    },

    deletePhoto() {
      console.log("deleting photo");
      try {
        if (
          this.editedPerson.fotka[0].url == this.originalPerson.fotka[0].url
        ) {
          this.deleteFromDBOnSave = true;
          console.log("will delete photo from database on save");
          this.editedPerson.fotka = [];
          this.local_img = true;
        } else {
          this.loadOriginalImage();
        }
      } catch (error) {
        //deleting local image
        console.log(error);
        this.file = null;
        this.editedPerson.fotka[0] = null;
        this.forceShittyUpdate();
      }
    },

    deletePhotoFromDB(_id) {
      axios
        .delete("/upload/files/" + _id)
        .then((response) => {
          console.log("the photo was deleted successfully", response);
        })
        .catch(function (e) {
          console.log("delete FAIL!!!");
          console.log(e);
        });
    },

    loadOriginalImage() {
      try {
        this.editedPerson.fotka = JSON.parse(
          JSON.stringify(this.originalPerson.fotka)
        );
        this.local_img = false;
        this.forceShittyUpdate();
      } catch {
        console.log("originalPerson has no photo");
      }
    },

    photoChanged(event) {
      // this.editedFlag=true;
      if (event === undefined) {
        this.loadOriginalImage();
      } else {
        //new photo was loaded
        console.log("setting new photo");
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
          this.src = fileReader.result;
          // if (this.editedPerson.fotka.length < 1) {
          this.editedPerson.fotka = [{}];
          // }
          this.editedPerson.fotka[0].url = this.src;
          this.local_img = true;
          this.editedFlag = true;
        });
        fileReader.readAsDataURL(event);
      }
      this.forceShittyUpdate();
    },

    forceShittyUpdate() { //this is really terrible idea and I hope nobody reads it - it just changes some variables so it forces to rerender
      if (this.editedPerson.jmeno == "") {
        this.editedPerson.jmeno = ".";
        this.editedPerson.jmeno = "";
      } else {
        this.editedPerson.jmeno += "_";
        this.editedPerson.jmeno = this.editedPerson.jmeno.slice(0, -1);
      }
    },

    uploadImage() {
      console.log("submitting file");
      console.log("this.editedPerson.fotka", this.editedPerson.fotka);
      let formData = new FormData();
      formData.append("files", this.file);
      if (this.editedPerson.fotka.length == 0 || !this.file) {
        console.log("no photo to upload");
        return new Promise(function (resolve) {
          resolve("no photo to upload resolve");
        });
      }
      return new Promise((resolve, reject) => {
        axios
          .post("/upload", formData, {
            "Content-Type": "multipart/form-data",
          })
          .then((response) => {
            console.log("upload image successfull", response);
            this.file_id = response.data[0]._id;
            resolve(response.data[0]);
            // this.file_id = response.data[0]._id;
            // console.log('editedPerson',this.editedPerson);
            // console.log('file_id',this.file_id);
          })
          .catch(function (e) {
            console.log("upload image FAILURE!!");
            reject("image reject");
            console.log(e);
          });
      });
    },

    save() {
      this.$refs.form.validate();
      this.setLoading(true);
      this.uploadImage().then((res) => {
        console.log("after image was uploaded with response", res);
        try {
          if (
            this.local_img &&
            this.originalPerson.fotka[0] &&
            this.deleteFromDBOnSave
          ) {
            this.deletePhotoFromDB(this.originalPerson.fotka[0]._id);
          }
        } catch (error) {
          console.log(error);
        }

        if (this.editView) {
          console.log("editing vedouci", this.getDataObject);
          axios
            .put("/vedoucis/" + this.originalPerson._id, this.getDataObject)
            .then((result) => {
              this.editedFlag = false;
              console.log("put successfull", result);
              // router.go(-1);
              this.setLoading(false);
            })
            .catch((e) => {
              console.log("put FAILURE", e);
              this.setLoading(false);
            });
        } else {
          console.log("creating vedouci");
          axios
            .post("/vedoucis", this.getDataObject)
            .then((result) => {
              this.editedFlag = false;
              console.log("post successfull", result);
              // router.go(-1);
              this.setLoading(false);
            })
            .catch((e) => {
              console.log("post FAILURE", e);
              this.setLoading(false);
            });
        }
      });
    },

    getOddily() {
      return this.$store.dispatch('getOddily');
    },
  },

  computed: {
    getDataObject() {
      const dataObject = {
        jmeno: this.editedPerson.jmeno,
        prezdivka: this.editedPerson.prezdivka,
        funkce: this.editedPerson.funkce,
        email: this.editedPerson.email,
        popis: this.editedPerson.popis,
        telefon: this.editedPerson.telefon,
        facebook: this.editedPerson.facebook,
        oddil: {
          _id: this.editedPerson.oddil,
        },
      };

      if (this.getPhotoObject) {
        dataObject.fotka = this.getPhotoObject;
      }
      console.log("dataObject", dataObject);
      return dataObject;
    },

    getPhotoObject() {
      if (this.file_id) {
        console.log("returning photo");
        return [{ _id: this.file_id }];
      } else return null;
    },
  },

  // props: ["_id"],

  created() {
    if (this.$route.params._id) {
      this.setLoading(true);
      this.getOddily().then((oddily) => {
        this.oddily = oddily;
      });
      console.log("editing existing", this.$route.params._id);
      this.editView = true;
      axios
        .get("/vedoucis?_id=" + this.$route.params._id)
        .then((response) => {
          // console.log(response);
          this.originalPerson = response.data[0];
          console.log("original person", this.originalPerson);
          this.editedPerson = JSON.parse(JSON.stringify(this.originalPerson));
          this.editedPerson._id = this.$route.params._id;
          if (this.originalPerson.fotka[0]) {
            this.file_id = this.originalPerson.fotka[0]._id;
          }
          this.setLoading(false);
        })
        .catch((e) => {
          console.log("cant load vedouci");
          console.log(e);
        });
    } else {
      //create view
      console.log("creating new");
      this.editView = false;
      this.originalPerson = null;
      this.getOddily()
        .then((oddily) => {
          this.oddily = oddily;
          const requiredOddil = this.oddily.find((item) => {
            console.log(item.nazev);
            if (item.nazev == this.oddilDiacritics[this.$route.params.oddil]) {
              return item;
            }
          });
          this.editedPerson.oddil = requiredOddil._id;
          this.setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          this.setLoading(false);
        });
    }
  },

  beforeRouteLeave(to, from, next) {
    if (this.editedFlag) {
      const answer = window.confirm(
        "Opravdu chcete odejít? Veškeré neuložené změny nebudou uloženy."
      );
      if (answer) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  },

  components: {
    PersonCard,
  },
};
</script>

<style scoped>
h1 {
  font-family: "skautbold";
  font-size: 2rem;
}
</style>
