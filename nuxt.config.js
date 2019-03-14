const pkg = require('./package')
require('dotenv').config()
import webpack from 'webpack'

module.exports = {
  mode: 'universal',

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
  css: ['@/assets/sass/styles.sass'],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    ['@nuxtjs/robots', {
      /* module options */
      UserAgent: '*',
      Disallow: '/',
    }],
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
    middleware: ['footer', 'menu', 'scroll'],
    scrollBehavior: function(to, from, savedPosition) {
      if (to.hash) {
        return {
          selector: to.hash
        }
      } else {
        return {
          x: 0,
          y: 0
        }
      }
    }
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true
  },
  proxy: {
    '/assets/': process.env.API_ENDPOINT
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
          return /logo\.svg|logo-white\.svg|loader\.gif/.text(file)
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
