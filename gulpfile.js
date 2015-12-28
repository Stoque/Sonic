// Call plugins
var gulp 				= require('gulp'),
		stylus 			= require('gulp-stylus'),
		jeet				= require('jeet'),
		rupture			= require('rupture'),
		browserSync = require('browser-sync');

// Call Stylus
gulp.task('stylus', function() {
	gulp.src('app/src/stylus/main.styl')
		.pipe(stylus({
			use: [jeet(), rupture()]
			//,compress:true  // MINIFICANDO CSS
		})) 
		.pipe(gulp.dest('app/assets/stylesheets'));
});

// Call Stylus Build witch compress:true
gulp.task('stylus-build', function() {
	gulp.src('app/src/stylus/main.styl')
		.pipe(stylus({
			use: [jeet(), rupture()],
			compress:true  // minificando css
		})) 
		.pipe(gulp.dest('app/assets/stylesheets'));
});

// Call Browser-Sync
gulp.task('browser-sync', function() {
	browserSync.init(['app/assets/stylesheets/*.css', 'app/*.html'], {
		server: {
			tunnel: true,
			baseDir: 'app'
		}
	});
});

// Call Watch
gulp.task('watch', ['stylus', 'browser-sync'], function() {
	gulp.watch('./app/src/stylus/**/**.styl', ['stylus']);
});

//Default Task
gulp.task('default', ['stylus', 'browser-sync', 'watch']);

//Build Task
gulp.task('build', ['stylus-build', 'browser-sync', 'watch']);