// Include gulp
var gulp = require('gulp');

 // Include plugins
var concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	jshint = require('gulp-jshint'),
	minifyCSS = require('gulp-minify-css'),
	notify = require('gulp-notify'),
	livereload = require('gulp-livereload'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	del = require('del');

// Concatenate and Minify JS Files
gulp.task('scripts', function(){
	return gulp.src('src/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(uglify())
		.pipe(concat('main.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/js'))
		.pipe(notify({ message: 'Scripts tasks complete' }));
});

// Concatenate and Minify JS Files for views folder
gulp.task('scripts1', function(){
	return gulp.src('src/views/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(uglify())
		.pipe(concat('main.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('views/dist/js'))
		.pipe(notify({ message: 'Scripts1 tasks complete' }));
});

// Concatenate and Minify css files
gulp.task('css', function(){
    return gulp.src(['src/css/*.css'])
        .pipe(minifyCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'))
		.pipe(notify({ message: 'CSS tasks complete' }));
});

// Concatenate and Minify css files for the views folder
gulp.task('css1', function(){
    return gulp.src('src/views/css/style.css')
        .pipe(minifyCSS())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('views/dist/css'))
		.pipe(notify({ message: 'CSS1 tasks complete' }));
});

// Concatenate and Minify css files for the views folder
gulp.task('css2', function(){
    return gulp.src('src/views/css/bootstrap-grid.css')
        .pipe(minifyCSS())
        .pipe(rename('bootstrap-grid.min.css'))
        .pipe(gulp.dest('views/dist/css'))
		.pipe(notify({ message: 'CSS2 tasks complete' }));
});

// Minify and cache image files
gulp.task('images', function() {
	return gulp.src('src/img/*.{png,jpg}')
		.pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
		.pipe(gulp.dest('dist/img'))
		.pipe(notify({ message: 'Images task complete'}));
});

// Minify and cache image files
gulp.task('images1', function() {
	return gulp.src('src/views/images/*.{jpg,png}')
		.pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
		.pipe(gulp.dest('views/dist/images'))
		.pipe(notify({ message: 'Images1 task complete'}));
});

// Clean out destination folders
gulp.task('clean', function(cb) {
	del(['dist/js','dist/css','dist/img',
		'views/dist/js','views/dist/css','views/dist/images'], cb)
});

// Create tasks to watch if any of the files changes
gulp.task('watch', function() {
	// Watch .js files
	gulp.watch(['src/js/*.js','src/views/js/*.js'], ['scripts','scripts1']);

	// Watch .css files
	gulp.watch(['src/css/*.css','src/views/css/*.css'], ['css','css1','css2']);

	// Watch image files
	gulp.watch(['src/img/*.{png,jpg}','src/views/images/*.{png,jpg}'], ['images']);

	// Create LiveReload server
	livereload.listen();

	// Watch any files in build/, reload on change
	gulp.watch(['dist/**','views/dist/**']).on('change', livereload.changed);
});

// Define default task when running gulp in CLI that includes the above tasks
gulp.task('default',['clean'], function() {
	gulp.start('scripts','scripts1','css','css1','css2','images','watch');
});

