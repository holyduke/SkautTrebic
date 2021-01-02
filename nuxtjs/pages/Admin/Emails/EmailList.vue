<template>
  <v-container grid-list-xs class="main-center-limitwidth">
    <h1 class="mb-0" id="Aktuality">Spravovat emaily</h1>
    <v-divider class="mb-4"></v-divider>
    <p>Každý člen oddílu by zde měl mít vytvořenou kartu, ve které budou uvedené kontaktní emaily na rodiče (případně na něj). Při zveřejnění nového příspěvku budou na tyto emaily odeslány upozornění.</p>

    <br>
    
    <v-data-table
      :loading="loading" loading-text="Načítám členy..."
      :search="search"
      :headers="headers"
      :items="clens"
      justify="space-around"
      sort-by="jmeno"
      class="elevation-3"
      :items-per-page="50"
      :footer-props="{
        'items-per-page-text': 'Položek na stránku',
        'items-per-page-all-text': 'Vše',
        'items-per-page-options': [25, 50, 100, 200],
      }"
      calculate-widths
      v-model="selected"
      show-select
    >
      <!-- translate of -->
      <template
          v-slot:[`footer.page-text`]="{ pageStart, pageStop, itemsLength }"
        >
          {{ pageStart }} - {{ pageStop }} z {{ itemsLength }}
      </template>
      <template v-slot:no-results>
          Pro výraz "{{ search }}" nebyly nalezeny žádné výsledky.
      </template>
      <!-- :mobile-breakpoint="0" pro zakazani mobiloveho rezimu -->
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-fab-transition>
                <v-btn
                  v-show="!hiddenDeleteButton"
                  color="error"
                  fab
                  dark
                  class="mr-5"
                  @click="deleteSelected"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-fab-transition>
            </template>
            <span>Odstranit vybrané položky</span>
          </v-tooltip>
          <v-toolbar-title>Emaily pro zasílání příspěvků</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-container class="d-none d-md-flex mdAndUp"> -->
          <v-text-field
            class="d-none d-md-flex mdAndUp"
            v-model="search"
            append-icon="mdi-magnify"
            label="Vyhledat"
            single-line
            hide-details
            single-expand
          ></v-text-field>
          <!-- </v-container>             -->

          <!-- <v-spacer></v-spacer> -->
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2 d-none d-md-flex mdAndUp"
                v-bind="attrs"
                v-on="on"
                @click="freshNewClen()"
                >Nový člen</v-btn
              >
            </template>

            <v-form ref="form" v-model="valid" lazy-validation>
              <v-card>
                <v-card-title>
                  <span>{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.jmeno"
                          label="Jméno"
                          :rules="textRules"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.prezdivka"
                          label="Přezdívka"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="12">
                        <v-select
                          v-model="editedItem.oddil"
                          :items="oddils"
                          :rules="oddilRules"
                          item-text="nazev"
                          item-value="id"
                          label="Oddíl"
                          persistent-hint
                          return-object
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-for="(mail, index) in getEditableEmails"
                          :key="index"
                          v-model="editedItem.emailsEditable[index].address"
                          :label="'Email ' + (index + 1)"
                          :rules="emailRules"
                          placeholder="Zadejte email"
                        ></v-text-field>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              class="mb-5 white--text"
                              fab
                              small
                              v-bind="attrs"
                              v-on="on"
                              color="#174085"
                              :disabled="
                                editedItem.emailsEditable[
                                  editedItem.emailsEditable.length - 1
                                ].address == ''
                              "
                              @click="
                                editedItem.emailsEditable.push({
                                  address: '',
                                  id: '',
                                })
                              "
                            >
                              <v-icon dark>mdi-plus</v-icon>
                            </v-btn>
                          </template>
                          <span>Přidat další email</span>
                        </v-tooltip>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close"
                    >Zrušit</v-btn
                  >
                  <v-btn color="primary" :disabled="!valid" @click="save"
                    >Uložit</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
        </v-toolbar>

        <v-container class="d-md-none">
          <v-btn color="primary" dark class="mb-2" @click="freshNewClen()"
            >Nový člen</v-btn
          >
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Vyhledat"
            single-line
            hide-details
            single-expand
          ></v-text-field>
        </v-container>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="confirmDeleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
    <Confirm ref="confirm"></Confirm>
  </v-container>
</template>


<script>
import axios from "axios";
import Confirm from "@/components/Confirm";

export default {
  name: "EmailEdit",

  data: () => ({
    valid: false,
    hiddenDeleteButton: true,
    selected: [],
    loading: false,
    search: "",
    oddils: [],
    dialog: false,
    headers: [
      {
        text: "Jméno člena",
        align: "start",
        value: "jmeno",
      },
      { text: "Přezdívka", value: "prezdivka" },
      { text: "Oddíl", value: "oddil.nazev" },
      { text: "Odebírané emaily", value: "emails", width: "30" },
      { text: "Poslední úprava", value: "updatedAt" },
      { text: "Úpravy", value: "actions", sortable: false },
    ],
    clens: [],
    editedIndex: -1,
    defaultObjects: {
      emails: [{ email: "", id: "" }],
      emailsEditable: [{ address: "", id: "" }],
    },
    editedItem: {
      jmeno: "",
      prezdivka: "",
      oddil: "",
      id: "",
      updatedAt: "",
      emails: [{ email: "", id: "" }],
      emailsEditable: [{ address: "", id: "" }],
    },
    uploadedEmailIDs: [],
    defaultItem: {
      jmeno: "",
      prezdivka: "",
      oddil: "",
      id: "",
      updatedAt: "",
      emails: [{ email: "", id: "" }],
      emailsEditable: [{ address: "", id: "" }],
    },
    oddilRules: [(v) => !!v.id || "Oddíl je povinný"],
    textRules: [(v) => !!v || "Jméno je povinné"],
    emailRules: [
      (value) => {
        console.log("validating email...");
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
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nový člen" : "Upravit člena";
    },

    getEditableEmails() {
      console.log("editableEmails", this.editedItem.emailsEditable);
      return this.editedItem.emailsEditable;
    },

    getEmailIDsObject() {
      // console.log("uploadedEmailIDs", this.uploadedEmailIDs);
      let emailsArrObj = this.uploadedEmailIDs.map((emailID) => {
        return { _id: emailID };
      });
      // console.log("emailsArrObj", emailsArrObj);
      return emailsArrObj;
    },

    getDataObject() {
      const dataObject = {
        jmeno: this.editedItem.jmeno,
        prezdivka: this.editedItem.prezdivka,
        emails: this.getEmailIDsObject,
        oddil: {
          _id: this.editedItem.oddil.id,
        },
      };
      console.log("dataObject which is being uploaded ", dataObject);
      return dataObject;
    },
  },

  watch: {
    selected() {
      if (this.selected.length > 0) {
        this.hiddenDeleteButton = false;
      } else {
        this.hiddenDeleteButton = true;
      }
    },
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.clens.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    freshNewClen() {
      this.dialog = true;
      console.log("creating fresh new clen");
      this.defaultItem.emails = [{ email: "", id: "" }];
      this.defaultItem.emailsEditable = [{ address: "", id: "" }];
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },

    setLoading() {
      this.clens = [];
      this.loading = true;
      this.close();
    },

    deleteSelected() {
      this.$refs.confirm
        .open(
          "Odstranit vybrané",
          "Opravdu chcete odstranit vybrané kontakty?",
          { color: "error" }
        )
        .then((confirm) => {
          if (confirm) {
            console.log("deleting selected files...");
            let promises = [];
            this.selected.forEach((clen) => {
              promises.push(this.deleteItem(clen));
            });

            this.setLoading();

            Promise.all(promises).then(() => {
              this.selected = [];
              this.loadData();
            });
          }
        });
    },

    confirmDeleteItem(item) {
      // const index = this.clens.indexOf(item);
      console.log("are you ready to delete clen:", item);
      this.$refs.confirm
        .open("Odstranit", "Opravdu chcete smazat člena " + item.jmeno + "?", {
          color: "error",
        })
        .then((confirm) => {
          if (confirm) {
            this.deleteItem(item).then((res) => {
              console.log(res);
              this.loadData();
            });
            this.setLoading(); //set loading state
          }
        });
    },

    deleteItem(item) {
      return new Promise((resolve) => {
        console.log(item);
        console.log("deleting clen ", item);
        let promises = [];

        // delete emails
        item.emailsEditable.forEach((emailObj) => {
          const emailPromise = axios
            .delete("/emails/" + emailObj.id)
            .then(() => {
              console.log(
                "email ",
                emailObj.address,
                "was deleted successfully"
              );
            });
          promises.push(emailPromise);
        });

        //delete clen
        const clenPromise = axios.delete("/clens/" + item.id).then(() => {
          console.log("clen ", item.jmeno, "was deleted successfully");
        });
        promises.push(clenPromise);

        Promise.all(promises).then(() => {
          console.log("all correspoding emails deleted succesfully");
          resolve();
        });
      });
    },

    close() {
      console.log("closing dialog window");
      this.dialog = false;
    },

    createNewEmails() {
      return new Promise((resolve) => {
        let promises = [];
        // let emailIDs = [];
        this.editedItem.emailsEditable.forEach((emailObj) => {
          if (emailObj.address) {
            //if email is not empty string ""
            promises.push(axios.post("/emails", { address: emailObj.address }));
          }
        });

        Promise.all(promises).then((res) => {
          console.log("all emails uploaded successfully");
          this.uploadedEmailIDs = res.map((obj) => obj.data.id);
          console.log(
            "this.uploadedEmailIDs inside createNeWEmails",
            this.uploadedEmailIDs
          );
          resolve();
        });
      });
    },

    createClen() {
      console.log("creating new clen: this.editedItem:", this.editedItem);
      // this.clearEditedItem();
      //create emails
      this.createNewEmails().then(() => {
        console.log("this.getDataObject", this.getDataObject);
        axios.post("/clens", this.getDataObject).then((res) => {
          console.log("uploading clen was successfull", res);
          this.$store.commit("setSaveSnackbar", true);
          // this.editedItem.forEach
          // this.clens.push(this.editedItem);
          // this.editedItem = -1; //reset pointer
          this.loadData();
        });
      });
    },

    save() {
      if (this.$refs.form.validate()) {
        console.log("saving clen with index ", this.editedIndex);
        if (this.editedIndex > -1) {
          //updating existing clen
          //delete clen
          const item = this.clens[this.editedIndex];
          let promises = [];
          //delete clen
          promises.push(this.deleteItem(item));
          // create fresh new clen
          promises.push(this.createClen());
          Promise.all(promises).then(() => {
            console.log(
              "old clen was deleted and new one was created successfully..."
            );
          });
        }

        // Create new clen
        else {
          this.createClen();
        }

        this.setLoading(); //set loading state
      }
    },

    loadData() {
      this.oddils = [];
      this.clens = [];
      this.loading = true;
      console.log("refreshing database");

      //get oddily
      axios({
        url: "/graphql",
        method: "post",
        data: {
          query: `
          {
            oddils {
              id
              nazev
            }
          }`,        
        },
      }).then((result) => {
        result.data.data.oddils.forEach((oddil) => {
          // console.log("oddil from graphql:", oddil)
          this.oddils.push({ nazev: oddil.nazev, id: oddil.id });
        });
      });

      //get clens
      axios({
        url: "/graphql",
        method: "post",
        data: {
          query: `
          {
            clens {
              jmeno
              prezdivka
              id
              oddil {
                id
                nazev
              }
              emails  {
                address
                id
              }
              updatedAt
            }
          }`,
        },
      })
        .then((result) => {
          const clens = result.data.data.clens;
          // oddils.forEach((oddil) => {
          // this.oddils.push({nazev:oddil.nazev, id:oddil.id});
          clens.forEach((clen) => {
            const timestamp = new Date(clen.updatedAt);
            this.clens.push({
              jmeno: clen.jmeno,
              prezdivka: clen.prezdivka,
              oddil: clen.oddil,
              id: clen.id,
              updatedAt:
                timestamp.toLocaleDateString("cs-CS") +
                "; " +
                timestamp.toLocaleTimeString("cs-CS"),
              emails: clen.emails.map((email) => email.address).join("\n"),
              emailsEditable: clen.emails,
            });
          });
          // });
          console.log("this.clens", this.clens);
          this.loading = false;
        })
        .catch((e) => {
          console.log("error in getting clens:", e);
          this.loading = false;
        });
    },
  },

  created() {
    this.loadData();
  },

  components: {
    Confirm,
  },
};
</script>

<style scoped>
</style>
