var gulp         = require('gulp');
var $            = require('./utils/plugins');
var handleErrors = require('./utils/handleErrors');
var path         = require('path');

gulp.task('less', function() {
  return gulp.src('./resources/styles/app.less')
    .pipe($.less({
      paths: [ path.join(__dirname, '..', 'resources/styles'), path.join(__dirname, '..', 'bower_components'), path.join(__dirname, '..', 'node_modules') ]
    }))
    .pipe(gulp.dest('./resources'))
    .on('error', handleErrors);
});
