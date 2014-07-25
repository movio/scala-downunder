require('velocity');
require('velocityUI');
var elements = require('./elements');

var duration = 300;
var inProgress = false;

function extractElements(event) {
  var source = event.target || event.srcElement;
  var track = $(source).closest('.track');
  var description = track.find('.track-description');

  return {
    source: source,
    track: track,
    description: description,
    rect: track[0].getBoundingClientRect()
  };
}

// Do not display description if clicking on a link inside a track
// (mostly for speaker twitter links)
$('a', elements.schedule).on('click', function (e) {
  e.stopPropagation();
});

$('.track.with-description .track-name', elements.schedule).on('click', function (e) {
  if (inProgress) return;
  inProgress = true;
  elements.body.addClass('with-track-description');

  var elems = extractElements(e);

  elems.description
    .velocity({
      top: elems.rect.top,
      left: elems.rect.left,
      width: elems.rect.width,
      height: elems.rect.height
    }, {duration: 1, display: 'block'})
    .velocity({
      opacity: 1,
      left: 0,
      width: window.innerWidth
    }, {duration: duration})
    .velocity({
      top: 0,
      height: window.innerHeight
    }, {duration: duration})
    .velocity({
      width: '100%',
      height: '100%'
    }, {
      duration: 1,
      complete: function () {
        elems.description.addClass('visible');
        inProgress = false;
      }
    });
});

$('.track-description-close span', elements.schedule).on('click', function (e) {
  if (inProgress) return;
  inProgress = true;
  e.stopPropagation();

  var elems = extractElements(e);

  elems.description.removeClass('visible');
  elems.description
    .velocity({
      width: window.innerWidth,
      height: window.innerHeight
    }, {duration: 1})
    .velocity({
      top: elems.rect.top,
      height: elems.rect.height
    }, {duration: duration})
    .velocity({
      opacity: 0,
      left: elems.rect.left,
      width: elems.rect.width
    }, {
      duration: duration,
      display: 'none',
      complete: function () {
        elements.body.removeClass('with-track-description');
        inProgress = false;
      }
    });

});
