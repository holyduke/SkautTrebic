require('dotenv').config()
import colors from 'vuetify/es5/util/colors'

export default {
  env: {
    API_URL: process.env.BASE_URL || 'http://localhost:1337'
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - skauttrebic-nuxtjs',
    title: 'Skaut Třebíč',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  axios: {
    baseURL: process.env.API_URL,
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.API_URL,
      baseURL: process.env.API_URL
    }
  },

  // privateRuntimeConfig: {
  //   axios: {
  //     browserBaseURL: process.env.API_URL,
  //     baseURL: process.env.API_URL
  //   }
  // },


  server: {
    port: 3000,
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          required: false,
          maxAge: 864000000 //10 000 days
          // type: 'Bearer' //Bearer is default
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/local', method: 'post' },
          logout: { url: '/thisneedstobechanged', method: 'post' },
          user: false,
        },
      }
    }
  },

  watchers: {
    webpack: {
      poll: true
    }
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/gallery', mode: 'client' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/dotenv',
  ],

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ['vue-picture-swipe'],
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    },
    extractCSS: true
  }
}
