/* eslint-disable func-names */
/* eslint-disable prettier/prettier */
module.exports = function(wallaby) {
  return {
    files: [
      {
        pattern: 'node_modules/babel-polyfill/dist/polyfill.js',
        instrument: false,
      },
      'src/**/*.js',
    ],

    tests: ['test/**/*.spec.js'],

    compilers: {
      '**/*.js': wallaby.compilers.babel(),
    },
  }
}
