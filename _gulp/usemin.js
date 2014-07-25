var gulp  = require('gulp');
var $     = require('./utils/plugins');

gulp.task('usemin', function() {
  gulp.src('./_site/*.html')
    .pipe($.usemin({
      css: [$.minifyCss(), 'concat', $.rev()],
      // html: [minifyHtml({empty: true})],
      js: [$.uglify(), $.rev()]
    }))
    .pipe(gulp.dest('./_site'));
});
