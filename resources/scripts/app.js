var map = require('./map'),
    scrollTo = require('./scrollTo'),
    talk = require('./track'),
    sticky = require('./sticky');

var emailDomain = ['m', 'o', 'v', 'i', 'o', '.', 'c', 'o'];
var emailName = ['n', 'a', 't', 'a', 'l', 'i', 'e'];
var mailToChars = ['m', 'a', 'i', 'l', 't', 'o'];

$(document.getElementById('email')).on('click', function () {
  location.href = mailToChars.join('') + ':' + emailName.join('') + '@' + emailDomain.join('');
});
