<template>
  <div>
    <v-card-title primary-title class="mb-0 pb-0"> Filtrovat: </v-card-title>
    <v-card-text class="mt-0 pt-0">
      <v-form ref="filterForm" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" sm="12" lg="6">
            <!-- tags -->
            <v-chip-group v-model="selectedOddils" multiple column>
              <v-chip
                filter
                outlined
                v-for="(item, index) in oddilyTags"
                :key="index"
              >
                {{ item }}
              </v-chip>
            </v-chip-group>
          </v-col>

          <v-col cols="12" sm="6" lg="3">
            <!-- email -->
            <v-text-field
              :rules="emailRules"
              label="Email příjemce"
              color="primary"
              class="ma-0 pa-0"
              v-model="email"
              @keypress.enter="searchByEmail"
            >
              <template v-slot:append>
                <v-btn
                  depressed
                  tile
                  color="primary"
                  class="ma-0"
                  @click="searchByEmail"
                >
                  <v-icon class="ma-0 pa-0">mdi-magnify</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6" lg="3">
            <!-- date picker -->
            <v-menu
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              class="mb-1 pa-0"
              max-width="290px"
              min-width="290px"
              @input="dateUpdated"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  label="Začátek a konec"
                  :error="errorMessage != ''"
                  :error-messages="errorMessage"
                  readonly
                  class="mb-0 pa-0"
                  prepend-icon="mdi-calendar"
                  :value="dates"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                locale="cs-in"
                :min="minDate"
                :max="maxDate"
                v-model="dates"
                range
                no-title
                @input="fromDateMenu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-form>
      <v-divider class="mb-5"></v-divider>

      <!---------------------------- SAMOTNE REPORTY EMAILY --------------------------------->

      <v-data-table
        :loading="!reportComplete"
        loading-text="Načítám emaily..."
        :headers="headers"
        :items="reports"
        loader-height="6"
        disable-sort
        class="elevation-3 row-pointer"
        :items-per-page="25"
        :footer-props="{
          showFirstLastPage: true,
          'items-per-page-text': 'Záznamů na stránku',
          'items-per-page-all-text': 'Vše',
          'items-per-page-options': [10, 25, 50, 100],
          'show-current-page': true,
        }"
        @click:row="handleClick"
      >
        <template slot="no-data"> Nenalezen žádný email </template>
        <template v-slot:[`item.date`]="{ item }">
          {{ printableDate(item.date) }}
        </template>
        <template v-slot:[`item.oddil`]="{ item }">
          {{ idToOddil(item.templateId) }}
        </template>
        <template
          v-slot:[`footer.page-text`]="{ pageStart, pageStop, itemsLength }"
        >
          {{ pageStart }} - {{ pageStop }} z {{ itemsLength }}
        </template>
      </v-data-table>
    </v-card-text>
  </div>
</template>

<script>
import axios from "axios";
// import TableReport from "@/components/Email/TableReport";

export default {
  name: "Events",

  data() {
    return {
      valid: false,

      oddilyTags: [
        "vlčata",
        "světlušky",
        "skauti",
        "skautky",
        "roveři",
        "oldskauti",
      ],
      selectedOddils: [0, 1, 2, 3, 4, 5],

      email: "",
      errorMessage: "",
      emailRules: [
        (v) => {
          if (v) {
            return /.+@.+\..+/.test(v) || "Neplatný email";
          }
          return true;
        },
      ],

      dates: [null, null],

      minDate: "2020-10-04",
      maxDate: null,
      dateUpdatedFlag: false,

      reports: [],
      reportComplete: false,
      headers: [
        { text: "Datum", value: "date" },
        { text: "Předmět", value: "subject" },
        { text: "Od", value: "from" },
        { text: "Komu", value: "email" },
        { text: "Oddíl", value: "oddil" },
      ],

      oddily: [],
    };
  },

  computed: {
    today() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear();

      today = yyyy + "-" + mm + "-" + dd;
      return today;
    },

    get10DaysAgo() {
      let daysAgo = new Date(); //today
      daysAgo.setDate(daysAgo.getDate() - 10);
      let dd = String(daysAgo.getDate()).padStart(2, "0");
      let mm = String(daysAgo.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = daysAgo.getFullYear();

      daysAgo = yyyy + "-" + mm + "-" + dd;
      return daysAgo;
    },

    selectedTemplateIDs() {
      let IDs = [];
      this.selectedOddils.forEach((index) => {
        this.oddily.forEach((oddil) => {
          if (oddil.nazev == this.oddilyTags[index]) {
            IDs.push(oddil.sendinblue_templateID);
          }
        });
      });
      return IDs;
    },
  },

  methods: {
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },

    getOddily() {
      return this.$store.getters.getOddily;
    },

    handleClick(par) {
      console.log("row clicked", par);
    },

    idToOddil(id) {
      let nazev = "";
      this.oddily.forEach((oddil) => {
        if (oddil.sendinblue_templateID == id) {
          // console.log("yahooo found corresponding nazev:", oddil.nazev);
          nazev = oddil.nazev;
        }
      });
      return nazev;
    },

    translatedEvent(event) {
      // console.log("finding translation for event " + event);
      let translated = this.events[event.toString()].translation;
      if (translated) {
        return translated;
      } else return event;
    },

    chipColor(event) {
      // console.log("finding color for event " + event);
      let translated = this.events[event.toString()].color;
      if (translated) {
        return translated;
      } else return "primary";
    },

    printableDate(date) {
      // console.log("printableDate");
      date = new Date(date);
      return (
        date.toLocaleDateString("cs-CS") +
        "; " +
        date.toLocaleTimeString("cs-CS")
      );
    },

    sortByDate(reports) {
      console.log("sorting reports by date", this.reports);
      reports.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      return reports;
    },

    searchByEmail() {
      console.log("searching by email");
      this.getSelectedOddilsReport()
        .then(() => {
          // if (response == undefined) {
          //   throw 'No existing report!';
          // }
          console.log("yahooo, we found some reports by email");
        })
        .catch((e) => {
          console.log("shame on you, there isnt any report for this email", e);
          this.errorMessage = e;
        });
    },

    dateUpdated() {
      if (this.dateUpdatedFlag) {
        console.log("date updated, refreshing reports");
        this.getSelectedOddilsReport();
        this.dateUpdatedFlag = false;
      }
    },

    async getSelectedOddilsReport() {
      if (this.$refs.filterForm.validate()) {
        // this.reports = [];
        let newReports = [];
        this.reportComplete = false;
        // let selected_IDs = await this.getTemplateIDs();
        let selected_IDs = this.selectedTemplateIDs;
        if (selected_IDs.length == 0) {
          this.reports = [];
          this.reportComplete = true;
        } else {
          console.log("received selected_IDs", selected_IDs);
          let counter = 0;
          selected_IDs.forEach((id) => {
            const templateReport = this.getTemplateReport(id);
            templateReport.then((res) => {
              console.log("received new report for id " + id + " ...", res);
              newReports.push(...res);
              if (++counter === selected_IDs.length) {
                this.reports = this.sortByDate(newReports);
                console.log("report completed");
                this.reportComplete = true;
              }
            });
          });
        }
      }
    },

    getTemplateReport(templateID) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            "/email-template-report?templateID=" +
              templateID +
              "&email=" +
              this.email +
              "&startDate=" +
              this.dates[0] +
              "&endDate=" +
              this.dates[1]
          )
          .then((res) => {
            // this.reports=[];
            // console.log("received a response for email events", res);
            this.errorMessage = "";
            if (res.data.transactionalEmails) {
              //if not empty
              resolve(res.data.transactionalEmails);
            } else {
              resolve([]);
            }
          })
          .catch((e) => {
            this.reports = [];
            console.log("error while loading event report", e.reponse);
            reject("Neplatný formát emailu");
          });
      });
    },
  },

  watch: {
    selectedOddils() {
      this.getSelectedOddilsReport();
    },

    dates() {
      if (this.dates[0] && this.dates[1]) {
        let dateLater = new Date(this.dates[1]);
        let dateEarlier = new Date(this.dates[0]);
        if (dateLater - dateEarlier <= 30 * 86400000) {
          this.errorMessage = "";
          this.getSelectedOddilsReport();
        } else {
          console.log("invalid time range = ", dateLater - dateEarlier);
          this.errorMessage = "Časový interval musí být menší než 30 dní";
        }
      }
    },
  },

  created() {
    this.dates[0] = this.get10DaysAgo;
    this.dates[1] = this.today;
    this.maxDate = this.today;

    this.getOddily().then((oddily) => {
      this.oddily = oddily;
      this.getSelectedOddilsReport(); //get Report
    });
  },

  components: {
    // TableReport
  },
};
</script>

<style>
.row-pointer tbody:hover {
  cursor: pointer;
}
</style>
