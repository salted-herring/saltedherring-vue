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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preload', as: 'font', href: '/_nuxt/static/webfonts/382CF0_0_0.woff2', type: 'font/woff2', crossorigin: 'anonymous'},
      { rel: 'preload', as: 'font', href: '/_nuxt/static/webfonts/382CF0_0_0.woff', type: 'font/woff', crossorigin: 'anonymous'},
      { rel: 'preload', as: 'font', href: '/_nuxt/static/webfonts/382CF0_1_0.woff2', type: 'font/woff2', crossorigin: 'anonymous'},
      { rel: 'preload', as: 'font', href: '/_nuxt/static/webfonts/382CF0_1_0.woff', type: 'font/woff', crossorigin: 'anonymous'},
      { rel: 'preload', as: 'font', href: '/_nuxt/static/webfonts/382CF0_2_0.woff2', type: 'font/woff2', crossorigin: 'anonymous'},
      { rel: 'preload', as: 'font', href: '/_nuxt/static/webfonts/382CF0_2_0.woff', type: 'font/woff', crossorigin: 'anonymous'},
      { rel: 'preload', as: 'font', href: '/_nuxt/static/webfonts/382CF0_3_0.woff2', type: 'font/woff2', crossorigin: 'anonymous'},
      { rel: 'preload', as: 'font', href: '/_nuxt/static/webfonts/382CF0_3_0.woff', type: 'font/woff', crossorigin: 'anonymous'},
      { rel: 'preload', as: 'font', href: '/_nuxt/static/webfonts/382CF0_4_0.woff2', type: 'font/woff2', crossorigin: 'anonymous'},
      { rel: 'preload', as: 'font', href: '/_nuxt/static/webfonts/382CF0_4_0.woff', type: 'font/woff', crossorigin: 'anonymous'},
      { rel: 'preload', as: 'font', href: '/_nuxt/static/webfonts/382CF0_5_0.woff2', type: 'font/woff2', crossorigin: 'anonymous'},
      { rel: 'preload', as: 'font', href: '/_nuxt/static/webfonts/382CF0_5_0.woff', type: 'font/woff', crossorigin: 'anonymous'},
      { rel: 'preload', as: 'font', href: '/_nuxt/static/webfonts/382CF0_6_0.woff2', type: 'font/woff2', crossorigin: 'anonymous'},
      { rel: 'preload', as: 'font', href: '/_nuxt/static/webfonts/382CF0_6_0.woff', type: 'font/woff', crossorigin: 'anonymous'},
      { rel: 'preload', as: 'font', href: '/_nuxt/static/webfonts/382CF0_7_0.woff2', type: 'font/woff2', crossorigin: 'anonymous'},
      { rel: 'preload', as: 'font', href: '/_nuxt/static/webfonts/382CF0_7_0.woff', type: 'font/woff', crossorigin: 'anonymous'},
      { rel: 'preload', as: 'font', href: '/_nuxt/static/webfonts/382CF0_8_0.woff2', type: 'font/woff2', crossorigin: 'anonymous'},
      { rel: 'preload', as: 'font', href: '/_nuxt/static/webfonts/382CF0_8_0.woff', type: 'font/woff', crossorigin: 'anonymous'},
      { rel: 'preload', as: 'font', href: '/_nuxt/static/webfonts/382CF0_9_0.woff2', type: 'font/woff2', crossorigin: 'anonymous'},
      { rel: 'preload', as: 'font', href: '/_nuxt/static/webfonts/382CF0_9_0.woff', type: 'font/woff', crossorigin: 'anonymous'},
      { rel: 'preload', as: 'font', href: '/_nuxt/static/webfonts/382CF0_A_0.woff2', type: 'font/woff2', crossorigin: 'anonymous'},
      { rel: 'preload', as: 'font', href: '/_nuxt/static/webfonts/382CF0_A_0.woff', type: 'font/woff', crossorigin: 'anonymous'},
      { rel: 'preload', as: 'font', href: '/_nuxt/static/webfonts/382CF0_B_0.woff2', type: 'font/woff2', crossorigin: 'anonymous'},
      { rel: 'preload', as: 'font', href: '/_nuxt/static/webfonts/382CF0_B_0.woff', type: 'font/woff', crossorigin: 'anonymous'},
      { rel: 'preload', as: 'font', href: '/_nuxt/static/webfonts/382CF0_C_0.woff2', type: 'font/woff2', crossorigin: 'anonymous'},
      { rel: 'preload', as: 'font', href: '/_nuxt/static/webfonts/382CF0_C_0.woff', type: 'font/woff', crossorigin: 'anonymous'},
      { rel: 'preload', as: 'font', href: '/_nuxt/static/webfonts/382CF0_D_0.woff2', type: 'font/woff2', crossorigin: 'anonymous'},
      { rel: 'preload', as: 'font', href: '/_nuxt/static/webfonts/382CF0_D_0.woff', type: 'font/woff', crossorigin: 'anonymous'},
      { rel: 'preload', as: 'image', href: '/_nuxt/static/img/logo.svg' },
      { rel: 'preload', as: 'image', href: '/_nuxt/static/img/logo-white.svg' }
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
