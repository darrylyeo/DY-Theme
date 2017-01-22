// Directories
const THEME_NAME = 'DY'
const THEME_DIR = `/wp-content/themes/${THEME_NAME}/`
const BUILD_DIR = `build/${THEME_NAME}`

// Node Modules
const gulp = require('gulp')
const concat = require('gulp-concat')
const browserSync = require('browser-sync').create()
const babel = require('gulp-babel')
const cssnano = require('gulp-cssnano')
const lintspaces = require('gulp-lintspaces')
const postcss = require('gulp-postcss')
const postcss_import = require('postcss-import')
const postcss_url = require('postcss-url')
const postcss_cssnext = require('postcss-cssnext')

// Assets
const assets = require('./src/assets/assets')


// css: transpile, lint, minify, concatenate, and output all of the CSS files listed in assets.json
gulp.task('css', () => {
	const cssFiles = assets.css.map(handle => `src/assets/${handle}.css`)

	return gulp.src(cssFiles)
		// Transpile
		.pipe(
			postcss([
				postcss_import(),
				postcss_url(),
				postcss_cssnext({
					features: {
						rem: {
							html: false
						}
					}
				}),
				//require('gulp-cssnano')(),
			])
		)

		// Lint
		.pipe(
			lintspaces({
				newlineMaximum: 3,
				trailingspaces: true,
				indentation: 'tabs'
			})
		)

		// Minify
		.pipe(
			cssnano({
				discardUnused: {
					fontFace: false
				}
			})
		)

		// Concatenate
		.pipe(
			concat('all.min.css')
		)

		// Output
		.pipe(
			gulp.dest(`${BUILD_DIR}/assets`)
		)
})


// js: transpile, lint, concatenate, and output all of the JS files listed in assets.json
gulp.task('js', () => {
	const jsFiles = assets.js.map(handle => `src/assets/${handle}.js`)

	return gulp.src(jsFiles)
		// Transpile
		.pipe(
			babel({
				presets: ['babili'],
				comments: false
			})
		)

		// Lint
		.pipe(
			lintspaces({
				newlineMaximum: 3,
				trailingspaces: true,
				indentation: 'tabs'
			})
		)

		// Concatenate
		.pipe(
			concat('all.min.js')
		)

		// Output
		.pipe(
			gulp.dest(`${BUILD_DIR}/assets`)
		)
})


// assets: process CSS and JS simultaneously
gulp.task('assets', gulp.parallel('css', 'js'))


// copy-directories: copy all files to the build directory
gulp.task('copy-directories', () => {
	return gulp.src([
		'src/**/*.*'
		//'src/*',
		//'!src/*.php',
		//'src/framework/**/*.*',
		//'src/assets/**/*.*',
		//'src/templates/**/*.*',
		//'src/plugins/**/*.*',
		//'src/fonts/**/*.*',
		//'src/logo/**/*.*',
	], {
		base: 'src/'
	})
		.pipe(gulp.dest(BUILD_DIR))
		.pipe(browserSync.stream())
})


// build: process assets and copy all files
gulp.task('build', gulp.parallel('assets', 'copy-directories'))


// copy-directories: copy all files to the build directory upon file change
gulp.task('watch-copy-directories', () => {
	browserSync.init({
		//server: './',
		proxy: 'localhost:8888/darrylyeo'
	})
	return gulp.watch(['src/*.php', 'src/**/*.*'], gulp.parallel('copy-directories'))
		//.on('change', browserSync.reload)
})


// watch-build: build upon file change
gulp.task('watch-build', () => {
	browserSync.init({
		//server: './',
		proxy: 'localhost:8888/darrylyeo'
	})
	return gulp.watch(['src/*.php', 'src/**/*.*'], gulp.parallel('build'))
		//.on('change', browserSync.reload)
})