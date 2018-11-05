var config = require('config'),
    path = require('path');

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    'node': true,
    'browser': true
  },
  extends: 'airbnb-base',
  plugins: [
    'html',
    'import'
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias: {
              '~': config.get('paths.app.client'),
              '@': config.get('paths.app.client')
            }
          }
        }
      },
      'babel-module': {
        '@utl': './src/server/app/utility',
        '@mod': './src/server/app/modules',
        '@mid': './src/server/app/middlewares',
        '@socket': './src/server/app/socket'
      }
    }
  },
  rules: {
    'comma-dangle': [
      'error', {
        'functions': 'ignore'
      }
    ],
    'import/extensions': [
      'error',
      'always', {
        'js': 'never',
        'vue': 'never'
      }
    ],
    'import/no-extraneous-dependencies': [
      'error', {
        'devDependencies': true,
        'optionalDependencies': true
      }
    ],
    'no-param-reassign': [
      'error', {
        'props': false
      }
    ],
    'no-underscore-dangle': [
      'error', {
        'allow': [
          '_id',
          '_token'
        ]
      }
    ],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
};
