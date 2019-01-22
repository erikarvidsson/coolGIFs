const browsersync = require('rollup-plugin-browsersync')
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = isProduction === false;
const postcss = require('rollup-plugin-postcss');
const postcssNormalize = require('postcss-normalize');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const filesize = require('rollup-plugin-filesize');
const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const { terser }  = require('rollup-plugin-terser');


module.exports = {
  input: 'src/scripts/index.js',
  output: {
    file: 'public/giphy.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
  resolve(),
  commonjs(),
  postcss({
    extract: true,
    plugins: [
      postcssNormalize(),
      autoprefixer(),
      cssnano(),
    ],
      sourcemap: isDevelopment,
  }),
  babel(),
  (isProduction && terser()),
  filesize(),
  (isDevelopment && browsersync({server: 'public'}))
 ]
};
