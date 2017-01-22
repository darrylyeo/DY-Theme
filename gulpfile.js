var THEME_DIR = '/wp-content/themes/DY/'

var gulp = require('gulp')

//var useref = require('gulp-useref')
//var gulpIf = require('gulp-if')
var concat = require('gulp-concat')

//var uglify = require('gulp-uglify')

var browserSync = require('browser-sync').create()

var assets = require('./src/assets/assets')

/*gulp.task('assets', () => {
	// Replace scripts in PHP files with minified, concatenated scripts
	return gulp.src('src/*.php')
		// Concatenate and replace references in HTML - look for "<!-- build:assets all.min.js -->"
		.pipe(useref({
			//noconcat: true
			base: './',
			transformPath: function(filePath) {
				return filePath.replace(THEME_DIR, '')
			}
		}))

		// Minify JS
		.pipe(gulpIf('*.js',
			babel({
				presets: ['babili'],
				comments: false
			})
		))
		//.pipe(gulpIf('*.js', uglify()))

		// Minify CSS
		.pipe(gulpIf('*.css', cssnano()))

		// Output
		.pipe(gulp.dest('build'))
})*/

gulp.task('css', () => {
	var cssFiles = assets.css.map(handle => `src/assets/${handle}.css`)
	return gulp.src(cssFiles)
	//return gulp.src('src/assets/*.css')
		.pipe(require('gulp-cssnano')({
			discardUnused: {
				fontFace: false
			}
		}))
		.pipe(concat('all.min.css'))
		.pipe(require('gulp-postcss')([
			require("postcss-import")(),
			require("postcss-url")(),
			require("postcss-cssnext")({
				features: {
					rem: {
						html: false
					}
				}
			}),
			//require('gulp-cssnano')(),
		]))
		.pipe(gulp.dest('build/assets'))
})
//gulp.watch('src/assets/*.css', gulp.parallel('css'))

gulp.task('js', () => {
	var jsFiles = assets.js.map(handle => `src/assets/${handle}.js`)
	return gulp.src(jsFiles)
	//return gulp.src('src/assets/*.js')
		.pipe(
			require("gulp-babel")({
				presets: ['babili'],
				comments: false
			})
		)
		.pipe(concat('all.min.js'))
		.pipe(gulp.dest('build/assets'))
})
gulp.task('assets', gulp.parallel('css', 'js'))
//gulp.watch('src/assets/*.js', gulp.parallel('js'))


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
		.pipe(gulp.dest('build'))
		.pipe(browserSync.stream())
})
gulp.task('watch-copy-directories', () => {
	browserSync.init({
		//server: "./",
		proxy: "localhost:8888/darrylyeo"
	})
	return gulp.watch(['src/*.php', 'src/assets/**/*.*'], gulp.parallel('copy-directories'))
		//.on('change', browserSync.reload)
})
gulp.task('watch-build', () => {
	browserSync.init({
		//server: "./",
		proxy: "localhost:8888/darrylyeo"
	})
	return gulp.watch(['src/*.php', 'src/assets/**/*.*'], gulp.parallel('build'))
		//.on('change', browserSync.reload)
})

gulp.task('build', gulp.parallel('assets', 'copy-directories'))