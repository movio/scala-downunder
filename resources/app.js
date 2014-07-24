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
(function (global){
;__browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
/***************
    Details
***************/

/*!
* Velocity.js: Accelerated JavaScript animation.
* @version 0.9.0
* @docs http://velocityjs.org
* @license Copyright 2014 Julian Shapiro. MIT License: http://en.wikipedia.org/wiki/MIT_License
*/

/****************
     Summary
****************/

/*
Velocity's structure:
- CSS Stack: Works independently from the rest of Velocity.
- Velocity.animate(): Core method that iterates over the targeted elements and queues the incoming call onto each element individually. Consists of:
  - Pre-Queueing: Prepare the element for animation by instantiating its data cache and processing the call's options.
  - Queueing: The logic that runs once the call has reached its point of execution in the element's $.queue() stack.
              Most logic is placed here to avoid risking it becoming stale (if the element's properties have changed).
  - Pushing: Consolidation of the tween data followed by its push onto the global in-progress calls container.
- tick(): The single requestAnimationFrame loop responsible for tweening all in-progress calls.
- completeCall(): Handles the cleanup process for each Velocity call.
*/

/* NOTICE: Despite the ensuing code indicating that Velocity works *without* jQuery and *with* Zepto, this support has not yet landed. */

/******************
    Velocity.js
******************/

;(function (global, window, document, undefined) {

    /*****************
        Constants
    *****************/

    var NAME = "velocity",
        DEFAULT_DURATION = 400,
        DEFAULT_EASING = "swing";

    /*********************
       Helper Functions
    *********************/

    /* IE detection. Gist: https://gist.github.com/julianshapiro/9098609 */
    var IE = (function() {
        if (document.documentMode) {
            return document.documentMode;
        } else {
            for (var i = 7; i > 4; i--) {
                var div = document.createElement("div");

                div.innerHTML = "<!--[if IE " + i + "]><span></span><![endif]-->";

                if (div.getElementsByTagName("span").length) {
                    div = null;

                    return i;
                }
            }
        }

        return undefined;
    })();

    /* rAF polyfill. Gist: https://gist.github.com/julianshapiro/9497513 */
    var rAFPollyfill = (function() {
        var timeLast = 0;

        return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
            var timeCurrent = (new Date()).getTime(),
                timeDelta;

            /* Dynamically set delay on a per-tick basis to match 60fps. */
            /* Technique by Erik Moller. MIT license: https://gist.github.com/paulirish/1579671 */
            timeDelta = Math.max(0, 16 - (timeCurrent - timeLast));
            timeLast = timeCurrent + timeDelta;

            return setTimeout(function() { callback(timeCurrent + timeDelta); }, timeDelta);
        };
    })();

    var rAF = window.requestAnimationFrame || rAFPollyfill;

    /* Array compacting. Copyright Lo-Dash. MIT License: https://github.com/lodash/lodash/blob/master/LICENSE.txt */
    function compactSparseArray (array) {
        var index = -1,
            length = array ? array.length : 0,
            result = [];

        while (++index < length) {
            var value = array[index];

            if (value) {
                result.push(value);
            }
        }

        return result;
    }

    var Type = {
        isString: function (variable) {
            return (typeof variable === "string");
        },

        isArray: Array.isArray || function (variable) {
            return Object.prototype.toString.call(variable) === "[object Array]";
        },

        isFunction: function (variable) {
            return Object.prototype.toString.call(variable) === "[object Function]";
        },

        isNode: function (variable) {
            return variable && variable.nodeType;
        },

        /* Copyright Martin Bohm. MIT License: https://gist.github.com/Tomalak/818a78a226a0738eaade */
        isNodeList: function (variable) {
            return typeof variable === "object" &&
                /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(variable)) &&
                variable.length !== undefined &&
                (variable.length === 0 || (typeof variable[0] === "object" && variable[0].nodeType > 0));
        },

        /* Determine if variable is a wrapped jQuery or Zepto element. */
        isWrapped: function (variable) {
            return variable && (variable.jquery || (window.Zepto && window.Zepto.zepto.isZ(variable)));
        },

        isSVG: function (variable) {
            return window.SVGElement && (variable instanceof SVGElement);
        }
    };

    /*****************
       Dependencies
    *****************/

    /* Local to our Velocity scope, assign $ to our jQuery shim if jQuery itself isn't loaded.
       (The shim is a port of the jQuery utility functions that Velocity uses.) */
    /* Note: We can't default to Zepto since the shimless version of Velocity does not work with Zepto,
       which is missing several utility functions that Velocity requires. */
    var $ = window.jQuery || (global.Velocity && global.Velocity.Utilities);

    if (!$) {
        throw new Error("Velocity: Either jQuery or Velocity's jQuery shim must first be loaded.")
    /* We allow the global Velocity variable to pre-exist so long as we were responsible for its creation
      (via the jQuery shim, which uniquely assigns a Utilities property to the Velocity object). */
    } else if (global.Velocity !== undefined && !global.Velocity.Utilities) {
        throw new Error("Velocity: Namespace is occupied.");
    /* Nothing prevents Velocity from working on IE6+7, but it is not worth the time to test on them.
       Revert to jQuery's $.animate(), and lose Velocity's extra features. */
    } else if (IE <= 7) {
        if (!window.jQuery) {
            throw new Error("Velocity: For IE<=7, Velocity falls back to jQuery, which must first be loaded.");
        } else {
            window.jQuery.fn.velocity = window.jQuery.fn.animate;

            /* Now that $.fn.velocity is aliased, abort this Velocity declaration. */
            return;
        }
    /* IE8 doesn't work with the jQuery shim; it requires jQuery proper. */
    } else if (IE === 8 && !window.jQuery) {
        throw new Error("Velocity: For IE8, Velocity requires jQuery to be loaded. (Velocity's jQuery shim does not work with IE8.)");
    }

    /* Shorthand alias for jQuery's $.data() utility. */
    function Data (element) {
        /* Hardcode a reference to the plugin name. */
        var response = $.data(element, NAME);

        /* jQuery <=1.4.2 returns null instead of undefined when no match is found. We normalize this behavior. */
        return response === null ? undefined : response;
    };

    /*************
        State
    *************/

    /* Velocity registers itself onto a global container (window.jQuery || window.Zepto || window) so that that
       certain features are accessible beyond just a per-element scope. This master object contains an .animate() method,
       which is later assigned to $.fn (if jQuery or Zepto are present). Accordingly, Velocity can both act on wrapped
       DOM elements and stand alone for targeting raw DOM elements. */
    /* Note: The global object also doubles as a publicly-accessible data store for the purposes of unit testing. */
    /* Note: Alias the lowercase and uppercase variants of "velocity" to minimize user confusion due to the lowercase nature of the $.fn extension. */
    var Velocity = global.Velocity = global.velocity = {
        /* Container for page-wide Velocity state data. */
        State: {
            /* Detect mobile devices to determine if mobileHA should be turned on. */
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            /* The mobileHA option's behavior changes on older Android devices (Gingerbread, versions 2.3.3-2.3.7). */
            isAndroid: /Android/i.test(navigator.userAgent),
            isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
            isChrome: window.chrome,
            isFirefox: /Firefox/i.test(navigator.userAgent),
            /* Create a cached element for re-use when checking for CSS property prefixes. */
            prefixElement: document.createElement("div"),
            /* Cache every prefix match to avoid repeating lookups. */
            prefixMatches: {},
            /* Cache the anchor used for animating window scrolling. */
            scrollAnchor: null,
            /* Cache the property names associated with the scroll anchor. */
            scrollPropertyLeft: null,
            scrollPropertyTop: null,
            /* Keep track of whether our RAF tick is running. */
            isTicking: false,
            /* Container for every in-progress call to Velocity. */
            calls: []
        },
        /* Velocity's custom CSS stack. Made global for unit testing. */
        CSS: { /* Defined below. */ },
        /* Defined by Velocity's optional jQuery shim. */
        Utilities: window.jQuery,
        /* Container for the user's custom animation sequences that are referenced by name in place of a properties map object. */
        Sequences: {
            /* Manually registered by the user. Learn more: VelocityJS.org/#sequences */
        },
        Easings: {
            /* Defined below. */
        },
        /* Attempt to use ES6 Promises by default. Users can override this with a third-party promises library. */
        Promise: window.Promise,
        /* Page-wide option defaults, which can be overriden by the user. */
        defaults: {
            queue: "",
            duration: DEFAULT_DURATION,
            easing: DEFAULT_EASING,
            begin: null,
            complete: null,
            progress: null,
            display: null,
            loop: false,
            delay: false,
            mobileHA: true,
            /* Set to false to prevent property values from being cached between consecutive Velocity-initiated chain calls. */
            _cacheValues: true
        },
        /* Velocity's core animation method, subsequently aliased to $.fn. */
        animate: function () { /* Defined below. */ },
        /* Set to true to force a duration of 1ms for all animations so that UI testing can be performed without waiting on animations to complete. */
        mock: false,
        version: { major: 0, minor: 9, patch: 0 },
        /* Set to 1 or 2 (most verbose) to output debug info to console. */
        debug: false
    };

    /* Retrieve the appropriate scroll anchor and property name for the browser: https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY */
    if (window.pageYOffset !== undefined) {
        Velocity.State.scrollAnchor = window;
        Velocity.State.scrollPropertyLeft = "pageXOffset";
        Velocity.State.scrollPropertyTop = "pageYOffset";
    } else {
        Velocity.State.scrollAnchor = document.documentElement || document.body.parentNode || document.body;
        Velocity.State.scrollPropertyLeft = "scrollLeft";
        Velocity.State.scrollPropertyTop = "scrollTop";
    }

    /**************
        Timing
    **************/

    /* Inactive browser tabs pause rAF, which results in all active animations immediately sprinting to their completion states when the tab refocuses.
       To get around this, we dynamically switch rAF to setTimeout (which the browser *doesn't* pause) when the tab loses focus. We skip this for mobile
       devices to avoid wasting battery power on inactive tabs. */
    /* Note: Tab focus detection doesn't work on older versions of IE, but that's okay since they don't support rAF to begin with. */
    if (!Velocity.State.isMobile && document.hidden !== undefined) {
        document.addEventListener("visibilitychange", function() {
            /* Reassign the rAF function (which the global tick() function uses) based on the tab's focus state. */
            if (document.hidden) {
                rAF = function(callback) { 
                    /* The tick function needs a truthy first argument to pass its internal timestamp check. */
                    return setTimeout(function() { callback(true) }, 16);
                };

                /* The rAF loop has been paused by the browser, so we manually restart the tick. */
                tick();
            } else {
                rAF = window.requestAnimationFrame || rAFPollyfill;
            }
        });
    }

    /**************
        Easing
    **************/

    /* Step easing generator. */
    function generateStep (steps) {
        return function (p) {
            return Math.round(p * steps) * (1 / steps);
        };
    }

    /* Bezier curve function generator. Copyright Gaetan Renaudeau. MIT License: http://en.wikipedia.org/wiki/MIT_License */
    var generateBezier = (function () {
        function A (aA1, aA2) {
            return 1.0 - 3.0 * aA2 + 3.0 * aA1;
        }

        function B (aA1, aA2) {
            return 3.0 * aA2 - 6.0 * aA1;
        }
        function C (aA1) {
            return 3.0 * aA1;
        }

        function calcBezier (aT, aA1, aA2) {
            return ((A(aA1, aA2)*aT + B(aA1, aA2))*aT + C(aA1))*aT;
        }

        function getSlope (aT, aA1, aA2) {
            return 3.0 * A(aA1, aA2)*aT*aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
        }

        return function (mX1, mY1, mX2, mY2) {
            /* Must contain four arguments. */
            if (arguments.length !== 4) {
                return false;
            }

            /* Arguments must be numbers. */
            for (var i = 0; i < 4; ++i) {
                if (typeof arguments[i] !== "number" || isNaN(arguments[i]) || !isFinite(arguments[i])) {
                    return false;
                }
            }

            /* X values must be in the [0, 1] range. */
            mX1 = Math.min(mX1, 1);
            mX2 = Math.min(mX2, 1);
            mX1 = Math.max(mX1, 0);
            mX2 = Math.max(mX2, 0);

            function getTForX (aX) {
                var aGuessT = aX;

                for (var i = 0; i < 8; ++i) {
                    var currentSlope = getSlope(aGuessT, mX1, mX2);

                    if (currentSlope === 0.0) {
                        return aGuessT;
                    }

                    var currentX = calcBezier(aGuessT, mX1, mX2) - aX;

                    aGuessT -= currentX / currentSlope;
                }

                return aGuessT;
            }

            return function (aX) {
                if (mX1 === mY1 && mX2 === mY2) {
                    return aX;
                } else {
                    return calcBezier(getTForX(aX), mY1, mY2);
                }
            };
        };
    }());

    /* Runge-Kutta spring physics function generator. Adapted from Framer.js, copyright Koen Bok. MIT License: http://en.wikipedia.org/wiki/MIT_License */
    /* Given a tension, friction, and duration, a simulation at 60FPS will first run without a defined duration in order to calculate the full path. A second pass
       then adjusts the time dela -- using the relation between actual time and duration -- to calculate the path for the duration-constrained animation. */
    var generateSpringRK4 = (function () {

        function springAccelerationForState (state) {
            return (-state.tension * state.x) - (state.friction * state.v);
        }

        function springEvaluateStateWithDerivative (initialState, dt, derivative) {
            var state = {
                x: initialState.x + derivative.dx * dt,
                v: initialState.v + derivative.dv * dt,
                tension: initialState.tension,
                friction: initialState.friction
            };

            return { dx: state.v, dv: springAccelerationForState(state) };
        }

        function springIntegrateState (state, dt) {
            var a = {
                    dx: state.v,
                    dv: springAccelerationForState(state)
                },
                b = springEvaluateStateWithDerivative(state, dt * 0.5, a),
                c = springEvaluateStateWithDerivative(state, dt * 0.5, b),
                d = springEvaluateStateWithDerivative(state, dt, c),
                dxdt = 1.0 / 6.0 * (a.dx + 2.0 * (b.dx + c.dx) + d.dx),
                dvdt = 1.0 / 6.0 * (a.dv + 2.0 * (b.dv + c.dv) + d.dv);

            state.x = state.x + dxdt * dt;
            state.v = state.v + dvdt * dt;

            return state;
        }

        return function springRK4Factory (tension, friction, duration) {

            var initState = {
                    x: -1,
                    v: 0,
                    tension: null,
                    friction: null
                },
                path = [0],
                time_lapsed = 0,
                tolerance = 1 / 10000,
                DT = 16 / 1000,
                have_duration, dt, last_state;

            tension = parseFloat(tension) || 500;
            friction = parseFloat(friction) || 20;
            duration = duration || null;

            initState.tension = tension;
            initState.friction = friction;

            have_duration = duration !== null;

            /* Calculate the actual time it takes for this animation to complete with the provided conditions. */
            if (have_duration) {
                /* Run the simulation without a duration. */
                time_lapsed = springRK4Factory(tension, friction);
                /* Compute the adjusted time delta. */
                dt = time_lapsed / duration * DT;
            } else {
                dt = DT;
            }

            while (true) {
                /* Next/step function .*/
                last_state = springIntegrateState(last_state || initState, dt);
                /* Store the position. */
                path.push(1 + last_state.x);
                time_lapsed += 16;
                /* If the change threshold is reached, break. */
                if (!(Math.abs(last_state.x) > tolerance && Math.abs(last_state.v) > tolerance)) {
                    break;
                }
            }

            /* If duration is not defined, return the actual time required for completing this animation. Otherwise, return a closure that holds the
               computed path and returns a snapshot of the position according to a given percentComplete. */
            return !have_duration ? time_lapsed : function(percentComplete) { return path[ (percentComplete * (path.length - 1)) | 0 ]; };
        };
    }());

    /* Velocity embeds the named easings from jQuery, jQuery UI, and CSS3 in order to save users from having to include additional libraries on their page. */
    (function () {
        /* jQuery's default named easing types. */
        Velocity.Easings["linear"] = function(p) {
            return p;
        };

        Velocity.Easings["swing"] = function(p) {
            return 0.5 - Math.cos(p * Math.PI) / 2;
        };

        /* Bonus "spring" easing, which is a less exaggerated version of easeInOutElastic. */
        Velocity.Easings["spring"] = function(p) {
            return 1 - (Math.cos(p * 4.5 * Math.PI) * Math.exp(-p * 6));
        };

        /* CSS3's named easing types. */
        Velocity.Easings["ease"] = generateBezier(0.25, 0.1, 0.25, 1.0);
        Velocity.Easings["ease-in"] = generateBezier(0.42, 0.0, 1.00, 1.0);
        Velocity.Easings["ease-out"] = generateBezier(0.00, 0.0, 0.58, 1.0);
        Velocity.Easings["ease-in-out"] = generateBezier(0.42, 0.0, 0.58, 1.0);

        /* jQuery UI's Robert Penner easing equations. Copyright The jQuery Foundation. MIT License: https://jquery.org/license */
        var baseEasings = {};

        $.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(i, name) {
            baseEasings[name] = function(p) {
                return Math.pow(p, i + 2);
            };
        });

        $.extend(baseEasings, {
            Sine: function (p) {
                return 1 - Math.cos(p * Math.PI / 2);
            },

            Circ: function (p) {
                return 1 - Math.sqrt(1 - p * p);
            },

            Elastic: function(p) {
                return p === 0 || p === 1 ? p :
                    -Math.pow(2, 8 * (p - 1)) * Math.sin(((p - 1) * 80 - 7.5) * Math.PI / 15);
            },

            Back: function(p) {
                return p * p * (3 * p - 2);
            },

            Bounce: function (p) {
                var pow2,
                    bounce = 4;

                while (p < ((pow2 = Math.pow(2, --bounce)) - 1) / 11) {}
                return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - p, 2);
            }
        });

        /* jQuery's easing generator for the object above. */
        $.each(baseEasings, function(name, easeIn) {
            Velocity.Easings["easeIn" + name] = easeIn;
            Velocity.Easings["easeOut" + name] = function(p) {
                return 1 - easeIn(1 - p);
            };
            Velocity.Easings["easeInOut" + name] = function(p) {
                return p < 0.5 ?
                    easeIn(p * 2) / 2 :
                    1 - easeIn(p * -2 + 2) / 2;
            };
        });
    })();

    /* Determine the appropriate easing type given an easing input. */
    function getEasing(value, duration) {
        var easing = value;

        /* The easing option can either be a string that references a pre-registered easing,
           or it can be a two-/four-item array of integers to be converted into a bezier/spring function. */
        if (Type.isString(value)) {
            /* Ensure that the easing has been assigned to jQuery's Velocity.Easings object. */
            if (!Velocity.Easings[value]) {
                easing = false;
            }
        } else if (Type.isArray(value) && value.length === 1) {
            easing = generateStep.apply(null, value);
        } else if (Type.isArray(value) && value.length === 2) {
            /* springRK4 must be passed the animation's duration. */
            /* Note: If the springRK4 array contains non-numbers, generateSpringRK4() returns an easing
               function generated with default tension and friction values. */
            easing = generateSpringRK4.apply(null, value.concat([ duration ]));
        } else if (Type.isArray(value) && value.length === 4) {
            /* Note: If the bezier array contains non-numbers, generateBezier() returns false. */
            easing = generateBezier.apply(null, value);
        } else {
            easing = false;
        }

        /* Revert to the Velocity-wide default easing type, or fall back to "swing" (which is also jQuery's default)
           if the Velocity-wide default has been incorrectly modified. */
        if (easing === false) {
            if (Velocity.Easings[Velocity.defaults.easing]) {
                easing = Velocity.defaults.easing;
            } else {
                easing = DEFAULT_EASING;
            }
        }

        return easing;
    }

    /*****************
        CSS Stack
    *****************/

    /* The CSS object is a highly condensed and performant CSS stack that fully replaces jQuery's.
       It handles the validation, getting, and setting of both standard CSS properties and CSS property hooks. */
    /* Note: A "CSS" shorthand is aliased so that our code is easier to read. */
    var CSS = Velocity.CSS = {

        /*************
            RegEx
        *************/

        RegEx: {
            /* Unwrap a property value's surrounding text, e.g. "rgba(4, 3, 2, 1)" ==> "4, 3, 2, 1" and "rect(4px 3px 2px 1px)" ==> "4px 3px 2px 1px". */
            isHex: /^#([A-f\d]{3}){1,2}$/i,
            valueUnwrap: /^[A-z]+\((.*)\)$/i,
            wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
            /* Split a multi-value property into an array of subvalues, e.g. "rgba(4, 3, 2, 1) 4px 3px 2px 1px" ==> [ "rgba(4, 3, 2, 1)", "4px", "3px", "2px", "1px" ]. */
            valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/ig
        },

        /************
            Lists
        ************/

        Lists: {
            colors: [ "fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor" ],
            transformsBase: [ "translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ" ],
            transforms3D: [ "transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY" ]
        },

        /************
            Hooks
        ************/

        /* Hooks allow a subproperty (e.g. "boxShadowBlur") of a compound-value CSS property
           (e.g. "boxShadow: X Y Blur Spread Color") to be animated as if it were a discrete property. */
        /* Note: Beyond enabling fine-grained property animation, hooking is necessary since Velocity only
           tweens properties with single numeric values; unlike CSS transitions, Velocity does not interpolate compound-values. */
        Hooks: {
            /********************
                Registration
            ********************/

            /* Templates are a concise way of indicating which subproperties must be individually registered for each compound-value CSS property. */
            /* Each template consists of the compound-value's base name, its constituent subproperty names, and those subproperties' default values. */
            templates: {
                "textShadow": [ "Color X Y Blur", "black 0px 0px 0px" ],
                /* Todo: Add support for inset boxShadows. (webkit places it last whereas IE places it first.) */
                "boxShadow": [ "Color X Y Blur Spread", "black 0px 0px 0px 0px" ],
                "clip": [ "Top Right Bottom Left", "0px 0px 0px 0px" ],
                "backgroundPosition": [ "X Y", "0% 0%" ],
                "transformOrigin": [ "X Y Z", "50% 50% 0px" ],
                "perspectiveOrigin": [ "X Y", "50% 50%" ]
            },

            /* A "registered" hook is one that has been converted from its template form into a live,
               tweenable property. It contains data to associate it with its root property. */
            registered: {
                /* Note: A registered hook looks like this ==> textShadowBlur: [ "textShadow", 3 ],
                   which consists of the subproperty's name, the associated root property's name,
                   and the subproperty's position in the root's value. */
            },
            /* Convert the templates into individual hooks then append them to the registered object above. */
            register: function () {
                /* Color hooks registration. */
                /* Note: Colors are defaulted to white -- as opposed to black -- since colors that are
                   currently set to "transparent" default to their respective template below when color-animated,
                   and white is typically a closer match to transparent than black is. */
                for (var i = 0; i < CSS.Lists.colors.length; i++) {
                    CSS.Hooks.templates[CSS.Lists.colors[i]] = [ "Red Green Blue Alpha", "255 255 255 1" ];
                }

                var rootProperty,
                    hookTemplate,
                    hookNames;

                /* In IE, color values inside compound-value properties are positioned at the end the value instead of at the beginning.
                   Thus, we re-arrange the templates accordingly. */
                if (IE) {
                    for (rootProperty in CSS.Hooks.templates) {
                        hookTemplate = CSS.Hooks.templates[rootProperty];
                        hookNames = hookTemplate[0].split(" ");

                        var defaultValues = hookTemplate[1].match(CSS.RegEx.valueSplit);

                        if (hookNames[0] === "Color") {
                            /* Reposition both the hook's name and its default value to the end of their respective strings. */
                            hookNames.push(hookNames.shift());
                            defaultValues.push(defaultValues.shift());

                            /* Replace the existing template for the hook's root property. */
                            CSS.Hooks.templates[rootProperty] = [ hookNames.join(" "), defaultValues.join(" ") ];
                        }
                    }
                }

                /* Hook registration. */
                for (rootProperty in CSS.Hooks.templates) {
                    hookTemplate = CSS.Hooks.templates[rootProperty];
                    hookNames = hookTemplate[0].split(" ");

                    for (var i in hookNames) {
                        var fullHookName = rootProperty + hookNames[i],
                            hookPosition = i;

                        /* For each hook, register its full name (e.g. textShadowBlur) with its root property (e.g. textShadow)
                           and the hook's position in its template's default value string. */
                        CSS.Hooks.registered[fullHookName] = [ rootProperty, hookPosition ];
                    }
                }
            },

            /*****************************
               Injection and Extraction
            *****************************/

            /* Look up the root property associated with the hook (e.g. return "textShadow" for "textShadowBlur"). */
            /* Since a hook cannot be set directly (the browser won't recognize it), style updating for hooks is routed through the hook's root property. */
            getRoot: function (property) {
                var hookData = CSS.Hooks.registered[property];

                if (hookData) {
                    return hookData[0];
                } else {
                    /* If there was no hook match, return the property name untouched. */
                    return property;
                }
            },
            /* Convert any rootPropertyValue, null or otherwise, into a space-delimited list of hook values so that
               the targeted hook can be injected or extracted at its standard position. */
            cleanRootPropertyValue: function(rootProperty, rootPropertyValue) {
                /* If the rootPropertyValue is wrapped with "rgb()", "clip()", etc., remove the wrapping to normalize the value before manipulation. */
                if (CSS.RegEx.valueUnwrap.test(rootPropertyValue)) {
                    rootPropertyValue = rootPropertyValue.match(CSS.Hooks.RegEx.valueUnwrap)[1];
                }

                /* If rootPropertyValue is a CSS null-value (from which there's inherently no hook value to extract),
                   default to the root's default value as defined in CSS.Hooks.templates. */
                /* Note: CSS null-values include "none", "auto", and "transparent". They must be converted into their
                   zero-values (e.g. textShadow: "none" ==> textShadow: "0px 0px 0px black") for hook manipulation to proceed. */
                if (CSS.Values.isCSSNullValue(rootPropertyValue)) {
                    rootPropertyValue = CSS.Hooks.templates[rootProperty][1];
                }

                return rootPropertyValue;
            },
            /* Extracted the hook's value from its root property's value. This is used to get the starting value of an animating hook. */
            extractValue: function (fullHookName, rootPropertyValue) {
                var hookData = CSS.Hooks.registered[fullHookName];

                if (hookData) {
                    var hookRoot = hookData[0],
                        hookPosition = hookData[1];

                    rootPropertyValue = CSS.Hooks.cleanRootPropertyValue(hookRoot, rootPropertyValue);

                    /* Split rootPropertyValue into its constituent hook values then grab the desired hook at its standard position. */
                    return rootPropertyValue.toString().match(CSS.RegEx.valueSplit)[hookPosition];
                } else {
                    /* If the provided fullHookName isn't a registered hook, return the rootPropertyValue that was passed in. */
                    return rootPropertyValue;
                }
            },
            /* Inject the hook's value into its root property's value. This is used to piece back together the root property
               once Velocity has updated one of its individually hooked values through tweening. */
            injectValue: function (fullHookName, hookValue, rootPropertyValue) {
                var hookData = CSS.Hooks.registered[fullHookName];

                if (hookData) {
                    var hookRoot = hookData[0],
                        hookPosition = hookData[1],
                        rootPropertyValueParts,
                        rootPropertyValueUpdated;

                    rootPropertyValue = CSS.Hooks.cleanRootPropertyValue(hookRoot, rootPropertyValue);

                    /* Split rootPropertyValue into its individual hook values, replace the targeted value with hookValue,
                       then reconstruct the rootPropertyValue string. */
                    rootPropertyValueParts = rootPropertyValue.toString().match(CSS.RegEx.valueSplit);
                    rootPropertyValueParts[hookPosition] = hookValue;
                    rootPropertyValueUpdated = rootPropertyValueParts.join(" ");

                    return rootPropertyValueUpdated;
                } else {
                    /* If the provided fullHookName isn't a registered hook, return the rootPropertyValue that was passed in. */
                    return rootPropertyValue;
                }
            }
        },

        /*******************
           Normalizations
        *******************/

        /* Normalizations standardize CSS property manipulation by pollyfilling browser-specific implementations (e.g. opacity)
           and reformatting special properties (e.g. clip, rgba) to look like standard ones. */
        Normalizations: {
            /* Normalizations are passed a normalization target (either the property's name, its extracted value, or its injected value),
               the targeted element (which may need to be queried), and the targeted property value. */
            registered: {
                clip: function(type, element, propertyValue) {
                    switch (type) {
                        case "name":
                            return "clip";
                        /* Clip needs to be unwrapped and stripped of its commas during extraction. */
                        case "extract":
                            var extracted;

                            /* If Velocity also extracted this value, skip extraction. */
                            if (CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)) {
                                extracted = propertyValue;
                            } else {
                                /* Remove the "rect()" wrapper. */
                                extracted = propertyValue.toString().match(CSS.RegEx.valueUnwrap);

                                /* Strip off commas. */
                                extracted = extracted ? extracted[1].replace(/,(\s+)?/g, " ") : propertyValue;
                            }

                            return extracted;
                        /* Clip needs to be re-wrapped during injection. */
                        case "inject":
                            return "rect(" + propertyValue + ")";
                    }
                },

                /* <=IE8 do not support the standard opacity property. They use filter:alpha(opacity=INT) instead. */
                opacity: function (type, element, propertyValue) {
                    if (IE <= 8) {
                        switch (type) {
                            case "name":
                                return "filter";
                            case "extract":
                                /* <=IE8 return a "filter" value of "alpha(opacity=\d{1,3})".
                                   Extract the value and convert it to a decimal value to match the standard CSS opacity property's formatting. */
                                var extracted = propertyValue.toString().match(/alpha\(opacity=(.*)\)/i);

                                if (extracted) {
                                    /* Convert to decimal value. */
                                    propertyValue = extracted[1] / 100;
                                } else {
                                    /* When extracting opacity, default to 1 since a null value means opacity hasn't been set. */
                                    propertyValue = 1;
                                }

                                return propertyValue;
                            case "inject":
                                /* Opacified elements are required to have their zoom property set to a non-zero value. */
                                element.style.zoom = 1;

                                /* Setting the filter property on elements with certain font property combinations can result in a
                                   highly unappealing ultra-bolding effect. There's no way to remedy this throughout a tween, but dropping the
                                   value altogether (when opacity hits 1) at leasts ensures that the glitch is gone post-tweening. */
                                if (parseFloat(propertyValue) >= 1) {
                                    return "";
                                } else {
                                  /* As per the filter property's spec, convert the decimal value to a whole number and wrap the value. */
                                  return "alpha(opacity=" + parseInt(parseFloat(propertyValue) * 100, 10) + ")";
                                }
                        }
                    /* With all other browsers, normalization is not required; return the same values that were passed in. */
                    } else {
                        switch (type) {
                            case "name":
                                return "opacity";
                            case "extract":
                                return propertyValue;
                            case "inject":
                                return propertyValue;
                        }
                    }
                }
            },

            /*****************************
                Batched Registrations
            *****************************/

            /* Note: Batched normalizations extend the CSS.Normalizations.registered object. */
            register: function () {

                /*****************
                    Transforms
                *****************/

                /* Transforms are the subproperties contained by the CSS "transform" property. Transforms must undergo normalization
                   so that they can be referenced in a properties map by their individual names. */
                /* Note: When transforms are "set", they are actually assigned to a per-element transformCache. When all transform
                   setting is complete complete, CSS.flushTransformCache() must be manually called to flush the values to the DOM.
                   Transform setting is batched in this way to improve performance: the transform style only needs to be updated
                   once when multiple transform subproperties are being animated simultaneously. */
                /* Note: IE9 and Android Gingerbread have support for 2D -- but not 3D -- transforms. Since animating unsupported
                   transform properties results in the browser ignoring the *entire* transform string, we prevent these 3D values
                   from being normalized for these browsers so that tweening skips these properties altogether
                   (since it will ignore them as being unsupported by the browser.) */
                if (!(IE <= 9) && !Velocity.State.isGingerbread) {
                    /* Note: Since the standalone CSS "perspective" property and the CSS transform "perspective" subproperty
                    share the same name, the latter is given a unique token within Velocity: "transformPerspective". */
                    CSS.Lists.transformsBase = CSS.Lists.transformsBase.concat(CSS.Lists.transforms3D);
                }

                for (var i = 0; i < CSS.Lists.transformsBase.length; i++) {
                    /* Wrap the dynamically generated normalization function in a new scope so that transformName's value is
                    paired with its respective function. (Otherwise, all functions would take the final for loop's transformName.) */
                    (function() {
                        var transformName = CSS.Lists.transformsBase[i];

                        CSS.Normalizations.registered[transformName] = function (type, element, propertyValue) {
                            switch (type) {
                                /* The normalized property name is the parent "transform" property -- the property that is actually set in CSS. */
                                case "name":
                                    return "transform";
                                /* Transform values are cached onto a per-element transformCache object. */
                                case "extract":
                                    /* If this transform has yet to be assigned a value, return its null value. */
                                    if (Data(element).transformCache[transformName] === undefined) {
                                        /* Scale CSS.Lists.transformsBase default to 1 whereas all other transform properties default to 0. */
                                        return /^scale/i.test(transformName) ? 1 : 0;
                                    /* When transform values are set, they are wrapped in parentheses as per the CSS spec.
                                       Thus, when extracting their values (for tween calculations), we strip off the parentheses. */
                                    } else {
                                        return Data(element).transformCache[transformName].replace(/[()]/g, "");
                                    }
                                case "inject":
                                    var invalid = false;

                                    /* If an individual transform property contains an unsupported unit type, the browser ignores the *entire* transform property.
                                       Thus, protect users from themselves by skipping setting for transform values supplied with invalid unit types. */
                                    /* Switch on the base transform type; ignore the axis by removing the last letter from the transform's name. */
                                    switch (transformName.substr(0, transformName.length - 1)) {
                                        /* Whitelist unit types for each transform. */
                                        case "translate":
                                            invalid = !/(%|px|em|rem|vw|vh|\d)$/i.test(propertyValue);
                                            break;
                                        /* Since an axis-free "scale" property is supported as well, a little hack is used here to detect it by chopping off its last letter. */
                                        case "scal":
                                        case "scale":
                                            /* Chrome on Android has a bug in which scaled elements blur if their initial scale
                                               value is below 1 (which can happen with forcefeeding). Thus, we detect a yet-unset scale property
                                               and ensure that its first value is always 1. More info: http://stackoverflow.com/questions/10417890/css3-animations-with-transform-causes-blurred-elements-on-webkit/10417962#10417962 */
                                            if (Velocity.State.isAndroid && Data(element).transformCache[transformName] === undefined && propertyValue < 1) {
                                                propertyValue = 1;
                                            }

                                            invalid = !/(\d)$/i.test(propertyValue);
                                            break;
                                        case "skew":
                                            invalid = !/(deg|\d)$/i.test(propertyValue);
                                            break;
                                        case "rotate":
                                            invalid = !/(deg|\d)$/i.test(propertyValue);
                                            break;
                                    }

                                    if (!invalid) {
                                        /* As per the CSS spec, wrap the value in parentheses. */
                                        Data(element).transformCache[transformName] = "(" + propertyValue + ")";
                                    }

                                    /* Although the value is set on the transformCache object, return the newly-updated value for the calling code to process as normal. */
                                    return Data(element).transformCache[transformName];
                            }
                        };
                    })();
                }

                /*************
                    Colors
                *************/

                /* Since Velocity only animates a single numeric value per property, color animation is achieved by hooking the individual RGBA components of CSS color properties.
                   Accordingly, color values must be normalized (e.g. "#ff0000", "red", and "rgb(255, 0, 0)" ==> "255 0 0 1") so that their components can be injected/extracted by CSS.Hooks logic. */
                for (var i = 0; i < CSS.Lists.colors.length; i++) {
                    /* Wrap the dynamically generated normalization function in a new scope so that colorName's value is paired with its respective function.
                       (Otherwise, all functions would take the final for loop's colorName.) */
                    (function () {
                        var colorName = CSS.Lists.colors[i];

                        /* Note: In IE<=8, which support rgb but not rgba, color properties are reverted to rgb by stripping off the alpha component. */
                        CSS.Normalizations.registered[colorName] = function(type, element, propertyValue) {
                            switch (type) {
                                case "name":
                                    return colorName;
                                /* Convert all color values into the rgb format. (Old IE can return hex values and color names instead of rgb/rgba.) */
                                case "extract":
                                    var extracted;

                                    /* If the color is already in its hookable form (e.g. "255 255 255 1") due to having been previously extracted, skip extraction. */
                                    if (CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)) {
                                        extracted = propertyValue;
                                    } else {
                                        var converted,
                                            colorNames = {
                                                black: "rgb(0, 0, 0)",
                                                blue: "rgb(0, 0, 255)",
                                                gray: "rgb(128, 128, 128)",
                                                green: "rgb(0, 128, 0)",
                                                red: "rgb(255, 0, 0)",
                                                white: "rgb(255, 255, 255)"
                                            };

                                        /* Convert color names to rgb. */
                                        if (/^[A-z]+$/i.test(propertyValue)) {
                                            if (colorNames[propertyValue] !== undefined) {
                                                converted = colorNames[propertyValue]
                                            } else {
                                                /* If an unmatched color name is provided, default to black. */
                                                converted = colorNames.black;
                                            }
                                        /* Convert hex values to rgb. */
                                        } else if (CSS.RegEx.isHex.test(propertyValue)) {
                                            converted = "rgb(" + CSS.Values.hexToRgb(propertyValue).join(" ") + ")";
                                        /* If the provided color doesn't match any of the accepted color formats, default to black. */
                                        } else if (!(/^rgba?\(/i.test(propertyValue))) {
                                            converted = colorNames.black;
                                        }

                                        /* Remove the surrounding "rgb/rgba()" string then replace commas with spaces and strip
                                           repeated spaces (in case the value included spaces to begin with). */
                                        extracted = (converted || propertyValue).toString().match(CSS.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ");
                                    }

                                    /* So long as this isn't <=IE8, add a fourth (alpha) component if it's missing and default it to 1 (visible). */
                                    if (!(IE <= 8) && extracted.split(" ").length === 3) {
                                        extracted += " 1";
                                    }

                                    return extracted;
                                case "inject":
                                    /* If this is IE<=8 and an alpha component exists, strip it off. */
                                    if (IE <= 8) {
                                        if (propertyValue.split(" ").length === 4) {
                                            propertyValue = propertyValue.split(/\s+/).slice(0, 3).join(" ");
                                        }
                                    /* Otherwise, add a fourth (alpha) component if it's missing and default it to 1 (visible). */
                                    } else if (propertyValue.split(" ").length === 3) {
                                        propertyValue += " 1";
                                    }

                                    /* Re-insert the browser-appropriate wrapper("rgb/rgba()"), insert commas, and strip off decimal units
                                       on all values but the fourth (R, G, and B only accept whole numbers). */
                                    return (IE <= 8 ? "rgb" : "rgba") + "(" + propertyValue.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")";
                            }
                        };
                    })();
                }
            }
        },

        /************************
           CSS Property Names
        ************************/

        Names: {
            /* Camelcase a property name into its JavaScript notation (e.g. "background-color" ==> "backgroundColor").
               Camelcasing is used to normalize property names between and across calls. */
            camelCase: function (property) {
                return property.replace(/-(\w)/g, function (match, subMatch) {
                    return subMatch.toUpperCase();
                });
            },

            /* For SVG elements, some properties (namely, dimensional ones) are GET/SET via the element's HTML attributes (instead of via CSS styles). */
            SVGAttribute: function (property) {
                var SVGAttributes = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";

                /* Certain browsers require an SVG transform to be applied as an attribute. (Otherwise, application via CSS is preferable due to 3D support.) */
                if (IE || (Velocity.State.isAndroid && !Velocity.State.isChrome)) {
                    SVGAttributes += "|transform";
                }

                return new RegExp("^(" + SVGAttributes + ")$", "i").test(property);
            },

            /* Determine whether a property should be set with a vendor prefix. */
            /* If a prefixed version of the property exists, return it. Otherwise, return the original property name.
               If the property is not at all supported by the browser, return a false flag. */
            prefixCheck: function (property) {
                /* If this property has already been checked, return the cached value. */
                if (Velocity.State.prefixMatches[property]) {
                    return [ Velocity.State.prefixMatches[property], true ];
                } else {
                    var vendors = [ "", "Webkit", "Moz", "ms", "O" ];

                    for (var i = 0, vendorsLength = vendors.length; i < vendorsLength; i++) {
                        var propertyPrefixed;

                        if (i === 0) {
                            propertyPrefixed = property;
                        } else {
                            /* Capitalize the first letter of the property to conform to JavaScript vendor prefix notation (e.g. webkitFilter). */
                            propertyPrefixed = vendors[i] + property.replace(/^\w/, function(match) { return match.toUpperCase(); });
                        }

                        /* Check if the browser supports this property as prefixed. */
                        if (Type.isString(Velocity.State.prefixElement.style[propertyPrefixed])) {
                            /* Cache the match. */
                            Velocity.State.prefixMatches[property] = propertyPrefixed;

                            return [ propertyPrefixed, true ];
                        }
                    }

                    /* If the browser doesn't support this property in any form, include a false flag so that the caller can decide how to proceed. */
                    return [ property, false ];
                }
            }
        },

        /************************
           CSS Property Values
        ************************/

        Values: {
            /* Hex to RGB conversion. Copyright Tim Down: http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb */
            hexToRgb: function (hex) {
                var shortformRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                    longformRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
                    rgbParts;

                hex = hex.replace(shortformRegex, function (m, r, g, b) {
                    return r + r + g + g + b + b;
                });

                rgbParts = longformRegex.exec(hex);

                return rgbParts ? [ parseInt(rgbParts[1], 16), parseInt(rgbParts[2], 16), parseInt(rgbParts[3], 16) ] : [ 0, 0, 0 ];
            },
            isCSSNullValue: function (value) {
                /* The browser defaults CSS values that have not been set to either 0 or one of several possible null-value strings.
                   Thus, we check for both falsiness and these special strings. */
                /* Null-value checking is performed to default the special strings to 0 (for the sake of tweening) or their hook
                   templates as defined as CSS.Hooks (for the sake of hook injection/extraction). */
                /* Note: Chrome returns "rgba(0, 0, 0, 0)" for an undefined color whereas IE returns "transparent". */
                return (value == 0 || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(value));
            },
            /* Retrieve a property's default unit type. Used for assigning a unit type when one is not supplied by the user. */
            getUnitType: function (property) {
                if (/^(rotate|skew)/i.test(property)) {
                    return "deg";
                } else if (/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(property)) {
                    /* The above properties are unitless. */
                    return "";
                } else {
                    /* Default to px for all other properties. */
                    return "px";
                }
            },
            /* HTML elements default to an associated display type when they're not set to display:none. */
            /* Note: This function is used for correctly setting the non-"none" display value in certain Velocity sequences, such as fadeIn/Out. */
            getDisplayType: function (element) {
                var tagName = element.tagName.toString().toLowerCase();

                if (/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(tagName)) {
                    return "inline";
                } else if (/^(li)$/i.test(tagName)) {
                    return "list-item";
                } else if (/^(tr)$/i.test(tagName)) {
                    return "table-row";
                /* Default to "block" when no match is found. */
                } else {
                    return "block";
                }
            },
            /* The class add/remove functions are used to temporarily apply a "velocity-animating" class to elements while they're animating. */
            addClass: function (element, className) {
                if (element.classList) {
                    element.classList.add(className);
                } else {
                    element.className += (element.className.length ? " " : "") + className;
                }
            },
            removeClass: function (element, className) {
                if (element.classList) {
                    element.classList.remove(className);
                } else {
                    element.className = element.className.toString().replace(new RegExp("(^|\\s)" + className.split(" ").join("|") + "(\\s|$)", "gi"), " ");
                }
            }
        },

        /****************************
           Style Getting & Setting
        ****************************/

        /* The singular getPropertyValue, which routes the logic for all normalizations, hooks, and standard CSS properties. */
        getPropertyValue: function (element, property, rootPropertyValue, forceStyleLookup) {
            /* Get an element's computed property value. */
            /* Note: Retrieving the value of a CSS property cannot simply be performed by checking an element's
               style attribute (which only reflects user-defined values). Instead, the browser must be queried for a property's
               *computed* value. You can read more about getComputedStyle here: https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle */
            function computePropertyValue (element, property) {
                /* When box-sizing isn't set to border-box, height and width style values are incorrectly computed when an
                   element's scrollbars are visible (which expands the element's dimensions). Thus, we defer to the more accurate
                   offsetHeight/Width property, which includes the total dimensions for interior, border, padding, and scrollbar.
                   We subtract border and padding to get the sum of interior + scrollbar. */

                var computedValue = 0;

                /* IE<=8 doesn't support window.getComputedStyle, thus we defer to jQuery, which has an extensive array
                   of hacks to accurately retrieve IE8 property values. Re-implementing that logic here is not worth bloating the
                   codebase for a dying browser. The performance repercussions of using jQuery here are minimal since
                   Velocity is optimized to rarely (and sometimes never) query the DOM. Further, the $.css() codepath isn't that slow. */
                if (IE <= 8) {
                    computedValue = $.css(element, property); /* GET */
                /* All other browsers support getComputedStyle. The returned live object reference is cached onto its
                   associated element so that it does not need to be refetched upon every GET. */
                } else {
                    /* Browsers do not return height and width values for elements that are set to display:"none". Thus, we temporarily
                       toggle display to the element type's default value. */
                    var toggleDisplay = false;

                    if (/^(width|height)$/.test(property) && CSS.getPropertyValue(element, "display") === 0) {
                        toggleDisplay = true;
                        CSS.setPropertyValue(element, "display", CSS.Values.getDisplayType(element));
                    }

                    function revertDisplay () {
                        if (toggleDisplay) {
                            CSS.setPropertyValue(element, "display", "none");
                        }
                    }

                    if (!forceStyleLookup) {
                        if (property === "height" && CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() !== "border-box") {
                            var contentBoxHeight = element.offsetHeight - (parseFloat(CSS.getPropertyValue(element, "borderTopWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "borderBottomWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingTop")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingBottom")) || 0);
                            revertDisplay();

                            return contentBoxHeight;
                        } else if (property === "width" && CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() !== "border-box") {
                            var contentBoxWidth = element.offsetWidth - (parseFloat(CSS.getPropertyValue(element, "borderLeftWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "borderRightWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingLeft")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingRight")) || 0);
                            revertDisplay();

                            return contentBoxWidth;
                        }
                    }

                    var computedStyle;

                    /* For elements that Velocity hasn't been called on directly (e.g. when Velocity queries the DOM on behalf
                       of a parent of an element its animating), perform a direct getComputedStyle lookup since the object isn't cached. */
                    if (Data(element) === undefined) {
                        computedStyle = window.getComputedStyle(element, null); /* GET */
                    /* If the computedStyle object has yet to be cached, do so now. */
                    } else if (!Data(element).computedStyle) {
                        computedStyle = Data(element).computedStyle = window.getComputedStyle(element, null); /* GET */
                    /* If computedStyle is cached, use it. */
                    } else {
                        computedStyle = Data(element).computedStyle;
                    }

                    /* IE and Firefox do not return a value for the generic borderColor -- they only return individual values for each border side's color.
                       As a polyfill for querying individual border side colors, just return the top border's color. */
                    if ((IE || Velocity.State.isFirefox) && property === "borderColor") {
                        property = "borderTopColor";
                    }

                    /* IE9 has a bug in which the "filter" property must be accessed from computedStyle using the getPropertyValue method
                       instead of a direct property lookup. The getPropertyValue method is slower than a direct lookup, which is why we avoid it by default. */
                    if (IE === 9 && property === "filter") {
                        computedValue = computedStyle.getPropertyValue(property); /* GET */
                    } else {
                        computedValue = computedStyle[property];
                    }

                    /* Fall back to the property's style value (if defined) when computedValue returns nothing,
                       which can happen when the element hasn't been painted. */
                    if (computedValue === "" || computedValue === null) {
                        computedValue = element.style[property];
                    }

                    revertDisplay();
                }

                /* For top, right, bottom, and left (TRBL) values that are set to "auto" on elements of "fixed" or "absolute" position,
                   defer to jQuery for converting "auto" to a numeric value. (For elements with a "static" or "relative" position, "auto" has the same
                   effect as being set to 0, so no conversion is necessary.) */
                /* An example of why numeric conversion is necessary: When an element with "position:absolute" has an untouched "left"
                   property, which reverts to "auto", left's value is 0 relative to its parent element, but is often non-zero relative
                   to its *containing* (not parent) element, which is the nearest "position:relative" ancestor or the viewport (and always the viewport in the case of "position:fixed"). */
                if (computedValue === "auto" && /^(top|right|bottom|left)$/i.test(property)) {
                    var position = computePropertyValue(element, "position"); /* GET */

                    /* For absolute positioning, jQuery's $.position() only returns values for top and left;
                       right and bottom will have their "auto" value reverted to 0. */
                    /* Note: A jQuery object must be created here since jQuery doesn't have a low-level alias for $.position().
                       Not a big deal since we're currently in a GET batch anyway. */
                    if (position === "fixed" || (position === "absolute" && /top|left/i.test(property))) {
                        /* Note: jQuery strips the pixel unit from its returned values; we re-add it here to conform with computePropertyValue's behavior. */
                        computedValue = $(element).position()[property] + "px"; /* GET */
                    }
                }

                return computedValue;
            }

            var propertyValue;

            /* If this is a hooked property (e.g. "clipLeft" instead of the root property of "clip"),
               extract the hook's value from a normalized rootPropertyValue using CSS.Hooks.extractValue(). */
            if (CSS.Hooks.registered[property]) {
                var hook = property,
                    hookRoot = CSS.Hooks.getRoot(hook);

                /* If a cached rootPropertyValue wasn't passed in (which Velocity always attempts to do in order to avoid requerying the DOM),
                   query the DOM for the root property's value. */
                if (rootPropertyValue === undefined) {
                    /* Since the browser is now being directly queried, use the official post-prefixing property name for this lookup. */
                    rootPropertyValue = CSS.getPropertyValue(element, CSS.Names.prefixCheck(hookRoot)[0]); /* GET */
                }

                /* If this root has a normalization registered, peform the associated normalization extraction. */
                if (CSS.Normalizations.registered[hookRoot]) {
                    rootPropertyValue = CSS.Normalizations.registered[hookRoot]("extract", element, rootPropertyValue);
                }

                /* Extract the hook's value. */
                propertyValue = CSS.Hooks.extractValue(hook, rootPropertyValue);

            /* If this is a normalized property (e.g. "opacity" becomes "filter" in <=IE8) or "translateX" becomes "transform"),
               normalize the property's name and value, and handle the special case of transforms. */
            /* Note: Normalizing a property is mutually exclusive from hooking a property since hook-extracted values are strictly
               numerical and therefore do not require normalization extraction. */
            } else if (CSS.Normalizations.registered[property]) {
                var normalizedPropertyName,
                    normalizedPropertyValue;

                normalizedPropertyName = CSS.Normalizations.registered[property]("name", element);

                /* Transform values are calculated via normalization extraction (see below), which checks against the element's transformCache.
                   At no point do transform GETs ever actually query the DOM; initial stylesheet values are never processed.
                   This is because parsing 3D transform matrices is not always accurate and would bloat our codebase;
                   thus, normalization extraction defaults initial transform values to their zero-values (e.g. 1 for scaleX and 0 for translateX). */
                if (normalizedPropertyName !== "transform") {
                    normalizedPropertyValue = computePropertyValue(element, CSS.Names.prefixCheck(normalizedPropertyName)[0]); /* GET */

                    /* If the value is a CSS null-value and this property has a hook template, use that zero-value template so that hooks can be extracted from it. */
                    if (CSS.Values.isCSSNullValue(normalizedPropertyValue) && CSS.Hooks.templates[property]) {
                        normalizedPropertyValue = CSS.Hooks.templates[property][1];
                    }
                }

                propertyValue = CSS.Normalizations.registered[property]("extract", element, normalizedPropertyValue);
            }

            /* If a (numeric) value wasn't produced via hook extraction or normalization, query the DOM. */
            if (!/^[\d-]/.test(propertyValue)) {
                /* For SVG elements, dimensional properties (which SVGAttribute() detects) are tweened via
                   their HTML attribute values instead of their CSS style values. */
                if (Data(element) && Data(element).isSVG && CSS.Names.SVGAttribute(property)) {
                    /* Since the height/width attribute values must be set manually, they don't reflect computed values.
                       Thus, we use use getBBox() to ensure we always get values for elements with undefined height/width attributes. */
                    if (/^(height|width)$/i.test(property)) {
                        propertyValue = element.getBBox()[property];
                    /* Otherwise, access the attribute value directly. */
                    } else {
                        propertyValue = element.getAttribute(property);
                    }
                } else {
                    propertyValue = computePropertyValue(element, CSS.Names.prefixCheck(property)[0]); /* GET */
                }
            }

            /* Since property lookups are for animation purposes (which entails computing the numeric delta between start and end values),
               convert CSS null-values to an integer of value 0. */
            if (CSS.Values.isCSSNullValue(propertyValue)) {
                propertyValue = 0;
            }

            if (Velocity.debug >= 2) console.log("Get " + property + ": " + propertyValue);

            return propertyValue;
        },

        /* The singular setPropertyValue, which routes the logic for all normalizations, hooks, and standard CSS properties. */
        setPropertyValue: function(element, property, propertyValue, rootPropertyValue, scrollData) {
            var propertyName = property;

            /* In order to be subjected to call options and element queueing, scroll animation is routed through Velocity as if it were a standard CSS property. */
            if (property === "scroll") {
                /* If a container option is present, scroll the container instead of the browser window. */
                if (scrollData.container) {
                    scrollData.container["scroll" + scrollData.direction] = propertyValue;
                /* Otherwise, Velocity defaults to scrolling the browser window. */
                } else {
                    if (scrollData.direction === "Left") {
                        window.scrollTo(propertyValue, scrollData.alternateValue);
                    } else {
                        window.scrollTo(scrollData.alternateValue, propertyValue);
                    }
                }
            } else {
                /* Transforms (translateX, rotateZ, etc.) are applied to a per-element transformCache object, which is manually flushed via flushTransformCache().
                   Thus, for now, we merely cache transforms being SET. */
                if (CSS.Normalizations.registered[property] && CSS.Normalizations.registered[property]("name", element) === "transform") {
                    /* Perform a normalization injection. */
                    /* Note: The normalization logic handles the transformCache updating. */
                    CSS.Normalizations.registered[property]("inject", element, propertyValue);

                    propertyName = "transform";
                    propertyValue = Data(element).transformCache[property];
                } else {
                    /* Inject hooks. */
                    if (CSS.Hooks.registered[property]) {
                        var hookName = property,
                            hookRoot = CSS.Hooks.getRoot(property);

                        /* If a cached rootPropertyValue was not provided, query the DOM for the hookRoot's current value. */
                        rootPropertyValue = rootPropertyValue || CSS.getPropertyValue(element, hookRoot); /* GET */

                        propertyValue = CSS.Hooks.injectValue(hookName, propertyValue, rootPropertyValue);
                        property = hookRoot;
                    }

                    /* Normalize names and values. */
                    if (CSS.Normalizations.registered[property]) {
                        propertyValue = CSS.Normalizations.registered[property]("inject", element, propertyValue);
                        property = CSS.Normalizations.registered[property]("name", element);
                    }

                    /* Assign the appropriate vendor prefix before performing an official style update. */
                    propertyName = CSS.Names.prefixCheck(property)[0];

                    /* A try/catch is used for IE<=8, which throws an error when "invalid" CSS values are set, e.g. a negative width.
                       Try/catch is avoided for other browsers since it incurs a performance overhead. */
                    if (IE <= 8) {
                        try {
                            element.style[propertyName] = propertyValue;
                        } catch (error) { if (Velocity.debug) console.log("Browser does not support [" + propertyValue + "] for [" + propertyName + "]"); }
                    /* SVG elements have their dimensional properties (width, height, x, y, cx, etc.) applied directly as attributes instead of as styles. */
                    /* Note: IE8 does not support SVG elements, so it's okay that we skip it for SVG animation. */
                    } else if (Data(element) && Data(element).isSVG && CSS.Names.SVGAttribute(property)) {
                        /* Note: For SVG attributes, vendor-prefixed property names are never used. */
                        /* Note: Not all CSS properties can be animated via attributes, but the browser won't throw an error for unsupported properties. */
                        element.setAttribute(property, propertyValue);
                    } else {
                        element.style[propertyName] = propertyValue;
                    }

                    if (Velocity.debug >= 2) console.log("Set " + property + " (" + propertyName + "): " + propertyValue);
                }
            }

            /* Return the normalized property name and value in case the caller wants to know how these values were modified before being applied to the DOM. */
            return [ propertyName, propertyValue ];
        },

        /* To increase performance by batching transform updates into a single SET, transforms are not directly applied to an element until flushTransformCache() is called. */
        /* Note: Velocity applies transform properties in the same order that they are chronogically introduced to the element's CSS styles. */
        flushTransformCache: function(element) {
            var transformString = "";

            /* Certain browsers require that SVG transforms be applied as an attribute. However, the SVG transform attribute takes a modified version of CSS's transform string
               (units are dropped and, except for skewX/Y, subproperties are merged into their master property -- e.g. scaleX and scaleY are merged into scale(X Y). */
            if ((IE || (Velocity.State.isAndroid && !Velocity.State.isChrome)) && Data(element).isSVG) {
                /* Since transform values are stored in their parentheses-wrapped form, we use a helper function to strip out their numeric values.
                   Further, SVG transform properties only take unitless (representing pixels) values, so it's okay that parseFloat() strips the unit suffixed to the float value. */
                function getTransformFloat (transformProperty) {
                    return parseFloat(CSS.getPropertyValue(element, transformProperty));
                }

                /* Create an object to organize all the transforms that we'll apply to the SVG element. To keep the logic simple,
                   we process *all* transform properties -- even those that may not be explicitly applied (since they default to their zero-values anyway). */
                var SVGTransforms = {
                    translate: [ getTransformFloat("translateX"), getTransformFloat("translateY") ],
                    skewX: [ getTransformFloat("skewX") ], skewY: [ getTransformFloat("skewY") ],
                    /* If the scale property is set (non-1), use that value for the scaleX and scaleY values
                       (this behavior mimics the result of animating all these properties at once on HTML elements). */
                    scale: getTransformFloat("scale") !== 1 ? [ getTransformFloat("scale"), getTransformFloat("scale") ] : [ getTransformFloat("scaleX"), getTransformFloat("scaleY") ],
                    /* Note: SVG's rotate transform takes three values: rotation degrees followed by the X and Y values
                       defining the rotation's origin point. We ignore the origin values (default them to 0). */
                    rotate: [ getTransformFloat("rotateZ"), 0, 0 ]
                };

                /* Iterate through the transform properties in the user-defined property map order.
                   (This mimics the behavior of non-SVG transform animation.) */
                $.each(Data(element).transformCache, function(transformName) {
                    /* Except for with skewX/Y, revert the axis-specific transform subproperties to their axis-free master
                       properties so that they match up with SVG's accepted transform properties. */
                    if (/^translate/i.test(transformName)) {
                        transformName = "translate";
                    } else if (/^scale/i.test(transformName)) {
                        transformName = "scale";
                    } else if (/^rotate/i.test(transformName)) {
                        transformName = "rotate";
                    }

                    /* Check that we haven't yet deleted the property from the SVGTransforms container. */
                    if (SVGTransforms[transformName]) {
                        /* Append the transform property in the SVG-supported transform format. As per the spec, surround the space-delimited values in parentheses. */
                        transformString += transformName + "(" + SVGTransforms[transformName].join(" ") + ")" + " ";

                        /* After processing an SVG transform property, delete it from the SVGTransforms container so we don't
                           re-insert the same master property if we encounter another one of its axis-specific properties. */
                        delete SVGTransforms[transformName];
                    }
                });
            } else {
                var transformValue,
                    perspective;

                /* Transform properties are stored as members of the transformCache object. Concatenate all the members into a string. */
                $.each(Data(element).transformCache, function(transformName) {
                    transformValue = Data(element).transformCache[transformName];

                    /* Transform's perspective subproperty must be set first in order to take effect. Store it temporarily. */
                    if (transformName === "transformPerspective") {
                        perspective = transformValue;
                        return true;
                    }

                    /* IE9 only supports one rotation type, rotateZ, which it refers to as "rotate". */
                    if (IE === 9 && transformName === "rotateZ") {
                        transformName = "rotate";
                    }

                    transformString += transformName + transformValue + " ";
                });

                /* If present, set the perspective subproperty first. */
                if (perspective) {
                    transformString = "perspective" + perspective + " " + transformString;
                }
            }

            CSS.setPropertyValue(element, "transform", transformString);
        }
    };

    /* Register hooks and normalizations. */
    CSS.Hooks.register();
    CSS.Normalizations.register();

    /**********************
       Velocity.animate
    **********************/

    Velocity.animate = function() {

        /******************
            Call Chain
        ******************/

        /* Logic for determining what to return to the call stack when exiting out of Velocity. */
        function getChain () {
            /* If we are using the utility function, attempt to return this call's promise. If no promise library was detected,
               default to null instead of returning the targeted elements so that utility function's return value is standardized. */
            if (isUtility) {
                return promiseData.promise || null;
            /* Otherwise, if we're using $.fn, return the jQuery-/Zepto-wrapped element set. */
            } else {
                return elementsWrapped;
            }
        }

        /*************************
           Arguments Assignment
        *************************/

        /* To allow for expressive CoffeeScript code, Velocity supports an alternative syntax in which "properties" and "options"
           objects are defined on a container object that's passed in as Velocity's sole argument. */
        /* Note: Some browsers automatically populate arguments with a "properties" object. We detect it by checking for its default "names" property. */
        var syntacticSugar = (arguments[0] && (($.isPlainObject(arguments[0].properties) && !arguments[0].properties.names) || Type.isString(arguments[0].properties))),
            /* Whether Velocity was called via the utility function (as opposed to on a jQuery/Zepto object). */
            isUtility,
            /* When Velocity is called via the utility function ($.Velocity.animate()/Velocity.animate()), elements are explicitly
               passed in as the first parameter. Thus, argument positioning varies. We normalize them here. */
            elementsWrapped,
            argumentIndex;

        var elements,
            propertiesMap,
            options;

        /* Detect jQuery/Zepto elements being animated via the $.fn method. */
        if (Type.isWrapped(this)) {
            isUtility = false;

            argumentIndex = 0;
            elements = this;
            elementsWrapped = this;
        /* Otherwise, raw elements are being animated via the utility function. */
        } else {
            isUtility = true;

            argumentIndex = 1;
            elements = syntacticSugar ? arguments[0].elements : arguments[0];
        }

        elements = Type.isWrapped(elements) ? [].slice.call(elements) : elements;

        if (!elements) {
            return;
        }

        if (syntacticSugar) {
            propertiesMap = arguments[0].properties;
            options = arguments[0].options;
        } else {
            propertiesMap = arguments[argumentIndex];
            options = arguments[argumentIndex + 1];
        }

        /* The length of the element set (in the form of a nodeList or an array of elements) is defaulted to 1 in case a
           single raw DOM element is passed in (which doesn't contain a length property). */
        var elementsLength = (Type.isArray(elements) || Type.isNodeList(elements)) ? elements.length : 1,
            elementsIndex = 0;

        /***************************
            Argument Overloading
        ***************************/

        /* Support is included for jQuery's argument overloading: $.animate(propertyMap [, duration] [, easing] [, complete]).
           Overloading is detected by checking for the absence of an object being passed into options. */
        /* Note: The stop action does not accept animation options, and is therefore excluded from this check. */
        if (propertiesMap !== "stop" && !$.isPlainObject(options)) {
            /* The utility function shifts all arguments one position to the right, so we adjust for that offset. */
            var startingArgumentPosition = argumentIndex + 1;

            options = {};

            /* Iterate through all options arguments */
            for (var i = startingArgumentPosition; i < arguments.length; i++) {
                /* Treat a number as a duration. Parse it out. */
                /* Note: The following RegEx will return true if passed an array with a number as its first item.
                   Thus, arrays are skipped from this check. */
                if (!Type.isArray(arguments[i]) && /^\d/.test(arguments[i])) {
                    options.duration = parseFloat(arguments[i]);
                /* Treat strings and arrays as easings. */
                } else if (Type.isString(arguments[i]) || Type.isArray(arguments[i])) {
                    options.easing = arguments[i];
                /* Treat a function as a complete callback. */
                } else if (Type.isFunction(arguments[i])) {
                    options.complete = arguments[i];
                }
            }
        }

        /***************
            Promises
        ***************/

        var promiseData = { 
                promise: null,
                resolver: null,
                rejecter: null
            };

        /* If this call was made via the utility function (which is the default method of invocation when jQuery/Zepto are not being used), and if 
           promise support was detected, create a promise object for this call and store references to its resolver and rejecter methods. The resolve
           method is used when a call completes naturally or is prematurely stopped by the user. In both cases, completeCall() handles the associated
           call cleanup and promise resolving logic. The reject method is used when an invalid set of arguments is passed into a Velocity call. */
        /* Note: Velocity employs a call-based queueing architecture, which means that stopping an animating element actually stops the full call that
           triggered it -- not that one element exclusively. Similarly, there is one promise per call, and all elements targeted by a Velocity call are
           grouped together for the purposes of resolving and rejecting a promise. */
        if (isUtility && Velocity.Promise) {
            promiseData.promise = new Velocity.Promise(function (resolve, reject) {
                promiseData.resolver = resolve;
                promiseData.rejecter = reject;
            });
        }

        /*********************
           Action Detection
        *********************/

        /* Velocity's behavior is categorized into "actions": Elements can either be specially scrolled into view,
           or they can be started, stopped, or reversed. If a literal or referenced properties map is passed in as Velocity's
           first argument, the associated action is "start". Alternatively, "scroll", "reverse", or "stop" can be passed in instead of a properties map. */
        var action;

        switch (propertiesMap) {
            case "scroll":
                action = "scroll";
                break;

            case "reverse":
                action = "reverse";
                break;

            case "stop":
                /*******************
                    Action: Stop
                *******************/

                /* Clear the currently-active delay on each targeted element. */
                $.each(Type.isNode(elements) ? [ elements ] : elements, function(i, element) {
                    if (Data(element) && Data(element).delayTimer) {
                        /* Stop the timer from triggering its cached next() function. */
                        clearTimeout(Data(element).delayTimer.setTimeout);

                        /* Manually call the next() function so that the subsequent queue items can progress. */
                        if (Data(element).delayTimer.next) {
                            Data(element).delayTimer.next();
                        }

                        delete Data(element).delayTimer;
                    }
                });

                var callsToStop = [];

                /* When the stop action is triggered, the elements' currently active call is immediately stopped. The active call might have
                   been applied to multiple elements, in which case all of the call's elements will be subjected to stopping. When an element
                   is stopped, the next item in its animation queue is immediately triggered. */
                /* An additional argument may be passed in to clear an element's remaining queued calls. Either true (which defaults to the "fx" queue)
                   or a custom queue string can be passed in. */
                /* Stopping is achieved by traversing active calls for those which contain the targeted element. */
                /* Note: The stop command runs prior to Queueing since its behavior is intended to take effect *immediately*,
                   regardless of the element's current queue state. */
                $.each(Velocity.State.calls, function(i, activeCall) {
                    /* Inactive calls are set to false by the logic inside completeCall(). Skip them. */
                    if (activeCall !== false) {
                        /* If we're operating on a single element, wrap it in an array so that $.each() can iterate over it. */
                        $.each(Type.isNode(activeCall[1]) ? [ activeCall[1] ] : activeCall[1], function(k, activeElement) {
                            $.each(Type.isNode(elements) ? [ elements ] : elements, function(l, element) {
                                /* Check that this call was applied to the target element. */
                                if (element === activeElement) {
                                    if (Data(element)) {
                                        /* Since "reverse" uses cached start values (the previous call's endValues),
                                           these values must be changed to reflect the final value that the elements were actually tweened to. */
                                        $.each(Data(element).tweensContainer, function(m, activeTween) {
                                            activeTween.endValue = activeTween.currentValue;
                                        });
                                    }

                                    /* Clear the remaining queued calls. */
                                    if (options === true || Type.isString(options)) {
                                        /* The options argument can be overriden with a custom queue's name. */
                                        var queueName = Type.isString(options) ? options : "";

                                        /* Iterate through the items in the element's queue. */
                                        $.each($.queue(element, queueName), function(i, item) {
                                            /* The queue array can contain an "inprogress" sentinal, which we skip. */
                                            if (Type.isFunction(item)) {
                                                /* Pass the item's callback a flag indicating that we want to abort from the queue call.
                                                   (Specifically, the queue will resolve the call's associated promise then abort.)  */
                                                item(null, true);
                                            }
                                        });

                                        /* Clearing the $.queue() array is achieved by resetting it to []. */
                                        $.queue(element, queueName, []);
                                    }

                                    callsToStop.push(i);
                                }
                            });
                        });
                    }
                });

                /* Prematurely call completeCall() on each matched active call, passing an additional flag to indicate
                   that the complete callback and display:none setting should be skipped since we're completing prematurely. */
                $.each(callsToStop, function(i, j) {
                    completeCall(j, true);
                });

                if (promiseData.promise) {
                    /* Immediately resolve the promise associated with this stop call since stop runs synchronously. */
                    promiseData.resolver(elements);
                }

                /* Since we're stopping, and not proceeding with queueing, exit out of Velocity. */
                return getChain();

            default:
                /* Treat a non-empty plain object as a literal properties map. */
                if ($.isPlainObject(propertiesMap) && !$.isEmptyObject(propertiesMap)) {
                    action = "start";

                /****************
                    Sequences
                ****************/

                /* Check if a string matches a registered sequence (see Sequences above). */
                } else if (Type.isString(propertiesMap) && Velocity.Sequences[propertiesMap]) {
                    var durationOriginal = options.duration,
                        delayOriginal = options.delay || 0;

                    /* If the backwards option was passed in, reverse the element set so that elements animate from the last to the first. */
                    if (options.backwards === true) {
                        elements = (elements.jquery ? [].slice.call(elements) : elements).reverse();
                    }

                    /* Individually trigger the sequence for each element in the set to prevent users from having to handle iteration logic in their sequence. */
                    $.each(elements, function(elementIndex, element) {
                        /* If the stagger option was passed in, successively delay each element by the stagger value (in ms). Retain the original delay value. */
                        if (parseFloat(options.stagger)) {
                            options.delay = delayOriginal + (parseFloat(options.stagger) * elementIndex);
                        } else if (Type.isFunction(options.stagger)) {
                            options.delay = delayOriginal + options.stagger.call(element, elementIndex, elementsLength);
                        }

                        /* If the drag option was passed in, successively increase/decrease (depending on the presense of options.backwards)
                           the duration of each element's animation, using floors to prevent producing very short durations. */
                        if (options.drag) {
                            /* Default the duration of UI pack effects (callouts and transitions) to 1000ms instead of the usual default duration of 400ms. */
                            options.duration = parseFloat(durationOriginal) || (/^(callout|transition)/.test(propertiesMap) ? 1000 : DEFAULT_DURATION);

                            /* For each element, take the greater duration of: A) animation completion percentage relative to the original duration,
                               B) 75% of the original duration, or C) a 200ms fallback (in case duration is already set to a low value).
                               The end result is a baseline of 75% of the sequence's duration that increases/decreases as the end of the element set is approached. */
                            options.duration = Math.max(options.duration * (options.backwards ? 1 - elementIndex/elementsLength : (elementIndex + 1) / elementsLength), options.duration * 0.75, 200);
                        }

                        /* Pass in the call's options object so that the sequence can optionally extend it. It defaults to an empty object instead of null to
                           reduce the options checking logic required inside the sequence. */
                        Velocity.Sequences[propertiesMap].call(element, element, options || {}, elementIndex, elementsLength, elements, promiseData.promise ? promiseData : undefined);
                    });

                    /* Since the animation logic resides within the sequence's own code, abort the remainder of this call.
                       (The performance overhead up to this point is virtually non-existant.) */
                    /* Note: The jQuery call chain is kept intact by returning the complete element set. */
                    return getChain();
                } else {
                    var abortError = "Velocity: First argument (" + propertiesMap + ") was not a property map, a known action, or a registered sequence. Aborting.";

                    if (promiseData.promise) {
                        promiseData.rejecter(new Error(abortError));
                    } else {
                        console.log(abortError);
                    }

                    return getChain();
                }
        }

        /**************************
            Call-Wide Variables
        **************************/

        /* A container for CSS unit conversion ratios (e.g. %, rem, and em ==> px) that is used to cache ratios across all properties
           being animated in a single Velocity call. Calculating unit ratios necessitates DOM querying and updating, and is therefore
           avoided (via caching) wherever possible; further, ratios are only calculated when they're needed. */
        /* Note: This container is call-wide instead of page-wide to avoid the risk of using stale conversion metrics across
           Velocity animations that are not immediately consecutively chained. */
        var unitConversionRatios = {
                /* Performance optimization insight: When the parent element, CSS position value, and fontSize do not differ amongst elements,
                   the elements' unit ratios are identical. */
                lastParent: null,
                lastPosition: null,
                lastFontSize: null,
                /* Percent is the only unit types whose ratio is dependant upon axis. */
                lastPercentToPxWidth: null,
                lastPercentToPxHeight: null,
                lastEmToPx: null,
                /* The rem==>px ratio is relative to the document's fontSize -- not any property belonging to the element.
                   Thus, it is automatically call-wide cached whenever the rem unit is being animated. */
                remToPx: null,
                /* Similarly, viewport units are relative to the window's current dimensions. */
                vwToPx: null,
                vhToPx: null
            };

        /* A container for all the ensuing tween data and metadata associated with this call.
           This container gets pushed to the page-wide Velocity.State.calls array that is processed during animation ticking. */
        var call = [];

        /************************
           Element Processing
        ************************/

        /* Element processing consists of three parts -- data processing that cannot go stale and data processing that *can* go stale (i.e. third-party style modifications):
           1) Pre-Queueing: Element-wide variables, including the element's data storage, are instantiated. Call options are prepared. If triggered, the Stop action is executed.
           2) Queueing: The logic that runs once this call has reached its point of execution in the element's $.queue() stack. Most logic is placed here to avoid risking it becoming stale.
           3) Pushing: Consolidation of the tween data followed by its push onto the global in-progress calls container.
        */

        function processElement () {

            /*************************
               Part I: Pre-Queueing
            *************************/

            /***************************
               Element-Wide Variables
            ***************************/

            var element = this,
                /* The runtime opts object is the extension of the current call's options and Velocity's page-wide option defaults. */
                opts = $.extend({}, Velocity.defaults, options),
                /* A container for the processed data associated with each property in the propertyMap.
                   (Each property in the map produces its own "tween".) */
                tweensContainer = {};

            /******************
                Data Cache
            ******************/

            /* A primary design goal of Velocity is to cache data wherever possible in order to avoid DOM requerying.
               Accordingly, each element has a data cache instantiated on it. */
            if (Data(element) === undefined) {
                $.data(element, NAME, {
                    /* Store whether this is an SVG element, since its properties are retrieved and updated differently than standard HTML elements. */
                    isSVG: Type.isSVG(element),
                    /* Keep track of whether the element is currently being animated by Velocity.
                       This is used to ensure that property values are not transferred between non-consecutive (stale) calls. */
                    isAnimating: false,
                    /* A reference to the element's live computedStyle object. Learn more here: https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle */
                    computedStyle: null,
                    /* Tween data is cached for each animation on the element so that data can be passed across calls --
                       in particular, end values are used as subsequent start values in consecutive Velocity calls. */
                    tweensContainer: null,
                    /* The full root property values of each CSS hook being animated on this element are cached so that:
                       1) Concurrently-animating hooks sharing the same root can have their root values' merged into one while tweening.
                       2) Post-hook-injection root values can be transferred over to consecutively chained Velocity calls as starting root values. */
                    rootPropertyValueCache: {},
                    /* A cache for transform updates, which must be manually flushed via CSS.flushTransformCache(). */
                    transformCache: {}
                });
            }

            /******************
               Option: Delay
            ******************/

            /* Since queue:false doesn't respect the item's existing queue, we avoid injecting its delay here (it's set later on). */
            /* Note: Velocity rolls its own delay function since jQuery doesn't have a utility alias for $.fn.delay()
               (and thus requires jQuery element creation, which we avoid since its overhead includes DOM querying). */
            if (parseFloat(opts.delay) && opts.queue !== false) {
                $.queue(element, opts.queue, function(next) {
                    /* This is a flag used to indicate to the upcoming completeCall() function that this queue entry was initiated by Velocity. See completeCall() for further details. */
                    Velocity.velocityQueueEntryFlag = true;

                    /* The ensuing queue item (which is assigned to the "next" argument that $.queue() automatically passes in) will be triggered after a setTimeout delay. 
                       The setTimeout is stored so that it can be subjected to clearTimeout() if this animation is prematurely stopped via Velocity's "stop" command. */
                    Data(element).delayTimer = { 
                        setTimeout: setTimeout(next, parseFloat(opts.delay)),
                        next: next
                    };
                });
            }

            /*********************
               Option: Duration
            *********************/

            /* In mock mode, all animations are forced to 1ms so that they occur immediately upon the next rAF tick. */
            if (Velocity.mock === true) {
                opts.duration = 1;
            } else {
                /* Support for jQuery's named durations. */
                switch (opts.duration.toString().toLowerCase()) {
                    case "fast":
                        opts.duration = 200;
                        break;

                    case "normal":
                        opts.duration = DEFAULT_DURATION;
                        break;

                    case "slow":
                        opts.duration = 600;
                        break;

                    default:
                        /* Remove the potential "ms" suffix and default to 1 if the user is attempting to set a duration of 0 (in order to produce an immediate style change). */
                        opts.duration = parseFloat(opts.duration) || 1;
                }
            }

            /*******************
               Option: Easing
            *******************/

            opts.easing = getEasing(opts.easing, opts.duration);

            /**********************
               Option: Callbacks
            **********************/

            /* Callbacks must functions. Otherwise, default to null. */
            if (opts.begin && !Type.isFunction(opts.begin)) {
                opts.begin = null;
            }

            if (opts.progress && !Type.isFunction(opts.progress)) {
                opts.progress = null;
            }

            if (opts.complete && !Type.isFunction(opts.complete)) {
                opts.complete = null;
            }

            /*********************************
               Option: Display & Visibility
            *********************************/

            /* Refer to Velocity's documentation (VelocityJS.org/#displayAndVisibility) for a description of the display and visibility options' behavior. */
            if (opts.display) {
                opts.display = opts.display.toString().toLowerCase();

                /* Users can pass in a special "auto" value to instruct Velocity to set the element to its default display value. */
                if (opts.display === "auto") {
                    opts.display = Velocity.CSS.Values.getDisplayType(element);
                }
            }

            if (opts.visibility) {
                opts.visibility = opts.visibility.toString().toLowerCase();
            }

            /**********************
               Option: mobileHA
            **********************/

            /* When set to true, and if this is a mobile device, mobileHA automatically enables hardware acceleration (via a null transform hack)
               on animating elements. HA is removed from the element at the completion of its animation. */
            /* Note: Android Gingerbread doesn't support HA. If a null transform hack (mobileHA) is in fact set, it will prevent other tranform subproperties from taking effect. */
            /* Note: You can read more about the use of mobileHA in Velocity's documentation: VelocityJS.org/#mobileHA. */
            opts.mobileHA = (opts.mobileHA && Velocity.State.isMobile && !Velocity.State.isGingerbread);

            /***********************
               Part II: Queueing
            ***********************/

            /* When a set of elements is targeted by a Velocity call, the set is broken up and each element has the current Velocity call individually queued onto it.
               In this way, each element's existing queue is respected; some elements may already be animating and accordingly should not have this current Velocity call triggered immediately. */
            /* In each queue, tween data is processed for each animating property then pushed onto the call-wide calls array. When the last element in the set has had its tweens processed,
               the call array is pushed to Velocity.State.calls for live processing by the requestAnimationFrame tick. */
            function buildQueue (next) {

                /*******************
                   Option: Begin
                *******************/

                /* The begin callback is fired once per call -- not once per elemenet -- and is passed the full raw DOM element set as both its context and its first argument. */
                if (opts.begin && elementsIndex === 0) {
                    /* We throw callbacks in a setTimeout so that thrown errors don't halt the execution of Velocity itself. */
                    try {
                        opts.begin.call(elements, elements);
                    } catch (error) { 
                        setTimeout(function() {
                            throw error;
                        }, 1);
                    }
                }

                /*****************************************
                   Tween Data Construction (for Scroll)
                *****************************************/

                /* Note: In order to be subjected to chaining and animation options, scroll's tweening is routed through Velocity as if it were a standard CSS property animation. */
                if (action === "scroll") {
                    /* The scroll action uniquely takes an optional "offset" option -- specified in pixels -- that offsets the targeted scroll position. */
                    var scrollDirection = (/^x$/i.test(opts.axis) ? "Left" : "Top"),
                        scrollOffset = parseFloat(opts.offset) || 0,
                        scrollPositionCurrent,
                        scrollPositionCurrentAlternate,
                        scrollPositionEnd;

                    /* Scroll also uniquely takes an optional "container" option, which indicates the parent element that should be scrolled --
                       as opposed to the browser window itself. This is useful for scrolling toward an element that's inside an overflowing parent element. */
                    if (opts.container) {
                        /* Ensure that either a jQuery object or a raw DOM element was passed in. */
                        if (opts.container.jquery || Type.isNode(opts.container)) {
                            /* Extract the raw DOM element from the jQuery wrapper. */
                            opts.container = opts.container[0] || opts.container;
                            /* Note: Unlike other properties in Velocity, the browser's scroll position is never cached since it so frequently changes
                               (due to the user's natural interaction with the page). */
                            scrollPositionCurrent = opts.container["scroll" + scrollDirection]; /* GET */

                            /* $.position() values are relative to the container's currently viewable area (without taking into account the container's true dimensions
                               -- say, for example, if the container was not overflowing). Thus, the scroll end value is the sum of the child element's position *and*
                               the scroll container's current scroll position. */
                            /* Note: jQuery does not offer a utility alias for $.position(), so we have to incur jQuery object conversion here.
                               This syncs up with an ensuing batch of GETs, so it fortunately does not trigger layout thrashing. */
                            scrollPositionEnd = (scrollPositionCurrent + $(element).position()[scrollDirection.toLowerCase()]) + scrollOffset; /* GET */
                        /* If a value other than a jQuery object or a raw DOM element was passed in, default to null so that this option is ignored. */
                        } else {
                            opts.container = null;
                        }
                    } else {
                        /* If the window itself is being scrolled -- not a containing element -- perform a live scroll position lookup using
                           the appropriate cached property names (which differ based on browser type). */
                        scrollPositionCurrent = Velocity.State.scrollAnchor[Velocity.State["scrollProperty" + scrollDirection]]; /* GET */
                        /* When scrolling the browser window, cache the alternate axis's current value since window.scrollTo() doesn't let us change only one value at a time. */
                        scrollPositionCurrentAlternate = Velocity.State.scrollAnchor[Velocity.State["scrollProperty" + (scrollDirection === "Left" ? "Top" : "Left")]]; /* GET */

                        /* Unlike $.position(), $.offset() values are relative to the browser window's true dimensions -- not merely its currently viewable area --
                           and therefore end values do not need to be compounded onto current values. */
                        scrollPositionEnd = $(element).offset()[scrollDirection.toLowerCase()] + scrollOffset; /* GET */
                    }

                    /* Since there's only one format that scroll's associated tweensContainer can take, we create it manually. */
                    tweensContainer = {
                        scroll: {
                            rootPropertyValue: false,
                            startValue: scrollPositionCurrent,
                            currentValue: scrollPositionCurrent,
                            endValue: scrollPositionEnd,
                            unitType: "",
                            easing: opts.easing,
                            scrollData: {
                                container: opts.container,
                                direction: scrollDirection,
                                alternateValue: scrollPositionCurrentAlternate
                            }
                        },
                        element: element
                    };

                    if (Velocity.debug) console.log("tweensContainer (scroll): ", tweensContainer.scroll, element);

                /******************************************
                   Tween Data Construction (for Reverse)
                ******************************************/

                /* Reverse acts like a "start" action in that a property map is animated toward. The only difference is
                   that the property map used for reverse is the inverse of the map used in the previous call. Thus, we manipulate
                   the previous call to construct our new map: use the previous map's end values as our new map's start values. Copy over all other data. */
                /* Note: Reverse can be directly called via the "reverse" parameter, or it can be indirectly triggered via the loop option. (Loops are composed of multiple reverses.) */
                /* Note: Reverse calls do not need to be consecutively chained onto a currently-animating element in order to operate on cached values;
                   there is no harm to reverse being called on a potentially stale data cache since reverse's behavior is simply defined
                   as reverting to the element's values as they were prior to the previous *Velocity* call. */
                } else if (action === "reverse") {
                    /* Abort if there is no prior animation data to reverse to. */
                    if (!Data(element).tweensContainer) {
                        /* Dequeue the element so that this queue entry releases itself immediately, allowing subsequent queue entries to run. */
                        $.dequeue(element, opts.queue);

                        return;
                    } else {
                        /*********************
                           Options Parsing
                        *********************/

                        /* If the element was hidden via the display option in the previous call,
                           revert display to block prior to reversal so that the element is visible again. */
                        if (Data(element).opts.display === "none") {
                            Data(element).opts.display = "block";
                        }

                        if (Data(element).opts.visibility === "hidden") {
                            Data(element).opts.visibility = "visible";
                        }

                        /* If the loop option was set in the previous call, disable it so that "reverse" calls aren't recursively generated.
                           Further, remove the previous call's callback options; typically, users do not want these to be refired. */
                        Data(element).opts.loop = false;
                        Data(element).opts.begin = null;
                        Data(element).opts.complete = null;

                        /* Since we're extending an opts object that has already been extended with the defaults options object,
                           we remove non-explicitly-defined properties that are auto-assigned values. */
                        if (!options.easing) {
                            delete opts.easing;
                        }

                        if (!options.duration) {
                            delete opts.duration;
                        }

                        /* The opts object used for reversal is an extension of the options object optionally passed into this
                           reverse call plus the options used in the previous Velocity call. */
                        opts = $.extend({}, Data(element).opts, opts);

                        /*************************************
                           Tweens Container Reconstruction
                        *************************************/

                        /* Create a deepy copy (indicated via the true flag) of the previous call's tweensContainer. */
                        var lastTweensContainer = $.extend(true, {}, Data(element).tweensContainer);

                        /* Manipulate the previous tweensContainer by replacing its end values and currentValues with its start values. */
                        for (var lastTween in lastTweensContainer) {
                            /* In addition to tween data, tweensContainers contain an element property that we ignore here. */
                            if (lastTween !== "element") {
                                var lastStartValue = lastTweensContainer[lastTween].startValue;

                                lastTweensContainer[lastTween].startValue = lastTweensContainer[lastTween].currentValue = lastTweensContainer[lastTween].endValue;
                                lastTweensContainer[lastTween].endValue = lastStartValue;

                                /* Easing is the only option that embeds into the individual tween data (since it can be defined on a per-property basis).
                                   Accordingly, every property's easing value must be updated when an options object is passed in with a reverse call.
                                   The side effect of this extensibility is that all per-property easing values are forcefully reset to the new value. */
                                if (!$.isEmptyObject(options)) {
                                    lastTweensContainer[lastTween].easing = opts.easing;
                                }

                                if (Velocity.debug) console.log("reverse tweensContainer (" + lastTween + "): " + JSON.stringify(lastTweensContainer[lastTween]), element);
                            }
                        }

                        tweensContainer = lastTweensContainer;
                    }

                /*****************************************
                   Tween Data Construction (for Start)
                *****************************************/

                } else if (action === "start") {

                    /*************************
                        Value Transferring
                    *************************/

                    /* If this queue entry follows a previous Velocity-initiated queue entry *and* if this entry was created
                       while the element was in the process of being animated by Velocity, then this current call is safe to use
                       the end values from the prior call as its start values. Velocity attempts to perform this value transfer
                       process whenever possible in order to avoid requerying the DOM. */
                    /* If values aren't transferred from a prior call and start values were not forcefed by the user (more on this below),
                       then the DOM is queried for the element's current values as a last resort. */
                    /* Note: Conversely, animation reversal (and looping) *always* perform inter-call value transfers; they never requery the DOM. */
                    var lastTweensContainer;

                    /* The per-element isAnimating flag is used to indicate whether it's safe (i.e. the data isn't stale)
                       to transfer over end values to use as start values. If it's set to true and there is a previous
                       Velocity call to pull values from, do so. */
                    if (Data(element).tweensContainer && Data(element).isAnimating === true) {
                        lastTweensContainer = Data(element).tweensContainer;
                    }

                    /***************************
                       Tween Data Calculation
                    ***************************/

                    /* This function parses property data and defaults endValue, easing, and startValue as appropriate. */
                    /* Property map values can either take the form of 1) a single value representing the end value,
                       or 2) an array in the form of [ endValue, [, easing] [, startValue] ].
                       The optional third parameter is a forcefed startValue to be used instead of querying the DOM for
                       the element's current value. Read Velocity's docmentation to learn more about forcefeeding: VelocityJS.org/#forcefeeding */
                    function parsePropertyValue (valueData, skipResolvingEasing) {
                        var endValue = undefined,
                            easing = undefined,
                            startValue = undefined;

                        /* Handle the array format, which can be structured as one of three potential overloads:
                           A) [ endValue, easing, startValue ], B) [ endValue, easing ], or C) [ endValue, startValue ] */
                        if (Type.isArray(valueData)) {
                            /* endValue is always the first item in the array. Don't bother validating endValue's value now
                               since the ensuing property cycling logic does that. */
                            endValue = valueData[0];

                            /* Two-item array format: If the second item is a number, function, or hex string, treat it as a
                               start value since easings can only be non-hex strings or arrays. */
                            if ((!Type.isArray(valueData[1]) && /^[\d-]/.test(valueData[1])) || Type.isFunction(valueData[1]) || CSS.RegEx.isHex.test(valueData[1])) {
                                startValue = valueData[1];
                            /* Two or three-item array: If the second item is a non-hex string or an array, treat it as an easing. */
                            } else if ((Type.isString(valueData[1]) && !CSS.RegEx.isHex.test(valueData[1])) || Type.isArray(valueData[1])) {
                                easing = skipResolvingEasing ? valueData[1] : getEasing(valueData[1], opts.duration);

                                /* Don't bother validating startValue's value now since the ensuing property cycling logic inherently does that. */
                                if (valueData[2] !== undefined) {
                                    startValue = valueData[2];
                                }
                            }
                        /* Handle the single-value format. */
                        } else {
                            endValue = valueData;
                        }

                        /* Default to the call's easing if a per-property easing type was not defined. */
                        easing = easing || opts.easing;

                        /* If functions were passed in as values, pass the function the current element as its context,
                           plus the element's index and the element set's size as arguments. Then, assign the returned value. */
                        if (Type.isFunction(endValue)) {
                            endValue = endValue.call(element, elementsIndex, elementsLength);
                        }

                        if (Type.isFunction(startValue)) {
                            startValue = startValue.call(element, elementsIndex, elementsLength);
                        }

                        /* Allow startValue to be left as undefined to indicate to the ensuing code that its value was not forcefed. */
                        return [ endValue || 0, easing, startValue ];
                    }

                    /* Cycle through each property in the map, looking for shorthand color properties (e.g. "color" as opposed to "colorRed"). Inject the corresponding
                       colorRed, colorGreen, and colorBlue RGB component tweens into the propertiesMap (which Velocity understands) and remove the shorthand property. */
                    $.each(propertiesMap, function(property, value) {
                        /* Parse the value data for each shorthand. */
                        var valueData = parsePropertyValue(value, true),
                            endValue = valueData[0],
                            easing = valueData[1],
                            startValue = valueData[2];

                        /* Find shorthand color properties that have been passed a hex string. */
                        if (RegExp(CSS.Lists.colors.join("|")).test(property) && CSS.RegEx.isHex.test(endValue)) {
                            /* Convert the hex strings into their RGB component arrays. */
                            var colorComponents = [ "Red", "Green", "Blue" ],
                                endValueRGB = CSS.Values.hexToRgb(endValue),
                                startValueRGB = startValue ? CSS.Values.hexToRgb(startValue) : undefined;

                            /* Inject the RGB component tweens into propertiesMap. */
                            for (var i = 0; i < colorComponents.length; i++) {
                                propertiesMap[property + colorComponents[i]] = [ endValueRGB[i], easing, startValueRGB ? startValueRGB[i] : startValueRGB ]; 
                            }

                            /* Remove the intermediary shorthand property entry now that we've processed it. */
                            delete propertiesMap[property];
                        }                        
                    });

                    /* Create a tween out of each property, and append its associated data to tweensContainer. */
                    for (var property in propertiesMap) {

                        /**************************
                           Start Value Sourcing
                        **************************/

                        /* Parse out endValue, easing, and startValue from the property's data. */
                        var valueData = parsePropertyValue(propertiesMap[property]),
                            endValue = valueData[0],
                            easing = valueData[1],
                            startValue = valueData[2];

                        /* Now that the original property name's format has been used for the parsePropertyValue() lookup above,
                           we force the property to its camelCase styling to normalize it for manipulation. */
                        property = CSS.Names.camelCase(property);

                        /* In case this property is a hook, there are circumstances where we will intend to work on the hook's root property and not the hooked subproperty. */
                        var rootProperty = CSS.Hooks.getRoot(property),
                            rootPropertyValue = false;

                        /* Properties that are not supported by the browser (and do not have an associated normalization) will
                           inherently produce no style changes when set, so they are skipped in order to decrease animation tick overhead.
                           Property support is determined via prefixCheck(), which returns a false flag when no supported is detected. */
                        /* Note: Since SVG elements have some of their properties directly applied as HTML attributes,
                           there is no way to check for their explicit browser support, and so we skip skip this check for them. */
                        if (!Data(element).isSVG && CSS.Names.prefixCheck(rootProperty)[1] === false && CSS.Normalizations.registered[rootProperty] === undefined) {
                            if (Velocity.debug) console.log("Skipping [" + rootProperty + "] due to a lack of browser support.");

                            continue;
                        }

                        /* If the display option is being set to a non-"none" (e.g. "block") and opacity (filter on IE<=8) is being
                           animated to an endValue of non-zero, the user's intention is to fade in from invisible, thus we forcefeed opacity
                           a startValue of 0 if its startValue hasn't already been sourced by value transferring or prior forcefeeding. */
                        if (((opts.display && opts.display !== "none") || (opts.visibility && opts.visibility !== "hidden")) && /opacity|filter/.test(property) && !startValue && endValue !== 0) {
                            startValue = 0;
                        }

                        /* If values have been transferred from the previous Velocity call, extract the endValue and rootPropertyValue
                           for all of the current call's properties that were *also* animated in the previous call. */
                        /* Note: Value transferring can optionally be disabled by the user via the _cacheValues option. */
                        if (opts._cacheValues && lastTweensContainer && lastTweensContainer[property]) {
                            if (startValue === undefined) {
                                startValue = lastTweensContainer[property].endValue + lastTweensContainer[property].unitType;
                            }

                            /* The previous call's rootPropertyValue is extracted from the element's data cache since that's the
                               instance of rootPropertyValue that gets freshly updated by the tweening process, whereas the rootPropertyValue
                               attached to the incoming lastTweensContainer is equal to the root property's value prior to any tweening. */
                            rootPropertyValue = Data(element).rootPropertyValueCache[rootProperty];
                        /* If values were not transferred from a previous Velocity call, query the DOM as needed. */
                        } else {
                            /* Handle hooked properties. */
                            if (CSS.Hooks.registered[property]) {
                               if (startValue === undefined) {
                                    rootPropertyValue = CSS.getPropertyValue(element, rootProperty); /* GET */
                                    /* Note: The following getPropertyValue() call does not actually trigger a DOM query;
                                       getPropertyValue() will extract the hook from rootPropertyValue. */
                                    startValue = CSS.getPropertyValue(element, property, rootPropertyValue);
                                /* If startValue is already defined via forcefeeding, do not query the DOM for the root property's value;
                                   just grab rootProperty's zero-value template from CSS.Hooks. This overwrites the element's actual
                                   root property value (if one is set), but this is acceptable since the primary reason users forcefeed is
                                   to avoid DOM queries, and thus we likewise avoid querying the DOM for the root property's value. */
                                } else {
                                    /* Grab this hook's zero-value template, e.g. "0px 0px 0px black". */
                                    rootPropertyValue = CSS.Hooks.templates[rootProperty][1];
                                }
                            /* Handle non-hooked properties that haven't already been defined via forcefeeding. */
                            } else if (startValue === undefined) {
                                startValue = CSS.getPropertyValue(element, property); /* GET */
                            }
                        }

                        /**************************
                           Value Data Extraction
                        **************************/

                        var separatedValue,
                            endValueUnitType,
                            startValueUnitType,
                            operator = false;

                        /* Separates a property value into its numeric value and its unit type. */
                        function separateValue (property, value) {
                            var unitType,
                                numericValue;

                            numericValue = (value || 0)
                                .toString()
                                .toLowerCase()
                                /* Match the unit type at the end of the value. */
                                .replace(/[%A-z]+$/, function(match) {
                                    /* Grab the unit type. */
                                    unitType = match;

                                    /* Strip the unit type off of value. */
                                    return "";
                                });

                            /* If no unit type was supplied, assign one that is appropriate for this property (e.g. "deg" for rotateZ or "px" for width). */
                            if (!unitType) {
                                unitType = CSS.Values.getUnitType(property);
                            }

                            return [ numericValue, unitType ];
                        }

                        /* Separate startValue. */
                        separatedValue = separateValue(property, startValue);
                        startValue = separatedValue[0];
                        startValueUnitType = separatedValue[1];

                        /* Separate endValue, and extract a value operator (e.g. "+=", "-=") if one exists. */
                        separatedValue = separateValue(property, endValue);
                        endValue = separatedValue[0].replace(/^([+-\/*])=/, function(match, subMatch) {
                            operator = subMatch;

                            /* Strip the operator off of the value. */
                            return "";
                        });
                        endValueUnitType = separatedValue[1];

                        /* Parse float values from endValue and startValue. Default to 0 if NaN is returned. */
                        startValue = parseFloat(startValue) || 0;
                        endValue = parseFloat(endValue) || 0;

                        /*****************************
                           Value & Unit Conversion
                        *****************************/

                        var elementUnitRatios;

                        /* Custom support for properties that don't actually accept the % unit type, but where pollyfilling is trivial and relatively foolproof. */
                        if (endValueUnitType === "%") {
                            /* A %-value fontSize/lineHeight is relative to the parent's fontSize (as opposed to the parent's dimensions),
                               which is identical to the em unit's behavior, so we piggyback off of that. */
                            if (/^(fontSize|lineHeight)$/.test(property)) {
                                /* Convert % into an em decimal value. */
                                endValue = endValue / 100;
                                endValueUnitType = "em";
                            /* For scaleX and scaleY, convert the value into its decimal format and strip off the unit type. */
                            } else if (/^scale/.test(property)) {
                                endValue = endValue / 100;
                                endValueUnitType = "";
                            /* For RGB components, take the defined percentage of 255 and strip off the unit type. */
                            } else if (/(Red|Green|Blue)$/i.test(property)) {
                                endValue = (endValue / 100) * 255;
                                endValueUnitType = "";
                            }
                        }

                        /* When queried, the browser returns (most) CSS property values in pixels. Therefore, if an endValue with a unit type of
                           %, em, or rem is animated toward, startValue must be converted from pixels into the same unit type as endValue in order
                           for value manipulation logic (increment/decrement) to proceed. Further, if the startValue was forcefed or transferred
                           from a previous call, startValue may also not be in pixels. Unit conversion logic therefore consists of two steps:
                           1) Calculating the ratio of %,/em/rem relative to pixels then 2) Converting startValue into the same unit of measurement as endValue based on these ratios. */
                        /* Unit conversion ratios are calculated by momentarily setting a value with the target unit type on the element,
                           comparing the returned pixel value, then reverting to the original value. */
                        /* Note: Even if only one of these unit types is being animated, all unit ratios are calculated at once since the overhead
                           of batching the SETs and GETs together upfront outweights the potential overhead
                                 of layout thrashing caused by re-querying for uncalculated ratios for subsequently-processed properties. */
                        /* Note: Instead of adjusting the CSS properties on the target element, an alternative way of performing value conversion
                           is to inject a cloned element into the element's parent and manipulate *its* values instead.
                           This is a cleaner method that avoids the ensuing rounds of layout thrashing, but it's ultimately less performant.
                           due to the overhead involved with DOM tree modification (element insertion/deletion). */
                        /* Todo: Shift this logic into the calls' first tick instance so that it's synced with RAF. */
                        /* Todo: Store the original values and skip re-setting if we're animating height or width in the properties map. */
                        function calculateUnitRatios () {
                            /* The properties below are used to determine whether the element differs sufficiently from this same call's
                               prior element (in the overall element set) to also differ in its unit conversion ratios. If the properties
                               match up with those of the prior element, the prior element's conversion ratios are used. Like most optimizations
                               in Velocity, this is done to minimize DOM querying. */
                            var sameRatioIndicators = {
                                    parent: element.parentNode, /* GET */
                                    position: CSS.getPropertyValue(element, "position"), /* GET */
                                    fontSize: CSS.getPropertyValue(element, "fontSize") /* GET */
                                },
                                /* Determine if the same % ratio can be used. % is relative to the element's position value and the parent's width and height dimensions. */
                                sameBasePercent = ((sameRatioIndicators.position === unitConversionRatios.lastPosition) && (sameRatioIndicators.parent === unitConversionRatios.lastParent)),
                                /* Determine if the same em ratio can be used. em is relative to the element's fontSize, which itself is relative to the parent's fontSize. */
                                sameBaseEm = ((sameRatioIndicators.fontSize === unitConversionRatios.lastFontSize) && (sameRatioIndicators.parent === unitConversionRatios.lastParent));

                            /* Store these ratio indicators call-wide for the next element to compare against. */
                            unitConversionRatios.lastParent = sameRatioIndicators.parent;
                            unitConversionRatios.lastPosition = sameRatioIndicators.position;
                            unitConversionRatios.lastFontSize = sameRatioIndicators.fontSize;

                            /* Whereas % and em ratios are determined on a per-element basis, the rem unit type only needs to be checked
                               once per call since it is exclusively dependant upon document.body's fontSize. If this is the first time
                               that calculateUnitRatios() is being run during this call, remToPx will still be set to its default value of null, so we calculate it now. */
                            if (unitConversionRatios.remToPx === null) {
                                /* Default to most browsers' default fontSize of 16px in the case of 0. */
                                unitConversionRatios.remToPx = parseFloat(CSS.getPropertyValue(document.body, "fontSize")) || 16; /* GET */
                            }

                            /* The viewport units are relative to the window's inner dimensions. */
                            if (unitConversionRatios.vwToPx === null) {
                                unitConversionRatios.vwToPx = parseFloat(window.innerWidth) / 100; /* GET */
                                unitConversionRatios.vhToPx = parseFloat(window.innerHeight) / 100; /* GET */
                            }

                            var originalValues = {
                                    /* To accurately and consistently calculate conversion ratios, the element's overflow and box-sizing are temporarily removed.
                                       Both properties modify an element's visible dimensions. */
                                    /* Note: Overflow must be manipulated on a per-axis basis since the plain overflow property overwrites its subproperties' values. */
                                    overflowX: null,
                                    overflowY: null,
                                    boxSizing: null,
                                    /* width and height act as our proxy properties for measuring the horizontal and vertical % ratios.
                                       Since they can be artificially constrained by their min-/max- equivalents, those properties are converted as well. */
                                    width: null,
                                    minWidth: null,
                                    maxWidth: null,
                                    height: null,
                                    minHeight: null,
                                    maxHeight: null,
                                    /* paddingLeft arbitrarily acts as our proxy for the em ratio. */
                                    paddingLeft: null
                                },
                                elementUnitRatios = {},
                                /* Note: IE<=8 round to the nearest pixel when returning CSS values, thus we perform conversions using a measurement
                                   of 10 (instead of 1) to give our ratios a precision of at least 1 decimal value. */
                                measurement = 10;

                            /* For organizational purposes, current ratio calculations are consolidated onto the elementUnitRatios object. */
                            elementUnitRatios.remToPx = unitConversionRatios.remToPx;
                            elementUnitRatios.vwToPx = unitConversionRatios.vwToPx;
                            elementUnitRatios.vhToPx = unitConversionRatios.vhToPx;

                            /* After temporary unit conversion logic runs, width and height properties that were originally set to "auto" must be set back
                               to "auto" instead of to the actual corresponding pixel value. Leaving the values at their hard-coded pixel value equivalents
                               would inherently prevent the elements from vertically adjusting as the height of its inner content changes. */
                            /* IE tells us whether or not the property is set to "auto". Other browsers provide no way of determing "auto" values on height/width,
                               and thus we have to trigger additional layout thrashing (see below) to solve this. */
                            if (IE && !Data(element).isSVG) {
                                var isIEWidthAuto = /^auto$/i.test(element.currentStyle.width),
                                    isIEHeightAuto = /^auto$/i.test(element.currentStyle.height);
                            }

                            /* Note: To minimize layout thrashing, the ensuing unit conversion logic is split into batches to synchronize GETs and SETs. */
                            if (!sameBasePercent || !sameBaseEm) {
                                /* SVG elements have no concept of document flow, and don't support the full range of CSS properties,
                                   so we skip the unnecessary stripping of unapplied properties to avoid dirtying their HTML. */
                                if (!Data(element).isSVG) {
                                    originalValues.overflowX = CSS.getPropertyValue(element, "overflowX"); /* GET */
                                    originalValues.overflowY = CSS.getPropertyValue(element, "overflowY"); /* GET */
                                    originalValues.boxSizing = CSS.getPropertyValue(element, "boxSizing"); /* GET */

                                    /* Since % values are relative to their respective axes, ratios are calculated for both width and height.
                                       In contrast, only a single ratio is required for rem and em. */
                                    /* When calculating % values, we set a flag to indiciate that we want the computed value instead of offsetWidth/Height,
                                       which incorporate additional dimensions (such as padding and border-width) into their values. */
                                    originalValues.minWidth = CSS.getPropertyValue(element, "minWidth"); /* GET */
                                    /* Note: max-width/height must default to "none" when 0 is returned, otherwise the element cannot have its width/height set. */
                                    originalValues.maxWidth = CSS.getPropertyValue(element, "maxWidth") || "none"; /* GET */

                                    originalValues.minHeight = CSS.getPropertyValue(element, "minHeight"); /* GET */
                                    originalValues.maxHeight = CSS.getPropertyValue(element, "maxHeight") || "none"; /* GET */

                                    originalValues.paddingLeft = CSS.getPropertyValue(element, "paddingLeft"); /* GET */
                                }

                                originalValues.width = CSS.getPropertyValue(element, "width", null, true); /* GET */
                                originalValues.height = CSS.getPropertyValue(element, "height", null, true); /* GET */
                            }

                            if (sameBasePercent) {
                                elementUnitRatios.percentToPxRatioWidth = unitConversionRatios.lastPercentToPxWidth;
                                elementUnitRatios.percentToPxRatioHeight = unitConversionRatios.lastPercentToPxHeight;
                            } else {
                                if (!Data(element).isSVG) {
                                    CSS.setPropertyValue(element, "overflowX",  "hidden"); /* SET */
                                    CSS.setPropertyValue(element, "overflowY",  "hidden"); /* SET */
                                    CSS.setPropertyValue(element, "boxSizing",  "content-box"); /* SET */

                                    CSS.setPropertyValue(element, "minWidth", measurement + "%"); /* SET */
                                    CSS.setPropertyValue(element, "maxWidth", measurement + "%"); /* SET */

                                    CSS.setPropertyValue(element, "minHeight",  measurement + "%"); /* SET */
                                    CSS.setPropertyValue(element, "maxHeight",  measurement + "%"); /* SET */
                                }

                                CSS.setPropertyValue(element, "width", measurement + "%"); /* SET */
                                CSS.setPropertyValue(element, "height",  measurement + "%"); /* SET */
                            }

                            if (sameBaseEm) {
                                elementUnitRatios.emToPx = unitConversionRatios.lastEmToPx;
                            } else if (!Data(element).isSVG) {
                                CSS.setPropertyValue(element, "paddingLeft", measurement + "em"); /* SET */
                            }

                            /* The following pixel-value GETs cannot be batched with the prior GETs since they depend upon the values
                               temporarily set immediately above; layout thrashing cannot be avoided here. */
                            if (!sameBasePercent) {
                                /* Divide the returned value by the measurement value to get the ratio between 1% and 1px.
                                   Default to 1 since conversion logic using 0 can produce Infinite. */
                                elementUnitRatios.percentToPxRatioWidth = unitConversionRatios.lastPercentToPxWidth = (parseFloat(CSS.getPropertyValue(element, "width", null, true)) || 1) / measurement; /* GET */
                                elementUnitRatios.percentToPxRatioHeight = unitConversionRatios.lastPercentToPxHeight = (parseFloat(CSS.getPropertyValue(element, "height", null, true)) || 1) / measurement; /* GET */
                            }

                            if (!sameBaseEm) {
                                elementUnitRatios.emToPx = unitConversionRatios.lastEmToPx = (parseFloat(CSS.getPropertyValue(element, "paddingLeft")) || 1) / measurement; /* GET */
                            }

                            /* Revert each used test property to its original value. */
                            for (var originalValueProperty in originalValues) {
                                if (originalValues[originalValueProperty] !== null) {
                                    CSS.setPropertyValue(element, originalValueProperty, originalValues[originalValueProperty]); /* SETs */
                                }
                            }

                            /* SVG dimensions do not accept an "auto" value, so we skip this reset process for them. */
                            if (!Data(element).isSVG) {
                                /* In IE, revert to "auto" for width and height if it was originally set. */
                                if (IE) {
                                    if (isIEWidthAuto) {
                                        CSS.setPropertyValue(element, "width", "auto"); /* SET */
                                    }

                                    if (isIEHeightAuto) {
                                        CSS.setPropertyValue(element, "height", "auto"); /* SET */
                                    }
                                /* For other browsers, additional layout thrashing must unfortunately be triggered to determine whether a dimension property was originally "auto". */
                                } else {
                                    /* Set height to "auto" then compare the returned value against the element's current height value.
                                       If they're identical, leave height set to "auto". If they're different, then "auto" wasn't originally
                                       set on the element prior to our conversions, and we revert it to its actual value. */
                                    /* Note: The following GETs and SETs cannot be batched together due to the cross-effect setting one axis to "auto" has on the other. */
                                    CSS.setPropertyValue(element, "height", "auto"); /* SET */
                                    if (originalValues.height !== CSS.getPropertyValue(element, "height", null, true)) { /* GET */
                                        CSS.setPropertyValue(element, "height", originalValues.height); /* SET */
                                    }

                                    CSS.setPropertyValue(element, "width", "auto"); /* SET */
                                    if (originalValues.width !== CSS.getPropertyValue(element, "width", null, true)) { /* GET */
                                        CSS.setPropertyValue(element, "width", originalValues.width); /* SET */
                                    }
                                }
                            }

                            if (Velocity.debug >= 1) console.log("Unit ratios: " + JSON.stringify(elementUnitRatios), element);

                            return elementUnitRatios;
                        }

                        /* The * and / operators, which are not passed in with an associated unit, inherently use startValue's unit. Skip value and unit conversion. */
                        if (/[\/*]/.test(operator)) {
                            endValueUnitType = startValueUnitType;
                        /* If startValue and endValue differ in unit type, convert startValue into the same unit type as endValue so that if endValueUnitType
                           is a relative unit (%, em, rem), the values set during tweening will continue to be accurately relative even if the metrics they depend
                           on are dynamically changing during the course of the animation. Conversely, if we always normalized into px and used px for setting values, the px ratio
                           would become stale if the original unit being animated toward was relative and the underlying metrics change during the animation. */
                        /* Since 0 is 0 in any unit type, no conversion is necessary when startValue is 0 -- we just start at 0 with endValueUnitType. */
                        } else if ((startValueUnitType !== endValueUnitType) && startValue !== 0) {
                            /* Unit conversion is also skipped when endValue is 0, but *startValueUnitType* must be used for tween values to remain accurate. */
                            /* Note: Skipping unit conversion here means that if endValueUnitType was originally a relative unit, the animation won't relatively
                               match the underlying metrics if they change, but this is acceptable since we're animating toward invisibility instead of toward visibility,
                               which remains past the point of the animation's completion. */
                            if (endValue === 0) {
                                endValueUnitType = startValueUnitType;
                            } else {
                                /* By this point, we cannot avoid unit conversion (it's undesirable since it causes layout thrashing).
                                   If we haven't already, we trigger calculateUnitRatios(), which runs once per element per call. */
                                elementUnitRatios = elementUnitRatios || calculateUnitRatios();

                                /* The following RegEx matches CSS properties that have their % values measured relative to the x-axis. */
                                /* Note: W3C spec mandates that all of margin and padding's properties (even top and bottom) are %-relative to the *width* of the parent element. */
                                var axis = (/margin|padding|left|right|width|text|word|letter/i.test(property) || /X$/.test(property)) ? "x" : "y";

                                /* In order to avoid generating n^2 bespoke conversion functions, unit conversion is a two-step process:
                                   1) Convert startValue into pixels. 2) Convert this new pixel value into endValue's unit type. */
                                switch (startValueUnitType) {
                                    case "%":
                                        /* Note: translateX and translateY are the only properties that are %-relative to an element's own dimensions -- not its parent's dimensions.
                                           Velocity does not include a special conversion process to account for this behavior. Therefore, animating translateX/Y from a % value
                                           to a non-% value will produce an incorrect start value. Fortunately, this sort of cross-unit conversion is rarely done by users in practice. */
                                        startValue *= (axis === "x" ? elementUnitRatios.percentToPxRatioWidth : elementUnitRatios.percentToPxRatioHeight);
                                        break;

                                    case "px":
                                        /* px acts as our midpoint in the unit conversion process; do nothing. */
                                        break;

                                    default:
                                        startValue *= elementUnitRatios[startValueUnitType + "ToPx"];
                                }

                                /* Invert the px ratios to convert into to the target unit. */
                                switch (endValueUnitType) {
                                    case "%":
                                        startValue *= 1 / (axis === "x" ? elementUnitRatios.percentToPxRatioWidth : elementUnitRatios.percentToPxRatioHeight);
                                        break;

                                    case "px":
                                        /* startValue is already in px, do nothing; we're done. */
                                        break;

                                    default:
                                        startValue *= 1 / elementUnitRatios[endValueUnitType + "ToPx"];
                                }
                            }
                        }

                        /***********************
                            Value Operators
                        ***********************/

                        /* Operator logic must be performed last since it requires unit-normalized start and end values. */
                        /* Note: Relative *percent values* do not behave how most people think; while one would expect "+=50%"
                           to increase the property 1.5x its current value, it in fact increases the percent units in absolute terms:
                           50 points is added on top of the current % value. */
                        switch (operator) {
                            case "+":
                                endValue = startValue + endValue;
                                break;

                            case "-":
                                endValue = startValue - endValue;
                                break;

                            case "*":
                                endValue = startValue * endValue;
                                break;

                            case "/":
                                endValue = startValue / endValue;
                                break;
                        }

                        /**************************
                           tweensContainer Push
                        **************************/

                        /* Construct the per-property tween object, and push it to the element's tweensContainer. */
                        tweensContainer[property] = {
                            rootPropertyValue: rootPropertyValue,
                            startValue: startValue,
                            currentValue: startValue,
                            endValue: endValue,
                            unitType: endValueUnitType,
                            easing: easing
                        };

                        if (Velocity.debug) console.log("tweensContainer (" + property + "): " + JSON.stringify(tweensContainer[property]), element);
                    }

                    /* Along with its property data, store a reference to the element itself onto tweensContainer. */
                    tweensContainer.element = element;
                }

                /*****************
                    Call Push
                *****************/

                /* Note: tweensContainer can be empty if all of the properties in this call's property map were skipped due to not
                   being supported by the browser. The element property is used for checking that the tweensContainer has been appended to. */
                if (tweensContainer.element) {
                    /* Apply the "velocity-animating" indicator class. */
                    CSS.Values.addClass(element, "velocity-animating");

                    /* The call array houses the tweensContainers for each element being animated in the current call. */
                    call.push(tweensContainer);

                    /* Store the tweensContainer on the element, plus the current call's opts so that Velocity can reference this data the next time this element is animated. */
                    Data(element).tweensContainer = tweensContainer;
                    Data(element).opts = opts;
                    /* Switch on the element's animating flag. */
                    Data(element).isAnimating = true;

                    /* Once the final element in this call's element set has been processed, push the call array onto
                       Velocity.State.calls for the animation tick to immediately begin processing. */
                    if (elementsIndex === elementsLength - 1) {
                        /* To speed up iterating over this array, it is compacted (falsey items -- calls that have completed -- are removed)
                           when its length has ballooned to a point that can impact tick performance. This only becomes necessary when animation
                           has been continuous with many elements over a long period of time; whenever all active calls are completed, completeCall() clears Velocity.State.calls. */
                        if (Velocity.State.calls.length > 10000) {
                            Velocity.State.calls = compactSparseArray(Velocity.State.calls);
                        }

                        /* Add the current call plus its associated metadata (the element set and the call's options) onto the global call container.
                           Anything on this call container is subjected to tick() processing. */
                        Velocity.State.calls.push([ call, elements, opts, null, promiseData.resolver ]);

                        /* If the animation tick isn't running, start it. (Velocity shuts it off when there are no active calls to process.) */
                        if (Velocity.State.isTicking === false) {
                            Velocity.State.isTicking = true;

                            /* Start the tick loop. */
                            tick();
                        }
                    } else {
                        elementsIndex++;
                    }
                }
            }

            /* When the queue option is set to false, the call skips the element's queue and fires immediately. */
            if (opts.queue === false) {
                /* Since this buildQueue call doesn't respect the element's existing queue (which is where a delay option would have been appended),
                   we manually inject the delay property here with an explicit setTimeout. */
                if (opts.delay) {
                    setTimeout(buildQueue, opts.delay);
                } else {
                    buildQueue();
                }
            /* Otherwise, the call undergoes element queueing as normal. */
            /* Note: To interoperate with jQuery, Velocity uses jQuery's own $.queue() stack for queuing logic. */
            } else {
                $.queue(element, opts.queue, function(next, clearQueue) {
                    /* If the clearQueue flag was passed in by the stop command, resolve this call's promise. (Promises can only be resolved once,
                       so it's fine if this is repeatedly triggered for each element in the associated call.) */
                    if (clearQueue === true) {
                        if (promiseData.promise) {
                            promiseData.resolver(elements);
                        }

                        /* Do not continue with animation queueing. */
                        return true;
                    }
                    
                    /* This flag indicates to the upcoming completeCall() function that this queue entry was initiated by Velocity.
                       See completeCall() for further details. */
                    Velocity.velocityQueueEntryFlag = true;

                    buildQueue(next);
                });
            }

            /*********************
                Auto-Dequeuing
            *********************/

            /* As per jQuery's $.queue() behavior, to fire the first non-custom-queue entry on an element, the element
               must be dequeued if its queue stack consists *solely* of the current call. (This can be determined by checking
               for the "inprogress" item that jQuery prepends to active queue stack arrays.) Regardless, whenever the element's
               queue is further appended with additional items -- including $.delay()'s or even $.animate() calls, the queue's
               first entry is automatically fired. This behavior contrasts that of custom queues, which never auto-fire. */
            /* Note: When an element set is being subjected to a non-parallel Velocity call, the animation will not begin until
               each one of the elements in the set has reached the end of its individually pre-existing queue chain. */
            /* Note: Unfortunately, most people don't fully grasp jQuery's powerful, yet quirky, $.queue() function.
               Lean more here: http://stackoverflow.com/questions/1058158/can-somebody-explain-jquery-queue-to-me */
            if ((opts.queue === "" || opts.queue === "fx") && $.queue(element)[0] !== "inprogress") {
                $.dequeue(element);
            }
        }

        /**************************
           Element Set Iteration
        **************************/

        /* If the "nodeType" property exists on the elements variable, we're animating a single element.
           Place it in an array so that $.each() can iterate over it. */
        $.each(Type.isNode(elements) ? [ elements ] : elements, function(i, element) {
            /* Ensure each element in a set has a nodeType (is a real element) to avoid throwing errors. */
            if (Type.isNode(element)) {
                processElement.call(element);
            }
        });

        /******************
           Option: Loop
        ******************/

        /* The loop option accepts an integer indicating how many times the element should loop between the values in the
           current call's properties map and the element's property values prior to this call. */
        /* Note: The loop option's logic is performed here -- after element processing -- because the current call needs
           to undergo its queue insertion prior to the loop option generating its series of constituent "reverse" calls,
           which chain after the current call. Two reverse calls (two "alternations") constitute one loop. */
        var opts = $.extend({}, Velocity.defaults, options),
            reverseCallsCount;

        opts.loop = parseInt(opts.loop);
        reverseCallsCount = (opts.loop * 2) - 1;

        if (opts.loop) {
            /* Double the loop count to convert it into its appropriate number of "reverse" calls.
               Subtract 1 from the resulting value since the current call is included in the total alternation count. */
            for (var x = 0; x < reverseCallsCount; x++) {
                /* Since the logic for the reverse action occurs inside Queueing and therefore this call's options object
                   isn't parsed until then as well, the current call's delay option must be explicitly passed into the reverse
                   call so that the delay logic that occurs inside *Pre-Queueing* can process it. */
                var reverseOptions = {
                    delay: opts.delay
                };

                /* If a complete callback was passed into this call, transfer it to the loop sequence's final "reverse" call
                   so that it's triggered when the entire sequence is complete (and not when the very first animation is complete). */
                if (opts.complete && (x === reverseCallsCount - 1)) {
                    reverseOptions.complete = opts.complete;
                }

                Velocity.animate(elements, "reverse", reverseOptions);
            }
        }

        /***************
            Chaining
        ***************/

        /* Return the elements back to the call chain, with wrapped elements taking precedence in case Velocity was called via the $.fn. extension. */
        return getChain();
    };

    /*****************************
       Tick (Calls Processing)
    *****************************/

    /* Note: All calls to Velocity are pushed to the Velocity.State.calls array, which is fully iterated through upon each tick. */
    function tick (timestamp) {
        /* An empty timestamp argument indicates that this is the first tick occurence since ticking was turned on.
           We leverage this metadata to fully ignore the first tick pass since RAF's initial pass is fired whenever
           the browser's next tick sync time occurs, which results in the first elements subjected to Velocity
           calls being animated out of sync with any elements animated immediately thereafter. In short, we ignore
           the first RAF tick pass so that elements being immediately consecutively animated -- instead of simultaneously animated
           by the same Velocity call -- are properly batched into the same initial RAF tick and consequently remain in sync thereafter. */
        if (timestamp) {
            /* We ignore RAF's high resolution timestamp since it can be significantly offset when the browser is
               under high stress; we opt for choppiness over allowing the browser to drop huge chunks of frames. */
            var timeCurrent = (new Date).getTime();

            /********************
               Call Iteration
            ********************/

            /* Iterate through each active call. */
            for (var i = 0, callsLength = Velocity.State.calls.length; i < callsLength; i++) {
                /* When a velocity call is completed, its Velocity.State.calls entry is set to false. Continue on to the next call. */
                if (!Velocity.State.calls[i]) {
                    continue;
                }

                /************************
                   Call-Wide Variables
                ************************/

                var callContainer = Velocity.State.calls[i],
                    call = callContainer[0],
                    opts = callContainer[2],
                    timeStart = callContainer[3];

                /* If timeStart is undefined, then this is the first time that this call has been processed by tick().
                   We assign timeStart now so that its value is as close to the real animation start time as possible.
                   (Conversely, had timeStart been defined when this call was added to Velocity.State.calls, the delay
                   between that time and now would cause the first few frames of the tween to be skipped since
                   percentComplete is calculated relative to timeStart.) */
                /* Further, subtract 16ms (the approximate resolution of RAF) from the current time value so that the
                   first tick iteration isn't wasted by animating at 0% tween completion, which would produce the
                   same style value as the element's current value. */
                if (!timeStart) {
                    timeStart = Velocity.State.calls[i][3] = timeCurrent - 16;
                }

                /* The tween's completion percentage is relative to the tween's start time, not the tween's start value
                   (which would result in unpredictable tween durations since JavaScript's timers are not particularly accurate).
                   Accordingly, we ensure that percentComplete does not exceed 1. */
                var percentComplete = Math.min((timeCurrent - timeStart) / opts.duration, 1);

                /**********************
                   Element Iteration
                **********************/

                /* For every call, iterate through each of the elements in its set. */
                for (var j = 0, callLength = call.length; j < callLength; j++) {
                    var tweensContainer = call[j],
                        element = tweensContainer.element;

                    /* Check to see if this element has been deleted midway through the animation by checking for the
                       continued existence of its data cache. If it's gone, skip animating this element. */
                    if (!Data(element)) {
                        continue;
                    }

                    var transformPropertyExists = false;

                    /**********************************
                       Display & Visibility Toggling
                    **********************************/

                    /* If the display option is set to non-"none", set it upfront so that the element can become visible before tweening begins.
                       (Otherwise, display's "none" value is set in completeCall() once the animation has completed.) */
                    if (opts.display && opts.display !== "none") {
                        CSS.setPropertyValue(element, "display", opts.display);
                    }

                    /* Same goes with the visibility option, but its "none" equivalent is "hidden". */
                    if (opts.visibility && opts.visibility !== "hidden") {
                        CSS.setPropertyValue(element, "visibility", opts.visibility);
                    }

                    /************************
                       Property Iteration
                    ************************/

                    /* For every element, iterate through each property. */
                    for (var property in tweensContainer) {
                        /* Note: In addition to property tween data, tweensContainer contains a reference to its associated element. */
                        if (property !== "element") {
                            var tween = tweensContainer[property],
                                currentValue,
                                /* Easing can either be a pre-genereated function or a string that references a pre-registered easing
                                   on the Velocity.Easings object. In either case, return the appropriate easing *function*. */
                                easing = Type.isString(tween.easing) ? Velocity.Easings[tween.easing] : tween.easing;

                            /******************************
                               Current Value Calculation
                            ******************************/

                            /* If this is the last tick pass (if we've reached 100% completion for this tween),
                               ensure that currentValue is explicitly set to its target endValue so that it's not subjected to any rounding. */
                            if (percentComplete === 1) {
                                currentValue = tween.endValue;
                            /* Otherwise, calculate currentValue based on the current delta from startValue. */
                            } else {
                                currentValue = tween.startValue + ((tween.endValue - tween.startValue) * easing(percentComplete));
                            }

                            tween.currentValue = currentValue;

                            /******************
                               Hooks: Part I
                            ******************/

                            /* For hooked properties, the newly-updated rootPropertyValueCache is cached onto the element so that it can be used
                               for subsequent hooks in this call that are associated with the same root property. If we didn't cache the updated
                               rootPropertyValue, each subsequent update to the root property in this tick pass would reset the previous hook's
                               updates to rootPropertyValue prior to injection. A nice performance byproduct of rootPropertyValue caching is that
                               subsequently chained animations using the same hookRoot but a different hook can use this cached rootPropertyValue. */
                            if (CSS.Hooks.registered[property]) {
                                var hookRoot = CSS.Hooks.getRoot(property),
                                    rootPropertyValueCache = Data(element).rootPropertyValueCache[hookRoot];

                                if (rootPropertyValueCache) {
                                    tween.rootPropertyValue = rootPropertyValueCache;
                                }
                            }

                            /*****************
                                DOM Update
                            *****************/

                            /* setPropertyValue() returns an array of the property name and property value post any normalization that may have been performed. */
                            /* Note: To solve an IE<=8 positioning bug, the unit type is dropped when setting a property value of 0. */
                            var adjustedSetData = CSS.setPropertyValue(element, /* SET */
                                                                       property,
                                                                       tween.currentValue + (parseFloat(currentValue) === 0 ? "" : tween.unitType),
                                                                       tween.rootPropertyValue,
                                                                       tween.scrollData);

                            /*******************
                               Hooks: Part II
                            *******************/

                            /* Now that we have the hook's updated rootPropertyValue (the post-processed value provided by adjustedSetData), cache it onto the element. */
                            if (CSS.Hooks.registered[property]) {
                                /* Since adjustedSetData contains normalized data ready for DOM updating, the rootPropertyValue needs to be re-extracted from its normalized form. ?? */
                                if (CSS.Normalizations.registered[hookRoot]) {
                                    Data(element).rootPropertyValueCache[hookRoot] = CSS.Normalizations.registered[hookRoot]("extract", null, adjustedSetData[1]);
                                } else {
                                    Data(element).rootPropertyValueCache[hookRoot] = adjustedSetData[1];
                                }
                            }

                            /***************
                               Transforms
                            ***************/

                            /* Flag whether a transform property is being animated so that flushTransformCache() can be triggered once this tick pass is complete. */
                            if (adjustedSetData[0] === "transform") {
                                transformPropertyExists = true;
                            }
                        }
                    }

                    /****************
                        mobileHA
                    ****************/

                    /* If mobileHA is enabled, set the translate3d transform to null to force hardware acceleration.
                       It's safe to override this property since Velocity doesn't actually support its animation (hooks are used in its place). */
                    if (opts.mobileHA) {
                        /* Don't set the null transform hack if we've already done so. */
                        if (Data(element).transformCache.translate3d === undefined) {
                            /* All entries on the transformCache object are later concatenated into a single transform string via flushTransformCache(). */
                            Data(element).transformCache.translate3d = "(0px, 0px, 0px)";

                            transformPropertyExists = true;
                        }
                    }

                    if (transformPropertyExists) {
                        CSS.flushTransformCache(element);
                    }
                }

                /* The non-"none" display value is only applied to an element once -- when its associated call is first ticked through.
                   Accordingly, it's set to false so that it isn't re-processed by this call in the next tick. */
                if (opts.display && opts.display !== "none") {
                    Velocity.State.calls[i][2].display = false;
                }

                if (opts.visibility && opts.visibility !== "hidden") {
                    Velocity.State.calls[i][2].visibility = false;
                }

                /* Pass the elements and the timing data (percentComplete, msRemaining, and timeStart) into the progress callback. */
                if (opts.progress) {
                    opts.progress.call(callContainer[1],
                                       callContainer[1],
                                       percentComplete,
                                       Math.max(0, (timeStart + opts.duration) - timeCurrent),
                                       timeStart);
                }

                /* If this call has finished tweening, pass its index to completeCall() to handle call cleanup. */
                if (percentComplete === 1) {
                    completeCall(i);
                }
            }
        }

        /* Note: completeCall() sets the isTicking flag to false when the last call on Velocity.State.calls has completed. */
        if (Velocity.State.isTicking) {
            rAF(tick);
        }
    }

    /**********************
        Call Completion
    **********************/

    /* Note: Unlike tick(), which processes all active calls at once, call completion is handled on a per-call basis. */
    function completeCall (callIndex, isStopped) {
        /* Ensure the call exists. */
        if (!Velocity.State.calls[callIndex]) {
            return false;
        }

        /* Pull the metadata from the call. */
        var call = Velocity.State.calls[callIndex][0],
            elements = Velocity.State.calls[callIndex][1],
            opts = Velocity.State.calls[callIndex][2],
            resolver = Velocity.State.calls[callIndex][4];

        var remainingCallsExist = false;

        /*************************
           Element Finalization
        *************************/

        for (var i = 0, callLength = call.length; i < callLength; i++) {
            var element = call[i].element;

            /* If the user set display to "none" (intending to hide the element), set it now that the animation has completed. */
            /* Note: display:none isn't set when calls are manually stopped (via Velocity.animate("stop"). */
            /* Note: Display is ignored with "reverse" calls, which is what loops are composed of, since this behavior would be undesirable. */
            if (!isStopped && !opts.loop) {
                if (opts.display === "none") {
                    CSS.setPropertyValue(element, "display", opts.display);
                }

                if (opts.visibility === "hidden") {
                    CSS.setPropertyValue(element, "visibility", opts.visibility);
                }
            }

            /* If the element's queue is empty (if only the "inprogress" item is left at position 0) or if its queue is about to run
               a non-Velocity-initiated entry, turn off the isAnimating flag. A non-Velocity-initiatied queue entry's logic might alter
               an element's CSS values and thereby cause Velocity's cached value data to go stale. To detect if a queue entry was initiated by Velocity,
               we check for the existence of our special Velocity.queueEntryFlag declaration, which minifiers won't rename since the flag
               is assigned to jQuery's global $ object and thus exists out of Velocity's own scope. */
            if ($.queue(element)[1] === undefined || !/\.velocityQueueEntryFlag/i.test($.queue(element)[1])) {
                /* The element may have been deleted. Ensure that its data cache still exists before acting on it. */
                if (Data(element)) {
                    Data(element).isAnimating = false;
                    /* Clear the element's rootPropertyValueCache, which will become stale. */
                    Data(element).rootPropertyValueCache = {};

                    var transformHAPropertyExists = false;
                    /* If any transform subproperty is at its default value (regardless of unit type), remove it. This has the
                       dual benefit of avoiding random browser transform bugs and removing hardware acceleration to free up RAM. */
                    $.each(Data(element).transformCache, function(transformName, transformValue) {
                        var defaultValue = /^scale/.test(transformName) ? 1 : 0;

                        if (new RegExp("^\\(" + defaultValue + "[^.]").test(transformValue)) {
                            transformHAPropertyExists = true;
                            delete Data(element).transformCache[transformName];
                        }
                    });

                    /* Mobile devices have hardware acceleration removed at the end of the animation in order to avoid hogging the GPU's memory. */
                    if (opts.mobileHA) {
                        transformHAPropertyExists = true;
                        delete Data(element).transformCache.translate3d;
                    }

                    /* Flush the subproperty removals to the DOM. */
                    if (transformHAPropertyExists) {
                        CSS.flushTransformCache(element);
                    }

                    /* Remove the "velocity-animating" indicator class. */
                    CSS.Values.removeClass(element, "velocity-animating");
                }
            }

            /*********************
               Option: Complete
            *********************/

            /* Complete is fired once per call (not once per element) and is passed the full raw DOM element set as both its context and its first argument. */
            /* Note: Callbacks aren't fired when calls are manually stopped (via Velocity.animate("stop"). */
            /* Note: If this is a loop, complete callback firing is only triggered on the loop's final reverse call. */
            if (!isStopped && opts.complete && !opts.loop && (i === callLength - 1)) {
                /* We throw callbacks in a setTimeout so that thrown errors don't halt the execution of Velocity itself. */
                try {
                    opts.complete.call(elements, elements);
                } catch (error) { 
                    setTimeout(function() {
                        throw error;
                    }, 1);
                }
            }

            /**********************
               Promise Resolving
            **********************/

            if (resolver) {
                resolver(elements);
            }

            /***************
               Dequeueing
            ***************/

            /* Fire the next call in the queue so long as this call's queue wasn't set to false (to trigger a parallel animation),
               which would have already caused the next call to fire. Note: Even if the end of the animation queue has been reached,
               $.dequeue() must still be called in order to completely clear jQuery's animation queue. */
            if (opts.queue !== false) {
                $.dequeue(element, opts.queue);
            }
        }

        /************************
           Calls Array Cleanup
        ************************/

        /* Since this call is complete, set it to false so that the rAF tick skips it. This array is later compacted via compactSparseArray().
          (For performance reasons, the call is set to false instead of being deleted from the array: http://www.html5rocks.com/en/tutorials/speed/v8/) */
        Velocity.State.calls[callIndex] = false;

        /* Iterate through the calls array to determine if this was the final in-progress animation.
           If so, set a flag to end ticking and clear the calls array. */
        for (var j = 0, callsLength = Velocity.State.calls.length; j < callsLength; j++) {
            if (Velocity.State.calls[j] !== false) {
                remainingCallsExist = true;

                break;
            }
        }

        if (remainingCallsExist === false) {
            /* tick() will detect this flag upon its next iteration and subsequently turn itself off. */
            Velocity.State.isTicking = false;

            /* Clear the calls array so that its length is reset. */
            delete Velocity.State.calls;
            Velocity.State.calls = [];
        }
    }

    /*******************
        Installation
    *******************/

    /* Both jQuery and Zepto allow their $.fn object to be extended to allow wrapped elements to be subjected to plugin calls.
       If either framework is loaded, register a "velocity" extension pointing to Velocity's core animate() method. */
    var framework = window.jQuery || window.Zepto;

    if (framework) {
        /* Assign the object function to Velocity's animate() method. */
        framework.fn.velocity = Velocity.animate;

        /* Assign the object function's defaults to Velocity's global defaults object. */
        framework.fn.velocity.defaults = Velocity.defaults;
    }

    /* Support for AMD and CommonJS module loaders. */
    if (typeof define !== "undefined" && define.amd) {
        define(function() { return Velocity; });
    } else if (typeof module !== "undefined" && module.exports) {
        module.exports = Velocity;
    }

    /***********************
       Packaged Sequences
    ***********************/

    /* slideUp, slideDown */
    $.each([ "Down", "Up" ], function(i, direction) {
        Velocity.Sequences["slide" + direction] = function (element, options) {
            var opts = $.extend({}, options),
                originalValues = {
                    height: null,
                    marginTop: null,
                    marginBottom: null,
                    paddingTop: null,
                    paddingBottom: null,
                    overflow: null,
                    overflowX: null,
                    overflowY: null
                },
                /* Since the slide functions make use of the begin and complete callbacks, the user's custom callbacks are stored
                   upfront for triggering once slideDown/Up's own callback logic is complete. */
                begin = opts.begin,
                complete = opts.complete,
                isHeightAuto = false;

            /* Allow the user to set display to null to bypass display toggling. */
            if (opts.display !== null) {
                /* Unless the user is overriding the display value, show the element before slideDown begins and hide the element after slideUp completes. */
                if (direction === "Down") {
                    /* All sliding elements are set to the "block" display value (as opposed to an element-appropriate block/inline distinction)
                       because inline elements cannot actually have their dimensions modified. */
                    opts.display = opts.display || "auto";
                } else {
                    opts.display = opts.display || "none";
                }
            }

            /* Begin callback. */
            opts.begin = function () {
                /* Check for height: "auto" so we can revert back to it when the sliding animation is complete. */
                function checkHeightAuto() {
                    originalValues.height = parseFloat(Velocity.CSS.getPropertyValue(element, "height"));

                    /* Determine if height was originally "auto" by checking if the computed "auto" value is identical to the original value. */
                    element.style.height = "auto";
                    if (parseFloat(Velocity.CSS.getPropertyValue(element, "height")) === originalValues.height) {
                        isHeightAuto = true;
                    }

                    /* Revert to the computed value before sliding begins to prevent vertical popping due to scrollbars. */
                    Velocity.CSS.setPropertyValue(element, "height", originalValues.height + "px");
                }

                if (direction === "Down") {
                    originalValues.overflow = [ Velocity.CSS.getPropertyValue(element, "overflow"), 0 ];
                    originalValues.overflowX = [ Velocity.CSS.getPropertyValue(element, "overflowX"), 0 ];
                    originalValues.overflowY = [ Velocity.CSS.getPropertyValue(element, "overflowY"), 0 ];

                    /* Ensure the element is visible, and temporarily remove vertical scrollbars since animating them is visually unappealing. */
                    element.style.overflow = "hidden";
                    element.style.overflowX = "visible";
                    element.style.overflowY = "hidden";

                    /* With the scrollars no longer affecting sizing, determine whether the element is currently height: "auto". */
                    checkHeightAuto();

                    /* Cache the elements' original vertical dimensional values so that we can animate back to them. */
                    for (var property in originalValues) {
                        /* Overflow values have already been cached; do not overwrite them with "hidden". */
                        if (/^overflow/.test(property)) {
                            continue;
                        }

                        var propertyValue = Velocity.CSS.getPropertyValue(element, property);

                        if (property === "height") {
                            propertyValue = parseFloat(propertyValue);
                        }

                        /* Use forcefeeding to animate slideDown properties from 0. */
                        originalValues[property] = [ propertyValue, 0 ];
                    }
                } else {
                    checkHeightAuto();

                    for (var property in originalValues) {
                        var propertyValue = Velocity.CSS.getPropertyValue(element, property);

                        if (property === "height") {
                            propertyValue = parseFloat(propertyValue);
                        }

                        /* Use forcefeeding to animate slideUp properties toward 0. */
                        originalValues[property] = [ 0, propertyValue ];
                    }

                    /* Both directions hide scrollbars since scrollbar height tweening looks unappealing. */
                    element.style.overflow = "hidden";
                    element.style.overflowX = "visible";
                    element.style.overflowY = "hidden";
                }

                /* If the user passed in a begin callback, fire it now. */
                if (begin) {
                    begin.call(element, element);
                }
            }

            /* Complete callback. */
            opts.complete = function (element) {
                var propertyValuePosition = (direction === "Down") ? 0 : 1;

                if (isHeightAuto === true) {
                    /* If the element's height was originally set to auto, overwrite the computed value with "auto". */
                    originalValues.height[propertyValuePosition] = "auto";
                } else {
                    originalValues.height[propertyValuePosition] += "px";
                }

                /* Reset element to its original values once its slide animation is complete: For slideDown, overflow
                   values are reset. For slideUp, all values are reset (since they were animated to 0).) */
                for (var property in originalValues) {
                    element.style[property] = originalValues[property][propertyValuePosition];
                }

                /* If the user passed in a complete callback, fire it now. */
                if (complete) {
                    complete.call(element, element);
                }
            };

            /* Animation triggering. */
            Velocity.animate(element, originalValues, opts);
        };
    });

    /* fadeIn, fadeOut */
    $.each([ "In", "Out" ], function(i, direction) {
        Velocity.Sequences["fade" + direction] = function (element, options, elementsIndex, elementsSize) {
            var opts = $.extend({}, options),
                propertiesMap = {
                    opacity: (direction === "In") ? 1 : 0
                };

            /* Since sequences are triggered individually for each element in the animated set, avoid repeatedly triggering
               callbacks by firing them only when the final element has been reached. */
            if (elementsIndex !== elementsSize - 1) {
                opts.complete = opts.begin = null;
            }

            /* If a display was passed in, use it. Otherwise, default to "none" for fadeOut or the element-specific default for fadeIn. */
            /* Note: We allow users to pass in "null" to skip display setting altogether. */
            if (opts.display !== null) {
                opts.display = opts.display || ((direction === "In") ? "auto" : "none");
            }

            Velocity.animate(this, propertiesMap, opts);
        };
    });
})((window.jQuery || window.Zepto || window), window, document);

/******************
   Known Issues
******************/

/* When animating height/width to a % value on an element *without* box-sizing:border-box and *with* visible scrollbars
   on *both* axes, the opposite axis (e.g. height vs width) will be shortened by the height/width of its scrollbar. */

/* The CSS spec mandates that the translateX/Y/Z transforms are %-relative to the element itself -- not its parent.
   Velocity, however, doesn't make this distinction. Thus, converting to or from the % unit with these subproperties
   will produce an inaccurate conversion value. The same issue exists with the cx/cy attributes of SVG circles and ellipses. */
; browserify_shim__define__module__export__(typeof velocity != "undefined" ? velocity : window.velocity);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){
;__browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
/***************
    Details
***************/

/*!
* velocity.ui.js: UI effects pack for Velocity. Load this file after jquery.velocity.js.
* @version 4.0.6
* @docs http://velocityjs.org/#uiPack
* @support <=IE8: Callouts will have no effect, and transitions will simply fade in/out. IE9/Android 2.3: Most effects are fully supported, the rest fade in/out. All other browsers: Full support.
* @license Copyright Julian Shapiro. MIT License: http://en.wikipedia.org/wiki/MIT_License
* @license Indicated portions adapted from Animate.css, copyright Daniel Eden. MIT License: http://en.wikipedia.org/wiki/MIT_License
* @license Indicated portions adapted from Magic.css, copyright Christian Pucci. MIT License: http://en.wikipedia.org/wiki/MIT_License
*/   

(function() {

    /*************
        Setup
    *************/

    var Container = (window.jQuery || window.Zepto || window);

    if (!Container.Velocity || !Container.Velocity.Utilities) {
        console.log("Velocity UI Pack: Velocity must be loaded first. Aborting.");

        return;
    }

    if (!Container.Velocity.version || (Container.Velocity.version.major <= 0 && Container.Velocity.version.minor <= 5 && Container.Velocity.version.patch <= 2)) {
        var abortError = "Velocity UI Pack: You need to update Velocity (jquery.velocity.js) to a newer version. Visit http://github.com/julianshapiro/velocity.";

        alert(abortError);
        throw new Error(abortError);
    }

    /******************
       Registration
    ******************/

    Container.Velocity.RegisterUI = function (effectName, properties) {
        /* Animate the expansion/contraction of the elements' parent's height for In/Out effects. */
        function animateParentHeight (elements, direction, totalDuration, stagger) {
            var totalHeightDelta = 0,
                parentNode;

            /* Sum the total height (including padding and margin) of all targeted elements. */
            Container.Velocity.Utilities.each(elements, function(i, element) {
                if (stagger) {
                    /* Increase the totalDuration by the successive delay amounts produced by the stagger option. */
                    totalDuration += i * stagger;
                }

                parentNode = element.parentNode;

                Container.Velocity.Utilities.each([ "height", "paddingTop", "paddingBottom", "marginTop", "marginBottom"], function(i, property) {
                    totalHeightDelta += parseFloat(Container.Velocity.CSS.getPropertyValue(element, property));
                });
            });

            /* Animate the parent element's height adjustment (with a varying duration multiplier for aesthetic benefits). */
            Container.Velocity.animate(
                parentNode,
                { height: (direction === "In" ? "+" : "-") + "=" + totalHeightDelta },
                { queue: false, easing: "ease-in-out", duration: totalDuration * (direction === "In" ? 0.6 : 1) }
            );
        }

        /* Register a custom sequence for each effect. */
        Container.Velocity.Sequences[effectName] = function (element, sequenceOptions, elementsIndex, elementsSize, elements, promiseData) {
            var finalElement = (elementsIndex === elementsSize - 1);

            /* Iterate through each effect's call array. */
            for (var callIndex = 0; callIndex < properties.calls.length; callIndex++) {
                var call = properties.calls[callIndex],
                    propertyMap = call[0],
                    sequenceDuration = (sequenceOptions.duration || properties.defaultDuration || 1000),
                    durationPercentage = call[1],
                    callOptions = call[2] || {},
                    opts = {};

                /* Assign the whitelisted per-call options. */
                opts.duration = sequenceDuration * (durationPercentage || 1);
                opts.queue = sequenceOptions.queue || "";
                opts.easing = callOptions.easing || "ease";
                opts.delay = callOptions.delay || 0;

                /* Special processing for the first effect call. */
                if (callIndex === 0) {
                    /* If a delay was passed into the sequence, combine it with the first call's delay. */
                    opts.delay += (sequenceOptions.delay || 0);

                    if (elementsIndex === 0) {
                        opts.begin = function() {
                            /* Only trigger a begin callback on the first effect call with the first element in the set. */
                            sequenceOptions.begin && sequenceOptions.begin.call(elements, elements);

                            /* Only trigger animateParentHeight() if we're using an In/Out transition. */
                            var direction = effectName.match(/(In|Out)$/);
                            if (sequenceOptions.animateParentHeight && direction) {
                                animateParentHeight(elements, direction[0], sequenceDuration + opts.delay, sequenceOptions.stagger);
                            }
                        }
                    }

                    /* If the user isn't overriding the display option, default to "auto" for "In"-suffixed transitions. */
                    if (sequenceOptions.display !== null) {
                        if (sequenceOptions.display && sequenceOptions.display !== "none") {
                            opts.display = sequenceOptions.display;
                        } else if (/In$/.test(effectName)) {
                            /* Inline elements cannot be subjected to transforms, so we switch them to inline-block. */
                            var defaultDisplay = Container.Velocity.CSS.Values.getDisplayType(element);
                            opts.display = (defaultDisplay === "inline") ? "inline-block" : defaultDisplay;
                        }
                    }

                    if (sequenceOptions.visibility && sequenceOptions.visibility !== "hidden") {
                        opts.visibility = sequenceOptions.visibility;
                    }
                }

                /* Special processing for the last effect call. */
                if (callIndex === properties.calls.length - 1) {
                    /* Append promise resolving onto the user's sequence callback. */ 
                    function injectFinalCallbacks () {
                        if ((sequenceOptions.display === undefined || sequenceOptions.display === "none") && /Out$/.test(effectName)) {
                            Container.Velocity.Utilities.each(elements, function(i, element) {
                                Container.Velocity.CSS.setPropertyValue(element, "display", "none");
                            });
                        }

                        sequenceOptions.complete && sequenceOptions.complete.call(elements, elements);

                        if (promiseData) {
                            promiseData.resolver(elements || element);
                        }
                    }

                    opts.complete = function() {
                        if (properties.reset) {
                            for (var resetProperty in properties.reset) {
                                var resetValue = properties.reset[resetProperty];

                                /* Format each non-array value in the reset property map to [ value, value ] so that changes apply
                                   immediately and DOM querying is avoided (via forcefeeding). */
                                if (typeof resetValue === "string" || typeof resetValue === "number") {
                                    properties.reset[resetProperty] = [ properties.reset[resetProperty], properties.reset[resetProperty] ];
                                }
                            }

                            /* So that the reset values are applied instantly upon the next rAF tick, use a zero duration and parallel queueing. */
                            var resetOptions = { duration: 0, queue: false };

                            /* Since the reset option uses up the complete callback, we trigger the user's complete callback at the end of ours. */
                            if (finalElement) {
                                resetOptions.complete = injectFinalCallbacks;
                            }  

                            Container.Velocity.animate(element, properties.reset, resetOptions);
                        /* Only trigger the user's complete callback on the last effect call with the last element in the set. */
                        } else if (finalElement) {
                            injectFinalCallbacks();
                        }
                    };

                    if (sequenceOptions.visibility === "hidden") {
                        opts.visibility = sequenceOptions.visibility;
                    }
                }

                Container.Velocity.animate(element, propertyMap, opts);
            }
        };
    };

    /*********************
       Packaged Effects
    *********************/

    /* Externalize the packagedEffects data so that they can optionally be modified and re-registered. */
    Container.Velocity.RegisterUI.packagedEffects = 
        { 
            /* Animate.css */
            "callout.bounce": {
                defaultDuration: 550,
                calls: [
                    [ { translateY: -30 }, 0.25 ],
                    [ { translateY: 0 }, 0.125 ],
                    [ { translateY: -15 }, 0.125 ],
                    [ { translateY: 0 }, 0.25 ]
                ]
            },
            /* Animate.css */
            "callout.shake": {
                defaultDuration: 800,
                calls: [ 
                    [ { translateX: -11 }, 0.125 ],
                    [ { translateX: 11 }, 0.125 ],
                    [ { translateX: -11 }, 0.125 ],
                    [ { translateX: 11 }, 0.125 ],
                    [ { translateX: -11 }, 0.125 ],
                    [ { translateX: 11 }, 0.125 ],
                    [ { translateX: -11 }, 0.125 ],
                    [ { translateX: 0 }, 0.125 ]
                ]
            },
            /* Animate.css */
            "callout.flash": {
                defaultDuration: 1100,
                calls: [ 
                    [ { opacity: [ 0, "easeInOutQuad", 1 ] }, 0.25 ],
                    [ { opacity: [ 1, "easeInOutQuad" ] }, 0.25 ],
                    [ { opacity: [ 0, "easeInOutQuad" ] }, 0.25 ],
                    [ { opacity: [ 1, "easeInOutQuad" ] }, 0.25 ]
                ]
            },
            /* Animate.css */
            "callout.pulse": {
                defaultDuration: 825,
                calls: [ 
                    [ { scaleX: 1.1, scaleY: 1.1 }, 0.50 ],
                    [ { scaleX: 1, scaleY: 1 }, 0.50 ]
                ]
            },
            /* Animate.css */
            "callout.swing": {
                defaultDuration: 950,
                calls: [ 
                    [ { rotateZ: 15 }, 0.20 ],
                    [ { rotateZ: -10 }, 0.20 ],
                    [ { rotateZ: 5 }, 0.20 ],
                    [ { rotateZ: -5 }, 0.20 ],
                    [ { rotateZ: 0 }, 0.20 ]
                ]
            },
            /* Animate.css */
            "callout.tada": {
                defaultDuration: 1000,
                calls: [ 
                    [ { scaleX: 0.9, scaleY: 0.9, rotateZ: -3 }, 0.10 ],
                    [ { scaleX: 1.1, scaleY: 1.1, rotateZ: 3 }, 0.10 ],
                    [ { scaleX: 1.1, scaleY: 1.1, rotateZ: -3 }, 0.10 ],
                    [ "reverse", 0.125 ],
                    [ "reverse", 0.125 ],
                    [ "reverse", 0.125 ],
                    [ "reverse", 0.125 ],
                    [ "reverse", 0.125 ],
                    [ { scaleX: 1, scaleY: 1, rotateZ: 0 }, 0.20 ]
                ]
            },
            "transition.fadeIn": {
                defaultDuration: 500,
                calls: [
                    [ { opacity: [ 1, 0 ] } ]
                ]
            },
            "transition.fadeOut": {
                defaultDuration: 500,
                calls: [
                    [ { opacity: [ 0, 1 ] } ]
                ]
            },
            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
            "transition.flipXIn": {
                defaultDuration: 700,
                calls: [ 
                    [ { opacity: [ 1, 0 ], transformPerspective: [ 800, 800 ], rotateY: [ 0, -55 ] } ]
                ],
                reset: { transformPerspective: 0 }
            },
            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
            "transition.flipXOut": {
                defaultDuration: 700,
                calls: [ 
                    [ { opacity: [ 0, 1 ], transformPerspective: [ 800, 800 ], rotateY: 55 } ]
                ],
                reset: { transformPerspective: 0, rotateY: 0 }
            },
            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
            "transition.flipYIn": {
                defaultDuration: 800,
                calls: [ 
                    [ { opacity: [ 1, 0 ], transformPerspective: [ 800, 800 ], rotateX: [ 0, -45 ] } ]
                ],
                reset: { transformPerspective: 0 }
            },
            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
            "transition.flipYOut": {
                defaultDuration: 800,
                calls: [ 
                    [ { opacity: [ 0, 1 ], transformPerspective: [ 800, 800 ], rotateX: 25 } ]
                ],
                reset: { transformPerspective: 0, rotateX: 0 }
            },
            /* Animate.css */
            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
            "transition.flipBounceXIn": {
                defaultDuration: 900,
                calls: [ 
                    [ { opacity: [ 0.725, 0 ], transformPerspective: [ 400, 400 ], rotateY: [ -10, 90 ] }, 0.50 ],
                    [ { opacity: 0.80, rotateY: 10 }, 0.25 ],
                    [ { opacity: 1, rotateY: 0 }, 0.25 ]
                ],
                reset: { transformPerspective: 0 }
            },
            /* Animate.css */
            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
            "transition.flipBounceXOut": {
                defaultDuration: 800,
                calls: [ 
                    [ { opacity: [ 0.9, 1 ], transformPerspective: [ 400, 400 ], rotateY: -10 }, 0.50 ],
                    [ { opacity: 0, rotateY: 90 }, 0.50 ]
                ],
                reset: { transformPerspective: 0, rotateY: 0 }
            },
            /* Animate.css */
            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
            "transition.flipBounceYIn": {
                defaultDuration: 850,
                calls: [ 
                    [ { opacity: [ 0.725, 0 ], transformPerspective: [ 400, 400 ], rotateX: [ -10, 90 ] }, 0.50 ],
                    [ { opacity: 0.80, rotateX: 10 }, 0.25 ],
                    [ { opacity: 1, rotateX: 0 }, 0.25 ]
                ],
                reset: { transformPerspective: 0 }
            },
            /* Animate.css */
            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
            "transition.flipBounceYOut": {
                defaultDuration: 800,
                calls: [ 
                    [ { opacity: [ 0.9, 1 ], transformPerspective: [ 400, 400 ], rotateX: -15 }, 0.50 ],
                    [ { opacity: 0, rotateX: 90 }, 0.50 ]
                ],
                reset: { transformPerspective: 0, rotateX: 0 }
            },
            /* Magic.css */
            "transition.swoopIn": {
                defaultDuration: 850,
                calls: [ 
                    [ { opacity: [ 1, 0 ], transformOriginX: [ "100%", "50%" ], transformOriginY: [ "100%", "100%" ], scaleX: [ 1, 0 ], scaleY: [ 1, 0 ], translateX: [ 0, -700 ], translateZ: 0 } ]
                ],
                reset: { transformOriginX: "50%", transformOriginY: "50%" }
            },
            /* Magic.css */
            "transition.swoopOut": {
                defaultDuration: 850,
                calls: [ 
                    [ { opacity: [ 0, 1 ], transformOriginX: [ "50%", "100%" ], transformOriginY: [ "100%", "100%" ], scaleX: 0, scaleY: 0, translateX: -700, translateZ: 0 } ]
                ],
                reset: { transformOriginX: "50%", transformOriginY: "50%", scaleX: 1, scaleY: 1, translateX: 0 }
            },
            /* Magic.css */
            /* Support: Loses rotation in IE9/Android 2.3. (Fades and scales only.) */
            "transition.whirlIn": {
                defaultDuration: 900,
                calls: [ 
                    [ { opacity: [ 1, 0 ], transformOriginX: [ "50%", "50%" ], transformOriginY: [ "50%", "50%" ], scaleX: [ 1, 0 ], scaleY: [ 1, 0 ], rotateY: [ 0, 160 ] } ]
                ]
            },
            /* Magic.css */
            /* Support: Loses rotation in IE9/Android 2.3. (Fades and scales only.) */
            "transition.whirlOut": {
                defaultDuration: 900,
                calls: [ 
                    [ { opacity: [ 0, 1 ], transformOriginX: [ "50%", "50%" ], transformOriginY: [ "50%", "50%" ], scaleX: 0, scaleY: 0, rotateY: 160 } ]
                ],
                reset: { scaleX: 1, scaleY: 1, rotateY: 0 }
            },
            "transition.shrinkIn": {
                defaultDuration: 700,
                calls: [ 
                    [ { opacity: [ 1, 0 ], transformOriginX: [ "50%", "50%" ], transformOriginY: [ "50%", "50%" ], scaleX: [ 1, 1.5 ], scaleY: [ 1, 1.5 ], translateZ: 0 } ]
                ]
            },
            "transition.shrinkOut": {
                defaultDuration: 650,
                calls: [ 
                    [ { opacity: [ 0, 1 ], transformOriginX: [ "50%", "50%" ], transformOriginY: [ "50%", "50%" ], scaleX: 1.3, scaleY: 1.3, translateZ: 0 } ]
                ],
                reset: { scaleX: 1, scaleY: 1 }
            },
            "transition.expandIn": {
                defaultDuration: 700,
                calls: [ 
                    [ { opacity: [ 1, 0 ], transformOriginX: [ "50%", "50%" ], transformOriginY: [ "50%", "50%" ], scaleX: [ 1, 0.625 ], scaleY: [ 1, 0.625 ], translateZ: 0 } ]
                ]
            },
            "transition.expandOut": {
                defaultDuration: 700,
                calls: [ 
                    [ { opacity: [ 0, 1 ], transformOriginX: [ "50%", "50%" ], transformOriginY: [ "50%", "50%" ], scaleX: 0.5, scaleY: 0.5, translateZ: 0 } ]
                ],
                reset: { scaleX: 1, scaleY: 1 }
            },
            /* Animate.css */
            "transition.bounceIn": {
                defaultDuration: 800,
                calls: [ 
                    [ { opacity: [ 1, 0 ], scaleX: [ 1.05, 0.3 ], scaleY: [ 1.05, 0.3 ] }, 0.40 ],
                    [ { scaleX: 0.9, scaleY: 0.9, translateZ: 0 }, 0.20 ],
                    [ { scaleX: 1, scaleY: 1 }, 0.50 ]
                ]
            },
            /* Animate.css */
            "transition.bounceOut": {
                defaultDuration: 800,
                calls: [ 
                    [ { scaleX: 0.95, scaleY: 0.95 }, 0.40 ],
                    [ { scaleX: 1.1, scaleY: 1.1, translateZ: 0 }, 0.40 ],
                    [ { opacity: [ 0, 1 ], scaleX: 0.3, scaleY: 0.3 }, 0.20 ]
                ],
                reset: { scaleX: 1, scaleY: 1 }
            },
            /* Animate.css */
            "transition.bounceUpIn": {
                defaultDuration: 800,
                calls: [ 
                    [ { opacity: [ 1, 0 ], translateY: [ -30, 1000 ] }, 0.60, { easing: "easeOutCirc" } ],
                    [ { translateY: 10 }, 0.20 ],
                    [ { translateY: 0 }, 0.20 ]
                ]
            },
            /* Animate.css */
            "transition.bounceUpOut": {
                defaultDuration: 1000,
                calls: [ 
                    [ { translateY: 20 }, 0.20 ],
                    [ { opacity: [ 0, "easeInCirc", 1 ], translateY: -1000 }, 0.80 ]
                ],
                reset: { translateY: 0 }
            },
            /* Animate.css */
            "transition.bounceDownIn": {
                defaultDuration: 800,
                calls: [ 
                    [ { opacity: [ 1, 0 ], translateY: [ 30, -1000 ] }, 0.60, { easing: "easeOutCirc" } ],
                    [ { translateY: -10 }, 0.20 ],
                    [ { translateY: 0 }, 0.20 ]
                ]
            },
            /* Animate.css */
            "transition.bounceDownOut": {
                defaultDuration: 1000,
                calls: [ 
                    [ { translateY: -20 }, 0.20 ],
                    [ { opacity: [ 0, "easeInCirc", 1 ], translateY: 1000 }, 0.80 ]
                ],
                reset: { translateY: 0 }
            },
            /* Animate.css */
            "transition.bounceLeftIn": {
                defaultDuration: 750,
                calls: [ 
                    [ { opacity: [ 1, 0 ], translateX: [ 30, -1250 ] }, 0.60, { easing: "easeOutCirc" } ],
                    [ { translateX: -10 }, 0.20 ],
                    [ { translateX: 0 }, 0.20 ]
                ]
            },
            /* Animate.css */
            "transition.bounceLeftOut": {
                defaultDuration: 750,
                calls: [ 
                    [ { translateX: 30 }, 0.20 ],
                    [ { opacity: [ 0, "easeInCirc", 1 ], translateX: -1250 }, 0.80 ]
                ],
                reset: { translateX: 0 }
            },
            /* Animate.css */
            "transition.bounceRightIn": {
                defaultDuration: 750,
                calls: [ 
                    [ { opacity: [ 1, 0 ], translateX: [ -30, 1250 ] }, 0.60, { easing: "easeOutCirc" } ],
                    [ { translateX: 10 }, 0.20 ],
                    [ { translateX: 0 }, 0.20 ]
                ]
            },
            /* Animate.css */
            "transition.bounceRightOut": {
                defaultDuration: 750,
                calls: [ 
                    [ { translateX: -30 }, 0.20 ],
                    [ { opacity: [ 0, "easeInCirc", 1 ], translateX: 1250 }, 0.80 ]
                ],
                reset: { translateX: 0 }
            },
            "transition.slideUpIn": {
                defaultDuration: 900,
                calls: [ 
                    [ { opacity: [ 1, 0 ], translateY: [ 0, 20 ], translateZ: 0 } ]
                ]
            },
            "transition.slideUpOut": {
                defaultDuration: 900,
                calls: [ 
                    [ { opacity: [ 0, 1 ], translateY: -20, translateZ: 0 } ]
                ],
                reset: { translateY: 0 }
            },
            "transition.slideDownIn": {
                defaultDuration: 900,
                calls: [ 
                    [ { opacity: [ 1, 0 ], translateY: [ 0, -20 ], translateZ: 0 } ]
                ]
            },
            "transition.slideDownOut": {
                defaultDuration: 900,
                calls: [ 
                    [ { opacity: [ 0, 1 ], translateY: 20, translateZ: 0 } ]
                ],
                reset: { translateY: 0 }
            },
            "transition.slideLeftIn": {
                defaultDuration: 1000,
                calls: [ 
                    [ { opacity: [ 1, 0 ], translateX: [ 0, -20 ], translateZ: 0 } ]
                ]
            },
            "transition.slideLeftOut": {
                defaultDuration: 1050,
                calls: [ 
                    [ { opacity: [ 0, 1 ], translateX: -20, translateZ: 0 } ]
                ],
                reset: { translateX: 0 }
            },
            "transition.slideRightIn": {
                defaultDuration: 1000,
                calls: [ 
                    [ { opacity: [ 1, 0 ], translateX: [ 0, 20 ], translateZ: 0 } ]
                ]
            },
            "transition.slideRightOut": {
                defaultDuration: 1050,
                calls: [ 
                    [ { opacity: [ 0, 1 ], translateX: 20, translateZ: 0 } ]
                ],
                reset: { translateX: 0 }
            },
            "transition.slideUpBigIn": {
                defaultDuration: 850,
                calls: [ 
                    [ { opacity: [ 1, 0 ], translateY: [ 0, 75 ], translateZ: 0 } ]
                ]
            },
            "transition.slideUpBigOut": {
                defaultDuration: 800,
                calls: [ 
                    [ { opacity: [ 0, 1 ], translateY: -75, translateZ: 0 } ]
                ],
                reset: { translateY: 0 }
            },
            "transition.slideDownBigIn": {
                defaultDuration: 850,
                calls: [ 
                    [ { opacity: [ 1, 0 ], translateY: [ 0, -75 ], translateZ: 0 } ]
                ]
            },
            "transition.slideDownBigOut": {
                defaultDuration: 800,
                calls: [ 
                    [ { opacity: [ 0, 1 ], translateY: 75, translateZ: 0 } ]
                ],
                reset: { translateY: 0 }
            },
            "transition.slideLeftBigIn": {
                defaultDuration: 800,
                calls: [ 
                    [ { opacity: [ 1, 0 ], translateX: [ 0, -75 ], translateZ: 0 } ]
                ]
            },
            "transition.slideLeftBigOut": {
                defaultDuration: 750,
                calls: [ 
                    [ { opacity: [ 0, 1 ], translateX: -75, translateZ: 0 } ]
                ],
                reset: { translateX: 0 }
            },
            "transition.slideRightBigIn": {
                defaultDuration: 800,
                calls: [ 
                    [ { opacity: [ 1, 0 ], translateX: [ 0, 75 ], translateZ: 0 } ]
                ]
            },
            "transition.slideRightBigOut": {
                defaultDuration: 750,
                calls: [ 
                    [ { opacity: [ 0, 1 ], translateX: 75, translateZ: 0 } ]
                ],
                reset: { translateX: 0 }
            },
            /* Magic.css */
            "transition.perspectiveUpIn": {
                defaultDuration: 800,
                calls: [ 
                    [ { opacity: [ 1, 0 ], transformPerspective: [ 800, 800 ], transformOriginX: [ 0, 0 ], transformOriginY: [ "100%", "100%" ], rotateX: [ 0, -180 ] } ]
                ],
                reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%" }
            },
            /* Magic.css */
            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
            "transition.perspectiveUpOut": {
                defaultDuration: 850,
                calls: [ 
                    [ { opacity: [ 0, 1 ], transformPerspective: [ 800, 800 ], transformOriginX: [ 0, 0 ], transformOriginY: [ "100%", "100%" ], rotateX: -180 } ]
                ],
                reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateX: 0 }
            },
            /* Magic.css */
            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
            "transition.perspectiveDownIn": {
                defaultDuration: 800,
                calls: [ 
                    [ { opacity: [ 1, 0 ], transformPerspective: [ 800, 800 ], transformOriginX: [ 0, 0 ], transformOriginY: [ 0, 0 ], rotateX: [ 0, 180 ] } ]
                ],
                reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%" }
            },
            /* Magic.css */
            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
            "transition.perspectiveDownOut": {
                defaultDuration: 850,
                calls: [ 
                    [ { opacity: [ 0, 1 ], transformPerspective: [ 800, 800 ], transformOriginX: [ 0, 0 ], transformOriginY: [ 0, 0 ], rotateX: 180 } ]
                ],
                reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateX: 0 }
            },
            /* Magic.css */
            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
            "transition.perspectiveLeftIn": {
                defaultDuration: 950,
                calls: [ 
                    [ { opacity: [ 1, 0 ], transformPerspective: [ 2000, 2000 ], transformOriginX: [ 0, 0 ], transformOriginY: [ 0, 0 ], rotateY: [ 0, -180 ] } ]
                ],
                reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%" }
            },
            /* Magic.css */
            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
            "transition.perspectiveLeftOut": {
                defaultDuration: 950,
                calls: [ 
                    [ { opacity: [ 0, 1 ], transformPerspective: [ 2000, 2000 ], transformOriginX: [ 0, 0 ], transformOriginY: [ 0, 0 ], rotateY: -180 } ]
                ],
                reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateY: 0 }
            },
            /* Magic.css */
            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
            "transition.perspectiveRightIn": {
                defaultDuration: 950,
                calls: [ 
                    [ { opacity: [ 1, 0 ], transformPerspective: [ 2000, 2000 ], transformOriginX: [ "100%", "100%" ], transformOriginY: [ 0, 0 ], rotateY: [ 0, 180 ] } ]
                ],
                reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%" }
            },
            /* Magic.css */
            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
            "transition.perspectiveRightOut": {
                defaultDuration: 950,
                calls: [ 
                    [ { opacity: [ 0, 1 ], transformPerspective: [ 2000, 2000 ], transformOriginX: [ "100%", "100%" ], transformOriginY: [ 0, 0 ], rotateY: 180 } ]
                ],
                reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateY: 0 }
            }
        };

    /* Register the packaged effects. */
    for (var effectName in Container.Velocity.RegisterUI.packagedEffects) {
        Container.Velocity.RegisterUI(effectName, Container.Velocity.RegisterUI.packagedEffects[effectName]);
    }
})();
; browserify_shim__define__module__export__(typeof velocityUI != "undefined" ? velocityUI : window.velocityUI);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
var sticky = require('./sticky'),
    map = require('./map'),
    scrollTo = require('./scrollTo'),
    talk = require('./talk');

},{"./map":6,"./scrollTo":7,"./sticky":8,"./talk":9}],5:[function(require,module,exports){
module.exports = {
  body: $('body'),
  header: $(document.getElementById('header')),
  banner: $(document.getElementById('banner')),
  about: $(document.getElementById('about')),
  register: $(document.getElementById('register')),
  schedule: $(document.getElementById('schedule')),
  venue: $(document.getElementById('venue')),
  isSmall: function isSmall() {  return window.innerWidth < 992; }
};

},{}],6:[function(require,module,exports){
var styles = [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill"},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#7dcdcd"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]}];

var hotelPosition = new google.maps.LatLng(-36.846738, 174.761957);

var options = {
  zoom: 15,
  center: hotelPosition,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  scaleControl: false,
	scrollwheel: false,
  styles: styles
};

var map = new google.maps.Map(document.getElementById('map'), options);

var markerTraining = new google.maps.Marker({
  position: hotelPosition,
  map: map,
  title: 'Heritage Hotel',
  icon: 'resources/images/marker.png'
});

},{}],7:[function(require,module,exports){
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

},{"./elements":5,"velocity":2,"velocityUI":3}],8:[function(require,module,exports){
var sticky = require('sticky'),
    elements = require('./elements');

elements.header.sticky({topSpacing:0});

function stickBanner() {
  if (elements.isSmall()) {
    elements.banner.unstick();
  } else {
    elements.banner.sticky({topSpacing: elements.header.outerHeight()});
  }
}

stickBanner();

$(window).resize(function () {
  elements.header.sticky('update');
  stickBanner();
});

},{"./elements":5,"sticky":1}],9:[function(require,module,exports){
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

$('.track.with-description', elements.schedule).on('click', function (e) {
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
    }, {
      duration: duration,
      complete: function () {
        elems.description.addClass('visible');
        inProgress = false;
      }
    });
});

$('.track-description', elements.schedule).on('click', function (e) {
  if (inProgress) return;
  inProgress = true;
  e.stopPropagation();

  var elems = extractElements(e);

  elems.description.removeClass('visible');
  elems.description
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

},{"./elements":5,"velocity":2,"velocityUI":3}]},{},[4])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3BhdWwvV29yay9tb3Zpby9zY2FsYS1kb3dudW5kZXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9ob21lL3BhdWwvV29yay9tb3Zpby9zY2FsYS1kb3dudW5kZXIvYm93ZXJfY29tcG9uZW50cy9qcXVlcnktc3RpY2t5L2pxdWVyeS5zdGlja3kuanMiLCIvaG9tZS9wYXVsL1dvcmsvbW92aW8vc2NhbGEtZG93bnVuZGVyL2Jvd2VyX2NvbXBvbmVudHMvdmVsb2NpdHkvanF1ZXJ5LnZlbG9jaXR5LmpzIiwiL2hvbWUvcGF1bC9Xb3JrL21vdmlvL3NjYWxhLWRvd251bmRlci9ib3dlcl9jb21wb25lbnRzL3ZlbG9jaXR5L3ZlbG9jaXR5LnVpLmpzIiwiL2hvbWUvcGF1bC9Xb3JrL21vdmlvL3NjYWxhLWRvd251bmRlci9yZXNvdXJjZXMvc2NyaXB0cy9hcHAuanMiLCIvaG9tZS9wYXVsL1dvcmsvbW92aW8vc2NhbGEtZG93bnVuZGVyL3Jlc291cmNlcy9zY3JpcHRzL2VsZW1lbnRzLmpzIiwiL2hvbWUvcGF1bC9Xb3JrL21vdmlvL3NjYWxhLWRvd251bmRlci9yZXNvdXJjZXMvc2NyaXB0cy9tYXAuanMiLCIvaG9tZS9wYXVsL1dvcmsvbW92aW8vc2NhbGEtZG93bnVuZGVyL3Jlc291cmNlcy9zY3JpcHRzL3Njcm9sbFRvLmpzIiwiL2hvbWUvcGF1bC9Xb3JrL21vdmlvL3NjYWxhLWRvd251bmRlci9yZXNvdXJjZXMvc2NyaXB0cy9zdGlja3kuanMiLCIvaG9tZS9wYXVsL1dvcmsvbW92aW8vc2NhbGEtZG93bnVuZGVyL3Jlc291cmNlcy9zY3JpcHRzL3RhbGsuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzEyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqcUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbjtfX2Jyb3dzZXJpZnlfc2hpbV9yZXF1aXJlX189cmVxdWlyZTsoZnVuY3Rpb24gYnJvd3NlcmlmeVNoaW0obW9kdWxlLCBleHBvcnRzLCByZXF1aXJlLCBkZWZpbmUsIGJyb3dzZXJpZnlfc2hpbV9fZGVmaW5lX19tb2R1bGVfX2V4cG9ydF9fKSB7XG4vLyBTdGlja3kgUGx1Z2luIHYxLjAuMCBmb3IgalF1ZXJ5XG4vLyA9PT09PT09PT09PT09XG4vLyBBdXRob3I6IEFudGhvbnkgR2FyYW5kXG4vLyBJbXByb3ZlbWVudHMgYnkgR2VybWFuIE0uIEJyYXZvIChLcm9udXopIGFuZCBSdXVkIEthbXBodWlzIChydXVkaylcbi8vIEltcHJvdmVtZW50cyBieSBMZW9uYXJkbyBDLiBEYXJvbmNvIChkYXJvbmNvKVxuLy8gQ3JlYXRlZDogMi8xNC8yMDExXG4vLyBEYXRlOiAyLzEyLzIwMTJcbi8vIFdlYnNpdGU6IGh0dHA6Ly9sYWJzLmFudGhvbnlnYXJhbmQuY29tL3N0aWNreVxuLy8gRGVzY3JpcHRpb246IE1ha2VzIGFuIGVsZW1lbnQgb24gdGhlIHBhZ2Ugc3RpY2sgb24gdGhlIHNjcmVlbiBhcyB5b3Ugc2Nyb2xsXG4vLyAgICAgICBJdCB3aWxsIG9ubHkgc2V0IHRoZSAndG9wJyBhbmQgJ3Bvc2l0aW9uJyBvZiB5b3VyIGVsZW1lbnQsIHlvdVxuLy8gICAgICAgbWlnaHQgbmVlZCB0byBhZGp1c3QgdGhlIHdpZHRoIGluIHNvbWUgY2FzZXMuXG5cbihmdW5jdGlvbigkKSB7XG4gIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgIHRvcFNwYWNpbmc6IDAsXG4gICAgICBib3R0b21TcGFjaW5nOiAwLFxuICAgICAgY2xhc3NOYW1lOiAnaXMtc3RpY2t5JyxcbiAgICAgIHdyYXBwZXJDbGFzc05hbWU6ICdzdGlja3ktd3JhcHBlcicsXG4gICAgICBjZW50ZXI6IGZhbHNlLFxuICAgICAgZ2V0V2lkdGhGcm9tOiAnJyxcbiAgICAgIHJlc3BvbnNpdmVXaWR0aDogZmFsc2VcbiAgICB9LFxuICAgICR3aW5kb3cgPSAkKHdpbmRvdyksXG4gICAgJGRvY3VtZW50ID0gJChkb2N1bWVudCksXG4gICAgc3RpY2tlZCA9IFtdLFxuICAgIHdpbmRvd0hlaWdodCA9ICR3aW5kb3cuaGVpZ2h0KCksXG4gICAgc2Nyb2xsZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSAkd2luZG93LnNjcm9sbFRvcCgpLFxuICAgICAgICBkb2N1bWVudEhlaWdodCA9ICRkb2N1bWVudC5oZWlnaHQoKSxcbiAgICAgICAgZHdoID0gZG9jdW1lbnRIZWlnaHQgLSB3aW5kb3dIZWlnaHQsXG4gICAgICAgIGV4dHJhID0gKHNjcm9sbFRvcCA+IGR3aCkgPyBkd2ggLSBzY3JvbGxUb3AgOiAwO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0aWNrZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHMgPSBzdGlja2VkW2ldLFxuICAgICAgICAgIGVsZW1lbnRUb3AgPSBzLnN0aWNreVdyYXBwZXIub2Zmc2V0KCkudG9wLFxuICAgICAgICAgIGV0c2UgPSBlbGVtZW50VG9wIC0gcy50b3BTcGFjaW5nIC0gZXh0cmE7XG5cbiAgICAgICAgaWYgKHNjcm9sbFRvcCA8PSBldHNlKSB7XG4gICAgICAgICAgaWYgKHMuY3VycmVudFRvcCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcy5zdGlja3lFbGVtZW50XG4gICAgICAgICAgICAgIC5jc3MoJ3Bvc2l0aW9uJywgJycpXG4gICAgICAgICAgICAgIC5jc3MoJ3RvcCcsICcnKTtcbiAgICAgICAgICAgIHMuc3RpY2t5RWxlbWVudC50cmlnZ2VyKCdzdGlja3ktZW5kJywgW3NdKS5wYXJlbnQoKS5yZW1vdmVDbGFzcyhzLmNsYXNzTmFtZSk7XG4gICAgICAgICAgICBzLmN1cnJlbnRUb3AgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB2YXIgbmV3VG9wID0gZG9jdW1lbnRIZWlnaHQgLSBzLnN0aWNreUVsZW1lbnQub3V0ZXJIZWlnaHQoKVxuICAgICAgICAgICAgLSBzLnRvcFNwYWNpbmcgLSBzLmJvdHRvbVNwYWNpbmcgLSBzY3JvbGxUb3AgLSBleHRyYTtcbiAgICAgICAgICBpZiAobmV3VG9wIDwgMCkge1xuICAgICAgICAgICAgbmV3VG9wID0gbmV3VG9wICsgcy50b3BTcGFjaW5nO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdUb3AgPSBzLnRvcFNwYWNpbmc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzLmN1cnJlbnRUb3AgIT0gbmV3VG9wKSB7XG4gICAgICAgICAgICBzLnN0aWNreUVsZW1lbnRcbiAgICAgICAgICAgICAgLmNzcygncG9zaXRpb24nLCAnZml4ZWQnKVxuICAgICAgICAgICAgICAuY3NzKCd0b3AnLCBuZXdUb3ApO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHMuZ2V0V2lkdGhGcm9tICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICBzLnN0aWNreUVsZW1lbnQuY3NzKCd3aWR0aCcsICQocy5nZXRXaWR0aEZyb20pLndpZHRoKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzLnN0aWNreUVsZW1lbnQudHJpZ2dlcignc3RpY2t5LXN0YXJ0JywgW3NdKS5wYXJlbnQoKS5hZGRDbGFzcyhzLmNsYXNzTmFtZSk7XG4gICAgICAgICAgICBzLmN1cnJlbnRUb3AgPSBuZXdUb3A7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICByZXNpemVyID0gZnVuY3Rpb24oKSB7XG4gICAgICB3aW5kb3dIZWlnaHQgPSAkd2luZG93LmhlaWdodCgpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0aWNrZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHMgPSBzdGlja2VkW2ldO1xuICAgICAgICBpZiAodHlwZW9mIHMuZ2V0V2lkdGhGcm9tICE9PSAndW5kZWZpbmVkJyAmJiBzLnJlc3BvbnNpdmVXaWR0aCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHMuc3RpY2t5RWxlbWVudC5jc3MoJ3dpZHRoJywgJChzLmdldFdpZHRoRnJvbSkud2lkdGgoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBpbml0OiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHZhciBvID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgc3RpY2t5RWxlbWVudCA9ICQodGhpcyk7XG5cbiAgICAgICAgICB2YXIgc3RpY2t5SWQgPSBzdGlja3lFbGVtZW50LmF0dHIoJ2lkJyk7XG4gICAgICAgICAgdmFyIHdyYXBwZXJJZCA9IHN0aWNreUlkID8gc3RpY2t5SWQgKyAnLScgKyBkZWZhdWx0cy53cmFwcGVyQ2xhc3NOYW1lIDogZGVmYXVsdHMud3JhcHBlckNsYXNzTmFtZSBcbiAgICAgICAgICB2YXIgd3JhcHBlciA9ICQoJzxkaXY+PC9kaXY+JylcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIHN0aWNreUlkICsgJy1zdGlja3ktd3JhcHBlcicpXG4gICAgICAgICAgICAuYWRkQ2xhc3Moby53cmFwcGVyQ2xhc3NOYW1lKTtcbiAgICAgICAgICBzdGlja3lFbGVtZW50LndyYXBBbGwod3JhcHBlcik7XG5cbiAgICAgICAgICBpZiAoby5jZW50ZXIpIHtcbiAgICAgICAgICAgIHN0aWNreUVsZW1lbnQucGFyZW50KCkuY3NzKHt3aWR0aDpzdGlja3lFbGVtZW50Lm91dGVyV2lkdGgoKSxtYXJnaW5MZWZ0OlwiYXV0b1wiLG1hcmdpblJpZ2h0OlwiYXV0b1wifSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHN0aWNreUVsZW1lbnQuY3NzKFwiZmxvYXRcIikgPT0gXCJyaWdodFwiKSB7XG4gICAgICAgICAgICBzdGlja3lFbGVtZW50LmNzcyh7XCJmbG9hdFwiOlwibm9uZVwifSkucGFyZW50KCkuY3NzKHtcImZsb2F0XCI6XCJyaWdodFwifSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHN0aWNreVdyYXBwZXIgPSBzdGlja3lFbGVtZW50LnBhcmVudCgpO1xuICAgICAgICAgIHN0aWNreVdyYXBwZXIuY3NzKCdoZWlnaHQnLCBzdGlja3lFbGVtZW50Lm91dGVySGVpZ2h0KCkpO1xuICAgICAgICAgIHN0aWNrZWQucHVzaCh7XG4gICAgICAgICAgICB0b3BTcGFjaW5nOiBvLnRvcFNwYWNpbmcsXG4gICAgICAgICAgICBib3R0b21TcGFjaW5nOiBvLmJvdHRvbVNwYWNpbmcsXG4gICAgICAgICAgICBzdGlja3lFbGVtZW50OiBzdGlja3lFbGVtZW50LFxuICAgICAgICAgICAgY3VycmVudFRvcDogbnVsbCxcbiAgICAgICAgICAgIHN0aWNreVdyYXBwZXI6IHN0aWNreVdyYXBwZXIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IG8uY2xhc3NOYW1lLFxuICAgICAgICAgICAgZ2V0V2lkdGhGcm9tOiBvLmdldFdpZHRoRnJvbSxcbiAgICAgICAgICAgIHJlc3BvbnNpdmVXaWR0aDogby5yZXNwb25zaXZlV2lkdGhcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgdXBkYXRlOiBzY3JvbGxlcixcbiAgICAgIHVuc3RpY2s6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgdW5zdGlja3lFbGVtZW50ID0gJCh0aGlzKTtcblxuICAgICAgICAgIHZhciByZW1vdmVJZHggPSAtMTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0aWNrZWQubGVuZ3RoOyBpKyspXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWYgKHN0aWNrZWRbaV0uc3RpY2t5RWxlbWVudC5nZXQoMCkgPT0gdW5zdGlja3lFbGVtZW50LmdldCgwKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZW1vdmVJZHggPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZihyZW1vdmVJZHggIT0gLTEpXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3RpY2tlZC5zcGxpY2UocmVtb3ZlSWR4LDEpO1xuICAgICAgICAgICAgdW5zdGlja3lFbGVtZW50LnVud3JhcCgpO1xuICAgICAgICAgICAgdW5zdGlja3lFbGVtZW50LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gIC8vIHNob3VsZCBiZSBtb3JlIGVmZmljaWVudCB0aGFuIHVzaW5nICR3aW5kb3cuc2Nyb2xsKHNjcm9sbGVyKSBhbmQgJHdpbmRvdy5yZXNpemUocmVzaXplcik6XG4gIGlmICh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBzY3JvbGxlciwgZmFsc2UpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemVyLCBmYWxzZSk7XG4gIH0gZWxzZSBpZiAod2luZG93LmF0dGFjaEV2ZW50KSB7XG4gICAgd2luZG93LmF0dGFjaEV2ZW50KCdvbnNjcm9sbCcsIHNjcm9sbGVyKTtcbiAgICB3aW5kb3cuYXR0YWNoRXZlbnQoJ29ucmVzaXplJywgcmVzaXplcik7XG4gIH1cblxuICAkLmZuLnN0aWNreSA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIGlmIChtZXRob2RzW21ldGhvZF0pIHtcbiAgICAgIHJldHVybiBtZXRob2RzW21ldGhvZF0uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbWV0aG9kID09PSAnb2JqZWN0JyB8fCAhbWV0aG9kICkge1xuICAgICAgcmV0dXJuIG1ldGhvZHMuaW5pdC5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQuZXJyb3IoJ01ldGhvZCAnICsgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBvbiBqUXVlcnkuc3RpY2t5Jyk7XG4gICAgfVxuICB9O1xuXG4gICQuZm4udW5zdGljayA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIGlmIChtZXRob2RzW21ldGhvZF0pIHtcbiAgICAgIHJldHVybiBtZXRob2RzW21ldGhvZF0uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbWV0aG9kID09PSAnb2JqZWN0JyB8fCAhbWV0aG9kICkge1xuICAgICAgcmV0dXJuIG1ldGhvZHMudW5zdGljay5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQuZXJyb3IoJ01ldGhvZCAnICsgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBvbiBqUXVlcnkuc3RpY2t5Jyk7XG4gICAgfVxuXG4gIH07XG4gICQoZnVuY3Rpb24oKSB7XG4gICAgc2V0VGltZW91dChzY3JvbGxlciwgMCk7XG4gIH0pO1xufSkoalF1ZXJ5KTtcblxuOyBicm93c2VyaWZ5X3NoaW1fX2RlZmluZV9fbW9kdWxlX19leHBvcnRfXyh0eXBlb2Ygc3RpY2t5ICE9IFwidW5kZWZpbmVkXCIgPyBzdGlja3kgOiB3aW5kb3cuc3RpY2t5KTtcblxufSkuY2FsbChnbG9iYWwsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgZnVuY3Rpb24gZGVmaW5lRXhwb3J0KGV4KSB7IG1vZHVsZS5leHBvcnRzID0gZXg7IH0pO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbjtfX2Jyb3dzZXJpZnlfc2hpbV9yZXF1aXJlX189cmVxdWlyZTsoZnVuY3Rpb24gYnJvd3NlcmlmeVNoaW0obW9kdWxlLCBleHBvcnRzLCByZXF1aXJlLCBkZWZpbmUsIGJyb3dzZXJpZnlfc2hpbV9fZGVmaW5lX19tb2R1bGVfX2V4cG9ydF9fKSB7XG4vKioqKioqKioqKioqKioqXG4gICAgRGV0YWlsc1xuKioqKioqKioqKioqKioqL1xuXG4vKiFcbiogVmVsb2NpdHkuanM6IEFjY2VsZXJhdGVkIEphdmFTY3JpcHQgYW5pbWF0aW9uLlxuKiBAdmVyc2lvbiAwLjkuMFxuKiBAZG9jcyBodHRwOi8vdmVsb2NpdHlqcy5vcmdcbiogQGxpY2Vuc2UgQ29weXJpZ2h0IDIwMTQgSnVsaWFuIFNoYXBpcm8uIE1JVCBMaWNlbnNlOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL01JVF9MaWNlbnNlXG4qL1xuXG4vKioqKioqKioqKioqKioqKlxuICAgICBTdW1tYXJ5XG4qKioqKioqKioqKioqKioqL1xuXG4vKlxuVmVsb2NpdHkncyBzdHJ1Y3R1cmU6XG4tIENTUyBTdGFjazogV29ya3MgaW5kZXBlbmRlbnRseSBmcm9tIHRoZSByZXN0IG9mIFZlbG9jaXR5LlxuLSBWZWxvY2l0eS5hbmltYXRlKCk6IENvcmUgbWV0aG9kIHRoYXQgaXRlcmF0ZXMgb3ZlciB0aGUgdGFyZ2V0ZWQgZWxlbWVudHMgYW5kIHF1ZXVlcyB0aGUgaW5jb21pbmcgY2FsbCBvbnRvIGVhY2ggZWxlbWVudCBpbmRpdmlkdWFsbHkuIENvbnNpc3RzIG9mOlxuICAtIFByZS1RdWV1ZWluZzogUHJlcGFyZSB0aGUgZWxlbWVudCBmb3IgYW5pbWF0aW9uIGJ5IGluc3RhbnRpYXRpbmcgaXRzIGRhdGEgY2FjaGUgYW5kIHByb2Nlc3NpbmcgdGhlIGNhbGwncyBvcHRpb25zLlxuICAtIFF1ZXVlaW5nOiBUaGUgbG9naWMgdGhhdCBydW5zIG9uY2UgdGhlIGNhbGwgaGFzIHJlYWNoZWQgaXRzIHBvaW50IG9mIGV4ZWN1dGlvbiBpbiB0aGUgZWxlbWVudCdzICQucXVldWUoKSBzdGFjay5cbiAgICAgICAgICAgICAgTW9zdCBsb2dpYyBpcyBwbGFjZWQgaGVyZSB0byBhdm9pZCByaXNraW5nIGl0IGJlY29taW5nIHN0YWxlIChpZiB0aGUgZWxlbWVudCdzIHByb3BlcnRpZXMgaGF2ZSBjaGFuZ2VkKS5cbiAgLSBQdXNoaW5nOiBDb25zb2xpZGF0aW9uIG9mIHRoZSB0d2VlbiBkYXRhIGZvbGxvd2VkIGJ5IGl0cyBwdXNoIG9udG8gdGhlIGdsb2JhbCBpbi1wcm9ncmVzcyBjYWxscyBjb250YWluZXIuXG4tIHRpY2soKTogVGhlIHNpbmdsZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgbG9vcCByZXNwb25zaWJsZSBmb3IgdHdlZW5pbmcgYWxsIGluLXByb2dyZXNzIGNhbGxzLlxuLSBjb21wbGV0ZUNhbGwoKTogSGFuZGxlcyB0aGUgY2xlYW51cCBwcm9jZXNzIGZvciBlYWNoIFZlbG9jaXR5IGNhbGwuXG4qL1xuXG4vKiBOT1RJQ0U6IERlc3BpdGUgdGhlIGVuc3VpbmcgY29kZSBpbmRpY2F0aW5nIHRoYXQgVmVsb2NpdHkgd29ya3MgKndpdGhvdXQqIGpRdWVyeSBhbmQgKndpdGgqIFplcHRvLCB0aGlzIHN1cHBvcnQgaGFzIG5vdCB5ZXQgbGFuZGVkLiAqL1xuXG4vKioqKioqKioqKioqKioqKioqXG4gICAgVmVsb2NpdHkuanNcbioqKioqKioqKioqKioqKioqKi9cblxuOyhmdW5jdGlvbiAoZ2xvYmFsLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcblxuICAgIC8qKioqKioqKioqKioqKioqKlxuICAgICAgICBDb25zdGFudHNcbiAgICAqKioqKioqKioqKioqKioqKi9cblxuICAgIHZhciBOQU1FID0gXCJ2ZWxvY2l0eVwiLFxuICAgICAgICBERUZBVUxUX0RVUkFUSU9OID0gNDAwLFxuICAgICAgICBERUZBVUxUX0VBU0lORyA9IFwic3dpbmdcIjtcblxuICAgIC8qKioqKioqKioqKioqKioqKioqKipcbiAgICAgICBIZWxwZXIgRnVuY3Rpb25zXG4gICAgKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgLyogSUUgZGV0ZWN0aW9uLiBHaXN0OiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9qdWxpYW5zaGFwaXJvLzkwOTg2MDkgKi9cbiAgICB2YXIgSUUgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChkb2N1bWVudC5kb2N1bWVudE1vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5kb2N1bWVudE1vZGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gNzsgaSA+IDQ7IGktLSkge1xuICAgICAgICAgICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICAgICAgICAgICAgZGl2LmlubmVySFRNTCA9IFwiPCEtLVtpZiBJRSBcIiArIGkgKyBcIl0+PHNwYW4+PC9zcGFuPjwhW2VuZGlmXS0tPlwiO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNwYW5cIikubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpdiA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9KSgpO1xuXG4gICAgLyogckFGIHBvbHlmaWxsLiBHaXN0OiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9qdWxpYW5zaGFwaXJvLzk0OTc1MTMgKi9cbiAgICB2YXIgckFGUG9sbHlmaWxsID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdGltZUxhc3QgPSAwO1xuXG4gICAgICAgIHJldHVybiB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciB0aW1lQ3VycmVudCA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCksXG4gICAgICAgICAgICAgICAgdGltZURlbHRhO1xuXG4gICAgICAgICAgICAvKiBEeW5hbWljYWxseSBzZXQgZGVsYXkgb24gYSBwZXItdGljayBiYXNpcyB0byBtYXRjaCA2MGZwcy4gKi9cbiAgICAgICAgICAgIC8qIFRlY2huaXF1ZSBieSBFcmlrIE1vbGxlci4gTUlUIGxpY2Vuc2U6IGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL3BhdWxpcmlzaC8xNTc5NjcxICovXG4gICAgICAgICAgICB0aW1lRGVsdGEgPSBNYXRoLm1heCgwLCAxNiAtICh0aW1lQ3VycmVudCAtIHRpbWVMYXN0KSk7XG4gICAgICAgICAgICB0aW1lTGFzdCA9IHRpbWVDdXJyZW50ICsgdGltZURlbHRhO1xuXG4gICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpIHsgY2FsbGJhY2sodGltZUN1cnJlbnQgKyB0aW1lRGVsdGEpOyB9LCB0aW1lRGVsdGEpO1xuICAgICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICB2YXIgckFGID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCByQUZQb2xseWZpbGw7XG5cbiAgICAvKiBBcnJheSBjb21wYWN0aW5nLiBDb3B5cmlnaHQgTG8tRGFzaC4gTUlUIExpY2Vuc2U6IGh0dHBzOi8vZ2l0aHViLmNvbS9sb2Rhc2gvbG9kYXNoL2Jsb2IvbWFzdGVyL0xJQ0VOU0UudHh0ICovXG4gICAgZnVuY3Rpb24gY29tcGFjdFNwYXJzZUFycmF5IChhcnJheSkge1xuICAgICAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMCxcbiAgICAgICAgICAgIHJlc3VsdCA9IFtdO1xuXG4gICAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF07XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgdmFyIFR5cGUgPSB7XG4gICAgICAgIGlzU3RyaW5nOiBmdW5jdGlvbiAodmFyaWFibGUpIHtcbiAgICAgICAgICAgIHJldHVybiAodHlwZW9mIHZhcmlhYmxlID09PSBcInN0cmluZ1wiKTtcbiAgICAgICAgfSxcblxuICAgICAgICBpc0FycmF5OiBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uICh2YXJpYWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YXJpYWJsZSkgPT09IFwiW29iamVjdCBBcnJheV1cIjtcbiAgICAgICAgfSxcblxuICAgICAgICBpc0Z1bmN0aW9uOiBmdW5jdGlvbiAodmFyaWFibGUpIHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFyaWFibGUpID09PSBcIltvYmplY3QgRnVuY3Rpb25dXCI7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaXNOb2RlOiBmdW5jdGlvbiAodmFyaWFibGUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YXJpYWJsZSAmJiB2YXJpYWJsZS5ub2RlVHlwZTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKiBDb3B5cmlnaHQgTWFydGluIEJvaG0uIE1JVCBMaWNlbnNlOiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9Ub21hbGFrLzgxOGE3OGEyMjZhMDczOGVhYWRlICovXG4gICAgICAgIGlzTm9kZUxpc3Q6IGZ1bmN0aW9uICh2YXJpYWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB2YXJpYWJsZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgICAgIC9eXFxbb2JqZWN0IChIVE1MQ29sbGVjdGlvbnxOb2RlTGlzdHxPYmplY3QpXFxdJC8udGVzdChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFyaWFibGUpKSAmJlxuICAgICAgICAgICAgICAgIHZhcmlhYmxlLmxlbmd0aCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgKHZhcmlhYmxlLmxlbmd0aCA9PT0gMCB8fCAodHlwZW9mIHZhcmlhYmxlWzBdID09PSBcIm9iamVjdFwiICYmIHZhcmlhYmxlWzBdLm5vZGVUeXBlID4gMCkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qIERldGVybWluZSBpZiB2YXJpYWJsZSBpcyBhIHdyYXBwZWQgalF1ZXJ5IG9yIFplcHRvIGVsZW1lbnQuICovXG4gICAgICAgIGlzV3JhcHBlZDogZnVuY3Rpb24gKHZhcmlhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFyaWFibGUgJiYgKHZhcmlhYmxlLmpxdWVyeSB8fCAod2luZG93LlplcHRvICYmIHdpbmRvdy5aZXB0by56ZXB0by5pc1oodmFyaWFibGUpKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaXNTVkc6IGZ1bmN0aW9uICh2YXJpYWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5TVkdFbGVtZW50ICYmICh2YXJpYWJsZSBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKioqKioqKioqKioqKioqKlxuICAgICAgIERlcGVuZGVuY2llc1xuICAgICoqKioqKioqKioqKioqKioqL1xuXG4gICAgLyogTG9jYWwgdG8gb3VyIFZlbG9jaXR5IHNjb3BlLCBhc3NpZ24gJCB0byBvdXIgalF1ZXJ5IHNoaW0gaWYgalF1ZXJ5IGl0c2VsZiBpc24ndCBsb2FkZWQuXG4gICAgICAgKFRoZSBzaGltIGlzIGEgcG9ydCBvZiB0aGUgalF1ZXJ5IHV0aWxpdHkgZnVuY3Rpb25zIHRoYXQgVmVsb2NpdHkgdXNlcy4pICovXG4gICAgLyogTm90ZTogV2UgY2FuJ3QgZGVmYXVsdCB0byBaZXB0byBzaW5jZSB0aGUgc2hpbWxlc3MgdmVyc2lvbiBvZiBWZWxvY2l0eSBkb2VzIG5vdCB3b3JrIHdpdGggWmVwdG8sXG4gICAgICAgd2hpY2ggaXMgbWlzc2luZyBzZXZlcmFsIHV0aWxpdHkgZnVuY3Rpb25zIHRoYXQgVmVsb2NpdHkgcmVxdWlyZXMuICovXG4gICAgdmFyICQgPSB3aW5kb3cualF1ZXJ5IHx8IChnbG9iYWwuVmVsb2NpdHkgJiYgZ2xvYmFsLlZlbG9jaXR5LlV0aWxpdGllcyk7XG5cbiAgICBpZiAoISQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVmVsb2NpdHk6IEVpdGhlciBqUXVlcnkgb3IgVmVsb2NpdHkncyBqUXVlcnkgc2hpbSBtdXN0IGZpcnN0IGJlIGxvYWRlZC5cIilcbiAgICAvKiBXZSBhbGxvdyB0aGUgZ2xvYmFsIFZlbG9jaXR5IHZhcmlhYmxlIHRvIHByZS1leGlzdCBzbyBsb25nIGFzIHdlIHdlcmUgcmVzcG9uc2libGUgZm9yIGl0cyBjcmVhdGlvblxuICAgICAgKHZpYSB0aGUgalF1ZXJ5IHNoaW0sIHdoaWNoIHVuaXF1ZWx5IGFzc2lnbnMgYSBVdGlsaXRpZXMgcHJvcGVydHkgdG8gdGhlIFZlbG9jaXR5IG9iamVjdCkuICovXG4gICAgfSBlbHNlIGlmIChnbG9iYWwuVmVsb2NpdHkgIT09IHVuZGVmaW5lZCAmJiAhZ2xvYmFsLlZlbG9jaXR5LlV0aWxpdGllcykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJWZWxvY2l0eTogTmFtZXNwYWNlIGlzIG9jY3VwaWVkLlwiKTtcbiAgICAvKiBOb3RoaW5nIHByZXZlbnRzIFZlbG9jaXR5IGZyb20gd29ya2luZyBvbiBJRTYrNywgYnV0IGl0IGlzIG5vdCB3b3J0aCB0aGUgdGltZSB0byB0ZXN0IG9uIHRoZW0uXG4gICAgICAgUmV2ZXJ0IHRvIGpRdWVyeSdzICQuYW5pbWF0ZSgpLCBhbmQgbG9zZSBWZWxvY2l0eSdzIGV4dHJhIGZlYXR1cmVzLiAqL1xuICAgIH0gZWxzZSBpZiAoSUUgPD0gNykge1xuICAgICAgICBpZiAoIXdpbmRvdy5qUXVlcnkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlZlbG9jaXR5OiBGb3IgSUU8PTcsIFZlbG9jaXR5IGZhbGxzIGJhY2sgdG8galF1ZXJ5LCB3aGljaCBtdXN0IGZpcnN0IGJlIGxvYWRlZC5cIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aW5kb3cualF1ZXJ5LmZuLnZlbG9jaXR5ID0gd2luZG93LmpRdWVyeS5mbi5hbmltYXRlO1xuXG4gICAgICAgICAgICAvKiBOb3cgdGhhdCAkLmZuLnZlbG9jaXR5IGlzIGFsaWFzZWQsIGFib3J0IHRoaXMgVmVsb2NpdHkgZGVjbGFyYXRpb24uICovXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAvKiBJRTggZG9lc24ndCB3b3JrIHdpdGggdGhlIGpRdWVyeSBzaGltOyBpdCByZXF1aXJlcyBqUXVlcnkgcHJvcGVyLiAqL1xuICAgIH0gZWxzZSBpZiAoSUUgPT09IDggJiYgIXdpbmRvdy5qUXVlcnkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVmVsb2NpdHk6IEZvciBJRTgsIFZlbG9jaXR5IHJlcXVpcmVzIGpRdWVyeSB0byBiZSBsb2FkZWQuIChWZWxvY2l0eSdzIGpRdWVyeSBzaGltIGRvZXMgbm90IHdvcmsgd2l0aCBJRTguKVwiKTtcbiAgICB9XG5cbiAgICAvKiBTaG9ydGhhbmQgYWxpYXMgZm9yIGpRdWVyeSdzICQuZGF0YSgpIHV0aWxpdHkuICovXG4gICAgZnVuY3Rpb24gRGF0YSAoZWxlbWVudCkge1xuICAgICAgICAvKiBIYXJkY29kZSBhIHJlZmVyZW5jZSB0byB0aGUgcGx1Z2luIG5hbWUuICovXG4gICAgICAgIHZhciByZXNwb25zZSA9ICQuZGF0YShlbGVtZW50LCBOQU1FKTtcblxuICAgICAgICAvKiBqUXVlcnkgPD0xLjQuMiByZXR1cm5zIG51bGwgaW5zdGVhZCBvZiB1bmRlZmluZWQgd2hlbiBubyBtYXRjaCBpcyBmb3VuZC4gV2Ugbm9ybWFsaXplIHRoaXMgYmVoYXZpb3IuICovXG4gICAgICAgIHJldHVybiByZXNwb25zZSA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IHJlc3BvbnNlO1xuICAgIH07XG5cbiAgICAvKioqKioqKioqKioqKlxuICAgICAgICBTdGF0ZVxuICAgICoqKioqKioqKioqKiovXG5cbiAgICAvKiBWZWxvY2l0eSByZWdpc3RlcnMgaXRzZWxmIG9udG8gYSBnbG9iYWwgY29udGFpbmVyICh3aW5kb3cualF1ZXJ5IHx8IHdpbmRvdy5aZXB0byB8fCB3aW5kb3cpIHNvIHRoYXQgdGhhdFxuICAgICAgIGNlcnRhaW4gZmVhdHVyZXMgYXJlIGFjY2Vzc2libGUgYmV5b25kIGp1c3QgYSBwZXItZWxlbWVudCBzY29wZS4gVGhpcyBtYXN0ZXIgb2JqZWN0IGNvbnRhaW5zIGFuIC5hbmltYXRlKCkgbWV0aG9kLFxuICAgICAgIHdoaWNoIGlzIGxhdGVyIGFzc2lnbmVkIHRvICQuZm4gKGlmIGpRdWVyeSBvciBaZXB0byBhcmUgcHJlc2VudCkuIEFjY29yZGluZ2x5LCBWZWxvY2l0eSBjYW4gYm90aCBhY3Qgb24gd3JhcHBlZFxuICAgICAgIERPTSBlbGVtZW50cyBhbmQgc3RhbmQgYWxvbmUgZm9yIHRhcmdldGluZyByYXcgRE9NIGVsZW1lbnRzLiAqL1xuICAgIC8qIE5vdGU6IFRoZSBnbG9iYWwgb2JqZWN0IGFsc28gZG91YmxlcyBhcyBhIHB1YmxpY2x5LWFjY2Vzc2libGUgZGF0YSBzdG9yZSBmb3IgdGhlIHB1cnBvc2VzIG9mIHVuaXQgdGVzdGluZy4gKi9cbiAgICAvKiBOb3RlOiBBbGlhcyB0aGUgbG93ZXJjYXNlIGFuZCB1cHBlcmNhc2UgdmFyaWFudHMgb2YgXCJ2ZWxvY2l0eVwiIHRvIG1pbmltaXplIHVzZXIgY29uZnVzaW9uIGR1ZSB0byB0aGUgbG93ZXJjYXNlIG5hdHVyZSBvZiB0aGUgJC5mbiBleHRlbnNpb24uICovXG4gICAgdmFyIFZlbG9jaXR5ID0gZ2xvYmFsLlZlbG9jaXR5ID0gZ2xvYmFsLnZlbG9jaXR5ID0ge1xuICAgICAgICAvKiBDb250YWluZXIgZm9yIHBhZ2Utd2lkZSBWZWxvY2l0eSBzdGF0ZSBkYXRhLiAqL1xuICAgICAgICBTdGF0ZToge1xuICAgICAgICAgICAgLyogRGV0ZWN0IG1vYmlsZSBkZXZpY2VzIHRvIGRldGVybWluZSBpZiBtb2JpbGVIQSBzaG91bGQgYmUgdHVybmVkIG9uLiAqL1xuICAgICAgICAgICAgaXNNb2JpbGU6IC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSxcbiAgICAgICAgICAgIC8qIFRoZSBtb2JpbGVIQSBvcHRpb24ncyBiZWhhdmlvciBjaGFuZ2VzIG9uIG9sZGVyIEFuZHJvaWQgZGV2aWNlcyAoR2luZ2VyYnJlYWQsIHZlcnNpb25zIDIuMy4zLTIuMy43KS4gKi9cbiAgICAgICAgICAgIGlzQW5kcm9pZDogL0FuZHJvaWQvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpLFxuICAgICAgICAgICAgaXNHaW5nZXJicmVhZDogL0FuZHJvaWQgMlxcLjNcXC5bMy03XS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCksXG4gICAgICAgICAgICBpc0Nocm9tZTogd2luZG93LmNocm9tZSxcbiAgICAgICAgICAgIGlzRmlyZWZveDogL0ZpcmVmb3gvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpLFxuICAgICAgICAgICAgLyogQ3JlYXRlIGEgY2FjaGVkIGVsZW1lbnQgZm9yIHJlLXVzZSB3aGVuIGNoZWNraW5nIGZvciBDU1MgcHJvcGVydHkgcHJlZml4ZXMuICovXG4gICAgICAgICAgICBwcmVmaXhFbGVtZW50OiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxuICAgICAgICAgICAgLyogQ2FjaGUgZXZlcnkgcHJlZml4IG1hdGNoIHRvIGF2b2lkIHJlcGVhdGluZyBsb29rdXBzLiAqL1xuICAgICAgICAgICAgcHJlZml4TWF0Y2hlczoge30sXG4gICAgICAgICAgICAvKiBDYWNoZSB0aGUgYW5jaG9yIHVzZWQgZm9yIGFuaW1hdGluZyB3aW5kb3cgc2Nyb2xsaW5nLiAqL1xuICAgICAgICAgICAgc2Nyb2xsQW5jaG9yOiBudWxsLFxuICAgICAgICAgICAgLyogQ2FjaGUgdGhlIHByb3BlcnR5IG5hbWVzIGFzc29jaWF0ZWQgd2l0aCB0aGUgc2Nyb2xsIGFuY2hvci4gKi9cbiAgICAgICAgICAgIHNjcm9sbFByb3BlcnR5TGVmdDogbnVsbCxcbiAgICAgICAgICAgIHNjcm9sbFByb3BlcnR5VG9wOiBudWxsLFxuICAgICAgICAgICAgLyogS2VlcCB0cmFjayBvZiB3aGV0aGVyIG91ciBSQUYgdGljayBpcyBydW5uaW5nLiAqL1xuICAgICAgICAgICAgaXNUaWNraW5nOiBmYWxzZSxcbiAgICAgICAgICAgIC8qIENvbnRhaW5lciBmb3IgZXZlcnkgaW4tcHJvZ3Jlc3MgY2FsbCB0byBWZWxvY2l0eS4gKi9cbiAgICAgICAgICAgIGNhbGxzOiBbXVxuICAgICAgICB9LFxuICAgICAgICAvKiBWZWxvY2l0eSdzIGN1c3RvbSBDU1Mgc3RhY2suIE1hZGUgZ2xvYmFsIGZvciB1bml0IHRlc3RpbmcuICovXG4gICAgICAgIENTUzogeyAvKiBEZWZpbmVkIGJlbG93LiAqLyB9LFxuICAgICAgICAvKiBEZWZpbmVkIGJ5IFZlbG9jaXR5J3Mgb3B0aW9uYWwgalF1ZXJ5IHNoaW0uICovXG4gICAgICAgIFV0aWxpdGllczogd2luZG93LmpRdWVyeSxcbiAgICAgICAgLyogQ29udGFpbmVyIGZvciB0aGUgdXNlcidzIGN1c3RvbSBhbmltYXRpb24gc2VxdWVuY2VzIHRoYXQgYXJlIHJlZmVyZW5jZWQgYnkgbmFtZSBpbiBwbGFjZSBvZiBhIHByb3BlcnRpZXMgbWFwIG9iamVjdC4gKi9cbiAgICAgICAgU2VxdWVuY2VzOiB7XG4gICAgICAgICAgICAvKiBNYW51YWxseSByZWdpc3RlcmVkIGJ5IHRoZSB1c2VyLiBMZWFybiBtb3JlOiBWZWxvY2l0eUpTLm9yZy8jc2VxdWVuY2VzICovXG4gICAgICAgIH0sXG4gICAgICAgIEVhc2luZ3M6IHtcbiAgICAgICAgICAgIC8qIERlZmluZWQgYmVsb3cuICovXG4gICAgICAgIH0sXG4gICAgICAgIC8qIEF0dGVtcHQgdG8gdXNlIEVTNiBQcm9taXNlcyBieSBkZWZhdWx0LiBVc2VycyBjYW4gb3ZlcnJpZGUgdGhpcyB3aXRoIGEgdGhpcmQtcGFydHkgcHJvbWlzZXMgbGlicmFyeS4gKi9cbiAgICAgICAgUHJvbWlzZTogd2luZG93LlByb21pc2UsXG4gICAgICAgIC8qIFBhZ2Utd2lkZSBvcHRpb24gZGVmYXVsdHMsIHdoaWNoIGNhbiBiZSBvdmVycmlkZW4gYnkgdGhlIHVzZXIuICovXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBxdWV1ZTogXCJcIixcbiAgICAgICAgICAgIGR1cmF0aW9uOiBERUZBVUxUX0RVUkFUSU9OLFxuICAgICAgICAgICAgZWFzaW5nOiBERUZBVUxUX0VBU0lORyxcbiAgICAgICAgICAgIGJlZ2luOiBudWxsLFxuICAgICAgICAgICAgY29tcGxldGU6IG51bGwsXG4gICAgICAgICAgICBwcm9ncmVzczogbnVsbCxcbiAgICAgICAgICAgIGRpc3BsYXk6IG51bGwsXG4gICAgICAgICAgICBsb29wOiBmYWxzZSxcbiAgICAgICAgICAgIGRlbGF5OiBmYWxzZSxcbiAgICAgICAgICAgIG1vYmlsZUhBOiB0cnVlLFxuICAgICAgICAgICAgLyogU2V0IHRvIGZhbHNlIHRvIHByZXZlbnQgcHJvcGVydHkgdmFsdWVzIGZyb20gYmVpbmcgY2FjaGVkIGJldHdlZW4gY29uc2VjdXRpdmUgVmVsb2NpdHktaW5pdGlhdGVkIGNoYWluIGNhbGxzLiAqL1xuICAgICAgICAgICAgX2NhY2hlVmFsdWVzOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIC8qIFZlbG9jaXR5J3MgY29yZSBhbmltYXRpb24gbWV0aG9kLCBzdWJzZXF1ZW50bHkgYWxpYXNlZCB0byAkLmZuLiAqL1xuICAgICAgICBhbmltYXRlOiBmdW5jdGlvbiAoKSB7IC8qIERlZmluZWQgYmVsb3cuICovIH0sXG4gICAgICAgIC8qIFNldCB0byB0cnVlIHRvIGZvcmNlIGEgZHVyYXRpb24gb2YgMW1zIGZvciBhbGwgYW5pbWF0aW9ucyBzbyB0aGF0IFVJIHRlc3RpbmcgY2FuIGJlIHBlcmZvcm1lZCB3aXRob3V0IHdhaXRpbmcgb24gYW5pbWF0aW9ucyB0byBjb21wbGV0ZS4gKi9cbiAgICAgICAgbW9jazogZmFsc2UsXG4gICAgICAgIHZlcnNpb246IHsgbWFqb3I6IDAsIG1pbm9yOiA5LCBwYXRjaDogMCB9LFxuICAgICAgICAvKiBTZXQgdG8gMSBvciAyIChtb3N0IHZlcmJvc2UpIHRvIG91dHB1dCBkZWJ1ZyBpbmZvIHRvIGNvbnNvbGUuICovXG4gICAgICAgIGRlYnVnOiBmYWxzZVxuICAgIH07XG5cbiAgICAvKiBSZXRyaWV2ZSB0aGUgYXBwcm9wcmlhdGUgc2Nyb2xsIGFuY2hvciBhbmQgcHJvcGVydHkgbmFtZSBmb3IgdGhlIGJyb3dzZXI6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XaW5kb3cuc2Nyb2xsWSAqL1xuICAgIGlmICh3aW5kb3cucGFnZVlPZmZzZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBWZWxvY2l0eS5TdGF0ZS5zY3JvbGxBbmNob3IgPSB3aW5kb3c7XG4gICAgICAgIFZlbG9jaXR5LlN0YXRlLnNjcm9sbFByb3BlcnR5TGVmdCA9IFwicGFnZVhPZmZzZXRcIjtcbiAgICAgICAgVmVsb2NpdHkuU3RhdGUuc2Nyb2xsUHJvcGVydHlUb3AgPSBcInBhZ2VZT2Zmc2V0XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgVmVsb2NpdHkuU3RhdGUuc2Nyb2xsQW5jaG9yID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IHx8IGRvY3VtZW50LmJvZHkucGFyZW50Tm9kZSB8fCBkb2N1bWVudC5ib2R5O1xuICAgICAgICBWZWxvY2l0eS5TdGF0ZS5zY3JvbGxQcm9wZXJ0eUxlZnQgPSBcInNjcm9sbExlZnRcIjtcbiAgICAgICAgVmVsb2NpdHkuU3RhdGUuc2Nyb2xsUHJvcGVydHlUb3AgPSBcInNjcm9sbFRvcFwiO1xuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKlxuICAgICAgICBUaW1pbmdcbiAgICAqKioqKioqKioqKioqKi9cblxuICAgIC8qIEluYWN0aXZlIGJyb3dzZXIgdGFicyBwYXVzZSByQUYsIHdoaWNoIHJlc3VsdHMgaW4gYWxsIGFjdGl2ZSBhbmltYXRpb25zIGltbWVkaWF0ZWx5IHNwcmludGluZyB0byB0aGVpciBjb21wbGV0aW9uIHN0YXRlcyB3aGVuIHRoZSB0YWIgcmVmb2N1c2VzLlxuICAgICAgIFRvIGdldCBhcm91bmQgdGhpcywgd2UgZHluYW1pY2FsbHkgc3dpdGNoIHJBRiB0byBzZXRUaW1lb3V0ICh3aGljaCB0aGUgYnJvd3NlciAqZG9lc24ndCogcGF1c2UpIHdoZW4gdGhlIHRhYiBsb3NlcyBmb2N1cy4gV2Ugc2tpcCB0aGlzIGZvciBtb2JpbGVcbiAgICAgICBkZXZpY2VzIHRvIGF2b2lkIHdhc3RpbmcgYmF0dGVyeSBwb3dlciBvbiBpbmFjdGl2ZSB0YWJzLiAqL1xuICAgIC8qIE5vdGU6IFRhYiBmb2N1cyBkZXRlY3Rpb24gZG9lc24ndCB3b3JrIG9uIG9sZGVyIHZlcnNpb25zIG9mIElFLCBidXQgdGhhdCdzIG9rYXkgc2luY2UgdGhleSBkb24ndCBzdXBwb3J0IHJBRiB0byBiZWdpbiB3aXRoLiAqL1xuICAgIGlmICghVmVsb2NpdHkuU3RhdGUuaXNNb2JpbGUgJiYgZG9jdW1lbnQuaGlkZGVuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvKiBSZWFzc2lnbiB0aGUgckFGIGZ1bmN0aW9uICh3aGljaCB0aGUgZ2xvYmFsIHRpY2soKSBmdW5jdGlvbiB1c2VzKSBiYXNlZCBvbiB0aGUgdGFiJ3MgZm9jdXMgc3RhdGUuICovXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuaGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgckFGID0gZnVuY3Rpb24oY2FsbGJhY2spIHsgXG4gICAgICAgICAgICAgICAgICAgIC8qIFRoZSB0aWNrIGZ1bmN0aW9uIG5lZWRzIGEgdHJ1dGh5IGZpcnN0IGFyZ3VtZW50IHRvIHBhc3MgaXRzIGludGVybmFsIHRpbWVzdGFtcCBjaGVjay4gKi9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNhbGxiYWNrKHRydWUpIH0sIDE2KTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLyogVGhlIHJBRiBsb29wIGhhcyBiZWVuIHBhdXNlZCBieSB0aGUgYnJvd3Nlciwgc28gd2UgbWFudWFsbHkgcmVzdGFydCB0aGUgdGljay4gKi9cbiAgICAgICAgICAgICAgICB0aWNrKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJBRiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgckFGUG9sbHlmaWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKipcbiAgICAgICAgRWFzaW5nXG4gICAgKioqKioqKioqKioqKiovXG5cbiAgICAvKiBTdGVwIGVhc2luZyBnZW5lcmF0b3IuICovXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVTdGVwIChzdGVwcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHAgKiBzdGVwcykgKiAoMSAvIHN0ZXBzKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKiBCZXppZXIgY3VydmUgZnVuY3Rpb24gZ2VuZXJhdG9yLiBDb3B5cmlnaHQgR2FldGFuIFJlbmF1ZGVhdS4gTUlUIExpY2Vuc2U6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTUlUX0xpY2Vuc2UgKi9cbiAgICB2YXIgZ2VuZXJhdGVCZXppZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBBIChhQTEsIGFBMikge1xuICAgICAgICAgICAgcmV0dXJuIDEuMCAtIDMuMCAqIGFBMiArIDMuMCAqIGFBMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIEIgKGFBMSwgYUEyKSB7XG4gICAgICAgICAgICByZXR1cm4gMy4wICogYUEyIC0gNi4wICogYUExO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIEMgKGFBMSkge1xuICAgICAgICAgICAgcmV0dXJuIDMuMCAqIGFBMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNhbGNCZXppZXIgKGFULCBhQTEsIGFBMikge1xuICAgICAgICAgICAgcmV0dXJuICgoQShhQTEsIGFBMikqYVQgKyBCKGFBMSwgYUEyKSkqYVQgKyBDKGFBMSkpKmFUO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0U2xvcGUgKGFULCBhQTEsIGFBMikge1xuICAgICAgICAgICAgcmV0dXJuIDMuMCAqIEEoYUExLCBhQTIpKmFUKmFUICsgMi4wICogQihhQTEsIGFBMikgKiBhVCArIEMoYUExKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAobVgxLCBtWTEsIG1YMiwgbVkyKSB7XG4gICAgICAgICAgICAvKiBNdXN0IGNvbnRhaW4gZm91ciBhcmd1bWVudHMuICovXG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCAhPT0gNCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogQXJndW1lbnRzIG11c3QgYmUgbnVtYmVycy4gKi9cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgKytpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbaV0gIT09IFwibnVtYmVyXCIgfHwgaXNOYU4oYXJndW1lbnRzW2ldKSB8fCAhaXNGaW5pdGUoYXJndW1lbnRzW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKiBYIHZhbHVlcyBtdXN0IGJlIGluIHRoZSBbMCwgMV0gcmFuZ2UuICovXG4gICAgICAgICAgICBtWDEgPSBNYXRoLm1pbihtWDEsIDEpO1xuICAgICAgICAgICAgbVgyID0gTWF0aC5taW4obVgyLCAxKTtcbiAgICAgICAgICAgIG1YMSA9IE1hdGgubWF4KG1YMSwgMCk7XG4gICAgICAgICAgICBtWDIgPSBNYXRoLm1heChtWDIsIDApO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRURm9yWCAoYVgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYUd1ZXNzVCA9IGFYO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRTbG9wZSA9IGdldFNsb3BlKGFHdWVzc1QsIG1YMSwgbVgyKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFNsb3BlID09PSAwLjApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhR3Vlc3NUO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRYID0gY2FsY0JlemllcihhR3Vlc3NULCBtWDEsIG1YMikgLSBhWDtcblxuICAgICAgICAgICAgICAgICAgICBhR3Vlc3NUIC09IGN1cnJlbnRYIC8gY3VycmVudFNsb3BlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBhR3Vlc3NUO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGFYKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1YMSA9PT0gbVkxICYmIG1YMiA9PT0gbVkyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhWDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsY0JlemllcihnZXRURm9yWChhWCksIG1ZMSwgbVkyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH0oKSk7XG5cbiAgICAvKiBSdW5nZS1LdXR0YSBzcHJpbmcgcGh5c2ljcyBmdW5jdGlvbiBnZW5lcmF0b3IuIEFkYXB0ZWQgZnJvbSBGcmFtZXIuanMsIGNvcHlyaWdodCBLb2VuIEJvay4gTUlUIExpY2Vuc2U6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTUlUX0xpY2Vuc2UgKi9cbiAgICAvKiBHaXZlbiBhIHRlbnNpb24sIGZyaWN0aW9uLCBhbmQgZHVyYXRpb24sIGEgc2ltdWxhdGlvbiBhdCA2MEZQUyB3aWxsIGZpcnN0IHJ1biB3aXRob3V0IGEgZGVmaW5lZCBkdXJhdGlvbiBpbiBvcmRlciB0byBjYWxjdWxhdGUgdGhlIGZ1bGwgcGF0aC4gQSBzZWNvbmQgcGFzc1xuICAgICAgIHRoZW4gYWRqdXN0cyB0aGUgdGltZSBkZWxhIC0tIHVzaW5nIHRoZSByZWxhdGlvbiBiZXR3ZWVuIGFjdHVhbCB0aW1lIGFuZCBkdXJhdGlvbiAtLSB0byBjYWxjdWxhdGUgdGhlIHBhdGggZm9yIHRoZSBkdXJhdGlvbi1jb25zdHJhaW5lZCBhbmltYXRpb24uICovXG4gICAgdmFyIGdlbmVyYXRlU3ByaW5nUks0ID0gKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBmdW5jdGlvbiBzcHJpbmdBY2NlbGVyYXRpb25Gb3JTdGF0ZSAoc3RhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiAoLXN0YXRlLnRlbnNpb24gKiBzdGF0ZS54KSAtIChzdGF0ZS5mcmljdGlvbiAqIHN0YXRlLnYpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc3ByaW5nRXZhbHVhdGVTdGF0ZVdpdGhEZXJpdmF0aXZlIChpbml0aWFsU3RhdGUsIGR0LCBkZXJpdmF0aXZlKSB7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgeDogaW5pdGlhbFN0YXRlLnggKyBkZXJpdmF0aXZlLmR4ICogZHQsXG4gICAgICAgICAgICAgICAgdjogaW5pdGlhbFN0YXRlLnYgKyBkZXJpdmF0aXZlLmR2ICogZHQsXG4gICAgICAgICAgICAgICAgdGVuc2lvbjogaW5pdGlhbFN0YXRlLnRlbnNpb24sXG4gICAgICAgICAgICAgICAgZnJpY3Rpb246IGluaXRpYWxTdGF0ZS5mcmljdGlvblxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIHsgZHg6IHN0YXRlLnYsIGR2OiBzcHJpbmdBY2NlbGVyYXRpb25Gb3JTdGF0ZShzdGF0ZSkgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNwcmluZ0ludGVncmF0ZVN0YXRlIChzdGF0ZSwgZHQpIHtcbiAgICAgICAgICAgIHZhciBhID0ge1xuICAgICAgICAgICAgICAgICAgICBkeDogc3RhdGUudixcbiAgICAgICAgICAgICAgICAgICAgZHY6IHNwcmluZ0FjY2VsZXJhdGlvbkZvclN0YXRlKHN0YXRlKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYiA9IHNwcmluZ0V2YWx1YXRlU3RhdGVXaXRoRGVyaXZhdGl2ZShzdGF0ZSwgZHQgKiAwLjUsIGEpLFxuICAgICAgICAgICAgICAgIGMgPSBzcHJpbmdFdmFsdWF0ZVN0YXRlV2l0aERlcml2YXRpdmUoc3RhdGUsIGR0ICogMC41LCBiKSxcbiAgICAgICAgICAgICAgICBkID0gc3ByaW5nRXZhbHVhdGVTdGF0ZVdpdGhEZXJpdmF0aXZlKHN0YXRlLCBkdCwgYyksXG4gICAgICAgICAgICAgICAgZHhkdCA9IDEuMCAvIDYuMCAqIChhLmR4ICsgMi4wICogKGIuZHggKyBjLmR4KSArIGQuZHgpLFxuICAgICAgICAgICAgICAgIGR2ZHQgPSAxLjAgLyA2LjAgKiAoYS5kdiArIDIuMCAqIChiLmR2ICsgYy5kdikgKyBkLmR2KTtcblxuICAgICAgICAgICAgc3RhdGUueCA9IHN0YXRlLnggKyBkeGR0ICogZHQ7XG4gICAgICAgICAgICBzdGF0ZS52ID0gc3RhdGUudiArIGR2ZHQgKiBkdDtcblxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNwcmluZ1JLNEZhY3RvcnkgKHRlbnNpb24sIGZyaWN0aW9uLCBkdXJhdGlvbikge1xuXG4gICAgICAgICAgICB2YXIgaW5pdFN0YXRlID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiAtMSxcbiAgICAgICAgICAgICAgICAgICAgdjogMCxcbiAgICAgICAgICAgICAgICAgICAgdGVuc2lvbjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgZnJpY3Rpb246IG51bGxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBhdGggPSBbMF0sXG4gICAgICAgICAgICAgICAgdGltZV9sYXBzZWQgPSAwLFxuICAgICAgICAgICAgICAgIHRvbGVyYW5jZSA9IDEgLyAxMDAwMCxcbiAgICAgICAgICAgICAgICBEVCA9IDE2IC8gMTAwMCxcbiAgICAgICAgICAgICAgICBoYXZlX2R1cmF0aW9uLCBkdCwgbGFzdF9zdGF0ZTtcblxuICAgICAgICAgICAgdGVuc2lvbiA9IHBhcnNlRmxvYXQodGVuc2lvbikgfHwgNTAwO1xuICAgICAgICAgICAgZnJpY3Rpb24gPSBwYXJzZUZsb2F0KGZyaWN0aW9uKSB8fCAyMDtcbiAgICAgICAgICAgIGR1cmF0aW9uID0gZHVyYXRpb24gfHwgbnVsbDtcblxuICAgICAgICAgICAgaW5pdFN0YXRlLnRlbnNpb24gPSB0ZW5zaW9uO1xuICAgICAgICAgICAgaW5pdFN0YXRlLmZyaWN0aW9uID0gZnJpY3Rpb247XG5cbiAgICAgICAgICAgIGhhdmVfZHVyYXRpb24gPSBkdXJhdGlvbiAhPT0gbnVsbDtcblxuICAgICAgICAgICAgLyogQ2FsY3VsYXRlIHRoZSBhY3R1YWwgdGltZSBpdCB0YWtlcyBmb3IgdGhpcyBhbmltYXRpb24gdG8gY29tcGxldGUgd2l0aCB0aGUgcHJvdmlkZWQgY29uZGl0aW9ucy4gKi9cbiAgICAgICAgICAgIGlmIChoYXZlX2R1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgLyogUnVuIHRoZSBzaW11bGF0aW9uIHdpdGhvdXQgYSBkdXJhdGlvbi4gKi9cbiAgICAgICAgICAgICAgICB0aW1lX2xhcHNlZCA9IHNwcmluZ1JLNEZhY3RvcnkodGVuc2lvbiwgZnJpY3Rpb24pO1xuICAgICAgICAgICAgICAgIC8qIENvbXB1dGUgdGhlIGFkanVzdGVkIHRpbWUgZGVsdGEuICovXG4gICAgICAgICAgICAgICAgZHQgPSB0aW1lX2xhcHNlZCAvIGR1cmF0aW9uICogRFQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGR0ID0gRFQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgLyogTmV4dC9zdGVwIGZ1bmN0aW9uIC4qL1xuICAgICAgICAgICAgICAgIGxhc3Rfc3RhdGUgPSBzcHJpbmdJbnRlZ3JhdGVTdGF0ZShsYXN0X3N0YXRlIHx8IGluaXRTdGF0ZSwgZHQpO1xuICAgICAgICAgICAgICAgIC8qIFN0b3JlIHRoZSBwb3NpdGlvbi4gKi9cbiAgICAgICAgICAgICAgICBwYXRoLnB1c2goMSArIGxhc3Rfc3RhdGUueCk7XG4gICAgICAgICAgICAgICAgdGltZV9sYXBzZWQgKz0gMTY7XG4gICAgICAgICAgICAgICAgLyogSWYgdGhlIGNoYW5nZSB0aHJlc2hvbGQgaXMgcmVhY2hlZCwgYnJlYWsuICovXG4gICAgICAgICAgICAgICAgaWYgKCEoTWF0aC5hYnMobGFzdF9zdGF0ZS54KSA+IHRvbGVyYW5jZSAmJiBNYXRoLmFicyhsYXN0X3N0YXRlLnYpID4gdG9sZXJhbmNlKSkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIElmIGR1cmF0aW9uIGlzIG5vdCBkZWZpbmVkLCByZXR1cm4gdGhlIGFjdHVhbCB0aW1lIHJlcXVpcmVkIGZvciBjb21wbGV0aW5nIHRoaXMgYW5pbWF0aW9uLiBPdGhlcndpc2UsIHJldHVybiBhIGNsb3N1cmUgdGhhdCBob2xkcyB0aGVcbiAgICAgICAgICAgICAgIGNvbXB1dGVkIHBhdGggYW5kIHJldHVybnMgYSBzbmFwc2hvdCBvZiB0aGUgcG9zaXRpb24gYWNjb3JkaW5nIHRvIGEgZ2l2ZW4gcGVyY2VudENvbXBsZXRlLiAqL1xuICAgICAgICAgICAgcmV0dXJuICFoYXZlX2R1cmF0aW9uID8gdGltZV9sYXBzZWQgOiBmdW5jdGlvbihwZXJjZW50Q29tcGxldGUpIHsgcmV0dXJuIHBhdGhbIChwZXJjZW50Q29tcGxldGUgKiAocGF0aC5sZW5ndGggLSAxKSkgfCAwIF07IH07XG4gICAgICAgIH07XG4gICAgfSgpKTtcblxuICAgIC8qIFZlbG9jaXR5IGVtYmVkcyB0aGUgbmFtZWQgZWFzaW5ncyBmcm9tIGpRdWVyeSwgalF1ZXJ5IFVJLCBhbmQgQ1NTMyBpbiBvcmRlciB0byBzYXZlIHVzZXJzIGZyb20gaGF2aW5nIHRvIGluY2x1ZGUgYWRkaXRpb25hbCBsaWJyYXJpZXMgb24gdGhlaXIgcGFnZS4gKi9cbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAvKiBqUXVlcnkncyBkZWZhdWx0IG5hbWVkIGVhc2luZyB0eXBlcy4gKi9cbiAgICAgICAgVmVsb2NpdHkuRWFzaW5nc1tcImxpbmVhclwiXSA9IGZ1bmN0aW9uKHApIHtcbiAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICB9O1xuXG4gICAgICAgIFZlbG9jaXR5LkVhc2luZ3NbXCJzd2luZ1wiXSA9IGZ1bmN0aW9uKHApIHtcbiAgICAgICAgICAgIHJldHVybiAwLjUgLSBNYXRoLmNvcyhwICogTWF0aC5QSSkgLyAyO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qIEJvbnVzIFwic3ByaW5nXCIgZWFzaW5nLCB3aGljaCBpcyBhIGxlc3MgZXhhZ2dlcmF0ZWQgdmVyc2lvbiBvZiBlYXNlSW5PdXRFbGFzdGljLiAqL1xuICAgICAgICBWZWxvY2l0eS5FYXNpbmdzW1wic3ByaW5nXCJdID0gZnVuY3Rpb24ocCkge1xuICAgICAgICAgICAgcmV0dXJuIDEgLSAoTWF0aC5jb3MocCAqIDQuNSAqIE1hdGguUEkpICogTWF0aC5leHAoLXAgKiA2KSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyogQ1NTMydzIG5hbWVkIGVhc2luZyB0eXBlcy4gKi9cbiAgICAgICAgVmVsb2NpdHkuRWFzaW5nc1tcImVhc2VcIl0gPSBnZW5lcmF0ZUJlemllcigwLjI1LCAwLjEsIDAuMjUsIDEuMCk7XG4gICAgICAgIFZlbG9jaXR5LkVhc2luZ3NbXCJlYXNlLWluXCJdID0gZ2VuZXJhdGVCZXppZXIoMC40MiwgMC4wLCAxLjAwLCAxLjApO1xuICAgICAgICBWZWxvY2l0eS5FYXNpbmdzW1wiZWFzZS1vdXRcIl0gPSBnZW5lcmF0ZUJlemllcigwLjAwLCAwLjAsIDAuNTgsIDEuMCk7XG4gICAgICAgIFZlbG9jaXR5LkVhc2luZ3NbXCJlYXNlLWluLW91dFwiXSA9IGdlbmVyYXRlQmV6aWVyKDAuNDIsIDAuMCwgMC41OCwgMS4wKTtcblxuICAgICAgICAvKiBqUXVlcnkgVUkncyBSb2JlcnQgUGVubmVyIGVhc2luZyBlcXVhdGlvbnMuIENvcHlyaWdodCBUaGUgalF1ZXJ5IEZvdW5kYXRpb24uIE1JVCBMaWNlbnNlOiBodHRwczovL2pxdWVyeS5vcmcvbGljZW5zZSAqL1xuICAgICAgICB2YXIgYmFzZUVhc2luZ3MgPSB7fTtcblxuICAgICAgICAkLmVhY2goW1wiUXVhZFwiLCBcIkN1YmljXCIsIFwiUXVhcnRcIiwgXCJRdWludFwiLCBcIkV4cG9cIl0sIGZ1bmN0aW9uKGksIG5hbWUpIHtcbiAgICAgICAgICAgIGJhc2VFYXNpbmdzW25hbWVdID0gZnVuY3Rpb24ocCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnBvdyhwLCBpICsgMik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICAkLmV4dGVuZChiYXNlRWFzaW5ncywge1xuICAgICAgICAgICAgU2luZTogZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMSAtIE1hdGguY29zKHAgKiBNYXRoLlBJIC8gMik7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBDaXJjOiBmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAxIC0gTWF0aC5zcXJ0KDEgLSBwICogcCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBFbGFzdGljOiBmdW5jdGlvbihwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHAgPT09IDAgfHwgcCA9PT0gMSA/IHAgOlxuICAgICAgICAgICAgICAgICAgICAtTWF0aC5wb3coMiwgOCAqIChwIC0gMSkpICogTWF0aC5zaW4oKChwIC0gMSkgKiA4MCAtIDcuNSkgKiBNYXRoLlBJIC8gMTUpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgQmFjazogZnVuY3Rpb24ocCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwICogcCAqICgzICogcCAtIDIpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgQm91bmNlOiBmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgICAgIHZhciBwb3cyLFxuICAgICAgICAgICAgICAgICAgICBib3VuY2UgPSA0O1xuXG4gICAgICAgICAgICAgICAgd2hpbGUgKHAgPCAoKHBvdzIgPSBNYXRoLnBvdygyLCAtLWJvdW5jZSkpIC0gMSkgLyAxMSkge31cbiAgICAgICAgICAgICAgICByZXR1cm4gMSAvIE1hdGgucG93KDQsIDMgLSBib3VuY2UpIC0gNy41NjI1ICogTWF0aC5wb3coKHBvdzIgKiAzIC0gMikgLyAyMiAtIHAsIDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvKiBqUXVlcnkncyBlYXNpbmcgZ2VuZXJhdG9yIGZvciB0aGUgb2JqZWN0IGFib3ZlLiAqL1xuICAgICAgICAkLmVhY2goYmFzZUVhc2luZ3MsIGZ1bmN0aW9uKG5hbWUsIGVhc2VJbikge1xuICAgICAgICAgICAgVmVsb2NpdHkuRWFzaW5nc1tcImVhc2VJblwiICsgbmFtZV0gPSBlYXNlSW47XG4gICAgICAgICAgICBWZWxvY2l0eS5FYXNpbmdzW1wiZWFzZU91dFwiICsgbmFtZV0gPSBmdW5jdGlvbihwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEgLSBlYXNlSW4oMSAtIHApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFZlbG9jaXR5LkVhc2luZ3NbXCJlYXNlSW5PdXRcIiArIG5hbWVdID0gZnVuY3Rpb24ocCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwIDwgMC41ID9cbiAgICAgICAgICAgICAgICAgICAgZWFzZUluKHAgKiAyKSAvIDIgOlxuICAgICAgICAgICAgICAgICAgICAxIC0gZWFzZUluKHAgKiAtMiArIDIpIC8gMjtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH0pKCk7XG5cbiAgICAvKiBEZXRlcm1pbmUgdGhlIGFwcHJvcHJpYXRlIGVhc2luZyB0eXBlIGdpdmVuIGFuIGVhc2luZyBpbnB1dC4gKi9cbiAgICBmdW5jdGlvbiBnZXRFYXNpbmcodmFsdWUsIGR1cmF0aW9uKSB7XG4gICAgICAgIHZhciBlYXNpbmcgPSB2YWx1ZTtcblxuICAgICAgICAvKiBUaGUgZWFzaW5nIG9wdGlvbiBjYW4gZWl0aGVyIGJlIGEgc3RyaW5nIHRoYXQgcmVmZXJlbmNlcyBhIHByZS1yZWdpc3RlcmVkIGVhc2luZyxcbiAgICAgICAgICAgb3IgaXQgY2FuIGJlIGEgdHdvLS9mb3VyLWl0ZW0gYXJyYXkgb2YgaW50ZWdlcnMgdG8gYmUgY29udmVydGVkIGludG8gYSBiZXppZXIvc3ByaW5nIGZ1bmN0aW9uLiAqL1xuICAgICAgICBpZiAoVHlwZS5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIC8qIEVuc3VyZSB0aGF0IHRoZSBlYXNpbmcgaGFzIGJlZW4gYXNzaWduZWQgdG8galF1ZXJ5J3MgVmVsb2NpdHkuRWFzaW5ncyBvYmplY3QuICovXG4gICAgICAgICAgICBpZiAoIVZlbG9jaXR5LkVhc2luZ3NbdmFsdWVdKSB7XG4gICAgICAgICAgICAgICAgZWFzaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoVHlwZS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGVhc2luZyA9IGdlbmVyYXRlU3RlcC5hcHBseShudWxsLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoVHlwZS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIC8qIHNwcmluZ1JLNCBtdXN0IGJlIHBhc3NlZCB0aGUgYW5pbWF0aW9uJ3MgZHVyYXRpb24uICovXG4gICAgICAgICAgICAvKiBOb3RlOiBJZiB0aGUgc3ByaW5nUks0IGFycmF5IGNvbnRhaW5zIG5vbi1udW1iZXJzLCBnZW5lcmF0ZVNwcmluZ1JLNCgpIHJldHVybnMgYW4gZWFzaW5nXG4gICAgICAgICAgICAgICBmdW5jdGlvbiBnZW5lcmF0ZWQgd2l0aCBkZWZhdWx0IHRlbnNpb24gYW5kIGZyaWN0aW9uIHZhbHVlcy4gKi9cbiAgICAgICAgICAgIGVhc2luZyA9IGdlbmVyYXRlU3ByaW5nUks0LmFwcGx5KG51bGwsIHZhbHVlLmNvbmNhdChbIGR1cmF0aW9uIF0pKTtcbiAgICAgICAgfSBlbHNlIGlmIChUeXBlLmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICAgICAgLyogTm90ZTogSWYgdGhlIGJlemllciBhcnJheSBjb250YWlucyBub24tbnVtYmVycywgZ2VuZXJhdGVCZXppZXIoKSByZXR1cm5zIGZhbHNlLiAqL1xuICAgICAgICAgICAgZWFzaW5nID0gZ2VuZXJhdGVCZXppZXIuYXBwbHkobnVsbCwgdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWFzaW5nID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBSZXZlcnQgdG8gdGhlIFZlbG9jaXR5LXdpZGUgZGVmYXVsdCBlYXNpbmcgdHlwZSwgb3IgZmFsbCBiYWNrIHRvIFwic3dpbmdcIiAod2hpY2ggaXMgYWxzbyBqUXVlcnkncyBkZWZhdWx0KVxuICAgICAgICAgICBpZiB0aGUgVmVsb2NpdHktd2lkZSBkZWZhdWx0IGhhcyBiZWVuIGluY29ycmVjdGx5IG1vZGlmaWVkLiAqL1xuICAgICAgICBpZiAoZWFzaW5nID09PSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKFZlbG9jaXR5LkVhc2luZ3NbVmVsb2NpdHkuZGVmYXVsdHMuZWFzaW5nXSkge1xuICAgICAgICAgICAgICAgIGVhc2luZyA9IFZlbG9jaXR5LmRlZmF1bHRzLmVhc2luZztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWFzaW5nID0gREVGQVVMVF9FQVNJTkc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWFzaW5nO1xuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKlxuICAgICAgICBDU1MgU3RhY2tcbiAgICAqKioqKioqKioqKioqKioqKi9cblxuICAgIC8qIFRoZSBDU1Mgb2JqZWN0IGlzIGEgaGlnaGx5IGNvbmRlbnNlZCBhbmQgcGVyZm9ybWFudCBDU1Mgc3RhY2sgdGhhdCBmdWxseSByZXBsYWNlcyBqUXVlcnkncy5cbiAgICAgICBJdCBoYW5kbGVzIHRoZSB2YWxpZGF0aW9uLCBnZXR0aW5nLCBhbmQgc2V0dGluZyBvZiBib3RoIHN0YW5kYXJkIENTUyBwcm9wZXJ0aWVzIGFuZCBDU1MgcHJvcGVydHkgaG9va3MuICovXG4gICAgLyogTm90ZTogQSBcIkNTU1wiIHNob3J0aGFuZCBpcyBhbGlhc2VkIHNvIHRoYXQgb3VyIGNvZGUgaXMgZWFzaWVyIHRvIHJlYWQuICovXG4gICAgdmFyIENTUyA9IFZlbG9jaXR5LkNTUyA9IHtcblxuICAgICAgICAvKioqKioqKioqKioqKlxuICAgICAgICAgICAgUmVnRXhcbiAgICAgICAgKioqKioqKioqKioqKi9cblxuICAgICAgICBSZWdFeDoge1xuICAgICAgICAgICAgLyogVW53cmFwIGEgcHJvcGVydHkgdmFsdWUncyBzdXJyb3VuZGluZyB0ZXh0LCBlLmcuIFwicmdiYSg0LCAzLCAyLCAxKVwiID09PiBcIjQsIDMsIDIsIDFcIiBhbmQgXCJyZWN0KDRweCAzcHggMnB4IDFweClcIiA9PT4gXCI0cHggM3B4IDJweCAxcHhcIi4gKi9cbiAgICAgICAgICAgIGlzSGV4OiAvXiMoW0EtZlxcZF17M30pezEsMn0kL2ksXG4gICAgICAgICAgICB2YWx1ZVVud3JhcDogL15bQS16XStcXCgoLiopXFwpJC9pLFxuICAgICAgICAgICAgd3JhcHBlZFZhbHVlQWxyZWFkeUV4dHJhY3RlZDogL1swLTkuXSsgWzAtOS5dKyBbMC05Ll0rKCBbMC05Ll0rKT8vLFxuICAgICAgICAgICAgLyogU3BsaXQgYSBtdWx0aS12YWx1ZSBwcm9wZXJ0eSBpbnRvIGFuIGFycmF5IG9mIHN1YnZhbHVlcywgZS5nLiBcInJnYmEoNCwgMywgMiwgMSkgNHB4IDNweCAycHggMXB4XCIgPT0+IFsgXCJyZ2JhKDQsIDMsIDIsIDEpXCIsIFwiNHB4XCIsIFwiM3B4XCIsIFwiMnB4XCIsIFwiMXB4XCIgXS4gKi9cbiAgICAgICAgICAgIHZhbHVlU3BsaXQ6IC8oW0Etel0rXFwoLitcXCkpfCgoW0EtejAtOSMtLl0rPykoPz1cXHN8JCkpL2lnXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqKioqKioqKioqKlxuICAgICAgICAgICAgTGlzdHNcbiAgICAgICAgKioqKioqKioqKioqL1xuXG4gICAgICAgIExpc3RzOiB7XG4gICAgICAgICAgICBjb2xvcnM6IFsgXCJmaWxsXCIsIFwic3Ryb2tlXCIsIFwic3RvcENvbG9yXCIsIFwiY29sb3JcIiwgXCJiYWNrZ3JvdW5kQ29sb3JcIiwgXCJib3JkZXJDb2xvclwiLCBcImJvcmRlclRvcENvbG9yXCIsIFwiYm9yZGVyUmlnaHRDb2xvclwiLCBcImJvcmRlckJvdHRvbUNvbG9yXCIsIFwiYm9yZGVyTGVmdENvbG9yXCIsIFwib3V0bGluZUNvbG9yXCIgXSxcbiAgICAgICAgICAgIHRyYW5zZm9ybXNCYXNlOiBbIFwidHJhbnNsYXRlWFwiLCBcInRyYW5zbGF0ZVlcIiwgXCJzY2FsZVwiLCBcInNjYWxlWFwiLCBcInNjYWxlWVwiLCBcInNrZXdYXCIsIFwic2tld1lcIiwgXCJyb3RhdGVaXCIgXSxcbiAgICAgICAgICAgIHRyYW5zZm9ybXMzRDogWyBcInRyYW5zZm9ybVBlcnNwZWN0aXZlXCIsIFwidHJhbnNsYXRlWlwiLCBcInNjYWxlWlwiLCBcInJvdGF0ZVhcIiwgXCJyb3RhdGVZXCIgXVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKioqKioqKioqKipcbiAgICAgICAgICAgIEhvb2tzXG4gICAgICAgICoqKioqKioqKioqKi9cblxuICAgICAgICAvKiBIb29rcyBhbGxvdyBhIHN1YnByb3BlcnR5IChlLmcuIFwiYm94U2hhZG93Qmx1clwiKSBvZiBhIGNvbXBvdW5kLXZhbHVlIENTUyBwcm9wZXJ0eVxuICAgICAgICAgICAoZS5nLiBcImJveFNoYWRvdzogWCBZIEJsdXIgU3ByZWFkIENvbG9yXCIpIHRvIGJlIGFuaW1hdGVkIGFzIGlmIGl0IHdlcmUgYSBkaXNjcmV0ZSBwcm9wZXJ0eS4gKi9cbiAgICAgICAgLyogTm90ZTogQmV5b25kIGVuYWJsaW5nIGZpbmUtZ3JhaW5lZCBwcm9wZXJ0eSBhbmltYXRpb24sIGhvb2tpbmcgaXMgbmVjZXNzYXJ5IHNpbmNlIFZlbG9jaXR5IG9ubHlcbiAgICAgICAgICAgdHdlZW5zIHByb3BlcnRpZXMgd2l0aCBzaW5nbGUgbnVtZXJpYyB2YWx1ZXM7IHVubGlrZSBDU1MgdHJhbnNpdGlvbnMsIFZlbG9jaXR5IGRvZXMgbm90IGludGVycG9sYXRlIGNvbXBvdW5kLXZhbHVlcy4gKi9cbiAgICAgICAgSG9va3M6IHtcbiAgICAgICAgICAgIC8qKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAgICAgICAgIFJlZ2lzdHJhdGlvblxuICAgICAgICAgICAgKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgIC8qIFRlbXBsYXRlcyBhcmUgYSBjb25jaXNlIHdheSBvZiBpbmRpY2F0aW5nIHdoaWNoIHN1YnByb3BlcnRpZXMgbXVzdCBiZSBpbmRpdmlkdWFsbHkgcmVnaXN0ZXJlZCBmb3IgZWFjaCBjb21wb3VuZC12YWx1ZSBDU1MgcHJvcGVydHkuICovXG4gICAgICAgICAgICAvKiBFYWNoIHRlbXBsYXRlIGNvbnNpc3RzIG9mIHRoZSBjb21wb3VuZC12YWx1ZSdzIGJhc2UgbmFtZSwgaXRzIGNvbnN0aXR1ZW50IHN1YnByb3BlcnR5IG5hbWVzLCBhbmQgdGhvc2Ugc3VicHJvcGVydGllcycgZGVmYXVsdCB2YWx1ZXMuICovXG4gICAgICAgICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgICAgICAgICBcInRleHRTaGFkb3dcIjogWyBcIkNvbG9yIFggWSBCbHVyXCIsIFwiYmxhY2sgMHB4IDBweCAwcHhcIiBdLFxuICAgICAgICAgICAgICAgIC8qIFRvZG86IEFkZCBzdXBwb3J0IGZvciBpbnNldCBib3hTaGFkb3dzLiAod2Via2l0IHBsYWNlcyBpdCBsYXN0IHdoZXJlYXMgSUUgcGxhY2VzIGl0IGZpcnN0LikgKi9cbiAgICAgICAgICAgICAgICBcImJveFNoYWRvd1wiOiBbIFwiQ29sb3IgWCBZIEJsdXIgU3ByZWFkXCIsIFwiYmxhY2sgMHB4IDBweCAwcHggMHB4XCIgXSxcbiAgICAgICAgICAgICAgICBcImNsaXBcIjogWyBcIlRvcCBSaWdodCBCb3R0b20gTGVmdFwiLCBcIjBweCAwcHggMHB4IDBweFwiIF0sXG4gICAgICAgICAgICAgICAgXCJiYWNrZ3JvdW5kUG9zaXRpb25cIjogWyBcIlggWVwiLCBcIjAlIDAlXCIgXSxcbiAgICAgICAgICAgICAgICBcInRyYW5zZm9ybU9yaWdpblwiOiBbIFwiWCBZIFpcIiwgXCI1MCUgNTAlIDBweFwiIF0sXG4gICAgICAgICAgICAgICAgXCJwZXJzcGVjdGl2ZU9yaWdpblwiOiBbIFwiWCBZXCIsIFwiNTAlIDUwJVwiIF1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC8qIEEgXCJyZWdpc3RlcmVkXCIgaG9vayBpcyBvbmUgdGhhdCBoYXMgYmVlbiBjb252ZXJ0ZWQgZnJvbSBpdHMgdGVtcGxhdGUgZm9ybSBpbnRvIGEgbGl2ZSxcbiAgICAgICAgICAgICAgIHR3ZWVuYWJsZSBwcm9wZXJ0eS4gSXQgY29udGFpbnMgZGF0YSB0byBhc3NvY2lhdGUgaXQgd2l0aCBpdHMgcm9vdCBwcm9wZXJ0eS4gKi9cbiAgICAgICAgICAgIHJlZ2lzdGVyZWQ6IHtcbiAgICAgICAgICAgICAgICAvKiBOb3RlOiBBIHJlZ2lzdGVyZWQgaG9vayBsb29rcyBsaWtlIHRoaXMgPT0+IHRleHRTaGFkb3dCbHVyOiBbIFwidGV4dFNoYWRvd1wiLCAzIF0sXG4gICAgICAgICAgICAgICAgICAgd2hpY2ggY29uc2lzdHMgb2YgdGhlIHN1YnByb3BlcnR5J3MgbmFtZSwgdGhlIGFzc29jaWF0ZWQgcm9vdCBwcm9wZXJ0eSdzIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgYW5kIHRoZSBzdWJwcm9wZXJ0eSdzIHBvc2l0aW9uIGluIHRoZSByb290J3MgdmFsdWUuICovXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLyogQ29udmVydCB0aGUgdGVtcGxhdGVzIGludG8gaW5kaXZpZHVhbCBob29rcyB0aGVuIGFwcGVuZCB0aGVtIHRvIHRoZSByZWdpc3RlcmVkIG9iamVjdCBhYm92ZS4gKi9cbiAgICAgICAgICAgIHJlZ2lzdGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLyogQ29sb3IgaG9va3MgcmVnaXN0cmF0aW9uLiAqL1xuICAgICAgICAgICAgICAgIC8qIE5vdGU6IENvbG9ycyBhcmUgZGVmYXVsdGVkIHRvIHdoaXRlIC0tIGFzIG9wcG9zZWQgdG8gYmxhY2sgLS0gc2luY2UgY29sb3JzIHRoYXQgYXJlXG4gICAgICAgICAgICAgICAgICAgY3VycmVudGx5IHNldCB0byBcInRyYW5zcGFyZW50XCIgZGVmYXVsdCB0byB0aGVpciByZXNwZWN0aXZlIHRlbXBsYXRlIGJlbG93IHdoZW4gY29sb3ItYW5pbWF0ZWQsXG4gICAgICAgICAgICAgICAgICAgYW5kIHdoaXRlIGlzIHR5cGljYWxseSBhIGNsb3NlciBtYXRjaCB0byB0cmFuc3BhcmVudCB0aGFuIGJsYWNrIGlzLiAqL1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgQ1NTLkxpc3RzLmNvbG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBDU1MuSG9va3MudGVtcGxhdGVzW0NTUy5MaXN0cy5jb2xvcnNbaV1dID0gWyBcIlJlZCBHcmVlbiBCbHVlIEFscGhhXCIsIFwiMjU1IDI1NSAyNTUgMVwiIF07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHJvb3RQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICAgICAgaG9va1RlbXBsYXRlLFxuICAgICAgICAgICAgICAgICAgICBob29rTmFtZXM7XG5cbiAgICAgICAgICAgICAgICAvKiBJbiBJRSwgY29sb3IgdmFsdWVzIGluc2lkZSBjb21wb3VuZC12YWx1ZSBwcm9wZXJ0aWVzIGFyZSBwb3NpdGlvbmVkIGF0IHRoZSBlbmQgdGhlIHZhbHVlIGluc3RlYWQgb2YgYXQgdGhlIGJlZ2lubmluZy5cbiAgICAgICAgICAgICAgICAgICBUaHVzLCB3ZSByZS1hcnJhbmdlIHRoZSB0ZW1wbGF0ZXMgYWNjb3JkaW5nbHkuICovXG4gICAgICAgICAgICAgICAgaWYgKElFKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAocm9vdFByb3BlcnR5IGluIENTUy5Ib29rcy50ZW1wbGF0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvb2tUZW1wbGF0ZSA9IENTUy5Ib29rcy50ZW1wbGF0ZXNbcm9vdFByb3BlcnR5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvb2tOYW1lcyA9IGhvb2tUZW1wbGF0ZVswXS5zcGxpdChcIiBcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWZhdWx0VmFsdWVzID0gaG9va1RlbXBsYXRlWzFdLm1hdGNoKENTUy5SZWdFeC52YWx1ZVNwbGl0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhvb2tOYW1lc1swXSA9PT0gXCJDb2xvclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogUmVwb3NpdGlvbiBib3RoIHRoZSBob29rJ3MgbmFtZSBhbmQgaXRzIGRlZmF1bHQgdmFsdWUgdG8gdGhlIGVuZCBvZiB0aGVpciByZXNwZWN0aXZlIHN0cmluZ3MuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9va05hbWVzLnB1c2goaG9va05hbWVzLnNoaWZ0KCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZXMucHVzaChkZWZhdWx0VmFsdWVzLnNoaWZ0KCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogUmVwbGFjZSB0aGUgZXhpc3RpbmcgdGVtcGxhdGUgZm9yIHRoZSBob29rJ3Mgcm9vdCBwcm9wZXJ0eS4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDU1MuSG9va3MudGVtcGxhdGVzW3Jvb3RQcm9wZXJ0eV0gPSBbIGhvb2tOYW1lcy5qb2luKFwiIFwiKSwgZGVmYXVsdFZhbHVlcy5qb2luKFwiIFwiKSBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLyogSG9vayByZWdpc3RyYXRpb24uICovXG4gICAgICAgICAgICAgICAgZm9yIChyb290UHJvcGVydHkgaW4gQ1NTLkhvb2tzLnRlbXBsYXRlcykge1xuICAgICAgICAgICAgICAgICAgICBob29rVGVtcGxhdGUgPSBDU1MuSG9va3MudGVtcGxhdGVzW3Jvb3RQcm9wZXJ0eV07XG4gICAgICAgICAgICAgICAgICAgIGhvb2tOYW1lcyA9IGhvb2tUZW1wbGF0ZVswXS5zcGxpdChcIiBcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBob29rTmFtZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmdWxsSG9va05hbWUgPSByb290UHJvcGVydHkgKyBob29rTmFtZXNbaV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9va1Bvc2l0aW9uID0gaTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLyogRm9yIGVhY2ggaG9vaywgcmVnaXN0ZXIgaXRzIGZ1bGwgbmFtZSAoZS5nLiB0ZXh0U2hhZG93Qmx1cikgd2l0aCBpdHMgcm9vdCBwcm9wZXJ0eSAoZS5nLiB0ZXh0U2hhZG93KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5kIHRoZSBob29rJ3MgcG9zaXRpb24gaW4gaXRzIHRlbXBsYXRlJ3MgZGVmYXVsdCB2YWx1ZSBzdHJpbmcuICovXG4gICAgICAgICAgICAgICAgICAgICAgICBDU1MuSG9va3MucmVnaXN0ZXJlZFtmdWxsSG9va05hbWVdID0gWyByb290UHJvcGVydHksIGhvb2tQb3NpdGlvbiBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgICAgICBJbmplY3Rpb24gYW5kIEV4dHJhY3Rpb25cbiAgICAgICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAvKiBMb29rIHVwIHRoZSByb290IHByb3BlcnR5IGFzc29jaWF0ZWQgd2l0aCB0aGUgaG9vayAoZS5nLiByZXR1cm4gXCJ0ZXh0U2hhZG93XCIgZm9yIFwidGV4dFNoYWRvd0JsdXJcIikuICovXG4gICAgICAgICAgICAvKiBTaW5jZSBhIGhvb2sgY2Fubm90IGJlIHNldCBkaXJlY3RseSAodGhlIGJyb3dzZXIgd29uJ3QgcmVjb2duaXplIGl0KSwgc3R5bGUgdXBkYXRpbmcgZm9yIGhvb2tzIGlzIHJvdXRlZCB0aHJvdWdoIHRoZSBob29rJ3Mgcm9vdCBwcm9wZXJ0eS4gKi9cbiAgICAgICAgICAgIGdldFJvb3Q6IGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIHZhciBob29rRGF0YSA9IENTUy5Ib29rcy5yZWdpc3RlcmVkW3Byb3BlcnR5XTtcblxuICAgICAgICAgICAgICAgIGlmIChob29rRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaG9va0RhdGFbMF07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLyogSWYgdGhlcmUgd2FzIG5vIGhvb2sgbWF0Y2gsIHJldHVybiB0aGUgcHJvcGVydHkgbmFtZSB1bnRvdWNoZWQuICovXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9wZXJ0eTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLyogQ29udmVydCBhbnkgcm9vdFByb3BlcnR5VmFsdWUsIG51bGwgb3Igb3RoZXJ3aXNlLCBpbnRvIGEgc3BhY2UtZGVsaW1pdGVkIGxpc3Qgb2YgaG9vayB2YWx1ZXMgc28gdGhhdFxuICAgICAgICAgICAgICAgdGhlIHRhcmdldGVkIGhvb2sgY2FuIGJlIGluamVjdGVkIG9yIGV4dHJhY3RlZCBhdCBpdHMgc3RhbmRhcmQgcG9zaXRpb24uICovXG4gICAgICAgICAgICBjbGVhblJvb3RQcm9wZXJ0eVZhbHVlOiBmdW5jdGlvbihyb290UHJvcGVydHksIHJvb3RQcm9wZXJ0eVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgLyogSWYgdGhlIHJvb3RQcm9wZXJ0eVZhbHVlIGlzIHdyYXBwZWQgd2l0aCBcInJnYigpXCIsIFwiY2xpcCgpXCIsIGV0Yy4sIHJlbW92ZSB0aGUgd3JhcHBpbmcgdG8gbm9ybWFsaXplIHRoZSB2YWx1ZSBiZWZvcmUgbWFuaXB1bGF0aW9uLiAqL1xuICAgICAgICAgICAgICAgIGlmIChDU1MuUmVnRXgudmFsdWVVbndyYXAudGVzdChyb290UHJvcGVydHlWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcm9vdFByb3BlcnR5VmFsdWUgPSByb290UHJvcGVydHlWYWx1ZS5tYXRjaChDU1MuSG9va3MuUmVnRXgudmFsdWVVbndyYXApWzFdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qIElmIHJvb3RQcm9wZXJ0eVZhbHVlIGlzIGEgQ1NTIG51bGwtdmFsdWUgKGZyb20gd2hpY2ggdGhlcmUncyBpbmhlcmVudGx5IG5vIGhvb2sgdmFsdWUgdG8gZXh0cmFjdCksXG4gICAgICAgICAgICAgICAgICAgZGVmYXVsdCB0byB0aGUgcm9vdCdzIGRlZmF1bHQgdmFsdWUgYXMgZGVmaW5lZCBpbiBDU1MuSG9va3MudGVtcGxhdGVzLiAqL1xuICAgICAgICAgICAgICAgIC8qIE5vdGU6IENTUyBudWxsLXZhbHVlcyBpbmNsdWRlIFwibm9uZVwiLCBcImF1dG9cIiwgYW5kIFwidHJhbnNwYXJlbnRcIi4gVGhleSBtdXN0IGJlIGNvbnZlcnRlZCBpbnRvIHRoZWlyXG4gICAgICAgICAgICAgICAgICAgemVyby12YWx1ZXMgKGUuZy4gdGV4dFNoYWRvdzogXCJub25lXCIgPT0+IHRleHRTaGFkb3c6IFwiMHB4IDBweCAwcHggYmxhY2tcIikgZm9yIGhvb2sgbWFuaXB1bGF0aW9uIHRvIHByb2NlZWQuICovXG4gICAgICAgICAgICAgICAgaWYgKENTUy5WYWx1ZXMuaXNDU1NOdWxsVmFsdWUocm9vdFByb3BlcnR5VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvb3RQcm9wZXJ0eVZhbHVlID0gQ1NTLkhvb2tzLnRlbXBsYXRlc1tyb290UHJvcGVydHldWzFdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiByb290UHJvcGVydHlWYWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKiBFeHRyYWN0ZWQgdGhlIGhvb2sncyB2YWx1ZSBmcm9tIGl0cyByb290IHByb3BlcnR5J3MgdmFsdWUuIFRoaXMgaXMgdXNlZCB0byBnZXQgdGhlIHN0YXJ0aW5nIHZhbHVlIG9mIGFuIGFuaW1hdGluZyBob29rLiAqL1xuICAgICAgICAgICAgZXh0cmFjdFZhbHVlOiBmdW5jdGlvbiAoZnVsbEhvb2tOYW1lLCByb290UHJvcGVydHlWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBob29rRGF0YSA9IENTUy5Ib29rcy5yZWdpc3RlcmVkW2Z1bGxIb29rTmFtZV07XG5cbiAgICAgICAgICAgICAgICBpZiAoaG9va0RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhvb2tSb290ID0gaG9va0RhdGFbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBob29rUG9zaXRpb24gPSBob29rRGF0YVsxXTtcblxuICAgICAgICAgICAgICAgICAgICByb290UHJvcGVydHlWYWx1ZSA9IENTUy5Ib29rcy5jbGVhblJvb3RQcm9wZXJ0eVZhbHVlKGhvb2tSb290LCByb290UHJvcGVydHlWYWx1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLyogU3BsaXQgcm9vdFByb3BlcnR5VmFsdWUgaW50byBpdHMgY29uc3RpdHVlbnQgaG9vayB2YWx1ZXMgdGhlbiBncmFiIHRoZSBkZXNpcmVkIGhvb2sgYXQgaXRzIHN0YW5kYXJkIHBvc2l0aW9uLiAqL1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm9vdFByb3BlcnR5VmFsdWUudG9TdHJpbmcoKS5tYXRjaChDU1MuUmVnRXgudmFsdWVTcGxpdClbaG9va1Bvc2l0aW9uXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvKiBJZiB0aGUgcHJvdmlkZWQgZnVsbEhvb2tOYW1lIGlzbid0IGEgcmVnaXN0ZXJlZCBob29rLCByZXR1cm4gdGhlIHJvb3RQcm9wZXJ0eVZhbHVlIHRoYXQgd2FzIHBhc3NlZCBpbi4gKi9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJvb3RQcm9wZXJ0eVZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKiBJbmplY3QgdGhlIGhvb2sncyB2YWx1ZSBpbnRvIGl0cyByb290IHByb3BlcnR5J3MgdmFsdWUuIFRoaXMgaXMgdXNlZCB0byBwaWVjZSBiYWNrIHRvZ2V0aGVyIHRoZSByb290IHByb3BlcnR5XG4gICAgICAgICAgICAgICBvbmNlIFZlbG9jaXR5IGhhcyB1cGRhdGVkIG9uZSBvZiBpdHMgaW5kaXZpZHVhbGx5IGhvb2tlZCB2YWx1ZXMgdGhyb3VnaCB0d2VlbmluZy4gKi9cbiAgICAgICAgICAgIGluamVjdFZhbHVlOiBmdW5jdGlvbiAoZnVsbEhvb2tOYW1lLCBob29rVmFsdWUsIHJvb3RQcm9wZXJ0eVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGhvb2tEYXRhID0gQ1NTLkhvb2tzLnJlZ2lzdGVyZWRbZnVsbEhvb2tOYW1lXTtcblxuICAgICAgICAgICAgICAgIGlmIChob29rRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaG9va1Jvb3QgPSBob29rRGF0YVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvb2tQb3NpdGlvbiA9IGhvb2tEYXRhWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgcm9vdFByb3BlcnR5VmFsdWVQYXJ0cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb3RQcm9wZXJ0eVZhbHVlVXBkYXRlZDtcblxuICAgICAgICAgICAgICAgICAgICByb290UHJvcGVydHlWYWx1ZSA9IENTUy5Ib29rcy5jbGVhblJvb3RQcm9wZXJ0eVZhbHVlKGhvb2tSb290LCByb290UHJvcGVydHlWYWx1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLyogU3BsaXQgcm9vdFByb3BlcnR5VmFsdWUgaW50byBpdHMgaW5kaXZpZHVhbCBob29rIHZhbHVlcywgcmVwbGFjZSB0aGUgdGFyZ2V0ZWQgdmFsdWUgd2l0aCBob29rVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgIHRoZW4gcmVjb25zdHJ1Y3QgdGhlIHJvb3RQcm9wZXJ0eVZhbHVlIHN0cmluZy4gKi9cbiAgICAgICAgICAgICAgICAgICAgcm9vdFByb3BlcnR5VmFsdWVQYXJ0cyA9IHJvb3RQcm9wZXJ0eVZhbHVlLnRvU3RyaW5nKCkubWF0Y2goQ1NTLlJlZ0V4LnZhbHVlU3BsaXQpO1xuICAgICAgICAgICAgICAgICAgICByb290UHJvcGVydHlWYWx1ZVBhcnRzW2hvb2tQb3NpdGlvbl0gPSBob29rVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHJvb3RQcm9wZXJ0eVZhbHVlVXBkYXRlZCA9IHJvb3RQcm9wZXJ0eVZhbHVlUGFydHMuam9pbihcIiBcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJvb3RQcm9wZXJ0eVZhbHVlVXBkYXRlZDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvKiBJZiB0aGUgcHJvdmlkZWQgZnVsbEhvb2tOYW1lIGlzbid0IGEgcmVnaXN0ZXJlZCBob29rLCByZXR1cm4gdGhlIHJvb3RQcm9wZXJ0eVZhbHVlIHRoYXQgd2FzIHBhc3NlZCBpbi4gKi9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJvb3RQcm9wZXJ0eVZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAgICBOb3JtYWxpemF0aW9uc1xuICAgICAgICAqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qIE5vcm1hbGl6YXRpb25zIHN0YW5kYXJkaXplIENTUyBwcm9wZXJ0eSBtYW5pcHVsYXRpb24gYnkgcG9sbHlmaWxsaW5nIGJyb3dzZXItc3BlY2lmaWMgaW1wbGVtZW50YXRpb25zIChlLmcuIG9wYWNpdHkpXG4gICAgICAgICAgIGFuZCByZWZvcm1hdHRpbmcgc3BlY2lhbCBwcm9wZXJ0aWVzIChlLmcuIGNsaXAsIHJnYmEpIHRvIGxvb2sgbGlrZSBzdGFuZGFyZCBvbmVzLiAqL1xuICAgICAgICBOb3JtYWxpemF0aW9uczoge1xuICAgICAgICAgICAgLyogTm9ybWFsaXphdGlvbnMgYXJlIHBhc3NlZCBhIG5vcm1hbGl6YXRpb24gdGFyZ2V0IChlaXRoZXIgdGhlIHByb3BlcnR5J3MgbmFtZSwgaXRzIGV4dHJhY3RlZCB2YWx1ZSwgb3IgaXRzIGluamVjdGVkIHZhbHVlKSxcbiAgICAgICAgICAgICAgIHRoZSB0YXJnZXRlZCBlbGVtZW50ICh3aGljaCBtYXkgbmVlZCB0byBiZSBxdWVyaWVkKSwgYW5kIHRoZSB0YXJnZXRlZCBwcm9wZXJ0eSB2YWx1ZS4gKi9cbiAgICAgICAgICAgIHJlZ2lzdGVyZWQ6IHtcbiAgICAgICAgICAgICAgICBjbGlwOiBmdW5jdGlvbih0eXBlLCBlbGVtZW50LCBwcm9wZXJ0eVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm5hbWVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJjbGlwXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBDbGlwIG5lZWRzIHRvIGJlIHVud3JhcHBlZCBhbmQgc3RyaXBwZWQgb2YgaXRzIGNvbW1hcyBkdXJpbmcgZXh0cmFjdGlvbi4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJleHRyYWN0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV4dHJhY3RlZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIElmIFZlbG9jaXR5IGFsc28gZXh0cmFjdGVkIHRoaXMgdmFsdWUsIHNraXAgZXh0cmFjdGlvbi4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoQ1NTLlJlZ0V4LndyYXBwZWRWYWx1ZUFscmVhZHlFeHRyYWN0ZWQudGVzdChwcm9wZXJ0eVZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRyYWN0ZWQgPSBwcm9wZXJ0eVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIFJlbW92ZSB0aGUgXCJyZWN0KClcIiB3cmFwcGVyLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRyYWN0ZWQgPSBwcm9wZXJ0eVZhbHVlLnRvU3RyaW5nKCkubWF0Y2goQ1NTLlJlZ0V4LnZhbHVlVW53cmFwKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBTdHJpcCBvZmYgY29tbWFzLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRyYWN0ZWQgPSBleHRyYWN0ZWQgPyBleHRyYWN0ZWRbMV0ucmVwbGFjZSgvLChcXHMrKT8vZywgXCIgXCIpIDogcHJvcGVydHlWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXh0cmFjdGVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgLyogQ2xpcCBuZWVkcyB0byBiZSByZS13cmFwcGVkIGR1cmluZyBpbmplY3Rpb24uICovXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaW5qZWN0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwicmVjdChcIiArIHByb3BlcnR5VmFsdWUgKyBcIilcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAvKiA8PUlFOCBkbyBub3Qgc3VwcG9ydCB0aGUgc3RhbmRhcmQgb3BhY2l0eSBwcm9wZXJ0eS4gVGhleSB1c2UgZmlsdGVyOmFscGhhKG9wYWNpdHk9SU5UKSBpbnN0ZWFkLiAqL1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IGZ1bmN0aW9uICh0eXBlLCBlbGVtZW50LCBwcm9wZXJ0eVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChJRSA8PSA4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwibmFtZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJmaWx0ZXJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZXh0cmFjdFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiA8PUlFOCByZXR1cm4gYSBcImZpbHRlclwiIHZhbHVlIG9mIFwiYWxwaGEob3BhY2l0eT1cXGR7MSwzfSlcIi5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXh0cmFjdCB0aGUgdmFsdWUgYW5kIGNvbnZlcnQgaXQgdG8gYSBkZWNpbWFsIHZhbHVlIHRvIG1hdGNoIHRoZSBzdGFuZGFyZCBDU1Mgb3BhY2l0eSBwcm9wZXJ0eSdzIGZvcm1hdHRpbmcuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBleHRyYWN0ZWQgPSBwcm9wZXJ0eVZhbHVlLnRvU3RyaW5nKCkubWF0Y2goL2FscGhhXFwob3BhY2l0eT0oLiopXFwpL2kpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleHRyYWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIENvbnZlcnQgdG8gZGVjaW1hbCB2YWx1ZS4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5VmFsdWUgPSBleHRyYWN0ZWRbMV0gLyAxMDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBXaGVuIGV4dHJhY3Rpbmcgb3BhY2l0eSwgZGVmYXVsdCB0byAxIHNpbmNlIGEgbnVsbCB2YWx1ZSBtZWFucyBvcGFjaXR5IGhhc24ndCBiZWVuIHNldC4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5VmFsdWUgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImluamVjdFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBPcGFjaWZpZWQgZWxlbWVudHMgYXJlIHJlcXVpcmVkIHRvIGhhdmUgdGhlaXIgem9vbSBwcm9wZXJ0eSBzZXQgdG8gYSBub24temVybyB2YWx1ZS4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS56b29tID0gMTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBTZXR0aW5nIHRoZSBmaWx0ZXIgcHJvcGVydHkgb24gZWxlbWVudHMgd2l0aCBjZXJ0YWluIGZvbnQgcHJvcGVydHkgY29tYmluYXRpb25zIGNhbiByZXN1bHQgaW4gYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWdobHkgdW5hcHBlYWxpbmcgdWx0cmEtYm9sZGluZyBlZmZlY3QuIFRoZXJlJ3Mgbm8gd2F5IHRvIHJlbWVkeSB0aGlzIHRocm91Z2hvdXQgYSB0d2VlbiwgYnV0IGRyb3BwaW5nIHRoZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSBhbHRvZ2V0aGVyICh3aGVuIG9wYWNpdHkgaGl0cyAxKSBhdCBsZWFzdHMgZW5zdXJlcyB0aGF0IHRoZSBnbGl0Y2ggaXMgZ29uZSBwb3N0LXR3ZWVuaW5nLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VGbG9hdChwcm9wZXJ0eVZhbHVlKSA+PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBBcyBwZXIgdGhlIGZpbHRlciBwcm9wZXJ0eSdzIHNwZWMsIGNvbnZlcnQgdGhlIGRlY2ltYWwgdmFsdWUgdG8gYSB3aG9sZSBudW1iZXIgYW5kIHdyYXAgdGhlIHZhbHVlLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImFscGhhKG9wYWNpdHk9XCIgKyBwYXJzZUludChwYXJzZUZsb2F0KHByb3BlcnR5VmFsdWUpICogMTAwLCAxMCkgKyBcIilcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvKiBXaXRoIGFsbCBvdGhlciBicm93c2Vycywgbm9ybWFsaXphdGlvbiBpcyBub3QgcmVxdWlyZWQ7IHJldHVybiB0aGUgc2FtZSB2YWx1ZXMgdGhhdCB3ZXJlIHBhc3NlZCBpbi4gKi9cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJuYW1lXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIm9wYWNpdHlcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZXh0cmFjdFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvcGVydHlWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaW5qZWN0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9wZXJ0eVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgICAgICAgQmF0Y2hlZCBSZWdpc3RyYXRpb25zXG4gICAgICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyogTm90ZTogQmF0Y2hlZCBub3JtYWxpemF0aW9ucyBleHRlbmQgdGhlIENTUy5Ob3JtYWxpemF0aW9ucy5yZWdpc3RlcmVkIG9iamVjdC4gKi9cbiAgICAgICAgICAgIHJlZ2lzdGVyOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAvKioqKioqKioqKioqKioqKipcbiAgICAgICAgICAgICAgICAgICAgVHJhbnNmb3Jtc1xuICAgICAgICAgICAgICAgICoqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAgICAgLyogVHJhbnNmb3JtcyBhcmUgdGhlIHN1YnByb3BlcnRpZXMgY29udGFpbmVkIGJ5IHRoZSBDU1MgXCJ0cmFuc2Zvcm1cIiBwcm9wZXJ0eS4gVHJhbnNmb3JtcyBtdXN0IHVuZGVyZ28gbm9ybWFsaXphdGlvblxuICAgICAgICAgICAgICAgICAgIHNvIHRoYXQgdGhleSBjYW4gYmUgcmVmZXJlbmNlZCBpbiBhIHByb3BlcnRpZXMgbWFwIGJ5IHRoZWlyIGluZGl2aWR1YWwgbmFtZXMuICovXG4gICAgICAgICAgICAgICAgLyogTm90ZTogV2hlbiB0cmFuc2Zvcm1zIGFyZSBcInNldFwiLCB0aGV5IGFyZSBhY3R1YWxseSBhc3NpZ25lZCB0byBhIHBlci1lbGVtZW50IHRyYW5zZm9ybUNhY2hlLiBXaGVuIGFsbCB0cmFuc2Zvcm1cbiAgICAgICAgICAgICAgICAgICBzZXR0aW5nIGlzIGNvbXBsZXRlIGNvbXBsZXRlLCBDU1MuZmx1c2hUcmFuc2Zvcm1DYWNoZSgpIG11c3QgYmUgbWFudWFsbHkgY2FsbGVkIHRvIGZsdXNoIHRoZSB2YWx1ZXMgdG8gdGhlIERPTS5cbiAgICAgICAgICAgICAgICAgICBUcmFuc2Zvcm0gc2V0dGluZyBpcyBiYXRjaGVkIGluIHRoaXMgd2F5IHRvIGltcHJvdmUgcGVyZm9ybWFuY2U6IHRoZSB0cmFuc2Zvcm0gc3R5bGUgb25seSBuZWVkcyB0byBiZSB1cGRhdGVkXG4gICAgICAgICAgICAgICAgICAgb25jZSB3aGVuIG11bHRpcGxlIHRyYW5zZm9ybSBzdWJwcm9wZXJ0aWVzIGFyZSBiZWluZyBhbmltYXRlZCBzaW11bHRhbmVvdXNseS4gKi9cbiAgICAgICAgICAgICAgICAvKiBOb3RlOiBJRTkgYW5kIEFuZHJvaWQgR2luZ2VyYnJlYWQgaGF2ZSBzdXBwb3J0IGZvciAyRCAtLSBidXQgbm90IDNEIC0tIHRyYW5zZm9ybXMuIFNpbmNlIGFuaW1hdGluZyB1bnN1cHBvcnRlZFxuICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybSBwcm9wZXJ0aWVzIHJlc3VsdHMgaW4gdGhlIGJyb3dzZXIgaWdub3JpbmcgdGhlICplbnRpcmUqIHRyYW5zZm9ybSBzdHJpbmcsIHdlIHByZXZlbnQgdGhlc2UgM0QgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgZnJvbSBiZWluZyBub3JtYWxpemVkIGZvciB0aGVzZSBicm93c2VycyBzbyB0aGF0IHR3ZWVuaW5nIHNraXBzIHRoZXNlIHByb3BlcnRpZXMgYWx0b2dldGhlclxuICAgICAgICAgICAgICAgICAgIChzaW5jZSBpdCB3aWxsIGlnbm9yZSB0aGVtIGFzIGJlaW5nIHVuc3VwcG9ydGVkIGJ5IHRoZSBicm93c2VyLikgKi9cbiAgICAgICAgICAgICAgICBpZiAoIShJRSA8PSA5KSAmJiAhVmVsb2NpdHkuU3RhdGUuaXNHaW5nZXJicmVhZCkge1xuICAgICAgICAgICAgICAgICAgICAvKiBOb3RlOiBTaW5jZSB0aGUgc3RhbmRhbG9uZSBDU1MgXCJwZXJzcGVjdGl2ZVwiIHByb3BlcnR5IGFuZCB0aGUgQ1NTIHRyYW5zZm9ybSBcInBlcnNwZWN0aXZlXCIgc3VicHJvcGVydHlcbiAgICAgICAgICAgICAgICAgICAgc2hhcmUgdGhlIHNhbWUgbmFtZSwgdGhlIGxhdHRlciBpcyBnaXZlbiBhIHVuaXF1ZSB0b2tlbiB3aXRoaW4gVmVsb2NpdHk6IFwidHJhbnNmb3JtUGVyc3BlY3RpdmVcIi4gKi9cbiAgICAgICAgICAgICAgICAgICAgQ1NTLkxpc3RzLnRyYW5zZm9ybXNCYXNlID0gQ1NTLkxpc3RzLnRyYW5zZm9ybXNCYXNlLmNvbmNhdChDU1MuTGlzdHMudHJhbnNmb3JtczNEKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IENTUy5MaXN0cy50cmFuc2Zvcm1zQmFzZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAvKiBXcmFwIHRoZSBkeW5hbWljYWxseSBnZW5lcmF0ZWQgbm9ybWFsaXphdGlvbiBmdW5jdGlvbiBpbiBhIG5ldyBzY29wZSBzbyB0aGF0IHRyYW5zZm9ybU5hbWUncyB2YWx1ZSBpc1xuICAgICAgICAgICAgICAgICAgICBwYWlyZWQgd2l0aCBpdHMgcmVzcGVjdGl2ZSBmdW5jdGlvbi4gKE90aGVyd2lzZSwgYWxsIGZ1bmN0aW9ucyB3b3VsZCB0YWtlIHRoZSBmaW5hbCBmb3IgbG9vcCdzIHRyYW5zZm9ybU5hbWUuKSAqL1xuICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNmb3JtTmFtZSA9IENTUy5MaXN0cy50cmFuc2Zvcm1zQmFzZVtpXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgQ1NTLk5vcm1hbGl6YXRpb25zLnJlZ2lzdGVyZWRbdHJhbnNmb3JtTmFtZV0gPSBmdW5jdGlvbiAodHlwZSwgZWxlbWVudCwgcHJvcGVydHlWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBUaGUgbm9ybWFsaXplZCBwcm9wZXJ0eSBuYW1lIGlzIHRoZSBwYXJlbnQgXCJ0cmFuc2Zvcm1cIiBwcm9wZXJ0eSAtLSB0aGUgcHJvcGVydHkgdGhhdCBpcyBhY3R1YWxseSBzZXQgaW4gQ1NTLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwibmFtZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidHJhbnNmb3JtXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIFRyYW5zZm9ybSB2YWx1ZXMgYXJlIGNhY2hlZCBvbnRvIGEgcGVyLWVsZW1lbnQgdHJhbnNmb3JtQ2FjaGUgb2JqZWN0LiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZXh0cmFjdFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogSWYgdGhpcyB0cmFuc2Zvcm0gaGFzIHlldCB0byBiZSBhc3NpZ25lZCBhIHZhbHVlLCByZXR1cm4gaXRzIG51bGwgdmFsdWUuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoRGF0YShlbGVtZW50KS50cmFuc2Zvcm1DYWNoZVt0cmFuc2Zvcm1OYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogU2NhbGUgQ1NTLkxpc3RzLnRyYW5zZm9ybXNCYXNlIGRlZmF1bHQgdG8gMSB3aGVyZWFzIGFsbCBvdGhlciB0cmFuc2Zvcm0gcHJvcGVydGllcyBkZWZhdWx0IHRvIDAuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC9ec2NhbGUvaS50ZXN0KHRyYW5zZm9ybU5hbWUpID8gMSA6IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBXaGVuIHRyYW5zZm9ybSB2YWx1ZXMgYXJlIHNldCwgdGhleSBhcmUgd3JhcHBlZCBpbiBwYXJlbnRoZXNlcyBhcyBwZXIgdGhlIENTUyBzcGVjLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGh1cywgd2hlbiBleHRyYWN0aW5nIHRoZWlyIHZhbHVlcyAoZm9yIHR3ZWVuIGNhbGN1bGF0aW9ucyksIHdlIHN0cmlwIG9mZiB0aGUgcGFyZW50aGVzZXMuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBEYXRhKGVsZW1lbnQpLnRyYW5zZm9ybUNhY2hlW3RyYW5zZm9ybU5hbWVdLnJlcGxhY2UoL1soKV0vZywgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpbmplY3RcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnZhbGlkID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIElmIGFuIGluZGl2aWR1YWwgdHJhbnNmb3JtIHByb3BlcnR5IGNvbnRhaW5zIGFuIHVuc3VwcG9ydGVkIHVuaXQgdHlwZSwgdGhlIGJyb3dzZXIgaWdub3JlcyB0aGUgKmVudGlyZSogdHJhbnNmb3JtIHByb3BlcnR5LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGh1cywgcHJvdGVjdCB1c2VycyBmcm9tIHRoZW1zZWx2ZXMgYnkgc2tpcHBpbmcgc2V0dGluZyBmb3IgdHJhbnNmb3JtIHZhbHVlcyBzdXBwbGllZCB3aXRoIGludmFsaWQgdW5pdCB0eXBlcy4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIFN3aXRjaCBvbiB0aGUgYmFzZSB0cmFuc2Zvcm0gdHlwZTsgaWdub3JlIHRoZSBheGlzIGJ5IHJlbW92aW5nIHRoZSBsYXN0IGxldHRlciBmcm9tIHRoZSB0cmFuc2Zvcm0ncyBuYW1lLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0cmFuc2Zvcm1OYW1lLnN1YnN0cigwLCB0cmFuc2Zvcm1OYW1lLmxlbmd0aCAtIDEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogV2hpdGVsaXN0IHVuaXQgdHlwZXMgZm9yIGVhY2ggdHJhbnNmb3JtLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0cmFuc2xhdGVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW52YWxpZCA9ICEvKCV8cHh8ZW18cmVtfHZ3fHZofFxcZCkkL2kudGVzdChwcm9wZXJ0eVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogU2luY2UgYW4gYXhpcy1mcmVlIFwic2NhbGVcIiBwcm9wZXJ0eSBpcyBzdXBwb3J0ZWQgYXMgd2VsbCwgYSBsaXR0bGUgaGFjayBpcyB1c2VkIGhlcmUgdG8gZGV0ZWN0IGl0IGJ5IGNob3BwaW5nIG9mZiBpdHMgbGFzdCBsZXR0ZXIuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInNjYWxcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwic2NhbGVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogQ2hyb21lIG9uIEFuZHJvaWQgaGFzIGEgYnVnIGluIHdoaWNoIHNjYWxlZCBlbGVtZW50cyBibHVyIGlmIHRoZWlyIGluaXRpYWwgc2NhbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgaXMgYmVsb3cgMSAod2hpY2ggY2FuIGhhcHBlbiB3aXRoIGZvcmNlZmVlZGluZykuIFRodXMsIHdlIGRldGVjdCBhIHlldC11bnNldCBzY2FsZSBwcm9wZXJ0eVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmQgZW5zdXJlIHRoYXQgaXRzIGZpcnN0IHZhbHVlIGlzIGFsd2F5cyAxLiBNb3JlIGluZm86IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTA0MTc4OTAvY3NzMy1hbmltYXRpb25zLXdpdGgtdHJhbnNmb3JtLWNhdXNlcy1ibHVycmVkLWVsZW1lbnRzLW9uLXdlYmtpdC8xMDQxNzk2MiMxMDQxNzk2MiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoVmVsb2NpdHkuU3RhdGUuaXNBbmRyb2lkICYmIERhdGEoZWxlbWVudCkudHJhbnNmb3JtQ2FjaGVbdHJhbnNmb3JtTmFtZV0gPT09IHVuZGVmaW5lZCAmJiBwcm9wZXJ0eVZhbHVlIDwgMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlWYWx1ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnZhbGlkID0gIS8oXFxkKSQvaS50ZXN0KHByb3BlcnR5VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwic2tld1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnZhbGlkID0gIS8oZGVnfFxcZCkkL2kudGVzdChwcm9wZXJ0eVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInJvdGF0ZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnZhbGlkID0gIS8oZGVnfFxcZCkkL2kudGVzdChwcm9wZXJ0eVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaW52YWxpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIEFzIHBlciB0aGUgQ1NTIHNwZWMsIHdyYXAgdGhlIHZhbHVlIGluIHBhcmVudGhlc2VzLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGEoZWxlbWVudCkudHJhbnNmb3JtQ2FjaGVbdHJhbnNmb3JtTmFtZV0gPSBcIihcIiArIHByb3BlcnR5VmFsdWUgKyBcIilcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogQWx0aG91Z2ggdGhlIHZhbHVlIGlzIHNldCBvbiB0aGUgdHJhbnNmb3JtQ2FjaGUgb2JqZWN0LCByZXR1cm4gdGhlIG5ld2x5LXVwZGF0ZWQgdmFsdWUgZm9yIHRoZSBjYWxsaW5nIGNvZGUgdG8gcHJvY2VzcyBhcyBub3JtYWwuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gRGF0YShlbGVtZW50KS50cmFuc2Zvcm1DYWNoZVt0cmFuc2Zvcm1OYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qKioqKioqKioqKioqXG4gICAgICAgICAgICAgICAgICAgIENvbG9yc1xuICAgICAgICAgICAgICAgICoqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgICAgICAvKiBTaW5jZSBWZWxvY2l0eSBvbmx5IGFuaW1hdGVzIGEgc2luZ2xlIG51bWVyaWMgdmFsdWUgcGVyIHByb3BlcnR5LCBjb2xvciBhbmltYXRpb24gaXMgYWNoaWV2ZWQgYnkgaG9va2luZyB0aGUgaW5kaXZpZHVhbCBSR0JBIGNvbXBvbmVudHMgb2YgQ1NTIGNvbG9yIHByb3BlcnRpZXMuXG4gICAgICAgICAgICAgICAgICAgQWNjb3JkaW5nbHksIGNvbG9yIHZhbHVlcyBtdXN0IGJlIG5vcm1hbGl6ZWQgKGUuZy4gXCIjZmYwMDAwXCIsIFwicmVkXCIsIGFuZCBcInJnYigyNTUsIDAsIDApXCIgPT0+IFwiMjU1IDAgMCAxXCIpIHNvIHRoYXQgdGhlaXIgY29tcG9uZW50cyBjYW4gYmUgaW5qZWN0ZWQvZXh0cmFjdGVkIGJ5IENTUy5Ib29rcyBsb2dpYy4gKi9cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IENTUy5MaXN0cy5jb2xvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgLyogV3JhcCB0aGUgZHluYW1pY2FsbHkgZ2VuZXJhdGVkIG5vcm1hbGl6YXRpb24gZnVuY3Rpb24gaW4gYSBuZXcgc2NvcGUgc28gdGhhdCBjb2xvck5hbWUncyB2YWx1ZSBpcyBwYWlyZWQgd2l0aCBpdHMgcmVzcGVjdGl2ZSBmdW5jdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgICAgKE90aGVyd2lzZSwgYWxsIGZ1bmN0aW9ucyB3b3VsZCB0YWtlIHRoZSBmaW5hbCBmb3IgbG9vcCdzIGNvbG9yTmFtZS4pICovXG4gICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29sb3JOYW1lID0gQ1NTLkxpc3RzLmNvbG9yc1tpXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLyogTm90ZTogSW4gSUU8PTgsIHdoaWNoIHN1cHBvcnQgcmdiIGJ1dCBub3QgcmdiYSwgY29sb3IgcHJvcGVydGllcyBhcmUgcmV2ZXJ0ZWQgdG8gcmdiIGJ5IHN0cmlwcGluZyBvZmYgdGhlIGFscGhhIGNvbXBvbmVudC4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIENTUy5Ob3JtYWxpemF0aW9ucy5yZWdpc3RlcmVkW2NvbG9yTmFtZV0gPSBmdW5jdGlvbih0eXBlLCBlbGVtZW50LCBwcm9wZXJ0eVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJuYW1lXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29sb3JOYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBDb252ZXJ0IGFsbCBjb2xvciB2YWx1ZXMgaW50byB0aGUgcmdiIGZvcm1hdC4gKE9sZCBJRSBjYW4gcmV0dXJuIGhleCB2YWx1ZXMgYW5kIGNvbG9yIG5hbWVzIGluc3RlYWQgb2YgcmdiL3JnYmEuKSAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZXh0cmFjdFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV4dHJhY3RlZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogSWYgdGhlIGNvbG9yIGlzIGFscmVhZHkgaW4gaXRzIGhvb2thYmxlIGZvcm0gKGUuZy4gXCIyNTUgMjU1IDI1NSAxXCIpIGR1ZSB0byBoYXZpbmcgYmVlbiBwcmV2aW91c2x5IGV4dHJhY3RlZCwgc2tpcCBleHRyYWN0aW9uLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKENTUy5SZWdFeC53cmFwcGVkVmFsdWVBbHJlYWR5RXh0cmFjdGVkLnRlc3QocHJvcGVydHlWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRyYWN0ZWQgPSBwcm9wZXJ0eVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29udmVydGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvck5hbWVzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxhY2s6IFwicmdiKDAsIDAsIDApXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibHVlOiBcInJnYigwLCAwLCAyNTUpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmF5OiBcInJnYigxMjgsIDEyOCwgMTI4KVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JlZW46IFwicmdiKDAsIDEyOCwgMClcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZDogXCJyZ2IoMjU1LCAwLCAwKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpdGU6IFwicmdiKDI1NSwgMjU1LCAyNTUpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIENvbnZlcnQgY29sb3IgbmFtZXMgdG8gcmdiLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvXltBLXpdKyQvaS50ZXN0KHByb3BlcnR5VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2xvck5hbWVzW3Byb3BlcnR5VmFsdWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRlZCA9IGNvbG9yTmFtZXNbcHJvcGVydHlWYWx1ZV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIElmIGFuIHVubWF0Y2hlZCBjb2xvciBuYW1lIGlzIHByb3ZpZGVkLCBkZWZhdWx0IHRvIGJsYWNrLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udmVydGVkID0gY29sb3JOYW1lcy5ibGFjaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIENvbnZlcnQgaGV4IHZhbHVlcyB0byByZ2IuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChDU1MuUmVnRXguaXNIZXgudGVzdChwcm9wZXJ0eVZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0ZWQgPSBcInJnYihcIiArIENTUy5WYWx1ZXMuaGV4VG9SZ2IocHJvcGVydHlWYWx1ZSkuam9pbihcIiBcIikgKyBcIilcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBJZiB0aGUgcHJvdmlkZWQgY29sb3IgZG9lc24ndCBtYXRjaCBhbnkgb2YgdGhlIGFjY2VwdGVkIGNvbG9yIGZvcm1hdHMsIGRlZmF1bHQgdG8gYmxhY2suICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghKC9ecmdiYT9cXCgvaS50ZXN0KHByb3BlcnR5VmFsdWUpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0ZWQgPSBjb2xvck5hbWVzLmJsYWNrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIFJlbW92ZSB0aGUgc3Vycm91bmRpbmcgXCJyZ2IvcmdiYSgpXCIgc3RyaW5nIHRoZW4gcmVwbGFjZSBjb21tYXMgd2l0aCBzcGFjZXMgYW5kIHN0cmlwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwZWF0ZWQgc3BhY2VzIChpbiBjYXNlIHRoZSB2YWx1ZSBpbmNsdWRlZCBzcGFjZXMgdG8gYmVnaW4gd2l0aCkuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0cmFjdGVkID0gKGNvbnZlcnRlZCB8fCBwcm9wZXJ0eVZhbHVlKS50b1N0cmluZygpLm1hdGNoKENTUy5SZWdFeC52YWx1ZVVud3JhcClbMV0ucmVwbGFjZSgvLChcXHMrKT8vZywgXCIgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBTbyBsb25nIGFzIHRoaXMgaXNuJ3QgPD1JRTgsIGFkZCBhIGZvdXJ0aCAoYWxwaGEpIGNvbXBvbmVudCBpZiBpdCdzIG1pc3NpbmcgYW5kIGRlZmF1bHQgaXQgdG8gMSAodmlzaWJsZSkuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShJRSA8PSA4KSAmJiBleHRyYWN0ZWQuc3BsaXQoXCIgXCIpLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dHJhY3RlZCArPSBcIiAxXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBleHRyYWN0ZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpbmplY3RcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIElmIHRoaXMgaXMgSUU8PTggYW5kIGFuIGFscGhhIGNvbXBvbmVudCBleGlzdHMsIHN0cmlwIGl0IG9mZi4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChJRSA8PSA4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5VmFsdWUuc3BsaXQoXCIgXCIpLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eVZhbHVlID0gcHJvcGVydHlWYWx1ZS5zcGxpdCgvXFxzKy8pLnNsaWNlKDAsIDMpLmpvaW4oXCIgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIE90aGVyd2lzZSwgYWRkIGEgZm91cnRoIChhbHBoYSkgY29tcG9uZW50IGlmIGl0J3MgbWlzc2luZyBhbmQgZGVmYXVsdCBpdCB0byAxICh2aXNpYmxlKS4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHlWYWx1ZS5zcGxpdChcIiBcIikubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlWYWx1ZSArPSBcIiAxXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIFJlLWluc2VydCB0aGUgYnJvd3Nlci1hcHByb3ByaWF0ZSB3cmFwcGVyKFwicmdiL3JnYmEoKVwiKSwgaW5zZXJ0IGNvbW1hcywgYW5kIHN0cmlwIG9mZiBkZWNpbWFsIHVuaXRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbiBhbGwgdmFsdWVzIGJ1dCB0aGUgZm91cnRoIChSLCBHLCBhbmQgQiBvbmx5IGFjY2VwdCB3aG9sZSBudW1iZXJzKS4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoSUUgPD0gOCA/IFwicmdiXCIgOiBcInJnYmFcIikgKyBcIihcIiArIHByb3BlcnR5VmFsdWUucmVwbGFjZSgvXFxzKy9nLCBcIixcIikucmVwbGFjZSgvXFwuKFxcZCkrKD89LCkvZywgXCJcIikgKyBcIilcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgIENTUyBQcm9wZXJ0eSBOYW1lc1xuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgTmFtZXM6IHtcbiAgICAgICAgICAgIC8qIENhbWVsY2FzZSBhIHByb3BlcnR5IG5hbWUgaW50byBpdHMgSmF2YVNjcmlwdCBub3RhdGlvbiAoZS5nLiBcImJhY2tncm91bmQtY29sb3JcIiA9PT4gXCJiYWNrZ3JvdW5kQ29sb3JcIikuXG4gICAgICAgICAgICAgICBDYW1lbGNhc2luZyBpcyB1c2VkIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0eSBuYW1lcyBiZXR3ZWVuIGFuZCBhY3Jvc3MgY2FsbHMuICovXG4gICAgICAgICAgICBjYW1lbENhc2U6IGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wZXJ0eS5yZXBsYWNlKC8tKFxcdykvZywgZnVuY3Rpb24gKG1hdGNoLCBzdWJNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3ViTWF0Y2gudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC8qIEZvciBTVkcgZWxlbWVudHMsIHNvbWUgcHJvcGVydGllcyAobmFtZWx5LCBkaW1lbnNpb25hbCBvbmVzKSBhcmUgR0VUL1NFVCB2aWEgdGhlIGVsZW1lbnQncyBIVE1MIGF0dHJpYnV0ZXMgKGluc3RlYWQgb2YgdmlhIENTUyBzdHlsZXMpLiAqL1xuICAgICAgICAgICAgU1ZHQXR0cmlidXRlOiBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICB2YXIgU1ZHQXR0cmlidXRlcyA9IFwid2lkdGh8aGVpZ2h0fHh8eXxjeHxjeXxyfHJ4fHJ5fHgxfHgyfHkxfHkyXCI7XG5cbiAgICAgICAgICAgICAgICAvKiBDZXJ0YWluIGJyb3dzZXJzIHJlcXVpcmUgYW4gU1ZHIHRyYW5zZm9ybSB0byBiZSBhcHBsaWVkIGFzIGFuIGF0dHJpYnV0ZS4gKE90aGVyd2lzZSwgYXBwbGljYXRpb24gdmlhIENTUyBpcyBwcmVmZXJhYmxlIGR1ZSB0byAzRCBzdXBwb3J0LikgKi9cbiAgICAgICAgICAgICAgICBpZiAoSUUgfHwgKFZlbG9jaXR5LlN0YXRlLmlzQW5kcm9pZCAmJiAhVmVsb2NpdHkuU3RhdGUuaXNDaHJvbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIFNWR0F0dHJpYnV0ZXMgKz0gXCJ8dHJhbnNmb3JtXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoXCJeKFwiICsgU1ZHQXR0cmlidXRlcyArIFwiKSRcIiwgXCJpXCIpLnRlc3QocHJvcGVydHkpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLyogRGV0ZXJtaW5lIHdoZXRoZXIgYSBwcm9wZXJ0eSBzaG91bGQgYmUgc2V0IHdpdGggYSB2ZW5kb3IgcHJlZml4LiAqL1xuICAgICAgICAgICAgLyogSWYgYSBwcmVmaXhlZCB2ZXJzaW9uIG9mIHRoZSBwcm9wZXJ0eSBleGlzdHMsIHJldHVybiBpdC4gT3RoZXJ3aXNlLCByZXR1cm4gdGhlIG9yaWdpbmFsIHByb3BlcnR5IG5hbWUuXG4gICAgICAgICAgICAgICBJZiB0aGUgcHJvcGVydHkgaXMgbm90IGF0IGFsbCBzdXBwb3J0ZWQgYnkgdGhlIGJyb3dzZXIsIHJldHVybiBhIGZhbHNlIGZsYWcuICovXG4gICAgICAgICAgICBwcmVmaXhDaGVjazogZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgLyogSWYgdGhpcyBwcm9wZXJ0eSBoYXMgYWxyZWFkeSBiZWVuIGNoZWNrZWQsIHJldHVybiB0aGUgY2FjaGVkIHZhbHVlLiAqL1xuICAgICAgICAgICAgICAgIGlmIChWZWxvY2l0eS5TdGF0ZS5wcmVmaXhNYXRjaGVzW3Byb3BlcnR5XSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWyBWZWxvY2l0eS5TdGF0ZS5wcmVmaXhNYXRjaGVzW3Byb3BlcnR5XSwgdHJ1ZSBdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2ZW5kb3JzID0gWyBcIlwiLCBcIldlYmtpdFwiLCBcIk1velwiLCBcIm1zXCIsIFwiT1wiIF07XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIHZlbmRvcnNMZW5ndGggPSB2ZW5kb3JzLmxlbmd0aDsgaSA8IHZlbmRvcnNMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb3BlcnR5UHJlZml4ZWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlQcmVmaXhlZCA9IHByb3BlcnR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBDYXBpdGFsaXplIHRoZSBmaXJzdCBsZXR0ZXIgb2YgdGhlIHByb3BlcnR5IHRvIGNvbmZvcm0gdG8gSmF2YVNjcmlwdCB2ZW5kb3IgcHJlZml4IG5vdGF0aW9uIChlLmcuIHdlYmtpdEZpbHRlcikuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlQcmVmaXhlZCA9IHZlbmRvcnNbaV0gKyBwcm9wZXJ0eS5yZXBsYWNlKC9eXFx3LywgZnVuY3Rpb24obWF0Y2gpIHsgcmV0dXJuIG1hdGNoLnRvVXBwZXJDYXNlKCk7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBDaGVjayBpZiB0aGUgYnJvd3NlciBzdXBwb3J0cyB0aGlzIHByb3BlcnR5IGFzIHByZWZpeGVkLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFR5cGUuaXNTdHJpbmcoVmVsb2NpdHkuU3RhdGUucHJlZml4RWxlbWVudC5zdHlsZVtwcm9wZXJ0eVByZWZpeGVkXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBDYWNoZSB0aGUgbWF0Y2guICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVmVsb2NpdHkuU3RhdGUucHJlZml4TWF0Y2hlc1twcm9wZXJ0eV0gPSBwcm9wZXJ0eVByZWZpeGVkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsgcHJvcGVydHlQcmVmaXhlZCwgdHJ1ZSBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLyogSWYgdGhlIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IHRoaXMgcHJvcGVydHkgaW4gYW55IGZvcm0sIGluY2x1ZGUgYSBmYWxzZSBmbGFnIHNvIHRoYXQgdGhlIGNhbGxlciBjYW4gZGVjaWRlIGhvdyB0byBwcm9jZWVkLiAqL1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWyBwcm9wZXJ0eSwgZmFsc2UgXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAgICBDU1MgUHJvcGVydHkgVmFsdWVzXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICBWYWx1ZXM6IHtcbiAgICAgICAgICAgIC8qIEhleCB0byBSR0IgY29udmVyc2lvbi4gQ29weXJpZ2h0IFRpbSBEb3duOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU2MjM4MzgvcmdiLXRvLWhleC1hbmQtaGV4LXRvLXJnYiAqL1xuICAgICAgICAgICAgaGV4VG9SZ2I6IGZ1bmN0aW9uIChoZXgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2hvcnRmb3JtUmVnZXggPSAvXiM/KFthLWZcXGRdKShbYS1mXFxkXSkoW2EtZlxcZF0pJC9pLFxuICAgICAgICAgICAgICAgICAgICBsb25nZm9ybVJlZ2V4ID0gL14jPyhbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KSQvaSxcbiAgICAgICAgICAgICAgICAgICAgcmdiUGFydHM7XG5cbiAgICAgICAgICAgICAgICBoZXggPSBoZXgucmVwbGFjZShzaG9ydGZvcm1SZWdleCwgZnVuY3Rpb24gKG0sIHIsIGcsIGIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHIgKyByICsgZyArIGcgKyBiICsgYjtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJnYlBhcnRzID0gbG9uZ2Zvcm1SZWdleC5leGVjKGhleCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmdiUGFydHMgPyBbIHBhcnNlSW50KHJnYlBhcnRzWzFdLCAxNiksIHBhcnNlSW50KHJnYlBhcnRzWzJdLCAxNiksIHBhcnNlSW50KHJnYlBhcnRzWzNdLCAxNikgXSA6IFsgMCwgMCwgMCBdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzQ1NTTnVsbFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAvKiBUaGUgYnJvd3NlciBkZWZhdWx0cyBDU1MgdmFsdWVzIHRoYXQgaGF2ZSBub3QgYmVlbiBzZXQgdG8gZWl0aGVyIDAgb3Igb25lIG9mIHNldmVyYWwgcG9zc2libGUgbnVsbC12YWx1ZSBzdHJpbmdzLlxuICAgICAgICAgICAgICAgICAgIFRodXMsIHdlIGNoZWNrIGZvciBib3RoIGZhbHNpbmVzcyBhbmQgdGhlc2Ugc3BlY2lhbCBzdHJpbmdzLiAqL1xuICAgICAgICAgICAgICAgIC8qIE51bGwtdmFsdWUgY2hlY2tpbmcgaXMgcGVyZm9ybWVkIHRvIGRlZmF1bHQgdGhlIHNwZWNpYWwgc3RyaW5ncyB0byAwIChmb3IgdGhlIHNha2Ugb2YgdHdlZW5pbmcpIG9yIHRoZWlyIGhvb2tcbiAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZXMgYXMgZGVmaW5lZCBhcyBDU1MuSG9va3MgKGZvciB0aGUgc2FrZSBvZiBob29rIGluamVjdGlvbi9leHRyYWN0aW9uKS4gKi9cbiAgICAgICAgICAgICAgICAvKiBOb3RlOiBDaHJvbWUgcmV0dXJucyBcInJnYmEoMCwgMCwgMCwgMClcIiBmb3IgYW4gdW5kZWZpbmVkIGNvbG9yIHdoZXJlYXMgSUUgcmV0dXJucyBcInRyYW5zcGFyZW50XCIuICovXG4gICAgICAgICAgICAgICAgcmV0dXJuICh2YWx1ZSA9PSAwIHx8IC9eKG5vbmV8YXV0b3x0cmFuc3BhcmVudHwocmdiYVxcKDAsID8wLCA/MCwgPzBcXCkpKSQvaS50ZXN0KHZhbHVlKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLyogUmV0cmlldmUgYSBwcm9wZXJ0eSdzIGRlZmF1bHQgdW5pdCB0eXBlLiBVc2VkIGZvciBhc3NpZ25pbmcgYSB1bml0IHR5cGUgd2hlbiBvbmUgaXMgbm90IHN1cHBsaWVkIGJ5IHRoZSB1c2VyLiAqL1xuICAgICAgICAgICAgZ2V0VW5pdFR5cGU6IGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIGlmICgvXihyb3RhdGV8c2tldykvaS50ZXN0KHByb3BlcnR5KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJkZWdcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKC8oXihzY2FsZXxzY2FsZVh8c2NhbGVZfHNjYWxlWnxhbHBoYXxmbGV4R3Jvd3xmbGV4SGVpZ2h0fHpJbmRleHxmb250V2VpZ2h0KSQpfCgob3BhY2l0eXxyZWR8Z3JlZW58Ymx1ZXxhbHBoYSkkKS9pLnRlc3QocHJvcGVydHkpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qIFRoZSBhYm92ZSBwcm9wZXJ0aWVzIGFyZSB1bml0bGVzcy4gKi9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLyogRGVmYXVsdCB0byBweCBmb3IgYWxsIG90aGVyIHByb3BlcnRpZXMuICovXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInB4XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qIEhUTUwgZWxlbWVudHMgZGVmYXVsdCB0byBhbiBhc3NvY2lhdGVkIGRpc3BsYXkgdHlwZSB3aGVuIHRoZXkncmUgbm90IHNldCB0byBkaXNwbGF5Om5vbmUuICovXG4gICAgICAgICAgICAvKiBOb3RlOiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgZm9yIGNvcnJlY3RseSBzZXR0aW5nIHRoZSBub24tXCJub25lXCIgZGlzcGxheSB2YWx1ZSBpbiBjZXJ0YWluIFZlbG9jaXR5IHNlcXVlbmNlcywgc3VjaCBhcyBmYWRlSW4vT3V0LiAqL1xuICAgICAgICAgICAgZ2V0RGlzcGxheVR5cGU6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhZ05hbWUgPSBlbGVtZW50LnRhZ05hbWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKC9eKGJ8YmlnfGl8c21hbGx8dHR8YWJicnxhY3JvbnltfGNpdGV8Y29kZXxkZm58ZW18a2JkfHN0cm9uZ3xzYW1wfHZhcnxhfGJkb3xicnxpbWd8bWFwfG9iamVjdHxxfHNjcmlwdHxzcGFufHN1YnxzdXB8YnV0dG9ufGlucHV0fGxhYmVsfHNlbGVjdHx0ZXh0YXJlYSkkL2kudGVzdCh0YWdOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJpbmxpbmVcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKC9eKGxpKSQvaS50ZXN0KHRhZ05hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcImxpc3QtaXRlbVwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoL14odHIpJC9pLnRlc3QodGFnTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidGFibGUtcm93XCI7XG4gICAgICAgICAgICAgICAgLyogRGVmYXVsdCB0byBcImJsb2NrXCIgd2hlbiBubyBtYXRjaCBpcyBmb3VuZC4gKi9cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKiBUaGUgY2xhc3MgYWRkL3JlbW92ZSBmdW5jdGlvbnMgYXJlIHVzZWQgdG8gdGVtcG9yYXJpbHkgYXBwbHkgYSBcInZlbG9jaXR5LWFuaW1hdGluZ1wiIGNsYXNzIHRvIGVsZW1lbnRzIHdoaWxlIHRoZXkncmUgYW5pbWF0aW5nLiAqL1xuICAgICAgICAgICAgYWRkQ2xhc3M6IGZ1bmN0aW9uIChlbGVtZW50LCBjbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgKz0gKGVsZW1lbnQuY2xhc3NOYW1lLmxlbmd0aCA/IFwiIFwiIDogXCJcIikgKyBjbGFzc05hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbiAoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUudG9TdHJpbmcoKS5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoXnxcXFxccylcIiArIGNsYXNzTmFtZS5zcGxpdChcIiBcIikuam9pbihcInxcIikgKyBcIihcXFxcc3wkKVwiLCBcImdpXCIpLCBcIiBcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgIFN0eWxlIEdldHRpbmcgJiBTZXR0aW5nXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgLyogVGhlIHNpbmd1bGFyIGdldFByb3BlcnR5VmFsdWUsIHdoaWNoIHJvdXRlcyB0aGUgbG9naWMgZm9yIGFsbCBub3JtYWxpemF0aW9ucywgaG9va3MsIGFuZCBzdGFuZGFyZCBDU1MgcHJvcGVydGllcy4gKi9cbiAgICAgICAgZ2V0UHJvcGVydHlWYWx1ZTogZnVuY3Rpb24gKGVsZW1lbnQsIHByb3BlcnR5LCByb290UHJvcGVydHlWYWx1ZSwgZm9yY2VTdHlsZUxvb2t1cCkge1xuICAgICAgICAgICAgLyogR2V0IGFuIGVsZW1lbnQncyBjb21wdXRlZCBwcm9wZXJ0eSB2YWx1ZS4gKi9cbiAgICAgICAgICAgIC8qIE5vdGU6IFJldHJpZXZpbmcgdGhlIHZhbHVlIG9mIGEgQ1NTIHByb3BlcnR5IGNhbm5vdCBzaW1wbHkgYmUgcGVyZm9ybWVkIGJ5IGNoZWNraW5nIGFuIGVsZW1lbnQnc1xuICAgICAgICAgICAgICAgc3R5bGUgYXR0cmlidXRlICh3aGljaCBvbmx5IHJlZmxlY3RzIHVzZXItZGVmaW5lZCB2YWx1ZXMpLiBJbnN0ZWFkLCB0aGUgYnJvd3NlciBtdXN0IGJlIHF1ZXJpZWQgZm9yIGEgcHJvcGVydHknc1xuICAgICAgICAgICAgICAgKmNvbXB1dGVkKiB2YWx1ZS4gWW91IGNhbiByZWFkIG1vcmUgYWJvdXQgZ2V0Q29tcHV0ZWRTdHlsZSBoZXJlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9BUEkvd2luZG93LmdldENvbXB1dGVkU3R5bGUgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNvbXB1dGVQcm9wZXJ0eVZhbHVlIChlbGVtZW50LCBwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIC8qIFdoZW4gYm94LXNpemluZyBpc24ndCBzZXQgdG8gYm9yZGVyLWJveCwgaGVpZ2h0IGFuZCB3aWR0aCBzdHlsZSB2YWx1ZXMgYXJlIGluY29ycmVjdGx5IGNvbXB1dGVkIHdoZW4gYW5cbiAgICAgICAgICAgICAgICAgICBlbGVtZW50J3Mgc2Nyb2xsYmFycyBhcmUgdmlzaWJsZSAod2hpY2ggZXhwYW5kcyB0aGUgZWxlbWVudCdzIGRpbWVuc2lvbnMpLiBUaHVzLCB3ZSBkZWZlciB0byB0aGUgbW9yZSBhY2N1cmF0ZVxuICAgICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodC9XaWR0aCBwcm9wZXJ0eSwgd2hpY2ggaW5jbHVkZXMgdGhlIHRvdGFsIGRpbWVuc2lvbnMgZm9yIGludGVyaW9yLCBib3JkZXIsIHBhZGRpbmcsIGFuZCBzY3JvbGxiYXIuXG4gICAgICAgICAgICAgICAgICAgV2Ugc3VidHJhY3QgYm9yZGVyIGFuZCBwYWRkaW5nIHRvIGdldCB0aGUgc3VtIG9mIGludGVyaW9yICsgc2Nyb2xsYmFyLiAqL1xuXG4gICAgICAgICAgICAgICAgdmFyIGNvbXB1dGVkVmFsdWUgPSAwO1xuXG4gICAgICAgICAgICAgICAgLyogSUU8PTggZG9lc24ndCBzdXBwb3J0IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlLCB0aHVzIHdlIGRlZmVyIHRvIGpRdWVyeSwgd2hpY2ggaGFzIGFuIGV4dGVuc2l2ZSBhcnJheVxuICAgICAgICAgICAgICAgICAgIG9mIGhhY2tzIHRvIGFjY3VyYXRlbHkgcmV0cmlldmUgSUU4IHByb3BlcnR5IHZhbHVlcy4gUmUtaW1wbGVtZW50aW5nIHRoYXQgbG9naWMgaGVyZSBpcyBub3Qgd29ydGggYmxvYXRpbmcgdGhlXG4gICAgICAgICAgICAgICAgICAgY29kZWJhc2UgZm9yIGEgZHlpbmcgYnJvd3Nlci4gVGhlIHBlcmZvcm1hbmNlIHJlcGVyY3Vzc2lvbnMgb2YgdXNpbmcgalF1ZXJ5IGhlcmUgYXJlIG1pbmltYWwgc2luY2VcbiAgICAgICAgICAgICAgICAgICBWZWxvY2l0eSBpcyBvcHRpbWl6ZWQgdG8gcmFyZWx5IChhbmQgc29tZXRpbWVzIG5ldmVyKSBxdWVyeSB0aGUgRE9NLiBGdXJ0aGVyLCB0aGUgJC5jc3MoKSBjb2RlcGF0aCBpc24ndCB0aGF0IHNsb3cuICovXG4gICAgICAgICAgICAgICAgaWYgKElFIDw9IDgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcHV0ZWRWYWx1ZSA9ICQuY3NzKGVsZW1lbnQsIHByb3BlcnR5KTsgLyogR0VUICovXG4gICAgICAgICAgICAgICAgLyogQWxsIG90aGVyIGJyb3dzZXJzIHN1cHBvcnQgZ2V0Q29tcHV0ZWRTdHlsZS4gVGhlIHJldHVybmVkIGxpdmUgb2JqZWN0IHJlZmVyZW5jZSBpcyBjYWNoZWQgb250byBpdHNcbiAgICAgICAgICAgICAgICAgICBhc3NvY2lhdGVkIGVsZW1lbnQgc28gdGhhdCBpdCBkb2VzIG5vdCBuZWVkIHRvIGJlIHJlZmV0Y2hlZCB1cG9uIGV2ZXJ5IEdFVC4gKi9cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvKiBCcm93c2VycyBkbyBub3QgcmV0dXJuIGhlaWdodCBhbmQgd2lkdGggdmFsdWVzIGZvciBlbGVtZW50cyB0aGF0IGFyZSBzZXQgdG8gZGlzcGxheTpcIm5vbmVcIi4gVGh1cywgd2UgdGVtcG9yYXJpbHlcbiAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlIGRpc3BsYXkgdG8gdGhlIGVsZW1lbnQgdHlwZSdzIGRlZmF1bHQgdmFsdWUuICovXG4gICAgICAgICAgICAgICAgICAgIHZhciB0b2dnbGVEaXNwbGF5ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKC9eKHdpZHRofGhlaWdodCkkLy50ZXN0KHByb3BlcnR5KSAmJiBDU1MuZ2V0UHJvcGVydHlWYWx1ZShlbGVtZW50LCBcImRpc3BsYXlcIikgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZURpc3BsYXkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgQ1NTLnNldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgXCJkaXNwbGF5XCIsIENTUy5WYWx1ZXMuZ2V0RGlzcGxheVR5cGUoZWxlbWVudCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gcmV2ZXJ0RGlzcGxheSAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9nZ2xlRGlzcGxheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENTUy5zZXRQcm9wZXJ0eVZhbHVlKGVsZW1lbnQsIFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWZvcmNlU3R5bGVMb29rdXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSA9PT0gXCJoZWlnaHRcIiAmJiBDU1MuZ2V0UHJvcGVydHlWYWx1ZShlbGVtZW50LCBcImJveFNpemluZ1wiKS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkgIT09IFwiYm9yZGVyLWJveFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlbnRCb3hIZWlnaHQgPSBlbGVtZW50Lm9mZnNldEhlaWdodCAtIChwYXJzZUZsb2F0KENTUy5nZXRQcm9wZXJ0eVZhbHVlKGVsZW1lbnQsIFwiYm9yZGVyVG9wV2lkdGhcIikpIHx8IDApIC0gKHBhcnNlRmxvYXQoQ1NTLmdldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgXCJib3JkZXJCb3R0b21XaWR0aFwiKSkgfHwgMCkgLSAocGFyc2VGbG9hdChDU1MuZ2V0UHJvcGVydHlWYWx1ZShlbGVtZW50LCBcInBhZGRpbmdUb3BcIikpIHx8IDApIC0gKHBhcnNlRmxvYXQoQ1NTLmdldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgXCJwYWRkaW5nQm90dG9tXCIpKSB8fCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZlcnREaXNwbGF5KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudEJveEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHkgPT09IFwid2lkdGhcIiAmJiBDU1MuZ2V0UHJvcGVydHlWYWx1ZShlbGVtZW50LCBcImJveFNpemluZ1wiKS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkgIT09IFwiYm9yZGVyLWJveFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlbnRCb3hXaWR0aCA9IGVsZW1lbnQub2Zmc2V0V2lkdGggLSAocGFyc2VGbG9hdChDU1MuZ2V0UHJvcGVydHlWYWx1ZShlbGVtZW50LCBcImJvcmRlckxlZnRXaWR0aFwiKSkgfHwgMCkgLSAocGFyc2VGbG9hdChDU1MuZ2V0UHJvcGVydHlWYWx1ZShlbGVtZW50LCBcImJvcmRlclJpZ2h0V2lkdGhcIikpIHx8IDApIC0gKHBhcnNlRmxvYXQoQ1NTLmdldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgXCJwYWRkaW5nTGVmdFwiKSkgfHwgMCkgLSAocGFyc2VGbG9hdChDU1MuZ2V0UHJvcGVydHlWYWx1ZShlbGVtZW50LCBcInBhZGRpbmdSaWdodFwiKSkgfHwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2ZXJ0RGlzcGxheSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnRCb3hXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb21wdXRlZFN0eWxlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qIEZvciBlbGVtZW50cyB0aGF0IFZlbG9jaXR5IGhhc24ndCBiZWVuIGNhbGxlZCBvbiBkaXJlY3RseSAoZS5nLiB3aGVuIFZlbG9jaXR5IHF1ZXJpZXMgdGhlIERPTSBvbiBiZWhhbGZcbiAgICAgICAgICAgICAgICAgICAgICAgb2YgYSBwYXJlbnQgb2YgYW4gZWxlbWVudCBpdHMgYW5pbWF0aW5nKSwgcGVyZm9ybSBhIGRpcmVjdCBnZXRDb21wdXRlZFN0eWxlIGxvb2t1cCBzaW5jZSB0aGUgb2JqZWN0IGlzbid0IGNhY2hlZC4gKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKERhdGEoZWxlbWVudCkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQsIG51bGwpOyAvKiBHRVQgKi9cbiAgICAgICAgICAgICAgICAgICAgLyogSWYgdGhlIGNvbXB1dGVkU3R5bGUgb2JqZWN0IGhhcyB5ZXQgdG8gYmUgY2FjaGVkLCBkbyBzbyBub3cuICovXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIURhdGEoZWxlbWVudCkuY29tcHV0ZWRTdHlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcHV0ZWRTdHlsZSA9IERhdGEoZWxlbWVudCkuY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQsIG51bGwpOyAvKiBHRVQgKi9cbiAgICAgICAgICAgICAgICAgICAgLyogSWYgY29tcHV0ZWRTdHlsZSBpcyBjYWNoZWQsIHVzZSBpdC4gKi9cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXB1dGVkU3R5bGUgPSBEYXRhKGVsZW1lbnQpLmNvbXB1dGVkU3R5bGU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvKiBJRSBhbmQgRmlyZWZveCBkbyBub3QgcmV0dXJuIGEgdmFsdWUgZm9yIHRoZSBnZW5lcmljIGJvcmRlckNvbG9yIC0tIHRoZXkgb25seSByZXR1cm4gaW5kaXZpZHVhbCB2YWx1ZXMgZm9yIGVhY2ggYm9yZGVyIHNpZGUncyBjb2xvci5cbiAgICAgICAgICAgICAgICAgICAgICAgQXMgYSBwb2x5ZmlsbCBmb3IgcXVlcnlpbmcgaW5kaXZpZHVhbCBib3JkZXIgc2lkZSBjb2xvcnMsIGp1c3QgcmV0dXJuIHRoZSB0b3AgYm9yZGVyJ3MgY29sb3IuICovXG4gICAgICAgICAgICAgICAgICAgIGlmICgoSUUgfHwgVmVsb2NpdHkuU3RhdGUuaXNGaXJlZm94KSAmJiBwcm9wZXJ0eSA9PT0gXCJib3JkZXJDb2xvclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eSA9IFwiYm9yZGVyVG9wQ29sb3JcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8qIElFOSBoYXMgYSBidWcgaW4gd2hpY2ggdGhlIFwiZmlsdGVyXCIgcHJvcGVydHkgbXVzdCBiZSBhY2Nlc3NlZCBmcm9tIGNvbXB1dGVkU3R5bGUgdXNpbmcgdGhlIGdldFByb3BlcnR5VmFsdWUgbWV0aG9kXG4gICAgICAgICAgICAgICAgICAgICAgIGluc3RlYWQgb2YgYSBkaXJlY3QgcHJvcGVydHkgbG9va3VwLiBUaGUgZ2V0UHJvcGVydHlWYWx1ZSBtZXRob2QgaXMgc2xvd2VyIHRoYW4gYSBkaXJlY3QgbG9va3VwLCB3aGljaCBpcyB3aHkgd2UgYXZvaWQgaXQgYnkgZGVmYXVsdC4gKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKElFID09PSA5ICYmIHByb3BlcnR5ID09PSBcImZpbHRlclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wdXRlZFZhbHVlID0gY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KTsgLyogR0VUICovXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wdXRlZFZhbHVlID0gY29tcHV0ZWRTdHlsZVtwcm9wZXJ0eV07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvKiBGYWxsIGJhY2sgdG8gdGhlIHByb3BlcnR5J3Mgc3R5bGUgdmFsdWUgKGlmIGRlZmluZWQpIHdoZW4gY29tcHV0ZWRWYWx1ZSByZXR1cm5zIG5vdGhpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgIHdoaWNoIGNhbiBoYXBwZW4gd2hlbiB0aGUgZWxlbWVudCBoYXNuJ3QgYmVlbiBwYWludGVkLiAqL1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29tcHV0ZWRWYWx1ZSA9PT0gXCJcIiB8fCBjb21wdXRlZFZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wdXRlZFZhbHVlID0gZWxlbWVudC5zdHlsZVtwcm9wZXJ0eV07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXZlcnREaXNwbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLyogRm9yIHRvcCwgcmlnaHQsIGJvdHRvbSwgYW5kIGxlZnQgKFRSQkwpIHZhbHVlcyB0aGF0IGFyZSBzZXQgdG8gXCJhdXRvXCIgb24gZWxlbWVudHMgb2YgXCJmaXhlZFwiIG9yIFwiYWJzb2x1dGVcIiBwb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICBkZWZlciB0byBqUXVlcnkgZm9yIGNvbnZlcnRpbmcgXCJhdXRvXCIgdG8gYSBudW1lcmljIHZhbHVlLiAoRm9yIGVsZW1lbnRzIHdpdGggYSBcInN0YXRpY1wiIG9yIFwicmVsYXRpdmVcIiBwb3NpdGlvbiwgXCJhdXRvXCIgaGFzIHRoZSBzYW1lXG4gICAgICAgICAgICAgICAgICAgZWZmZWN0IGFzIGJlaW5nIHNldCB0byAwLCBzbyBubyBjb252ZXJzaW9uIGlzIG5lY2Vzc2FyeS4pICovXG4gICAgICAgICAgICAgICAgLyogQW4gZXhhbXBsZSBvZiB3aHkgbnVtZXJpYyBjb252ZXJzaW9uIGlzIG5lY2Vzc2FyeTogV2hlbiBhbiBlbGVtZW50IHdpdGggXCJwb3NpdGlvbjphYnNvbHV0ZVwiIGhhcyBhbiB1bnRvdWNoZWQgXCJsZWZ0XCJcbiAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eSwgd2hpY2ggcmV2ZXJ0cyB0byBcImF1dG9cIiwgbGVmdCdzIHZhbHVlIGlzIDAgcmVsYXRpdmUgdG8gaXRzIHBhcmVudCBlbGVtZW50LCBidXQgaXMgb2Z0ZW4gbm9uLXplcm8gcmVsYXRpdmVcbiAgICAgICAgICAgICAgICAgICB0byBpdHMgKmNvbnRhaW5pbmcqIChub3QgcGFyZW50KSBlbGVtZW50LCB3aGljaCBpcyB0aGUgbmVhcmVzdCBcInBvc2l0aW9uOnJlbGF0aXZlXCIgYW5jZXN0b3Igb3IgdGhlIHZpZXdwb3J0IChhbmQgYWx3YXlzIHRoZSB2aWV3cG9ydCBpbiB0aGUgY2FzZSBvZiBcInBvc2l0aW9uOmZpeGVkXCIpLiAqL1xuICAgICAgICAgICAgICAgIGlmIChjb21wdXRlZFZhbHVlID09PSBcImF1dG9cIiAmJiAvXih0b3B8cmlnaHR8Ym90dG9tfGxlZnQpJC9pLnRlc3QocHJvcGVydHkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IGNvbXB1dGVQcm9wZXJ0eVZhbHVlKGVsZW1lbnQsIFwicG9zaXRpb25cIik7IC8qIEdFVCAqL1xuXG4gICAgICAgICAgICAgICAgICAgIC8qIEZvciBhYnNvbHV0ZSBwb3NpdGlvbmluZywgalF1ZXJ5J3MgJC5wb3NpdGlvbigpIG9ubHkgcmV0dXJucyB2YWx1ZXMgZm9yIHRvcCBhbmQgbGVmdDtcbiAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQgYW5kIGJvdHRvbSB3aWxsIGhhdmUgdGhlaXIgXCJhdXRvXCIgdmFsdWUgcmV2ZXJ0ZWQgdG8gMC4gKi9cbiAgICAgICAgICAgICAgICAgICAgLyogTm90ZTogQSBqUXVlcnkgb2JqZWN0IG11c3QgYmUgY3JlYXRlZCBoZXJlIHNpbmNlIGpRdWVyeSBkb2Vzbid0IGhhdmUgYSBsb3ctbGV2ZWwgYWxpYXMgZm9yICQucG9zaXRpb24oKS5cbiAgICAgICAgICAgICAgICAgICAgICAgTm90IGEgYmlnIGRlYWwgc2luY2Ugd2UncmUgY3VycmVudGx5IGluIGEgR0VUIGJhdGNoIGFueXdheS4gKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uID09PSBcImZpeGVkXCIgfHwgKHBvc2l0aW9uID09PSBcImFic29sdXRlXCIgJiYgL3RvcHxsZWZ0L2kudGVzdChwcm9wZXJ0eSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBOb3RlOiBqUXVlcnkgc3RyaXBzIHRoZSBwaXhlbCB1bml0IGZyb20gaXRzIHJldHVybmVkIHZhbHVlczsgd2UgcmUtYWRkIGl0IGhlcmUgdG8gY29uZm9ybSB3aXRoIGNvbXB1dGVQcm9wZXJ0eVZhbHVlJ3MgYmVoYXZpb3IuICovXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wdXRlZFZhbHVlID0gJChlbGVtZW50KS5wb3NpdGlvbigpW3Byb3BlcnR5XSArIFwicHhcIjsgLyogR0VUICovXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcHV0ZWRWYWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHByb3BlcnR5VmFsdWU7XG5cbiAgICAgICAgICAgIC8qIElmIHRoaXMgaXMgYSBob29rZWQgcHJvcGVydHkgKGUuZy4gXCJjbGlwTGVmdFwiIGluc3RlYWQgb2YgdGhlIHJvb3QgcHJvcGVydHkgb2YgXCJjbGlwXCIpLFxuICAgICAgICAgICAgICAgZXh0cmFjdCB0aGUgaG9vaydzIHZhbHVlIGZyb20gYSBub3JtYWxpemVkIHJvb3RQcm9wZXJ0eVZhbHVlIHVzaW5nIENTUy5Ib29rcy5leHRyYWN0VmFsdWUoKS4gKi9cbiAgICAgICAgICAgIGlmIChDU1MuSG9va3MucmVnaXN0ZXJlZFtwcm9wZXJ0eV0pIHtcbiAgICAgICAgICAgICAgICB2YXIgaG9vayA9IHByb3BlcnR5LFxuICAgICAgICAgICAgICAgICAgICBob29rUm9vdCA9IENTUy5Ib29rcy5nZXRSb290KGhvb2spO1xuXG4gICAgICAgICAgICAgICAgLyogSWYgYSBjYWNoZWQgcm9vdFByb3BlcnR5VmFsdWUgd2Fzbid0IHBhc3NlZCBpbiAod2hpY2ggVmVsb2NpdHkgYWx3YXlzIGF0dGVtcHRzIHRvIGRvIGluIG9yZGVyIHRvIGF2b2lkIHJlcXVlcnlpbmcgdGhlIERPTSksXG4gICAgICAgICAgICAgICAgICAgcXVlcnkgdGhlIERPTSBmb3IgdGhlIHJvb3QgcHJvcGVydHkncyB2YWx1ZS4gKi9cbiAgICAgICAgICAgICAgICBpZiAocm9vdFByb3BlcnR5VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvKiBTaW5jZSB0aGUgYnJvd3NlciBpcyBub3cgYmVpbmcgZGlyZWN0bHkgcXVlcmllZCwgdXNlIHRoZSBvZmZpY2lhbCBwb3N0LXByZWZpeGluZyBwcm9wZXJ0eSBuYW1lIGZvciB0aGlzIGxvb2t1cC4gKi9cbiAgICAgICAgICAgICAgICAgICAgcm9vdFByb3BlcnR5VmFsdWUgPSBDU1MuZ2V0UHJvcGVydHlWYWx1ZShlbGVtZW50LCBDU1MuTmFtZXMucHJlZml4Q2hlY2soaG9va1Jvb3QpWzBdKTsgLyogR0VUICovXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLyogSWYgdGhpcyByb290IGhhcyBhIG5vcm1hbGl6YXRpb24gcmVnaXN0ZXJlZCwgcGVmb3JtIHRoZSBhc3NvY2lhdGVkIG5vcm1hbGl6YXRpb24gZXh0cmFjdGlvbi4gKi9cbiAgICAgICAgICAgICAgICBpZiAoQ1NTLk5vcm1hbGl6YXRpb25zLnJlZ2lzdGVyZWRbaG9va1Jvb3RdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvb3RQcm9wZXJ0eVZhbHVlID0gQ1NTLk5vcm1hbGl6YXRpb25zLnJlZ2lzdGVyZWRbaG9va1Jvb3RdKFwiZXh0cmFjdFwiLCBlbGVtZW50LCByb290UHJvcGVydHlWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLyogRXh0cmFjdCB0aGUgaG9vaydzIHZhbHVlLiAqL1xuICAgICAgICAgICAgICAgIHByb3BlcnR5VmFsdWUgPSBDU1MuSG9va3MuZXh0cmFjdFZhbHVlKGhvb2ssIHJvb3RQcm9wZXJ0eVZhbHVlKTtcblxuICAgICAgICAgICAgLyogSWYgdGhpcyBpcyBhIG5vcm1hbGl6ZWQgcHJvcGVydHkgKGUuZy4gXCJvcGFjaXR5XCIgYmVjb21lcyBcImZpbHRlclwiIGluIDw9SUU4KSBvciBcInRyYW5zbGF0ZVhcIiBiZWNvbWVzIFwidHJhbnNmb3JtXCIpLFxuICAgICAgICAgICAgICAgbm9ybWFsaXplIHRoZSBwcm9wZXJ0eSdzIG5hbWUgYW5kIHZhbHVlLCBhbmQgaGFuZGxlIHRoZSBzcGVjaWFsIGNhc2Ugb2YgdHJhbnNmb3Jtcy4gKi9cbiAgICAgICAgICAgIC8qIE5vdGU6IE5vcm1hbGl6aW5nIGEgcHJvcGVydHkgaXMgbXV0dWFsbHkgZXhjbHVzaXZlIGZyb20gaG9va2luZyBhIHByb3BlcnR5IHNpbmNlIGhvb2stZXh0cmFjdGVkIHZhbHVlcyBhcmUgc3RyaWN0bHlcbiAgICAgICAgICAgICAgIG51bWVyaWNhbCBhbmQgdGhlcmVmb3JlIGRvIG5vdCByZXF1aXJlIG5vcm1hbGl6YXRpb24gZXh0cmFjdGlvbi4gKi9cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoQ1NTLk5vcm1hbGl6YXRpb25zLnJlZ2lzdGVyZWRbcHJvcGVydHldKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vcm1hbGl6ZWRQcm9wZXJ0eU5hbWUsXG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRQcm9wZXJ0eVZhbHVlO1xuXG4gICAgICAgICAgICAgICAgbm9ybWFsaXplZFByb3BlcnR5TmFtZSA9IENTUy5Ob3JtYWxpemF0aW9ucy5yZWdpc3RlcmVkW3Byb3BlcnR5XShcIm5hbWVcIiwgZWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICAvKiBUcmFuc2Zvcm0gdmFsdWVzIGFyZSBjYWxjdWxhdGVkIHZpYSBub3JtYWxpemF0aW9uIGV4dHJhY3Rpb24gKHNlZSBiZWxvdyksIHdoaWNoIGNoZWNrcyBhZ2FpbnN0IHRoZSBlbGVtZW50J3MgdHJhbnNmb3JtQ2FjaGUuXG4gICAgICAgICAgICAgICAgICAgQXQgbm8gcG9pbnQgZG8gdHJhbnNmb3JtIEdFVHMgZXZlciBhY3R1YWxseSBxdWVyeSB0aGUgRE9NOyBpbml0aWFsIHN0eWxlc2hlZXQgdmFsdWVzIGFyZSBuZXZlciBwcm9jZXNzZWQuXG4gICAgICAgICAgICAgICAgICAgVGhpcyBpcyBiZWNhdXNlIHBhcnNpbmcgM0QgdHJhbnNmb3JtIG1hdHJpY2VzIGlzIG5vdCBhbHdheXMgYWNjdXJhdGUgYW5kIHdvdWxkIGJsb2F0IG91ciBjb2RlYmFzZTtcbiAgICAgICAgICAgICAgICAgICB0aHVzLCBub3JtYWxpemF0aW9uIGV4dHJhY3Rpb24gZGVmYXVsdHMgaW5pdGlhbCB0cmFuc2Zvcm0gdmFsdWVzIHRvIHRoZWlyIHplcm8tdmFsdWVzIChlLmcuIDEgZm9yIHNjYWxlWCBhbmQgMCBmb3IgdHJhbnNsYXRlWCkuICovXG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWRQcm9wZXJ0eU5hbWUgIT09IFwidHJhbnNmb3JtXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsaXplZFByb3BlcnR5VmFsdWUgPSBjb21wdXRlUHJvcGVydHlWYWx1ZShlbGVtZW50LCBDU1MuTmFtZXMucHJlZml4Q2hlY2sobm9ybWFsaXplZFByb3BlcnR5TmFtZSlbMF0pOyAvKiBHRVQgKi9cblxuICAgICAgICAgICAgICAgICAgICAvKiBJZiB0aGUgdmFsdWUgaXMgYSBDU1MgbnVsbC12YWx1ZSBhbmQgdGhpcyBwcm9wZXJ0eSBoYXMgYSBob29rIHRlbXBsYXRlLCB1c2UgdGhhdCB6ZXJvLXZhbHVlIHRlbXBsYXRlIHNvIHRoYXQgaG9va3MgY2FuIGJlIGV4dHJhY3RlZCBmcm9tIGl0LiAqL1xuICAgICAgICAgICAgICAgICAgICBpZiAoQ1NTLlZhbHVlcy5pc0NTU051bGxWYWx1ZShub3JtYWxpemVkUHJvcGVydHlWYWx1ZSkgJiYgQ1NTLkhvb2tzLnRlbXBsYXRlc1twcm9wZXJ0eV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRQcm9wZXJ0eVZhbHVlID0gQ1NTLkhvb2tzLnRlbXBsYXRlc1twcm9wZXJ0eV1bMV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwcm9wZXJ0eVZhbHVlID0gQ1NTLk5vcm1hbGl6YXRpb25zLnJlZ2lzdGVyZWRbcHJvcGVydHldKFwiZXh0cmFjdFwiLCBlbGVtZW50LCBub3JtYWxpemVkUHJvcGVydHlWYWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIElmIGEgKG51bWVyaWMpIHZhbHVlIHdhc24ndCBwcm9kdWNlZCB2aWEgaG9vayBleHRyYWN0aW9uIG9yIG5vcm1hbGl6YXRpb24sIHF1ZXJ5IHRoZSBET00uICovXG4gICAgICAgICAgICBpZiAoIS9eW1xcZC1dLy50ZXN0KHByb3BlcnR5VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgLyogRm9yIFNWRyBlbGVtZW50cywgZGltZW5zaW9uYWwgcHJvcGVydGllcyAod2hpY2ggU1ZHQXR0cmlidXRlKCkgZGV0ZWN0cykgYXJlIHR3ZWVuZWQgdmlhXG4gICAgICAgICAgICAgICAgICAgdGhlaXIgSFRNTCBhdHRyaWJ1dGUgdmFsdWVzIGluc3RlYWQgb2YgdGhlaXIgQ1NTIHN0eWxlIHZhbHVlcy4gKi9cbiAgICAgICAgICAgICAgICBpZiAoRGF0YShlbGVtZW50KSAmJiBEYXRhKGVsZW1lbnQpLmlzU1ZHICYmIENTUy5OYW1lcy5TVkdBdHRyaWJ1dGUocHJvcGVydHkpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qIFNpbmNlIHRoZSBoZWlnaHQvd2lkdGggYXR0cmlidXRlIHZhbHVlcyBtdXN0IGJlIHNldCBtYW51YWxseSwgdGhleSBkb24ndCByZWZsZWN0IGNvbXB1dGVkIHZhbHVlcy5cbiAgICAgICAgICAgICAgICAgICAgICAgVGh1cywgd2UgdXNlIHVzZSBnZXRCQm94KCkgdG8gZW5zdXJlIHdlIGFsd2F5cyBnZXQgdmFsdWVzIGZvciBlbGVtZW50cyB3aXRoIHVuZGVmaW5lZCBoZWlnaHQvd2lkdGggYXR0cmlidXRlcy4gKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKC9eKGhlaWdodHx3aWR0aCkkL2kudGVzdChwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5VmFsdWUgPSBlbGVtZW50LmdldEJCb3goKVtwcm9wZXJ0eV07XG4gICAgICAgICAgICAgICAgICAgIC8qIE90aGVyd2lzZSwgYWNjZXNzIHRoZSBhdHRyaWJ1dGUgdmFsdWUgZGlyZWN0bHkuICovXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eVZhbHVlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUocHJvcGVydHkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlWYWx1ZSA9IGNvbXB1dGVQcm9wZXJ0eVZhbHVlKGVsZW1lbnQsIENTUy5OYW1lcy5wcmVmaXhDaGVjayhwcm9wZXJ0eSlbMF0pOyAvKiBHRVQgKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIFNpbmNlIHByb3BlcnR5IGxvb2t1cHMgYXJlIGZvciBhbmltYXRpb24gcHVycG9zZXMgKHdoaWNoIGVudGFpbHMgY29tcHV0aW5nIHRoZSBudW1lcmljIGRlbHRhIGJldHdlZW4gc3RhcnQgYW5kIGVuZCB2YWx1ZXMpLFxuICAgICAgICAgICAgICAgY29udmVydCBDU1MgbnVsbC12YWx1ZXMgdG8gYW4gaW50ZWdlciBvZiB2YWx1ZSAwLiAqL1xuICAgICAgICAgICAgaWYgKENTUy5WYWx1ZXMuaXNDU1NOdWxsVmFsdWUocHJvcGVydHlWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eVZhbHVlID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKFZlbG9jaXR5LmRlYnVnID49IDIpIGNvbnNvbGUubG9nKFwiR2V0IFwiICsgcHJvcGVydHkgKyBcIjogXCIgKyBwcm9wZXJ0eVZhbHVlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5VmFsdWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyogVGhlIHNpbmd1bGFyIHNldFByb3BlcnR5VmFsdWUsIHdoaWNoIHJvdXRlcyB0aGUgbG9naWMgZm9yIGFsbCBub3JtYWxpemF0aW9ucywgaG9va3MsIGFuZCBzdGFuZGFyZCBDU1MgcHJvcGVydGllcy4gKi9cbiAgICAgICAgc2V0UHJvcGVydHlWYWx1ZTogZnVuY3Rpb24oZWxlbWVudCwgcHJvcGVydHksIHByb3BlcnR5VmFsdWUsIHJvb3RQcm9wZXJ0eVZhbHVlLCBzY3JvbGxEYXRhKSB7XG4gICAgICAgICAgICB2YXIgcHJvcGVydHlOYW1lID0gcHJvcGVydHk7XG5cbiAgICAgICAgICAgIC8qIEluIG9yZGVyIHRvIGJlIHN1YmplY3RlZCB0byBjYWxsIG9wdGlvbnMgYW5kIGVsZW1lbnQgcXVldWVpbmcsIHNjcm9sbCBhbmltYXRpb24gaXMgcm91dGVkIHRocm91Z2ggVmVsb2NpdHkgYXMgaWYgaXQgd2VyZSBhIHN0YW5kYXJkIENTUyBwcm9wZXJ0eS4gKi9cbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eSA9PT0gXCJzY3JvbGxcIikge1xuICAgICAgICAgICAgICAgIC8qIElmIGEgY29udGFpbmVyIG9wdGlvbiBpcyBwcmVzZW50LCBzY3JvbGwgdGhlIGNvbnRhaW5lciBpbnN0ZWFkIG9mIHRoZSBicm93c2VyIHdpbmRvdy4gKi9cbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsRGF0YS5jb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsRGF0YS5jb250YWluZXJbXCJzY3JvbGxcIiArIHNjcm9sbERhdGEuZGlyZWN0aW9uXSA9IHByb3BlcnR5VmFsdWU7XG4gICAgICAgICAgICAgICAgLyogT3RoZXJ3aXNlLCBWZWxvY2l0eSBkZWZhdWx0cyB0byBzY3JvbGxpbmcgdGhlIGJyb3dzZXIgd2luZG93LiAqL1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzY3JvbGxEYXRhLmRpcmVjdGlvbiA9PT0gXCJMZWZ0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyhwcm9wZXJ0eVZhbHVlLCBzY3JvbGxEYXRhLmFsdGVybmF0ZVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyhzY3JvbGxEYXRhLmFsdGVybmF0ZVZhbHVlLCBwcm9wZXJ0eVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLyogVHJhbnNmb3JtcyAodHJhbnNsYXRlWCwgcm90YXRlWiwgZXRjLikgYXJlIGFwcGxpZWQgdG8gYSBwZXItZWxlbWVudCB0cmFuc2Zvcm1DYWNoZSBvYmplY3QsIHdoaWNoIGlzIG1hbnVhbGx5IGZsdXNoZWQgdmlhIGZsdXNoVHJhbnNmb3JtQ2FjaGUoKS5cbiAgICAgICAgICAgICAgICAgICBUaHVzLCBmb3Igbm93LCB3ZSBtZXJlbHkgY2FjaGUgdHJhbnNmb3JtcyBiZWluZyBTRVQuICovXG4gICAgICAgICAgICAgICAgaWYgKENTUy5Ob3JtYWxpemF0aW9ucy5yZWdpc3RlcmVkW3Byb3BlcnR5XSAmJiBDU1MuTm9ybWFsaXphdGlvbnMucmVnaXN0ZXJlZFtwcm9wZXJ0eV0oXCJuYW1lXCIsIGVsZW1lbnQpID09PSBcInRyYW5zZm9ybVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qIFBlcmZvcm0gYSBub3JtYWxpemF0aW9uIGluamVjdGlvbi4gKi9cbiAgICAgICAgICAgICAgICAgICAgLyogTm90ZTogVGhlIG5vcm1hbGl6YXRpb24gbG9naWMgaGFuZGxlcyB0aGUgdHJhbnNmb3JtQ2FjaGUgdXBkYXRpbmcuICovXG4gICAgICAgICAgICAgICAgICAgIENTUy5Ob3JtYWxpemF0aW9ucy5yZWdpc3RlcmVkW3Byb3BlcnR5XShcImluamVjdFwiLCBlbGVtZW50LCBwcm9wZXJ0eVZhbHVlKTtcblxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eU5hbWUgPSBcInRyYW5zZm9ybVwiO1xuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eVZhbHVlID0gRGF0YShlbGVtZW50KS50cmFuc2Zvcm1DYWNoZVtwcm9wZXJ0eV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLyogSW5qZWN0IGhvb2tzLiAqL1xuICAgICAgICAgICAgICAgICAgICBpZiAoQ1NTLkhvb2tzLnJlZ2lzdGVyZWRbcHJvcGVydHldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaG9va05hbWUgPSBwcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob29rUm9vdCA9IENTUy5Ib29rcy5nZXRSb290KHByb3BlcnR5KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLyogSWYgYSBjYWNoZWQgcm9vdFByb3BlcnR5VmFsdWUgd2FzIG5vdCBwcm92aWRlZCwgcXVlcnkgdGhlIERPTSBmb3IgdGhlIGhvb2tSb290J3MgY3VycmVudCB2YWx1ZS4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb3RQcm9wZXJ0eVZhbHVlID0gcm9vdFByb3BlcnR5VmFsdWUgfHwgQ1NTLmdldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgaG9va1Jvb3QpOyAvKiBHRVQgKi9cblxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlWYWx1ZSA9IENTUy5Ib29rcy5pbmplY3RWYWx1ZShob29rTmFtZSwgcHJvcGVydHlWYWx1ZSwgcm9vdFByb3BlcnR5VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHkgPSBob29rUm9vdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8qIE5vcm1hbGl6ZSBuYW1lcyBhbmQgdmFsdWVzLiAqL1xuICAgICAgICAgICAgICAgICAgICBpZiAoQ1NTLk5vcm1hbGl6YXRpb25zLnJlZ2lzdGVyZWRbcHJvcGVydHldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eVZhbHVlID0gQ1NTLk5vcm1hbGl6YXRpb25zLnJlZ2lzdGVyZWRbcHJvcGVydHldKFwiaW5qZWN0XCIsIGVsZW1lbnQsIHByb3BlcnR5VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHkgPSBDU1MuTm9ybWFsaXphdGlvbnMucmVnaXN0ZXJlZFtwcm9wZXJ0eV0oXCJuYW1lXCIsIGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLyogQXNzaWduIHRoZSBhcHByb3ByaWF0ZSB2ZW5kb3IgcHJlZml4IGJlZm9yZSBwZXJmb3JtaW5nIGFuIG9mZmljaWFsIHN0eWxlIHVwZGF0ZS4gKi9cbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlOYW1lID0gQ1NTLk5hbWVzLnByZWZpeENoZWNrKHByb3BlcnR5KVswXTtcblxuICAgICAgICAgICAgICAgICAgICAvKiBBIHRyeS9jYXRjaCBpcyB1c2VkIGZvciBJRTw9OCwgd2hpY2ggdGhyb3dzIGFuIGVycm9yIHdoZW4gXCJpbnZhbGlkXCIgQ1NTIHZhbHVlcyBhcmUgc2V0LCBlLmcuIGEgbmVnYXRpdmUgd2lkdGguXG4gICAgICAgICAgICAgICAgICAgICAgIFRyeS9jYXRjaCBpcyBhdm9pZGVkIGZvciBvdGhlciBicm93c2VycyBzaW5jZSBpdCBpbmN1cnMgYSBwZXJmb3JtYW5jZSBvdmVyaGVhZC4gKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKElFIDw9IDgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtwcm9wZXJ0eU5hbWVdID0gcHJvcGVydHlWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7IGlmIChWZWxvY2l0eS5kZWJ1ZykgY29uc29sZS5sb2coXCJCcm93c2VyIGRvZXMgbm90IHN1cHBvcnQgW1wiICsgcHJvcGVydHlWYWx1ZSArIFwiXSBmb3IgW1wiICsgcHJvcGVydHlOYW1lICsgXCJdXCIpOyB9XG4gICAgICAgICAgICAgICAgICAgIC8qIFNWRyBlbGVtZW50cyBoYXZlIHRoZWlyIGRpbWVuc2lvbmFsIHByb3BlcnRpZXMgKHdpZHRoLCBoZWlnaHQsIHgsIHksIGN4LCBldGMuKSBhcHBsaWVkIGRpcmVjdGx5IGFzIGF0dHJpYnV0ZXMgaW5zdGVhZCBvZiBhcyBzdHlsZXMuICovXG4gICAgICAgICAgICAgICAgICAgIC8qIE5vdGU6IElFOCBkb2VzIG5vdCBzdXBwb3J0IFNWRyBlbGVtZW50cywgc28gaXQncyBva2F5IHRoYXQgd2Ugc2tpcCBpdCBmb3IgU1ZHIGFuaW1hdGlvbi4gKi9cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChEYXRhKGVsZW1lbnQpICYmIERhdGEoZWxlbWVudCkuaXNTVkcgJiYgQ1NTLk5hbWVzLlNWR0F0dHJpYnV0ZShwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIE5vdGU6IEZvciBTVkcgYXR0cmlidXRlcywgdmVuZG9yLXByZWZpeGVkIHByb3BlcnR5IG5hbWVzIGFyZSBuZXZlciB1c2VkLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgLyogTm90ZTogTm90IGFsbCBDU1MgcHJvcGVydGllcyBjYW4gYmUgYW5pbWF0ZWQgdmlhIGF0dHJpYnV0ZXMsIGJ1dCB0aGUgYnJvd3NlciB3b24ndCB0aHJvdyBhbiBlcnJvciBmb3IgdW5zdXBwb3J0ZWQgcHJvcGVydGllcy4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKHByb3BlcnR5LCBwcm9wZXJ0eVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbcHJvcGVydHlOYW1lXSA9IHByb3BlcnR5VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoVmVsb2NpdHkuZGVidWcgPj0gMikgY29uc29sZS5sb2coXCJTZXQgXCIgKyBwcm9wZXJ0eSArIFwiIChcIiArIHByb3BlcnR5TmFtZSArIFwiKTogXCIgKyBwcm9wZXJ0eVZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIFJldHVybiB0aGUgbm9ybWFsaXplZCBwcm9wZXJ0eSBuYW1lIGFuZCB2YWx1ZSBpbiBjYXNlIHRoZSBjYWxsZXIgd2FudHMgdG8ga25vdyBob3cgdGhlc2UgdmFsdWVzIHdlcmUgbW9kaWZpZWQgYmVmb3JlIGJlaW5nIGFwcGxpZWQgdG8gdGhlIERPTS4gKi9cbiAgICAgICAgICAgIHJldHVybiBbIHByb3BlcnR5TmFtZSwgcHJvcGVydHlWYWx1ZSBdO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qIFRvIGluY3JlYXNlIHBlcmZvcm1hbmNlIGJ5IGJhdGNoaW5nIHRyYW5zZm9ybSB1cGRhdGVzIGludG8gYSBzaW5nbGUgU0VULCB0cmFuc2Zvcm1zIGFyZSBub3QgZGlyZWN0bHkgYXBwbGllZCB0byBhbiBlbGVtZW50IHVudGlsIGZsdXNoVHJhbnNmb3JtQ2FjaGUoKSBpcyBjYWxsZWQuICovXG4gICAgICAgIC8qIE5vdGU6IFZlbG9jaXR5IGFwcGxpZXMgdHJhbnNmb3JtIHByb3BlcnRpZXMgaW4gdGhlIHNhbWUgb3JkZXIgdGhhdCB0aGV5IGFyZSBjaHJvbm9naWNhbGx5IGludHJvZHVjZWQgdG8gdGhlIGVsZW1lbnQncyBDU1Mgc3R5bGVzLiAqL1xuICAgICAgICBmbHVzaFRyYW5zZm9ybUNhY2hlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgICAgICB2YXIgdHJhbnNmb3JtU3RyaW5nID0gXCJcIjtcblxuICAgICAgICAgICAgLyogQ2VydGFpbiBicm93c2VycyByZXF1aXJlIHRoYXQgU1ZHIHRyYW5zZm9ybXMgYmUgYXBwbGllZCBhcyBhbiBhdHRyaWJ1dGUuIEhvd2V2ZXIsIHRoZSBTVkcgdHJhbnNmb3JtIGF0dHJpYnV0ZSB0YWtlcyBhIG1vZGlmaWVkIHZlcnNpb24gb2YgQ1NTJ3MgdHJhbnNmb3JtIHN0cmluZ1xuICAgICAgICAgICAgICAgKHVuaXRzIGFyZSBkcm9wcGVkIGFuZCwgZXhjZXB0IGZvciBza2V3WC9ZLCBzdWJwcm9wZXJ0aWVzIGFyZSBtZXJnZWQgaW50byB0aGVpciBtYXN0ZXIgcHJvcGVydHkgLS0gZS5nLiBzY2FsZVggYW5kIHNjYWxlWSBhcmUgbWVyZ2VkIGludG8gc2NhbGUoWCBZKS4gKi9cbiAgICAgICAgICAgIGlmICgoSUUgfHwgKFZlbG9jaXR5LlN0YXRlLmlzQW5kcm9pZCAmJiAhVmVsb2NpdHkuU3RhdGUuaXNDaHJvbWUpKSAmJiBEYXRhKGVsZW1lbnQpLmlzU1ZHKSB7XG4gICAgICAgICAgICAgICAgLyogU2luY2UgdHJhbnNmb3JtIHZhbHVlcyBhcmUgc3RvcmVkIGluIHRoZWlyIHBhcmVudGhlc2VzLXdyYXBwZWQgZm9ybSwgd2UgdXNlIGEgaGVscGVyIGZ1bmN0aW9uIHRvIHN0cmlwIG91dCB0aGVpciBudW1lcmljIHZhbHVlcy5cbiAgICAgICAgICAgICAgICAgICBGdXJ0aGVyLCBTVkcgdHJhbnNmb3JtIHByb3BlcnRpZXMgb25seSB0YWtlIHVuaXRsZXNzIChyZXByZXNlbnRpbmcgcGl4ZWxzKSB2YWx1ZXMsIHNvIGl0J3Mgb2theSB0aGF0IHBhcnNlRmxvYXQoKSBzdHJpcHMgdGhlIHVuaXQgc3VmZml4ZWQgdG8gdGhlIGZsb2F0IHZhbHVlLiAqL1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdldFRyYW5zZm9ybUZsb2F0ICh0cmFuc2Zvcm1Qcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChDU1MuZ2V0UHJvcGVydHlWYWx1ZShlbGVtZW50LCB0cmFuc2Zvcm1Qcm9wZXJ0eSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qIENyZWF0ZSBhbiBvYmplY3QgdG8gb3JnYW5pemUgYWxsIHRoZSB0cmFuc2Zvcm1zIHRoYXQgd2UnbGwgYXBwbHkgdG8gdGhlIFNWRyBlbGVtZW50LiBUbyBrZWVwIHRoZSBsb2dpYyBzaW1wbGUsXG4gICAgICAgICAgICAgICAgICAgd2UgcHJvY2VzcyAqYWxsKiB0cmFuc2Zvcm0gcHJvcGVydGllcyAtLSBldmVuIHRob3NlIHRoYXQgbWF5IG5vdCBiZSBleHBsaWNpdGx5IGFwcGxpZWQgKHNpbmNlIHRoZXkgZGVmYXVsdCB0byB0aGVpciB6ZXJvLXZhbHVlcyBhbnl3YXkpLiAqL1xuICAgICAgICAgICAgICAgIHZhciBTVkdUcmFuc2Zvcm1zID0ge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGU6IFsgZ2V0VHJhbnNmb3JtRmxvYXQoXCJ0cmFuc2xhdGVYXCIpLCBnZXRUcmFuc2Zvcm1GbG9hdChcInRyYW5zbGF0ZVlcIikgXSxcbiAgICAgICAgICAgICAgICAgICAgc2tld1g6IFsgZ2V0VHJhbnNmb3JtRmxvYXQoXCJza2V3WFwiKSBdLCBza2V3WTogWyBnZXRUcmFuc2Zvcm1GbG9hdChcInNrZXdZXCIpIF0sXG4gICAgICAgICAgICAgICAgICAgIC8qIElmIHRoZSBzY2FsZSBwcm9wZXJ0eSBpcyBzZXQgKG5vbi0xKSwgdXNlIHRoYXQgdmFsdWUgZm9yIHRoZSBzY2FsZVggYW5kIHNjYWxlWSB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMgYmVoYXZpb3IgbWltaWNzIHRoZSByZXN1bHQgb2YgYW5pbWF0aW5nIGFsbCB0aGVzZSBwcm9wZXJ0aWVzIGF0IG9uY2Ugb24gSFRNTCBlbGVtZW50cykuICovXG4gICAgICAgICAgICAgICAgICAgIHNjYWxlOiBnZXRUcmFuc2Zvcm1GbG9hdChcInNjYWxlXCIpICE9PSAxID8gWyBnZXRUcmFuc2Zvcm1GbG9hdChcInNjYWxlXCIpLCBnZXRUcmFuc2Zvcm1GbG9hdChcInNjYWxlXCIpIF0gOiBbIGdldFRyYW5zZm9ybUZsb2F0KFwic2NhbGVYXCIpLCBnZXRUcmFuc2Zvcm1GbG9hdChcInNjYWxlWVwiKSBdLFxuICAgICAgICAgICAgICAgICAgICAvKiBOb3RlOiBTVkcncyByb3RhdGUgdHJhbnNmb3JtIHRha2VzIHRocmVlIHZhbHVlczogcm90YXRpb24gZGVncmVlcyBmb2xsb3dlZCBieSB0aGUgWCBhbmQgWSB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgZGVmaW5pbmcgdGhlIHJvdGF0aW9uJ3Mgb3JpZ2luIHBvaW50LiBXZSBpZ25vcmUgdGhlIG9yaWdpbiB2YWx1ZXMgKGRlZmF1bHQgdGhlbSB0byAwKS4gKi9cbiAgICAgICAgICAgICAgICAgICAgcm90YXRlOiBbIGdldFRyYW5zZm9ybUZsb2F0KFwicm90YXRlWlwiKSwgMCwgMCBdXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIC8qIEl0ZXJhdGUgdGhyb3VnaCB0aGUgdHJhbnNmb3JtIHByb3BlcnRpZXMgaW4gdGhlIHVzZXItZGVmaW5lZCBwcm9wZXJ0eSBtYXAgb3JkZXIuXG4gICAgICAgICAgICAgICAgICAgKFRoaXMgbWltaWNzIHRoZSBiZWhhdmlvciBvZiBub24tU1ZHIHRyYW5zZm9ybSBhbmltYXRpb24uKSAqL1xuICAgICAgICAgICAgICAgICQuZWFjaChEYXRhKGVsZW1lbnQpLnRyYW5zZm9ybUNhY2hlLCBmdW5jdGlvbih0cmFuc2Zvcm1OYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qIEV4Y2VwdCBmb3Igd2l0aCBza2V3WC9ZLCByZXZlcnQgdGhlIGF4aXMtc3BlY2lmaWMgdHJhbnNmb3JtIHN1YnByb3BlcnRpZXMgdG8gdGhlaXIgYXhpcy1mcmVlIG1hc3RlclxuICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzIHNvIHRoYXQgdGhleSBtYXRjaCB1cCB3aXRoIFNWRydzIGFjY2VwdGVkIHRyYW5zZm9ybSBwcm9wZXJ0aWVzLiAqL1xuICAgICAgICAgICAgICAgICAgICBpZiAoL150cmFuc2xhdGUvaS50ZXN0KHRyYW5zZm9ybU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1OYW1lID0gXCJ0cmFuc2xhdGVcIjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgvXnNjYWxlL2kudGVzdCh0cmFuc2Zvcm1OYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtTmFtZSA9IFwic2NhbGVcIjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgvXnJvdGF0ZS9pLnRlc3QodHJhbnNmb3JtTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybU5hbWUgPSBcInJvdGF0ZVwiO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLyogQ2hlY2sgdGhhdCB3ZSBoYXZlbid0IHlldCBkZWxldGVkIHRoZSBwcm9wZXJ0eSBmcm9tIHRoZSBTVkdUcmFuc2Zvcm1zIGNvbnRhaW5lci4gKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKFNWR1RyYW5zZm9ybXNbdHJhbnNmb3JtTmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIEFwcGVuZCB0aGUgdHJhbnNmb3JtIHByb3BlcnR5IGluIHRoZSBTVkctc3VwcG9ydGVkIHRyYW5zZm9ybSBmb3JtYXQuIEFzIHBlciB0aGUgc3BlYywgc3Vycm91bmQgdGhlIHNwYWNlLWRlbGltaXRlZCB2YWx1ZXMgaW4gcGFyZW50aGVzZXMuICovXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1TdHJpbmcgKz0gdHJhbnNmb3JtTmFtZSArIFwiKFwiICsgU1ZHVHJhbnNmb3Jtc1t0cmFuc2Zvcm1OYW1lXS5qb2luKFwiIFwiKSArIFwiKVwiICsgXCIgXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIEFmdGVyIHByb2Nlc3NpbmcgYW4gU1ZHIHRyYW5zZm9ybSBwcm9wZXJ0eSwgZGVsZXRlIGl0IGZyb20gdGhlIFNWR1RyYW5zZm9ybXMgY29udGFpbmVyIHNvIHdlIGRvbid0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZS1pbnNlcnQgdGhlIHNhbWUgbWFzdGVyIHByb3BlcnR5IGlmIHdlIGVuY291bnRlciBhbm90aGVyIG9uZSBvZiBpdHMgYXhpcy1zcGVjaWZpYyBwcm9wZXJ0aWVzLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIFNWR1RyYW5zZm9ybXNbdHJhbnNmb3JtTmFtZV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHRyYW5zZm9ybVZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBwZXJzcGVjdGl2ZTtcblxuICAgICAgICAgICAgICAgIC8qIFRyYW5zZm9ybSBwcm9wZXJ0aWVzIGFyZSBzdG9yZWQgYXMgbWVtYmVycyBvZiB0aGUgdHJhbnNmb3JtQ2FjaGUgb2JqZWN0LiBDb25jYXRlbmF0ZSBhbGwgdGhlIG1lbWJlcnMgaW50byBhIHN0cmluZy4gKi9cbiAgICAgICAgICAgICAgICAkLmVhY2goRGF0YShlbGVtZW50KS50cmFuc2Zvcm1DYWNoZSwgZnVuY3Rpb24odHJhbnNmb3JtTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1WYWx1ZSA9IERhdGEoZWxlbWVudCkudHJhbnNmb3JtQ2FjaGVbdHJhbnNmb3JtTmFtZV07XG5cbiAgICAgICAgICAgICAgICAgICAgLyogVHJhbnNmb3JtJ3MgcGVyc3BlY3RpdmUgc3VicHJvcGVydHkgbXVzdCBiZSBzZXQgZmlyc3QgaW4gb3JkZXIgdG8gdGFrZSBlZmZlY3QuIFN0b3JlIGl0IHRlbXBvcmFyaWx5LiAqL1xuICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNmb3JtTmFtZSA9PT0gXCJ0cmFuc2Zvcm1QZXJzcGVjdGl2ZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzcGVjdGl2ZSA9IHRyYW5zZm9ybVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvKiBJRTkgb25seSBzdXBwb3J0cyBvbmUgcm90YXRpb24gdHlwZSwgcm90YXRlWiwgd2hpY2ggaXQgcmVmZXJzIHRvIGFzIFwicm90YXRlXCIuICovXG4gICAgICAgICAgICAgICAgICAgIGlmIChJRSA9PT0gOSAmJiB0cmFuc2Zvcm1OYW1lID09PSBcInJvdGF0ZVpcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtTmFtZSA9IFwicm90YXRlXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1TdHJpbmcgKz0gdHJhbnNmb3JtTmFtZSArIHRyYW5zZm9ybVZhbHVlICsgXCIgXCI7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvKiBJZiBwcmVzZW50LCBzZXQgdGhlIHBlcnNwZWN0aXZlIHN1YnByb3BlcnR5IGZpcnN0LiAqL1xuICAgICAgICAgICAgICAgIGlmIChwZXJzcGVjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1TdHJpbmcgPSBcInBlcnNwZWN0aXZlXCIgKyBwZXJzcGVjdGl2ZSArIFwiIFwiICsgdHJhbnNmb3JtU3RyaW5nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgQ1NTLnNldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgXCJ0cmFuc2Zvcm1cIiwgdHJhbnNmb3JtU3RyaW5nKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKiBSZWdpc3RlciBob29rcyBhbmQgbm9ybWFsaXphdGlvbnMuICovXG4gICAgQ1NTLkhvb2tzLnJlZ2lzdGVyKCk7XG4gICAgQ1NTLk5vcm1hbGl6YXRpb25zLnJlZ2lzdGVyKCk7XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgIFZlbG9jaXR5LmFuaW1hdGVcbiAgICAqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgVmVsb2NpdHkuYW5pbWF0ZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIC8qKioqKioqKioqKioqKioqKipcbiAgICAgICAgICAgIENhbGwgQ2hhaW5cbiAgICAgICAgKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qIExvZ2ljIGZvciBkZXRlcm1pbmluZyB3aGF0IHRvIHJldHVybiB0byB0aGUgY2FsbCBzdGFjayB3aGVuIGV4aXRpbmcgb3V0IG9mIFZlbG9jaXR5LiAqL1xuICAgICAgICBmdW5jdGlvbiBnZXRDaGFpbiAoKSB7XG4gICAgICAgICAgICAvKiBJZiB3ZSBhcmUgdXNpbmcgdGhlIHV0aWxpdHkgZnVuY3Rpb24sIGF0dGVtcHQgdG8gcmV0dXJuIHRoaXMgY2FsbCdzIHByb21pc2UuIElmIG5vIHByb21pc2UgbGlicmFyeSB3YXMgZGV0ZWN0ZWQsXG4gICAgICAgICAgICAgICBkZWZhdWx0IHRvIG51bGwgaW5zdGVhZCBvZiByZXR1cm5pbmcgdGhlIHRhcmdldGVkIGVsZW1lbnRzIHNvIHRoYXQgdXRpbGl0eSBmdW5jdGlvbidzIHJldHVybiB2YWx1ZSBpcyBzdGFuZGFyZGl6ZWQuICovXG4gICAgICAgICAgICBpZiAoaXNVdGlsaXR5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2VEYXRhLnByb21pc2UgfHwgbnVsbDtcbiAgICAgICAgICAgIC8qIE90aGVyd2lzZSwgaWYgd2UncmUgdXNpbmcgJC5mbiwgcmV0dXJuIHRoZSBqUXVlcnktL1plcHRvLXdyYXBwZWQgZWxlbWVudCBzZXQuICovXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50c1dyYXBwZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAgICBBcmd1bWVudHMgQXNzaWdubWVudFxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qIFRvIGFsbG93IGZvciBleHByZXNzaXZlIENvZmZlZVNjcmlwdCBjb2RlLCBWZWxvY2l0eSBzdXBwb3J0cyBhbiBhbHRlcm5hdGl2ZSBzeW50YXggaW4gd2hpY2ggXCJwcm9wZXJ0aWVzXCIgYW5kIFwib3B0aW9uc1wiXG4gICAgICAgICAgIG9iamVjdHMgYXJlIGRlZmluZWQgb24gYSBjb250YWluZXIgb2JqZWN0IHRoYXQncyBwYXNzZWQgaW4gYXMgVmVsb2NpdHkncyBzb2xlIGFyZ3VtZW50LiAqL1xuICAgICAgICAvKiBOb3RlOiBTb21lIGJyb3dzZXJzIGF1dG9tYXRpY2FsbHkgcG9wdWxhdGUgYXJndW1lbnRzIHdpdGggYSBcInByb3BlcnRpZXNcIiBvYmplY3QuIFdlIGRldGVjdCBpdCBieSBjaGVja2luZyBmb3IgaXRzIGRlZmF1bHQgXCJuYW1lc1wiIHByb3BlcnR5LiAqL1xuICAgICAgICB2YXIgc3ludGFjdGljU3VnYXIgPSAoYXJndW1lbnRzWzBdICYmICgoJC5pc1BsYWluT2JqZWN0KGFyZ3VtZW50c1swXS5wcm9wZXJ0aWVzKSAmJiAhYXJndW1lbnRzWzBdLnByb3BlcnRpZXMubmFtZXMpIHx8IFR5cGUuaXNTdHJpbmcoYXJndW1lbnRzWzBdLnByb3BlcnRpZXMpKSksXG4gICAgICAgICAgICAvKiBXaGV0aGVyIFZlbG9jaXR5IHdhcyBjYWxsZWQgdmlhIHRoZSB1dGlsaXR5IGZ1bmN0aW9uIChhcyBvcHBvc2VkIHRvIG9uIGEgalF1ZXJ5L1plcHRvIG9iamVjdCkuICovXG4gICAgICAgICAgICBpc1V0aWxpdHksXG4gICAgICAgICAgICAvKiBXaGVuIFZlbG9jaXR5IGlzIGNhbGxlZCB2aWEgdGhlIHV0aWxpdHkgZnVuY3Rpb24gKCQuVmVsb2NpdHkuYW5pbWF0ZSgpL1ZlbG9jaXR5LmFuaW1hdGUoKSksIGVsZW1lbnRzIGFyZSBleHBsaWNpdGx5XG4gICAgICAgICAgICAgICBwYXNzZWQgaW4gYXMgdGhlIGZpcnN0IHBhcmFtZXRlci4gVGh1cywgYXJndW1lbnQgcG9zaXRpb25pbmcgdmFyaWVzLiBXZSBub3JtYWxpemUgdGhlbSBoZXJlLiAqL1xuICAgICAgICAgICAgZWxlbWVudHNXcmFwcGVkLFxuICAgICAgICAgICAgYXJndW1lbnRJbmRleDtcblxuICAgICAgICB2YXIgZWxlbWVudHMsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzTWFwLFxuICAgICAgICAgICAgb3B0aW9ucztcblxuICAgICAgICAvKiBEZXRlY3QgalF1ZXJ5L1plcHRvIGVsZW1lbnRzIGJlaW5nIGFuaW1hdGVkIHZpYSB0aGUgJC5mbiBtZXRob2QuICovXG4gICAgICAgIGlmIChUeXBlLmlzV3JhcHBlZCh0aGlzKSkge1xuICAgICAgICAgICAgaXNVdGlsaXR5ID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGFyZ3VtZW50SW5kZXggPSAwO1xuICAgICAgICAgICAgZWxlbWVudHMgPSB0aGlzO1xuICAgICAgICAgICAgZWxlbWVudHNXcmFwcGVkID0gdGhpcztcbiAgICAgICAgLyogT3RoZXJ3aXNlLCByYXcgZWxlbWVudHMgYXJlIGJlaW5nIGFuaW1hdGVkIHZpYSB0aGUgdXRpbGl0eSBmdW5jdGlvbi4gKi9cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlzVXRpbGl0eSA9IHRydWU7XG5cbiAgICAgICAgICAgIGFyZ3VtZW50SW5kZXggPSAxO1xuICAgICAgICAgICAgZWxlbWVudHMgPSBzeW50YWN0aWNTdWdhciA/IGFyZ3VtZW50c1swXS5lbGVtZW50cyA6IGFyZ3VtZW50c1swXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnRzID0gVHlwZS5pc1dyYXBwZWQoZWxlbWVudHMpID8gW10uc2xpY2UuY2FsbChlbGVtZW50cykgOiBlbGVtZW50cztcblxuICAgICAgICBpZiAoIWVsZW1lbnRzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3ludGFjdGljU3VnYXIpIHtcbiAgICAgICAgICAgIHByb3BlcnRpZXNNYXAgPSBhcmd1bWVudHNbMF0ucHJvcGVydGllcztcbiAgICAgICAgICAgIG9wdGlvbnMgPSBhcmd1bWVudHNbMF0ub3B0aW9ucztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb3BlcnRpZXNNYXAgPSBhcmd1bWVudHNbYXJndW1lbnRJbmRleF07XG4gICAgICAgICAgICBvcHRpb25zID0gYXJndW1lbnRzW2FyZ3VtZW50SW5kZXggKyAxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFRoZSBsZW5ndGggb2YgdGhlIGVsZW1lbnQgc2V0IChpbiB0aGUgZm9ybSBvZiBhIG5vZGVMaXN0IG9yIGFuIGFycmF5IG9mIGVsZW1lbnRzKSBpcyBkZWZhdWx0ZWQgdG8gMSBpbiBjYXNlIGFcbiAgICAgICAgICAgc2luZ2xlIHJhdyBET00gZWxlbWVudCBpcyBwYXNzZWQgaW4gKHdoaWNoIGRvZXNuJ3QgY29udGFpbiBhIGxlbmd0aCBwcm9wZXJ0eSkuICovXG4gICAgICAgIHZhciBlbGVtZW50c0xlbmd0aCA9IChUeXBlLmlzQXJyYXkoZWxlbWVudHMpIHx8IFR5cGUuaXNOb2RlTGlzdChlbGVtZW50cykpID8gZWxlbWVudHMubGVuZ3RoIDogMSxcbiAgICAgICAgICAgIGVsZW1lbnRzSW5kZXggPSAwO1xuXG4gICAgICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgICAgIEFyZ3VtZW50IE92ZXJsb2FkaW5nXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKiBTdXBwb3J0IGlzIGluY2x1ZGVkIGZvciBqUXVlcnkncyBhcmd1bWVudCBvdmVybG9hZGluZzogJC5hbmltYXRlKHByb3BlcnR5TWFwIFssIGR1cmF0aW9uXSBbLCBlYXNpbmddIFssIGNvbXBsZXRlXSkuXG4gICAgICAgICAgIE92ZXJsb2FkaW5nIGlzIGRldGVjdGVkIGJ5IGNoZWNraW5nIGZvciB0aGUgYWJzZW5jZSBvZiBhbiBvYmplY3QgYmVpbmcgcGFzc2VkIGludG8gb3B0aW9ucy4gKi9cbiAgICAgICAgLyogTm90ZTogVGhlIHN0b3AgYWN0aW9uIGRvZXMgbm90IGFjY2VwdCBhbmltYXRpb24gb3B0aW9ucywgYW5kIGlzIHRoZXJlZm9yZSBleGNsdWRlZCBmcm9tIHRoaXMgY2hlY2suICovXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzTWFwICE9PSBcInN0b3BcIiAmJiAhJC5pc1BsYWluT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgICAgICAgICAvKiBUaGUgdXRpbGl0eSBmdW5jdGlvbiBzaGlmdHMgYWxsIGFyZ3VtZW50cyBvbmUgcG9zaXRpb24gdG8gdGhlIHJpZ2h0LCBzbyB3ZSBhZGp1c3QgZm9yIHRoYXQgb2Zmc2V0LiAqL1xuICAgICAgICAgICAgdmFyIHN0YXJ0aW5nQXJndW1lbnRQb3NpdGlvbiA9IGFyZ3VtZW50SW5kZXggKyAxO1xuXG4gICAgICAgICAgICBvcHRpb25zID0ge307XG5cbiAgICAgICAgICAgIC8qIEl0ZXJhdGUgdGhyb3VnaCBhbGwgb3B0aW9ucyBhcmd1bWVudHMgKi9cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBzdGFydGluZ0FyZ3VtZW50UG9zaXRpb247IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAvKiBUcmVhdCBhIG51bWJlciBhcyBhIGR1cmF0aW9uLiBQYXJzZSBpdCBvdXQuICovXG4gICAgICAgICAgICAgICAgLyogTm90ZTogVGhlIGZvbGxvd2luZyBSZWdFeCB3aWxsIHJldHVybiB0cnVlIGlmIHBhc3NlZCBhbiBhcnJheSB3aXRoIGEgbnVtYmVyIGFzIGl0cyBmaXJzdCBpdGVtLlxuICAgICAgICAgICAgICAgICAgIFRodXMsIGFycmF5cyBhcmUgc2tpcHBlZCBmcm9tIHRoaXMgY2hlY2suICovXG4gICAgICAgICAgICAgICAgaWYgKCFUeXBlLmlzQXJyYXkoYXJndW1lbnRzW2ldKSAmJiAvXlxcZC8udGVzdChhcmd1bWVudHNbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZHVyYXRpb24gPSBwYXJzZUZsb2F0KGFyZ3VtZW50c1tpXSk7XG4gICAgICAgICAgICAgICAgLyogVHJlYXQgc3RyaW5ncyBhbmQgYXJyYXlzIGFzIGVhc2luZ3MuICovXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChUeXBlLmlzU3RyaW5nKGFyZ3VtZW50c1tpXSkgfHwgVHlwZS5pc0FycmF5KGFyZ3VtZW50c1tpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5lYXNpbmcgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICAgICAgLyogVHJlYXQgYSBmdW5jdGlvbiBhcyBhIGNvbXBsZXRlIGNhbGxiYWNrLiAqL1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoVHlwZS5pc0Z1bmN0aW9uKGFyZ3VtZW50c1tpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb21wbGV0ZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKioqKioqKioqKioqKioqXG4gICAgICAgICAgICBQcm9taXNlc1xuICAgICAgICAqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgdmFyIHByb21pc2VEYXRhID0geyBcbiAgICAgICAgICAgICAgICBwcm9taXNlOiBudWxsLFxuICAgICAgICAgICAgICAgIHJlc29sdmVyOiBudWxsLFxuICAgICAgICAgICAgICAgIHJlamVjdGVyOiBudWxsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIC8qIElmIHRoaXMgY2FsbCB3YXMgbWFkZSB2aWEgdGhlIHV0aWxpdHkgZnVuY3Rpb24gKHdoaWNoIGlzIHRoZSBkZWZhdWx0IG1ldGhvZCBvZiBpbnZvY2F0aW9uIHdoZW4galF1ZXJ5L1plcHRvIGFyZSBub3QgYmVpbmcgdXNlZCksIGFuZCBpZiBcbiAgICAgICAgICAgcHJvbWlzZSBzdXBwb3J0IHdhcyBkZXRlY3RlZCwgY3JlYXRlIGEgcHJvbWlzZSBvYmplY3QgZm9yIHRoaXMgY2FsbCBhbmQgc3RvcmUgcmVmZXJlbmNlcyB0byBpdHMgcmVzb2x2ZXIgYW5kIHJlamVjdGVyIG1ldGhvZHMuIFRoZSByZXNvbHZlXG4gICAgICAgICAgIG1ldGhvZCBpcyB1c2VkIHdoZW4gYSBjYWxsIGNvbXBsZXRlcyBuYXR1cmFsbHkgb3IgaXMgcHJlbWF0dXJlbHkgc3RvcHBlZCBieSB0aGUgdXNlci4gSW4gYm90aCBjYXNlcywgY29tcGxldGVDYWxsKCkgaGFuZGxlcyB0aGUgYXNzb2NpYXRlZFxuICAgICAgICAgICBjYWxsIGNsZWFudXAgYW5kIHByb21pc2UgcmVzb2x2aW5nIGxvZ2ljLiBUaGUgcmVqZWN0IG1ldGhvZCBpcyB1c2VkIHdoZW4gYW4gaW52YWxpZCBzZXQgb2YgYXJndW1lbnRzIGlzIHBhc3NlZCBpbnRvIGEgVmVsb2NpdHkgY2FsbC4gKi9cbiAgICAgICAgLyogTm90ZTogVmVsb2NpdHkgZW1wbG95cyBhIGNhbGwtYmFzZWQgcXVldWVpbmcgYXJjaGl0ZWN0dXJlLCB3aGljaCBtZWFucyB0aGF0IHN0b3BwaW5nIGFuIGFuaW1hdGluZyBlbGVtZW50IGFjdHVhbGx5IHN0b3BzIHRoZSBmdWxsIGNhbGwgdGhhdFxuICAgICAgICAgICB0cmlnZ2VyZWQgaXQgLS0gbm90IHRoYXQgb25lIGVsZW1lbnQgZXhjbHVzaXZlbHkuIFNpbWlsYXJseSwgdGhlcmUgaXMgb25lIHByb21pc2UgcGVyIGNhbGwsIGFuZCBhbGwgZWxlbWVudHMgdGFyZ2V0ZWQgYnkgYSBWZWxvY2l0eSBjYWxsIGFyZVxuICAgICAgICAgICBncm91cGVkIHRvZ2V0aGVyIGZvciB0aGUgcHVycG9zZXMgb2YgcmVzb2x2aW5nIGFuZCByZWplY3RpbmcgYSBwcm9taXNlLiAqL1xuICAgICAgICBpZiAoaXNVdGlsaXR5ICYmIFZlbG9jaXR5LlByb21pc2UpIHtcbiAgICAgICAgICAgIHByb21pc2VEYXRhLnByb21pc2UgPSBuZXcgVmVsb2NpdHkuUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZURhdGEucmVzb2x2ZXIgPSByZXNvbHZlO1xuICAgICAgICAgICAgICAgIHByb21pc2VEYXRhLnJlamVjdGVyID0gcmVqZWN0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgIEFjdGlvbiBEZXRlY3Rpb25cbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qIFZlbG9jaXR5J3MgYmVoYXZpb3IgaXMgY2F0ZWdvcml6ZWQgaW50byBcImFjdGlvbnNcIjogRWxlbWVudHMgY2FuIGVpdGhlciBiZSBzcGVjaWFsbHkgc2Nyb2xsZWQgaW50byB2aWV3LFxuICAgICAgICAgICBvciB0aGV5IGNhbiBiZSBzdGFydGVkLCBzdG9wcGVkLCBvciByZXZlcnNlZC4gSWYgYSBsaXRlcmFsIG9yIHJlZmVyZW5jZWQgcHJvcGVydGllcyBtYXAgaXMgcGFzc2VkIGluIGFzIFZlbG9jaXR5J3NcbiAgICAgICAgICAgZmlyc3QgYXJndW1lbnQsIHRoZSBhc3NvY2lhdGVkIGFjdGlvbiBpcyBcInN0YXJ0XCIuIEFsdGVybmF0aXZlbHksIFwic2Nyb2xsXCIsIFwicmV2ZXJzZVwiLCBvciBcInN0b3BcIiBjYW4gYmUgcGFzc2VkIGluIGluc3RlYWQgb2YgYSBwcm9wZXJ0aWVzIG1hcC4gKi9cbiAgICAgICAgdmFyIGFjdGlvbjtcblxuICAgICAgICBzd2l0Y2ggKHByb3BlcnRpZXNNYXApIHtcbiAgICAgICAgICAgIGNhc2UgXCJzY3JvbGxcIjpcbiAgICAgICAgICAgICAgICBhY3Rpb24gPSBcInNjcm9sbFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFwicmV2ZXJzZVwiOlxuICAgICAgICAgICAgICAgIGFjdGlvbiA9IFwicmV2ZXJzZVwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFwic3RvcFwiOlxuICAgICAgICAgICAgICAgIC8qKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgICAgICAgICAgIEFjdGlvbjogU3RvcFxuICAgICAgICAgICAgICAgICoqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgICAgICAvKiBDbGVhciB0aGUgY3VycmVudGx5LWFjdGl2ZSBkZWxheSBvbiBlYWNoIHRhcmdldGVkIGVsZW1lbnQuICovXG4gICAgICAgICAgICAgICAgJC5lYWNoKFR5cGUuaXNOb2RlKGVsZW1lbnRzKSA/IFsgZWxlbWVudHMgXSA6IGVsZW1lbnRzLCBmdW5jdGlvbihpLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChEYXRhKGVsZW1lbnQpICYmIERhdGEoZWxlbWVudCkuZGVsYXlUaW1lcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLyogU3RvcCB0aGUgdGltZXIgZnJvbSB0cmlnZ2VyaW5nIGl0cyBjYWNoZWQgbmV4dCgpIGZ1bmN0aW9uLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KERhdGEoZWxlbWVudCkuZGVsYXlUaW1lci5zZXRUaW1lb3V0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLyogTWFudWFsbHkgY2FsbCB0aGUgbmV4dCgpIGZ1bmN0aW9uIHNvIHRoYXQgdGhlIHN1YnNlcXVlbnQgcXVldWUgaXRlbXMgY2FuIHByb2dyZXNzLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKERhdGEoZWxlbWVudCkuZGVsYXlUaW1lci5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRGF0YShlbGVtZW50KS5kZWxheVRpbWVyLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIERhdGEoZWxlbWVudCkuZGVsYXlUaW1lcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdmFyIGNhbGxzVG9TdG9wID0gW107XG5cbiAgICAgICAgICAgICAgICAvKiBXaGVuIHRoZSBzdG9wIGFjdGlvbiBpcyB0cmlnZ2VyZWQsIHRoZSBlbGVtZW50cycgY3VycmVudGx5IGFjdGl2ZSBjYWxsIGlzIGltbWVkaWF0ZWx5IHN0b3BwZWQuIFRoZSBhY3RpdmUgY2FsbCBtaWdodCBoYXZlXG4gICAgICAgICAgICAgICAgICAgYmVlbiBhcHBsaWVkIHRvIG11bHRpcGxlIGVsZW1lbnRzLCBpbiB3aGljaCBjYXNlIGFsbCBvZiB0aGUgY2FsbCdzIGVsZW1lbnRzIHdpbGwgYmUgc3ViamVjdGVkIHRvIHN0b3BwaW5nLiBXaGVuIGFuIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICBpcyBzdG9wcGVkLCB0aGUgbmV4dCBpdGVtIGluIGl0cyBhbmltYXRpb24gcXVldWUgaXMgaW1tZWRpYXRlbHkgdHJpZ2dlcmVkLiAqL1xuICAgICAgICAgICAgICAgIC8qIEFuIGFkZGl0aW9uYWwgYXJndW1lbnQgbWF5IGJlIHBhc3NlZCBpbiB0byBjbGVhciBhbiBlbGVtZW50J3MgcmVtYWluaW5nIHF1ZXVlZCBjYWxscy4gRWl0aGVyIHRydWUgKHdoaWNoIGRlZmF1bHRzIHRvIHRoZSBcImZ4XCIgcXVldWUpXG4gICAgICAgICAgICAgICAgICAgb3IgYSBjdXN0b20gcXVldWUgc3RyaW5nIGNhbiBiZSBwYXNzZWQgaW4uICovXG4gICAgICAgICAgICAgICAgLyogU3RvcHBpbmcgaXMgYWNoaWV2ZWQgYnkgdHJhdmVyc2luZyBhY3RpdmUgY2FsbHMgZm9yIHRob3NlIHdoaWNoIGNvbnRhaW4gdGhlIHRhcmdldGVkIGVsZW1lbnQuICovXG4gICAgICAgICAgICAgICAgLyogTm90ZTogVGhlIHN0b3AgY29tbWFuZCBydW5zIHByaW9yIHRvIFF1ZXVlaW5nIHNpbmNlIGl0cyBiZWhhdmlvciBpcyBpbnRlbmRlZCB0byB0YWtlIGVmZmVjdCAqaW1tZWRpYXRlbHkqLFxuICAgICAgICAgICAgICAgICAgIHJlZ2FyZGxlc3Mgb2YgdGhlIGVsZW1lbnQncyBjdXJyZW50IHF1ZXVlIHN0YXRlLiAqL1xuICAgICAgICAgICAgICAgICQuZWFjaChWZWxvY2l0eS5TdGF0ZS5jYWxscywgZnVuY3Rpb24oaSwgYWN0aXZlQ2FsbCkge1xuICAgICAgICAgICAgICAgICAgICAvKiBJbmFjdGl2ZSBjYWxscyBhcmUgc2V0IHRvIGZhbHNlIGJ5IHRoZSBsb2dpYyBpbnNpZGUgY29tcGxldGVDYWxsKCkuIFNraXAgdGhlbS4gKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUNhbGwgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBJZiB3ZSdyZSBvcGVyYXRpbmcgb24gYSBzaW5nbGUgZWxlbWVudCwgd3JhcCBpdCBpbiBhbiBhcnJheSBzbyB0aGF0ICQuZWFjaCgpIGNhbiBpdGVyYXRlIG92ZXIgaXQuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2goVHlwZS5pc05vZGUoYWN0aXZlQ2FsbFsxXSkgPyBbIGFjdGl2ZUNhbGxbMV0gXSA6IGFjdGl2ZUNhbGxbMV0sIGZ1bmN0aW9uKGssIGFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2goVHlwZS5pc05vZGUoZWxlbWVudHMpID8gWyBlbGVtZW50cyBdIDogZWxlbWVudHMsIGZ1bmN0aW9uKGwsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogQ2hlY2sgdGhhdCB0aGlzIGNhbGwgd2FzIGFwcGxpZWQgdG8gdGhlIHRhcmdldCBlbGVtZW50LiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCA9PT0gYWN0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKERhdGEoZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBTaW5jZSBcInJldmVyc2VcIiB1c2VzIGNhY2hlZCBzdGFydCB2YWx1ZXMgKHRoZSBwcmV2aW91cyBjYWxsJ3MgZW5kVmFsdWVzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVzZSB2YWx1ZXMgbXVzdCBiZSBjaGFuZ2VkIHRvIHJlZmxlY3QgdGhlIGZpbmFsIHZhbHVlIHRoYXQgdGhlIGVsZW1lbnRzIHdlcmUgYWN0dWFsbHkgdHdlZW5lZCB0by4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2goRGF0YShlbGVtZW50KS50d2VlbnNDb250YWluZXIsIGZ1bmN0aW9uKG0sIGFjdGl2ZVR3ZWVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVR3ZWVuLmVuZFZhbHVlID0gYWN0aXZlVHdlZW4uY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBDbGVhciB0aGUgcmVtYWluaW5nIHF1ZXVlZCBjYWxscy4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zID09PSB0cnVlIHx8IFR5cGUuaXNTdHJpbmcob3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBUaGUgb3B0aW9ucyBhcmd1bWVudCBjYW4gYmUgb3ZlcnJpZGVuIHdpdGggYSBjdXN0b20gcXVldWUncyBuYW1lLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBxdWV1ZU5hbWUgPSBUeXBlLmlzU3RyaW5nKG9wdGlvbnMpID8gb3B0aW9ucyA6IFwiXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBJdGVyYXRlIHRocm91Z2ggdGhlIGl0ZW1zIGluIHRoZSBlbGVtZW50J3MgcXVldWUuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKCQucXVldWUoZWxlbWVudCwgcXVldWVOYW1lKSwgZnVuY3Rpb24oaSwgaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBUaGUgcXVldWUgYXJyYXkgY2FuIGNvbnRhaW4gYW4gXCJpbnByb2dyZXNzXCIgc2VudGluYWwsIHdoaWNoIHdlIHNraXAuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChUeXBlLmlzRnVuY3Rpb24oaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIFBhc3MgdGhlIGl0ZW0ncyBjYWxsYmFjayBhIGZsYWcgaW5kaWNhdGluZyB0aGF0IHdlIHdhbnQgdG8gYWJvcnQgZnJvbSB0aGUgcXVldWUgY2FsbC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChTcGVjaWZpY2FsbHksIHRoZSBxdWV1ZSB3aWxsIHJlc29sdmUgdGhlIGNhbGwncyBhc3NvY2lhdGVkIHByb21pc2UgdGhlbiBhYm9ydC4pICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbShudWxsLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogQ2xlYXJpbmcgdGhlICQucXVldWUoKSBhcnJheSBpcyBhY2hpZXZlZCBieSByZXNldHRpbmcgaXQgdG8gW10uICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5xdWV1ZShlbGVtZW50LCBxdWV1ZU5hbWUsIFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbHNUb1N0b3AucHVzaChpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8qIFByZW1hdHVyZWx5IGNhbGwgY29tcGxldGVDYWxsKCkgb24gZWFjaCBtYXRjaGVkIGFjdGl2ZSBjYWxsLCBwYXNzaW5nIGFuIGFkZGl0aW9uYWwgZmxhZyB0byBpbmRpY2F0ZVxuICAgICAgICAgICAgICAgICAgIHRoYXQgdGhlIGNvbXBsZXRlIGNhbGxiYWNrIGFuZCBkaXNwbGF5Om5vbmUgc2V0dGluZyBzaG91bGQgYmUgc2tpcHBlZCBzaW5jZSB3ZSdyZSBjb21wbGV0aW5nIHByZW1hdHVyZWx5LiAqL1xuICAgICAgICAgICAgICAgICQuZWFjaChjYWxsc1RvU3RvcCwgZnVuY3Rpb24oaSwgaikge1xuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZUNhbGwoaiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAocHJvbWlzZURhdGEucHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAvKiBJbW1lZGlhdGVseSByZXNvbHZlIHRoZSBwcm9taXNlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHN0b3AgY2FsbCBzaW5jZSBzdG9wIHJ1bnMgc3luY2hyb25vdXNseS4gKi9cbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZURhdGEucmVzb2x2ZXIoZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qIFNpbmNlIHdlJ3JlIHN0b3BwaW5nLCBhbmQgbm90IHByb2NlZWRpbmcgd2l0aCBxdWV1ZWluZywgZXhpdCBvdXQgb2YgVmVsb2NpdHkuICovXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldENoYWluKCk7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLyogVHJlYXQgYSBub24tZW1wdHkgcGxhaW4gb2JqZWN0IGFzIGEgbGl0ZXJhbCBwcm9wZXJ0aWVzIG1hcC4gKi9cbiAgICAgICAgICAgICAgICBpZiAoJC5pc1BsYWluT2JqZWN0KHByb3BlcnRpZXNNYXApICYmICEkLmlzRW1wdHlPYmplY3QocHJvcGVydGllc01hcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uID0gXCJzdGFydFwiO1xuXG4gICAgICAgICAgICAgICAgLyoqKioqKioqKioqKioqKipcbiAgICAgICAgICAgICAgICAgICAgU2VxdWVuY2VzXG4gICAgICAgICAgICAgICAgKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgICAgIC8qIENoZWNrIGlmIGEgc3RyaW5nIG1hdGNoZXMgYSByZWdpc3RlcmVkIHNlcXVlbmNlIChzZWUgU2VxdWVuY2VzIGFib3ZlKS4gKi9cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFR5cGUuaXNTdHJpbmcocHJvcGVydGllc01hcCkgJiYgVmVsb2NpdHkuU2VxdWVuY2VzW3Byb3BlcnRpZXNNYXBdKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkdXJhdGlvbk9yaWdpbmFsID0gb3B0aW9ucy5kdXJhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGF5T3JpZ2luYWwgPSBvcHRpb25zLmRlbGF5IHx8IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgLyogSWYgdGhlIGJhY2t3YXJkcyBvcHRpb24gd2FzIHBhc3NlZCBpbiwgcmV2ZXJzZSB0aGUgZWxlbWVudCBzZXQgc28gdGhhdCBlbGVtZW50cyBhbmltYXRlIGZyb20gdGhlIGxhc3QgdG8gdGhlIGZpcnN0LiAqL1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5iYWNrd2FyZHMgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gKGVsZW1lbnRzLmpxdWVyeSA/IFtdLnNsaWNlLmNhbGwoZWxlbWVudHMpIDogZWxlbWVudHMpLnJldmVyc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8qIEluZGl2aWR1YWxseSB0cmlnZ2VyIHRoZSBzZXF1ZW5jZSBmb3IgZWFjaCBlbGVtZW50IGluIHRoZSBzZXQgdG8gcHJldmVudCB1c2VycyBmcm9tIGhhdmluZyB0byBoYW5kbGUgaXRlcmF0aW9uIGxvZ2ljIGluIHRoZWlyIHNlcXVlbmNlLiAqL1xuICAgICAgICAgICAgICAgICAgICAkLmVhY2goZWxlbWVudHMsIGZ1bmN0aW9uKGVsZW1lbnRJbmRleCwgZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLyogSWYgdGhlIHN0YWdnZXIgb3B0aW9uIHdhcyBwYXNzZWQgaW4sIHN1Y2Nlc3NpdmVseSBkZWxheSBlYWNoIGVsZW1lbnQgYnkgdGhlIHN0YWdnZXIgdmFsdWUgKGluIG1zKS4gUmV0YWluIHRoZSBvcmlnaW5hbCBkZWxheSB2YWx1ZS4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUZsb2F0KG9wdGlvbnMuc3RhZ2dlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmRlbGF5ID0gZGVsYXlPcmlnaW5hbCArIChwYXJzZUZsb2F0KG9wdGlvbnMuc3RhZ2dlcikgKiBlbGVtZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChUeXBlLmlzRnVuY3Rpb24ob3B0aW9ucy5zdGFnZ2VyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGVsYXkgPSBkZWxheU9yaWdpbmFsICsgb3B0aW9ucy5zdGFnZ2VyLmNhbGwoZWxlbWVudCwgZWxlbWVudEluZGV4LCBlbGVtZW50c0xlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIElmIHRoZSBkcmFnIG9wdGlvbiB3YXMgcGFzc2VkIGluLCBzdWNjZXNzaXZlbHkgaW5jcmVhc2UvZGVjcmVhc2UgKGRlcGVuZGluZyBvbiB0aGUgcHJlc2Vuc2Ugb2Ygb3B0aW9ucy5iYWNrd2FyZHMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgZHVyYXRpb24gb2YgZWFjaCBlbGVtZW50J3MgYW5pbWF0aW9uLCB1c2luZyBmbG9vcnMgdG8gcHJldmVudCBwcm9kdWNpbmcgdmVyeSBzaG9ydCBkdXJhdGlvbnMuICovXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5kcmFnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogRGVmYXVsdCB0aGUgZHVyYXRpb24gb2YgVUkgcGFjayBlZmZlY3RzIChjYWxsb3V0cyBhbmQgdHJhbnNpdGlvbnMpIHRvIDEwMDBtcyBpbnN0ZWFkIG9mIHRoZSB1c3VhbCBkZWZhdWx0IGR1cmF0aW9uIG9mIDQwMG1zLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZHVyYXRpb24gPSBwYXJzZUZsb2F0KGR1cmF0aW9uT3JpZ2luYWwpIHx8ICgvXihjYWxsb3V0fHRyYW5zaXRpb24pLy50ZXN0KHByb3BlcnRpZXNNYXApID8gMTAwMCA6IERFRkFVTFRfRFVSQVRJT04pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogRm9yIGVhY2ggZWxlbWVudCwgdGFrZSB0aGUgZ3JlYXRlciBkdXJhdGlvbiBvZjogQSkgYW5pbWF0aW9uIGNvbXBsZXRpb24gcGVyY2VudGFnZSByZWxhdGl2ZSB0byB0aGUgb3JpZ2luYWwgZHVyYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQikgNzUlIG9mIHRoZSBvcmlnaW5hbCBkdXJhdGlvbiwgb3IgQykgYSAyMDBtcyBmYWxsYmFjayAoaW4gY2FzZSBkdXJhdGlvbiBpcyBhbHJlYWR5IHNldCB0byBhIGxvdyB2YWx1ZSkuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIGVuZCByZXN1bHQgaXMgYSBiYXNlbGluZSBvZiA3NSUgb2YgdGhlIHNlcXVlbmNlJ3MgZHVyYXRpb24gdGhhdCBpbmNyZWFzZXMvZGVjcmVhc2VzIGFzIHRoZSBlbmQgb2YgdGhlIGVsZW1lbnQgc2V0IGlzIGFwcHJvYWNoZWQuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kdXJhdGlvbiA9IE1hdGgubWF4KG9wdGlvbnMuZHVyYXRpb24gKiAob3B0aW9ucy5iYWNrd2FyZHMgPyAxIC0gZWxlbWVudEluZGV4L2VsZW1lbnRzTGVuZ3RoIDogKGVsZW1lbnRJbmRleCArIDEpIC8gZWxlbWVudHNMZW5ndGgpLCBvcHRpb25zLmR1cmF0aW9uICogMC43NSwgMjAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLyogUGFzcyBpbiB0aGUgY2FsbCdzIG9wdGlvbnMgb2JqZWN0IHNvIHRoYXQgdGhlIHNlcXVlbmNlIGNhbiBvcHRpb25hbGx5IGV4dGVuZCBpdC4gSXQgZGVmYXVsdHMgdG8gYW4gZW1wdHkgb2JqZWN0IGluc3RlYWQgb2YgbnVsbCB0b1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkdWNlIHRoZSBvcHRpb25zIGNoZWNraW5nIGxvZ2ljIHJlcXVpcmVkIGluc2lkZSB0aGUgc2VxdWVuY2UuICovXG4gICAgICAgICAgICAgICAgICAgICAgICBWZWxvY2l0eS5TZXF1ZW5jZXNbcHJvcGVydGllc01hcF0uY2FsbChlbGVtZW50LCBlbGVtZW50LCBvcHRpb25zIHx8IHt9LCBlbGVtZW50SW5kZXgsIGVsZW1lbnRzTGVuZ3RoLCBlbGVtZW50cywgcHJvbWlzZURhdGEucHJvbWlzZSA/IHByb21pc2VEYXRhIDogdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLyogU2luY2UgdGhlIGFuaW1hdGlvbiBsb2dpYyByZXNpZGVzIHdpdGhpbiB0aGUgc2VxdWVuY2UncyBvd24gY29kZSwgYWJvcnQgdGhlIHJlbWFpbmRlciBvZiB0aGlzIGNhbGwuXG4gICAgICAgICAgICAgICAgICAgICAgIChUaGUgcGVyZm9ybWFuY2Ugb3ZlcmhlYWQgdXAgdG8gdGhpcyBwb2ludCBpcyB2aXJ0dWFsbHkgbm9uLWV4aXN0YW50LikgKi9cbiAgICAgICAgICAgICAgICAgICAgLyogTm90ZTogVGhlIGpRdWVyeSBjYWxsIGNoYWluIGlzIGtlcHQgaW50YWN0IGJ5IHJldHVybmluZyB0aGUgY29tcGxldGUgZWxlbWVudCBzZXQuICovXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRDaGFpbigpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhYm9ydEVycm9yID0gXCJWZWxvY2l0eTogRmlyc3QgYXJndW1lbnQgKFwiICsgcHJvcGVydGllc01hcCArIFwiKSB3YXMgbm90IGEgcHJvcGVydHkgbWFwLCBhIGtub3duIGFjdGlvbiwgb3IgYSByZWdpc3RlcmVkIHNlcXVlbmNlLiBBYm9ydGluZy5cIjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvbWlzZURhdGEucHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZURhdGEucmVqZWN0ZXIobmV3IEVycm9yKGFib3J0RXJyb3IpKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFib3J0RXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldENoYWluKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgICBDYWxsLVdpZGUgVmFyaWFibGVzXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qIEEgY29udGFpbmVyIGZvciBDU1MgdW5pdCBjb252ZXJzaW9uIHJhdGlvcyAoZS5nLiAlLCByZW0sIGFuZCBlbSA9PT4gcHgpIHRoYXQgaXMgdXNlZCB0byBjYWNoZSByYXRpb3MgYWNyb3NzIGFsbCBwcm9wZXJ0aWVzXG4gICAgICAgICAgIGJlaW5nIGFuaW1hdGVkIGluIGEgc2luZ2xlIFZlbG9jaXR5IGNhbGwuIENhbGN1bGF0aW5nIHVuaXQgcmF0aW9zIG5lY2Vzc2l0YXRlcyBET00gcXVlcnlpbmcgYW5kIHVwZGF0aW5nLCBhbmQgaXMgdGhlcmVmb3JlXG4gICAgICAgICAgIGF2b2lkZWQgKHZpYSBjYWNoaW5nKSB3aGVyZXZlciBwb3NzaWJsZTsgZnVydGhlciwgcmF0aW9zIGFyZSBvbmx5IGNhbGN1bGF0ZWQgd2hlbiB0aGV5J3JlIG5lZWRlZC4gKi9cbiAgICAgICAgLyogTm90ZTogVGhpcyBjb250YWluZXIgaXMgY2FsbC13aWRlIGluc3RlYWQgb2YgcGFnZS13aWRlIHRvIGF2b2lkIHRoZSByaXNrIG9mIHVzaW5nIHN0YWxlIGNvbnZlcnNpb24gbWV0cmljcyBhY3Jvc3NcbiAgICAgICAgICAgVmVsb2NpdHkgYW5pbWF0aW9ucyB0aGF0IGFyZSBub3QgaW1tZWRpYXRlbHkgY29uc2VjdXRpdmVseSBjaGFpbmVkLiAqL1xuICAgICAgICB2YXIgdW5pdENvbnZlcnNpb25SYXRpb3MgPSB7XG4gICAgICAgICAgICAgICAgLyogUGVyZm9ybWFuY2Ugb3B0aW1pemF0aW9uIGluc2lnaHQ6IFdoZW4gdGhlIHBhcmVudCBlbGVtZW50LCBDU1MgcG9zaXRpb24gdmFsdWUsIGFuZCBmb250U2l6ZSBkbyBub3QgZGlmZmVyIGFtb25nc3QgZWxlbWVudHMsXG4gICAgICAgICAgICAgICAgICAgdGhlIGVsZW1lbnRzJyB1bml0IHJhdGlvcyBhcmUgaWRlbnRpY2FsLiAqL1xuICAgICAgICAgICAgICAgIGxhc3RQYXJlbnQ6IG51bGwsXG4gICAgICAgICAgICAgICAgbGFzdFBvc2l0aW9uOiBudWxsLFxuICAgICAgICAgICAgICAgIGxhc3RGb250U2l6ZTogbnVsbCxcbiAgICAgICAgICAgICAgICAvKiBQZXJjZW50IGlzIHRoZSBvbmx5IHVuaXQgdHlwZXMgd2hvc2UgcmF0aW8gaXMgZGVwZW5kYW50IHVwb24gYXhpcy4gKi9cbiAgICAgICAgICAgICAgICBsYXN0UGVyY2VudFRvUHhXaWR0aDogbnVsbCxcbiAgICAgICAgICAgICAgICBsYXN0UGVyY2VudFRvUHhIZWlnaHQ6IG51bGwsXG4gICAgICAgICAgICAgICAgbGFzdEVtVG9QeDogbnVsbCxcbiAgICAgICAgICAgICAgICAvKiBUaGUgcmVtPT0+cHggcmF0aW8gaXMgcmVsYXRpdmUgdG8gdGhlIGRvY3VtZW50J3MgZm9udFNpemUgLS0gbm90IGFueSBwcm9wZXJ0eSBiZWxvbmdpbmcgdG8gdGhlIGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgICAgVGh1cywgaXQgaXMgYXV0b21hdGljYWxseSBjYWxsLXdpZGUgY2FjaGVkIHdoZW5ldmVyIHRoZSByZW0gdW5pdCBpcyBiZWluZyBhbmltYXRlZC4gKi9cbiAgICAgICAgICAgICAgICByZW1Ub1B4OiBudWxsLFxuICAgICAgICAgICAgICAgIC8qIFNpbWlsYXJseSwgdmlld3BvcnQgdW5pdHMgYXJlIHJlbGF0aXZlIHRvIHRoZSB3aW5kb3cncyBjdXJyZW50IGRpbWVuc2lvbnMuICovXG4gICAgICAgICAgICAgICAgdndUb1B4OiBudWxsLFxuICAgICAgICAgICAgICAgIHZoVG9QeDogbnVsbFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAvKiBBIGNvbnRhaW5lciBmb3IgYWxsIHRoZSBlbnN1aW5nIHR3ZWVuIGRhdGEgYW5kIG1ldGFkYXRhIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNhbGwuXG4gICAgICAgICAgIFRoaXMgY29udGFpbmVyIGdldHMgcHVzaGVkIHRvIHRoZSBwYWdlLXdpZGUgVmVsb2NpdHkuU3RhdGUuY2FsbHMgYXJyYXkgdGhhdCBpcyBwcm9jZXNzZWQgZHVyaW5nIGFuaW1hdGlvbiB0aWNraW5nLiAqL1xuICAgICAgICB2YXIgY2FsbCA9IFtdO1xuXG4gICAgICAgIC8qKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgICAgRWxlbWVudCBQcm9jZXNzaW5nXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKiBFbGVtZW50IHByb2Nlc3NpbmcgY29uc2lzdHMgb2YgdGhyZWUgcGFydHMgLS0gZGF0YSBwcm9jZXNzaW5nIHRoYXQgY2Fubm90IGdvIHN0YWxlIGFuZCBkYXRhIHByb2Nlc3NpbmcgdGhhdCAqY2FuKiBnbyBzdGFsZSAoaS5lLiB0aGlyZC1wYXJ0eSBzdHlsZSBtb2RpZmljYXRpb25zKTpcbiAgICAgICAgICAgMSkgUHJlLVF1ZXVlaW5nOiBFbGVtZW50LXdpZGUgdmFyaWFibGVzLCBpbmNsdWRpbmcgdGhlIGVsZW1lbnQncyBkYXRhIHN0b3JhZ2UsIGFyZSBpbnN0YW50aWF0ZWQuIENhbGwgb3B0aW9ucyBhcmUgcHJlcGFyZWQuIElmIHRyaWdnZXJlZCwgdGhlIFN0b3AgYWN0aW9uIGlzIGV4ZWN1dGVkLlxuICAgICAgICAgICAyKSBRdWV1ZWluZzogVGhlIGxvZ2ljIHRoYXQgcnVucyBvbmNlIHRoaXMgY2FsbCBoYXMgcmVhY2hlZCBpdHMgcG9pbnQgb2YgZXhlY3V0aW9uIGluIHRoZSBlbGVtZW50J3MgJC5xdWV1ZSgpIHN0YWNrLiBNb3N0IGxvZ2ljIGlzIHBsYWNlZCBoZXJlIHRvIGF2b2lkIHJpc2tpbmcgaXQgYmVjb21pbmcgc3RhbGUuXG4gICAgICAgICAgIDMpIFB1c2hpbmc6IENvbnNvbGlkYXRpb24gb2YgdGhlIHR3ZWVuIGRhdGEgZm9sbG93ZWQgYnkgaXRzIHB1c2ggb250byB0aGUgZ2xvYmFsIGluLXByb2dyZXNzIGNhbGxzIGNvbnRhaW5lci5cbiAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBwcm9jZXNzRWxlbWVudCAoKSB7XG5cbiAgICAgICAgICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgICAgICBQYXJ0IEk6IFByZS1RdWV1ZWluZ1xuICAgICAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAgICAgICAgRWxlbWVudC1XaWRlIFZhcmlhYmxlc1xuICAgICAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXMsXG4gICAgICAgICAgICAgICAgLyogVGhlIHJ1bnRpbWUgb3B0cyBvYmplY3QgaXMgdGhlIGV4dGVuc2lvbiBvZiB0aGUgY3VycmVudCBjYWxsJ3Mgb3B0aW9ucyBhbmQgVmVsb2NpdHkncyBwYWdlLXdpZGUgb3B0aW9uIGRlZmF1bHRzLiAqL1xuICAgICAgICAgICAgICAgIG9wdHMgPSAkLmV4dGVuZCh7fSwgVmVsb2NpdHkuZGVmYXVsdHMsIG9wdGlvbnMpLFxuICAgICAgICAgICAgICAgIC8qIEEgY29udGFpbmVyIGZvciB0aGUgcHJvY2Vzc2VkIGRhdGEgYXNzb2NpYXRlZCB3aXRoIGVhY2ggcHJvcGVydHkgaW4gdGhlIHByb3BlcnR5TWFwLlxuICAgICAgICAgICAgICAgICAgIChFYWNoIHByb3BlcnR5IGluIHRoZSBtYXAgcHJvZHVjZXMgaXRzIG93biBcInR3ZWVuXCIuKSAqL1xuICAgICAgICAgICAgICAgIHR3ZWVuc0NvbnRhaW5lciA9IHt9O1xuXG4gICAgICAgICAgICAvKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgICAgICAgRGF0YSBDYWNoZVxuICAgICAgICAgICAgKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAvKiBBIHByaW1hcnkgZGVzaWduIGdvYWwgb2YgVmVsb2NpdHkgaXMgdG8gY2FjaGUgZGF0YSB3aGVyZXZlciBwb3NzaWJsZSBpbiBvcmRlciB0byBhdm9pZCBET00gcmVxdWVyeWluZy5cbiAgICAgICAgICAgICAgIEFjY29yZGluZ2x5LCBlYWNoIGVsZW1lbnQgaGFzIGEgZGF0YSBjYWNoZSBpbnN0YW50aWF0ZWQgb24gaXQuICovXG4gICAgICAgICAgICBpZiAoRGF0YShlbGVtZW50KSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgJC5kYXRhKGVsZW1lbnQsIE5BTUUsIHtcbiAgICAgICAgICAgICAgICAgICAgLyogU3RvcmUgd2hldGhlciB0aGlzIGlzIGFuIFNWRyBlbGVtZW50LCBzaW5jZSBpdHMgcHJvcGVydGllcyBhcmUgcmV0cmlldmVkIGFuZCB1cGRhdGVkIGRpZmZlcmVudGx5IHRoYW4gc3RhbmRhcmQgSFRNTCBlbGVtZW50cy4gKi9cbiAgICAgICAgICAgICAgICAgICAgaXNTVkc6IFR5cGUuaXNTVkcoZWxlbWVudCksXG4gICAgICAgICAgICAgICAgICAgIC8qIEtlZXAgdHJhY2sgb2Ygd2hldGhlciB0aGUgZWxlbWVudCBpcyBjdXJyZW50bHkgYmVpbmcgYW5pbWF0ZWQgYnkgVmVsb2NpdHkuXG4gICAgICAgICAgICAgICAgICAgICAgIFRoaXMgaXMgdXNlZCB0byBlbnN1cmUgdGhhdCBwcm9wZXJ0eSB2YWx1ZXMgYXJlIG5vdCB0cmFuc2ZlcnJlZCBiZXR3ZWVuIG5vbi1jb25zZWN1dGl2ZSAoc3RhbGUpIGNhbGxzLiAqL1xuICAgICAgICAgICAgICAgICAgICBpc0FuaW1hdGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIC8qIEEgcmVmZXJlbmNlIHRvIHRoZSBlbGVtZW50J3MgbGl2ZSBjb21wdXRlZFN0eWxlIG9iamVjdC4gTGVhcm4gbW9yZSBoZXJlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9BUEkvd2luZG93LmdldENvbXB1dGVkU3R5bGUgKi9cbiAgICAgICAgICAgICAgICAgICAgY29tcHV0ZWRTdHlsZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgLyogVHdlZW4gZGF0YSBpcyBjYWNoZWQgZm9yIGVhY2ggYW5pbWF0aW9uIG9uIHRoZSBlbGVtZW50IHNvIHRoYXQgZGF0YSBjYW4gYmUgcGFzc2VkIGFjcm9zcyBjYWxscyAtLVxuICAgICAgICAgICAgICAgICAgICAgICBpbiBwYXJ0aWN1bGFyLCBlbmQgdmFsdWVzIGFyZSB1c2VkIGFzIHN1YnNlcXVlbnQgc3RhcnQgdmFsdWVzIGluIGNvbnNlY3V0aXZlIFZlbG9jaXR5IGNhbGxzLiAqL1xuICAgICAgICAgICAgICAgICAgICB0d2VlbnNDb250YWluZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIC8qIFRoZSBmdWxsIHJvb3QgcHJvcGVydHkgdmFsdWVzIG9mIGVhY2ggQ1NTIGhvb2sgYmVpbmcgYW5pbWF0ZWQgb24gdGhpcyBlbGVtZW50IGFyZSBjYWNoZWQgc28gdGhhdDpcbiAgICAgICAgICAgICAgICAgICAgICAgMSkgQ29uY3VycmVudGx5LWFuaW1hdGluZyBob29rcyBzaGFyaW5nIHRoZSBzYW1lIHJvb3QgY2FuIGhhdmUgdGhlaXIgcm9vdCB2YWx1ZXMnIG1lcmdlZCBpbnRvIG9uZSB3aGlsZSB0d2VlbmluZy5cbiAgICAgICAgICAgICAgICAgICAgICAgMikgUG9zdC1ob29rLWluamVjdGlvbiByb290IHZhbHVlcyBjYW4gYmUgdHJhbnNmZXJyZWQgb3ZlciB0byBjb25zZWN1dGl2ZWx5IGNoYWluZWQgVmVsb2NpdHkgY2FsbHMgYXMgc3RhcnRpbmcgcm9vdCB2YWx1ZXMuICovXG4gICAgICAgICAgICAgICAgICAgIHJvb3RQcm9wZXJ0eVZhbHVlQ2FjaGU6IHt9LFxuICAgICAgICAgICAgICAgICAgICAvKiBBIGNhY2hlIGZvciB0cmFuc2Zvcm0gdXBkYXRlcywgd2hpY2ggbXVzdCBiZSBtYW51YWxseSBmbHVzaGVkIHZpYSBDU1MuZmx1c2hUcmFuc2Zvcm1DYWNoZSgpLiAqL1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1DYWNoZToge31cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqKioqKioqKioqKioqKioqKlxuICAgICAgICAgICAgICAgT3B0aW9uOiBEZWxheVxuICAgICAgICAgICAgKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAvKiBTaW5jZSBxdWV1ZTpmYWxzZSBkb2Vzbid0IHJlc3BlY3QgdGhlIGl0ZW0ncyBleGlzdGluZyBxdWV1ZSwgd2UgYXZvaWQgaW5qZWN0aW5nIGl0cyBkZWxheSBoZXJlIChpdCdzIHNldCBsYXRlciBvbikuICovXG4gICAgICAgICAgICAvKiBOb3RlOiBWZWxvY2l0eSByb2xscyBpdHMgb3duIGRlbGF5IGZ1bmN0aW9uIHNpbmNlIGpRdWVyeSBkb2Vzbid0IGhhdmUgYSB1dGlsaXR5IGFsaWFzIGZvciAkLmZuLmRlbGF5KClcbiAgICAgICAgICAgICAgIChhbmQgdGh1cyByZXF1aXJlcyBqUXVlcnkgZWxlbWVudCBjcmVhdGlvbiwgd2hpY2ggd2UgYXZvaWQgc2luY2UgaXRzIG92ZXJoZWFkIGluY2x1ZGVzIERPTSBxdWVyeWluZykuICovXG4gICAgICAgICAgICBpZiAocGFyc2VGbG9hdChvcHRzLmRlbGF5KSAmJiBvcHRzLnF1ZXVlICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICQucXVldWUoZWxlbWVudCwgb3B0cy5xdWV1ZSwgZnVuY3Rpb24obmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAvKiBUaGlzIGlzIGEgZmxhZyB1c2VkIHRvIGluZGljYXRlIHRvIHRoZSB1cGNvbWluZyBjb21wbGV0ZUNhbGwoKSBmdW5jdGlvbiB0aGF0IHRoaXMgcXVldWUgZW50cnkgd2FzIGluaXRpYXRlZCBieSBWZWxvY2l0eS4gU2VlIGNvbXBsZXRlQ2FsbCgpIGZvciBmdXJ0aGVyIGRldGFpbHMuICovXG4gICAgICAgICAgICAgICAgICAgIFZlbG9jaXR5LnZlbG9jaXR5UXVldWVFbnRyeUZsYWcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qIFRoZSBlbnN1aW5nIHF1ZXVlIGl0ZW0gKHdoaWNoIGlzIGFzc2lnbmVkIHRvIHRoZSBcIm5leHRcIiBhcmd1bWVudCB0aGF0ICQucXVldWUoKSBhdXRvbWF0aWNhbGx5IHBhc3NlcyBpbikgd2lsbCBiZSB0cmlnZ2VyZWQgYWZ0ZXIgYSBzZXRUaW1lb3V0IGRlbGF5LiBcbiAgICAgICAgICAgICAgICAgICAgICAgVGhlIHNldFRpbWVvdXQgaXMgc3RvcmVkIHNvIHRoYXQgaXQgY2FuIGJlIHN1YmplY3RlZCB0byBjbGVhclRpbWVvdXQoKSBpZiB0aGlzIGFuaW1hdGlvbiBpcyBwcmVtYXR1cmVseSBzdG9wcGVkIHZpYSBWZWxvY2l0eSdzIFwic3RvcFwiIGNvbW1hbmQuICovXG4gICAgICAgICAgICAgICAgICAgIERhdGEoZWxlbWVudCkuZGVsYXlUaW1lciA9IHsgXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0OiBzZXRUaW1lb3V0KG5leHQsIHBhcnNlRmxvYXQob3B0cy5kZWxheSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogbmV4dFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgICAgICBPcHRpb246IER1cmF0aW9uXG4gICAgICAgICAgICAqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgIC8qIEluIG1vY2sgbW9kZSwgYWxsIGFuaW1hdGlvbnMgYXJlIGZvcmNlZCB0byAxbXMgc28gdGhhdCB0aGV5IG9jY3VyIGltbWVkaWF0ZWx5IHVwb24gdGhlIG5leHQgckFGIHRpY2suICovXG4gICAgICAgICAgICBpZiAoVmVsb2NpdHkubW9jayA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIG9wdHMuZHVyYXRpb24gPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvKiBTdXBwb3J0IGZvciBqUXVlcnkncyBuYW1lZCBkdXJhdGlvbnMuICovXG4gICAgICAgICAgICAgICAgc3dpdGNoIChvcHRzLmR1cmF0aW9uLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZmFzdFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5kdXJhdGlvbiA9IDIwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJub3JtYWxcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuZHVyYXRpb24gPSBERUZBVUxUX0RVUkFUSU9OO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInNsb3dcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuZHVyYXRpb24gPSA2MDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgLyogUmVtb3ZlIHRoZSBwb3RlbnRpYWwgXCJtc1wiIHN1ZmZpeCBhbmQgZGVmYXVsdCB0byAxIGlmIHRoZSB1c2VyIGlzIGF0dGVtcHRpbmcgdG8gc2V0IGEgZHVyYXRpb24gb2YgMCAoaW4gb3JkZXIgdG8gcHJvZHVjZSBhbiBpbW1lZGlhdGUgc3R5bGUgY2hhbmdlKS4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuZHVyYXRpb24gPSBwYXJzZUZsb2F0KG9wdHMuZHVyYXRpb24pIHx8IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAgICAgICAgT3B0aW9uOiBFYXNpbmdcbiAgICAgICAgICAgICoqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgIG9wdHMuZWFzaW5nID0gZ2V0RWFzaW5nKG9wdHMuZWFzaW5nLCBvcHRzLmR1cmF0aW9uKTtcblxuICAgICAgICAgICAgLyoqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgICAgICAgIE9wdGlvbjogQ2FsbGJhY2tzXG4gICAgICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAvKiBDYWxsYmFja3MgbXVzdCBmdW5jdGlvbnMuIE90aGVyd2lzZSwgZGVmYXVsdCB0byBudWxsLiAqL1xuICAgICAgICAgICAgaWYgKG9wdHMuYmVnaW4gJiYgIVR5cGUuaXNGdW5jdGlvbihvcHRzLmJlZ2luKSkge1xuICAgICAgICAgICAgICAgIG9wdHMuYmVnaW4gPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3B0cy5wcm9ncmVzcyAmJiAhVHlwZS5pc0Z1bmN0aW9uKG9wdHMucHJvZ3Jlc3MpKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5wcm9ncmVzcyA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcHRzLmNvbXBsZXRlICYmICFUeXBlLmlzRnVuY3Rpb24ob3B0cy5jb21wbGV0ZSkpIHtcbiAgICAgICAgICAgICAgICBvcHRzLmNvbXBsZXRlID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAgICAgICAgT3B0aW9uOiBEaXNwbGF5ICYgVmlzaWJpbGl0eVxuICAgICAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAvKiBSZWZlciB0byBWZWxvY2l0eSdzIGRvY3VtZW50YXRpb24gKFZlbG9jaXR5SlMub3JnLyNkaXNwbGF5QW5kVmlzaWJpbGl0eSkgZm9yIGEgZGVzY3JpcHRpb24gb2YgdGhlIGRpc3BsYXkgYW5kIHZpc2liaWxpdHkgb3B0aW9ucycgYmVoYXZpb3IuICovXG4gICAgICAgICAgICBpZiAob3B0cy5kaXNwbGF5KSB7XG4gICAgICAgICAgICAgICAgb3B0cy5kaXNwbGF5ID0gb3B0cy5kaXNwbGF5LnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgICAgIC8qIFVzZXJzIGNhbiBwYXNzIGluIGEgc3BlY2lhbCBcImF1dG9cIiB2YWx1ZSB0byBpbnN0cnVjdCBWZWxvY2l0eSB0byBzZXQgdGhlIGVsZW1lbnQgdG8gaXRzIGRlZmF1bHQgZGlzcGxheSB2YWx1ZS4gKi9cbiAgICAgICAgICAgICAgICBpZiAob3B0cy5kaXNwbGF5ID09PSBcImF1dG9cIikge1xuICAgICAgICAgICAgICAgICAgICBvcHRzLmRpc3BsYXkgPSBWZWxvY2l0eS5DU1MuVmFsdWVzLmdldERpc3BsYXlUeXBlKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdHMudmlzaWJpbGl0eSkge1xuICAgICAgICAgICAgICAgIG9wdHMudmlzaWJpbGl0eSA9IG9wdHMudmlzaWJpbGl0eS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgICAgICBPcHRpb246IG1vYmlsZUhBXG4gICAgICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAvKiBXaGVuIHNldCB0byB0cnVlLCBhbmQgaWYgdGhpcyBpcyBhIG1vYmlsZSBkZXZpY2UsIG1vYmlsZUhBIGF1dG9tYXRpY2FsbHkgZW5hYmxlcyBoYXJkd2FyZSBhY2NlbGVyYXRpb24gKHZpYSBhIG51bGwgdHJhbnNmb3JtIGhhY2spXG4gICAgICAgICAgICAgICBvbiBhbmltYXRpbmcgZWxlbWVudHMuIEhBIGlzIHJlbW92ZWQgZnJvbSB0aGUgZWxlbWVudCBhdCB0aGUgY29tcGxldGlvbiBvZiBpdHMgYW5pbWF0aW9uLiAqL1xuICAgICAgICAgICAgLyogTm90ZTogQW5kcm9pZCBHaW5nZXJicmVhZCBkb2Vzbid0IHN1cHBvcnQgSEEuIElmIGEgbnVsbCB0cmFuc2Zvcm0gaGFjayAobW9iaWxlSEEpIGlzIGluIGZhY3Qgc2V0LCBpdCB3aWxsIHByZXZlbnQgb3RoZXIgdHJhbmZvcm0gc3VicHJvcGVydGllcyBmcm9tIHRha2luZyBlZmZlY3QuICovXG4gICAgICAgICAgICAvKiBOb3RlOiBZb3UgY2FuIHJlYWQgbW9yZSBhYm91dCB0aGUgdXNlIG9mIG1vYmlsZUhBIGluIFZlbG9jaXR5J3MgZG9jdW1lbnRhdGlvbjogVmVsb2NpdHlKUy5vcmcvI21vYmlsZUhBLiAqL1xuICAgICAgICAgICAgb3B0cy5tb2JpbGVIQSA9IChvcHRzLm1vYmlsZUhBICYmIFZlbG9jaXR5LlN0YXRlLmlzTW9iaWxlICYmICFWZWxvY2l0eS5TdGF0ZS5pc0dpbmdlcmJyZWFkKTtcblxuICAgICAgICAgICAgLyoqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgICAgICBQYXJ0IElJOiBRdWV1ZWluZ1xuICAgICAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgIC8qIFdoZW4gYSBzZXQgb2YgZWxlbWVudHMgaXMgdGFyZ2V0ZWQgYnkgYSBWZWxvY2l0eSBjYWxsLCB0aGUgc2V0IGlzIGJyb2tlbiB1cCBhbmQgZWFjaCBlbGVtZW50IGhhcyB0aGUgY3VycmVudCBWZWxvY2l0eSBjYWxsIGluZGl2aWR1YWxseSBxdWV1ZWQgb250byBpdC5cbiAgICAgICAgICAgICAgIEluIHRoaXMgd2F5LCBlYWNoIGVsZW1lbnQncyBleGlzdGluZyBxdWV1ZSBpcyByZXNwZWN0ZWQ7IHNvbWUgZWxlbWVudHMgbWF5IGFscmVhZHkgYmUgYW5pbWF0aW5nIGFuZCBhY2NvcmRpbmdseSBzaG91bGQgbm90IGhhdmUgdGhpcyBjdXJyZW50IFZlbG9jaXR5IGNhbGwgdHJpZ2dlcmVkIGltbWVkaWF0ZWx5LiAqL1xuICAgICAgICAgICAgLyogSW4gZWFjaCBxdWV1ZSwgdHdlZW4gZGF0YSBpcyBwcm9jZXNzZWQgZm9yIGVhY2ggYW5pbWF0aW5nIHByb3BlcnR5IHRoZW4gcHVzaGVkIG9udG8gdGhlIGNhbGwtd2lkZSBjYWxscyBhcnJheS4gV2hlbiB0aGUgbGFzdCBlbGVtZW50IGluIHRoZSBzZXQgaGFzIGhhZCBpdHMgdHdlZW5zIHByb2Nlc3NlZCxcbiAgICAgICAgICAgICAgIHRoZSBjYWxsIGFycmF5IGlzIHB1c2hlZCB0byBWZWxvY2l0eS5TdGF0ZS5jYWxscyBmb3IgbGl2ZSBwcm9jZXNzaW5nIGJ5IHRoZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgdGljay4gKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIGJ1aWxkUXVldWUgKG5leHQpIHtcblxuICAgICAgICAgICAgICAgIC8qKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgICAgICAgICAgT3B0aW9uOiBCZWdpblxuICAgICAgICAgICAgICAgICoqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgICAgICAvKiBUaGUgYmVnaW4gY2FsbGJhY2sgaXMgZmlyZWQgb25jZSBwZXIgY2FsbCAtLSBub3Qgb25jZSBwZXIgZWxlbWVuZXQgLS0gYW5kIGlzIHBhc3NlZCB0aGUgZnVsbCByYXcgRE9NIGVsZW1lbnQgc2V0IGFzIGJvdGggaXRzIGNvbnRleHQgYW5kIGl0cyBmaXJzdCBhcmd1bWVudC4gKi9cbiAgICAgICAgICAgICAgICBpZiAob3B0cy5iZWdpbiAmJiBlbGVtZW50c0luZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qIFdlIHRocm93IGNhbGxiYWNrcyBpbiBhIHNldFRpbWVvdXQgc28gdGhhdCB0aHJvd24gZXJyb3JzIGRvbid0IGhhbHQgdGhlIGV4ZWN1dGlvbiBvZiBWZWxvY2l0eSBpdHNlbGYuICovXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmJlZ2luLmNhbGwoZWxlbWVudHMsIGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgICAgICAgICAgICBUd2VlbiBEYXRhIENvbnN0cnVjdGlvbiAoZm9yIFNjcm9sbClcbiAgICAgICAgICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgICAgIC8qIE5vdGU6IEluIG9yZGVyIHRvIGJlIHN1YmplY3RlZCB0byBjaGFpbmluZyBhbmQgYW5pbWF0aW9uIG9wdGlvbnMsIHNjcm9sbCdzIHR3ZWVuaW5nIGlzIHJvdXRlZCB0aHJvdWdoIFZlbG9jaXR5IGFzIGlmIGl0IHdlcmUgYSBzdGFuZGFyZCBDU1MgcHJvcGVydHkgYW5pbWF0aW9uLiAqL1xuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT09IFwic2Nyb2xsXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLyogVGhlIHNjcm9sbCBhY3Rpb24gdW5pcXVlbHkgdGFrZXMgYW4gb3B0aW9uYWwgXCJvZmZzZXRcIiBvcHRpb24gLS0gc3BlY2lmaWVkIGluIHBpeGVscyAtLSB0aGF0IG9mZnNldHMgdGhlIHRhcmdldGVkIHNjcm9sbCBwb3NpdGlvbi4gKi9cbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbERpcmVjdGlvbiA9ICgvXngkL2kudGVzdChvcHRzLmF4aXMpID8gXCJMZWZ0XCIgOiBcIlRvcFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbE9mZnNldCA9IHBhcnNlRmxvYXQob3B0cy5vZmZzZXQpIHx8IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxQb3NpdGlvbkN1cnJlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxQb3NpdGlvbkN1cnJlbnRBbHRlcm5hdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxQb3NpdGlvbkVuZDtcblxuICAgICAgICAgICAgICAgICAgICAvKiBTY3JvbGwgYWxzbyB1bmlxdWVseSB0YWtlcyBhbiBvcHRpb25hbCBcImNvbnRhaW5lclwiIG9wdGlvbiwgd2hpY2ggaW5kaWNhdGVzIHRoZSBwYXJlbnQgZWxlbWVudCB0aGF0IHNob3VsZCBiZSBzY3JvbGxlZCAtLVxuICAgICAgICAgICAgICAgICAgICAgICBhcyBvcHBvc2VkIHRvIHRoZSBicm93c2VyIHdpbmRvdyBpdHNlbGYuIFRoaXMgaXMgdXNlZnVsIGZvciBzY3JvbGxpbmcgdG93YXJkIGFuIGVsZW1lbnQgdGhhdCdzIGluc2lkZSBhbiBvdmVyZmxvd2luZyBwYXJlbnQgZWxlbWVudC4gKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuY29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBFbnN1cmUgdGhhdCBlaXRoZXIgYSBqUXVlcnkgb2JqZWN0IG9yIGEgcmF3IERPTSBlbGVtZW50IHdhcyBwYXNzZWQgaW4uICovXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5jb250YWluZXIuanF1ZXJ5IHx8IFR5cGUuaXNOb2RlKG9wdHMuY29udGFpbmVyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIEV4dHJhY3QgdGhlIHJhdyBET00gZWxlbWVudCBmcm9tIHRoZSBqUXVlcnkgd3JhcHBlci4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmNvbnRhaW5lciA9IG9wdHMuY29udGFpbmVyWzBdIHx8IG9wdHMuY29udGFpbmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIE5vdGU6IFVubGlrZSBvdGhlciBwcm9wZXJ0aWVzIGluIFZlbG9jaXR5LCB0aGUgYnJvd3NlcidzIHNjcm9sbCBwb3NpdGlvbiBpcyBuZXZlciBjYWNoZWQgc2luY2UgaXQgc28gZnJlcXVlbnRseSBjaGFuZ2VzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGR1ZSB0byB0aGUgdXNlcidzIG5hdHVyYWwgaW50ZXJhY3Rpb24gd2l0aCB0aGUgcGFnZSkuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsUG9zaXRpb25DdXJyZW50ID0gb3B0cy5jb250YWluZXJbXCJzY3JvbGxcIiArIHNjcm9sbERpcmVjdGlvbl07IC8qIEdFVCAqL1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogJC5wb3NpdGlvbigpIHZhbHVlcyBhcmUgcmVsYXRpdmUgdG8gdGhlIGNvbnRhaW5lcidzIGN1cnJlbnRseSB2aWV3YWJsZSBhcmVhICh3aXRob3V0IHRha2luZyBpbnRvIGFjY291bnQgdGhlIGNvbnRhaW5lcidzIHRydWUgZGltZW5zaW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tIHNheSwgZm9yIGV4YW1wbGUsIGlmIHRoZSBjb250YWluZXIgd2FzIG5vdCBvdmVyZmxvd2luZykuIFRodXMsIHRoZSBzY3JvbGwgZW5kIHZhbHVlIGlzIHRoZSBzdW0gb2YgdGhlIGNoaWxkIGVsZW1lbnQncyBwb3NpdGlvbiAqYW5kKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBzY3JvbGwgY29udGFpbmVyJ3MgY3VycmVudCBzY3JvbGwgcG9zaXRpb24uICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogTm90ZTogalF1ZXJ5IGRvZXMgbm90IG9mZmVyIGEgdXRpbGl0eSBhbGlhcyBmb3IgJC5wb3NpdGlvbigpLCBzbyB3ZSBoYXZlIHRvIGluY3VyIGpRdWVyeSBvYmplY3QgY29udmVyc2lvbiBoZXJlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoaXMgc3luY3MgdXAgd2l0aCBhbiBlbnN1aW5nIGJhdGNoIG9mIEdFVHMsIHNvIGl0IGZvcnR1bmF0ZWx5IGRvZXMgbm90IHRyaWdnZXIgbGF5b3V0IHRocmFzaGluZy4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxQb3NpdGlvbkVuZCA9IChzY3JvbGxQb3NpdGlvbkN1cnJlbnQgKyAkKGVsZW1lbnQpLnBvc2l0aW9uKClbc2Nyb2xsRGlyZWN0aW9uLnRvTG93ZXJDYXNlKCldKSArIHNjcm9sbE9mZnNldDsgLyogR0VUICovXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBJZiBhIHZhbHVlIG90aGVyIHRoYW4gYSBqUXVlcnkgb2JqZWN0IG9yIGEgcmF3IERPTSBlbGVtZW50IHdhcyBwYXNzZWQgaW4sIGRlZmF1bHQgdG8gbnVsbCBzbyB0aGF0IHRoaXMgb3B0aW9uIGlzIGlnbm9yZWQuICovXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuY29udGFpbmVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIElmIHRoZSB3aW5kb3cgaXRzZWxmIGlzIGJlaW5nIHNjcm9sbGVkIC0tIG5vdCBhIGNvbnRhaW5pbmcgZWxlbWVudCAtLSBwZXJmb3JtIGEgbGl2ZSBzY3JvbGwgcG9zaXRpb24gbG9va3VwIHVzaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgYXBwcm9wcmlhdGUgY2FjaGVkIHByb3BlcnR5IG5hbWVzICh3aGljaCBkaWZmZXIgYmFzZWQgb24gYnJvd3NlciB0eXBlKS4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFBvc2l0aW9uQ3VycmVudCA9IFZlbG9jaXR5LlN0YXRlLnNjcm9sbEFuY2hvcltWZWxvY2l0eS5TdGF0ZVtcInNjcm9sbFByb3BlcnR5XCIgKyBzY3JvbGxEaXJlY3Rpb25dXTsgLyogR0VUICovXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBXaGVuIHNjcm9sbGluZyB0aGUgYnJvd3NlciB3aW5kb3csIGNhY2hlIHRoZSBhbHRlcm5hdGUgYXhpcydzIGN1cnJlbnQgdmFsdWUgc2luY2Ugd2luZG93LnNjcm9sbFRvKCkgZG9lc24ndCBsZXQgdXMgY2hhbmdlIG9ubHkgb25lIHZhbHVlIGF0IGEgdGltZS4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFBvc2l0aW9uQ3VycmVudEFsdGVybmF0ZSA9IFZlbG9jaXR5LlN0YXRlLnNjcm9sbEFuY2hvcltWZWxvY2l0eS5TdGF0ZVtcInNjcm9sbFByb3BlcnR5XCIgKyAoc2Nyb2xsRGlyZWN0aW9uID09PSBcIkxlZnRcIiA/IFwiVG9wXCIgOiBcIkxlZnRcIildXTsgLyogR0VUICovXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIFVubGlrZSAkLnBvc2l0aW9uKCksICQub2Zmc2V0KCkgdmFsdWVzIGFyZSByZWxhdGl2ZSB0byB0aGUgYnJvd3NlciB3aW5kb3cncyB0cnVlIGRpbWVuc2lvbnMgLS0gbm90IG1lcmVseSBpdHMgY3VycmVudGx5IHZpZXdhYmxlIGFyZWEgLS1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCB0aGVyZWZvcmUgZW5kIHZhbHVlcyBkbyBub3QgbmVlZCB0byBiZSBjb21wb3VuZGVkIG9udG8gY3VycmVudCB2YWx1ZXMuICovXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxQb3NpdGlvbkVuZCA9ICQoZWxlbWVudCkub2Zmc2V0KClbc2Nyb2xsRGlyZWN0aW9uLnRvTG93ZXJDYXNlKCldICsgc2Nyb2xsT2Zmc2V0OyAvKiBHRVQgKi9cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8qIFNpbmNlIHRoZXJlJ3Mgb25seSBvbmUgZm9ybWF0IHRoYXQgc2Nyb2xsJ3MgYXNzb2NpYXRlZCB0d2VlbnNDb250YWluZXIgY2FuIHRha2UsIHdlIGNyZWF0ZSBpdCBtYW51YWxseS4gKi9cbiAgICAgICAgICAgICAgICAgICAgdHdlZW5zQ29udGFpbmVyID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9vdFByb3BlcnR5VmFsdWU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0VmFsdWU6IHNjcm9sbFBvc2l0aW9uQ3VycmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsdWU6IHNjcm9sbFBvc2l0aW9uQ3VycmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRWYWx1ZTogc2Nyb2xsUG9zaXRpb25FbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pdFR5cGU6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWFzaW5nOiBvcHRzLmVhc2luZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxEYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lcjogb3B0cy5jb250YWluZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogc2Nyb2xsRGlyZWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHRlcm5hdGVWYWx1ZTogc2Nyb2xsUG9zaXRpb25DdXJyZW50QWx0ZXJuYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoVmVsb2NpdHkuZGVidWcpIGNvbnNvbGUubG9nKFwidHdlZW5zQ29udGFpbmVyIChzY3JvbGwpOiBcIiwgdHdlZW5zQ29udGFpbmVyLnNjcm9sbCwgZWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgICAgICAgICAgVHdlZW4gRGF0YSBDb25zdHJ1Y3Rpb24gKGZvciBSZXZlcnNlKVxuICAgICAgICAgICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgICAgIC8qIFJldmVyc2UgYWN0cyBsaWtlIGEgXCJzdGFydFwiIGFjdGlvbiBpbiB0aGF0IGEgcHJvcGVydHkgbWFwIGlzIGFuaW1hdGVkIHRvd2FyZC4gVGhlIG9ubHkgZGlmZmVyZW5jZSBpc1xuICAgICAgICAgICAgICAgICAgIHRoYXQgdGhlIHByb3BlcnR5IG1hcCB1c2VkIGZvciByZXZlcnNlIGlzIHRoZSBpbnZlcnNlIG9mIHRoZSBtYXAgdXNlZCBpbiB0aGUgcHJldmlvdXMgY2FsbC4gVGh1cywgd2UgbWFuaXB1bGF0ZVxuICAgICAgICAgICAgICAgICAgIHRoZSBwcmV2aW91cyBjYWxsIHRvIGNvbnN0cnVjdCBvdXIgbmV3IG1hcDogdXNlIHRoZSBwcmV2aW91cyBtYXAncyBlbmQgdmFsdWVzIGFzIG91ciBuZXcgbWFwJ3Mgc3RhcnQgdmFsdWVzLiBDb3B5IG92ZXIgYWxsIG90aGVyIGRhdGEuICovXG4gICAgICAgICAgICAgICAgLyogTm90ZTogUmV2ZXJzZSBjYW4gYmUgZGlyZWN0bHkgY2FsbGVkIHZpYSB0aGUgXCJyZXZlcnNlXCIgcGFyYW1ldGVyLCBvciBpdCBjYW4gYmUgaW5kaXJlY3RseSB0cmlnZ2VyZWQgdmlhIHRoZSBsb29wIG9wdGlvbi4gKExvb3BzIGFyZSBjb21wb3NlZCBvZiBtdWx0aXBsZSByZXZlcnNlcy4pICovXG4gICAgICAgICAgICAgICAgLyogTm90ZTogUmV2ZXJzZSBjYWxscyBkbyBub3QgbmVlZCB0byBiZSBjb25zZWN1dGl2ZWx5IGNoYWluZWQgb250byBhIGN1cnJlbnRseS1hbmltYXRpbmcgZWxlbWVudCBpbiBvcmRlciB0byBvcGVyYXRlIG9uIGNhY2hlZCB2YWx1ZXM7XG4gICAgICAgICAgICAgICAgICAgdGhlcmUgaXMgbm8gaGFybSB0byByZXZlcnNlIGJlaW5nIGNhbGxlZCBvbiBhIHBvdGVudGlhbGx5IHN0YWxlIGRhdGEgY2FjaGUgc2luY2UgcmV2ZXJzZSdzIGJlaGF2aW9yIGlzIHNpbXBseSBkZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgYXMgcmV2ZXJ0aW5nIHRvIHRoZSBlbGVtZW50J3MgdmFsdWVzIGFzIHRoZXkgd2VyZSBwcmlvciB0byB0aGUgcHJldmlvdXMgKlZlbG9jaXR5KiBjYWxsLiAqL1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSBcInJldmVyc2VcIikge1xuICAgICAgICAgICAgICAgICAgICAvKiBBYm9ydCBpZiB0aGVyZSBpcyBubyBwcmlvciBhbmltYXRpb24gZGF0YSB0byByZXZlcnNlIHRvLiAqL1xuICAgICAgICAgICAgICAgICAgICBpZiAoIURhdGEoZWxlbWVudCkudHdlZW5zQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBEZXF1ZXVlIHRoZSBlbGVtZW50IHNvIHRoYXQgdGhpcyBxdWV1ZSBlbnRyeSByZWxlYXNlcyBpdHNlbGYgaW1tZWRpYXRlbHksIGFsbG93aW5nIHN1YnNlcXVlbnQgcXVldWUgZW50cmllcyB0byBydW4uICovXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmRlcXVldWUoZWxlbWVudCwgb3B0cy5xdWV1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIE9wdGlvbnMgUGFyc2luZ1xuICAgICAgICAgICAgICAgICAgICAgICAgKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBJZiB0aGUgZWxlbWVudCB3YXMgaGlkZGVuIHZpYSB0aGUgZGlzcGxheSBvcHRpb24gaW4gdGhlIHByZXZpb3VzIGNhbGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZXZlcnQgZGlzcGxheSB0byBibG9jayBwcmlvciB0byByZXZlcnNhbCBzbyB0aGF0IHRoZSBlbGVtZW50IGlzIHZpc2libGUgYWdhaW4uICovXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoRGF0YShlbGVtZW50KS5vcHRzLmRpc3BsYXkgPT09IFwibm9uZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRGF0YShlbGVtZW50KS5vcHRzLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChEYXRhKGVsZW1lbnQpLm9wdHMudmlzaWJpbGl0eSA9PT0gXCJoaWRkZW5cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGEoZWxlbWVudCkub3B0cy52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIElmIHRoZSBsb29wIG9wdGlvbiB3YXMgc2V0IGluIHRoZSBwcmV2aW91cyBjYWxsLCBkaXNhYmxlIGl0IHNvIHRoYXQgXCJyZXZlcnNlXCIgY2FsbHMgYXJlbid0IHJlY3Vyc2l2ZWx5IGdlbmVyYXRlZC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIEZ1cnRoZXIsIHJlbW92ZSB0aGUgcHJldmlvdXMgY2FsbCdzIGNhbGxiYWNrIG9wdGlvbnM7IHR5cGljYWxseSwgdXNlcnMgZG8gbm90IHdhbnQgdGhlc2UgdG8gYmUgcmVmaXJlZC4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIERhdGEoZWxlbWVudCkub3B0cy5sb29wID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBEYXRhKGVsZW1lbnQpLm9wdHMuYmVnaW4gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgRGF0YShlbGVtZW50KS5vcHRzLmNvbXBsZXRlID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLyogU2luY2Ugd2UncmUgZXh0ZW5kaW5nIGFuIG9wdHMgb2JqZWN0IHRoYXQgaGFzIGFscmVhZHkgYmVlbiBleHRlbmRlZCB3aXRoIHRoZSBkZWZhdWx0cyBvcHRpb25zIG9iamVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlIHJlbW92ZSBub24tZXhwbGljaXRseS1kZWZpbmVkIHByb3BlcnRpZXMgdGhhdCBhcmUgYXV0by1hc3NpZ25lZCB2YWx1ZXMuICovXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMuZWFzaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9wdHMuZWFzaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMuZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgb3B0cy5kdXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLyogVGhlIG9wdHMgb2JqZWN0IHVzZWQgZm9yIHJldmVyc2FsIGlzIGFuIGV4dGVuc2lvbiBvZiB0aGUgb3B0aW9ucyBvYmplY3Qgb3B0aW9uYWxseSBwYXNzZWQgaW50byB0aGlzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZXZlcnNlIGNhbGwgcGx1cyB0aGUgb3B0aW9ucyB1c2VkIGluIHRoZSBwcmV2aW91cyBWZWxvY2l0eSBjYWxsLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0cyA9ICQuZXh0ZW5kKHt9LCBEYXRhKGVsZW1lbnQpLm9wdHMsIG9wdHMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgVHdlZW5zIENvbnRhaW5lciBSZWNvbnN0cnVjdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgICAgICAgICAgICAgLyogQ3JlYXRlIGEgZGVlcHkgY29weSAoaW5kaWNhdGVkIHZpYSB0aGUgdHJ1ZSBmbGFnKSBvZiB0aGUgcHJldmlvdXMgY2FsbCdzIHR3ZWVuc0NvbnRhaW5lci4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsYXN0VHdlZW5zQ29udGFpbmVyID0gJC5leHRlbmQodHJ1ZSwge30sIERhdGEoZWxlbWVudCkudHdlZW5zQ29udGFpbmVyKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLyogTWFuaXB1bGF0ZSB0aGUgcHJldmlvdXMgdHdlZW5zQ29udGFpbmVyIGJ5IHJlcGxhY2luZyBpdHMgZW5kIHZhbHVlcyBhbmQgY3VycmVudFZhbHVlcyB3aXRoIGl0cyBzdGFydCB2YWx1ZXMuICovXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBsYXN0VHdlZW4gaW4gbGFzdFR3ZWVuc0NvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIEluIGFkZGl0aW9uIHRvIHR3ZWVuIGRhdGEsIHR3ZWVuc0NvbnRhaW5lcnMgY29udGFpbiBhbiBlbGVtZW50IHByb3BlcnR5IHRoYXQgd2UgaWdub3JlIGhlcmUuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RUd2VlbiAhPT0gXCJlbGVtZW50XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhc3RTdGFydFZhbHVlID0gbGFzdFR3ZWVuc0NvbnRhaW5lcltsYXN0VHdlZW5dLnN0YXJ0VmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFR3ZWVuc0NvbnRhaW5lcltsYXN0VHdlZW5dLnN0YXJ0VmFsdWUgPSBsYXN0VHdlZW5zQ29udGFpbmVyW2xhc3RUd2Vlbl0uY3VycmVudFZhbHVlID0gbGFzdFR3ZWVuc0NvbnRhaW5lcltsYXN0VHdlZW5dLmVuZFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0VHdlZW5zQ29udGFpbmVyW2xhc3RUd2Vlbl0uZW5kVmFsdWUgPSBsYXN0U3RhcnRWYWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBFYXNpbmcgaXMgdGhlIG9ubHkgb3B0aW9uIHRoYXQgZW1iZWRzIGludG8gdGhlIGluZGl2aWR1YWwgdHdlZW4gZGF0YSAoc2luY2UgaXQgY2FuIGJlIGRlZmluZWQgb24gYSBwZXItcHJvcGVydHkgYmFzaXMpLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBY2NvcmRpbmdseSwgZXZlcnkgcHJvcGVydHkncyBlYXNpbmcgdmFsdWUgbXVzdCBiZSB1cGRhdGVkIHdoZW4gYW4gb3B0aW9ucyBvYmplY3QgaXMgcGFzc2VkIGluIHdpdGggYSByZXZlcnNlIGNhbGwuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBzaWRlIGVmZmVjdCBvZiB0aGlzIGV4dGVuc2liaWxpdHkgaXMgdGhhdCBhbGwgcGVyLXByb3BlcnR5IGVhc2luZyB2YWx1ZXMgYXJlIGZvcmNlZnVsbHkgcmVzZXQgdG8gdGhlIG5ldyB2YWx1ZS4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEkLmlzRW1wdHlPYmplY3Qob3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RUd2VlbnNDb250YWluZXJbbGFzdFR3ZWVuXS5lYXNpbmcgPSBvcHRzLmVhc2luZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChWZWxvY2l0eS5kZWJ1ZykgY29uc29sZS5sb2coXCJyZXZlcnNlIHR3ZWVuc0NvbnRhaW5lciAoXCIgKyBsYXN0VHdlZW4gKyBcIik6IFwiICsgSlNPTi5zdHJpbmdpZnkobGFzdFR3ZWVuc0NvbnRhaW5lcltsYXN0VHdlZW5dKSwgZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0d2VlbnNDb250YWluZXIgPSBsYXN0VHdlZW5zQ29udGFpbmVyO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgICAgICAgICAgICBUd2VlbiBEYXRhIENvbnN0cnVjdGlvbiAoZm9yIFN0YXJ0KVxuICAgICAgICAgICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09IFwic3RhcnRcIikge1xuXG4gICAgICAgICAgICAgICAgICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgICAgICAgICAgICAgICBWYWx1ZSBUcmFuc2ZlcnJpbmdcbiAgICAgICAgICAgICAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgICAgICAgICAvKiBJZiB0aGlzIHF1ZXVlIGVudHJ5IGZvbGxvd3MgYSBwcmV2aW91cyBWZWxvY2l0eS1pbml0aWF0ZWQgcXVldWUgZW50cnkgKmFuZCogaWYgdGhpcyBlbnRyeSB3YXMgY3JlYXRlZFxuICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSB0aGUgZWxlbWVudCB3YXMgaW4gdGhlIHByb2Nlc3Mgb2YgYmVpbmcgYW5pbWF0ZWQgYnkgVmVsb2NpdHksIHRoZW4gdGhpcyBjdXJyZW50IGNhbGwgaXMgc2FmZSB0byB1c2VcbiAgICAgICAgICAgICAgICAgICAgICAgdGhlIGVuZCB2YWx1ZXMgZnJvbSB0aGUgcHJpb3IgY2FsbCBhcyBpdHMgc3RhcnQgdmFsdWVzLiBWZWxvY2l0eSBhdHRlbXB0cyB0byBwZXJmb3JtIHRoaXMgdmFsdWUgdHJhbnNmZXJcbiAgICAgICAgICAgICAgICAgICAgICAgcHJvY2VzcyB3aGVuZXZlciBwb3NzaWJsZSBpbiBvcmRlciB0byBhdm9pZCByZXF1ZXJ5aW5nIHRoZSBET00uICovXG4gICAgICAgICAgICAgICAgICAgIC8qIElmIHZhbHVlcyBhcmVuJ3QgdHJhbnNmZXJyZWQgZnJvbSBhIHByaW9yIGNhbGwgYW5kIHN0YXJ0IHZhbHVlcyB3ZXJlIG5vdCBmb3JjZWZlZCBieSB0aGUgdXNlciAobW9yZSBvbiB0aGlzIGJlbG93KSxcbiAgICAgICAgICAgICAgICAgICAgICAgdGhlbiB0aGUgRE9NIGlzIHF1ZXJpZWQgZm9yIHRoZSBlbGVtZW50J3MgY3VycmVudCB2YWx1ZXMgYXMgYSBsYXN0IHJlc29ydC4gKi9cbiAgICAgICAgICAgICAgICAgICAgLyogTm90ZTogQ29udmVyc2VseSwgYW5pbWF0aW9uIHJldmVyc2FsIChhbmQgbG9vcGluZykgKmFsd2F5cyogcGVyZm9ybSBpbnRlci1jYWxsIHZhbHVlIHRyYW5zZmVyczsgdGhleSBuZXZlciByZXF1ZXJ5IHRoZSBET00uICovXG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXN0VHdlZW5zQ29udGFpbmVyO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qIFRoZSBwZXItZWxlbWVudCBpc0FuaW1hdGluZyBmbGFnIGlzIHVzZWQgdG8gaW5kaWNhdGUgd2hldGhlciBpdCdzIHNhZmUgKGkuZS4gdGhlIGRhdGEgaXNuJ3Qgc3RhbGUpXG4gICAgICAgICAgICAgICAgICAgICAgIHRvIHRyYW5zZmVyIG92ZXIgZW5kIHZhbHVlcyB0byB1c2UgYXMgc3RhcnQgdmFsdWVzLiBJZiBpdCdzIHNldCB0byB0cnVlIGFuZCB0aGVyZSBpcyBhIHByZXZpb3VzXG4gICAgICAgICAgICAgICAgICAgICAgIFZlbG9jaXR5IGNhbGwgdG8gcHVsbCB2YWx1ZXMgZnJvbSwgZG8gc28uICovXG4gICAgICAgICAgICAgICAgICAgIGlmIChEYXRhKGVsZW1lbnQpLnR3ZWVuc0NvbnRhaW5lciAmJiBEYXRhKGVsZW1lbnQpLmlzQW5pbWF0aW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0VHdlZW5zQ29udGFpbmVyID0gRGF0YShlbGVtZW50KS50d2VlbnNDb250YWluZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgICAgICAgICAgICAgIFR3ZWVuIERhdGEgQ2FsY3VsYXRpb25cbiAgICAgICAgICAgICAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAgICAgICAgIC8qIFRoaXMgZnVuY3Rpb24gcGFyc2VzIHByb3BlcnR5IGRhdGEgYW5kIGRlZmF1bHRzIGVuZFZhbHVlLCBlYXNpbmcsIGFuZCBzdGFydFZhbHVlIGFzIGFwcHJvcHJpYXRlLiAqL1xuICAgICAgICAgICAgICAgICAgICAvKiBQcm9wZXJ0eSBtYXAgdmFsdWVzIGNhbiBlaXRoZXIgdGFrZSB0aGUgZm9ybSBvZiAxKSBhIHNpbmdsZSB2YWx1ZSByZXByZXNlbnRpbmcgdGhlIGVuZCB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgb3IgMikgYW4gYXJyYXkgaW4gdGhlIGZvcm0gb2YgWyBlbmRWYWx1ZSwgWywgZWFzaW5nXSBbLCBzdGFydFZhbHVlXSBdLlxuICAgICAgICAgICAgICAgICAgICAgICBUaGUgb3B0aW9uYWwgdGhpcmQgcGFyYW1ldGVyIGlzIGEgZm9yY2VmZWQgc3RhcnRWYWx1ZSB0byBiZSB1c2VkIGluc3RlYWQgb2YgcXVlcnlpbmcgdGhlIERPTSBmb3JcbiAgICAgICAgICAgICAgICAgICAgICAgdGhlIGVsZW1lbnQncyBjdXJyZW50IHZhbHVlLiBSZWFkIFZlbG9jaXR5J3MgZG9jbWVudGF0aW9uIHRvIGxlYXJuIG1vcmUgYWJvdXQgZm9yY2VmZWVkaW5nOiBWZWxvY2l0eUpTLm9yZy8jZm9yY2VmZWVkaW5nICovXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHBhcnNlUHJvcGVydHlWYWx1ZSAodmFsdWVEYXRhLCBza2lwUmVzb2x2aW5nRWFzaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZW5kVmFsdWUgPSB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWFzaW5nID0gdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0VmFsdWUgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIEhhbmRsZSB0aGUgYXJyYXkgZm9ybWF0LCB3aGljaCBjYW4gYmUgc3RydWN0dXJlZCBhcyBvbmUgb2YgdGhyZWUgcG90ZW50aWFsIG92ZXJsb2FkczpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIEEpIFsgZW5kVmFsdWUsIGVhc2luZywgc3RhcnRWYWx1ZSBdLCBCKSBbIGVuZFZhbHVlLCBlYXNpbmcgXSwgb3IgQykgWyBlbmRWYWx1ZSwgc3RhcnRWYWx1ZSBdICovXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoVHlwZS5pc0FycmF5KHZhbHVlRGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBlbmRWYWx1ZSBpcyBhbHdheXMgdGhlIGZpcnN0IGl0ZW0gaW4gdGhlIGFycmF5LiBEb24ndCBib3RoZXIgdmFsaWRhdGluZyBlbmRWYWx1ZSdzIHZhbHVlIG5vd1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpbmNlIHRoZSBlbnN1aW5nIHByb3BlcnR5IGN5Y2xpbmcgbG9naWMgZG9lcyB0aGF0LiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZFZhbHVlID0gdmFsdWVEYXRhWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogVHdvLWl0ZW0gYXJyYXkgZm9ybWF0OiBJZiB0aGUgc2Vjb25kIGl0ZW0gaXMgYSBudW1iZXIsIGZ1bmN0aW9uLCBvciBoZXggc3RyaW5nLCB0cmVhdCBpdCBhcyBhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQgdmFsdWUgc2luY2UgZWFzaW5ncyBjYW4gb25seSBiZSBub24taGV4IHN0cmluZ3Mgb3IgYXJyYXlzLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoIVR5cGUuaXNBcnJheSh2YWx1ZURhdGFbMV0pICYmIC9eW1xcZC1dLy50ZXN0KHZhbHVlRGF0YVsxXSkpIHx8IFR5cGUuaXNGdW5jdGlvbih2YWx1ZURhdGFbMV0pIHx8IENTUy5SZWdFeC5pc0hleC50ZXN0KHZhbHVlRGF0YVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRWYWx1ZSA9IHZhbHVlRGF0YVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBUd28gb3IgdGhyZWUtaXRlbSBhcnJheTogSWYgdGhlIHNlY29uZCBpdGVtIGlzIGEgbm9uLWhleCBzdHJpbmcgb3IgYW4gYXJyYXksIHRyZWF0IGl0IGFzIGFuIGVhc2luZy4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKChUeXBlLmlzU3RyaW5nKHZhbHVlRGF0YVsxXSkgJiYgIUNTUy5SZWdFeC5pc0hleC50ZXN0KHZhbHVlRGF0YVsxXSkpIHx8IFR5cGUuaXNBcnJheSh2YWx1ZURhdGFbMV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVhc2luZyA9IHNraXBSZXNvbHZpbmdFYXNpbmcgPyB2YWx1ZURhdGFbMV0gOiBnZXRFYXNpbmcodmFsdWVEYXRhWzFdLCBvcHRzLmR1cmF0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBEb24ndCBib3RoZXIgdmFsaWRhdGluZyBzdGFydFZhbHVlJ3MgdmFsdWUgbm93IHNpbmNlIHRoZSBlbnN1aW5nIHByb3BlcnR5IGN5Y2xpbmcgbG9naWMgaW5oZXJlbnRseSBkb2VzIHRoYXQuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZURhdGFbMl0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRWYWx1ZSA9IHZhbHVlRGF0YVsyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIEhhbmRsZSB0aGUgc2luZ2xlLXZhbHVlIGZvcm1hdC4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kVmFsdWUgPSB2YWx1ZURhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIERlZmF1bHQgdG8gdGhlIGNhbGwncyBlYXNpbmcgaWYgYSBwZXItcHJvcGVydHkgZWFzaW5nIHR5cGUgd2FzIG5vdCBkZWZpbmVkLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgZWFzaW5nID0gZWFzaW5nIHx8IG9wdHMuZWFzaW5nO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBJZiBmdW5jdGlvbnMgd2VyZSBwYXNzZWQgaW4gYXMgdmFsdWVzLCBwYXNzIHRoZSBmdW5jdGlvbiB0aGUgY3VycmVudCBlbGVtZW50IGFzIGl0cyBjb250ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcGx1cyB0aGUgZWxlbWVudCdzIGluZGV4IGFuZCB0aGUgZWxlbWVudCBzZXQncyBzaXplIGFzIGFyZ3VtZW50cy4gVGhlbiwgYXNzaWduIHRoZSByZXR1cm5lZCB2YWx1ZS4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChUeXBlLmlzRnVuY3Rpb24oZW5kVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kVmFsdWUgPSBlbmRWYWx1ZS5jYWxsKGVsZW1lbnQsIGVsZW1lbnRzSW5kZXgsIGVsZW1lbnRzTGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFR5cGUuaXNGdW5jdGlvbihzdGFydFZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0VmFsdWUgPSBzdGFydFZhbHVlLmNhbGwoZWxlbWVudCwgZWxlbWVudHNJbmRleCwgZWxlbWVudHNMZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBBbGxvdyBzdGFydFZhbHVlIHRvIGJlIGxlZnQgYXMgdW5kZWZpbmVkIHRvIGluZGljYXRlIHRvIHRoZSBlbnN1aW5nIGNvZGUgdGhhdCBpdHMgdmFsdWUgd2FzIG5vdCBmb3JjZWZlZC4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbIGVuZFZhbHVlIHx8IDAsIGVhc2luZywgc3RhcnRWYWx1ZSBdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLyogQ3ljbGUgdGhyb3VnaCBlYWNoIHByb3BlcnR5IGluIHRoZSBtYXAsIGxvb2tpbmcgZm9yIHNob3J0aGFuZCBjb2xvciBwcm9wZXJ0aWVzIChlLmcuIFwiY29sb3JcIiBhcyBvcHBvc2VkIHRvIFwiY29sb3JSZWRcIikuIEluamVjdCB0aGUgY29ycmVzcG9uZGluZ1xuICAgICAgICAgICAgICAgICAgICAgICBjb2xvclJlZCwgY29sb3JHcmVlbiwgYW5kIGNvbG9yQmx1ZSBSR0IgY29tcG9uZW50IHR3ZWVucyBpbnRvIHRoZSBwcm9wZXJ0aWVzTWFwICh3aGljaCBWZWxvY2l0eSB1bmRlcnN0YW5kcykgYW5kIHJlbW92ZSB0aGUgc2hvcnRoYW5kIHByb3BlcnR5LiAqL1xuICAgICAgICAgICAgICAgICAgICAkLmVhY2gocHJvcGVydGllc01hcCwgZnVuY3Rpb24ocHJvcGVydHksIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBQYXJzZSB0aGUgdmFsdWUgZGF0YSBmb3IgZWFjaCBzaG9ydGhhbmQuICovXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVEYXRhID0gcGFyc2VQcm9wZXJ0eVZhbHVlKHZhbHVlLCB0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRWYWx1ZSA9IHZhbHVlRGF0YVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlYXNpbmcgPSB2YWx1ZURhdGFbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRWYWx1ZSA9IHZhbHVlRGF0YVsyXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLyogRmluZCBzaG9ydGhhbmQgY29sb3IgcHJvcGVydGllcyB0aGF0IGhhdmUgYmVlbiBwYXNzZWQgYSBoZXggc3RyaW5nLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFJlZ0V4cChDU1MuTGlzdHMuY29sb3JzLmpvaW4oXCJ8XCIpKS50ZXN0KHByb3BlcnR5KSAmJiBDU1MuUmVnRXguaXNIZXgudGVzdChlbmRWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBDb252ZXJ0IHRoZSBoZXggc3RyaW5ncyBpbnRvIHRoZWlyIFJHQiBjb21wb25lbnQgYXJyYXlzLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb2xvckNvbXBvbmVudHMgPSBbIFwiUmVkXCIsIFwiR3JlZW5cIiwgXCJCbHVlXCIgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kVmFsdWVSR0IgPSBDU1MuVmFsdWVzLmhleFRvUmdiKGVuZFZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRWYWx1ZVJHQiA9IHN0YXJ0VmFsdWUgPyBDU1MuVmFsdWVzLmhleFRvUmdiKHN0YXJ0VmFsdWUpIDogdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogSW5qZWN0IHRoZSBSR0IgY29tcG9uZW50IHR3ZWVucyBpbnRvIHByb3BlcnRpZXNNYXAuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2xvckNvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllc01hcFtwcm9wZXJ0eSArIGNvbG9yQ29tcG9uZW50c1tpXV0gPSBbIGVuZFZhbHVlUkdCW2ldLCBlYXNpbmcsIHN0YXJ0VmFsdWVSR0IgPyBzdGFydFZhbHVlUkdCW2ldIDogc3RhcnRWYWx1ZVJHQiBdOyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBSZW1vdmUgdGhlIGludGVybWVkaWFyeSBzaG9ydGhhbmQgcHJvcGVydHkgZW50cnkgbm93IHRoYXQgd2UndmUgcHJvY2Vzc2VkIGl0LiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwcm9wZXJ0aWVzTWFwW3Byb3BlcnR5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLyogQ3JlYXRlIGEgdHdlZW4gb3V0IG9mIGVhY2ggcHJvcGVydHksIGFuZCBhcHBlbmQgaXRzIGFzc29jaWF0ZWQgZGF0YSB0byB0d2VlbnNDb250YWluZXIuICovXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3BlcnR5IGluIHByb3BlcnRpZXNNYXApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBTdGFydCBWYWx1ZSBTb3VyY2luZ1xuICAgICAgICAgICAgICAgICAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIFBhcnNlIG91dCBlbmRWYWx1ZSwgZWFzaW5nLCBhbmQgc3RhcnRWYWx1ZSBmcm9tIHRoZSBwcm9wZXJ0eSdzIGRhdGEuICovXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVEYXRhID0gcGFyc2VQcm9wZXJ0eVZhbHVlKHByb3BlcnRpZXNNYXBbcHJvcGVydHldKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRWYWx1ZSA9IHZhbHVlRGF0YVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlYXNpbmcgPSB2YWx1ZURhdGFbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRWYWx1ZSA9IHZhbHVlRGF0YVsyXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLyogTm93IHRoYXQgdGhlIG9yaWdpbmFsIHByb3BlcnR5IG5hbWUncyBmb3JtYXQgaGFzIGJlZW4gdXNlZCBmb3IgdGhlIHBhcnNlUHJvcGVydHlWYWx1ZSgpIGxvb2t1cCBhYm92ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlIGZvcmNlIHRoZSBwcm9wZXJ0eSB0byBpdHMgY2FtZWxDYXNlIHN0eWxpbmcgdG8gbm9ybWFsaXplIGl0IGZvciBtYW5pcHVsYXRpb24uICovXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eSA9IENTUy5OYW1lcy5jYW1lbENhc2UocHJvcGVydHkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBJbiBjYXNlIHRoaXMgcHJvcGVydHkgaXMgYSBob29rLCB0aGVyZSBhcmUgY2lyY3Vtc3RhbmNlcyB3aGVyZSB3ZSB3aWxsIGludGVuZCB0byB3b3JrIG9uIHRoZSBob29rJ3Mgcm9vdCBwcm9wZXJ0eSBhbmQgbm90IHRoZSBob29rZWQgc3VicHJvcGVydHkuICovXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm9vdFByb3BlcnR5ID0gQ1NTLkhvb2tzLmdldFJvb3QocHJvcGVydHkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvb3RQcm9wZXJ0eVZhbHVlID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIFByb3BlcnRpZXMgdGhhdCBhcmUgbm90IHN1cHBvcnRlZCBieSB0aGUgYnJvd3NlciAoYW5kIGRvIG5vdCBoYXZlIGFuIGFzc29jaWF0ZWQgbm9ybWFsaXphdGlvbikgd2lsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5oZXJlbnRseSBwcm9kdWNlIG5vIHN0eWxlIGNoYW5nZXMgd2hlbiBzZXQsIHNvIHRoZXkgYXJlIHNraXBwZWQgaW4gb3JkZXIgdG8gZGVjcmVhc2UgYW5pbWF0aW9uIHRpY2sgb3ZlcmhlYWQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBQcm9wZXJ0eSBzdXBwb3J0IGlzIGRldGVybWluZWQgdmlhIHByZWZpeENoZWNrKCksIHdoaWNoIHJldHVybnMgYSBmYWxzZSBmbGFnIHdoZW4gbm8gc3VwcG9ydGVkIGlzIGRldGVjdGVkLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgLyogTm90ZTogU2luY2UgU1ZHIGVsZW1lbnRzIGhhdmUgc29tZSBvZiB0aGVpciBwcm9wZXJ0aWVzIGRpcmVjdGx5IGFwcGxpZWQgYXMgSFRNTCBhdHRyaWJ1dGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlcmUgaXMgbm8gd2F5IHRvIGNoZWNrIGZvciB0aGVpciBleHBsaWNpdCBicm93c2VyIHN1cHBvcnQsIGFuZCBzbyB3ZSBza2lwIHNraXAgdGhpcyBjaGVjayBmb3IgdGhlbS4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghRGF0YShlbGVtZW50KS5pc1NWRyAmJiBDU1MuTmFtZXMucHJlZml4Q2hlY2socm9vdFByb3BlcnR5KVsxXSA9PT0gZmFsc2UgJiYgQ1NTLk5vcm1hbGl6YXRpb25zLnJlZ2lzdGVyZWRbcm9vdFByb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFZlbG9jaXR5LmRlYnVnKSBjb25zb2xlLmxvZyhcIlNraXBwaW5nIFtcIiArIHJvb3RQcm9wZXJ0eSArIFwiXSBkdWUgdG8gYSBsYWNrIG9mIGJyb3dzZXIgc3VwcG9ydC5cIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLyogSWYgdGhlIGRpc3BsYXkgb3B0aW9uIGlzIGJlaW5nIHNldCB0byBhIG5vbi1cIm5vbmVcIiAoZS5nLiBcImJsb2NrXCIpIGFuZCBvcGFjaXR5IChmaWx0ZXIgb24gSUU8PTgpIGlzIGJlaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlZCB0byBhbiBlbmRWYWx1ZSBvZiBub24temVybywgdGhlIHVzZXIncyBpbnRlbnRpb24gaXMgdG8gZmFkZSBpbiBmcm9tIGludmlzaWJsZSwgdGh1cyB3ZSBmb3JjZWZlZWQgb3BhY2l0eVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgYSBzdGFydFZhbHVlIG9mIDAgaWYgaXRzIHN0YXJ0VmFsdWUgaGFzbid0IGFscmVhZHkgYmVlbiBzb3VyY2VkIGJ5IHZhbHVlIHRyYW5zZmVycmluZyBvciBwcmlvciBmb3JjZWZlZWRpbmcuICovXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKChvcHRzLmRpc3BsYXkgJiYgb3B0cy5kaXNwbGF5ICE9PSBcIm5vbmVcIikgfHwgKG9wdHMudmlzaWJpbGl0eSAmJiBvcHRzLnZpc2liaWxpdHkgIT09IFwiaGlkZGVuXCIpKSAmJiAvb3BhY2l0eXxmaWx0ZXIvLnRlc3QocHJvcGVydHkpICYmICFzdGFydFZhbHVlICYmIGVuZFZhbHVlICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIElmIHZhbHVlcyBoYXZlIGJlZW4gdHJhbnNmZXJyZWQgZnJvbSB0aGUgcHJldmlvdXMgVmVsb2NpdHkgY2FsbCwgZXh0cmFjdCB0aGUgZW5kVmFsdWUgYW5kIHJvb3RQcm9wZXJ0eVZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgYWxsIG9mIHRoZSBjdXJyZW50IGNhbGwncyBwcm9wZXJ0aWVzIHRoYXQgd2VyZSAqYWxzbyogYW5pbWF0ZWQgaW4gdGhlIHByZXZpb3VzIGNhbGwuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBOb3RlOiBWYWx1ZSB0cmFuc2ZlcnJpbmcgY2FuIG9wdGlvbmFsbHkgYmUgZGlzYWJsZWQgYnkgdGhlIHVzZXIgdmlhIHRoZSBfY2FjaGVWYWx1ZXMgb3B0aW9uLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuX2NhY2hlVmFsdWVzICYmIGxhc3RUd2VlbnNDb250YWluZXIgJiYgbGFzdFR3ZWVuc0NvbnRhaW5lcltwcm9wZXJ0eV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhcnRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0VmFsdWUgPSBsYXN0VHdlZW5zQ29udGFpbmVyW3Byb3BlcnR5XS5lbmRWYWx1ZSArIGxhc3RUd2VlbnNDb250YWluZXJbcHJvcGVydHldLnVuaXRUeXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIFRoZSBwcmV2aW91cyBjYWxsJ3Mgcm9vdFByb3BlcnR5VmFsdWUgaXMgZXh0cmFjdGVkIGZyb20gdGhlIGVsZW1lbnQncyBkYXRhIGNhY2hlIHNpbmNlIHRoYXQncyB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZSBvZiByb290UHJvcGVydHlWYWx1ZSB0aGF0IGdldHMgZnJlc2hseSB1cGRhdGVkIGJ5IHRoZSB0d2VlbmluZyBwcm9jZXNzLCB3aGVyZWFzIHRoZSByb290UHJvcGVydHlWYWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFjaGVkIHRvIHRoZSBpbmNvbWluZyBsYXN0VHdlZW5zQ29udGFpbmVyIGlzIGVxdWFsIHRvIHRoZSByb290IHByb3BlcnR5J3MgdmFsdWUgcHJpb3IgdG8gYW55IHR3ZWVuaW5nLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvb3RQcm9wZXJ0eVZhbHVlID0gRGF0YShlbGVtZW50KS5yb290UHJvcGVydHlWYWx1ZUNhY2hlW3Jvb3RQcm9wZXJ0eV07XG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBJZiB2YWx1ZXMgd2VyZSBub3QgdHJhbnNmZXJyZWQgZnJvbSBhIHByZXZpb3VzIFZlbG9jaXR5IGNhbGwsIHF1ZXJ5IHRoZSBET00gYXMgbmVlZGVkLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBIYW5kbGUgaG9va2VkIHByb3BlcnRpZXMuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKENTUy5Ib29rcy5yZWdpc3RlcmVkW3Byb3BlcnR5XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGFydFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvb3RQcm9wZXJ0eVZhbHVlID0gQ1NTLmdldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgcm9vdFByb3BlcnR5KTsgLyogR0VUICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBOb3RlOiBUaGUgZm9sbG93aW5nIGdldFByb3BlcnR5VmFsdWUoKSBjYWxsIGRvZXMgbm90IGFjdHVhbGx5IHRyaWdnZXIgYSBET00gcXVlcnk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRQcm9wZXJ0eVZhbHVlKCkgd2lsbCBleHRyYWN0IHRoZSBob29rIGZyb20gcm9vdFByb3BlcnR5VmFsdWUuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFZhbHVlID0gQ1NTLmdldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgcHJvcGVydHksIHJvb3RQcm9wZXJ0eVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogSWYgc3RhcnRWYWx1ZSBpcyBhbHJlYWR5IGRlZmluZWQgdmlhIGZvcmNlZmVlZGluZywgZG8gbm90IHF1ZXJ5IHRoZSBET00gZm9yIHRoZSByb290IHByb3BlcnR5J3MgdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp1c3QgZ3JhYiByb290UHJvcGVydHkncyB6ZXJvLXZhbHVlIHRlbXBsYXRlIGZyb20gQ1NTLkhvb2tzLiBUaGlzIG92ZXJ3cml0ZXMgdGhlIGVsZW1lbnQncyBhY3R1YWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9vdCBwcm9wZXJ0eSB2YWx1ZSAoaWYgb25lIGlzIHNldCksIGJ1dCB0aGlzIGlzIGFjY2VwdGFibGUgc2luY2UgdGhlIHByaW1hcnkgcmVhc29uIHVzZXJzIGZvcmNlZmVlZCBpc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byBhdm9pZCBET00gcXVlcmllcywgYW5kIHRodXMgd2UgbGlrZXdpc2UgYXZvaWQgcXVlcnlpbmcgdGhlIERPTSBmb3IgdGhlIHJvb3QgcHJvcGVydHkncyB2YWx1ZS4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIEdyYWIgdGhpcyBob29rJ3MgemVyby12YWx1ZSB0ZW1wbGF0ZSwgZS5nLiBcIjBweCAwcHggMHB4IGJsYWNrXCIuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb290UHJvcGVydHlWYWx1ZSA9IENTUy5Ib29rcy50ZW1wbGF0ZXNbcm9vdFByb3BlcnR5XVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIEhhbmRsZSBub24taG9va2VkIHByb3BlcnRpZXMgdGhhdCBoYXZlbid0IGFscmVhZHkgYmVlbiBkZWZpbmVkIHZpYSBmb3JjZWZlZWRpbmcuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGFydFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRWYWx1ZSA9IENTUy5nZXRQcm9wZXJ0eVZhbHVlKGVsZW1lbnQsIHByb3BlcnR5KTsgLyogR0VUICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFZhbHVlIERhdGEgRXh0cmFjdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXBhcmF0ZWRWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRWYWx1ZVVuaXRUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0VmFsdWVVbml0VHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRvciA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBTZXBhcmF0ZXMgYSBwcm9wZXJ0eSB2YWx1ZSBpbnRvIGl0cyBudW1lcmljIHZhbHVlIGFuZCBpdHMgdW5pdCB0eXBlLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gc2VwYXJhdGVWYWx1ZSAocHJvcGVydHksIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVuaXRUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1lcmljVmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1lcmljVmFsdWUgPSAodmFsdWUgfHwgMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogTWF0Y2ggdGhlIHVuaXQgdHlwZSBhdCB0aGUgZW5kIG9mIHRoZSB2YWx1ZS4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1slQS16XSskLywgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIEdyYWIgdGhlIHVuaXQgdHlwZS4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXRUeXBlID0gbWF0Y2g7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIFN0cmlwIHRoZSB1bml0IHR5cGUgb2ZmIG9mIHZhbHVlLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogSWYgbm8gdW5pdCB0eXBlIHdhcyBzdXBwbGllZCwgYXNzaWduIG9uZSB0aGF0IGlzIGFwcHJvcHJpYXRlIGZvciB0aGlzIHByb3BlcnR5IChlLmcuIFwiZGVnXCIgZm9yIHJvdGF0ZVogb3IgXCJweFwiIGZvciB3aWR0aCkuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1bml0VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bml0VHlwZSA9IENTUy5WYWx1ZXMuZ2V0VW5pdFR5cGUocHJvcGVydHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbIG51bWVyaWNWYWx1ZSwgdW5pdFR5cGUgXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLyogU2VwYXJhdGUgc3RhcnRWYWx1ZS4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcGFyYXRlZFZhbHVlID0gc2VwYXJhdGVWYWx1ZShwcm9wZXJ0eSwgc3RhcnRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydFZhbHVlID0gc2VwYXJhdGVkVmFsdWVbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydFZhbHVlVW5pdFR5cGUgPSBzZXBhcmF0ZWRWYWx1ZVsxXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLyogU2VwYXJhdGUgZW5kVmFsdWUsIGFuZCBleHRyYWN0IGEgdmFsdWUgb3BlcmF0b3IgKGUuZy4gXCIrPVwiLCBcIi09XCIpIGlmIG9uZSBleGlzdHMuICovXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXBhcmF0ZWRWYWx1ZSA9IHNlcGFyYXRlVmFsdWUocHJvcGVydHksIGVuZFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZFZhbHVlID0gc2VwYXJhdGVkVmFsdWVbMF0ucmVwbGFjZSgvXihbKy1cXC8qXSk9LywgZnVuY3Rpb24obWF0Y2gsIHN1Yk1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0b3IgPSBzdWJNYXRjaDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIFN0cmlwIHRoZSBvcGVyYXRvciBvZmYgb2YgdGhlIHZhbHVlLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRWYWx1ZVVuaXRUeXBlID0gc2VwYXJhdGVkVmFsdWVbMV07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIFBhcnNlIGZsb2F0IHZhbHVlcyBmcm9tIGVuZFZhbHVlIGFuZCBzdGFydFZhbHVlLiBEZWZhdWx0IHRvIDAgaWYgTmFOIGlzIHJldHVybmVkLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRWYWx1ZSA9IHBhcnNlRmxvYXQoc3RhcnRWYWx1ZSkgfHwgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZFZhbHVlID0gcGFyc2VGbG9hdChlbmRWYWx1ZSkgfHwgMDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBWYWx1ZSAmIFVuaXQgQ29udmVyc2lvblxuICAgICAgICAgICAgICAgICAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50VW5pdFJhdGlvcztcblxuICAgICAgICAgICAgICAgICAgICAgICAgLyogQ3VzdG9tIHN1cHBvcnQgZm9yIHByb3BlcnRpZXMgdGhhdCBkb24ndCBhY3R1YWxseSBhY2NlcHQgdGhlICUgdW5pdCB0eXBlLCBidXQgd2hlcmUgcG9sbHlmaWxsaW5nIGlzIHRyaXZpYWwgYW5kIHJlbGF0aXZlbHkgZm9vbHByb29mLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVuZFZhbHVlVW5pdFR5cGUgPT09IFwiJVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogQSAlLXZhbHVlIGZvbnRTaXplL2xpbmVIZWlnaHQgaXMgcmVsYXRpdmUgdG8gdGhlIHBhcmVudCdzIGZvbnRTaXplIChhcyBvcHBvc2VkIHRvIHRoZSBwYXJlbnQncyBkaW1lbnNpb25zKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGljaCBpcyBpZGVudGljYWwgdG8gdGhlIGVtIHVuaXQncyBiZWhhdmlvciwgc28gd2UgcGlnZ3liYWNrIG9mZiBvZiB0aGF0LiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvXihmb250U2l6ZXxsaW5lSGVpZ2h0KSQvLnRlc3QocHJvcGVydHkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIENvbnZlcnQgJSBpbnRvIGFuIGVtIGRlY2ltYWwgdmFsdWUuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZFZhbHVlID0gZW5kVmFsdWUgLyAxMDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZFZhbHVlVW5pdFR5cGUgPSBcImVtXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogRm9yIHNjYWxlWCBhbmQgc2NhbGVZLCBjb252ZXJ0IHRoZSB2YWx1ZSBpbnRvIGl0cyBkZWNpbWFsIGZvcm1hdCBhbmQgc3RyaXAgb2ZmIHRoZSB1bml0IHR5cGUuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgvXnNjYWxlLy50ZXN0KHByb3BlcnR5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRWYWx1ZSA9IGVuZFZhbHVlIC8gMTAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRWYWx1ZVVuaXRUeXBlID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBGb3IgUkdCIGNvbXBvbmVudHMsIHRha2UgdGhlIGRlZmluZWQgcGVyY2VudGFnZSBvZiAyNTUgYW5kIHN0cmlwIG9mZiB0aGUgdW5pdCB0eXBlLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoLyhSZWR8R3JlZW58Qmx1ZSkkL2kudGVzdChwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kVmFsdWUgPSAoZW5kVmFsdWUgLyAxMDApICogMjU1O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRWYWx1ZVVuaXRUeXBlID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIFdoZW4gcXVlcmllZCwgdGhlIGJyb3dzZXIgcmV0dXJucyAobW9zdCkgQ1NTIHByb3BlcnR5IHZhbHVlcyBpbiBwaXhlbHMuIFRoZXJlZm9yZSwgaWYgYW4gZW5kVmFsdWUgd2l0aCBhIHVuaXQgdHlwZSBvZlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJSwgZW0sIG9yIHJlbSBpcyBhbmltYXRlZCB0b3dhcmQsIHN0YXJ0VmFsdWUgbXVzdCBiZSBjb252ZXJ0ZWQgZnJvbSBwaXhlbHMgaW50byB0aGUgc2FtZSB1bml0IHR5cGUgYXMgZW5kVmFsdWUgaW4gb3JkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciB2YWx1ZSBtYW5pcHVsYXRpb24gbG9naWMgKGluY3JlbWVudC9kZWNyZW1lbnQpIHRvIHByb2NlZWQuIEZ1cnRoZXIsIGlmIHRoZSBzdGFydFZhbHVlIHdhcyBmb3JjZWZlZCBvciB0cmFuc2ZlcnJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBhIHByZXZpb3VzIGNhbGwsIHN0YXJ0VmFsdWUgbWF5IGFsc28gbm90IGJlIGluIHBpeGVscy4gVW5pdCBjb252ZXJzaW9uIGxvZ2ljIHRoZXJlZm9yZSBjb25zaXN0cyBvZiB0d28gc3RlcHM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAxKSBDYWxjdWxhdGluZyB0aGUgcmF0aW8gb2YgJSwvZW0vcmVtIHJlbGF0aXZlIHRvIHBpeGVscyB0aGVuIDIpIENvbnZlcnRpbmcgc3RhcnRWYWx1ZSBpbnRvIHRoZSBzYW1lIHVuaXQgb2YgbWVhc3VyZW1lbnQgYXMgZW5kVmFsdWUgYmFzZWQgb24gdGhlc2UgcmF0aW9zLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgLyogVW5pdCBjb252ZXJzaW9uIHJhdGlvcyBhcmUgY2FsY3VsYXRlZCBieSBtb21lbnRhcmlseSBzZXR0aW5nIGEgdmFsdWUgd2l0aCB0aGUgdGFyZ2V0IHVuaXQgdHlwZSBvbiB0aGUgZWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBhcmluZyB0aGUgcmV0dXJuZWQgcGl4ZWwgdmFsdWUsIHRoZW4gcmV2ZXJ0aW5nIHRvIHRoZSBvcmlnaW5hbCB2YWx1ZS4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIE5vdGU6IEV2ZW4gaWYgb25seSBvbmUgb2YgdGhlc2UgdW5pdCB0eXBlcyBpcyBiZWluZyBhbmltYXRlZCwgYWxsIHVuaXQgcmF0aW9zIGFyZSBjYWxjdWxhdGVkIGF0IG9uY2Ugc2luY2UgdGhlIG92ZXJoZWFkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBvZiBiYXRjaGluZyB0aGUgU0VUcyBhbmQgR0VUcyB0b2dldGhlciB1cGZyb250IG91dHdlaWdodHMgdGhlIHBvdGVudGlhbCBvdmVyaGVhZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2YgbGF5b3V0IHRocmFzaGluZyBjYXVzZWQgYnkgcmUtcXVlcnlpbmcgZm9yIHVuY2FsY3VsYXRlZCByYXRpb3MgZm9yIHN1YnNlcXVlbnRseS1wcm9jZXNzZWQgcHJvcGVydGllcy4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIE5vdGU6IEluc3RlYWQgb2YgYWRqdXN0aW5nIHRoZSBDU1MgcHJvcGVydGllcyBvbiB0aGUgdGFyZ2V0IGVsZW1lbnQsIGFuIGFsdGVybmF0aXZlIHdheSBvZiBwZXJmb3JtaW5nIHZhbHVlIGNvbnZlcnNpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzIHRvIGluamVjdCBhIGNsb25lZCBlbGVtZW50IGludG8gdGhlIGVsZW1lbnQncyBwYXJlbnQgYW5kIG1hbmlwdWxhdGUgKml0cyogdmFsdWVzIGluc3RlYWQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBUaGlzIGlzIGEgY2xlYW5lciBtZXRob2QgdGhhdCBhdm9pZHMgdGhlIGVuc3Vpbmcgcm91bmRzIG9mIGxheW91dCB0aHJhc2hpbmcsIGJ1dCBpdCdzIHVsdGltYXRlbHkgbGVzcyBwZXJmb3JtYW50LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVlIHRvIHRoZSBvdmVyaGVhZCBpbnZvbHZlZCB3aXRoIERPTSB0cmVlIG1vZGlmaWNhdGlvbiAoZWxlbWVudCBpbnNlcnRpb24vZGVsZXRpb24pLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgLyogVG9kbzogU2hpZnQgdGhpcyBsb2dpYyBpbnRvIHRoZSBjYWxscycgZmlyc3QgdGljayBpbnN0YW5jZSBzbyB0aGF0IGl0J3Mgc3luY2VkIHdpdGggUkFGLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgLyogVG9kbzogU3RvcmUgdGhlIG9yaWdpbmFsIHZhbHVlcyBhbmQgc2tpcCByZS1zZXR0aW5nIGlmIHdlJ3JlIGFuaW1hdGluZyBoZWlnaHQgb3Igd2lkdGggaW4gdGhlIHByb3BlcnRpZXMgbWFwLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gY2FsY3VsYXRlVW5pdFJhdGlvcyAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogVGhlIHByb3BlcnRpZXMgYmVsb3cgYXJlIHVzZWQgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGVsZW1lbnQgZGlmZmVycyBzdWZmaWNpZW50bHkgZnJvbSB0aGlzIHNhbWUgY2FsbCdzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpb3IgZWxlbWVudCAoaW4gdGhlIG92ZXJhbGwgZWxlbWVudCBzZXQpIHRvIGFsc28gZGlmZmVyIGluIGl0cyB1bml0IGNvbnZlcnNpb24gcmF0aW9zLiBJZiB0aGUgcHJvcGVydGllc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoIHVwIHdpdGggdGhvc2Ugb2YgdGhlIHByaW9yIGVsZW1lbnQsIHRoZSBwcmlvciBlbGVtZW50J3MgY29udmVyc2lvbiByYXRpb3MgYXJlIHVzZWQuIExpa2UgbW9zdCBvcHRpbWl6YXRpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW4gVmVsb2NpdHksIHRoaXMgaXMgZG9uZSB0byBtaW5pbWl6ZSBET00gcXVlcnlpbmcuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNhbWVSYXRpb0luZGljYXRvcnMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IGVsZW1lbnQucGFyZW50Tm9kZSwgLyogR0VUICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogQ1NTLmdldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgXCJwb3NpdGlvblwiKSwgLyogR0VUICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogQ1NTLmdldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgXCJmb250U2l6ZVwiKSAvKiBHRVQgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogRGV0ZXJtaW5lIGlmIHRoZSBzYW1lICUgcmF0aW8gY2FuIGJlIHVzZWQuICUgaXMgcmVsYXRpdmUgdG8gdGhlIGVsZW1lbnQncyBwb3NpdGlvbiB2YWx1ZSBhbmQgdGhlIHBhcmVudCdzIHdpZHRoIGFuZCBoZWlnaHQgZGltZW5zaW9ucy4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2FtZUJhc2VQZXJjZW50ID0gKChzYW1lUmF0aW9JbmRpY2F0b3JzLnBvc2l0aW9uID09PSB1bml0Q29udmVyc2lvblJhdGlvcy5sYXN0UG9zaXRpb24pICYmIChzYW1lUmF0aW9JbmRpY2F0b3JzLnBhcmVudCA9PT0gdW5pdENvbnZlcnNpb25SYXRpb3MubGFzdFBhcmVudCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBEZXRlcm1pbmUgaWYgdGhlIHNhbWUgZW0gcmF0aW8gY2FuIGJlIHVzZWQuIGVtIGlzIHJlbGF0aXZlIHRvIHRoZSBlbGVtZW50J3MgZm9udFNpemUsIHdoaWNoIGl0c2VsZiBpcyByZWxhdGl2ZSB0byB0aGUgcGFyZW50J3MgZm9udFNpemUuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbWVCYXNlRW0gPSAoKHNhbWVSYXRpb0luZGljYXRvcnMuZm9udFNpemUgPT09IHVuaXRDb252ZXJzaW9uUmF0aW9zLmxhc3RGb250U2l6ZSkgJiYgKHNhbWVSYXRpb0luZGljYXRvcnMucGFyZW50ID09PSB1bml0Q29udmVyc2lvblJhdGlvcy5sYXN0UGFyZW50KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBTdG9yZSB0aGVzZSByYXRpbyBpbmRpY2F0b3JzIGNhbGwtd2lkZSBmb3IgdGhlIG5leHQgZWxlbWVudCB0byBjb21wYXJlIGFnYWluc3QuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pdENvbnZlcnNpb25SYXRpb3MubGFzdFBhcmVudCA9IHNhbWVSYXRpb0luZGljYXRvcnMucGFyZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXRDb252ZXJzaW9uUmF0aW9zLmxhc3RQb3NpdGlvbiA9IHNhbWVSYXRpb0luZGljYXRvcnMucG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pdENvbnZlcnNpb25SYXRpb3MubGFzdEZvbnRTaXplID0gc2FtZVJhdGlvSW5kaWNhdG9ycy5mb250U2l6ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIFdoZXJlYXMgJSBhbmQgZW0gcmF0aW9zIGFyZSBkZXRlcm1pbmVkIG9uIGEgcGVyLWVsZW1lbnQgYmFzaXMsIHRoZSByZW0gdW5pdCB0eXBlIG9ubHkgbmVlZHMgdG8gYmUgY2hlY2tlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY2UgcGVyIGNhbGwgc2luY2UgaXQgaXMgZXhjbHVzaXZlbHkgZGVwZW5kYW50IHVwb24gZG9jdW1lbnQuYm9keSdzIGZvbnRTaXplLiBJZiB0aGlzIGlzIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdCBjYWxjdWxhdGVVbml0UmF0aW9zKCkgaXMgYmVpbmcgcnVuIGR1cmluZyB0aGlzIGNhbGwsIHJlbVRvUHggd2lsbCBzdGlsbCBiZSBzZXQgdG8gaXRzIGRlZmF1bHQgdmFsdWUgb2YgbnVsbCwgc28gd2UgY2FsY3VsYXRlIGl0IG5vdy4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodW5pdENvbnZlcnNpb25SYXRpb3MucmVtVG9QeCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBEZWZhdWx0IHRvIG1vc3QgYnJvd3NlcnMnIGRlZmF1bHQgZm9udFNpemUgb2YgMTZweCBpbiB0aGUgY2FzZSBvZiAwLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bml0Q29udmVyc2lvblJhdGlvcy5yZW1Ub1B4ID0gcGFyc2VGbG9hdChDU1MuZ2V0UHJvcGVydHlWYWx1ZShkb2N1bWVudC5ib2R5LCBcImZvbnRTaXplXCIpKSB8fCAxNjsgLyogR0VUICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogVGhlIHZpZXdwb3J0IHVuaXRzIGFyZSByZWxhdGl2ZSB0byB0aGUgd2luZG93J3MgaW5uZXIgZGltZW5zaW9ucy4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodW5pdENvbnZlcnNpb25SYXRpb3MudndUb1B4ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXRDb252ZXJzaW9uUmF0aW9zLnZ3VG9QeCA9IHBhcnNlRmxvYXQod2luZG93LmlubmVyV2lkdGgpIC8gMTAwOyAvKiBHRVQgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pdENvbnZlcnNpb25SYXRpb3MudmhUb1B4ID0gcGFyc2VGbG9hdCh3aW5kb3cuaW5uZXJIZWlnaHQpIC8gMTAwOyAvKiBHRVQgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3JpZ2luYWxWYWx1ZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBUbyBhY2N1cmF0ZWx5IGFuZCBjb25zaXN0ZW50bHkgY2FsY3VsYXRlIGNvbnZlcnNpb24gcmF0aW9zLCB0aGUgZWxlbWVudCdzIG92ZXJmbG93IGFuZCBib3gtc2l6aW5nIGFyZSB0ZW1wb3JhcmlseSByZW1vdmVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQm90aCBwcm9wZXJ0aWVzIG1vZGlmeSBhbiBlbGVtZW50J3MgdmlzaWJsZSBkaW1lbnNpb25zLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogTm90ZTogT3ZlcmZsb3cgbXVzdCBiZSBtYW5pcHVsYXRlZCBvbiBhIHBlci1heGlzIGJhc2lzIHNpbmNlIHRoZSBwbGFpbiBvdmVyZmxvdyBwcm9wZXJ0eSBvdmVyd3JpdGVzIGl0cyBzdWJwcm9wZXJ0aWVzJyB2YWx1ZXMuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdmVyZmxvd1g6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdmVyZmxvd1k6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3hTaXppbmc6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiB3aWR0aCBhbmQgaGVpZ2h0IGFjdCBhcyBvdXIgcHJveHkgcHJvcGVydGllcyBmb3IgbWVhc3VyaW5nIHRoZSBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCAlIHJhdGlvcy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNpbmNlIHRoZXkgY2FuIGJlIGFydGlmaWNpYWxseSBjb25zdHJhaW5lZCBieSB0aGVpciBtaW4tL21heC0gZXF1aXZhbGVudHMsIHRob3NlIHByb3BlcnRpZXMgYXJlIGNvbnZlcnRlZCBhcyB3ZWxsLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5XaWR0aDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluSGVpZ2h0OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4SGVpZ2h0OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogcGFkZGluZ0xlZnQgYXJiaXRyYXJpbHkgYWN0cyBhcyBvdXIgcHJveHkgZm9yIHRoZSBlbSByYXRpby4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRVbml0UmF0aW9zID0ge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIE5vdGU6IElFPD04IHJvdW5kIHRvIHRoZSBuZWFyZXN0IHBpeGVsIHdoZW4gcmV0dXJuaW5nIENTUyB2YWx1ZXMsIHRodXMgd2UgcGVyZm9ybSBjb252ZXJzaW9ucyB1c2luZyBhIG1lYXN1cmVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mIDEwIChpbnN0ZWFkIG9mIDEpIHRvIGdpdmUgb3VyIHJhdGlvcyBhIHByZWNpc2lvbiBvZiBhdCBsZWFzdCAxIGRlY2ltYWwgdmFsdWUuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lYXN1cmVtZW50ID0gMTA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBGb3Igb3JnYW5pemF0aW9uYWwgcHVycG9zZXMsIGN1cnJlbnQgcmF0aW8gY2FsY3VsYXRpb25zIGFyZSBjb25zb2xpZGF0ZWQgb250byB0aGUgZWxlbWVudFVuaXRSYXRpb3Mgb2JqZWN0LiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRVbml0UmF0aW9zLnJlbVRvUHggPSB1bml0Q29udmVyc2lvblJhdGlvcy5yZW1Ub1B4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRVbml0UmF0aW9zLnZ3VG9QeCA9IHVuaXRDb252ZXJzaW9uUmF0aW9zLnZ3VG9QeDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50VW5pdFJhdGlvcy52aFRvUHggPSB1bml0Q29udmVyc2lvblJhdGlvcy52aFRvUHg7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBBZnRlciB0ZW1wb3JhcnkgdW5pdCBjb252ZXJzaW9uIGxvZ2ljIHJ1bnMsIHdpZHRoIGFuZCBoZWlnaHQgcHJvcGVydGllcyB0aGF0IHdlcmUgb3JpZ2luYWxseSBzZXQgdG8gXCJhdXRvXCIgbXVzdCBiZSBzZXQgYmFja1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIFwiYXV0b1wiIGluc3RlYWQgb2YgdG8gdGhlIGFjdHVhbCBjb3JyZXNwb25kaW5nIHBpeGVsIHZhbHVlLiBMZWF2aW5nIHRoZSB2YWx1ZXMgYXQgdGhlaXIgaGFyZC1jb2RlZCBwaXhlbCB2YWx1ZSBlcXVpdmFsZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvdWxkIGluaGVyZW50bHkgcHJldmVudCB0aGUgZWxlbWVudHMgZnJvbSB2ZXJ0aWNhbGx5IGFkanVzdGluZyBhcyB0aGUgaGVpZ2h0IG9mIGl0cyBpbm5lciBjb250ZW50IGNoYW5nZXMuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogSUUgdGVsbHMgdXMgd2hldGhlciBvciBub3QgdGhlIHByb3BlcnR5IGlzIHNldCB0byBcImF1dG9cIi4gT3RoZXIgYnJvd3NlcnMgcHJvdmlkZSBubyB3YXkgb2YgZGV0ZXJtaW5nIFwiYXV0b1wiIHZhbHVlcyBvbiBoZWlnaHQvd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5kIHRodXMgd2UgaGF2ZSB0byB0cmlnZ2VyIGFkZGl0aW9uYWwgbGF5b3V0IHRocmFzaGluZyAoc2VlIGJlbG93KSB0byBzb2x2ZSB0aGlzLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChJRSAmJiAhRGF0YShlbGVtZW50KS5pc1NWRykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNJRVdpZHRoQXV0byA9IC9eYXV0byQvaS50ZXN0KGVsZW1lbnQuY3VycmVudFN0eWxlLndpZHRoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzSUVIZWlnaHRBdXRvID0gL15hdXRvJC9pLnRlc3QoZWxlbWVudC5jdXJyZW50U3R5bGUuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBOb3RlOiBUbyBtaW5pbWl6ZSBsYXlvdXQgdGhyYXNoaW5nLCB0aGUgZW5zdWluZyB1bml0IGNvbnZlcnNpb24gbG9naWMgaXMgc3BsaXQgaW50byBiYXRjaGVzIHRvIHN5bmNocm9uaXplIEdFVHMgYW5kIFNFVHMuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzYW1lQmFzZVBlcmNlbnQgfHwgIXNhbWVCYXNlRW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogU1ZHIGVsZW1lbnRzIGhhdmUgbm8gY29uY2VwdCBvZiBkb2N1bWVudCBmbG93LCBhbmQgZG9uJ3Qgc3VwcG9ydCB0aGUgZnVsbCByYW5nZSBvZiBDU1MgcHJvcGVydGllcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc28gd2Ugc2tpcCB0aGUgdW5uZWNlc3Nhcnkgc3RyaXBwaW5nIG9mIHVuYXBwbGllZCBwcm9wZXJ0aWVzIHRvIGF2b2lkIGRpcnR5aW5nIHRoZWlyIEhUTUwuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghRGF0YShlbGVtZW50KS5pc1NWRykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxWYWx1ZXMub3ZlcmZsb3dYID0gQ1NTLmdldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgXCJvdmVyZmxvd1hcIik7IC8qIEdFVCAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxWYWx1ZXMub3ZlcmZsb3dZID0gQ1NTLmdldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgXCJvdmVyZmxvd1lcIik7IC8qIEdFVCAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxWYWx1ZXMuYm94U2l6aW5nID0gQ1NTLmdldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgXCJib3hTaXppbmdcIik7IC8qIEdFVCAqL1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBTaW5jZSAlIHZhbHVlcyBhcmUgcmVsYXRpdmUgdG8gdGhlaXIgcmVzcGVjdGl2ZSBheGVzLCByYXRpb3MgYXJlIGNhbGN1bGF0ZWQgZm9yIGJvdGggd2lkdGggYW5kIGhlaWdodC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEluIGNvbnRyYXN0LCBvbmx5IGEgc2luZ2xlIHJhdGlvIGlzIHJlcXVpcmVkIGZvciByZW0gYW5kIGVtLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogV2hlbiBjYWxjdWxhdGluZyAlIHZhbHVlcywgd2Ugc2V0IGEgZmxhZyB0byBpbmRpY2lhdGUgdGhhdCB3ZSB3YW50IHRoZSBjb21wdXRlZCB2YWx1ZSBpbnN0ZWFkIG9mIG9mZnNldFdpZHRoL0hlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWNoIGluY29ycG9yYXRlIGFkZGl0aW9uYWwgZGltZW5zaW9ucyAoc3VjaCBhcyBwYWRkaW5nIGFuZCBib3JkZXItd2lkdGgpIGludG8gdGhlaXIgdmFsdWVzLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxWYWx1ZXMubWluV2lkdGggPSBDU1MuZ2V0UHJvcGVydHlWYWx1ZShlbGVtZW50LCBcIm1pbldpZHRoXCIpOyAvKiBHRVQgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIE5vdGU6IG1heC13aWR0aC9oZWlnaHQgbXVzdCBkZWZhdWx0IHRvIFwibm9uZVwiIHdoZW4gMCBpcyByZXR1cm5lZCwgb3RoZXJ3aXNlIHRoZSBlbGVtZW50IGNhbm5vdCBoYXZlIGl0cyB3aWR0aC9oZWlnaHQgc2V0LiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxWYWx1ZXMubWF4V2lkdGggPSBDU1MuZ2V0UHJvcGVydHlWYWx1ZShlbGVtZW50LCBcIm1heFdpZHRoXCIpIHx8IFwibm9uZVwiOyAvKiBHRVQgKi9cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxWYWx1ZXMubWluSGVpZ2h0ID0gQ1NTLmdldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgXCJtaW5IZWlnaHRcIik7IC8qIEdFVCAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxWYWx1ZXMubWF4SGVpZ2h0ID0gQ1NTLmdldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgXCJtYXhIZWlnaHRcIikgfHwgXCJub25lXCI7IC8qIEdFVCAqL1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFZhbHVlcy5wYWRkaW5nTGVmdCA9IENTUy5nZXRQcm9wZXJ0eVZhbHVlKGVsZW1lbnQsIFwicGFkZGluZ0xlZnRcIik7IC8qIEdFVCAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxWYWx1ZXMud2lkdGggPSBDU1MuZ2V0UHJvcGVydHlWYWx1ZShlbGVtZW50LCBcIndpZHRoXCIsIG51bGwsIHRydWUpOyAvKiBHRVQgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxWYWx1ZXMuaGVpZ2h0ID0gQ1NTLmdldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgXCJoZWlnaHRcIiwgbnVsbCwgdHJ1ZSk7IC8qIEdFVCAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzYW1lQmFzZVBlcmNlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudFVuaXRSYXRpb3MucGVyY2VudFRvUHhSYXRpb1dpZHRoID0gdW5pdENvbnZlcnNpb25SYXRpb3MubGFzdFBlcmNlbnRUb1B4V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRVbml0UmF0aW9zLnBlcmNlbnRUb1B4UmF0aW9IZWlnaHQgPSB1bml0Q29udmVyc2lvblJhdGlvcy5sYXN0UGVyY2VudFRvUHhIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFEYXRhKGVsZW1lbnQpLmlzU1ZHKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDU1Muc2V0UHJvcGVydHlWYWx1ZShlbGVtZW50LCBcIm92ZXJmbG93WFwiLCAgXCJoaWRkZW5cIik7IC8qIFNFVCAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ1NTLnNldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgXCJvdmVyZmxvd1lcIiwgIFwiaGlkZGVuXCIpOyAvKiBTRVQgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENTUy5zZXRQcm9wZXJ0eVZhbHVlKGVsZW1lbnQsIFwiYm94U2l6aW5nXCIsICBcImNvbnRlbnQtYm94XCIpOyAvKiBTRVQgKi9cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ1NTLnNldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgXCJtaW5XaWR0aFwiLCBtZWFzdXJlbWVudCArIFwiJVwiKTsgLyogU0VUICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDU1Muc2V0UHJvcGVydHlWYWx1ZShlbGVtZW50LCBcIm1heFdpZHRoXCIsIG1lYXN1cmVtZW50ICsgXCIlXCIpOyAvKiBTRVQgKi9cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ1NTLnNldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgXCJtaW5IZWlnaHRcIiwgIG1lYXN1cmVtZW50ICsgXCIlXCIpOyAvKiBTRVQgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENTUy5zZXRQcm9wZXJ0eVZhbHVlKGVsZW1lbnQsIFwibWF4SGVpZ2h0XCIsICBtZWFzdXJlbWVudCArIFwiJVwiKTsgLyogU0VUICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDU1Muc2V0UHJvcGVydHlWYWx1ZShlbGVtZW50LCBcIndpZHRoXCIsIG1lYXN1cmVtZW50ICsgXCIlXCIpOyAvKiBTRVQgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ1NTLnNldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgXCJoZWlnaHRcIiwgIG1lYXN1cmVtZW50ICsgXCIlXCIpOyAvKiBTRVQgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2FtZUJhc2VFbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50VW5pdFJhdGlvcy5lbVRvUHggPSB1bml0Q29udmVyc2lvblJhdGlvcy5sYXN0RW1Ub1B4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIURhdGEoZWxlbWVudCkuaXNTVkcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ1NTLnNldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgXCJwYWRkaW5nTGVmdFwiLCBtZWFzdXJlbWVudCArIFwiZW1cIik7IC8qIFNFVCAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIFRoZSBmb2xsb3dpbmcgcGl4ZWwtdmFsdWUgR0VUcyBjYW5ub3QgYmUgYmF0Y2hlZCB3aXRoIHRoZSBwcmlvciBHRVRzIHNpbmNlIHRoZXkgZGVwZW5kIHVwb24gdGhlIHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBvcmFyaWx5IHNldCBpbW1lZGlhdGVseSBhYm92ZTsgbGF5b3V0IHRocmFzaGluZyBjYW5ub3QgYmUgYXZvaWRlZCBoZXJlLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2FtZUJhc2VQZXJjZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIERpdmlkZSB0aGUgcmV0dXJuZWQgdmFsdWUgYnkgdGhlIG1lYXN1cmVtZW50IHZhbHVlIHRvIGdldCB0aGUgcmF0aW8gYmV0d2VlbiAxJSBhbmQgMXB4LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZWZhdWx0IHRvIDEgc2luY2UgY29udmVyc2lvbiBsb2dpYyB1c2luZyAwIGNhbiBwcm9kdWNlIEluZmluaXRlLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50VW5pdFJhdGlvcy5wZXJjZW50VG9QeFJhdGlvV2lkdGggPSB1bml0Q29udmVyc2lvblJhdGlvcy5sYXN0UGVyY2VudFRvUHhXaWR0aCA9IChwYXJzZUZsb2F0KENTUy5nZXRQcm9wZXJ0eVZhbHVlKGVsZW1lbnQsIFwid2lkdGhcIiwgbnVsbCwgdHJ1ZSkpIHx8IDEpIC8gbWVhc3VyZW1lbnQ7IC8qIEdFVCAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50VW5pdFJhdGlvcy5wZXJjZW50VG9QeFJhdGlvSGVpZ2h0ID0gdW5pdENvbnZlcnNpb25SYXRpb3MubGFzdFBlcmNlbnRUb1B4SGVpZ2h0ID0gKHBhcnNlRmxvYXQoQ1NTLmdldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgXCJoZWlnaHRcIiwgbnVsbCwgdHJ1ZSkpIHx8IDEpIC8gbWVhc3VyZW1lbnQ7IC8qIEdFVCAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2FtZUJhc2VFbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50VW5pdFJhdGlvcy5lbVRvUHggPSB1bml0Q29udmVyc2lvblJhdGlvcy5sYXN0RW1Ub1B4ID0gKHBhcnNlRmxvYXQoQ1NTLmdldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgXCJwYWRkaW5nTGVmdFwiKSkgfHwgMSkgLyBtZWFzdXJlbWVudDsgLyogR0VUICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogUmV2ZXJ0IGVhY2ggdXNlZCB0ZXN0IHByb3BlcnR5IHRvIGl0cyBvcmlnaW5hbCB2YWx1ZS4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBvcmlnaW5hbFZhbHVlUHJvcGVydHkgaW4gb3JpZ2luYWxWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsVmFsdWVzW29yaWdpbmFsVmFsdWVQcm9wZXJ0eV0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENTUy5zZXRQcm9wZXJ0eVZhbHVlKGVsZW1lbnQsIG9yaWdpbmFsVmFsdWVQcm9wZXJ0eSwgb3JpZ2luYWxWYWx1ZXNbb3JpZ2luYWxWYWx1ZVByb3BlcnR5XSk7IC8qIFNFVHMgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIFNWRyBkaW1lbnNpb25zIGRvIG5vdCBhY2NlcHQgYW4gXCJhdXRvXCIgdmFsdWUsIHNvIHdlIHNraXAgdGhpcyByZXNldCBwcm9jZXNzIGZvciB0aGVtLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghRGF0YShlbGVtZW50KS5pc1NWRykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBJbiBJRSwgcmV2ZXJ0IHRvIFwiYXV0b1wiIGZvciB3aWR0aCBhbmQgaGVpZ2h0IGlmIGl0IHdhcyBvcmlnaW5hbGx5IHNldC4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKElFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNJRVdpZHRoQXV0bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENTUy5zZXRQcm9wZXJ0eVZhbHVlKGVsZW1lbnQsIFwid2lkdGhcIiwgXCJhdXRvXCIpOyAvKiBTRVQgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzSUVIZWlnaHRBdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ1NTLnNldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgXCJoZWlnaHRcIiwgXCJhdXRvXCIpOyAvKiBTRVQgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogRm9yIG90aGVyIGJyb3dzZXJzLCBhZGRpdGlvbmFsIGxheW91dCB0aHJhc2hpbmcgbXVzdCB1bmZvcnR1bmF0ZWx5IGJlIHRyaWdnZXJlZCB0byBkZXRlcm1pbmUgd2hldGhlciBhIGRpbWVuc2lvbiBwcm9wZXJ0eSB3YXMgb3JpZ2luYWxseSBcImF1dG9cIi4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIFNldCBoZWlnaHQgdG8gXCJhdXRvXCIgdGhlbiBjb21wYXJlIHRoZSByZXR1cm5lZCB2YWx1ZSBhZ2FpbnN0IHRoZSBlbGVtZW50J3MgY3VycmVudCBoZWlnaHQgdmFsdWUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJZiB0aGV5J3JlIGlkZW50aWNhbCwgbGVhdmUgaGVpZ2h0IHNldCB0byBcImF1dG9cIi4gSWYgdGhleSdyZSBkaWZmZXJlbnQsIHRoZW4gXCJhdXRvXCIgd2Fzbid0IG9yaWdpbmFsbHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldCBvbiB0aGUgZWxlbWVudCBwcmlvciB0byBvdXIgY29udmVyc2lvbnMsIGFuZCB3ZSByZXZlcnQgaXQgdG8gaXRzIGFjdHVhbCB2YWx1ZS4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIE5vdGU6IFRoZSBmb2xsb3dpbmcgR0VUcyBhbmQgU0VUcyBjYW5ub3QgYmUgYmF0Y2hlZCB0b2dldGhlciBkdWUgdG8gdGhlIGNyb3NzLWVmZmVjdCBzZXR0aW5nIG9uZSBheGlzIHRvIFwiYXV0b1wiIGhhcyBvbiB0aGUgb3RoZXIuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDU1Muc2V0UHJvcGVydHlWYWx1ZShlbGVtZW50LCBcImhlaWdodFwiLCBcImF1dG9cIik7IC8qIFNFVCAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsVmFsdWVzLmhlaWdodCAhPT0gQ1NTLmdldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgXCJoZWlnaHRcIiwgbnVsbCwgdHJ1ZSkpIHsgLyogR0VUICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ1NTLnNldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgXCJoZWlnaHRcIiwgb3JpZ2luYWxWYWx1ZXMuaGVpZ2h0KTsgLyogU0VUICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENTUy5zZXRQcm9wZXJ0eVZhbHVlKGVsZW1lbnQsIFwid2lkdGhcIiwgXCJhdXRvXCIpOyAvKiBTRVQgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbFZhbHVlcy53aWR0aCAhPT0gQ1NTLmdldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgXCJ3aWR0aFwiLCBudWxsLCB0cnVlKSkgeyAvKiBHRVQgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDU1Muc2V0UHJvcGVydHlWYWx1ZShlbGVtZW50LCBcIndpZHRoXCIsIG9yaWdpbmFsVmFsdWVzLndpZHRoKTsgLyogU0VUICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoVmVsb2NpdHkuZGVidWcgPj0gMSkgY29uc29sZS5sb2coXCJVbml0IHJhdGlvczogXCIgKyBKU09OLnN0cmluZ2lmeShlbGVtZW50VW5pdFJhdGlvcyksIGVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRVbml0UmF0aW9zO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBUaGUgKiBhbmQgLyBvcGVyYXRvcnMsIHdoaWNoIGFyZSBub3QgcGFzc2VkIGluIHdpdGggYW4gYXNzb2NpYXRlZCB1bml0LCBpbmhlcmVudGx5IHVzZSBzdGFydFZhbHVlJ3MgdW5pdC4gU2tpcCB2YWx1ZSBhbmQgdW5pdCBjb252ZXJzaW9uLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC9bXFwvKl0vLnRlc3Qob3BlcmF0b3IpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kVmFsdWVVbml0VHlwZSA9IHN0YXJ0VmFsdWVVbml0VHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIElmIHN0YXJ0VmFsdWUgYW5kIGVuZFZhbHVlIGRpZmZlciBpbiB1bml0IHR5cGUsIGNvbnZlcnQgc3RhcnRWYWx1ZSBpbnRvIHRoZSBzYW1lIHVuaXQgdHlwZSBhcyBlbmRWYWx1ZSBzbyB0aGF0IGlmIGVuZFZhbHVlVW5pdFR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzIGEgcmVsYXRpdmUgdW5pdCAoJSwgZW0sIHJlbSksIHRoZSB2YWx1ZXMgc2V0IGR1cmluZyB0d2VlbmluZyB3aWxsIGNvbnRpbnVlIHRvIGJlIGFjY3VyYXRlbHkgcmVsYXRpdmUgZXZlbiBpZiB0aGUgbWV0cmljcyB0aGV5IGRlcGVuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgb24gYXJlIGR5bmFtaWNhbGx5IGNoYW5naW5nIGR1cmluZyB0aGUgY291cnNlIG9mIHRoZSBhbmltYXRpb24uIENvbnZlcnNlbHksIGlmIHdlIGFsd2F5cyBub3JtYWxpemVkIGludG8gcHggYW5kIHVzZWQgcHggZm9yIHNldHRpbmcgdmFsdWVzLCB0aGUgcHggcmF0aW9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvdWxkIGJlY29tZSBzdGFsZSBpZiB0aGUgb3JpZ2luYWwgdW5pdCBiZWluZyBhbmltYXRlZCB0b3dhcmQgd2FzIHJlbGF0aXZlIGFuZCB0aGUgdW5kZXJseWluZyBtZXRyaWNzIGNoYW5nZSBkdXJpbmcgdGhlIGFuaW1hdGlvbi4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIFNpbmNlIDAgaXMgMCBpbiBhbnkgdW5pdCB0eXBlLCBubyBjb252ZXJzaW9uIGlzIG5lY2Vzc2FyeSB3aGVuIHN0YXJ0VmFsdWUgaXMgMCAtLSB3ZSBqdXN0IHN0YXJ0IGF0IDAgd2l0aCBlbmRWYWx1ZVVuaXRUeXBlLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgoc3RhcnRWYWx1ZVVuaXRUeXBlICE9PSBlbmRWYWx1ZVVuaXRUeXBlKSAmJiBzdGFydFZhbHVlICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogVW5pdCBjb252ZXJzaW9uIGlzIGFsc28gc2tpcHBlZCB3aGVuIGVuZFZhbHVlIGlzIDAsIGJ1dCAqc3RhcnRWYWx1ZVVuaXRUeXBlKiBtdXN0IGJlIHVzZWQgZm9yIHR3ZWVuIHZhbHVlcyB0byByZW1haW4gYWNjdXJhdGUuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogTm90ZTogU2tpcHBpbmcgdW5pdCBjb252ZXJzaW9uIGhlcmUgbWVhbnMgdGhhdCBpZiBlbmRWYWx1ZVVuaXRUeXBlIHdhcyBvcmlnaW5hbGx5IGEgcmVsYXRpdmUgdW5pdCwgdGhlIGFuaW1hdGlvbiB3b24ndCByZWxhdGl2ZWx5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2ggdGhlIHVuZGVybHlpbmcgbWV0cmljcyBpZiB0aGV5IGNoYW5nZSwgYnV0IHRoaXMgaXMgYWNjZXB0YWJsZSBzaW5jZSB3ZSdyZSBhbmltYXRpbmcgdG93YXJkIGludmlzaWJpbGl0eSBpbnN0ZWFkIG9mIHRvd2FyZCB2aXNpYmlsaXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWNoIHJlbWFpbnMgcGFzdCB0aGUgcG9pbnQgb2YgdGhlIGFuaW1hdGlvbidzIGNvbXBsZXRpb24uICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVuZFZhbHVlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZFZhbHVlVW5pdFR5cGUgPSBzdGFydFZhbHVlVW5pdFR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogQnkgdGhpcyBwb2ludCwgd2UgY2Fubm90IGF2b2lkIHVuaXQgY29udmVyc2lvbiAoaXQncyB1bmRlc2lyYWJsZSBzaW5jZSBpdCBjYXVzZXMgbGF5b3V0IHRocmFzaGluZykuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElmIHdlIGhhdmVuJ3QgYWxyZWFkeSwgd2UgdHJpZ2dlciBjYWxjdWxhdGVVbml0UmF0aW9zKCksIHdoaWNoIHJ1bnMgb25jZSBwZXIgZWxlbWVudCBwZXIgY2FsbC4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudFVuaXRSYXRpb3MgPSBlbGVtZW50VW5pdFJhdGlvcyB8fCBjYWxjdWxhdGVVbml0UmF0aW9zKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogVGhlIGZvbGxvd2luZyBSZWdFeCBtYXRjaGVzIENTUyBwcm9wZXJ0aWVzIHRoYXQgaGF2ZSB0aGVpciAlIHZhbHVlcyBtZWFzdXJlZCByZWxhdGl2ZSB0byB0aGUgeC1heGlzLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBOb3RlOiBXM0Mgc3BlYyBtYW5kYXRlcyB0aGF0IGFsbCBvZiBtYXJnaW4gYW5kIHBhZGRpbmcncyBwcm9wZXJ0aWVzIChldmVuIHRvcCBhbmQgYm90dG9tKSBhcmUgJS1yZWxhdGl2ZSB0byB0aGUgKndpZHRoKiBvZiB0aGUgcGFyZW50IGVsZW1lbnQuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBheGlzID0gKC9tYXJnaW58cGFkZGluZ3xsZWZ0fHJpZ2h0fHdpZHRofHRleHR8d29yZHxsZXR0ZXIvaS50ZXN0KHByb3BlcnR5KSB8fCAvWCQvLnRlc3QocHJvcGVydHkpKSA/IFwieFwiIDogXCJ5XCI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogSW4gb3JkZXIgdG8gYXZvaWQgZ2VuZXJhdGluZyBuXjIgYmVzcG9rZSBjb252ZXJzaW9uIGZ1bmN0aW9ucywgdW5pdCBjb252ZXJzaW9uIGlzIGEgdHdvLXN0ZXAgcHJvY2VzczpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMSkgQ29udmVydCBzdGFydFZhbHVlIGludG8gcGl4ZWxzLiAyKSBDb252ZXJ0IHRoaXMgbmV3IHBpeGVsIHZhbHVlIGludG8gZW5kVmFsdWUncyB1bml0IHR5cGUuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoc3RhcnRWYWx1ZVVuaXRUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiJVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIE5vdGU6IHRyYW5zbGF0ZVggYW5kIHRyYW5zbGF0ZVkgYXJlIHRoZSBvbmx5IHByb3BlcnRpZXMgdGhhdCBhcmUgJS1yZWxhdGl2ZSB0byBhbiBlbGVtZW50J3Mgb3duIGRpbWVuc2lvbnMgLS0gbm90IGl0cyBwYXJlbnQncyBkaW1lbnNpb25zLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZlbG9jaXR5IGRvZXMgbm90IGluY2x1ZGUgYSBzcGVjaWFsIGNvbnZlcnNpb24gcHJvY2VzcyB0byBhY2NvdW50IGZvciB0aGlzIGJlaGF2aW9yLiBUaGVyZWZvcmUsIGFuaW1hdGluZyB0cmFuc2xhdGVYL1kgZnJvbSBhICUgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byBhIG5vbi0lIHZhbHVlIHdpbGwgcHJvZHVjZSBhbiBpbmNvcnJlY3Qgc3RhcnQgdmFsdWUuIEZvcnR1bmF0ZWx5LCB0aGlzIHNvcnQgb2YgY3Jvc3MtdW5pdCBjb252ZXJzaW9uIGlzIHJhcmVseSBkb25lIGJ5IHVzZXJzIGluIHByYWN0aWNlLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0VmFsdWUgKj0gKGF4aXMgPT09IFwieFwiID8gZWxlbWVudFVuaXRSYXRpb3MucGVyY2VudFRvUHhSYXRpb1dpZHRoIDogZWxlbWVudFVuaXRSYXRpb3MucGVyY2VudFRvUHhSYXRpb0hlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJweFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIHB4IGFjdHMgYXMgb3VyIG1pZHBvaW50IGluIHRoZSB1bml0IGNvbnZlcnNpb24gcHJvY2VzczsgZG8gbm90aGluZy4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFZhbHVlICo9IGVsZW1lbnRVbml0UmF0aW9zW3N0YXJ0VmFsdWVVbml0VHlwZSArIFwiVG9QeFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIEludmVydCB0aGUgcHggcmF0aW9zIHRvIGNvbnZlcnQgaW50byB0byB0aGUgdGFyZ2V0IHVuaXQuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZW5kVmFsdWVVbml0VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIiVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFZhbHVlICo9IDEgLyAoYXhpcyA9PT0gXCJ4XCIgPyBlbGVtZW50VW5pdFJhdGlvcy5wZXJjZW50VG9QeFJhdGlvV2lkdGggOiBlbGVtZW50VW5pdFJhdGlvcy5wZXJjZW50VG9QeFJhdGlvSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInB4XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogc3RhcnRWYWx1ZSBpcyBhbHJlYWR5IGluIHB4LCBkbyBub3RoaW5nOyB3ZSdyZSBkb25lLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0VmFsdWUgKj0gMSAvIGVsZW1lbnRVbml0UmF0aW9zW2VuZFZhbHVlVW5pdFR5cGUgKyBcIlRvUHhcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8qKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZhbHVlIE9wZXJhdG9yc1xuICAgICAgICAgICAgICAgICAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIE9wZXJhdG9yIGxvZ2ljIG11c3QgYmUgcGVyZm9ybWVkIGxhc3Qgc2luY2UgaXQgcmVxdWlyZXMgdW5pdC1ub3JtYWxpemVkIHN0YXJ0IGFuZCBlbmQgdmFsdWVzLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgLyogTm90ZTogUmVsYXRpdmUgKnBlcmNlbnQgdmFsdWVzKiBkbyBub3QgYmVoYXZlIGhvdyBtb3N0IHBlb3BsZSB0aGluazsgd2hpbGUgb25lIHdvdWxkIGV4cGVjdCBcIis9NTAlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIGluY3JlYXNlIHRoZSBwcm9wZXJ0eSAxLjV4IGl0cyBjdXJyZW50IHZhbHVlLCBpdCBpbiBmYWN0IGluY3JlYXNlcyB0aGUgcGVyY2VudCB1bml0cyBpbiBhYnNvbHV0ZSB0ZXJtczpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDUwIHBvaW50cyBpcyBhZGRlZCBvbiB0b3Agb2YgdGhlIGN1cnJlbnQgJSB2YWx1ZS4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiK1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRWYWx1ZSA9IHN0YXJ0VmFsdWUgKyBlbmRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiLVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRWYWx1ZSA9IHN0YXJ0VmFsdWUgLSBlbmRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiKlwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRWYWx1ZSA9IHN0YXJ0VmFsdWUgKiBlbmRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiL1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRWYWx1ZSA9IHN0YXJ0VmFsdWUgLyBlbmRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdHdlZW5zQ29udGFpbmVyIFB1c2hcbiAgICAgICAgICAgICAgICAgICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBDb25zdHJ1Y3QgdGhlIHBlci1wcm9wZXJ0eSB0d2VlbiBvYmplY3QsIGFuZCBwdXNoIGl0IHRvIHRoZSBlbGVtZW50J3MgdHdlZW5zQ29udGFpbmVyLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgdHdlZW5zQ29udGFpbmVyW3Byb3BlcnR5XSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb290UHJvcGVydHlWYWx1ZTogcm9vdFByb3BlcnR5VmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRWYWx1ZTogc3RhcnRWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsdWU6IHN0YXJ0VmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kVmFsdWU6IGVuZFZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXRUeXBlOiBlbmRWYWx1ZVVuaXRUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVhc2luZzogZWFzaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoVmVsb2NpdHkuZGVidWcpIGNvbnNvbGUubG9nKFwidHdlZW5zQ29udGFpbmVyIChcIiArIHByb3BlcnR5ICsgXCIpOiBcIiArIEpTT04uc3RyaW5naWZ5KHR3ZWVuc0NvbnRhaW5lcltwcm9wZXJ0eV0pLCBlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8qIEFsb25nIHdpdGggaXRzIHByb3BlcnR5IGRhdGEsIHN0b3JlIGEgcmVmZXJlbmNlIHRvIHRoZSBlbGVtZW50IGl0c2VsZiBvbnRvIHR3ZWVuc0NvbnRhaW5lci4gKi9cbiAgICAgICAgICAgICAgICAgICAgdHdlZW5zQ29udGFpbmVyLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qKioqKioqKioqKioqKioqKlxuICAgICAgICAgICAgICAgICAgICBDYWxsIFB1c2hcbiAgICAgICAgICAgICAgICAqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgICAgIC8qIE5vdGU6IHR3ZWVuc0NvbnRhaW5lciBjYW4gYmUgZW1wdHkgaWYgYWxsIG9mIHRoZSBwcm9wZXJ0aWVzIGluIHRoaXMgY2FsbCdzIHByb3BlcnR5IG1hcCB3ZXJlIHNraXBwZWQgZHVlIHRvIG5vdFxuICAgICAgICAgICAgICAgICAgIGJlaW5nIHN1cHBvcnRlZCBieSB0aGUgYnJvd3Nlci4gVGhlIGVsZW1lbnQgcHJvcGVydHkgaXMgdXNlZCBmb3IgY2hlY2tpbmcgdGhhdCB0aGUgdHdlZW5zQ29udGFpbmVyIGhhcyBiZWVuIGFwcGVuZGVkIHRvLiAqL1xuICAgICAgICAgICAgICAgIGlmICh0d2VlbnNDb250YWluZXIuZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAvKiBBcHBseSB0aGUgXCJ2ZWxvY2l0eS1hbmltYXRpbmdcIiBpbmRpY2F0b3IgY2xhc3MuICovXG4gICAgICAgICAgICAgICAgICAgIENTUy5WYWx1ZXMuYWRkQ2xhc3MoZWxlbWVudCwgXCJ2ZWxvY2l0eS1hbmltYXRpbmdcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgLyogVGhlIGNhbGwgYXJyYXkgaG91c2VzIHRoZSB0d2VlbnNDb250YWluZXJzIGZvciBlYWNoIGVsZW1lbnQgYmVpbmcgYW5pbWF0ZWQgaW4gdGhlIGN1cnJlbnQgY2FsbC4gKi9cbiAgICAgICAgICAgICAgICAgICAgY2FsbC5wdXNoKHR3ZWVuc0NvbnRhaW5lcik7XG5cbiAgICAgICAgICAgICAgICAgICAgLyogU3RvcmUgdGhlIHR3ZWVuc0NvbnRhaW5lciBvbiB0aGUgZWxlbWVudCwgcGx1cyB0aGUgY3VycmVudCBjYWxsJ3Mgb3B0cyBzbyB0aGF0IFZlbG9jaXR5IGNhbiByZWZlcmVuY2UgdGhpcyBkYXRhIHRoZSBuZXh0IHRpbWUgdGhpcyBlbGVtZW50IGlzIGFuaW1hdGVkLiAqL1xuICAgICAgICAgICAgICAgICAgICBEYXRhKGVsZW1lbnQpLnR3ZWVuc0NvbnRhaW5lciA9IHR3ZWVuc0NvbnRhaW5lcjtcbiAgICAgICAgICAgICAgICAgICAgRGF0YShlbGVtZW50KS5vcHRzID0gb3B0cztcbiAgICAgICAgICAgICAgICAgICAgLyogU3dpdGNoIG9uIHRoZSBlbGVtZW50J3MgYW5pbWF0aW5nIGZsYWcuICovXG4gICAgICAgICAgICAgICAgICAgIERhdGEoZWxlbWVudCkuaXNBbmltYXRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qIE9uY2UgdGhlIGZpbmFsIGVsZW1lbnQgaW4gdGhpcyBjYWxsJ3MgZWxlbWVudCBzZXQgaGFzIGJlZW4gcHJvY2Vzc2VkLCBwdXNoIHRoZSBjYWxsIGFycmF5IG9udG9cbiAgICAgICAgICAgICAgICAgICAgICAgVmVsb2NpdHkuU3RhdGUuY2FsbHMgZm9yIHRoZSBhbmltYXRpb24gdGljayB0byBpbW1lZGlhdGVseSBiZWdpbiBwcm9jZXNzaW5nLiAqL1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudHNJbmRleCA9PT0gZWxlbWVudHNMZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBUbyBzcGVlZCB1cCBpdGVyYXRpbmcgb3ZlciB0aGlzIGFycmF5LCBpdCBpcyBjb21wYWN0ZWQgKGZhbHNleSBpdGVtcyAtLSBjYWxscyB0aGF0IGhhdmUgY29tcGxldGVkIC0tIGFyZSByZW1vdmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlbiBpdHMgbGVuZ3RoIGhhcyBiYWxsb29uZWQgdG8gYSBwb2ludCB0aGF0IGNhbiBpbXBhY3QgdGljayBwZXJmb3JtYW5jZS4gVGhpcyBvbmx5IGJlY29tZXMgbmVjZXNzYXJ5IHdoZW4gYW5pbWF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBoYXMgYmVlbiBjb250aW51b3VzIHdpdGggbWFueSBlbGVtZW50cyBvdmVyIGEgbG9uZyBwZXJpb2Qgb2YgdGltZTsgd2hlbmV2ZXIgYWxsIGFjdGl2ZSBjYWxscyBhcmUgY29tcGxldGVkLCBjb21wbGV0ZUNhbGwoKSBjbGVhcnMgVmVsb2NpdHkuU3RhdGUuY2FsbHMuICovXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoVmVsb2NpdHkuU3RhdGUuY2FsbHMubGVuZ3RoID4gMTAwMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBWZWxvY2l0eS5TdGF0ZS5jYWxscyA9IGNvbXBhY3RTcGFyc2VBcnJheShWZWxvY2l0eS5TdGF0ZS5jYWxscyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIEFkZCB0aGUgY3VycmVudCBjYWxsIHBsdXMgaXRzIGFzc29jaWF0ZWQgbWV0YWRhdGEgKHRoZSBlbGVtZW50IHNldCBhbmQgdGhlIGNhbGwncyBvcHRpb25zKSBvbnRvIHRoZSBnbG9iYWwgY2FsbCBjb250YWluZXIuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBBbnl0aGluZyBvbiB0aGlzIGNhbGwgY29udGFpbmVyIGlzIHN1YmplY3RlZCB0byB0aWNrKCkgcHJvY2Vzc2luZy4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIFZlbG9jaXR5LlN0YXRlLmNhbGxzLnB1c2goWyBjYWxsLCBlbGVtZW50cywgb3B0cywgbnVsbCwgcHJvbWlzZURhdGEucmVzb2x2ZXIgXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIElmIHRoZSBhbmltYXRpb24gdGljayBpc24ndCBydW5uaW5nLCBzdGFydCBpdC4gKFZlbG9jaXR5IHNodXRzIGl0IG9mZiB3aGVuIHRoZXJlIGFyZSBubyBhY3RpdmUgY2FsbHMgdG8gcHJvY2Vzcy4pICovXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoVmVsb2NpdHkuU3RhdGUuaXNUaWNraW5nID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZlbG9jaXR5LlN0YXRlLmlzVGlja2luZyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBTdGFydCB0aGUgdGljayBsb29wLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzSW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogV2hlbiB0aGUgcXVldWUgb3B0aW9uIGlzIHNldCB0byBmYWxzZSwgdGhlIGNhbGwgc2tpcHMgdGhlIGVsZW1lbnQncyBxdWV1ZSBhbmQgZmlyZXMgaW1tZWRpYXRlbHkuICovXG4gICAgICAgICAgICBpZiAob3B0cy5xdWV1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAvKiBTaW5jZSB0aGlzIGJ1aWxkUXVldWUgY2FsbCBkb2Vzbid0IHJlc3BlY3QgdGhlIGVsZW1lbnQncyBleGlzdGluZyBxdWV1ZSAod2hpY2ggaXMgd2hlcmUgYSBkZWxheSBvcHRpb24gd291bGQgaGF2ZSBiZWVuIGFwcGVuZGVkKSxcbiAgICAgICAgICAgICAgICAgICB3ZSBtYW51YWxseSBpbmplY3QgdGhlIGRlbGF5IHByb3BlcnR5IGhlcmUgd2l0aCBhbiBleHBsaWNpdCBzZXRUaW1lb3V0LiAqL1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLmRlbGF5KSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoYnVpbGRRdWV1ZSwgb3B0cy5kZWxheSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRRdWV1ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qIE90aGVyd2lzZSwgdGhlIGNhbGwgdW5kZXJnb2VzIGVsZW1lbnQgcXVldWVpbmcgYXMgbm9ybWFsLiAqL1xuICAgICAgICAgICAgLyogTm90ZTogVG8gaW50ZXJvcGVyYXRlIHdpdGggalF1ZXJ5LCBWZWxvY2l0eSB1c2VzIGpRdWVyeSdzIG93biAkLnF1ZXVlKCkgc3RhY2sgZm9yIHF1ZXVpbmcgbG9naWMuICovXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQucXVldWUoZWxlbWVudCwgb3B0cy5xdWV1ZSwgZnVuY3Rpb24obmV4dCwgY2xlYXJRdWV1ZSkge1xuICAgICAgICAgICAgICAgICAgICAvKiBJZiB0aGUgY2xlYXJRdWV1ZSBmbGFnIHdhcyBwYXNzZWQgaW4gYnkgdGhlIHN0b3AgY29tbWFuZCwgcmVzb2x2ZSB0aGlzIGNhbGwncyBwcm9taXNlLiAoUHJvbWlzZXMgY2FuIG9ubHkgYmUgcmVzb2x2ZWQgb25jZSxcbiAgICAgICAgICAgICAgICAgICAgICAgc28gaXQncyBmaW5lIGlmIHRoaXMgaXMgcmVwZWF0ZWRseSB0cmlnZ2VyZWQgZm9yIGVhY2ggZWxlbWVudCBpbiB0aGUgYXNzb2NpYXRlZCBjYWxsLikgKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsZWFyUXVldWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9taXNlRGF0YS5wcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZURhdGEucmVzb2x2ZXIoZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBEbyBub3QgY29udGludWUgd2l0aCBhbmltYXRpb24gcXVldWVpbmcuICovXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLyogVGhpcyBmbGFnIGluZGljYXRlcyB0byB0aGUgdXBjb21pbmcgY29tcGxldGVDYWxsKCkgZnVuY3Rpb24gdGhhdCB0aGlzIHF1ZXVlIGVudHJ5IHdhcyBpbml0aWF0ZWQgYnkgVmVsb2NpdHkuXG4gICAgICAgICAgICAgICAgICAgICAgIFNlZSBjb21wbGV0ZUNhbGwoKSBmb3IgZnVydGhlciBkZXRhaWxzLiAqL1xuICAgICAgICAgICAgICAgICAgICBWZWxvY2l0eS52ZWxvY2l0eVF1ZXVlRW50cnlGbGFnID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICBidWlsZFF1ZXVlKG5leHQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgICAgICAgQXV0by1EZXF1ZXVpbmdcbiAgICAgICAgICAgICoqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyogQXMgcGVyIGpRdWVyeSdzICQucXVldWUoKSBiZWhhdmlvciwgdG8gZmlyZSB0aGUgZmlyc3Qgbm9uLWN1c3RvbS1xdWV1ZSBlbnRyeSBvbiBhbiBlbGVtZW50LCB0aGUgZWxlbWVudFxuICAgICAgICAgICAgICAgbXVzdCBiZSBkZXF1ZXVlZCBpZiBpdHMgcXVldWUgc3RhY2sgY29uc2lzdHMgKnNvbGVseSogb2YgdGhlIGN1cnJlbnQgY2FsbC4gKFRoaXMgY2FuIGJlIGRldGVybWluZWQgYnkgY2hlY2tpbmdcbiAgICAgICAgICAgICAgIGZvciB0aGUgXCJpbnByb2dyZXNzXCIgaXRlbSB0aGF0IGpRdWVyeSBwcmVwZW5kcyB0byBhY3RpdmUgcXVldWUgc3RhY2sgYXJyYXlzLikgUmVnYXJkbGVzcywgd2hlbmV2ZXIgdGhlIGVsZW1lbnQnc1xuICAgICAgICAgICAgICAgcXVldWUgaXMgZnVydGhlciBhcHBlbmRlZCB3aXRoIGFkZGl0aW9uYWwgaXRlbXMgLS0gaW5jbHVkaW5nICQuZGVsYXkoKSdzIG9yIGV2ZW4gJC5hbmltYXRlKCkgY2FsbHMsIHRoZSBxdWV1ZSdzXG4gICAgICAgICAgICAgICBmaXJzdCBlbnRyeSBpcyBhdXRvbWF0aWNhbGx5IGZpcmVkLiBUaGlzIGJlaGF2aW9yIGNvbnRyYXN0cyB0aGF0IG9mIGN1c3RvbSBxdWV1ZXMsIHdoaWNoIG5ldmVyIGF1dG8tZmlyZS4gKi9cbiAgICAgICAgICAgIC8qIE5vdGU6IFdoZW4gYW4gZWxlbWVudCBzZXQgaXMgYmVpbmcgc3ViamVjdGVkIHRvIGEgbm9uLXBhcmFsbGVsIFZlbG9jaXR5IGNhbGwsIHRoZSBhbmltYXRpb24gd2lsbCBub3QgYmVnaW4gdW50aWxcbiAgICAgICAgICAgICAgIGVhY2ggb25lIG9mIHRoZSBlbGVtZW50cyBpbiB0aGUgc2V0IGhhcyByZWFjaGVkIHRoZSBlbmQgb2YgaXRzIGluZGl2aWR1YWxseSBwcmUtZXhpc3RpbmcgcXVldWUgY2hhaW4uICovXG4gICAgICAgICAgICAvKiBOb3RlOiBVbmZvcnR1bmF0ZWx5LCBtb3N0IHBlb3BsZSBkb24ndCBmdWxseSBncmFzcCBqUXVlcnkncyBwb3dlcmZ1bCwgeWV0IHF1aXJreSwgJC5xdWV1ZSgpIGZ1bmN0aW9uLlxuICAgICAgICAgICAgICAgTGVhbiBtb3JlIGhlcmU6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTA1ODE1OC9jYW4tc29tZWJvZHktZXhwbGFpbi1qcXVlcnktcXVldWUtdG8tbWUgKi9cbiAgICAgICAgICAgIGlmICgob3B0cy5xdWV1ZSA9PT0gXCJcIiB8fCBvcHRzLnF1ZXVlID09PSBcImZ4XCIpICYmICQucXVldWUoZWxlbWVudClbMF0gIT09IFwiaW5wcm9ncmVzc1wiKSB7XG4gICAgICAgICAgICAgICAgJC5kZXF1ZXVlKGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgIEVsZW1lbnQgU2V0IEl0ZXJhdGlvblxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKiBJZiB0aGUgXCJub2RlVHlwZVwiIHByb3BlcnR5IGV4aXN0cyBvbiB0aGUgZWxlbWVudHMgdmFyaWFibGUsIHdlJ3JlIGFuaW1hdGluZyBhIHNpbmdsZSBlbGVtZW50LlxuICAgICAgICAgICBQbGFjZSBpdCBpbiBhbiBhcnJheSBzbyB0aGF0ICQuZWFjaCgpIGNhbiBpdGVyYXRlIG92ZXIgaXQuICovXG4gICAgICAgICQuZWFjaChUeXBlLmlzTm9kZShlbGVtZW50cykgPyBbIGVsZW1lbnRzIF0gOiBlbGVtZW50cywgZnVuY3Rpb24oaSwgZWxlbWVudCkge1xuICAgICAgICAgICAgLyogRW5zdXJlIGVhY2ggZWxlbWVudCBpbiBhIHNldCBoYXMgYSBub2RlVHlwZSAoaXMgYSByZWFsIGVsZW1lbnQpIHRvIGF2b2lkIHRocm93aW5nIGVycm9ycy4gKi9cbiAgICAgICAgICAgIGlmIChUeXBlLmlzTm9kZShlbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIHByb2Nlc3NFbGVtZW50LmNhbGwoZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKioqKioqKioqKioqKioqKipcbiAgICAgICAgICAgT3B0aW9uOiBMb29wXG4gICAgICAgICoqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKiBUaGUgbG9vcCBvcHRpb24gYWNjZXB0cyBhbiBpbnRlZ2VyIGluZGljYXRpbmcgaG93IG1hbnkgdGltZXMgdGhlIGVsZW1lbnQgc2hvdWxkIGxvb3AgYmV0d2VlbiB0aGUgdmFsdWVzIGluIHRoZVxuICAgICAgICAgICBjdXJyZW50IGNhbGwncyBwcm9wZXJ0aWVzIG1hcCBhbmQgdGhlIGVsZW1lbnQncyBwcm9wZXJ0eSB2YWx1ZXMgcHJpb3IgdG8gdGhpcyBjYWxsLiAqL1xuICAgICAgICAvKiBOb3RlOiBUaGUgbG9vcCBvcHRpb24ncyBsb2dpYyBpcyBwZXJmb3JtZWQgaGVyZSAtLSBhZnRlciBlbGVtZW50IHByb2Nlc3NpbmcgLS0gYmVjYXVzZSB0aGUgY3VycmVudCBjYWxsIG5lZWRzXG4gICAgICAgICAgIHRvIHVuZGVyZ28gaXRzIHF1ZXVlIGluc2VydGlvbiBwcmlvciB0byB0aGUgbG9vcCBvcHRpb24gZ2VuZXJhdGluZyBpdHMgc2VyaWVzIG9mIGNvbnN0aXR1ZW50IFwicmV2ZXJzZVwiIGNhbGxzLFxuICAgICAgICAgICB3aGljaCBjaGFpbiBhZnRlciB0aGUgY3VycmVudCBjYWxsLiBUd28gcmV2ZXJzZSBjYWxscyAodHdvIFwiYWx0ZXJuYXRpb25zXCIpIGNvbnN0aXR1dGUgb25lIGxvb3AuICovXG4gICAgICAgIHZhciBvcHRzID0gJC5leHRlbmQoe30sIFZlbG9jaXR5LmRlZmF1bHRzLCBvcHRpb25zKSxcbiAgICAgICAgICAgIHJldmVyc2VDYWxsc0NvdW50O1xuXG4gICAgICAgIG9wdHMubG9vcCA9IHBhcnNlSW50KG9wdHMubG9vcCk7XG4gICAgICAgIHJldmVyc2VDYWxsc0NvdW50ID0gKG9wdHMubG9vcCAqIDIpIC0gMTtcblxuICAgICAgICBpZiAob3B0cy5sb29wKSB7XG4gICAgICAgICAgICAvKiBEb3VibGUgdGhlIGxvb3AgY291bnQgdG8gY29udmVydCBpdCBpbnRvIGl0cyBhcHByb3ByaWF0ZSBudW1iZXIgb2YgXCJyZXZlcnNlXCIgY2FsbHMuXG4gICAgICAgICAgICAgICBTdWJ0cmFjdCAxIGZyb20gdGhlIHJlc3VsdGluZyB2YWx1ZSBzaW5jZSB0aGUgY3VycmVudCBjYWxsIGlzIGluY2x1ZGVkIGluIHRoZSB0b3RhbCBhbHRlcm5hdGlvbiBjb3VudC4gKi9cbiAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgcmV2ZXJzZUNhbGxzQ291bnQ7IHgrKykge1xuICAgICAgICAgICAgICAgIC8qIFNpbmNlIHRoZSBsb2dpYyBmb3IgdGhlIHJldmVyc2UgYWN0aW9uIG9jY3VycyBpbnNpZGUgUXVldWVpbmcgYW5kIHRoZXJlZm9yZSB0aGlzIGNhbGwncyBvcHRpb25zIG9iamVjdFxuICAgICAgICAgICAgICAgICAgIGlzbid0IHBhcnNlZCB1bnRpbCB0aGVuIGFzIHdlbGwsIHRoZSBjdXJyZW50IGNhbGwncyBkZWxheSBvcHRpb24gbXVzdCBiZSBleHBsaWNpdGx5IHBhc3NlZCBpbnRvIHRoZSByZXZlcnNlXG4gICAgICAgICAgICAgICAgICAgY2FsbCBzbyB0aGF0IHRoZSBkZWxheSBsb2dpYyB0aGF0IG9jY3VycyBpbnNpZGUgKlByZS1RdWV1ZWluZyogY2FuIHByb2Nlc3MgaXQuICovXG4gICAgICAgICAgICAgICAgdmFyIHJldmVyc2VPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICBkZWxheTogb3B0cy5kZWxheVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAvKiBJZiBhIGNvbXBsZXRlIGNhbGxiYWNrIHdhcyBwYXNzZWQgaW50byB0aGlzIGNhbGwsIHRyYW5zZmVyIGl0IHRvIHRoZSBsb29wIHNlcXVlbmNlJ3MgZmluYWwgXCJyZXZlcnNlXCIgY2FsbFxuICAgICAgICAgICAgICAgICAgIHNvIHRoYXQgaXQncyB0cmlnZ2VyZWQgd2hlbiB0aGUgZW50aXJlIHNlcXVlbmNlIGlzIGNvbXBsZXRlIChhbmQgbm90IHdoZW4gdGhlIHZlcnkgZmlyc3QgYW5pbWF0aW9uIGlzIGNvbXBsZXRlKS4gKi9cbiAgICAgICAgICAgICAgICBpZiAob3B0cy5jb21wbGV0ZSAmJiAoeCA9PT0gcmV2ZXJzZUNhbGxzQ291bnQgLSAxKSkge1xuICAgICAgICAgICAgICAgICAgICByZXZlcnNlT3B0aW9ucy5jb21wbGV0ZSA9IG9wdHMuY29tcGxldGU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgVmVsb2NpdHkuYW5pbWF0ZShlbGVtZW50cywgXCJyZXZlcnNlXCIsIHJldmVyc2VPcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKioqKioqKioqKioqKipcbiAgICAgICAgICAgIENoYWluaW5nXG4gICAgICAgICoqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKiBSZXR1cm4gdGhlIGVsZW1lbnRzIGJhY2sgdG8gdGhlIGNhbGwgY2hhaW4sIHdpdGggd3JhcHBlZCBlbGVtZW50cyB0YWtpbmcgcHJlY2VkZW5jZSBpbiBjYXNlIFZlbG9jaXR5IHdhcyBjYWxsZWQgdmlhIHRoZSAkLmZuLiBleHRlbnNpb24uICovXG4gICAgICAgIHJldHVybiBnZXRDaGFpbigpO1xuICAgIH07XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICBUaWNrIChDYWxscyBQcm9jZXNzaW5nKVxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgLyogTm90ZTogQWxsIGNhbGxzIHRvIFZlbG9jaXR5IGFyZSBwdXNoZWQgdG8gdGhlIFZlbG9jaXR5LlN0YXRlLmNhbGxzIGFycmF5LCB3aGljaCBpcyBmdWxseSBpdGVyYXRlZCB0aHJvdWdoIHVwb24gZWFjaCB0aWNrLiAqL1xuICAgIGZ1bmN0aW9uIHRpY2sgKHRpbWVzdGFtcCkge1xuICAgICAgICAvKiBBbiBlbXB0eSB0aW1lc3RhbXAgYXJndW1lbnQgaW5kaWNhdGVzIHRoYXQgdGhpcyBpcyB0aGUgZmlyc3QgdGljayBvY2N1cmVuY2Ugc2luY2UgdGlja2luZyB3YXMgdHVybmVkIG9uLlxuICAgICAgICAgICBXZSBsZXZlcmFnZSB0aGlzIG1ldGFkYXRhIHRvIGZ1bGx5IGlnbm9yZSB0aGUgZmlyc3QgdGljayBwYXNzIHNpbmNlIFJBRidzIGluaXRpYWwgcGFzcyBpcyBmaXJlZCB3aGVuZXZlclxuICAgICAgICAgICB0aGUgYnJvd3NlcidzIG5leHQgdGljayBzeW5jIHRpbWUgb2NjdXJzLCB3aGljaCByZXN1bHRzIGluIHRoZSBmaXJzdCBlbGVtZW50cyBzdWJqZWN0ZWQgdG8gVmVsb2NpdHlcbiAgICAgICAgICAgY2FsbHMgYmVpbmcgYW5pbWF0ZWQgb3V0IG9mIHN5bmMgd2l0aCBhbnkgZWxlbWVudHMgYW5pbWF0ZWQgaW1tZWRpYXRlbHkgdGhlcmVhZnRlci4gSW4gc2hvcnQsIHdlIGlnbm9yZVxuICAgICAgICAgICB0aGUgZmlyc3QgUkFGIHRpY2sgcGFzcyBzbyB0aGF0IGVsZW1lbnRzIGJlaW5nIGltbWVkaWF0ZWx5IGNvbnNlY3V0aXZlbHkgYW5pbWF0ZWQgLS0gaW5zdGVhZCBvZiBzaW11bHRhbmVvdXNseSBhbmltYXRlZFxuICAgICAgICAgICBieSB0aGUgc2FtZSBWZWxvY2l0eSBjYWxsIC0tIGFyZSBwcm9wZXJseSBiYXRjaGVkIGludG8gdGhlIHNhbWUgaW5pdGlhbCBSQUYgdGljayBhbmQgY29uc2VxdWVudGx5IHJlbWFpbiBpbiBzeW5jIHRoZXJlYWZ0ZXIuICovXG4gICAgICAgIGlmICh0aW1lc3RhbXApIHtcbiAgICAgICAgICAgIC8qIFdlIGlnbm9yZSBSQUYncyBoaWdoIHJlc29sdXRpb24gdGltZXN0YW1wIHNpbmNlIGl0IGNhbiBiZSBzaWduaWZpY2FudGx5IG9mZnNldCB3aGVuIHRoZSBicm93c2VyIGlzXG4gICAgICAgICAgICAgICB1bmRlciBoaWdoIHN0cmVzczsgd2Ugb3B0IGZvciBjaG9wcGluZXNzIG92ZXIgYWxsb3dpbmcgdGhlIGJyb3dzZXIgdG8gZHJvcCBodWdlIGNodW5rcyBvZiBmcmFtZXMuICovXG4gICAgICAgICAgICB2YXIgdGltZUN1cnJlbnQgPSAobmV3IERhdGUpLmdldFRpbWUoKTtcblxuICAgICAgICAgICAgLyoqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgICAgICBDYWxsIEl0ZXJhdGlvblxuICAgICAgICAgICAgKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgIC8qIEl0ZXJhdGUgdGhyb3VnaCBlYWNoIGFjdGl2ZSBjYWxsLiAqL1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGNhbGxzTGVuZ3RoID0gVmVsb2NpdHkuU3RhdGUuY2FsbHMubGVuZ3RoOyBpIDwgY2FsbHNMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIC8qIFdoZW4gYSB2ZWxvY2l0eSBjYWxsIGlzIGNvbXBsZXRlZCwgaXRzIFZlbG9jaXR5LlN0YXRlLmNhbGxzIGVudHJ5IGlzIHNldCB0byBmYWxzZS4gQ29udGludWUgb24gdG8gdGhlIG5leHQgY2FsbC4gKi9cbiAgICAgICAgICAgICAgICBpZiAoIVZlbG9jaXR5LlN0YXRlLmNhbGxzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgICAgICAgICAgICBDYWxsLVdpZGUgVmFyaWFibGVzXG4gICAgICAgICAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAgICAgdmFyIGNhbGxDb250YWluZXIgPSBWZWxvY2l0eS5TdGF0ZS5jYWxsc1tpXSxcbiAgICAgICAgICAgICAgICAgICAgY2FsbCA9IGNhbGxDb250YWluZXJbMF0sXG4gICAgICAgICAgICAgICAgICAgIG9wdHMgPSBjYWxsQ29udGFpbmVyWzJdLFxuICAgICAgICAgICAgICAgICAgICB0aW1lU3RhcnQgPSBjYWxsQ29udGFpbmVyWzNdO1xuXG4gICAgICAgICAgICAgICAgLyogSWYgdGltZVN0YXJ0IGlzIHVuZGVmaW5lZCwgdGhlbiB0aGlzIGlzIHRoZSBmaXJzdCB0aW1lIHRoYXQgdGhpcyBjYWxsIGhhcyBiZWVuIHByb2Nlc3NlZCBieSB0aWNrKCkuXG4gICAgICAgICAgICAgICAgICAgV2UgYXNzaWduIHRpbWVTdGFydCBub3cgc28gdGhhdCBpdHMgdmFsdWUgaXMgYXMgY2xvc2UgdG8gdGhlIHJlYWwgYW5pbWF0aW9uIHN0YXJ0IHRpbWUgYXMgcG9zc2libGUuXG4gICAgICAgICAgICAgICAgICAgKENvbnZlcnNlbHksIGhhZCB0aW1lU3RhcnQgYmVlbiBkZWZpbmVkIHdoZW4gdGhpcyBjYWxsIHdhcyBhZGRlZCB0byBWZWxvY2l0eS5TdGF0ZS5jYWxscywgdGhlIGRlbGF5XG4gICAgICAgICAgICAgICAgICAgYmV0d2VlbiB0aGF0IHRpbWUgYW5kIG5vdyB3b3VsZCBjYXVzZSB0aGUgZmlyc3QgZmV3IGZyYW1lcyBvZiB0aGUgdHdlZW4gdG8gYmUgc2tpcHBlZCBzaW5jZVxuICAgICAgICAgICAgICAgICAgIHBlcmNlbnRDb21wbGV0ZSBpcyBjYWxjdWxhdGVkIHJlbGF0aXZlIHRvIHRpbWVTdGFydC4pICovXG4gICAgICAgICAgICAgICAgLyogRnVydGhlciwgc3VidHJhY3QgMTZtcyAodGhlIGFwcHJveGltYXRlIHJlc29sdXRpb24gb2YgUkFGKSBmcm9tIHRoZSBjdXJyZW50IHRpbWUgdmFsdWUgc28gdGhhdCB0aGVcbiAgICAgICAgICAgICAgICAgICBmaXJzdCB0aWNrIGl0ZXJhdGlvbiBpc24ndCB3YXN0ZWQgYnkgYW5pbWF0aW5nIGF0IDAlIHR3ZWVuIGNvbXBsZXRpb24sIHdoaWNoIHdvdWxkIHByb2R1Y2UgdGhlXG4gICAgICAgICAgICAgICAgICAgc2FtZSBzdHlsZSB2YWx1ZSBhcyB0aGUgZWxlbWVudCdzIGN1cnJlbnQgdmFsdWUuICovXG4gICAgICAgICAgICAgICAgaWYgKCF0aW1lU3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGltZVN0YXJ0ID0gVmVsb2NpdHkuU3RhdGUuY2FsbHNbaV1bM10gPSB0aW1lQ3VycmVudCAtIDE2O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qIFRoZSB0d2VlbidzIGNvbXBsZXRpb24gcGVyY2VudGFnZSBpcyByZWxhdGl2ZSB0byB0aGUgdHdlZW4ncyBzdGFydCB0aW1lLCBub3QgdGhlIHR3ZWVuJ3Mgc3RhcnQgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAod2hpY2ggd291bGQgcmVzdWx0IGluIHVucHJlZGljdGFibGUgdHdlZW4gZHVyYXRpb25zIHNpbmNlIEphdmFTY3JpcHQncyB0aW1lcnMgYXJlIG5vdCBwYXJ0aWN1bGFybHkgYWNjdXJhdGUpLlxuICAgICAgICAgICAgICAgICAgIEFjY29yZGluZ2x5LCB3ZSBlbnN1cmUgdGhhdCBwZXJjZW50Q29tcGxldGUgZG9lcyBub3QgZXhjZWVkIDEuICovXG4gICAgICAgICAgICAgICAgdmFyIHBlcmNlbnRDb21wbGV0ZSA9IE1hdGgubWluKCh0aW1lQ3VycmVudCAtIHRpbWVTdGFydCkgLyBvcHRzLmR1cmF0aW9uLCAxKTtcblxuICAgICAgICAgICAgICAgIC8qKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgICAgICAgICAgRWxlbWVudCBJdGVyYXRpb25cbiAgICAgICAgICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAgICAgLyogRm9yIGV2ZXJ5IGNhbGwsIGl0ZXJhdGUgdGhyb3VnaCBlYWNoIG9mIHRoZSBlbGVtZW50cyBpbiBpdHMgc2V0LiAqL1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBjYWxsTGVuZ3RoID0gY2FsbC5sZW5ndGg7IGogPCBjYWxsTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHR3ZWVuc0NvbnRhaW5lciA9IGNhbGxbal0sXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gdHdlZW5zQ29udGFpbmVyLmVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgLyogQ2hlY2sgdG8gc2VlIGlmIHRoaXMgZWxlbWVudCBoYXMgYmVlbiBkZWxldGVkIG1pZHdheSB0aHJvdWdoIHRoZSBhbmltYXRpb24gYnkgY2hlY2tpbmcgZm9yIHRoZVxuICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZWQgZXhpc3RlbmNlIG9mIGl0cyBkYXRhIGNhY2hlLiBJZiBpdCdzIGdvbmUsIHNraXAgYW5pbWF0aW5nIHRoaXMgZWxlbWVudC4gKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFEYXRhKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciB0cmFuc2Zvcm1Qcm9wZXJ0eUV4aXN0cyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgICAgICAgICAgICAgIERpc3BsYXkgJiBWaXNpYmlsaXR5IFRvZ2dsaW5nXG4gICAgICAgICAgICAgICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgICAgICAgICAgLyogSWYgdGhlIGRpc3BsYXkgb3B0aW9uIGlzIHNldCB0byBub24tXCJub25lXCIsIHNldCBpdCB1cGZyb250IHNvIHRoYXQgdGhlIGVsZW1lbnQgY2FuIGJlY29tZSB2aXNpYmxlIGJlZm9yZSB0d2VlbmluZyBiZWdpbnMuXG4gICAgICAgICAgICAgICAgICAgICAgIChPdGhlcndpc2UsIGRpc3BsYXkncyBcIm5vbmVcIiB2YWx1ZSBpcyBzZXQgaW4gY29tcGxldGVDYWxsKCkgb25jZSB0aGUgYW5pbWF0aW9uIGhhcyBjb21wbGV0ZWQuKSAqL1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5kaXNwbGF5ICYmIG9wdHMuZGlzcGxheSAhPT0gXCJub25lXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIENTUy5zZXRQcm9wZXJ0eVZhbHVlKGVsZW1lbnQsIFwiZGlzcGxheVwiLCBvcHRzLmRpc3BsYXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLyogU2FtZSBnb2VzIHdpdGggdGhlIHZpc2liaWxpdHkgb3B0aW9uLCBidXQgaXRzIFwibm9uZVwiIGVxdWl2YWxlbnQgaXMgXCJoaWRkZW5cIi4gKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMudmlzaWJpbGl0eSAmJiBvcHRzLnZpc2liaWxpdHkgIT09IFwiaGlkZGVuXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIENTUy5zZXRQcm9wZXJ0eVZhbHVlKGVsZW1lbnQsIFwidmlzaWJpbGl0eVwiLCBvcHRzLnZpc2liaWxpdHkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLyoqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAgICAgICAgICAgICAgICBQcm9wZXJ0eSBJdGVyYXRpb25cbiAgICAgICAgICAgICAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAgICAgICAgIC8qIEZvciBldmVyeSBlbGVtZW50LCBpdGVyYXRlIHRocm91Z2ggZWFjaCBwcm9wZXJ0eS4gKi9cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvcGVydHkgaW4gdHdlZW5zQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBOb3RlOiBJbiBhZGRpdGlvbiB0byBwcm9wZXJ0eSB0d2VlbiBkYXRhLCB0d2VlbnNDb250YWluZXIgY29udGFpbnMgYSByZWZlcmVuY2UgdG8gaXRzIGFzc29jaWF0ZWQgZWxlbWVudC4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSAhPT0gXCJlbGVtZW50XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHdlZW4gPSB0d2VlbnNDb250YWluZXJbcHJvcGVydHldLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIEVhc2luZyBjYW4gZWl0aGVyIGJlIGEgcHJlLWdlbmVyZWF0ZWQgZnVuY3Rpb24gb3IgYSBzdHJpbmcgdGhhdCByZWZlcmVuY2VzIGEgcHJlLXJlZ2lzdGVyZWQgZWFzaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uIHRoZSBWZWxvY2l0eS5FYXNpbmdzIG9iamVjdC4gSW4gZWl0aGVyIGNhc2UsIHJldHVybiB0aGUgYXBwcm9wcmlhdGUgZWFzaW5nICpmdW5jdGlvbiouICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVhc2luZyA9IFR5cGUuaXNTdHJpbmcodHdlZW4uZWFzaW5nKSA/IFZlbG9jaXR5LkVhc2luZ3NbdHdlZW4uZWFzaW5nXSA6IHR3ZWVuLmVhc2luZztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDdXJyZW50IFZhbHVlIENhbGN1bGF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogSWYgdGhpcyBpcyB0aGUgbGFzdCB0aWNrIHBhc3MgKGlmIHdlJ3ZlIHJlYWNoZWQgMTAwJSBjb21wbGV0aW9uIGZvciB0aGlzIHR3ZWVuKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnN1cmUgdGhhdCBjdXJyZW50VmFsdWUgaXMgZXhwbGljaXRseSBzZXQgdG8gaXRzIHRhcmdldCBlbmRWYWx1ZSBzbyB0aGF0IGl0J3Mgbm90IHN1YmplY3RlZCB0byBhbnkgcm91bmRpbmcuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBlcmNlbnRDb21wbGV0ZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsdWUgPSB0d2Vlbi5lbmRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBPdGhlcndpc2UsIGNhbGN1bGF0ZSBjdXJyZW50VmFsdWUgYmFzZWQgb24gdGhlIGN1cnJlbnQgZGVsdGEgZnJvbSBzdGFydFZhbHVlLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRWYWx1ZSA9IHR3ZWVuLnN0YXJ0VmFsdWUgKyAoKHR3ZWVuLmVuZFZhbHVlIC0gdHdlZW4uc3RhcnRWYWx1ZSkgKiBlYXNpbmcocGVyY2VudENvbXBsZXRlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHdlZW4uY3VycmVudFZhbHVlID0gY3VycmVudFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyoqKioqKioqKioqKioqKioqKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhvb2tzOiBQYXJ0IElcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBGb3IgaG9va2VkIHByb3BlcnRpZXMsIHRoZSBuZXdseS11cGRhdGVkIHJvb3RQcm9wZXJ0eVZhbHVlQ2FjaGUgaXMgY2FjaGVkIG9udG8gdGhlIGVsZW1lbnQgc28gdGhhdCBpdCBjYW4gYmUgdXNlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciBzdWJzZXF1ZW50IGhvb2tzIGluIHRoaXMgY2FsbCB0aGF0IGFyZSBhc3NvY2lhdGVkIHdpdGggdGhlIHNhbWUgcm9vdCBwcm9wZXJ0eS4gSWYgd2UgZGlkbid0IGNhY2hlIHRoZSB1cGRhdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9vdFByb3BlcnR5VmFsdWUsIGVhY2ggc3Vic2VxdWVudCB1cGRhdGUgdG8gdGhlIHJvb3QgcHJvcGVydHkgaW4gdGhpcyB0aWNrIHBhc3Mgd291bGQgcmVzZXQgdGhlIHByZXZpb3VzIGhvb2snc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZXMgdG8gcm9vdFByb3BlcnR5VmFsdWUgcHJpb3IgdG8gaW5qZWN0aW9uLiBBIG5pY2UgcGVyZm9ybWFuY2UgYnlwcm9kdWN0IG9mIHJvb3RQcm9wZXJ0eVZhbHVlIGNhY2hpbmcgaXMgdGhhdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNlcXVlbnRseSBjaGFpbmVkIGFuaW1hdGlvbnMgdXNpbmcgdGhlIHNhbWUgaG9va1Jvb3QgYnV0IGEgZGlmZmVyZW50IGhvb2sgY2FuIHVzZSB0aGlzIGNhY2hlZCByb290UHJvcGVydHlWYWx1ZS4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoQ1NTLkhvb2tzLnJlZ2lzdGVyZWRbcHJvcGVydHldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBob29rUm9vdCA9IENTUy5Ib29rcy5nZXRSb290KHByb3BlcnR5KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvb3RQcm9wZXJ0eVZhbHVlQ2FjaGUgPSBEYXRhKGVsZW1lbnQpLnJvb3RQcm9wZXJ0eVZhbHVlQ2FjaGVbaG9va1Jvb3RdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb290UHJvcGVydHlWYWx1ZUNhY2hlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0d2Vlbi5yb290UHJvcGVydHlWYWx1ZSA9IHJvb3RQcm9wZXJ0eVZhbHVlQ2FjaGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKioqKioqKioqKioqKioqKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRE9NIFVwZGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICoqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogc2V0UHJvcGVydHlWYWx1ZSgpIHJldHVybnMgYW4gYXJyYXkgb2YgdGhlIHByb3BlcnR5IG5hbWUgYW5kIHByb3BlcnR5IHZhbHVlIHBvc3QgYW55IG5vcm1hbGl6YXRpb24gdGhhdCBtYXkgaGF2ZSBiZWVuIHBlcmZvcm1lZC4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBOb3RlOiBUbyBzb2x2ZSBhbiBJRTw9OCBwb3NpdGlvbmluZyBidWcsIHRoZSB1bml0IHR5cGUgaXMgZHJvcHBlZCB3aGVuIHNldHRpbmcgYSBwcm9wZXJ0eSB2YWx1ZSBvZiAwLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhZGp1c3RlZFNldERhdGEgPSBDU1Muc2V0UHJvcGVydHlWYWx1ZShlbGVtZW50LCAvKiBTRVQgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR3ZWVuLmN1cnJlbnRWYWx1ZSArIChwYXJzZUZsb2F0KGN1cnJlbnRWYWx1ZSkgPT09IDAgPyBcIlwiIDogdHdlZW4udW5pdFR5cGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0d2Vlbi5yb290UHJvcGVydHlWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHdlZW4uc2Nyb2xsRGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhvb2tzOiBQYXJ0IElJXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIE5vdyB0aGF0IHdlIGhhdmUgdGhlIGhvb2sncyB1cGRhdGVkIHJvb3RQcm9wZXJ0eVZhbHVlICh0aGUgcG9zdC1wcm9jZXNzZWQgdmFsdWUgcHJvdmlkZWQgYnkgYWRqdXN0ZWRTZXREYXRhKSwgY2FjaGUgaXQgb250byB0aGUgZWxlbWVudC4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoQ1NTLkhvb2tzLnJlZ2lzdGVyZWRbcHJvcGVydHldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIFNpbmNlIGFkanVzdGVkU2V0RGF0YSBjb250YWlucyBub3JtYWxpemVkIGRhdGEgcmVhZHkgZm9yIERPTSB1cGRhdGluZywgdGhlIHJvb3RQcm9wZXJ0eVZhbHVlIG5lZWRzIHRvIGJlIHJlLWV4dHJhY3RlZCBmcm9tIGl0cyBub3JtYWxpemVkIGZvcm0uID8/ICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChDU1MuTm9ybWFsaXphdGlvbnMucmVnaXN0ZXJlZFtob29rUm9vdF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGEoZWxlbWVudCkucm9vdFByb3BlcnR5VmFsdWVDYWNoZVtob29rUm9vdF0gPSBDU1MuTm9ybWFsaXphdGlvbnMucmVnaXN0ZXJlZFtob29rUm9vdF0oXCJleHRyYWN0XCIsIG51bGwsIGFkanVzdGVkU2V0RGF0YVsxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhKGVsZW1lbnQpLnJvb3RQcm9wZXJ0eVZhbHVlQ2FjaGVbaG9va1Jvb3RdID0gYWRqdXN0ZWRTZXREYXRhWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyoqKioqKioqKioqKioqKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRyYW5zZm9ybXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBGbGFnIHdoZXRoZXIgYSB0cmFuc2Zvcm0gcHJvcGVydHkgaXMgYmVpbmcgYW5pbWF0ZWQgc28gdGhhdCBmbHVzaFRyYW5zZm9ybUNhY2hlKCkgY2FuIGJlIHRyaWdnZXJlZCBvbmNlIHRoaXMgdGljayBwYXNzIGlzIGNvbXBsZXRlLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhZGp1c3RlZFNldERhdGFbMF0gPT09IFwidHJhbnNmb3JtXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtUHJvcGVydHlFeGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8qKioqKioqKioqKioqKioqXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2JpbGVIQVxuICAgICAgICAgICAgICAgICAgICAqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAgICAgICAgIC8qIElmIG1vYmlsZUhBIGlzIGVuYWJsZWQsIHNldCB0aGUgdHJhbnNsYXRlM2QgdHJhbnNmb3JtIHRvIG51bGwgdG8gZm9yY2UgaGFyZHdhcmUgYWNjZWxlcmF0aW9uLlxuICAgICAgICAgICAgICAgICAgICAgICBJdCdzIHNhZmUgdG8gb3ZlcnJpZGUgdGhpcyBwcm9wZXJ0eSBzaW5jZSBWZWxvY2l0eSBkb2Vzbid0IGFjdHVhbGx5IHN1cHBvcnQgaXRzIGFuaW1hdGlvbiAoaG9va3MgYXJlIHVzZWQgaW4gaXRzIHBsYWNlKS4gKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMubW9iaWxlSEEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIERvbid0IHNldCB0aGUgbnVsbCB0cmFuc2Zvcm0gaGFjayBpZiB3ZSd2ZSBhbHJlYWR5IGRvbmUgc28uICovXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoRGF0YShlbGVtZW50KS50cmFuc2Zvcm1DYWNoZS50cmFuc2xhdGUzZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogQWxsIGVudHJpZXMgb24gdGhlIHRyYW5zZm9ybUNhY2hlIG9iamVjdCBhcmUgbGF0ZXIgY29uY2F0ZW5hdGVkIGludG8gYSBzaW5nbGUgdHJhbnNmb3JtIHN0cmluZyB2aWEgZmx1c2hUcmFuc2Zvcm1DYWNoZSgpLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGEoZWxlbWVudCkudHJhbnNmb3JtQ2FjaGUudHJhbnNsYXRlM2QgPSBcIigwcHgsIDBweCwgMHB4KVwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtUHJvcGVydHlFeGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zZm9ybVByb3BlcnR5RXhpc3RzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBDU1MuZmx1c2hUcmFuc2Zvcm1DYWNoZShlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qIFRoZSBub24tXCJub25lXCIgZGlzcGxheSB2YWx1ZSBpcyBvbmx5IGFwcGxpZWQgdG8gYW4gZWxlbWVudCBvbmNlIC0tIHdoZW4gaXRzIGFzc29jaWF0ZWQgY2FsbCBpcyBmaXJzdCB0aWNrZWQgdGhyb3VnaC5cbiAgICAgICAgICAgICAgICAgICBBY2NvcmRpbmdseSwgaXQncyBzZXQgdG8gZmFsc2Ugc28gdGhhdCBpdCBpc24ndCByZS1wcm9jZXNzZWQgYnkgdGhpcyBjYWxsIGluIHRoZSBuZXh0IHRpY2suICovXG4gICAgICAgICAgICAgICAgaWYgKG9wdHMuZGlzcGxheSAmJiBvcHRzLmRpc3BsYXkgIT09IFwibm9uZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIFZlbG9jaXR5LlN0YXRlLmNhbGxzW2ldWzJdLmRpc3BsYXkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAob3B0cy52aXNpYmlsaXR5ICYmIG9wdHMudmlzaWJpbGl0eSAhPT0gXCJoaWRkZW5cIikge1xuICAgICAgICAgICAgICAgICAgICBWZWxvY2l0eS5TdGF0ZS5jYWxsc1tpXVsyXS52aXNpYmlsaXR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLyogUGFzcyB0aGUgZWxlbWVudHMgYW5kIHRoZSB0aW1pbmcgZGF0YSAocGVyY2VudENvbXBsZXRlLCBtc1JlbWFpbmluZywgYW5kIHRpbWVTdGFydCkgaW50byB0aGUgcHJvZ3Jlc3MgY2FsbGJhY2suICovXG4gICAgICAgICAgICAgICAgaWYgKG9wdHMucHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5wcm9ncmVzcy5jYWxsKGNhbGxDb250YWluZXJbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsQ29udGFpbmVyWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudENvbXBsZXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5tYXgoMCwgKHRpbWVTdGFydCArIG9wdHMuZHVyYXRpb24pIC0gdGltZUN1cnJlbnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZVN0YXJ0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvKiBJZiB0aGlzIGNhbGwgaGFzIGZpbmlzaGVkIHR3ZWVuaW5nLCBwYXNzIGl0cyBpbmRleCB0byBjb21wbGV0ZUNhbGwoKSB0byBoYW5kbGUgY2FsbCBjbGVhbnVwLiAqL1xuICAgICAgICAgICAgICAgIGlmIChwZXJjZW50Q29tcGxldGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVDYWxsKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIE5vdGU6IGNvbXBsZXRlQ2FsbCgpIHNldHMgdGhlIGlzVGlja2luZyBmbGFnIHRvIGZhbHNlIHdoZW4gdGhlIGxhc3QgY2FsbCBvbiBWZWxvY2l0eS5TdGF0ZS5jYWxscyBoYXMgY29tcGxldGVkLiAqL1xuICAgICAgICBpZiAoVmVsb2NpdHkuU3RhdGUuaXNUaWNraW5nKSB7XG4gICAgICAgICAgICByQUYodGljayk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICBDYWxsIENvbXBsZXRpb25cbiAgICAqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgLyogTm90ZTogVW5saWtlIHRpY2soKSwgd2hpY2ggcHJvY2Vzc2VzIGFsbCBhY3RpdmUgY2FsbHMgYXQgb25jZSwgY2FsbCBjb21wbGV0aW9uIGlzIGhhbmRsZWQgb24gYSBwZXItY2FsbCBiYXNpcy4gKi9cbiAgICBmdW5jdGlvbiBjb21wbGV0ZUNhbGwgKGNhbGxJbmRleCwgaXNTdG9wcGVkKSB7XG4gICAgICAgIC8qIEVuc3VyZSB0aGUgY2FsbCBleGlzdHMuICovXG4gICAgICAgIGlmICghVmVsb2NpdHkuU3RhdGUuY2FsbHNbY2FsbEluZGV4XSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogUHVsbCB0aGUgbWV0YWRhdGEgZnJvbSB0aGUgY2FsbC4gKi9cbiAgICAgICAgdmFyIGNhbGwgPSBWZWxvY2l0eS5TdGF0ZS5jYWxsc1tjYWxsSW5kZXhdWzBdLFxuICAgICAgICAgICAgZWxlbWVudHMgPSBWZWxvY2l0eS5TdGF0ZS5jYWxsc1tjYWxsSW5kZXhdWzFdLFxuICAgICAgICAgICAgb3B0cyA9IFZlbG9jaXR5LlN0YXRlLmNhbGxzW2NhbGxJbmRleF1bMl0sXG4gICAgICAgICAgICByZXNvbHZlciA9IFZlbG9jaXR5LlN0YXRlLmNhbGxzW2NhbGxJbmRleF1bNF07XG5cbiAgICAgICAgdmFyIHJlbWFpbmluZ0NhbGxzRXhpc3QgPSBmYWxzZTtcblxuICAgICAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAgICBFbGVtZW50IEZpbmFsaXphdGlvblxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBjYWxsTGVuZ3RoID0gY2FsbC5sZW5ndGg7IGkgPCBjYWxsTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gY2FsbFtpXS5lbGVtZW50O1xuXG4gICAgICAgICAgICAvKiBJZiB0aGUgdXNlciBzZXQgZGlzcGxheSB0byBcIm5vbmVcIiAoaW50ZW5kaW5nIHRvIGhpZGUgdGhlIGVsZW1lbnQpLCBzZXQgaXQgbm93IHRoYXQgdGhlIGFuaW1hdGlvbiBoYXMgY29tcGxldGVkLiAqL1xuICAgICAgICAgICAgLyogTm90ZTogZGlzcGxheTpub25lIGlzbid0IHNldCB3aGVuIGNhbGxzIGFyZSBtYW51YWxseSBzdG9wcGVkICh2aWEgVmVsb2NpdHkuYW5pbWF0ZShcInN0b3BcIikuICovXG4gICAgICAgICAgICAvKiBOb3RlOiBEaXNwbGF5IGlzIGlnbm9yZWQgd2l0aCBcInJldmVyc2VcIiBjYWxscywgd2hpY2ggaXMgd2hhdCBsb29wcyBhcmUgY29tcG9zZWQgb2YsIHNpbmNlIHRoaXMgYmVoYXZpb3Igd291bGQgYmUgdW5kZXNpcmFibGUuICovXG4gICAgICAgICAgICBpZiAoIWlzU3RvcHBlZCAmJiAhb3B0cy5sb29wKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMuZGlzcGxheSA9PT0gXCJub25lXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgQ1NTLnNldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgXCJkaXNwbGF5XCIsIG9wdHMuZGlzcGxheSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG9wdHMudmlzaWJpbGl0eSA9PT0gXCJoaWRkZW5cIikge1xuICAgICAgICAgICAgICAgICAgICBDU1Muc2V0UHJvcGVydHlWYWx1ZShlbGVtZW50LCBcInZpc2liaWxpdHlcIiwgb3B0cy52aXNpYmlsaXR5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIElmIHRoZSBlbGVtZW50J3MgcXVldWUgaXMgZW1wdHkgKGlmIG9ubHkgdGhlIFwiaW5wcm9ncmVzc1wiIGl0ZW0gaXMgbGVmdCBhdCBwb3NpdGlvbiAwKSBvciBpZiBpdHMgcXVldWUgaXMgYWJvdXQgdG8gcnVuXG4gICAgICAgICAgICAgICBhIG5vbi1WZWxvY2l0eS1pbml0aWF0ZWQgZW50cnksIHR1cm4gb2ZmIHRoZSBpc0FuaW1hdGluZyBmbGFnLiBBIG5vbi1WZWxvY2l0eS1pbml0aWF0aWVkIHF1ZXVlIGVudHJ5J3MgbG9naWMgbWlnaHQgYWx0ZXJcbiAgICAgICAgICAgICAgIGFuIGVsZW1lbnQncyBDU1MgdmFsdWVzIGFuZCB0aGVyZWJ5IGNhdXNlIFZlbG9jaXR5J3MgY2FjaGVkIHZhbHVlIGRhdGEgdG8gZ28gc3RhbGUuIFRvIGRldGVjdCBpZiBhIHF1ZXVlIGVudHJ5IHdhcyBpbml0aWF0ZWQgYnkgVmVsb2NpdHksXG4gICAgICAgICAgICAgICB3ZSBjaGVjayBmb3IgdGhlIGV4aXN0ZW5jZSBvZiBvdXIgc3BlY2lhbCBWZWxvY2l0eS5xdWV1ZUVudHJ5RmxhZyBkZWNsYXJhdGlvbiwgd2hpY2ggbWluaWZpZXJzIHdvbid0IHJlbmFtZSBzaW5jZSB0aGUgZmxhZ1xuICAgICAgICAgICAgICAgaXMgYXNzaWduZWQgdG8galF1ZXJ5J3MgZ2xvYmFsICQgb2JqZWN0IGFuZCB0aHVzIGV4aXN0cyBvdXQgb2YgVmVsb2NpdHkncyBvd24gc2NvcGUuICovXG4gICAgICAgICAgICBpZiAoJC5xdWV1ZShlbGVtZW50KVsxXSA9PT0gdW5kZWZpbmVkIHx8ICEvXFwudmVsb2NpdHlRdWV1ZUVudHJ5RmxhZy9pLnRlc3QoJC5xdWV1ZShlbGVtZW50KVsxXSkpIHtcbiAgICAgICAgICAgICAgICAvKiBUaGUgZWxlbWVudCBtYXkgaGF2ZSBiZWVuIGRlbGV0ZWQuIEVuc3VyZSB0aGF0IGl0cyBkYXRhIGNhY2hlIHN0aWxsIGV4aXN0cyBiZWZvcmUgYWN0aW5nIG9uIGl0LiAqL1xuICAgICAgICAgICAgICAgIGlmIChEYXRhKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIERhdGEoZWxlbWVudCkuaXNBbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgLyogQ2xlYXIgdGhlIGVsZW1lbnQncyByb290UHJvcGVydHlWYWx1ZUNhY2hlLCB3aGljaCB3aWxsIGJlY29tZSBzdGFsZS4gKi9cbiAgICAgICAgICAgICAgICAgICAgRGF0YShlbGVtZW50KS5yb290UHJvcGVydHlWYWx1ZUNhY2hlID0ge307XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHRyYW5zZm9ybUhBUHJvcGVydHlFeGlzdHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgLyogSWYgYW55IHRyYW5zZm9ybSBzdWJwcm9wZXJ0eSBpcyBhdCBpdHMgZGVmYXVsdCB2YWx1ZSAocmVnYXJkbGVzcyBvZiB1bml0IHR5cGUpLCByZW1vdmUgaXQuIFRoaXMgaGFzIHRoZVxuICAgICAgICAgICAgICAgICAgICAgICBkdWFsIGJlbmVmaXQgb2YgYXZvaWRpbmcgcmFuZG9tIGJyb3dzZXIgdHJhbnNmb3JtIGJ1Z3MgYW5kIHJlbW92aW5nIGhhcmR3YXJlIGFjY2VsZXJhdGlvbiB0byBmcmVlIHVwIFJBTS4gKi9cbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKERhdGEoZWxlbWVudCkudHJhbnNmb3JtQ2FjaGUsIGZ1bmN0aW9uKHRyYW5zZm9ybU5hbWUsIHRyYW5zZm9ybVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGVmYXVsdFZhbHVlID0gL15zY2FsZS8udGVzdCh0cmFuc2Zvcm1OYW1lKSA/IDEgOiAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3IFJlZ0V4cChcIl5cXFxcKFwiICsgZGVmYXVsdFZhbHVlICsgXCJbXi5dXCIpLnRlc3QodHJhbnNmb3JtVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtSEFQcm9wZXJ0eUV4aXN0cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIERhdGEoZWxlbWVudCkudHJhbnNmb3JtQ2FjaGVbdHJhbnNmb3JtTmFtZV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qIE1vYmlsZSBkZXZpY2VzIGhhdmUgaGFyZHdhcmUgYWNjZWxlcmF0aW9uIHJlbW92ZWQgYXQgdGhlIGVuZCBvZiB0aGUgYW5pbWF0aW9uIGluIG9yZGVyIHRvIGF2b2lkIGhvZ2dpbmcgdGhlIEdQVSdzIG1lbW9yeS4gKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMubW9iaWxlSEEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybUhBUHJvcGVydHlFeGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIERhdGEoZWxlbWVudCkudHJhbnNmb3JtQ2FjaGUudHJhbnNsYXRlM2Q7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvKiBGbHVzaCB0aGUgc3VicHJvcGVydHkgcmVtb3ZhbHMgdG8gdGhlIERPTS4gKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zZm9ybUhBUHJvcGVydHlFeGlzdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIENTUy5mbHVzaFRyYW5zZm9ybUNhY2hlKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLyogUmVtb3ZlIHRoZSBcInZlbG9jaXR5LWFuaW1hdGluZ1wiIGluZGljYXRvciBjbGFzcy4gKi9cbiAgICAgICAgICAgICAgICAgICAgQ1NTLlZhbHVlcy5yZW1vdmVDbGFzcyhlbGVtZW50LCBcInZlbG9jaXR5LWFuaW1hdGluZ1wiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgICAgICAgIE9wdGlvbjogQ29tcGxldGVcbiAgICAgICAgICAgICoqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyogQ29tcGxldGUgaXMgZmlyZWQgb25jZSBwZXIgY2FsbCAobm90IG9uY2UgcGVyIGVsZW1lbnQpIGFuZCBpcyBwYXNzZWQgdGhlIGZ1bGwgcmF3IERPTSBlbGVtZW50IHNldCBhcyBib3RoIGl0cyBjb250ZXh0IGFuZCBpdHMgZmlyc3QgYXJndW1lbnQuICovXG4gICAgICAgICAgICAvKiBOb3RlOiBDYWxsYmFja3MgYXJlbid0IGZpcmVkIHdoZW4gY2FsbHMgYXJlIG1hbnVhbGx5IHN0b3BwZWQgKHZpYSBWZWxvY2l0eS5hbmltYXRlKFwic3RvcFwiKS4gKi9cbiAgICAgICAgICAgIC8qIE5vdGU6IElmIHRoaXMgaXMgYSBsb29wLCBjb21wbGV0ZSBjYWxsYmFjayBmaXJpbmcgaXMgb25seSB0cmlnZ2VyZWQgb24gdGhlIGxvb3AncyBmaW5hbCByZXZlcnNlIGNhbGwuICovXG4gICAgICAgICAgICBpZiAoIWlzU3RvcHBlZCAmJiBvcHRzLmNvbXBsZXRlICYmICFvcHRzLmxvb3AgJiYgKGkgPT09IGNhbGxMZW5ndGggLSAxKSkge1xuICAgICAgICAgICAgICAgIC8qIFdlIHRocm93IGNhbGxiYWNrcyBpbiBhIHNldFRpbWVvdXQgc28gdGhhdCB0aHJvd24gZXJyb3JzIGRvbid0IGhhbHQgdGhlIGV4ZWN1dGlvbiBvZiBWZWxvY2l0eSBpdHNlbGYuICovXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5jb21wbGV0ZS5jYWxsKGVsZW1lbnRzLCBlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHsgXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAgICAgICAgUHJvbWlzZSBSZXNvbHZpbmdcbiAgICAgICAgICAgICoqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgIGlmIChyZXNvbHZlcikge1xuICAgICAgICAgICAgICAgIHJlc29sdmVyKGVsZW1lbnRzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqKioqKioqKioqKioqKlxuICAgICAgICAgICAgICAgRGVxdWV1ZWluZ1xuICAgICAgICAgICAgKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAvKiBGaXJlIHRoZSBuZXh0IGNhbGwgaW4gdGhlIHF1ZXVlIHNvIGxvbmcgYXMgdGhpcyBjYWxsJ3MgcXVldWUgd2Fzbid0IHNldCB0byBmYWxzZSAodG8gdHJpZ2dlciBhIHBhcmFsbGVsIGFuaW1hdGlvbiksXG4gICAgICAgICAgICAgICB3aGljaCB3b3VsZCBoYXZlIGFscmVhZHkgY2F1c2VkIHRoZSBuZXh0IGNhbGwgdG8gZmlyZS4gTm90ZTogRXZlbiBpZiB0aGUgZW5kIG9mIHRoZSBhbmltYXRpb24gcXVldWUgaGFzIGJlZW4gcmVhY2hlZCxcbiAgICAgICAgICAgICAgICQuZGVxdWV1ZSgpIG11c3Qgc3RpbGwgYmUgY2FsbGVkIGluIG9yZGVyIHRvIGNvbXBsZXRlbHkgY2xlYXIgalF1ZXJ5J3MgYW5pbWF0aW9uIHF1ZXVlLiAqL1xuICAgICAgICAgICAgaWYgKG9wdHMucXVldWUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgJC5kZXF1ZXVlKGVsZW1lbnQsIG9wdHMucXVldWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAgICBDYWxscyBBcnJheSBDbGVhbnVwXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKiBTaW5jZSB0aGlzIGNhbGwgaXMgY29tcGxldGUsIHNldCBpdCB0byBmYWxzZSBzbyB0aGF0IHRoZSByQUYgdGljayBza2lwcyBpdC4gVGhpcyBhcnJheSBpcyBsYXRlciBjb21wYWN0ZWQgdmlhIGNvbXBhY3RTcGFyc2VBcnJheSgpLlxuICAgICAgICAgIChGb3IgcGVyZm9ybWFuY2UgcmVhc29ucywgdGhlIGNhbGwgaXMgc2V0IHRvIGZhbHNlIGluc3RlYWQgb2YgYmVpbmcgZGVsZXRlZCBmcm9tIHRoZSBhcnJheTogaHR0cDovL3d3dy5odG1sNXJvY2tzLmNvbS9lbi90dXRvcmlhbHMvc3BlZWQvdjgvKSAqL1xuICAgICAgICBWZWxvY2l0eS5TdGF0ZS5jYWxsc1tjYWxsSW5kZXhdID0gZmFsc2U7XG5cbiAgICAgICAgLyogSXRlcmF0ZSB0aHJvdWdoIHRoZSBjYWxscyBhcnJheSB0byBkZXRlcm1pbmUgaWYgdGhpcyB3YXMgdGhlIGZpbmFsIGluLXByb2dyZXNzIGFuaW1hdGlvbi5cbiAgICAgICAgICAgSWYgc28sIHNldCBhIGZsYWcgdG8gZW5kIHRpY2tpbmcgYW5kIGNsZWFyIHRoZSBjYWxscyBhcnJheS4gKi9cbiAgICAgICAgZm9yICh2YXIgaiA9IDAsIGNhbGxzTGVuZ3RoID0gVmVsb2NpdHkuU3RhdGUuY2FsbHMubGVuZ3RoOyBqIDwgY2FsbHNMZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYgKFZlbG9jaXR5LlN0YXRlLmNhbGxzW2pdICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJlbWFpbmluZ0NhbGxzRXhpc3QgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVtYWluaW5nQ2FsbHNFeGlzdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIC8qIHRpY2soKSB3aWxsIGRldGVjdCB0aGlzIGZsYWcgdXBvbiBpdHMgbmV4dCBpdGVyYXRpb24gYW5kIHN1YnNlcXVlbnRseSB0dXJuIGl0c2VsZiBvZmYuICovXG4gICAgICAgICAgICBWZWxvY2l0eS5TdGF0ZS5pc1RpY2tpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgLyogQ2xlYXIgdGhlIGNhbGxzIGFycmF5IHNvIHRoYXQgaXRzIGxlbmd0aCBpcyByZXNldC4gKi9cbiAgICAgICAgICAgIGRlbGV0ZSBWZWxvY2l0eS5TdGF0ZS5jYWxscztcbiAgICAgICAgICAgIFZlbG9jaXR5LlN0YXRlLmNhbGxzID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKlxuICAgICAgICBJbnN0YWxsYXRpb25cbiAgICAqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgLyogQm90aCBqUXVlcnkgYW5kIFplcHRvIGFsbG93IHRoZWlyICQuZm4gb2JqZWN0IHRvIGJlIGV4dGVuZGVkIHRvIGFsbG93IHdyYXBwZWQgZWxlbWVudHMgdG8gYmUgc3ViamVjdGVkIHRvIHBsdWdpbiBjYWxscy5cbiAgICAgICBJZiBlaXRoZXIgZnJhbWV3b3JrIGlzIGxvYWRlZCwgcmVnaXN0ZXIgYSBcInZlbG9jaXR5XCIgZXh0ZW5zaW9uIHBvaW50aW5nIHRvIFZlbG9jaXR5J3MgY29yZSBhbmltYXRlKCkgbWV0aG9kLiAqL1xuICAgIHZhciBmcmFtZXdvcmsgPSB3aW5kb3cualF1ZXJ5IHx8IHdpbmRvdy5aZXB0bztcblxuICAgIGlmIChmcmFtZXdvcmspIHtcbiAgICAgICAgLyogQXNzaWduIHRoZSBvYmplY3QgZnVuY3Rpb24gdG8gVmVsb2NpdHkncyBhbmltYXRlKCkgbWV0aG9kLiAqL1xuICAgICAgICBmcmFtZXdvcmsuZm4udmVsb2NpdHkgPSBWZWxvY2l0eS5hbmltYXRlO1xuXG4gICAgICAgIC8qIEFzc2lnbiB0aGUgb2JqZWN0IGZ1bmN0aW9uJ3MgZGVmYXVsdHMgdG8gVmVsb2NpdHkncyBnbG9iYWwgZGVmYXVsdHMgb2JqZWN0LiAqL1xuICAgICAgICBmcmFtZXdvcmsuZm4udmVsb2NpdHkuZGVmYXVsdHMgPSBWZWxvY2l0eS5kZWZhdWx0cztcbiAgICB9XG5cbiAgICAvKiBTdXBwb3J0IGZvciBBTUQgYW5kIENvbW1vbkpTIG1vZHVsZSBsb2FkZXJzLiAqL1xuICAgIGlmICh0eXBlb2YgZGVmaW5lICE9PSBcInVuZGVmaW5lZFwiICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gVmVsb2NpdHk7IH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IFZlbG9jaXR5O1xuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgIFBhY2thZ2VkIFNlcXVlbmNlc1xuICAgICoqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgLyogc2xpZGVVcCwgc2xpZGVEb3duICovXG4gICAgJC5lYWNoKFsgXCJEb3duXCIsIFwiVXBcIiBdLCBmdW5jdGlvbihpLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgVmVsb2NpdHkuU2VxdWVuY2VzW1wic2xpZGVcIiArIGRpcmVjdGlvbl0gPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIG9wdHMgPSAkLmV4dGVuZCh7fSwgb3B0aW9ucyksXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxWYWx1ZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luVG9wOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmdUb3A6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmdCb3R0b206IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJmbG93OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBvdmVyZmxvd1g6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJmbG93WTogbnVsbFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLyogU2luY2UgdGhlIHNsaWRlIGZ1bmN0aW9ucyBtYWtlIHVzZSBvZiB0aGUgYmVnaW4gYW5kIGNvbXBsZXRlIGNhbGxiYWNrcywgdGhlIHVzZXIncyBjdXN0b20gY2FsbGJhY2tzIGFyZSBzdG9yZWRcbiAgICAgICAgICAgICAgICAgICB1cGZyb250IGZvciB0cmlnZ2VyaW5nIG9uY2Ugc2xpZGVEb3duL1VwJ3Mgb3duIGNhbGxiYWNrIGxvZ2ljIGlzIGNvbXBsZXRlLiAqL1xuICAgICAgICAgICAgICAgIGJlZ2luID0gb3B0cy5iZWdpbixcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSA9IG9wdHMuY29tcGxldGUsXG4gICAgICAgICAgICAgICAgaXNIZWlnaHRBdXRvID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8qIEFsbG93IHRoZSB1c2VyIHRvIHNldCBkaXNwbGF5IHRvIG51bGwgdG8gYnlwYXNzIGRpc3BsYXkgdG9nZ2xpbmcuICovXG4gICAgICAgICAgICBpZiAob3B0cy5kaXNwbGF5ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLyogVW5sZXNzIHRoZSB1c2VyIGlzIG92ZXJyaWRpbmcgdGhlIGRpc3BsYXkgdmFsdWUsIHNob3cgdGhlIGVsZW1lbnQgYmVmb3JlIHNsaWRlRG93biBiZWdpbnMgYW5kIGhpZGUgdGhlIGVsZW1lbnQgYWZ0ZXIgc2xpZGVVcCBjb21wbGV0ZXMuICovXG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJEb3duXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLyogQWxsIHNsaWRpbmcgZWxlbWVudHMgYXJlIHNldCB0byB0aGUgXCJibG9ja1wiIGRpc3BsYXkgdmFsdWUgKGFzIG9wcG9zZWQgdG8gYW4gZWxlbWVudC1hcHByb3ByaWF0ZSBibG9jay9pbmxpbmUgZGlzdGluY3Rpb24pXG4gICAgICAgICAgICAgICAgICAgICAgIGJlY2F1c2UgaW5saW5lIGVsZW1lbnRzIGNhbm5vdCBhY3R1YWxseSBoYXZlIHRoZWlyIGRpbWVuc2lvbnMgbW9kaWZpZWQuICovXG4gICAgICAgICAgICAgICAgICAgIG9wdHMuZGlzcGxheSA9IG9wdHMuZGlzcGxheSB8fCBcImF1dG9cIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvcHRzLmRpc3BsYXkgPSBvcHRzLmRpc3BsYXkgfHwgXCJub25lXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKiBCZWdpbiBjYWxsYmFjay4gKi9cbiAgICAgICAgICAgIG9wdHMuYmVnaW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLyogQ2hlY2sgZm9yIGhlaWdodDogXCJhdXRvXCIgc28gd2UgY2FuIHJldmVydCBiYWNrIHRvIGl0IHdoZW4gdGhlIHNsaWRpbmcgYW5pbWF0aW9uIGlzIGNvbXBsZXRlLiAqL1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrSGVpZ2h0QXV0bygpIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxWYWx1ZXMuaGVpZ2h0ID0gcGFyc2VGbG9hdChWZWxvY2l0eS5DU1MuZ2V0UHJvcGVydHlWYWx1ZShlbGVtZW50LCBcImhlaWdodFwiKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLyogRGV0ZXJtaW5lIGlmIGhlaWdodCB3YXMgb3JpZ2luYWxseSBcImF1dG9cIiBieSBjaGVja2luZyBpZiB0aGUgY29tcHV0ZWQgXCJhdXRvXCIgdmFsdWUgaXMgaWRlbnRpY2FsIHRvIHRoZSBvcmlnaW5hbCB2YWx1ZS4gKi9cbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBcImF1dG9cIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlRmxvYXQoVmVsb2NpdHkuQ1NTLmdldFByb3BlcnR5VmFsdWUoZWxlbWVudCwgXCJoZWlnaHRcIikpID09PSBvcmlnaW5hbFZhbHVlcy5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzSGVpZ2h0QXV0byA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvKiBSZXZlcnQgdG8gdGhlIGNvbXB1dGVkIHZhbHVlIGJlZm9yZSBzbGlkaW5nIGJlZ2lucyB0byBwcmV2ZW50IHZlcnRpY2FsIHBvcHBpbmcgZHVlIHRvIHNjcm9sbGJhcnMuICovXG4gICAgICAgICAgICAgICAgICAgIFZlbG9jaXR5LkNTUy5zZXRQcm9wZXJ0eVZhbHVlKGVsZW1lbnQsIFwiaGVpZ2h0XCIsIG9yaWdpbmFsVmFsdWVzLmhlaWdodCArIFwicHhcIik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJEb3duXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxWYWx1ZXMub3ZlcmZsb3cgPSBbIFZlbG9jaXR5LkNTUy5nZXRQcm9wZXJ0eVZhbHVlKGVsZW1lbnQsIFwib3ZlcmZsb3dcIiksIDAgXTtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxWYWx1ZXMub3ZlcmZsb3dYID0gWyBWZWxvY2l0eS5DU1MuZ2V0UHJvcGVydHlWYWx1ZShlbGVtZW50LCBcIm92ZXJmbG93WFwiKSwgMCBdO1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFZhbHVlcy5vdmVyZmxvd1kgPSBbIFZlbG9jaXR5LkNTUy5nZXRQcm9wZXJ0eVZhbHVlKGVsZW1lbnQsIFwib3ZlcmZsb3dZXCIpLCAwIF07XG5cbiAgICAgICAgICAgICAgICAgICAgLyogRW5zdXJlIHRoZSBlbGVtZW50IGlzIHZpc2libGUsIGFuZCB0ZW1wb3JhcmlseSByZW1vdmUgdmVydGljYWwgc2Nyb2xsYmFycyBzaW5jZSBhbmltYXRpbmcgdGhlbSBpcyB2aXN1YWxseSB1bmFwcGVhbGluZy4gKi9cbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUub3ZlcmZsb3dYID0gXCJ2aXNpYmxlXCI7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUub3ZlcmZsb3dZID0gXCJoaWRkZW5cIjtcblxuICAgICAgICAgICAgICAgICAgICAvKiBXaXRoIHRoZSBzY3JvbGxhcnMgbm8gbG9uZ2VyIGFmZmVjdGluZyBzaXppbmcsIGRldGVybWluZSB3aGV0aGVyIHRoZSBlbGVtZW50IGlzIGN1cnJlbnRseSBoZWlnaHQ6IFwiYXV0b1wiLiAqL1xuICAgICAgICAgICAgICAgICAgICBjaGVja0hlaWdodEF1dG8oKTtcblxuICAgICAgICAgICAgICAgICAgICAvKiBDYWNoZSB0aGUgZWxlbWVudHMnIG9yaWdpbmFsIHZlcnRpY2FsIGRpbWVuc2lvbmFsIHZhbHVlcyBzbyB0aGF0IHdlIGNhbiBhbmltYXRlIGJhY2sgdG8gdGhlbS4gKi9cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvcGVydHkgaW4gb3JpZ2luYWxWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIE92ZXJmbG93IHZhbHVlcyBoYXZlIGFscmVhZHkgYmVlbiBjYWNoZWQ7IGRvIG5vdCBvdmVyd3JpdGUgdGhlbSB3aXRoIFwiaGlkZGVuXCIuICovXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoL15vdmVyZmxvdy8udGVzdChwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb3BlcnR5VmFsdWUgPSBWZWxvY2l0eS5DU1MuZ2V0UHJvcGVydHlWYWx1ZShlbGVtZW50LCBwcm9wZXJ0eSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSA9PT0gXCJoZWlnaHRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5VmFsdWUgPSBwYXJzZUZsb2F0KHByb3BlcnR5VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBVc2UgZm9yY2VmZWVkaW5nIHRvIGFuaW1hdGUgc2xpZGVEb3duIHByb3BlcnRpZXMgZnJvbSAwLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxWYWx1ZXNbcHJvcGVydHldID0gWyBwcm9wZXJ0eVZhbHVlLCAwIF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjaGVja0hlaWdodEF1dG8oKTtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBvcmlnaW5hbFZhbHVlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb3BlcnR5VmFsdWUgPSBWZWxvY2l0eS5DU1MuZ2V0UHJvcGVydHlWYWx1ZShlbGVtZW50LCBwcm9wZXJ0eSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSA9PT0gXCJoZWlnaHRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5VmFsdWUgPSBwYXJzZUZsb2F0KHByb3BlcnR5VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBVc2UgZm9yY2VmZWVkaW5nIHRvIGFuaW1hdGUgc2xpZGVVcCBwcm9wZXJ0aWVzIHRvd2FyZCAwLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxWYWx1ZXNbcHJvcGVydHldID0gWyAwLCBwcm9wZXJ0eVZhbHVlIF07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvKiBCb3RoIGRpcmVjdGlvbnMgaGlkZSBzY3JvbGxiYXJzIHNpbmNlIHNjcm9sbGJhciBoZWlnaHQgdHdlZW5pbmcgbG9va3MgdW5hcHBlYWxpbmcuICovXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLm92ZXJmbG93WCA9IFwidmlzaWJsZVwiO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLm92ZXJmbG93WSA9IFwiaGlkZGVuXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLyogSWYgdGhlIHVzZXIgcGFzc2VkIGluIGEgYmVnaW4gY2FsbGJhY2ssIGZpcmUgaXQgbm93LiAqL1xuICAgICAgICAgICAgICAgIGlmIChiZWdpbikge1xuICAgICAgICAgICAgICAgICAgICBiZWdpbi5jYWxsKGVsZW1lbnQsIGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogQ29tcGxldGUgY2FsbGJhY2suICovXG4gICAgICAgICAgICBvcHRzLmNvbXBsZXRlID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHlWYWx1ZVBvc2l0aW9uID0gKGRpcmVjdGlvbiA9PT0gXCJEb3duXCIpID8gMCA6IDE7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNIZWlnaHRBdXRvID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qIElmIHRoZSBlbGVtZW50J3MgaGVpZ2h0IHdhcyBvcmlnaW5hbGx5IHNldCB0byBhdXRvLCBvdmVyd3JpdGUgdGhlIGNvbXB1dGVkIHZhbHVlIHdpdGggXCJhdXRvXCIuICovXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsVmFsdWVzLmhlaWdodFtwcm9wZXJ0eVZhbHVlUG9zaXRpb25dID0gXCJhdXRvXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxWYWx1ZXMuaGVpZ2h0W3Byb3BlcnR5VmFsdWVQb3NpdGlvbl0gKz0gXCJweFwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qIFJlc2V0IGVsZW1lbnQgdG8gaXRzIG9yaWdpbmFsIHZhbHVlcyBvbmNlIGl0cyBzbGlkZSBhbmltYXRpb24gaXMgY29tcGxldGU6IEZvciBzbGlkZURvd24sIG92ZXJmbG93XG4gICAgICAgICAgICAgICAgICAgdmFsdWVzIGFyZSByZXNldC4gRm9yIHNsaWRlVXAsIGFsbCB2YWx1ZXMgYXJlIHJlc2V0IChzaW5jZSB0aGV5IHdlcmUgYW5pbWF0ZWQgdG8gMCkuKSAqL1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3BlcnR5IGluIG9yaWdpbmFsVmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbcHJvcGVydHldID0gb3JpZ2luYWxWYWx1ZXNbcHJvcGVydHldW3Byb3BlcnR5VmFsdWVQb3NpdGlvbl07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLyogSWYgdGhlIHVzZXIgcGFzc2VkIGluIGEgY29tcGxldGUgY2FsbGJhY2ssIGZpcmUgaXQgbm93LiAqL1xuICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZS5jYWxsKGVsZW1lbnQsIGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8qIEFuaW1hdGlvbiB0cmlnZ2VyaW5nLiAqL1xuICAgICAgICAgICAgVmVsb2NpdHkuYW5pbWF0ZShlbGVtZW50LCBvcmlnaW5hbFZhbHVlcywgb3B0cyk7XG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICAvKiBmYWRlSW4sIGZhZGVPdXQgKi9cbiAgICAkLmVhY2goWyBcIkluXCIsIFwiT3V0XCIgXSwgZnVuY3Rpb24oaSwgZGlyZWN0aW9uKSB7XG4gICAgICAgIFZlbG9jaXR5LlNlcXVlbmNlc1tcImZhZGVcIiArIGRpcmVjdGlvbl0gPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucywgZWxlbWVudHNJbmRleCwgZWxlbWVudHNTaXplKSB7XG4gICAgICAgICAgICB2YXIgb3B0cyA9ICQuZXh0ZW5kKHt9LCBvcHRpb25zKSxcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzTWFwID0ge1xuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAoZGlyZWN0aW9uID09PSBcIkluXCIpID8gMSA6IDBcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvKiBTaW5jZSBzZXF1ZW5jZXMgYXJlIHRyaWdnZXJlZCBpbmRpdmlkdWFsbHkgZm9yIGVhY2ggZWxlbWVudCBpbiB0aGUgYW5pbWF0ZWQgc2V0LCBhdm9pZCByZXBlYXRlZGx5IHRyaWdnZXJpbmdcbiAgICAgICAgICAgICAgIGNhbGxiYWNrcyBieSBmaXJpbmcgdGhlbSBvbmx5IHdoZW4gdGhlIGZpbmFsIGVsZW1lbnQgaGFzIGJlZW4gcmVhY2hlZC4gKi9cbiAgICAgICAgICAgIGlmIChlbGVtZW50c0luZGV4ICE9PSBlbGVtZW50c1NpemUgLSAxKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5jb21wbGV0ZSA9IG9wdHMuYmVnaW4gPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKiBJZiBhIGRpc3BsYXkgd2FzIHBhc3NlZCBpbiwgdXNlIGl0LiBPdGhlcndpc2UsIGRlZmF1bHQgdG8gXCJub25lXCIgZm9yIGZhZGVPdXQgb3IgdGhlIGVsZW1lbnQtc3BlY2lmaWMgZGVmYXVsdCBmb3IgZmFkZUluLiAqL1xuICAgICAgICAgICAgLyogTm90ZTogV2UgYWxsb3cgdXNlcnMgdG8gcGFzcyBpbiBcIm51bGxcIiB0byBza2lwIGRpc3BsYXkgc2V0dGluZyBhbHRvZ2V0aGVyLiAqL1xuICAgICAgICAgICAgaWYgKG9wdHMuZGlzcGxheSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG9wdHMuZGlzcGxheSA9IG9wdHMuZGlzcGxheSB8fCAoKGRpcmVjdGlvbiA9PT0gXCJJblwiKSA/IFwiYXV0b1wiIDogXCJub25lXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBWZWxvY2l0eS5hbmltYXRlKHRoaXMsIHByb3BlcnRpZXNNYXAsIG9wdHMpO1xuICAgICAgICB9O1xuICAgIH0pO1xufSkoKHdpbmRvdy5qUXVlcnkgfHwgd2luZG93LlplcHRvIHx8IHdpbmRvdyksIHdpbmRvdywgZG9jdW1lbnQpO1xuXG4vKioqKioqKioqKioqKioqKioqXG4gICBLbm93biBJc3N1ZXNcbioqKioqKioqKioqKioqKioqKi9cblxuLyogV2hlbiBhbmltYXRpbmcgaGVpZ2h0L3dpZHRoIHRvIGEgJSB2YWx1ZSBvbiBhbiBlbGVtZW50ICp3aXRob3V0KiBib3gtc2l6aW5nOmJvcmRlci1ib3ggYW5kICp3aXRoKiB2aXNpYmxlIHNjcm9sbGJhcnNcbiAgIG9uICpib3RoKiBheGVzLCB0aGUgb3Bwb3NpdGUgYXhpcyAoZS5nLiBoZWlnaHQgdnMgd2lkdGgpIHdpbGwgYmUgc2hvcnRlbmVkIGJ5IHRoZSBoZWlnaHQvd2lkdGggb2YgaXRzIHNjcm9sbGJhci4gKi9cblxuLyogVGhlIENTUyBzcGVjIG1hbmRhdGVzIHRoYXQgdGhlIHRyYW5zbGF0ZVgvWS9aIHRyYW5zZm9ybXMgYXJlICUtcmVsYXRpdmUgdG8gdGhlIGVsZW1lbnQgaXRzZWxmIC0tIG5vdCBpdHMgcGFyZW50LlxuICAgVmVsb2NpdHksIGhvd2V2ZXIsIGRvZXNuJ3QgbWFrZSB0aGlzIGRpc3RpbmN0aW9uLiBUaHVzLCBjb252ZXJ0aW5nIHRvIG9yIGZyb20gdGhlICUgdW5pdCB3aXRoIHRoZXNlIHN1YnByb3BlcnRpZXNcbiAgIHdpbGwgcHJvZHVjZSBhbiBpbmFjY3VyYXRlIGNvbnZlcnNpb24gdmFsdWUuIFRoZSBzYW1lIGlzc3VlIGV4aXN0cyB3aXRoIHRoZSBjeC9jeSBhdHRyaWJ1dGVzIG9mIFNWRyBjaXJjbGVzIGFuZCBlbGxpcHNlcy4gKi9cbjsgYnJvd3NlcmlmeV9zaGltX19kZWZpbmVfX21vZHVsZV9fZXhwb3J0X18odHlwZW9mIHZlbG9jaXR5ICE9IFwidW5kZWZpbmVkXCIgPyB2ZWxvY2l0eSA6IHdpbmRvdy52ZWxvY2l0eSk7XG5cbn0pLmNhbGwoZ2xvYmFsLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGZ1bmN0aW9uIGRlZmluZUV4cG9ydChleCkgeyBtb2R1bGUuZXhwb3J0cyA9IGV4OyB9KTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG47X19icm93c2VyaWZ5X3NoaW1fcmVxdWlyZV9fPXJlcXVpcmU7KGZ1bmN0aW9uIGJyb3dzZXJpZnlTaGltKG1vZHVsZSwgZXhwb3J0cywgcmVxdWlyZSwgZGVmaW5lLCBicm93c2VyaWZ5X3NoaW1fX2RlZmluZV9fbW9kdWxlX19leHBvcnRfXykge1xuLyoqKioqKioqKioqKioqKlxuICAgIERldGFpbHNcbioqKioqKioqKioqKioqKi9cblxuLyohXG4qIHZlbG9jaXR5LnVpLmpzOiBVSSBlZmZlY3RzIHBhY2sgZm9yIFZlbG9jaXR5LiBMb2FkIHRoaXMgZmlsZSBhZnRlciBqcXVlcnkudmVsb2NpdHkuanMuXG4qIEB2ZXJzaW9uIDQuMC42XG4qIEBkb2NzIGh0dHA6Ly92ZWxvY2l0eWpzLm9yZy8jdWlQYWNrXG4qIEBzdXBwb3J0IDw9SUU4OiBDYWxsb3V0cyB3aWxsIGhhdmUgbm8gZWZmZWN0LCBhbmQgdHJhbnNpdGlvbnMgd2lsbCBzaW1wbHkgZmFkZSBpbi9vdXQuIElFOS9BbmRyb2lkIDIuMzogTW9zdCBlZmZlY3RzIGFyZSBmdWxseSBzdXBwb3J0ZWQsIHRoZSByZXN0IGZhZGUgaW4vb3V0LiBBbGwgb3RoZXIgYnJvd3NlcnM6IEZ1bGwgc3VwcG9ydC5cbiogQGxpY2Vuc2UgQ29weXJpZ2h0IEp1bGlhbiBTaGFwaXJvLiBNSVQgTGljZW5zZTogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9NSVRfTGljZW5zZVxuKiBAbGljZW5zZSBJbmRpY2F0ZWQgcG9ydGlvbnMgYWRhcHRlZCBmcm9tIEFuaW1hdGUuY3NzLCBjb3B5cmlnaHQgRGFuaWVsIEVkZW4uIE1JVCBMaWNlbnNlOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL01JVF9MaWNlbnNlXG4qIEBsaWNlbnNlIEluZGljYXRlZCBwb3J0aW9ucyBhZGFwdGVkIGZyb20gTWFnaWMuY3NzLCBjb3B5cmlnaHQgQ2hyaXN0aWFuIFB1Y2NpLiBNSVQgTGljZW5zZTogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9NSVRfTGljZW5zZVxuKi8gICBcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqKioqKioqKioqKipcbiAgICAgICAgU2V0dXBcbiAgICAqKioqKioqKioqKioqL1xuXG4gICAgdmFyIENvbnRhaW5lciA9ICh3aW5kb3cualF1ZXJ5IHx8IHdpbmRvdy5aZXB0byB8fCB3aW5kb3cpO1xuXG4gICAgaWYgKCFDb250YWluZXIuVmVsb2NpdHkgfHwgIUNvbnRhaW5lci5WZWxvY2l0eS5VdGlsaXRpZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJWZWxvY2l0eSBVSSBQYWNrOiBWZWxvY2l0eSBtdXN0IGJlIGxvYWRlZCBmaXJzdC4gQWJvcnRpbmcuXCIpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIUNvbnRhaW5lci5WZWxvY2l0eS52ZXJzaW9uIHx8IChDb250YWluZXIuVmVsb2NpdHkudmVyc2lvbi5tYWpvciA8PSAwICYmIENvbnRhaW5lci5WZWxvY2l0eS52ZXJzaW9uLm1pbm9yIDw9IDUgJiYgQ29udGFpbmVyLlZlbG9jaXR5LnZlcnNpb24ucGF0Y2ggPD0gMikpIHtcbiAgICAgICAgdmFyIGFib3J0RXJyb3IgPSBcIlZlbG9jaXR5IFVJIFBhY2s6IFlvdSBuZWVkIHRvIHVwZGF0ZSBWZWxvY2l0eSAoanF1ZXJ5LnZlbG9jaXR5LmpzKSB0byBhIG5ld2VyIHZlcnNpb24uIFZpc2l0IGh0dHA6Ly9naXRodWIuY29tL2p1bGlhbnNoYXBpcm8vdmVsb2NpdHkuXCI7XG5cbiAgICAgICAgYWxlcnQoYWJvcnRFcnJvcik7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihhYm9ydEVycm9yKTtcbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKioqKioqXG4gICAgICAgUmVnaXN0cmF0aW9uXG4gICAgKioqKioqKioqKioqKioqKioqL1xuXG4gICAgQ29udGFpbmVyLlZlbG9jaXR5LlJlZ2lzdGVyVUkgPSBmdW5jdGlvbiAoZWZmZWN0TmFtZSwgcHJvcGVydGllcykge1xuICAgICAgICAvKiBBbmltYXRlIHRoZSBleHBhbnNpb24vY29udHJhY3Rpb24gb2YgdGhlIGVsZW1lbnRzJyBwYXJlbnQncyBoZWlnaHQgZm9yIEluL091dCBlZmZlY3RzLiAqL1xuICAgICAgICBmdW5jdGlvbiBhbmltYXRlUGFyZW50SGVpZ2h0IChlbGVtZW50cywgZGlyZWN0aW9uLCB0b3RhbER1cmF0aW9uLCBzdGFnZ2VyKSB7XG4gICAgICAgICAgICB2YXIgdG90YWxIZWlnaHREZWx0YSA9IDAsXG4gICAgICAgICAgICAgICAgcGFyZW50Tm9kZTtcblxuICAgICAgICAgICAgLyogU3VtIHRoZSB0b3RhbCBoZWlnaHQgKGluY2x1ZGluZyBwYWRkaW5nIGFuZCBtYXJnaW4pIG9mIGFsbCB0YXJnZXRlZCBlbGVtZW50cy4gKi9cbiAgICAgICAgICAgIENvbnRhaW5lci5WZWxvY2l0eS5VdGlsaXRpZXMuZWFjaChlbGVtZW50cywgZnVuY3Rpb24oaSwgZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGlmIChzdGFnZ2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qIEluY3JlYXNlIHRoZSB0b3RhbER1cmF0aW9uIGJ5IHRoZSBzdWNjZXNzaXZlIGRlbGF5IGFtb3VudHMgcHJvZHVjZWQgYnkgdGhlIHN0YWdnZXIgb3B0aW9uLiAqL1xuICAgICAgICAgICAgICAgICAgICB0b3RhbER1cmF0aW9uICs9IGkgKiBzdGFnZ2VyO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUgPSBlbGVtZW50LnBhcmVudE5vZGU7XG5cbiAgICAgICAgICAgICAgICBDb250YWluZXIuVmVsb2NpdHkuVXRpbGl0aWVzLmVhY2goWyBcImhlaWdodFwiLCBcInBhZGRpbmdUb3BcIiwgXCJwYWRkaW5nQm90dG9tXCIsIFwibWFyZ2luVG9wXCIsIFwibWFyZ2luQm90dG9tXCJdLCBmdW5jdGlvbihpLCBwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICB0b3RhbEhlaWdodERlbHRhICs9IHBhcnNlRmxvYXQoQ29udGFpbmVyLlZlbG9jaXR5LkNTUy5nZXRQcm9wZXJ0eVZhbHVlKGVsZW1lbnQsIHByb3BlcnR5KSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLyogQW5pbWF0ZSB0aGUgcGFyZW50IGVsZW1lbnQncyBoZWlnaHQgYWRqdXN0bWVudCAod2l0aCBhIHZhcnlpbmcgZHVyYXRpb24gbXVsdGlwbGllciBmb3IgYWVzdGhldGljIGJlbmVmaXRzKS4gKi9cbiAgICAgICAgICAgIENvbnRhaW5lci5WZWxvY2l0eS5hbmltYXRlKFxuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUsXG4gICAgICAgICAgICAgICAgeyBoZWlnaHQ6IChkaXJlY3Rpb24gPT09IFwiSW5cIiA/IFwiK1wiIDogXCItXCIpICsgXCI9XCIgKyB0b3RhbEhlaWdodERlbHRhIH0sXG4gICAgICAgICAgICAgICAgeyBxdWV1ZTogZmFsc2UsIGVhc2luZzogXCJlYXNlLWluLW91dFwiLCBkdXJhdGlvbjogdG90YWxEdXJhdGlvbiAqIChkaXJlY3Rpb24gPT09IFwiSW5cIiA/IDAuNiA6IDEpIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBSZWdpc3RlciBhIGN1c3RvbSBzZXF1ZW5jZSBmb3IgZWFjaCBlZmZlY3QuICovXG4gICAgICAgIENvbnRhaW5lci5WZWxvY2l0eS5TZXF1ZW5jZXNbZWZmZWN0TmFtZV0gPSBmdW5jdGlvbiAoZWxlbWVudCwgc2VxdWVuY2VPcHRpb25zLCBlbGVtZW50c0luZGV4LCBlbGVtZW50c1NpemUsIGVsZW1lbnRzLCBwcm9taXNlRGF0YSkge1xuICAgICAgICAgICAgdmFyIGZpbmFsRWxlbWVudCA9IChlbGVtZW50c0luZGV4ID09PSBlbGVtZW50c1NpemUgLSAxKTtcblxuICAgICAgICAgICAgLyogSXRlcmF0ZSB0aHJvdWdoIGVhY2ggZWZmZWN0J3MgY2FsbCBhcnJheS4gKi9cbiAgICAgICAgICAgIGZvciAodmFyIGNhbGxJbmRleCA9IDA7IGNhbGxJbmRleCA8IHByb3BlcnRpZXMuY2FsbHMubGVuZ3RoOyBjYWxsSW5kZXgrKykge1xuICAgICAgICAgICAgICAgIHZhciBjYWxsID0gcHJvcGVydGllcy5jYWxsc1tjYWxsSW5kZXhdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eU1hcCA9IGNhbGxbMF0sXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlRHVyYXRpb24gPSAoc2VxdWVuY2VPcHRpb25zLmR1cmF0aW9uIHx8IHByb3BlcnRpZXMuZGVmYXVsdER1cmF0aW9uIHx8IDEwMDApLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvblBlcmNlbnRhZ2UgPSBjYWxsWzFdLFxuICAgICAgICAgICAgICAgICAgICBjYWxsT3B0aW9ucyA9IGNhbGxbMl0gfHwge30sXG4gICAgICAgICAgICAgICAgICAgIG9wdHMgPSB7fTtcblxuICAgICAgICAgICAgICAgIC8qIEFzc2lnbiB0aGUgd2hpdGVsaXN0ZWQgcGVyLWNhbGwgb3B0aW9ucy4gKi9cbiAgICAgICAgICAgICAgICBvcHRzLmR1cmF0aW9uID0gc2VxdWVuY2VEdXJhdGlvbiAqIChkdXJhdGlvblBlcmNlbnRhZ2UgfHwgMSk7XG4gICAgICAgICAgICAgICAgb3B0cy5xdWV1ZSA9IHNlcXVlbmNlT3B0aW9ucy5xdWV1ZSB8fCBcIlwiO1xuICAgICAgICAgICAgICAgIG9wdHMuZWFzaW5nID0gY2FsbE9wdGlvbnMuZWFzaW5nIHx8IFwiZWFzZVwiO1xuICAgICAgICAgICAgICAgIG9wdHMuZGVsYXkgPSBjYWxsT3B0aW9ucy5kZWxheSB8fCAwO1xuXG4gICAgICAgICAgICAgICAgLyogU3BlY2lhbCBwcm9jZXNzaW5nIGZvciB0aGUgZmlyc3QgZWZmZWN0IGNhbGwuICovXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAvKiBJZiBhIGRlbGF5IHdhcyBwYXNzZWQgaW50byB0aGUgc2VxdWVuY2UsIGNvbWJpbmUgaXQgd2l0aCB0aGUgZmlyc3QgY2FsbCdzIGRlbGF5LiAqL1xuICAgICAgICAgICAgICAgICAgICBvcHRzLmRlbGF5ICs9IChzZXF1ZW5jZU9wdGlvbnMuZGVsYXkgfHwgMCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnRzSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuYmVnaW4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBPbmx5IHRyaWdnZXIgYSBiZWdpbiBjYWxsYmFjayBvbiB0aGUgZmlyc3QgZWZmZWN0IGNhbGwgd2l0aCB0aGUgZmlyc3QgZWxlbWVudCBpbiB0aGUgc2V0LiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlT3B0aW9ucy5iZWdpbiAmJiBzZXF1ZW5jZU9wdGlvbnMuYmVnaW4uY2FsbChlbGVtZW50cywgZWxlbWVudHMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogT25seSB0cmlnZ2VyIGFuaW1hdGVQYXJlbnRIZWlnaHQoKSBpZiB3ZSdyZSB1c2luZyBhbiBJbi9PdXQgdHJhbnNpdGlvbi4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gZWZmZWN0TmFtZS5tYXRjaCgvKElufE91dCkkLyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlcXVlbmNlT3B0aW9ucy5hbmltYXRlUGFyZW50SGVpZ2h0ICYmIGRpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlUGFyZW50SGVpZ2h0KGVsZW1lbnRzLCBkaXJlY3Rpb25bMF0sIHNlcXVlbmNlRHVyYXRpb24gKyBvcHRzLmRlbGF5LCBzZXF1ZW5jZU9wdGlvbnMuc3RhZ2dlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLyogSWYgdGhlIHVzZXIgaXNuJ3Qgb3ZlcnJpZGluZyB0aGUgZGlzcGxheSBvcHRpb24sIGRlZmF1bHQgdG8gXCJhdXRvXCIgZm9yIFwiSW5cIi1zdWZmaXhlZCB0cmFuc2l0aW9ucy4gKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlcXVlbmNlT3B0aW9ucy5kaXNwbGF5ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VxdWVuY2VPcHRpb25zLmRpc3BsYXkgJiYgc2VxdWVuY2VPcHRpb25zLmRpc3BsYXkgIT09IFwibm9uZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5kaXNwbGF5ID0gc2VxdWVuY2VPcHRpb25zLmRpc3BsYXk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKC9JbiQvLnRlc3QoZWZmZWN0TmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBJbmxpbmUgZWxlbWVudHMgY2Fubm90IGJlIHN1YmplY3RlZCB0byB0cmFuc2Zvcm1zLCBzbyB3ZSBzd2l0Y2ggdGhlbSB0byBpbmxpbmUtYmxvY2suICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlZmF1bHREaXNwbGF5ID0gQ29udGFpbmVyLlZlbG9jaXR5LkNTUy5WYWx1ZXMuZ2V0RGlzcGxheVR5cGUoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5kaXNwbGF5ID0gKGRlZmF1bHREaXNwbGF5ID09PSBcImlubGluZVwiKSA/IFwiaW5saW5lLWJsb2NrXCIgOiBkZWZhdWx0RGlzcGxheTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXF1ZW5jZU9wdGlvbnMudmlzaWJpbGl0eSAmJiBzZXF1ZW5jZU9wdGlvbnMudmlzaWJpbGl0eSAhPT0gXCJoaWRkZW5cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy52aXNpYmlsaXR5ID0gc2VxdWVuY2VPcHRpb25zLnZpc2liaWxpdHk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvKiBTcGVjaWFsIHByb2Nlc3NpbmcgZm9yIHRoZSBsYXN0IGVmZmVjdCBjYWxsLiAqL1xuICAgICAgICAgICAgICAgIGlmIChjYWxsSW5kZXggPT09IHByb3BlcnRpZXMuY2FsbHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAvKiBBcHBlbmQgcHJvbWlzZSByZXNvbHZpbmcgb250byB0aGUgdXNlcidzIHNlcXVlbmNlIGNhbGxiYWNrLiAqLyBcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gaW5qZWN0RmluYWxDYWxsYmFja3MgKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChzZXF1ZW5jZU9wdGlvbnMuZGlzcGxheSA9PT0gdW5kZWZpbmVkIHx8IHNlcXVlbmNlT3B0aW9ucy5kaXNwbGF5ID09PSBcIm5vbmVcIikgJiYgL091dCQvLnRlc3QoZWZmZWN0TmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb250YWluZXIuVmVsb2NpdHkuVXRpbGl0aWVzLmVhY2goZWxlbWVudHMsIGZ1bmN0aW9uKGksIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29udGFpbmVyLlZlbG9jaXR5LkNTUy5zZXRQcm9wZXJ0eVZhbHVlKGVsZW1lbnQsIFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlT3B0aW9ucy5jb21wbGV0ZSAmJiBzZXF1ZW5jZU9wdGlvbnMuY29tcGxldGUuY2FsbChlbGVtZW50cywgZWxlbWVudHMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvbWlzZURhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlRGF0YS5yZXNvbHZlcihlbGVtZW50cyB8fCBlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIG9wdHMuY29tcGxldGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzLnJlc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcmVzZXRQcm9wZXJ0eSBpbiBwcm9wZXJ0aWVzLnJlc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXNldFZhbHVlID0gcHJvcGVydGllcy5yZXNldFtyZXNldFByb3BlcnR5XTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBGb3JtYXQgZWFjaCBub24tYXJyYXkgdmFsdWUgaW4gdGhlIHJlc2V0IHByb3BlcnR5IG1hcCB0byBbIHZhbHVlLCB2YWx1ZSBdIHNvIHRoYXQgY2hhbmdlcyBhcHBseVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbW1lZGlhdGVseSBhbmQgRE9NIHF1ZXJ5aW5nIGlzIGF2b2lkZWQgKHZpYSBmb3JjZWZlZWRpbmcpLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc2V0VmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHJlc2V0VmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMucmVzZXRbcmVzZXRQcm9wZXJ0eV0gPSBbIHByb3BlcnRpZXMucmVzZXRbcmVzZXRQcm9wZXJ0eV0sIHByb3BlcnRpZXMucmVzZXRbcmVzZXRQcm9wZXJ0eV0gXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIFNvIHRoYXQgdGhlIHJlc2V0IHZhbHVlcyBhcmUgYXBwbGllZCBpbnN0YW50bHkgdXBvbiB0aGUgbmV4dCByQUYgdGljaywgdXNlIGEgemVybyBkdXJhdGlvbiBhbmQgcGFyYWxsZWwgcXVldWVpbmcuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc2V0T3B0aW9ucyA9IHsgZHVyYXRpb246IDAsIHF1ZXVlOiBmYWxzZSB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogU2luY2UgdGhlIHJlc2V0IG9wdGlvbiB1c2VzIHVwIHRoZSBjb21wbGV0ZSBjYWxsYmFjaywgd2UgdHJpZ2dlciB0aGUgdXNlcidzIGNvbXBsZXRlIGNhbGxiYWNrIGF0IHRoZSBlbmQgb2Ygb3Vycy4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmluYWxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0T3B0aW9ucy5jb21wbGV0ZSA9IGluamVjdEZpbmFsQ2FsbGJhY2tzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29udGFpbmVyLlZlbG9jaXR5LmFuaW1hdGUoZWxlbWVudCwgcHJvcGVydGllcy5yZXNldCwgcmVzZXRPcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIE9ubHkgdHJpZ2dlciB0aGUgdXNlcidzIGNvbXBsZXRlIGNhbGxiYWNrIG9uIHRoZSBsYXN0IGVmZmVjdCBjYWxsIHdpdGggdGhlIGxhc3QgZWxlbWVudCBpbiB0aGUgc2V0LiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaW5hbEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmplY3RGaW5hbENhbGxiYWNrcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXF1ZW5jZU9wdGlvbnMudmlzaWJpbGl0eSA9PT0gXCJoaWRkZW5cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy52aXNpYmlsaXR5ID0gc2VxdWVuY2VPcHRpb25zLnZpc2liaWxpdHk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBDb250YWluZXIuVmVsb2NpdHkuYW5pbWF0ZShlbGVtZW50LCBwcm9wZXJ0eU1hcCwgb3B0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIC8qKioqKioqKioqKioqKioqKioqKipcbiAgICAgICBQYWNrYWdlZCBFZmZlY3RzXG4gICAgKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgLyogRXh0ZXJuYWxpemUgdGhlIHBhY2thZ2VkRWZmZWN0cyBkYXRhIHNvIHRoYXQgdGhleSBjYW4gb3B0aW9uYWxseSBiZSBtb2RpZmllZCBhbmQgcmUtcmVnaXN0ZXJlZC4gKi9cbiAgICBDb250YWluZXIuVmVsb2NpdHkuUmVnaXN0ZXJVSS5wYWNrYWdlZEVmZmVjdHMgPSBcbiAgICAgICAgeyBcbiAgICAgICAgICAgIC8qIEFuaW1hdGUuY3NzICovXG4gICAgICAgICAgICBcImNhbGxvdXQuYm91bmNlXCI6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0RHVyYXRpb246IDU1MCxcbiAgICAgICAgICAgICAgICBjYWxsczogW1xuICAgICAgICAgICAgICAgICAgICBbIHsgdHJhbnNsYXRlWTogLTMwIH0sIDAuMjUgXSxcbiAgICAgICAgICAgICAgICAgICAgWyB7IHRyYW5zbGF0ZVk6IDAgfSwgMC4xMjUgXSxcbiAgICAgICAgICAgICAgICAgICAgWyB7IHRyYW5zbGF0ZVk6IC0xNSB9LCAwLjEyNSBdLFxuICAgICAgICAgICAgICAgICAgICBbIHsgdHJhbnNsYXRlWTogMCB9LCAwLjI1IF1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLyogQW5pbWF0ZS5jc3MgKi9cbiAgICAgICAgICAgIFwiY2FsbG91dC5zaGFrZVwiOiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdER1cmF0aW9uOiA4MDAsXG4gICAgICAgICAgICAgICAgY2FsbHM6IFsgXG4gICAgICAgICAgICAgICAgICAgIFsgeyB0cmFuc2xhdGVYOiAtMTEgfSwgMC4xMjUgXSxcbiAgICAgICAgICAgICAgICAgICAgWyB7IHRyYW5zbGF0ZVg6IDExIH0sIDAuMTI1IF0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyB0cmFuc2xhdGVYOiAtMTEgfSwgMC4xMjUgXSxcbiAgICAgICAgICAgICAgICAgICAgWyB7IHRyYW5zbGF0ZVg6IDExIH0sIDAuMTI1IF0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyB0cmFuc2xhdGVYOiAtMTEgfSwgMC4xMjUgXSxcbiAgICAgICAgICAgICAgICAgICAgWyB7IHRyYW5zbGF0ZVg6IDExIH0sIDAuMTI1IF0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyB0cmFuc2xhdGVYOiAtMTEgfSwgMC4xMjUgXSxcbiAgICAgICAgICAgICAgICAgICAgWyB7IHRyYW5zbGF0ZVg6IDAgfSwgMC4xMjUgXVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKiBBbmltYXRlLmNzcyAqL1xuICAgICAgICAgICAgXCJjYWxsb3V0LmZsYXNoXCI6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0RHVyYXRpb246IDExMDAsXG4gICAgICAgICAgICAgICAgY2FsbHM6IFsgXG4gICAgICAgICAgICAgICAgICAgIFsgeyBvcGFjaXR5OiBbIDAsIFwiZWFzZUluT3V0UXVhZFwiLCAxIF0gfSwgMC4yNSBdLFxuICAgICAgICAgICAgICAgICAgICBbIHsgb3BhY2l0eTogWyAxLCBcImVhc2VJbk91dFF1YWRcIiBdIH0sIDAuMjUgXSxcbiAgICAgICAgICAgICAgICAgICAgWyB7IG9wYWNpdHk6IFsgMCwgXCJlYXNlSW5PdXRRdWFkXCIgXSB9LCAwLjI1IF0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyBvcGFjaXR5OiBbIDEsIFwiZWFzZUluT3V0UXVhZFwiIF0gfSwgMC4yNSBdXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qIEFuaW1hdGUuY3NzICovXG4gICAgICAgICAgICBcImNhbGxvdXQucHVsc2VcIjoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHREdXJhdGlvbjogODI1LFxuICAgICAgICAgICAgICAgIGNhbGxzOiBbIFxuICAgICAgICAgICAgICAgICAgICBbIHsgc2NhbGVYOiAxLjEsIHNjYWxlWTogMS4xIH0sIDAuNTAgXSxcbiAgICAgICAgICAgICAgICAgICAgWyB7IHNjYWxlWDogMSwgc2NhbGVZOiAxIH0sIDAuNTAgXVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKiBBbmltYXRlLmNzcyAqL1xuICAgICAgICAgICAgXCJjYWxsb3V0LnN3aW5nXCI6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0RHVyYXRpb246IDk1MCxcbiAgICAgICAgICAgICAgICBjYWxsczogWyBcbiAgICAgICAgICAgICAgICAgICAgWyB7IHJvdGF0ZVo6IDE1IH0sIDAuMjAgXSxcbiAgICAgICAgICAgICAgICAgICAgWyB7IHJvdGF0ZVo6IC0xMCB9LCAwLjIwIF0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyByb3RhdGVaOiA1IH0sIDAuMjAgXSxcbiAgICAgICAgICAgICAgICAgICAgWyB7IHJvdGF0ZVo6IC01IH0sIDAuMjAgXSxcbiAgICAgICAgICAgICAgICAgICAgWyB7IHJvdGF0ZVo6IDAgfSwgMC4yMCBdXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qIEFuaW1hdGUuY3NzICovXG4gICAgICAgICAgICBcImNhbGxvdXQudGFkYVwiOiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdER1cmF0aW9uOiAxMDAwLFxuICAgICAgICAgICAgICAgIGNhbGxzOiBbIFxuICAgICAgICAgICAgICAgICAgICBbIHsgc2NhbGVYOiAwLjksIHNjYWxlWTogMC45LCByb3RhdGVaOiAtMyB9LCAwLjEwIF0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyBzY2FsZVg6IDEuMSwgc2NhbGVZOiAxLjEsIHJvdGF0ZVo6IDMgfSwgMC4xMCBdLFxuICAgICAgICAgICAgICAgICAgICBbIHsgc2NhbGVYOiAxLjEsIHNjYWxlWTogMS4xLCByb3RhdGVaOiAtMyB9LCAwLjEwIF0sXG4gICAgICAgICAgICAgICAgICAgIFsgXCJyZXZlcnNlXCIsIDAuMTI1IF0sXG4gICAgICAgICAgICAgICAgICAgIFsgXCJyZXZlcnNlXCIsIDAuMTI1IF0sXG4gICAgICAgICAgICAgICAgICAgIFsgXCJyZXZlcnNlXCIsIDAuMTI1IF0sXG4gICAgICAgICAgICAgICAgICAgIFsgXCJyZXZlcnNlXCIsIDAuMTI1IF0sXG4gICAgICAgICAgICAgICAgICAgIFsgXCJyZXZlcnNlXCIsIDAuMTI1IF0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyBzY2FsZVg6IDEsIHNjYWxlWTogMSwgcm90YXRlWjogMCB9LCAwLjIwIF1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJ0cmFuc2l0aW9uLmZhZGVJblwiOiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdER1cmF0aW9uOiA1MDAsXG4gICAgICAgICAgICAgICAgY2FsbHM6IFtcbiAgICAgICAgICAgICAgICAgICAgWyB7IG9wYWNpdHk6IFsgMSwgMCBdIH0gXVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInRyYW5zaXRpb24uZmFkZU91dFwiOiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdER1cmF0aW9uOiA1MDAsXG4gICAgICAgICAgICAgICAgY2FsbHM6IFtcbiAgICAgICAgICAgICAgICAgICAgWyB7IG9wYWNpdHk6IFsgMCwgMSBdIH0gXVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKiBTdXBwb3J0OiBMb3NlcyByb3RhdGlvbiBpbiBJRTkvQW5kcm9pZCAyLjMgKGZhZGVzIG9ubHkpLiAqL1xuICAgICAgICAgICAgXCJ0cmFuc2l0aW9uLmZsaXBYSW5cIjoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHREdXJhdGlvbjogNzAwLFxuICAgICAgICAgICAgICAgIGNhbGxzOiBbIFxuICAgICAgICAgICAgICAgICAgICBbIHsgb3BhY2l0eTogWyAxLCAwIF0sIHRyYW5zZm9ybVBlcnNwZWN0aXZlOiBbIDgwMCwgODAwIF0sIHJvdGF0ZVk6IFsgMCwgLTU1IF0gfSBdXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICByZXNldDogeyB0cmFuc2Zvcm1QZXJzcGVjdGl2ZTogMCB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLyogU3VwcG9ydDogTG9zZXMgcm90YXRpb24gaW4gSUU5L0FuZHJvaWQgMi4zIChmYWRlcyBvbmx5KS4gKi9cbiAgICAgICAgICAgIFwidHJhbnNpdGlvbi5mbGlwWE91dFwiOiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdER1cmF0aW9uOiA3MDAsXG4gICAgICAgICAgICAgICAgY2FsbHM6IFsgXG4gICAgICAgICAgICAgICAgICAgIFsgeyBvcGFjaXR5OiBbIDAsIDEgXSwgdHJhbnNmb3JtUGVyc3BlY3RpdmU6IFsgODAwLCA4MDAgXSwgcm90YXRlWTogNTUgfSBdXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICByZXNldDogeyB0cmFuc2Zvcm1QZXJzcGVjdGl2ZTogMCwgcm90YXRlWTogMCB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLyogU3VwcG9ydDogTG9zZXMgcm90YXRpb24gaW4gSUU5L0FuZHJvaWQgMi4zIChmYWRlcyBvbmx5KS4gKi9cbiAgICAgICAgICAgIFwidHJhbnNpdGlvbi5mbGlwWUluXCI6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0RHVyYXRpb246IDgwMCxcbiAgICAgICAgICAgICAgICBjYWxsczogWyBcbiAgICAgICAgICAgICAgICAgICAgWyB7IG9wYWNpdHk6IFsgMSwgMCBdLCB0cmFuc2Zvcm1QZXJzcGVjdGl2ZTogWyA4MDAsIDgwMCBdLCByb3RhdGVYOiBbIDAsIC00NSBdIH0gXVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcmVzZXQ6IHsgdHJhbnNmb3JtUGVyc3BlY3RpdmU6IDAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qIFN1cHBvcnQ6IExvc2VzIHJvdGF0aW9uIGluIElFOS9BbmRyb2lkIDIuMyAoZmFkZXMgb25seSkuICovXG4gICAgICAgICAgICBcInRyYW5zaXRpb24uZmxpcFlPdXRcIjoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHREdXJhdGlvbjogODAwLFxuICAgICAgICAgICAgICAgIGNhbGxzOiBbIFxuICAgICAgICAgICAgICAgICAgICBbIHsgb3BhY2l0eTogWyAwLCAxIF0sIHRyYW5zZm9ybVBlcnNwZWN0aXZlOiBbIDgwMCwgODAwIF0sIHJvdGF0ZVg6IDI1IH0gXVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcmVzZXQ6IHsgdHJhbnNmb3JtUGVyc3BlY3RpdmU6IDAsIHJvdGF0ZVg6IDAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qIEFuaW1hdGUuY3NzICovXG4gICAgICAgICAgICAvKiBTdXBwb3J0OiBMb3NlcyByb3RhdGlvbiBpbiBJRTkvQW5kcm9pZCAyLjMgKGZhZGVzIG9ubHkpLiAqL1xuICAgICAgICAgICAgXCJ0cmFuc2l0aW9uLmZsaXBCb3VuY2VYSW5cIjoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHREdXJhdGlvbjogOTAwLFxuICAgICAgICAgICAgICAgIGNhbGxzOiBbIFxuICAgICAgICAgICAgICAgICAgICBbIHsgb3BhY2l0eTogWyAwLjcyNSwgMCBdLCB0cmFuc2Zvcm1QZXJzcGVjdGl2ZTogWyA0MDAsIDQwMCBdLCByb3RhdGVZOiBbIC0xMCwgOTAgXSB9LCAwLjUwIF0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyBvcGFjaXR5OiAwLjgwLCByb3RhdGVZOiAxMCB9LCAwLjI1IF0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyBvcGFjaXR5OiAxLCByb3RhdGVZOiAwIH0sIDAuMjUgXVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcmVzZXQ6IHsgdHJhbnNmb3JtUGVyc3BlY3RpdmU6IDAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qIEFuaW1hdGUuY3NzICovXG4gICAgICAgICAgICAvKiBTdXBwb3J0OiBMb3NlcyByb3RhdGlvbiBpbiBJRTkvQW5kcm9pZCAyLjMgKGZhZGVzIG9ubHkpLiAqL1xuICAgICAgICAgICAgXCJ0cmFuc2l0aW9uLmZsaXBCb3VuY2VYT3V0XCI6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0RHVyYXRpb246IDgwMCxcbiAgICAgICAgICAgICAgICBjYWxsczogWyBcbiAgICAgICAgICAgICAgICAgICAgWyB7IG9wYWNpdHk6IFsgMC45LCAxIF0sIHRyYW5zZm9ybVBlcnNwZWN0aXZlOiBbIDQwMCwgNDAwIF0sIHJvdGF0ZVk6IC0xMCB9LCAwLjUwIF0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyBvcGFjaXR5OiAwLCByb3RhdGVZOiA5MCB9LCAwLjUwIF1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJlc2V0OiB7IHRyYW5zZm9ybVBlcnNwZWN0aXZlOiAwLCByb3RhdGVZOiAwIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKiBBbmltYXRlLmNzcyAqL1xuICAgICAgICAgICAgLyogU3VwcG9ydDogTG9zZXMgcm90YXRpb24gaW4gSUU5L0FuZHJvaWQgMi4zIChmYWRlcyBvbmx5KS4gKi9cbiAgICAgICAgICAgIFwidHJhbnNpdGlvbi5mbGlwQm91bmNlWUluXCI6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0RHVyYXRpb246IDg1MCxcbiAgICAgICAgICAgICAgICBjYWxsczogWyBcbiAgICAgICAgICAgICAgICAgICAgWyB7IG9wYWNpdHk6IFsgMC43MjUsIDAgXSwgdHJhbnNmb3JtUGVyc3BlY3RpdmU6IFsgNDAwLCA0MDAgXSwgcm90YXRlWDogWyAtMTAsIDkwIF0gfSwgMC41MCBdLFxuICAgICAgICAgICAgICAgICAgICBbIHsgb3BhY2l0eTogMC44MCwgcm90YXRlWDogMTAgfSwgMC4yNSBdLFxuICAgICAgICAgICAgICAgICAgICBbIHsgb3BhY2l0eTogMSwgcm90YXRlWDogMCB9LCAwLjI1IF1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJlc2V0OiB7IHRyYW5zZm9ybVBlcnNwZWN0aXZlOiAwIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKiBBbmltYXRlLmNzcyAqL1xuICAgICAgICAgICAgLyogU3VwcG9ydDogTG9zZXMgcm90YXRpb24gaW4gSUU5L0FuZHJvaWQgMi4zIChmYWRlcyBvbmx5KS4gKi9cbiAgICAgICAgICAgIFwidHJhbnNpdGlvbi5mbGlwQm91bmNlWU91dFwiOiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdER1cmF0aW9uOiA4MDAsXG4gICAgICAgICAgICAgICAgY2FsbHM6IFsgXG4gICAgICAgICAgICAgICAgICAgIFsgeyBvcGFjaXR5OiBbIDAuOSwgMSBdLCB0cmFuc2Zvcm1QZXJzcGVjdGl2ZTogWyA0MDAsIDQwMCBdLCByb3RhdGVYOiAtMTUgfSwgMC41MCBdLFxuICAgICAgICAgICAgICAgICAgICBbIHsgb3BhY2l0eTogMCwgcm90YXRlWDogOTAgfSwgMC41MCBdXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICByZXNldDogeyB0cmFuc2Zvcm1QZXJzcGVjdGl2ZTogMCwgcm90YXRlWDogMCB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLyogTWFnaWMuY3NzICovXG4gICAgICAgICAgICBcInRyYW5zaXRpb24uc3dvb3BJblwiOiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdER1cmF0aW9uOiA4NTAsXG4gICAgICAgICAgICAgICAgY2FsbHM6IFsgXG4gICAgICAgICAgICAgICAgICAgIFsgeyBvcGFjaXR5OiBbIDEsIDAgXSwgdHJhbnNmb3JtT3JpZ2luWDogWyBcIjEwMCVcIiwgXCI1MCVcIiBdLCB0cmFuc2Zvcm1PcmlnaW5ZOiBbIFwiMTAwJVwiLCBcIjEwMCVcIiBdLCBzY2FsZVg6IFsgMSwgMCBdLCBzY2FsZVk6IFsgMSwgMCBdLCB0cmFuc2xhdGVYOiBbIDAsIC03MDAgXSwgdHJhbnNsYXRlWjogMCB9IF1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJlc2V0OiB7IHRyYW5zZm9ybU9yaWdpblg6IFwiNTAlXCIsIHRyYW5zZm9ybU9yaWdpblk6IFwiNTAlXCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qIE1hZ2ljLmNzcyAqL1xuICAgICAgICAgICAgXCJ0cmFuc2l0aW9uLnN3b29wT3V0XCI6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0RHVyYXRpb246IDg1MCxcbiAgICAgICAgICAgICAgICBjYWxsczogWyBcbiAgICAgICAgICAgICAgICAgICAgWyB7IG9wYWNpdHk6IFsgMCwgMSBdLCB0cmFuc2Zvcm1PcmlnaW5YOiBbIFwiNTAlXCIsIFwiMTAwJVwiIF0sIHRyYW5zZm9ybU9yaWdpblk6IFsgXCIxMDAlXCIsIFwiMTAwJVwiIF0sIHNjYWxlWDogMCwgc2NhbGVZOiAwLCB0cmFuc2xhdGVYOiAtNzAwLCB0cmFuc2xhdGVaOiAwIH0gXVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcmVzZXQ6IHsgdHJhbnNmb3JtT3JpZ2luWDogXCI1MCVcIiwgdHJhbnNmb3JtT3JpZ2luWTogXCI1MCVcIiwgc2NhbGVYOiAxLCBzY2FsZVk6IDEsIHRyYW5zbGF0ZVg6IDAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qIE1hZ2ljLmNzcyAqL1xuICAgICAgICAgICAgLyogU3VwcG9ydDogTG9zZXMgcm90YXRpb24gaW4gSUU5L0FuZHJvaWQgMi4zLiAoRmFkZXMgYW5kIHNjYWxlcyBvbmx5LikgKi9cbiAgICAgICAgICAgIFwidHJhbnNpdGlvbi53aGlybEluXCI6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0RHVyYXRpb246IDkwMCxcbiAgICAgICAgICAgICAgICBjYWxsczogWyBcbiAgICAgICAgICAgICAgICAgICAgWyB7IG9wYWNpdHk6IFsgMSwgMCBdLCB0cmFuc2Zvcm1PcmlnaW5YOiBbIFwiNTAlXCIsIFwiNTAlXCIgXSwgdHJhbnNmb3JtT3JpZ2luWTogWyBcIjUwJVwiLCBcIjUwJVwiIF0sIHNjYWxlWDogWyAxLCAwIF0sIHNjYWxlWTogWyAxLCAwIF0sIHJvdGF0ZVk6IFsgMCwgMTYwIF0gfSBdXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qIE1hZ2ljLmNzcyAqL1xuICAgICAgICAgICAgLyogU3VwcG9ydDogTG9zZXMgcm90YXRpb24gaW4gSUU5L0FuZHJvaWQgMi4zLiAoRmFkZXMgYW5kIHNjYWxlcyBvbmx5LikgKi9cbiAgICAgICAgICAgIFwidHJhbnNpdGlvbi53aGlybE91dFwiOiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdER1cmF0aW9uOiA5MDAsXG4gICAgICAgICAgICAgICAgY2FsbHM6IFsgXG4gICAgICAgICAgICAgICAgICAgIFsgeyBvcGFjaXR5OiBbIDAsIDEgXSwgdHJhbnNmb3JtT3JpZ2luWDogWyBcIjUwJVwiLCBcIjUwJVwiIF0sIHRyYW5zZm9ybU9yaWdpblk6IFsgXCI1MCVcIiwgXCI1MCVcIiBdLCBzY2FsZVg6IDAsIHNjYWxlWTogMCwgcm90YXRlWTogMTYwIH0gXVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcmVzZXQ6IHsgc2NhbGVYOiAxLCBzY2FsZVk6IDEsIHJvdGF0ZVk6IDAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwidHJhbnNpdGlvbi5zaHJpbmtJblwiOiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdER1cmF0aW9uOiA3MDAsXG4gICAgICAgICAgICAgICAgY2FsbHM6IFsgXG4gICAgICAgICAgICAgICAgICAgIFsgeyBvcGFjaXR5OiBbIDEsIDAgXSwgdHJhbnNmb3JtT3JpZ2luWDogWyBcIjUwJVwiLCBcIjUwJVwiIF0sIHRyYW5zZm9ybU9yaWdpblk6IFsgXCI1MCVcIiwgXCI1MCVcIiBdLCBzY2FsZVg6IFsgMSwgMS41IF0sIHNjYWxlWTogWyAxLCAxLjUgXSwgdHJhbnNsYXRlWjogMCB9IF1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJ0cmFuc2l0aW9uLnNocmlua091dFwiOiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdER1cmF0aW9uOiA2NTAsXG4gICAgICAgICAgICAgICAgY2FsbHM6IFsgXG4gICAgICAgICAgICAgICAgICAgIFsgeyBvcGFjaXR5OiBbIDAsIDEgXSwgdHJhbnNmb3JtT3JpZ2luWDogWyBcIjUwJVwiLCBcIjUwJVwiIF0sIHRyYW5zZm9ybU9yaWdpblk6IFsgXCI1MCVcIiwgXCI1MCVcIiBdLCBzY2FsZVg6IDEuMywgc2NhbGVZOiAxLjMsIHRyYW5zbGF0ZVo6IDAgfSBdXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICByZXNldDogeyBzY2FsZVg6IDEsIHNjYWxlWTogMSB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJ0cmFuc2l0aW9uLmV4cGFuZEluXCI6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0RHVyYXRpb246IDcwMCxcbiAgICAgICAgICAgICAgICBjYWxsczogWyBcbiAgICAgICAgICAgICAgICAgICAgWyB7IG9wYWNpdHk6IFsgMSwgMCBdLCB0cmFuc2Zvcm1PcmlnaW5YOiBbIFwiNTAlXCIsIFwiNTAlXCIgXSwgdHJhbnNmb3JtT3JpZ2luWTogWyBcIjUwJVwiLCBcIjUwJVwiIF0sIHNjYWxlWDogWyAxLCAwLjYyNSBdLCBzY2FsZVk6IFsgMSwgMC42MjUgXSwgdHJhbnNsYXRlWjogMCB9IF1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJ0cmFuc2l0aW9uLmV4cGFuZE91dFwiOiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdER1cmF0aW9uOiA3MDAsXG4gICAgICAgICAgICAgICAgY2FsbHM6IFsgXG4gICAgICAgICAgICAgICAgICAgIFsgeyBvcGFjaXR5OiBbIDAsIDEgXSwgdHJhbnNmb3JtT3JpZ2luWDogWyBcIjUwJVwiLCBcIjUwJVwiIF0sIHRyYW5zZm9ybU9yaWdpblk6IFsgXCI1MCVcIiwgXCI1MCVcIiBdLCBzY2FsZVg6IDAuNSwgc2NhbGVZOiAwLjUsIHRyYW5zbGF0ZVo6IDAgfSBdXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICByZXNldDogeyBzY2FsZVg6IDEsIHNjYWxlWTogMSB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLyogQW5pbWF0ZS5jc3MgKi9cbiAgICAgICAgICAgIFwidHJhbnNpdGlvbi5ib3VuY2VJblwiOiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdER1cmF0aW9uOiA4MDAsXG4gICAgICAgICAgICAgICAgY2FsbHM6IFsgXG4gICAgICAgICAgICAgICAgICAgIFsgeyBvcGFjaXR5OiBbIDEsIDAgXSwgc2NhbGVYOiBbIDEuMDUsIDAuMyBdLCBzY2FsZVk6IFsgMS4wNSwgMC4zIF0gfSwgMC40MCBdLFxuICAgICAgICAgICAgICAgICAgICBbIHsgc2NhbGVYOiAwLjksIHNjYWxlWTogMC45LCB0cmFuc2xhdGVaOiAwIH0sIDAuMjAgXSxcbiAgICAgICAgICAgICAgICAgICAgWyB7IHNjYWxlWDogMSwgc2NhbGVZOiAxIH0sIDAuNTAgXVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKiBBbmltYXRlLmNzcyAqL1xuICAgICAgICAgICAgXCJ0cmFuc2l0aW9uLmJvdW5jZU91dFwiOiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdER1cmF0aW9uOiA4MDAsXG4gICAgICAgICAgICAgICAgY2FsbHM6IFsgXG4gICAgICAgICAgICAgICAgICAgIFsgeyBzY2FsZVg6IDAuOTUsIHNjYWxlWTogMC45NSB9LCAwLjQwIF0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyBzY2FsZVg6IDEuMSwgc2NhbGVZOiAxLjEsIHRyYW5zbGF0ZVo6IDAgfSwgMC40MCBdLFxuICAgICAgICAgICAgICAgICAgICBbIHsgb3BhY2l0eTogWyAwLCAxIF0sIHNjYWxlWDogMC4zLCBzY2FsZVk6IDAuMyB9LCAwLjIwIF1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJlc2V0OiB7IHNjYWxlWDogMSwgc2NhbGVZOiAxIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKiBBbmltYXRlLmNzcyAqL1xuICAgICAgICAgICAgXCJ0cmFuc2l0aW9uLmJvdW5jZVVwSW5cIjoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHREdXJhdGlvbjogODAwLFxuICAgICAgICAgICAgICAgIGNhbGxzOiBbIFxuICAgICAgICAgICAgICAgICAgICBbIHsgb3BhY2l0eTogWyAxLCAwIF0sIHRyYW5zbGF0ZVk6IFsgLTMwLCAxMDAwIF0gfSwgMC42MCwgeyBlYXNpbmc6IFwiZWFzZU91dENpcmNcIiB9IF0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyB0cmFuc2xhdGVZOiAxMCB9LCAwLjIwIF0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyB0cmFuc2xhdGVZOiAwIH0sIDAuMjAgXVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKiBBbmltYXRlLmNzcyAqL1xuICAgICAgICAgICAgXCJ0cmFuc2l0aW9uLmJvdW5jZVVwT3V0XCI6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0RHVyYXRpb246IDEwMDAsXG4gICAgICAgICAgICAgICAgY2FsbHM6IFsgXG4gICAgICAgICAgICAgICAgICAgIFsgeyB0cmFuc2xhdGVZOiAyMCB9LCAwLjIwIF0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyBvcGFjaXR5OiBbIDAsIFwiZWFzZUluQ2lyY1wiLCAxIF0sIHRyYW5zbGF0ZVk6IC0xMDAwIH0sIDAuODAgXVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcmVzZXQ6IHsgdHJhbnNsYXRlWTogMCB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLyogQW5pbWF0ZS5jc3MgKi9cbiAgICAgICAgICAgIFwidHJhbnNpdGlvbi5ib3VuY2VEb3duSW5cIjoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHREdXJhdGlvbjogODAwLFxuICAgICAgICAgICAgICAgIGNhbGxzOiBbIFxuICAgICAgICAgICAgICAgICAgICBbIHsgb3BhY2l0eTogWyAxLCAwIF0sIHRyYW5zbGF0ZVk6IFsgMzAsIC0xMDAwIF0gfSwgMC42MCwgeyBlYXNpbmc6IFwiZWFzZU91dENpcmNcIiB9IF0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyB0cmFuc2xhdGVZOiAtMTAgfSwgMC4yMCBdLFxuICAgICAgICAgICAgICAgICAgICBbIHsgdHJhbnNsYXRlWTogMCB9LCAwLjIwIF1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLyogQW5pbWF0ZS5jc3MgKi9cbiAgICAgICAgICAgIFwidHJhbnNpdGlvbi5ib3VuY2VEb3duT3V0XCI6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0RHVyYXRpb246IDEwMDAsXG4gICAgICAgICAgICAgICAgY2FsbHM6IFsgXG4gICAgICAgICAgICAgICAgICAgIFsgeyB0cmFuc2xhdGVZOiAtMjAgfSwgMC4yMCBdLFxuICAgICAgICAgICAgICAgICAgICBbIHsgb3BhY2l0eTogWyAwLCBcImVhc2VJbkNpcmNcIiwgMSBdLCB0cmFuc2xhdGVZOiAxMDAwIH0sIDAuODAgXVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcmVzZXQ6IHsgdHJhbnNsYXRlWTogMCB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLyogQW5pbWF0ZS5jc3MgKi9cbiAgICAgICAgICAgIFwidHJhbnNpdGlvbi5ib3VuY2VMZWZ0SW5cIjoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHREdXJhdGlvbjogNzUwLFxuICAgICAgICAgICAgICAgIGNhbGxzOiBbIFxuICAgICAgICAgICAgICAgICAgICBbIHsgb3BhY2l0eTogWyAxLCAwIF0sIHRyYW5zbGF0ZVg6IFsgMzAsIC0xMjUwIF0gfSwgMC42MCwgeyBlYXNpbmc6IFwiZWFzZU91dENpcmNcIiB9IF0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyB0cmFuc2xhdGVYOiAtMTAgfSwgMC4yMCBdLFxuICAgICAgICAgICAgICAgICAgICBbIHsgdHJhbnNsYXRlWDogMCB9LCAwLjIwIF1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLyogQW5pbWF0ZS5jc3MgKi9cbiAgICAgICAgICAgIFwidHJhbnNpdGlvbi5ib3VuY2VMZWZ0T3V0XCI6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0RHVyYXRpb246IDc1MCxcbiAgICAgICAgICAgICAgICBjYWxsczogWyBcbiAgICAgICAgICAgICAgICAgICAgWyB7IHRyYW5zbGF0ZVg6IDMwIH0sIDAuMjAgXSxcbiAgICAgICAgICAgICAgICAgICAgWyB7IG9wYWNpdHk6IFsgMCwgXCJlYXNlSW5DaXJjXCIsIDEgXSwgdHJhbnNsYXRlWDogLTEyNTAgfSwgMC44MCBdXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICByZXNldDogeyB0cmFuc2xhdGVYOiAwIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKiBBbmltYXRlLmNzcyAqL1xuICAgICAgICAgICAgXCJ0cmFuc2l0aW9uLmJvdW5jZVJpZ2h0SW5cIjoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHREdXJhdGlvbjogNzUwLFxuICAgICAgICAgICAgICAgIGNhbGxzOiBbIFxuICAgICAgICAgICAgICAgICAgICBbIHsgb3BhY2l0eTogWyAxLCAwIF0sIHRyYW5zbGF0ZVg6IFsgLTMwLCAxMjUwIF0gfSwgMC42MCwgeyBlYXNpbmc6IFwiZWFzZU91dENpcmNcIiB9IF0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyB0cmFuc2xhdGVYOiAxMCB9LCAwLjIwIF0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyB0cmFuc2xhdGVYOiAwIH0sIDAuMjAgXVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKiBBbmltYXRlLmNzcyAqL1xuICAgICAgICAgICAgXCJ0cmFuc2l0aW9uLmJvdW5jZVJpZ2h0T3V0XCI6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0RHVyYXRpb246IDc1MCxcbiAgICAgICAgICAgICAgICBjYWxsczogWyBcbiAgICAgICAgICAgICAgICAgICAgWyB7IHRyYW5zbGF0ZVg6IC0zMCB9LCAwLjIwIF0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyBvcGFjaXR5OiBbIDAsIFwiZWFzZUluQ2lyY1wiLCAxIF0sIHRyYW5zbGF0ZVg6IDEyNTAgfSwgMC44MCBdXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICByZXNldDogeyB0cmFuc2xhdGVYOiAwIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInRyYW5zaXRpb24uc2xpZGVVcEluXCI6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0RHVyYXRpb246IDkwMCxcbiAgICAgICAgICAgICAgICBjYWxsczogWyBcbiAgICAgICAgICAgICAgICAgICAgWyB7IG9wYWNpdHk6IFsgMSwgMCBdLCB0cmFuc2xhdGVZOiBbIDAsIDIwIF0sIHRyYW5zbGF0ZVo6IDAgfSBdXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwidHJhbnNpdGlvbi5zbGlkZVVwT3V0XCI6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0RHVyYXRpb246IDkwMCxcbiAgICAgICAgICAgICAgICBjYWxsczogWyBcbiAgICAgICAgICAgICAgICAgICAgWyB7IG9wYWNpdHk6IFsgMCwgMSBdLCB0cmFuc2xhdGVZOiAtMjAsIHRyYW5zbGF0ZVo6IDAgfSBdXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICByZXNldDogeyB0cmFuc2xhdGVZOiAwIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInRyYW5zaXRpb24uc2xpZGVEb3duSW5cIjoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHREdXJhdGlvbjogOTAwLFxuICAgICAgICAgICAgICAgIGNhbGxzOiBbIFxuICAgICAgICAgICAgICAgICAgICBbIHsgb3BhY2l0eTogWyAxLCAwIF0sIHRyYW5zbGF0ZVk6IFsgMCwgLTIwIF0sIHRyYW5zbGF0ZVo6IDAgfSBdXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwidHJhbnNpdGlvbi5zbGlkZURvd25PdXRcIjoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHREdXJhdGlvbjogOTAwLFxuICAgICAgICAgICAgICAgIGNhbGxzOiBbIFxuICAgICAgICAgICAgICAgICAgICBbIHsgb3BhY2l0eTogWyAwLCAxIF0sIHRyYW5zbGF0ZVk6IDIwLCB0cmFuc2xhdGVaOiAwIH0gXVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcmVzZXQ6IHsgdHJhbnNsYXRlWTogMCB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJ0cmFuc2l0aW9uLnNsaWRlTGVmdEluXCI6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0RHVyYXRpb246IDEwMDAsXG4gICAgICAgICAgICAgICAgY2FsbHM6IFsgXG4gICAgICAgICAgICAgICAgICAgIFsgeyBvcGFjaXR5OiBbIDEsIDAgXSwgdHJhbnNsYXRlWDogWyAwLCAtMjAgXSwgdHJhbnNsYXRlWjogMCB9IF1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJ0cmFuc2l0aW9uLnNsaWRlTGVmdE91dFwiOiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdER1cmF0aW9uOiAxMDUwLFxuICAgICAgICAgICAgICAgIGNhbGxzOiBbIFxuICAgICAgICAgICAgICAgICAgICBbIHsgb3BhY2l0eTogWyAwLCAxIF0sIHRyYW5zbGF0ZVg6IC0yMCwgdHJhbnNsYXRlWjogMCB9IF1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJlc2V0OiB7IHRyYW5zbGF0ZVg6IDAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwidHJhbnNpdGlvbi5zbGlkZVJpZ2h0SW5cIjoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHREdXJhdGlvbjogMTAwMCxcbiAgICAgICAgICAgICAgICBjYWxsczogWyBcbiAgICAgICAgICAgICAgICAgICAgWyB7IG9wYWNpdHk6IFsgMSwgMCBdLCB0cmFuc2xhdGVYOiBbIDAsIDIwIF0sIHRyYW5zbGF0ZVo6IDAgfSBdXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwidHJhbnNpdGlvbi5zbGlkZVJpZ2h0T3V0XCI6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0RHVyYXRpb246IDEwNTAsXG4gICAgICAgICAgICAgICAgY2FsbHM6IFsgXG4gICAgICAgICAgICAgICAgICAgIFsgeyBvcGFjaXR5OiBbIDAsIDEgXSwgdHJhbnNsYXRlWDogMjAsIHRyYW5zbGF0ZVo6IDAgfSBdXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICByZXNldDogeyB0cmFuc2xhdGVYOiAwIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInRyYW5zaXRpb24uc2xpZGVVcEJpZ0luXCI6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0RHVyYXRpb246IDg1MCxcbiAgICAgICAgICAgICAgICBjYWxsczogWyBcbiAgICAgICAgICAgICAgICAgICAgWyB7IG9wYWNpdHk6IFsgMSwgMCBdLCB0cmFuc2xhdGVZOiBbIDAsIDc1IF0sIHRyYW5zbGF0ZVo6IDAgfSBdXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwidHJhbnNpdGlvbi5zbGlkZVVwQmlnT3V0XCI6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0RHVyYXRpb246IDgwMCxcbiAgICAgICAgICAgICAgICBjYWxsczogWyBcbiAgICAgICAgICAgICAgICAgICAgWyB7IG9wYWNpdHk6IFsgMCwgMSBdLCB0cmFuc2xhdGVZOiAtNzUsIHRyYW5zbGF0ZVo6IDAgfSBdXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICByZXNldDogeyB0cmFuc2xhdGVZOiAwIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInRyYW5zaXRpb24uc2xpZGVEb3duQmlnSW5cIjoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHREdXJhdGlvbjogODUwLFxuICAgICAgICAgICAgICAgIGNhbGxzOiBbIFxuICAgICAgICAgICAgICAgICAgICBbIHsgb3BhY2l0eTogWyAxLCAwIF0sIHRyYW5zbGF0ZVk6IFsgMCwgLTc1IF0sIHRyYW5zbGF0ZVo6IDAgfSBdXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwidHJhbnNpdGlvbi5zbGlkZURvd25CaWdPdXRcIjoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHREdXJhdGlvbjogODAwLFxuICAgICAgICAgICAgICAgIGNhbGxzOiBbIFxuICAgICAgICAgICAgICAgICAgICBbIHsgb3BhY2l0eTogWyAwLCAxIF0sIHRyYW5zbGF0ZVk6IDc1LCB0cmFuc2xhdGVaOiAwIH0gXVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcmVzZXQ6IHsgdHJhbnNsYXRlWTogMCB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJ0cmFuc2l0aW9uLnNsaWRlTGVmdEJpZ0luXCI6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0RHVyYXRpb246IDgwMCxcbiAgICAgICAgICAgICAgICBjYWxsczogWyBcbiAgICAgICAgICAgICAgICAgICAgWyB7IG9wYWNpdHk6IFsgMSwgMCBdLCB0cmFuc2xhdGVYOiBbIDAsIC03NSBdLCB0cmFuc2xhdGVaOiAwIH0gXVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInRyYW5zaXRpb24uc2xpZGVMZWZ0QmlnT3V0XCI6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0RHVyYXRpb246IDc1MCxcbiAgICAgICAgICAgICAgICBjYWxsczogWyBcbiAgICAgICAgICAgICAgICAgICAgWyB7IG9wYWNpdHk6IFsgMCwgMSBdLCB0cmFuc2xhdGVYOiAtNzUsIHRyYW5zbGF0ZVo6IDAgfSBdXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICByZXNldDogeyB0cmFuc2xhdGVYOiAwIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInRyYW5zaXRpb24uc2xpZGVSaWdodEJpZ0luXCI6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0RHVyYXRpb246IDgwMCxcbiAgICAgICAgICAgICAgICBjYWxsczogWyBcbiAgICAgICAgICAgICAgICAgICAgWyB7IG9wYWNpdHk6IFsgMSwgMCBdLCB0cmFuc2xhdGVYOiBbIDAsIDc1IF0sIHRyYW5zbGF0ZVo6IDAgfSBdXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwidHJhbnNpdGlvbi5zbGlkZVJpZ2h0QmlnT3V0XCI6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0RHVyYXRpb246IDc1MCxcbiAgICAgICAgICAgICAgICBjYWxsczogWyBcbiAgICAgICAgICAgICAgICAgICAgWyB7IG9wYWNpdHk6IFsgMCwgMSBdLCB0cmFuc2xhdGVYOiA3NSwgdHJhbnNsYXRlWjogMCB9IF1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJlc2V0OiB7IHRyYW5zbGF0ZVg6IDAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qIE1hZ2ljLmNzcyAqL1xuICAgICAgICAgICAgXCJ0cmFuc2l0aW9uLnBlcnNwZWN0aXZlVXBJblwiOiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdER1cmF0aW9uOiA4MDAsXG4gICAgICAgICAgICAgICAgY2FsbHM6IFsgXG4gICAgICAgICAgICAgICAgICAgIFsgeyBvcGFjaXR5OiBbIDEsIDAgXSwgdHJhbnNmb3JtUGVyc3BlY3RpdmU6IFsgODAwLCA4MDAgXSwgdHJhbnNmb3JtT3JpZ2luWDogWyAwLCAwIF0sIHRyYW5zZm9ybU9yaWdpblk6IFsgXCIxMDAlXCIsIFwiMTAwJVwiIF0sIHJvdGF0ZVg6IFsgMCwgLTE4MCBdIH0gXVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcmVzZXQ6IHsgdHJhbnNmb3JtUGVyc3BlY3RpdmU6IDAsIHRyYW5zZm9ybU9yaWdpblg6IFwiNTAlXCIsIHRyYW5zZm9ybU9yaWdpblk6IFwiNTAlXCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qIE1hZ2ljLmNzcyAqL1xuICAgICAgICAgICAgLyogU3VwcG9ydDogTG9zZXMgcm90YXRpb24gaW4gSUU5L0FuZHJvaWQgMi4zIChmYWRlcyBvbmx5KS4gKi9cbiAgICAgICAgICAgIFwidHJhbnNpdGlvbi5wZXJzcGVjdGl2ZVVwT3V0XCI6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0RHVyYXRpb246IDg1MCxcbiAgICAgICAgICAgICAgICBjYWxsczogWyBcbiAgICAgICAgICAgICAgICAgICAgWyB7IG9wYWNpdHk6IFsgMCwgMSBdLCB0cmFuc2Zvcm1QZXJzcGVjdGl2ZTogWyA4MDAsIDgwMCBdLCB0cmFuc2Zvcm1PcmlnaW5YOiBbIDAsIDAgXSwgdHJhbnNmb3JtT3JpZ2luWTogWyBcIjEwMCVcIiwgXCIxMDAlXCIgXSwgcm90YXRlWDogLTE4MCB9IF1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJlc2V0OiB7IHRyYW5zZm9ybVBlcnNwZWN0aXZlOiAwLCB0cmFuc2Zvcm1PcmlnaW5YOiBcIjUwJVwiLCB0cmFuc2Zvcm1PcmlnaW5ZOiBcIjUwJVwiLCByb3RhdGVYOiAwIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKiBNYWdpYy5jc3MgKi9cbiAgICAgICAgICAgIC8qIFN1cHBvcnQ6IExvc2VzIHJvdGF0aW9uIGluIElFOS9BbmRyb2lkIDIuMyAoZmFkZXMgb25seSkuICovXG4gICAgICAgICAgICBcInRyYW5zaXRpb24ucGVyc3BlY3RpdmVEb3duSW5cIjoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHREdXJhdGlvbjogODAwLFxuICAgICAgICAgICAgICAgIGNhbGxzOiBbIFxuICAgICAgICAgICAgICAgICAgICBbIHsgb3BhY2l0eTogWyAxLCAwIF0sIHRyYW5zZm9ybVBlcnNwZWN0aXZlOiBbIDgwMCwgODAwIF0sIHRyYW5zZm9ybU9yaWdpblg6IFsgMCwgMCBdLCB0cmFuc2Zvcm1PcmlnaW5ZOiBbIDAsIDAgXSwgcm90YXRlWDogWyAwLCAxODAgXSB9IF1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJlc2V0OiB7IHRyYW5zZm9ybVBlcnNwZWN0aXZlOiAwLCB0cmFuc2Zvcm1PcmlnaW5YOiBcIjUwJVwiLCB0cmFuc2Zvcm1PcmlnaW5ZOiBcIjUwJVwiIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKiBNYWdpYy5jc3MgKi9cbiAgICAgICAgICAgIC8qIFN1cHBvcnQ6IExvc2VzIHJvdGF0aW9uIGluIElFOS9BbmRyb2lkIDIuMyAoZmFkZXMgb25seSkuICovXG4gICAgICAgICAgICBcInRyYW5zaXRpb24ucGVyc3BlY3RpdmVEb3duT3V0XCI6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0RHVyYXRpb246IDg1MCxcbiAgICAgICAgICAgICAgICBjYWxsczogWyBcbiAgICAgICAgICAgICAgICAgICAgWyB7IG9wYWNpdHk6IFsgMCwgMSBdLCB0cmFuc2Zvcm1QZXJzcGVjdGl2ZTogWyA4MDAsIDgwMCBdLCB0cmFuc2Zvcm1PcmlnaW5YOiBbIDAsIDAgXSwgdHJhbnNmb3JtT3JpZ2luWTogWyAwLCAwIF0sIHJvdGF0ZVg6IDE4MCB9IF1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJlc2V0OiB7IHRyYW5zZm9ybVBlcnNwZWN0aXZlOiAwLCB0cmFuc2Zvcm1PcmlnaW5YOiBcIjUwJVwiLCB0cmFuc2Zvcm1PcmlnaW5ZOiBcIjUwJVwiLCByb3RhdGVYOiAwIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKiBNYWdpYy5jc3MgKi9cbiAgICAgICAgICAgIC8qIFN1cHBvcnQ6IExvc2VzIHJvdGF0aW9uIGluIElFOS9BbmRyb2lkIDIuMyAoZmFkZXMgb25seSkuICovXG4gICAgICAgICAgICBcInRyYW5zaXRpb24ucGVyc3BlY3RpdmVMZWZ0SW5cIjoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHREdXJhdGlvbjogOTUwLFxuICAgICAgICAgICAgICAgIGNhbGxzOiBbIFxuICAgICAgICAgICAgICAgICAgICBbIHsgb3BhY2l0eTogWyAxLCAwIF0sIHRyYW5zZm9ybVBlcnNwZWN0aXZlOiBbIDIwMDAsIDIwMDAgXSwgdHJhbnNmb3JtT3JpZ2luWDogWyAwLCAwIF0sIHRyYW5zZm9ybU9yaWdpblk6IFsgMCwgMCBdLCByb3RhdGVZOiBbIDAsIC0xODAgXSB9IF1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJlc2V0OiB7IHRyYW5zZm9ybVBlcnNwZWN0aXZlOiAwLCB0cmFuc2Zvcm1PcmlnaW5YOiBcIjUwJVwiLCB0cmFuc2Zvcm1PcmlnaW5ZOiBcIjUwJVwiIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKiBNYWdpYy5jc3MgKi9cbiAgICAgICAgICAgIC8qIFN1cHBvcnQ6IExvc2VzIHJvdGF0aW9uIGluIElFOS9BbmRyb2lkIDIuMyAoZmFkZXMgb25seSkuICovXG4gICAgICAgICAgICBcInRyYW5zaXRpb24ucGVyc3BlY3RpdmVMZWZ0T3V0XCI6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0RHVyYXRpb246IDk1MCxcbiAgICAgICAgICAgICAgICBjYWxsczogWyBcbiAgICAgICAgICAgICAgICAgICAgWyB7IG9wYWNpdHk6IFsgMCwgMSBdLCB0cmFuc2Zvcm1QZXJzcGVjdGl2ZTogWyAyMDAwLCAyMDAwIF0sIHRyYW5zZm9ybU9yaWdpblg6IFsgMCwgMCBdLCB0cmFuc2Zvcm1PcmlnaW5ZOiBbIDAsIDAgXSwgcm90YXRlWTogLTE4MCB9IF1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJlc2V0OiB7IHRyYW5zZm9ybVBlcnNwZWN0aXZlOiAwLCB0cmFuc2Zvcm1PcmlnaW5YOiBcIjUwJVwiLCB0cmFuc2Zvcm1PcmlnaW5ZOiBcIjUwJVwiLCByb3RhdGVZOiAwIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKiBNYWdpYy5jc3MgKi9cbiAgICAgICAgICAgIC8qIFN1cHBvcnQ6IExvc2VzIHJvdGF0aW9uIGluIElFOS9BbmRyb2lkIDIuMyAoZmFkZXMgb25seSkuICovXG4gICAgICAgICAgICBcInRyYW5zaXRpb24ucGVyc3BlY3RpdmVSaWdodEluXCI6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0RHVyYXRpb246IDk1MCxcbiAgICAgICAgICAgICAgICBjYWxsczogWyBcbiAgICAgICAgICAgICAgICAgICAgWyB7IG9wYWNpdHk6IFsgMSwgMCBdLCB0cmFuc2Zvcm1QZXJzcGVjdGl2ZTogWyAyMDAwLCAyMDAwIF0sIHRyYW5zZm9ybU9yaWdpblg6IFsgXCIxMDAlXCIsIFwiMTAwJVwiIF0sIHRyYW5zZm9ybU9yaWdpblk6IFsgMCwgMCBdLCByb3RhdGVZOiBbIDAsIDE4MCBdIH0gXVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcmVzZXQ6IHsgdHJhbnNmb3JtUGVyc3BlY3RpdmU6IDAsIHRyYW5zZm9ybU9yaWdpblg6IFwiNTAlXCIsIHRyYW5zZm9ybU9yaWdpblk6IFwiNTAlXCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qIE1hZ2ljLmNzcyAqL1xuICAgICAgICAgICAgLyogU3VwcG9ydDogTG9zZXMgcm90YXRpb24gaW4gSUU5L0FuZHJvaWQgMi4zIChmYWRlcyBvbmx5KS4gKi9cbiAgICAgICAgICAgIFwidHJhbnNpdGlvbi5wZXJzcGVjdGl2ZVJpZ2h0T3V0XCI6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0RHVyYXRpb246IDk1MCxcbiAgICAgICAgICAgICAgICBjYWxsczogWyBcbiAgICAgICAgICAgICAgICAgICAgWyB7IG9wYWNpdHk6IFsgMCwgMSBdLCB0cmFuc2Zvcm1QZXJzcGVjdGl2ZTogWyAyMDAwLCAyMDAwIF0sIHRyYW5zZm9ybU9yaWdpblg6IFsgXCIxMDAlXCIsIFwiMTAwJVwiIF0sIHRyYW5zZm9ybU9yaWdpblk6IFsgMCwgMCBdLCByb3RhdGVZOiAxODAgfSBdXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICByZXNldDogeyB0cmFuc2Zvcm1QZXJzcGVjdGl2ZTogMCwgdHJhbnNmb3JtT3JpZ2luWDogXCI1MCVcIiwgdHJhbnNmb3JtT3JpZ2luWTogXCI1MCVcIiwgcm90YXRlWTogMCB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAvKiBSZWdpc3RlciB0aGUgcGFja2FnZWQgZWZmZWN0cy4gKi9cbiAgICBmb3IgKHZhciBlZmZlY3ROYW1lIGluIENvbnRhaW5lci5WZWxvY2l0eS5SZWdpc3RlclVJLnBhY2thZ2VkRWZmZWN0cykge1xuICAgICAgICBDb250YWluZXIuVmVsb2NpdHkuUmVnaXN0ZXJVSShlZmZlY3ROYW1lLCBDb250YWluZXIuVmVsb2NpdHkuUmVnaXN0ZXJVSS5wYWNrYWdlZEVmZmVjdHNbZWZmZWN0TmFtZV0pO1xuICAgIH1cbn0pKCk7XG47IGJyb3dzZXJpZnlfc2hpbV9fZGVmaW5lX19tb2R1bGVfX2V4cG9ydF9fKHR5cGVvZiB2ZWxvY2l0eVVJICE9IFwidW5kZWZpbmVkXCIgPyB2ZWxvY2l0eVVJIDogd2luZG93LnZlbG9jaXR5VUkpO1xuXG59KS5jYWxsKGdsb2JhbCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBmdW5jdGlvbiBkZWZpbmVFeHBvcnQoZXgpIHsgbW9kdWxlLmV4cG9ydHMgPSBleDsgfSk7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIiwidmFyIHN0aWNreSA9IHJlcXVpcmUoJy4vc3RpY2t5JyksXG4gICAgbWFwID0gcmVxdWlyZSgnLi9tYXAnKSxcbiAgICBzY3JvbGxUbyA9IHJlcXVpcmUoJy4vc2Nyb2xsVG8nKSxcbiAgICB0YWxrID0gcmVxdWlyZSgnLi90YWxrJyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgYm9keTogJCgnYm9keScpLFxuICBoZWFkZXI6ICQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlcicpKSxcbiAgYmFubmVyOiAkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYW5uZXInKSksXG4gIGFib3V0OiAkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhYm91dCcpKSxcbiAgcmVnaXN0ZXI6ICQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlZ2lzdGVyJykpLFxuICBzY2hlZHVsZTogJChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NoZWR1bGUnKSksXG4gIHZlbnVlOiAkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2ZW51ZScpKSxcbiAgaXNTbWFsbDogZnVuY3Rpb24gaXNTbWFsbCgpIHsgIHJldHVybiB3aW5kb3cuaW5uZXJXaWR0aCA8IDk5MjsgfVxufTtcbiIsInZhciBzdHlsZXMgPSBbe1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZS5uYXR1cmFsXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvblwifSx7XCJjb2xvclwiOlwiI2UwZWZlZlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJwb2lcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5maWxsXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9uXCJ9LHtcImh1ZVwiOlwiIzE5MDBmZlwifSx7XCJjb2xvclwiOlwiI2MwZThlOFwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJsYW5kc2NhcGUubWFuX21hZGVcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5maWxsXCJ9LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wibGlnaHRuZXNzXCI6MTAwfSx7XCJ2aXNpYmlsaXR5XCI6XCJzaW1wbGlmaWVkXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWRcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHNcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcIndhdGVyXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjN2RjZGNkXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInRyYW5zaXQubGluZVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9uXCJ9LHtcImxpZ2h0bmVzc1wiOjcwMH1dfV07XG5cbnZhciBob3RlbFBvc2l0aW9uID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZygtMzYuODQ2NzM4LCAxNzQuNzYxOTU3KTtcblxudmFyIG9wdGlvbnMgPSB7XG4gIHpvb206IDE1LFxuICBjZW50ZXI6IGhvdGVsUG9zaXRpb24sXG4gIG1hcFR5cGVJZDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVAsXG4gIHNjYWxlQ29udHJvbDogZmFsc2UsXG5cdHNjcm9sbHdoZWVsOiBmYWxzZSxcbiAgc3R5bGVzOiBzdHlsZXNcbn07XG5cbnZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwgb3B0aW9ucyk7XG5cbnZhciBtYXJrZXJUcmFpbmluZyA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICBwb3NpdGlvbjogaG90ZWxQb3NpdGlvbixcbiAgbWFwOiBtYXAsXG4gIHRpdGxlOiAnSGVyaXRhZ2UgSG90ZWwnLFxuICBpY29uOiAncmVzb3VyY2VzL2ltYWdlcy9tYXJrZXIucG5nJ1xufSk7XG4iLCJyZXF1aXJlKCd2ZWxvY2l0eScpO1xucmVxdWlyZSgndmVsb2NpdHlVSScpO1xudmFyIGVsZW1lbnRzID0gcmVxdWlyZSgnLi9lbGVtZW50cycpO1xuXG5mdW5jdGlvbiBvZmZzZXQoKSB7XG4gIHZhciBzdGlja3lIZWlnaHQgPSBlbGVtZW50cy5oZWFkZXIub3V0ZXJIZWlnaHQoKSArIChlbGVtZW50cy5pc1NtYWxsKCkgPyAwIDogZWxlbWVudHMuYmFubmVyLm91dGVySGVpZ2h0KCkpO1xuXG4gIHJldHVybiAtMSAqIChzdGlja3lIZWlnaHQgLSAyKTtcbn1cblxuJCgnLmhlYWRlci1saW5rIGEnLCBlbGVtZW50cy5oZWFkZXIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gIHZhciBzb3VyY2UgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gIHZhciBkZXN0aW5hdGlvbiA9IChzb3VyY2UuZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgJycpLnNsaWNlKDEpO1xuXG4gIGlmIChlbGVtZW50c1tkZXN0aW5hdGlvbl0pIHtcbiAgICBlbGVtZW50c1tkZXN0aW5hdGlvbl0udmVsb2NpdHkoJ3Njcm9sbCcsIHtkdXJhdGlvbjogNzUwLCBvZmZzZXQ6IG9mZnNldCgpfSk7XG4gIH1cbn0pO1xuIiwidmFyIHN0aWNreSA9IHJlcXVpcmUoJ3N0aWNreScpLFxuICAgIGVsZW1lbnRzID0gcmVxdWlyZSgnLi9lbGVtZW50cycpO1xuXG5lbGVtZW50cy5oZWFkZXIuc3RpY2t5KHt0b3BTcGFjaW5nOjB9KTtcblxuZnVuY3Rpb24gc3RpY2tCYW5uZXIoKSB7XG4gIGlmIChlbGVtZW50cy5pc1NtYWxsKCkpIHtcbiAgICBlbGVtZW50cy5iYW5uZXIudW5zdGljaygpO1xuICB9IGVsc2Uge1xuICAgIGVsZW1lbnRzLmJhbm5lci5zdGlja3koe3RvcFNwYWNpbmc6IGVsZW1lbnRzLmhlYWRlci5vdXRlckhlaWdodCgpfSk7XG4gIH1cbn1cblxuc3RpY2tCYW5uZXIoKTtcblxuJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XG4gIGVsZW1lbnRzLmhlYWRlci5zdGlja3koJ3VwZGF0ZScpO1xuICBzdGlja0Jhbm5lcigpO1xufSk7XG4iLCJyZXF1aXJlKCd2ZWxvY2l0eScpO1xucmVxdWlyZSgndmVsb2NpdHlVSScpO1xudmFyIGVsZW1lbnRzID0gcmVxdWlyZSgnLi9lbGVtZW50cycpO1xuXG52YXIgZHVyYXRpb24gPSAzMDA7XG52YXIgaW5Qcm9ncmVzcyA9IGZhbHNlO1xuXG5mdW5jdGlvbiBleHRyYWN0RWxlbWVudHMoZXZlbnQpIHtcbiAgdmFyIHNvdXJjZSA9IGV2ZW50LnRhcmdldCB8fCBldmVudC5zcmNFbGVtZW50O1xuICB2YXIgdHJhY2sgPSAkKHNvdXJjZSkuY2xvc2VzdCgnLnRyYWNrJyk7XG4gIHZhciBkZXNjcmlwdGlvbiA9IHRyYWNrLmZpbmQoJy50cmFjay1kZXNjcmlwdGlvbicpO1xuXG4gIHJldHVybiB7XG4gICAgc291cmNlOiBzb3VyY2UsXG4gICAgdHJhY2s6IHRyYWNrLFxuICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcbiAgICByZWN0OiB0cmFja1swXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICB9O1xufVxuXG4vLyBEbyBub3QgZGlzcGxheSBkZXNjcmlwdGlvbiBpZiBjbGlja2luZyBvbiBhIGxpbmsgaW5zaWRlIGEgdHJhY2tcbi8vIChtb3N0bHkgZm9yIHNwZWFrZXIgdHdpdHRlciBsaW5rcylcbiQoJ2EnLCBlbGVtZW50cy5zY2hlZHVsZSkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbn0pO1xuXG4kKCcudHJhY2sud2l0aC1kZXNjcmlwdGlvbicsIGVsZW1lbnRzLnNjaGVkdWxlKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICBpZiAoaW5Qcm9ncmVzcykgcmV0dXJuO1xuICBpblByb2dyZXNzID0gdHJ1ZTtcbiAgZWxlbWVudHMuYm9keS5hZGRDbGFzcygnd2l0aC10cmFjay1kZXNjcmlwdGlvbicpO1xuXG4gIHZhciBlbGVtcyA9IGV4dHJhY3RFbGVtZW50cyhlKTtcblxuICBlbGVtcy5kZXNjcmlwdGlvblxuICAgIC52ZWxvY2l0eSh7XG4gICAgICB0b3A6IGVsZW1zLnJlY3QudG9wLFxuICAgICAgbGVmdDogZWxlbXMucmVjdC5sZWZ0LFxuICAgICAgd2lkdGg6IGVsZW1zLnJlY3Qud2lkdGgsXG4gICAgICBoZWlnaHQ6IGVsZW1zLnJlY3QuaGVpZ2h0XG4gICAgfSwge2R1cmF0aW9uOiAxLCBkaXNwbGF5OiAnYmxvY2snfSlcbiAgICAudmVsb2NpdHkoe1xuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIGxlZnQ6IDAsXG4gICAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGhcbiAgICB9LCB7ZHVyYXRpb246IGR1cmF0aW9ufSlcbiAgICAudmVsb2NpdHkoe1xuICAgICAgdG9wOiAwLFxuICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICB9LCB7XG4gICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBlbGVtcy5kZXNjcmlwdGlvbi5hZGRDbGFzcygndmlzaWJsZScpO1xuICAgICAgICBpblByb2dyZXNzID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG59KTtcblxuJCgnLnRyYWNrLWRlc2NyaXB0aW9uJywgZWxlbWVudHMuc2NoZWR1bGUpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gIGlmIChpblByb2dyZXNzKSByZXR1cm47XG4gIGluUHJvZ3Jlc3MgPSB0cnVlO1xuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gIHZhciBlbGVtcyA9IGV4dHJhY3RFbGVtZW50cyhlKTtcblxuICBlbGVtcy5kZXNjcmlwdGlvbi5yZW1vdmVDbGFzcygndmlzaWJsZScpO1xuICBlbGVtcy5kZXNjcmlwdGlvblxuICAgIC52ZWxvY2l0eSh7XG4gICAgICB0b3A6IGVsZW1zLnJlY3QudG9wLFxuICAgICAgaGVpZ2h0OiBlbGVtcy5yZWN0LmhlaWdodFxuICAgIH0sIHtkdXJhdGlvbjogZHVyYXRpb259KVxuICAgIC52ZWxvY2l0eSh7XG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgbGVmdDogZWxlbXMucmVjdC5sZWZ0LFxuICAgICAgd2lkdGg6IGVsZW1zLnJlY3Qud2lkdGhcbiAgICB9LCB7XG4gICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBlbGVtZW50cy5ib2R5LnJlbW92ZUNsYXNzKCd3aXRoLXRyYWNrLWRlc2NyaXB0aW9uJyk7XG4gICAgICAgIGluUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxufSk7XG4iXX0=
