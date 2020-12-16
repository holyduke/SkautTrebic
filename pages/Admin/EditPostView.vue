<template>
  <v-form ref="form" v-model="valid" lazy-validation class="main-center-limitwidth">
    <v-container grid-list-xs>
      <h1 class="mb-0" v-if="editView">Editovat příspěvek</h1>
      <h1 class="mb-0" v-else>Vytvořit příspěvek</h1>
      <v-divider></v-divider>

      <v-row>
        <v-col cols="12" sm="6" md="6">
          <h2 class="mt-2 nadpis">Název</h2>
          <v-text-field
            @keyup="editedFlag = true"
            :rules="textRules"
            required
            label="Nadpis"
            v-model="post.nadpis"
          ></v-text-field>
        </v-col>
        <!-- <v-btn color="success" @click="getSelectedOddily">text</v-btn> -->

        <v-col cols="12" sm="6" md="6">
          <h2 class="mt-2 nadpis">Oddíl(y)</h2>
          <v-chip-group
            class="mb-4"
            v-model="post.selectedIndexes"
            column
            multiple
          >
            <v-chip
              filter
              outlined
              v-for="(oddil, index) in oddily"
              :key="index"
              >{{ oddil.nazev }}</v-chip
            >
          </v-chip-group>
          <v-alert dense v-show="showHintLbl" type="error"
            >Zvolte alespoň jeden oddíl</v-alert
          >
        </v-col>

        <v-col cols="12">
          <TextEditor @contentChanged="editedFlag = true"/>
        </v-col>

        <v-col cols="12">
            <h2 class="mt-5 nadpis">Nahrát nové přílohy</h2>
            <v-file-input
              show-size
              multiple
              accept="*"
              v-model="post.newfiles"
              label="Soubory"
            ></v-file-input>

          <FilesToDownload
            v-if="post.files != null"
            :priloha="post.files"
            :showDeleteBtn="true"
          />

          <v-divider class="my-4"></v-divider>
        </v-col>

        <v-col cols="12">
          <v-alert
            dense
            v-if="editView"
            border="top"
            colored-border
            type="info"
            elevation="2"
            >Emaily již byly odeslány a po uložení nebudou poslány
            znovu.</v-alert
          >
          <v-alert
            dense
            v-else
            large
            border="top"
            colored-border
            type="info"
            elevation="2"
            >Po uložení příspěvku se odešlou emaily rodičům.</v-alert
          >
          <v-btn
            :loading="loading"
            :disabled="!valid || uploadingImage"
            color="#174085"
            class="white--text"
            @click="publish"
            >Uložit</v-btn
          >
          <v-btn
            color="error"
            v-if="editView"
            class="white--text mx-5"
            @click="deletePost"
            >Smazat příspěvek</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
    <Confirm ref="confirm"></Confirm>
  </v-form>
</template>

<script>
import axios from "axios";
import FilesToDownload from "@/components/Aktuality/FilesToDownload";
import TextEditor from "@/components/Aktuality/TextEditor";
import Confirm from "@/components/Confirm";
// import router from "@/router";

export default {
  name: "EditPostView",

  data: () => ({
    loading: false,
    editedFlag: false,
    post: {
      nadpis: "",
      files: null,
      file_IDs: [],
      original: {
        files: [],
      },
      selectedOddily: [],
      selectedIndexes: [],
      content: "",
      md: "",
    },
    oddily: [],
    showHintLbl: false,
    editView: false,

    valid: true,
    textRules: [
      (v) => {
        if (v) {
          return true;
        } else {
          return "Toto pole je povinné";
        }
      },
    ],
  }),

  methods: {
    publish() {
      console.log(
        "------------------------------- publishing ----------------------------------------------"
      );
      this.post.content = this.$store.getters.getPostContent;
      console.log("data read from Vuex store successfully", this.post.content);
      this.getSelectedOddily(); //this.post.selectedoddily gets updated
      if (this.validate()) {
        this.editedFlag = false; // allow to redirect to new post
        this.loading = true;
        this.deleteUnusedImages();
        this.uploadNewFiles().then(() => {
          if (this.editView) {
            //editing existing post
            console.log("trying to update post", this.post);
            axios
              .put("/aktualitas/" + this.post._id, this.getDataObjectWithoutAuthor)
              .then((result) => {
                this.loading = false;
                // router.push("/aktuality/prispevek/" + result.data._id); https://stackoverflow.com/questions/50375244/push-a-route-moving-from-vuejs-to-nuxtjs
                console.log("put update successfull", result);
              })
              .catch((e) => {
                this.loading = false;
                console.log("put update FAILURE", e);
              });
          } else {
            //creating new post
            console.log("trying to publish post");
            axios
              .post("/aktualitas", this.getDataObject)
              .then((result) => {
                this.loading = false;
                console.log(result);
                // router.push("/aktuality/prispevek/" + result.data._id);
              })
              .catch((e) => {
                this.loading = false;
                console.log("post FAILURE", e);
              });
          }
        });
      }
    },

    deleteUnusedImages() {
      const images_in_text = this.findImagesInPost();
      console.log(images_in_text);
      this.$store.getters.getPostImages.forEach((image) => {
        let doNotDelete = false;
        if (image.formats) {
          for (const [format, obj] of Object.entries(image.formats)) {
            //sometimes, there might be empty <img bracket>
            console.log(`${format}: ${obj.url}`);
            if (images_in_text.includes(obj.url)) {
              doNotDelete = true;
            }
          }
        }

        //default url in text?
        if (images_in_text.includes(image.url)) {
          doNotDelete = true;
        }

        if (!doNotDelete) {
          //no match found -> will delete img and remove from post.obrazky
          this.$store.dispatch("deleteFile", image.id);
          // image will be automatically removed from post.obrazky (cool thing)
        }
      });
    },

    findImagesInPost() {
      var xss = require("xss");
      var list = [];
      xss(this.post.content, {
        onTagAttr: function (tag, name, value) {
          if (tag === "img" && name === "src") {
            list.push(xss.friendlyAttrValue(value));
          }
        },
      });
      console.log("found all images which are used in text:", list);
      return list;
    },

    validate() {
      //validate nadpis
      const formValidation = this.$refs.form.validate();
      //validate oddily
      const oddilValidation = this.post.selectedOddily.length > 0;
      if (!oddilValidation) {
        this.showHintLbl = true;
      }
      if (oddilValidation && formValidation) {
        return true;
      } else return false;
    },

    deletePost() {
      this.$refs.confirm
        .open(
          "Odstranit",
          "Opravdu chcete smazat tento příspěvek? Všechny jeho soubory budou také smazány",
          { color: "error" }
        )
        .then((confirm) => {
          if (confirm) {
            if (this.post.files) {
              this.post.files.forEach((file) => {
                this.$store.dispatch("deleteFile", file.id);
              });
            }
            if (this.$store.getters.getPostImages) {
              this.$store.getters.getPostImages.forEach((file) => {
                this.$store.dispatch("deleteFile", file.id);
              });
            }
            if (this.images_ID.length) {
              console.log("deleting all images inside a post....");
              this.images_ID.forEach((image_ID) => {
                this.$store.dispatch("deleteFile", image_ID);
              });
            }
            this.$store.dispatch("deletePost", this.post._id).then(() => {
              this.editedFlag = false; // dont inform that we are leaving page
              router.push("/aktuality");
            });
          }
        });
    },

    uploadNewFiles() {
      return new Promise((resolve) => {
        let promises = [];

        //upload new files (attachments)
        if (this.post.newfiles) {
          this.post.newfiles.forEach((file) => {
            console.log("trying to upload new file", file);
            const promise = this.uploadFile(file).then((res) => {
              console.log("res - new file uploaded", res);
              this.post.file_IDs.push(res.id);
            });
            promises.push(promise);
          });
        }

        Promise.all(promises).then(() => {
          console.log("all new files uploaded successfully");
          console.log(this.post);
          resolve();
        });
      });
    },

    uploadFiles() {
      return new Promise((resolve) => {
        let promises = [];

        // attachments
        if (this.post.files != null) {
          this.post.files.forEach((element) => {
            // let formData = new FormData();
            // formData.append("files", element);
            const promise = this.uploadFile(element).then((res) => {
              console.log("res", res);
              this.post.file_IDs.push(res.id);
            });
            promises.push(promise);
          });
        }

        Promise.all(promises).then(() => {
          console.log("all successfull");
          console.log(this.post);
          resolve();
        });
      });
    },

    uploadFile(file) {
      let formData = new FormData();
      console.log("uploading new file -", file);
      formData.append("files", file);
      return new Promise((resolve, reject) => {
        axios
          .post("/upload", formData, {
            "Content-Type": "multipart/form-data",
          })
          .then((response) => {
            console.log("file upload successfull", response);
            resolve(response.data[0]);
          })
          .catch(function (e) {
            console.log("upload image FAILURE!!");
            reject("image reject");
            console.log(e);
          });
      });
    },

    getSelectedOddily() {
      console.log("selectedIndexes: ", this.post.selectedIndexes);
      this.post.selectedOddily = [];
      for (const ind in this.post.selectedIndexes) {
        this.post.selectedOddily.push(
          this.oddily[this.post.selectedIndexes[ind]]
        );
      }
    },

    getOddily() {
      return this.$store.getters.getOddily;
    },

    generatePrilohaObj() {
      let arrayOfIDs = [];
      console.log("this.post.file_IDs", this.post.file_IDs);
      this.post.file_IDs.forEach((_id) => {
        console.log("_id", _id);
        arrayOfIDs.push({ _id: _id });
      });
      console.log("arrayOfIDs", arrayOfIDs);
      return arrayOfIDs;
    },

    generateOddilyObj() {
      let arrayOfOddils = [];
      this.post.selectedOddily.forEach((oddil) => {
        console.log("oddil", oddil);
        arrayOfOddils.push(oddil._id);
      });
      console.log("arrayOfOddils", arrayOfOddils);
      return arrayOfOddils;
    },
  },

  computed: {
    images_ID() {
      return this.$store.getters.getPostImages;
    },

    uploadingImage()  {
      return this.$store.getters.getUploadingImageFlag;
    },

    getDataObject() {
      const header = {
        nadpis: this.post.nadpis,
        text: this.post.content,
        oddils: this.generateOddilyObj(),
        priloha: this.generatePrilohaObj(),
        autor: {
          _id: this.$store.getters.get_id,
        },
        obrazky: this.$store.getters.getPostImages,
      };
      return header;
    },

    getDataObjectWithoutAuthor() {
      const header = {
        nadpis: this.post.nadpis,
        text: this.post.content,
        oddils: this.generateOddilyObj(),
        priloha: this.generatePrilohaObj(),
        obrazky: this.$store.getters.getPostImages,
      };
      return header;
    },
  },

  created() {
    //Promise 1 - load oddily
    let promise1 = this.getOddily();
    let promise2 = null;

    //Promise 2 - load aktualita
    if (this.$route.params._id) {
      //loading existing post
      this.editView = true;
      console.log("getting aktualita with _id", this.$route.params._id);
      promise2 = axios.get("/aktualitas/" + this.$route.params._id);
    } else {
      //creating fresh new post
      this.$store.dispatch("setPostContent", "");
      this.$store.dispatch("setPostImages", []);
    }

    Promise.all([promise1, promise2]).then((values) => {
      this.oddily = values[0];
      if (promise2) {
        //if loading existing post
        const response = values[1];
        console.log("post received from axios", response);
        this.post.nadpis = response.data.nadpis;
        this.post._id = response.data._id;
        this.post.content = response.data.text;
        this.post.obrazky = response.data.obrazky;
        this.$store.dispatch("setPostContent", this.post.content);
        this.$store.dispatch("setPostImages", this.post.obrazky);
        this.post.files = response.data.priloha;
        console.log("files", this.post.files);
        this.post.file_IDs = this.post.files.map((file) => {
          return file._id;
        });
        this.post.original.files = this.post.files;
        response.data.oddils.forEach((oddil) => {
          const index = this.oddily.findIndex((it) => {
            return it._id == oddil._id;
          });
          console.log("index of selected oddil is", index);
          this.post.selectedIndexes.push(index);
        });
      }
    });
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
      this.$store.dispatch("setPostContent", "");
      this.$store.dispatch("setPostImages", []);
      next();
    }
  },

  watch: {
    $route(to, from) {
      console.log(to, from);
      this.$router.go(to.fullPath);
    },
  },

  components: {
    // TiptapVuetify,
    FilesToDownload,
    TextEditor,
    Confirm,
  },
};
</script>

<style scoped>
.nadpis {
  font-size: 1.6rem !important;
  text-transform: uppercase;
  font-family: "skautbold";
}

h1 {
  font-family: "skautbold";
  margin: 20px 0 20px 0;
  font-size: 2.5rem;
}
</style>
