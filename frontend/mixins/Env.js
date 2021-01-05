export default {
   methods: {
      development() {
         return process.env.VUE_APP_ENVIRONMENT === "development";
      },

      pullrequest() {
         return process.env.VUE_APP_ENVIRONMENT === "pullrequest";
      },

      staging() {
         return process.env.VUE_APP_ENVIRONMENT === "staging";
      },

      production() {
         return process.env.VUE_APP_ENVIRONMENT === "production";
      },
   },
};