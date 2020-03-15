const pkg = require('./package')
require('dotenv').config()
import webpack from 'webpack'
import axios from 'axios'
import readPages from './apollo/queries/pages'

module.exports = {
  mode: 'universal',
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  serverMiddleware: ['~/middleware/domainRewrite'],

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
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: '~/components/Loading.vue',

  /*
  ** Global CSS
  */
  css: ['~assets/sass/all.sass', '~assets/sass/styles.sass'],

  styleResources: {
    sass: ['~assets/sass/styles.sass']
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    // '@nuxtjs/bulma',
    '@nuxtjs/style-resources',
    '@nuxtjs/proxy',
    '@nuxtjs/router-extras',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-8671537-1',
        dev: false
      }
    ],
    '@nuxtjs/robots'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vue-preload',
    '~/plugins/logging',
    { src: '~/plugins/waypoints', ssr: false },
    { src: '~/plugins/parallax', ssr: false }
  ],

  router: {
    middleware: ['footer', 'menu', 'scroll', 'redirection']
    // extendRoutes(routes, resolve) {
    //   axios({
    //     baseURL: 'https://api.saltedherring.design',
    //     url: '/graphql/',
    //     method: 'post',
    //     withCredentials: true,
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     data: {
    //       query: readPages
    //     }
    //   })
    //   .then(result => {
    //     console.log('result', result)
    //     let returnVal = result.data.data.readPage
    //     let pages = []
    //     let classMap = {
    //       'App\\Web\\Layout\\HomePage': 'pages/index.vue',
    //       'App\\Web\\Layout\\Project': 'pages/work/_slug.vue',
    //       'App\\Web\\Layout\\WorkPage': 'pages/work/index.vue',
    //       'App\\Web\\Layout\\PeoplePage': 'pages/people/index.vue',
    //       'App\\Web\\Layout\\PersonPage': 'pages/people/_slug.vue',
    //       'App\\Web\\Layout\\AboutPage': 'about/index.vue'
    //     }
    //
    //     returnVal.map(route => {
    //       if (route.ClassName in classMap) {
    //         routes.push({
    //           name: route.URLSegment,
    //           path: route.Link,
    //           component: resolve(__dirname, classMap[route.ClassName])
    //         })
    //       }
    //     })
    //
    //     console.log(routes)
    //     return routes
    //   })
    // }
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true
  },
  proxy: {
    '/assets/': process.env.API_ENDPOINT,
    '/graphql/': process.env.API_ENDPOINT
  },
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        // type is inferred based on the file extension.
        // https://fetch.spec.whatwg.org/#concept-request-destination
        if (type === 'script' || type === 'style') {
          return true
        }

        if (type === 'font') {
          // only preload woff2 fonts
          return /\.woff2$/.test(file)
        }

        if (type === 'image') {
          // only preload important images
          return /(logo\.svg|logo-white\.svg|loader\.gif)$/.test(file)
        }
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
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Add graphQL rules.
      config.module.rules.push({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      })

      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
