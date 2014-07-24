require('velocity');
require('velocityUI');
var elements = require('./elements');

function offset() {
  var stickyHeight = elements.header.outerHeight() + (elements.isSmall() ? 0 : elements.banner.outerHeight());

  return -1 * (stickyHeight - 2);
}

$('.header-link a', elements.header).on('click', function (e) {
  var source = e.target || e.srcElement;
  var destination = (source.getAttribute('href') || '').slice(1);

  if (elements[destination]) {
    elements[destination].velocity('scroll', {duration: 750, offset: offset()});
  }
});
