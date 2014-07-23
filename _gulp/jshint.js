var gulp         = require('gulp');
var $            = require('./utils/plugins');
var handleErrors = require('./utils/handleErrors');

gulp.task('jshint', function () {
  return gulp.src([$.paths.scripts.all])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});
