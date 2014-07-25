var gulp  = require('gulp');
var $     = require('./utils/plugins');

gulp.task('minifyHtml', function() {
  gulp.src('./_site/*.html')
    .pipe($.minifyHtml({empty: true, spare: true, comments: true}))
    .pipe(gulp.dest('./_site'));
});
