var fs    = require('fs');
var path  = require('path');
var gulp  = require('gulp');
var tasks = fs.readdirSync('./_gulp/').filter(function(name) {
  return (/(\.js$)/i).test(path.extname(name));
});

tasks.forEach(function(task) {
  require('./_gulp/' + task);
});

gulp.task('build', ['browserify', 'less', 'sprites']);

gulp.task('default', ['build', 'serve', 'watch']);

gulp.task('deploy', ['usemin']);
