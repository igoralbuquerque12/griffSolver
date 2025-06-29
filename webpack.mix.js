const mix = require('laravel-mix')
const glob = require('glob')
const path = require('path')
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin')
const rimraf = require('rimraf')

mix
    // JS
    .js('./src/js/grafico.js', './dist/js/')
    .js('./src/js/tabela.js', './dist/js/')
    .js('./src/js/tabular.js', './dist/js/')
    .js('./src/js/dual-simplex.js', './dist/js/')
    .js('./src/js/support/helpers.js', './dist/js/')
    // CSS
    .sass('./src/scss/app.scss', './dist/css/');