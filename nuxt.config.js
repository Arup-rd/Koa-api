import isDev from 'isdev';
import cfg from 'config';
import { resolve } from 'path';

module.exports = {
  srcDir: cfg.get('paths.app.client'),
  buildDir: cfg.get('paths.dist.client'),
  rootDir: './',
  dev: isDev,
  head: {
    title: 'Smonyx 1.0',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    'normalize.css'
  ],
  loading: { color: '#3B8070' },
  build: {
    vendor: [],
    postcss: {
      plugins: {
        'postcss-partial-import': {},
        'postcss-crip': {},
        'postcss-nested-props': {},
        'postcss-map': {
          basePath: resolve(__dirname, 'styleVars'),
          maps: [
            'fonts.yml',
            'colors.yml'
          ]
        },
        'postcss-mixins': {},
        'postcss-advanced-variables': {},
        'postcss-short': {},
        'postcss-cssnext': {
          browsers: [
            'last 5 versions',
            'Opera 12.1',
            'safari >= 8',
            'ie >= 10',
            'ff >= 20',
            'ios 6',
            'android 4',
            'ie >= 9'
          ]
        },
        'postcss-ref': {},
        'postcss-property-lookup': {},
        'postcss-utilities': {},
        'rucksack-css': {},
        'postcss-extend': {},
        'postcss-merge-rules': {},
        'css-mqpacker': {}
      }
    }
  },
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    // proxyHeaders: false
  }
};
