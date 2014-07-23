(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
;__browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
// Sticky Plugin v1.0.0 for jQuery
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
// Improvements by Leonardo C. Daronco (daronco)
// Created: 2/14/2011
// Date: 2/12/2012
// Website: http://labs.anthonygarand.com/sticky
// Description: Makes an element on the page stick on the screen as you scroll
//       It will only set the 'top' and 'position' of your element, you
//       might need to adjust the width in some cases.

(function($) {
  var defaults = {
      topSpacing: 0,
      bottomSpacing: 0,
      className: 'is-sticky',
      wrapperClassName: 'sticky-wrapper',
      center: false,
      getWidthFrom: '',
      responsiveWidth: false
    },
    $window = $(window),
    $document = $(document),
    sticked = [],
    windowHeight = $window.height(),
    scroller = function() {
      var scrollTop = $window.scrollTop(),
        documentHeight = $document.height(),
        dwh = documentHeight - windowHeight,
        extra = (scrollTop > dwh) ? dwh - scrollTop : 0;

      for (var i = 0; i < sticked.length; i++) {
        var s = sticked[i],
          elementTop = s.stickyWrapper.offset().top,
          etse = elementTop - s.topSpacing - extra;

        if (scrollTop <= etse) {
          if (s.currentTop !== null) {
            s.stickyElement
              .css('position', '')
              .css('top', '');
            s.stickyElement.trigger('sticky-end', [s]).parent().removeClass(s.className);
            s.currentTop = null;
          }
        }
        else {
          var newTop = documentHeight - s.stickyElement.outerHeight()
            - s.topSpacing - s.bottomSpacing - scrollTop - extra;
          if (newTop < 0) {
            newTop = newTop + s.topSpacing;
          } else {
            newTop = s.topSpacing;
          }
          if (s.currentTop != newTop) {
            s.stickyElement
              .css('position', 'fixed')
              .css('top', newTop);

            if (typeof s.getWidthFrom !== 'undefined') {
              s.stickyElement.css('width', $(s.getWidthFrom).width());
            }

            s.stickyElement.trigger('sticky-start', [s]).parent().addClass(s.className);
            s.currentTop = newTop;
          }
        }
      }
    },
    resizer = function() {
      windowHeight = $window.height();

      for (var i = 0; i < sticked.length; i++) {
        var s = sticked[i];
        if (typeof s.getWidthFrom !== 'undefined' && s.responsiveWidth === true) {
          s.stickyElement.css('width', $(s.getWidthFrom).width());
        }
      }
    },
    methods = {
      init: function(options) {
        var o = $.extend({}, defaults, options);
        return this.each(function() {
          var stickyElement = $(this);

          var stickyId = stickyElement.attr('id');
          var wrapperId = stickyId ? stickyId + '-' + defaults.wrapperClassName : defaults.wrapperClassName 
          var wrapper = $('<div></div>')
            .attr('id', stickyId + '-sticky-wrapper')
            .addClass(o.wrapperClassName);
          stickyElement.wrapAll(wrapper);

          if (o.center) {
            stickyElement.parent().css({width:stickyElement.outerWidth(),marginLeft:"auto",marginRight:"auto"});
          }

          if (stickyElement.css("float") == "right") {
            stickyElement.css({"float":"none"}).parent().css({"float":"right"});
          }

          var stickyWrapper = stickyElement.parent();
          stickyWrapper.css('height', stickyElement.outerHeight());
          sticked.push({
            topSpacing: o.topSpacing,
            bottomSpacing: o.bottomSpacing,
            stickyElement: stickyElement,
            currentTop: null,
            stickyWrapper: stickyWrapper,
            className: o.className,
            getWidthFrom: o.getWidthFrom,
            responsiveWidth: o.responsiveWidth
          });
        });
      },
      update: scroller,
      unstick: function(options) {
        return this.each(function() {
          var unstickyElement = $(this);

          var removeIdx = -1;
          for (var i = 0; i < sticked.length; i++)
          {
            if (sticked[i].stickyElement.get(0) == unstickyElement.get(0))
            {
                removeIdx = i;
            }
          }
          if(removeIdx != -1)
          {
            sticked.splice(removeIdx,1);
            unstickyElement.unwrap();
            unstickyElement.removeAttr('style');
          }
        });
      }
    };

  // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
  if (window.addEventListener) {
    window.addEventListener('scroll', scroller, false);
    window.addEventListener('resize', resizer, false);
  } else if (window.attachEvent) {
    window.attachEvent('onscroll', scroller);
    window.attachEvent('onresize', resizer);
  }

  $.fn.sticky = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }
  };

  $.fn.unstick = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method ) {
      return methods.unstick.apply( this, arguments );
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }

  };
  $(function() {
    setTimeout(scroller, 0);
  });
})(jQuery);

; browserify_shim__define__module__export__(typeof sticky != "undefined" ? sticky : window.sticky);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
var sticky = require('./sticky'),
    map = require('./map');

console.log('App ready');

},{"./map":3,"./sticky":4}],3:[function(require,module,exports){
console.log('map ready 2');

var styles = [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill"},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#7dcdcd"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]}];

// var options = {
//   zoom: 15,
//   center: new google.maps.LatLng(53.385873, -1.471471),
//   mapTypeId: google.maps.MapTypeId.ROADMAP,
//   styles: styles
// };

// var map = new google.maps.Map(document.getElementById('map'), options);

},{}],4:[function(require,module,exports){
var sticky = require('sticky');

console.log('Sticky ready 4');

var header = $(document.getElementById('header'));
var banner = $(document.getElementById('banner'));

console.log('Top banner', header.outerHeight());

$("#header").sticky({topSpacing:0});
$("#banner").sticky({topSpacing:header.outerHeight()});

},{"sticky":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3BhdWwvV29yay9tb3Zpby9zY2FsYS1kb3dudW5kZXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9ob21lL3BhdWwvV29yay9tb3Zpby9zY2FsYS1kb3dudW5kZXIvYm93ZXJfY29tcG9uZW50cy9qcXVlcnktc3RpY2t5L2pxdWVyeS5zdGlja3kuanMiLCIvaG9tZS9wYXVsL1dvcmsvbW92aW8vc2NhbGEtZG93bnVuZGVyL3Jlc291cmNlcy9zY3JpcHRzL2FwcC5qcyIsIi9ob21lL3BhdWwvV29yay9tb3Zpby9zY2FsYS1kb3dudW5kZXIvcmVzb3VyY2VzL3NjcmlwdHMvbWFwLmpzIiwiL2hvbWUvcGF1bC9Xb3JrL21vdmlvL3NjYWxhLWRvd251bmRlci9yZXNvdXJjZXMvc2NyaXB0cy9zdGlja3kuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuO19fYnJvd3NlcmlmeV9zaGltX3JlcXVpcmVfXz1yZXF1aXJlOyhmdW5jdGlvbiBicm93c2VyaWZ5U2hpbShtb2R1bGUsIGV4cG9ydHMsIHJlcXVpcmUsIGRlZmluZSwgYnJvd3NlcmlmeV9zaGltX19kZWZpbmVfX21vZHVsZV9fZXhwb3J0X18pIHtcbi8vIFN0aWNreSBQbHVnaW4gdjEuMC4wIGZvciBqUXVlcnlcbi8vID09PT09PT09PT09PT1cbi8vIEF1dGhvcjogQW50aG9ueSBHYXJhbmRcbi8vIEltcHJvdmVtZW50cyBieSBHZXJtYW4gTS4gQnJhdm8gKEtyb251eikgYW5kIFJ1dWQgS2FtcGh1aXMgKHJ1dWRrKVxuLy8gSW1wcm92ZW1lbnRzIGJ5IExlb25hcmRvIEMuIERhcm9uY28gKGRhcm9uY28pXG4vLyBDcmVhdGVkOiAyLzE0LzIwMTFcbi8vIERhdGU6IDIvMTIvMjAxMlxuLy8gV2Vic2l0ZTogaHR0cDovL2xhYnMuYW50aG9ueWdhcmFuZC5jb20vc3RpY2t5XG4vLyBEZXNjcmlwdGlvbjogTWFrZXMgYW4gZWxlbWVudCBvbiB0aGUgcGFnZSBzdGljayBvbiB0aGUgc2NyZWVuIGFzIHlvdSBzY3JvbGxcbi8vICAgICAgIEl0IHdpbGwgb25seSBzZXQgdGhlICd0b3AnIGFuZCAncG9zaXRpb24nIG9mIHlvdXIgZWxlbWVudCwgeW91XG4vLyAgICAgICBtaWdodCBuZWVkIHRvIGFkanVzdCB0aGUgd2lkdGggaW4gc29tZSBjYXNlcy5cblxuKGZ1bmN0aW9uKCQpIHtcbiAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgdG9wU3BhY2luZzogMCxcbiAgICAgIGJvdHRvbVNwYWNpbmc6IDAsXG4gICAgICBjbGFzc05hbWU6ICdpcy1zdGlja3knLFxuICAgICAgd3JhcHBlckNsYXNzTmFtZTogJ3N0aWNreS13cmFwcGVyJyxcbiAgICAgIGNlbnRlcjogZmFsc2UsXG4gICAgICBnZXRXaWR0aEZyb206ICcnLFxuICAgICAgcmVzcG9uc2l2ZVdpZHRoOiBmYWxzZVxuICAgIH0sXG4gICAgJHdpbmRvdyA9ICQod2luZG93KSxcbiAgICAkZG9jdW1lbnQgPSAkKGRvY3VtZW50KSxcbiAgICBzdGlja2VkID0gW10sXG4gICAgd2luZG93SGVpZ2h0ID0gJHdpbmRvdy5oZWlnaHQoKSxcbiAgICBzY3JvbGxlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNjcm9sbFRvcCA9ICR3aW5kb3cuc2Nyb2xsVG9wKCksXG4gICAgICAgIGRvY3VtZW50SGVpZ2h0ID0gJGRvY3VtZW50LmhlaWdodCgpLFxuICAgICAgICBkd2ggPSBkb2N1bWVudEhlaWdodCAtIHdpbmRvd0hlaWdodCxcbiAgICAgICAgZXh0cmEgPSAoc2Nyb2xsVG9wID4gZHdoKSA/IGR3aCAtIHNjcm9sbFRvcCA6IDA7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RpY2tlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcyA9IHN0aWNrZWRbaV0sXG4gICAgICAgICAgZWxlbWVudFRvcCA9IHMuc3RpY2t5V3JhcHBlci5vZmZzZXQoKS50b3AsXG4gICAgICAgICAgZXRzZSA9IGVsZW1lbnRUb3AgLSBzLnRvcFNwYWNpbmcgLSBleHRyYTtcblxuICAgICAgICBpZiAoc2Nyb2xsVG9wIDw9IGV0c2UpIHtcbiAgICAgICAgICBpZiAocy5jdXJyZW50VG9wICE9PSBudWxsKSB7XG4gICAgICAgICAgICBzLnN0aWNreUVsZW1lbnRcbiAgICAgICAgICAgICAgLmNzcygncG9zaXRpb24nLCAnJylcbiAgICAgICAgICAgICAgLmNzcygndG9wJywgJycpO1xuICAgICAgICAgICAgcy5zdGlja3lFbGVtZW50LnRyaWdnZXIoJ3N0aWNreS1lbmQnLCBbc10pLnBhcmVudCgpLnJlbW92ZUNsYXNzKHMuY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIHMuY3VycmVudFRvcCA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHZhciBuZXdUb3AgPSBkb2N1bWVudEhlaWdodCAtIHMuc3RpY2t5RWxlbWVudC5vdXRlckhlaWdodCgpXG4gICAgICAgICAgICAtIHMudG9wU3BhY2luZyAtIHMuYm90dG9tU3BhY2luZyAtIHNjcm9sbFRvcCAtIGV4dHJhO1xuICAgICAgICAgIGlmIChuZXdUb3AgPCAwKSB7XG4gICAgICAgICAgICBuZXdUb3AgPSBuZXdUb3AgKyBzLnRvcFNwYWNpbmc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld1RvcCA9IHMudG9wU3BhY2luZztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHMuY3VycmVudFRvcCAhPSBuZXdUb3ApIHtcbiAgICAgICAgICAgIHMuc3RpY2t5RWxlbWVudFxuICAgICAgICAgICAgICAuY3NzKCdwb3NpdGlvbicsICdmaXhlZCcpXG4gICAgICAgICAgICAgIC5jc3MoJ3RvcCcsIG5ld1RvcCk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygcy5nZXRXaWR0aEZyb20gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIHMuc3RpY2t5RWxlbWVudC5jc3MoJ3dpZHRoJywgJChzLmdldFdpZHRoRnJvbSkud2lkdGgoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHMuc3RpY2t5RWxlbWVudC50cmlnZ2VyKCdzdGlja3ktc3RhcnQnLCBbc10pLnBhcmVudCgpLmFkZENsYXNzKHMuY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIHMuY3VycmVudFRvcCA9IG5ld1RvcDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHJlc2l6ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHdpbmRvd0hlaWdodCA9ICR3aW5kb3cuaGVpZ2h0KCk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RpY2tlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcyA9IHN0aWNrZWRbaV07XG4gICAgICAgIGlmICh0eXBlb2Ygcy5nZXRXaWR0aEZyb20gIT09ICd1bmRlZmluZWQnICYmIHMucmVzcG9uc2l2ZVdpZHRoID09PSB0cnVlKSB7XG4gICAgICAgICAgcy5zdGlja3lFbGVtZW50LmNzcygnd2lkdGgnLCAkKHMuZ2V0V2lkdGhGcm9tKS53aWR0aCgpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGluaXQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIG8gPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBzdGlja3lFbGVtZW50ID0gJCh0aGlzKTtcblxuICAgICAgICAgIHZhciBzdGlja3lJZCA9IHN0aWNreUVsZW1lbnQuYXR0cignaWQnKTtcbiAgICAgICAgICB2YXIgd3JhcHBlcklkID0gc3RpY2t5SWQgPyBzdGlja3lJZCArICctJyArIGRlZmF1bHRzLndyYXBwZXJDbGFzc05hbWUgOiBkZWZhdWx0cy53cmFwcGVyQ2xhc3NOYW1lIFxuICAgICAgICAgIHZhciB3cmFwcGVyID0gJCgnPGRpdj48L2Rpdj4nKVxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgc3RpY2t5SWQgKyAnLXN0aWNreS13cmFwcGVyJylcbiAgICAgICAgICAgIC5hZGRDbGFzcyhvLndyYXBwZXJDbGFzc05hbWUpO1xuICAgICAgICAgIHN0aWNreUVsZW1lbnQud3JhcEFsbCh3cmFwcGVyKTtcblxuICAgICAgICAgIGlmIChvLmNlbnRlcikge1xuICAgICAgICAgICAgc3RpY2t5RWxlbWVudC5wYXJlbnQoKS5jc3Moe3dpZHRoOnN0aWNreUVsZW1lbnQub3V0ZXJXaWR0aCgpLG1hcmdpbkxlZnQ6XCJhdXRvXCIsbWFyZ2luUmlnaHQ6XCJhdXRvXCJ9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc3RpY2t5RWxlbWVudC5jc3MoXCJmbG9hdFwiKSA9PSBcInJpZ2h0XCIpIHtcbiAgICAgICAgICAgIHN0aWNreUVsZW1lbnQuY3NzKHtcImZsb2F0XCI6XCJub25lXCJ9KS5wYXJlbnQoKS5jc3Moe1wiZmxvYXRcIjpcInJpZ2h0XCJ9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgc3RpY2t5V3JhcHBlciA9IHN0aWNreUVsZW1lbnQucGFyZW50KCk7XG4gICAgICAgICAgc3RpY2t5V3JhcHBlci5jc3MoJ2hlaWdodCcsIHN0aWNreUVsZW1lbnQub3V0ZXJIZWlnaHQoKSk7XG4gICAgICAgICAgc3RpY2tlZC5wdXNoKHtcbiAgICAgICAgICAgIHRvcFNwYWNpbmc6IG8udG9wU3BhY2luZyxcbiAgICAgICAgICAgIGJvdHRvbVNwYWNpbmc6IG8uYm90dG9tU3BhY2luZyxcbiAgICAgICAgICAgIHN0aWNreUVsZW1lbnQ6IHN0aWNreUVsZW1lbnQsXG4gICAgICAgICAgICBjdXJyZW50VG9wOiBudWxsLFxuICAgICAgICAgICAgc3RpY2t5V3JhcHBlcjogc3RpY2t5V3JhcHBlcixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogby5jbGFzc05hbWUsXG4gICAgICAgICAgICBnZXRXaWR0aEZyb206IG8uZ2V0V2lkdGhGcm9tLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZVdpZHRoOiBvLnJlc3BvbnNpdmVXaWR0aFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICB1cGRhdGU6IHNjcm9sbGVyLFxuICAgICAgdW5zdGljazogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciB1bnN0aWNreUVsZW1lbnQgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgdmFyIHJlbW92ZUlkeCA9IC0xO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RpY2tlZC5sZW5ndGg7IGkrKylcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZiAoc3RpY2tlZFtpXS5zdGlja3lFbGVtZW50LmdldCgwKSA9PSB1bnN0aWNreUVsZW1lbnQuZ2V0KDApKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJlbW92ZUlkeCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKHJlbW92ZUlkeCAhPSAtMSlcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdGlja2VkLnNwbGljZShyZW1vdmVJZHgsMSk7XG4gICAgICAgICAgICB1bnN0aWNreUVsZW1lbnQudW53cmFwKCk7XG4gICAgICAgICAgICB1bnN0aWNreUVsZW1lbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgLy8gc2hvdWxkIGJlIG1vcmUgZWZmaWNpZW50IHRoYW4gdXNpbmcgJHdpbmRvdy5zY3JvbGwoc2Nyb2xsZXIpIGFuZCAkd2luZG93LnJlc2l6ZShyZXNpemVyKTpcbiAgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHNjcm9sbGVyLCBmYWxzZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZXIsIGZhbHNlKTtcbiAgfSBlbHNlIGlmICh3aW5kb3cuYXR0YWNoRXZlbnQpIHtcbiAgICB3aW5kb3cuYXR0YWNoRXZlbnQoJ29uc2Nyb2xsJywgc2Nyb2xsZXIpO1xuICAgIHdpbmRvdy5hdHRhY2hFdmVudCgnb25yZXNpemUnLCByZXNpemVyKTtcbiAgfVxuXG4gICQuZm4uc3RpY2t5ID0gZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgaWYgKG1ldGhvZHNbbWV0aG9kXSkge1xuICAgICAgcmV0dXJuIG1ldGhvZHNbbWV0aG9kXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdvYmplY3QnIHx8ICFtZXRob2QgKSB7XG4gICAgICByZXR1cm4gbWV0aG9kcy5pbml0LmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJC5lcnJvcignTWV0aG9kICcgKyBtZXRob2QgKyAnIGRvZXMgbm90IGV4aXN0IG9uIGpRdWVyeS5zdGlja3knKTtcbiAgICB9XG4gIH07XG5cbiAgJC5mbi51bnN0aWNrID0gZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgaWYgKG1ldGhvZHNbbWV0aG9kXSkge1xuICAgICAgcmV0dXJuIG1ldGhvZHNbbWV0aG9kXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdvYmplY3QnIHx8ICFtZXRob2QgKSB7XG4gICAgICByZXR1cm4gbWV0aG9kcy51bnN0aWNrLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJC5lcnJvcignTWV0aG9kICcgKyBtZXRob2QgKyAnIGRvZXMgbm90IGV4aXN0IG9uIGpRdWVyeS5zdGlja3knKTtcbiAgICB9XG5cbiAgfTtcbiAgJChmdW5jdGlvbigpIHtcbiAgICBzZXRUaW1lb3V0KHNjcm9sbGVyLCAwKTtcbiAgfSk7XG59KShqUXVlcnkpO1xuXG47IGJyb3dzZXJpZnlfc2hpbV9fZGVmaW5lX19tb2R1bGVfX2V4cG9ydF9fKHR5cGVvZiBzdGlja3kgIT0gXCJ1bmRlZmluZWRcIiA/IHN0aWNreSA6IHdpbmRvdy5zdGlja3kpO1xuXG59KS5jYWxsKGdsb2JhbCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBmdW5jdGlvbiBkZWZpbmVFeHBvcnQoZXgpIHsgbW9kdWxlLmV4cG9ydHMgPSBleDsgfSk7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIiwidmFyIHN0aWNreSA9IHJlcXVpcmUoJy4vc3RpY2t5JyksXG4gICAgbWFwID0gcmVxdWlyZSgnLi9tYXAnKTtcblxuY29uc29sZS5sb2coJ0FwcCByZWFkeScpO1xuIiwiY29uc29sZS5sb2coJ21hcCByZWFkeSAyJyk7XG5cbnZhciBzdHlsZXMgPSBbe1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZS5uYXR1cmFsXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvblwifSx7XCJjb2xvclwiOlwiI2UwZWZlZlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJwb2lcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5maWxsXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9uXCJ9LHtcImh1ZVwiOlwiIzE5MDBmZlwifSx7XCJjb2xvclwiOlwiI2MwZThlOFwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJsYW5kc2NhcGUubWFuX21hZGVcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5maWxsXCJ9LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wibGlnaHRuZXNzXCI6MTAwfSx7XCJ2aXNpYmlsaXR5XCI6XCJzaW1wbGlmaWVkXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWRcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHNcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcIndhdGVyXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjN2RjZGNkXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInRyYW5zaXQubGluZVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9uXCJ9LHtcImxpZ2h0bmVzc1wiOjcwMH1dfV07XG5cbi8vIHZhciBvcHRpb25zID0ge1xuLy8gICB6b29tOiAxNSxcbi8vICAgY2VudGVyOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDUzLjM4NTg3MywgLTEuNDcxNDcxKSxcbi8vICAgbWFwVHlwZUlkOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUCxcbi8vICAgc3R5bGVzOiBzdHlsZXNcbi8vIH07XG5cbi8vIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwgb3B0aW9ucyk7XG4iLCJ2YXIgc3RpY2t5ID0gcmVxdWlyZSgnc3RpY2t5Jyk7XG5cbmNvbnNvbGUubG9nKCdTdGlja3kgcmVhZHkgNCcpO1xuXG52YXIgaGVhZGVyID0gJChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGVyJykpO1xudmFyIGJhbm5lciA9ICQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jhbm5lcicpKTtcblxuY29uc29sZS5sb2coJ1RvcCBiYW5uZXInLCBoZWFkZXIub3V0ZXJIZWlnaHQoKSk7XG5cbiQoXCIjaGVhZGVyXCIpLnN0aWNreSh7dG9wU3BhY2luZzowfSk7XG4kKFwiI2Jhbm5lclwiKS5zdGlja3koe3RvcFNwYWNpbmc6aGVhZGVyLm91dGVySGVpZ2h0KCl9KTtcbiJdfQ==
