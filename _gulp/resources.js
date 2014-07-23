var gulp         = require('gulp');
var handleErrors = require('./utils/handleErrors');

gulp.task('copy:fonts', function() {
  return gulp.src(['./bower_components/ionic/fonts/*.*'])
    .pipe(gulp.dest('./resources/fonts'))
    .on('error', handleErrors);
});

gulp.task('copy:scripts', function() {
  return gulp.src('./bower_components/**/*.js', {base: './bower_components'})
    .pipe(gulp.dest('./resources/scripts/libs'))
    .on('error', handleErrors);
});

