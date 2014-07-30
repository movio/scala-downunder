var gulp         = require('gulp');
var browserify   = require('browserify');
var watchify     = require('watchify');
var source       = require('vinyl-source-stream');
var handleErrors = require('./utils/handleErrors');
var log          = require('./utils/log');

gulp.task('browserify', function() {
	if (process.argv.indexOf('--no-watch') > -1) {
		global.isWatching = false;
	}

	var bundleMethod = (global.isWatching === false) ? browserify : watchify;

	var bundler = bundleMethod({
		entries: ['./resources/scripts/app.js'],
	});

	var bundle = function() {
		// Log when bundling starts
		log.start();

		return bundler
			// Enable source maps!
			.bundle({debug: true})
			// Report compile errors
			.on('error', handleErrors)
			// Use vinyl-source-stream to make the
			// stream gulp compatible. Specifiy the
			// desired output filename here.
			.pipe(source('app.js'))
			// Specify the output destination
			.pipe(gulp.dest('./resources/'))
			// Log when bundling completes!
			.on('end', log.end);
	};

	if(global.isWatching !== false) {
		// Rebundle with watchify on changes.
		bundler.on('update', bundle);
	}

	return bundle();
});
