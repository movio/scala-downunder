var gulp         = require('gulp');
var $            = require('./utils/plugins');
var handleErrors = require('./utils/handleErrors');

gulp.task('sprites', function () {
    return gulp.src(['./resources/icons/*.svg'])
        .pipe($.svgSprites({
          mode: "symbols",
          preview: false,
          svg: {
            symbols: "icons.svg"
          }
        }))
        .pipe(gulp.dest('./_includes'));
});
