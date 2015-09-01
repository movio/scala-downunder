var path         = require('path');
var gulp         = require('gulp');
var $            = require('./utils/plugins');
var handleErrors = require('./utils/handleErrors');

gulp.task('deploy', function() {
  global.isWatching = false;
  return gulp.src('', {read: false})
    .pipe($.shell([
      'rm -f _site/resources/app.min*',
      'gulp build --no-watch',
      'jekyll build --future',
      'gulp usemin',
      'gulp minifyHtml',
      'rm -f _site/resources/app.css',
      'rm -f _site/resources/app.js',
      'cd _site && git add . -A',
      'cd _site && git commit -m "Publish website"',
      'cd _site && git push -f origin gh-pages'
    ]))
    .on('error', handleErrors);
});
