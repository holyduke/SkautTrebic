export default {
   methods: {
      getImageUrlFormatOrLower(image, desiredFormat) {
         if (desiredFormat == "large") {
            try {
               return image.formats[desiredFormat].url;
            }
            catch {
               return image.url;   //default image without size adjustment
            }
         }
         if (desiredFormat == "medium") {
            try {
               return image.formats[desiredFormat].url;
            }
            catch {
               return image.url;   //default image without size adjustment
            }
         }
         if (desiredFormat == "small") {
            try {
               return image.formats[desiredFormat].url;
            }
            catch {
               return image.url;   //default image without size adjustment
            }
         }
         if (desiredFormat == "thumbnail") {
            try {
               return image.formats[desiredFormat].url;
            }
            catch {
               return image.url;   //default image without size adjustment
            }
         }         
      }
   },
};