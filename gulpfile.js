// =========================
// Modules
// =========================

var gulp 				= require('gulp'),
		stylus 			= require('gulp-stylus'),
		prefixer 		= require('autoprefixer-stylus'),
		jeet				= require('jeet'),
		plumber			= require('gulp-plumber'),
		rupture			= require('rupture'),
		koutoSwiss 	= require('kouto-swiss')
		uglify 			= require('gulp-uglify'),
		concat			= require('gulp-concat'),
		imagemin		= require('gulp-imagemin'),
		pngquant		= require('imagemin-pngquant'),
		gcmq 				= require('gulp-group-css-media-queries'),
		browserSync = require('browser-sync');

// Directories

path = {
	dev		: 'app/src',
	prod	: 'app/assets'
}

// =========================
// Tasks
// =========================

// Call Browser-Sync
gulp.task('browser-sync', function() {
	browserSync.init(['app/assets/stylesheets/*.css', 'app/*.html'], {
		notify: {
			styles: {
				top: 'auto',
				bottom: '0'
			}
		},
		server: {
			 baseDir: 'app'
		},
		tunnel: true
	})
});

// Call Stylus
gulp.task('stylus', function() {
	gulp.src( path.dev + '/stylus/main.styl')
		.pipe(plumber())
		.pipe(stylus({
			use: [jeet(), rupture(), koutoSwiss()],
			// compress:true  // minificando css
		})) 
		.pipe(gcmq())
		.pipe(gulp.dest( path.prod + '/stylesheets'));
});

// Call javascript uglify and concat
gulp.task('js', function(){
	return gulp.src(path.dev + '/javascripts/*.js')
		.pipe(plumber())
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest( path.prod + '/javascripts'))
});

// Call task Imagemin
gulp.task('imagemin', function() {
	return gulp.src( path.dev + '/images/**/*')
		.pipe(imagemin({ 
			optimizationLevel: 5, 
			progressive: true, 
			interlaced: true,
			use: [pngquant()]
		}))
		.pipe(gulp.dest( path.prod + '/images/'));
});

// Call Watch
gulp.task('watch', ['stylus', 'browser-sync'], function() {
	gulp.watch( path.dev + '/stylus/**/**.styl', ['stylus']);
	gulp.watch( path.dev + '/javascripts/**/*.js', ['js']);
	gulp.watch( path.dev + '/images/**/*.{jpg,png,gif}', ['imagemin']);
	gulp.watch('./app/*.html')
});

//Default Task
gulp.task('default', ['js','stylus', 'imagemin', 'browser-sync', 'watch']);