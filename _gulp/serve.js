var gulp        = require("gulp");
var browserSync = require('browser-sync');

gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: './_site/'
    },
    port: 9000,
    open: false,
    notify: false
  });
});
