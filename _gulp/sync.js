var gulp         = require('gulp');
var $            = require('./utils/plugins');
var handleErrors = require('./utils/handleErrors');

gulp.task('sync:reload', function() {
  $.reload();
});
