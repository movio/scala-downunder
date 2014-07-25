var path         = require('path');
var gulp         = require('gulp');
var $            = require('./utils/plugins');
var handleErrors = require('./utils/handleErrors');

gulp.task('deploy', function() {
  global.isWatching = false;
  return gulp.src('', {read: false})
    .pipe($.shell([
      'gulp build --no-watch',
      'jekyll build',
      'gulp usemin',
      'gulp minifyHtml',
      'rm _site/resources/app.css',
      'rm _site/resources/app.js',
      'cd _site && git add . -A',
      'cd _site && git commit -m "Publish website"',
      'cd _site && git push -f origin gh-pages'
    ]))
    .on('error', handleErrors);
});
