var sticky = require('sticky');

console.log('Sticky ready 4');

var header = $(document.getElementById('header'));
var banner = $(document.getElementById('banner'));

console.log('Top banner', header.outerHeight());

$("#header").sticky({topSpacing:0});
$("#banner").sticky({topSpacing:header.outerHeight()});
