var gulp  = require('gulp');
var $     = require('./utils/plugins');

gulp.task('watch', function() {
  gulp.watch(['./resources/styles/*.less'], ['less']);
  gulp.watch(['./_site/*.html'], ['sync:reload']);
  gulp.watch(['./_site/resources/*.css'], ['sync:reload']);
  gulp.watch(['./_site/resources/*.js'], ['sync:reload']);
});
