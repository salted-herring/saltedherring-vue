const pkg = require('./package')

module.exports = {
  mode: 'universal',

  server: {
    port: 3333, // default: 3000
    host: 'localhost', // default: localhost
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    htmlAttrs: {
      class: 'has-navbar-fixed-top'
    },
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: '~/components/Loading.vue',

  /*
  ** Global CSS
  */
  css: ['@/assets/sass/styles.sass'],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vue-preload',
    '~/plugins/logging'
  ],

  router: {
    middleware: ['footer', 'menu']
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true
  },
  proxy: {
    '/graphql/': {
      target: 'http://localhost:8145/'
    },
    '/assets/': {
      target: 'http://localhost:8145/'
    }
  },
  // apollo: {
  //   // tokenName: 'yourApolloTokenName', // optional, default: apollo-token
  //   // tokenExpires: 10, // optional, default: 7 (days)
  //   // includeNodeModules: true, // optional, default: false (this includes graphql-tag for node_modules folder)
  //   authenticationType: 'Basic', // optional, default: 'Bearer'
  //   // optional
  //   errorHandler (error) {
  //     console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
  //   },
  //   // required
  //   clientConfigs: {
  //     default: {
  //       // required
  //       httpEndpoint: 'http://localhost:8145/graphql/',
  //       // optional
  //       // See https://www.apollographql.com/docs/link/links/http.html#options
  //       httpLinkOptions: {
  //         credentials: 'same-origin'
  //       },
  //       // You can use `wss` for secure connection (recommended in production)
  //       // Use `null` to disable subscriptions
  //       // wsEndpoint: 'ws://localhost:8145/graphql/', // optional
  //       // LocalStorage token
  //       // tokenName: 'apollo-token', // optional
  //       // Enable Automatic Query persisting with Apollo Engine
  //       persisting: false // Optional
  //       // Use websockets for everything (no HTTP)
  //       // You need to pass a `wsEndpoint` for this to work
  //       // websocketsOnly: false // Optional
  //     },
  //     test: {
  //       httpEndpoint: 'http://localhost:8145/graphql/'
  //       // wsEndpoint: 'ws://localhost:8145/graphql/',
  //       // tokenName: 'apollo-token'
  //     }
  //   }
  // },
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font', 'image', 'video'].includes(type)
      }
    }
  },

  /*
  ** Build configuration
  */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Add graphQL rules.
      config.module.rules.push({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      });

      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  }
}
