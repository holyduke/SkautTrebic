<script>
import axios from "axios";
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,

  props: ['days'],

  data () {
    return {      
      datacollection: {
        labels: [],
        datasets: [
          {
            label: 'Odesláné emaily',
            backgroundColor: '#003f5c',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',            
            data: [],
            hidden: false,
          },
          {
            label: 'Doručené emaily',
            backgroundColor: '#7a5195',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: [],
            hidden: false,
            stack: 'Received'
          },
          {
            label: 'Nedoručené emaily',
            backgroundColor: '#DB2B39',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: [],
            hidden: false,
            stack: 'Received'
          },
          {
            label: 'Otevřené emaily',
            backgroundColor: '#ff6672',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: [],
            hidden: false,
          },
          {
            label: 'Kliknuto na odkaz poprvé',
            backgroundColor: '#ffa600',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: [],
            hidden: false,
          },
          {
            label: 'Kliknuto na odkaz',
            backgroundColor: '#ff7c43',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: [],
            hidden: true,
          },
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [ {
            gridLines: {
              display: false,
            }
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },

  

  methods: {
    onChartReady(chart, google) {
      this.chartsLib = google;
    },

    // addEmptyDays(reports) {      
    //   const daysInPast = this.days;
    //   let today = new Date();
    //   console.log("Today date is ", today);
    //   // let weekAgo = new Date();
    //   // weekAgo.setDate(today.getDate()-daysInPast)
    //   // console.log("today", today);
    //   // console.log("weekAgo", weekAgo);
    //   // console.log("adding empty days to reports for daysinpast",daysInPast, reports);
    //   let dateLater = today;
    //   let lastDateNotExisting = false;
    //   let dateEarlier = null;

    //   //check if today is not present
    //   let firstDate = new Date(reports[0].date)
    //   if (firstDate.getDate() != today.getDate()) {
    //     let emptyDayReport = {
    //       date: today.getFullYear() + "-" + ('0' + (today.getMonth()+1)).slice(-2) + "-" + ('0' + today.getDate()).slice(-2)
    //     }
    //     reports.push(emptyDayReport);
    //     console.log("today should be present in report", reports);
    //   }


    //   for (let index = daysInPast-1; index >= 0; index--) {
    //     try {
    //       console.log("resolving with index ", index ," date", reports[index].date)
    //       dateEarlier = new Date(reports[index].date);
    //     } catch (error) {
    //       console.log("catching exception", error);
    //       lastDateNotExisting = true;
    //     }        
    //     if (lastDateNotExisting || dateLater - dateEarlier > 86400000) { //there is bigger gap than two days = 2*86400000ms
    //       console.log("there is bigger gap than one days and so", dateLater - dateEarlier);
    //       var dayBefore = new Date(dateLater.getTime());
    //       dayBefore.setDate(dateLater.getDate() - 1);
    //       let emptyDayReport = {
    //         date: dayBefore.getFullYear() + "-" + ('0' + (dayBefore.getMonth()+1)).slice(-2) + "-" + ('0' + dayBefore.getDate()).slice(-2)
    //       }
    //       if (index == 0) { //last item
    //         // console.log("pushing empty day to the end", emptyDayReport)            
    //         reports.push(emptyDayReport);
    //       }
    //       else  { //insert into middle of list
    //         // console.log("pushing empty day to the middle", emptyDayReport)
    //         reports.splice(index, 0, emptyDayReport);
    //       }          
    //       dateLater = dayBefore;
    //     }
    //     else  {
    //       dateLater = dateEarlier;
    //     }
    //     if (reports.length == daysInPast+1) { //we reached the amnount of desired days
    //       reports.pop();
    //       break;
    //     }
    //   }
    //   console.log("after addEmptyDays", reports);
    //   return reports
    // },

    addToday(reports)  {
      let today = new Date();
      let lastReport = new Date(reports[0].date)
      if (today.getDate() != lastReport.getDate())  {
        console.log("adding today empty day", lastReport.getDate());
        let emptyDayReport = {
          date: today.getFullYear() + "-" + ('0' + (today.getMonth()+1)).slice(-2) + "-" + ('0' + today.getDate()).slice(-2)
        }
        reports.pop();  //remove oldest day
        reports.unshift(emptyDayReport);  //push to first index
      }
      return reports
    },

    updateLabels(reports)  {
      this.datacollection.labels = [];
      // console.log("updating labels...");
      reports.forEach(element => {
        const date = new Date(element.date);
        this.datacollection.labels.push(date.toLocaleDateString('cs-CS'));
      });
    },

    getSmtpReport() {
      console.log("getting sent emails");
      axios
        .get("/smtp-report?days=" + this.days)
        .then((res) => {
          console.log("received a response for graph for last ", this.days ," days.", res);
          let reports = res.data.reports;  

          console.log("before reports add empty days", reports);
          // let reports = this.addEmptyDays(new Array(...reportsWithoutEmpty));

          reports = this.addToday(reports);

          console.log("after today was added");

          //clear old data
          this.datacollection.datasets.forEach((dataset) => {
            dataset.data = [];
          });

          //set new data
          console.log("setting new data");
          reports.reverse().forEach((report) => {
            this.datacollection.datasets[0].data.push(report.requests);
            this.datacollection.datasets[1].data.push(report.delivered);
            this.datacollection.datasets[2].data.push(report.invalid + 
                                                      report.softBounces +
                                                      report.hardBounces +
                                                      report.blocked);
            this.datacollection.datasets[3].data.push(report.uniqueOpens);
            this.datacollection.datasets[4].data.push(report.uniqueClicks);
            this.datacollection.datasets[5].data.push(report.clicks);
          });          

          //update date labels
          this.updateLabels(reports);
          this.renderChart(this.datacollection, this.options)
        })
        .catch((e) => {
          console.log("error while loading smtp report", e);
        });
    },
  },

  computed: {
  },  

  watch: { 
    days: function() { // watch it
      // console.log('Prop changed: ', newVal, ' | was: ', oldVal);
      this.getSmtpReport();
    },

    datacollection() {
      console.log("datacollection changed");
      this.$data._chart.update()
    }
  },

  created() {
    this.getSmtpReport();
  },

  components: {
    // GChart,
  },
};
</script>

<style scoped>
</style>
