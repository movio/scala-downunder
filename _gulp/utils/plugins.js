var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

module.exports = plugins;

module.exports.reload = browserSync.reload;
module.exports.reloadStream = function () {
  return browserSync.reload({stream: true});
};
