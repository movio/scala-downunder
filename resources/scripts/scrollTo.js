require('velocity');
require('velocityUI');
var elements = require('./elements');

function offset() {
  if (!elements.stickyHeader) {
    elements.stickyHeader = $(document.getElementById('header-sticky-wrapper'));
  }

  if (!elements.stickyBanner) {
    elements.stickyBanner = $(document.getElementById('banner-sticky-wrapper'));
  }

  var stickyHeight = elements.stickyHeader.outerHeight() + (elements.isSmall() ? 0 : elements.stickyBanner.outerHeight());

  return -1 * (stickyHeight - 2);
}



$('nav a', elements.header).on('click', function (e) {
    var source = e.target || e.srcElement;
    var destination = source.getAttribute('data-href');
    if (elements[destination]) {
        elements[destination].velocity('scroll', {duration: 750, offset: offset()});
    }
});

$('#arrow-svg, #arrow-svg > *').on('click', function() {
    elements['about'].velocity('scroll', {duration: 750, offset: offset()});
});
