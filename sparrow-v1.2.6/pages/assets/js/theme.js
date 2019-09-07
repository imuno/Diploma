"use strict";

var _this2 = this;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*-----------------------------------------------
|   Utilities
-----------------------------------------------*/
var spUtils = function ($) {
  var Utils = {
    $window: $(window),
    $document: $(document),
    $html: $('html'),
    $body: $('body'),
    $main: $('main'),
    isRTL: function isRTL() {
      return this.$html.attr('dir') === 'rtl';
    },
    location: window.location,
    nua: navigator.userAgent,
    breakpoints: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200
    },
    offset: function offset(element) {
      var rect = element.getBoundingClientRect();
      var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
      };
    },
    isScrolledIntoViewJS: function isScrolledIntoViewJS(element) {
      var windowHeight = window.innerHeight;
      var elemTop = this.offset(element).top;
      var elemHeight = element.offsetHeight;
      var windowScrollTop = window.scrollY;
      return elemTop <= windowScrollTop + windowHeight && windowScrollTop <= elemTop + elemHeight;
    },
    isScrolledIntoView: function isScrolledIntoView(el) {
      var $el = $(el);
      var windowHeight = this.$window.height();
      var elemTop = $el.offset().top;
      var elemHeight = $el.height();
      var windowScrollTop = this.$window.scrollTop();
      return elemTop <= windowScrollTop + windowHeight && windowScrollTop <= elemTop + elemHeight;
    },
    getCurrentScreanBreakpoint: function getCurrentScreanBreakpoint() {
      var _this = this;

      var currentScrean = '';
      var windowWidth = this.$window.width();
      $.each(this.breakpoints, function (index, value) {
        if (windowWidth >= value) {
          currentScrean = index;
        } else if (windowWidth >= _this.breakpoints.xl) {
          currentScrean = 'xl';
        }
      });
      return {
        currentScrean: currentScrean,
        currentBreakpoint: this.breakpoints[currentScrean]
      };
    }
  };
  return Utils;
}(jQuery);
/*-----------------------------------------------
|   Top navigation opacity on scroll
-----------------------------------------------*/


spUtils.$document.ready(function () {
  var $navbar = $('.navbar-sparrow');

  if ($navbar.length) {
    var windowHeight = spUtils.$window.height();

    var handleAlpha = function handleAlpha() {
      var scrollTop = spUtils.$window.scrollTop();
      var alpha = scrollTop / windowHeight * 2;
      alpha >= 1 && (alpha = 1);
      $navbar.css({
        'background-color': "rgba(0, 0, 0, " + alpha + ")"
      });
    };

    handleAlpha();
    spUtils.$window.scroll(function () {
      return handleAlpha();
    }); // Top navigation background toggle on mobile

    $navbar.on('show.bs.collapse hide.bs.collapse', function (e) {
      $(e.currentTarget).toggleClass('bg-black');
    });
  }
});
/*-----------------------------------------------
|   Select menu [bootstrap 4]
-----------------------------------------------*/

spUtils.$document.ready(function () {
  // https://getbootstrap.com/docs/4.0/getting-started/browsers-devices/#select-menu
  // https://github.com/twbs/bootstrap/issues/26183
  spDetector.isAndroid && $('select.form-control').removeClass('form-control').css('width', '100%'); // https://getbootstrap.com/docs/4.0/components/tooltips/#example-enable-tooltips-everywhere

  $('[data-toggle="tooltip"]').tooltip();
});
/*-----------------------------------------------
|   Count Up
-----------------------------------------------*/

spUtils.$document.ready(function () {
  var $counters = $('[data-countup]');

  if ($counters.length) {
    $counters.each(function (index, value) {
      var $counter = $(value);
      var countTo = $counter.attr('data-countup');
      var playCountUpTriggerd = false;

      var countUP = function countUP() {
        if (spUtils.isScrolledIntoView(value) && !playCountUpTriggerd) {
          if (!playCountUpTriggerd) {
            $({
              countNum: 0
            }).animate({
              countNum: countTo
            }, {
              duration: 3000,
              easing: 'linear',
              step: function step() {
                $counter.text(Math.floor(this.countNum));
              },
              complete: function complete() {
                $counter.text(this.countNum);
              }
            });
            playCountUpTriggerd = true;
          }
        }

        return playCountUpTriggerd;
      };

      countUP();
      spUtils.$window.scroll(function () {
        countUP();
      });
    });
  }
});
/*-----------------------------------------------
|   Countdown
-----------------------------------------------*/

spUtils.$document.ready(function () {
  var $dataCountdowns = $('[data-countdown]');
  var DATA_KEY = {
    FALLBACK: 'countdown-fallback',
    COUNTDOWN: 'countdown'
  };

  if ($dataCountdowns.length) {
    $dataCountdowns.each(function (index, value) {
      var $dateCountdown = $(value);
      var date = $dateCountdown.data(DATA_KEY.COUNTDOWN);
      var fallback;

      if (_typeof($dateCountdown.data(DATA_KEY.FALLBACK)) !== _typeof(undefined)) {
        fallback = $dateCountdown.data(DATA_KEY.FALLBACK);
      }

      $dateCountdown.countdown(date, function (event) {
        if (event.elapsed) {
          $dateCountdown.text(fallback);
        } else {
          $dateCountdown.text(event.strftime('%D days %H:%M:%S'));
        }
      });
    });
  }
});
/*-----------------------------------------------
|   Variables
-----------------------------------------------*/

/*
  global opr, safari
*/

/*-----------------------------------------------
|   Detector
-----------------------------------------------*/

var spDetector = function () {
  var Detector = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(spUtils.nua),
    isOSX: spUtils.nua.match(/(iPad|iPhone|iPod|Macintosh)/g),
    isOpera: !!window.opr && !!opr.addons || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
    isFirefox: typeof InstallTrigger !== 'undefined',
    isSafari: /constructor/i.test(window.HTMLElement) || function (p) {
      return p.toString() === '[object SafariRemoteNotification]';
    }(!window.safari || safari.pushNotification),
    isNewerIE: spUtils.nua.match(/msie (9|([1-9][0-9]))/i),
    isOlderIE: spUtils.nua.match(/msie/i) && !_this2.isNewerIE,
    isAncientIE: spUtils.nua.match(/msie 6/i),
    isIE: _this2.isAncientIE || _this2.isOlderIE || _this2.isNewerIE,
    isIE11: !!window.MSInputMethodContext && !!document.documentMode,
    isEdge: !_this2.isIE11 && !_this2.isIE && !!window.StyleMedia,
    isChrome: !!window.chrome && !!window.chrome.webstore,
    isBlink: (_this2.isChrome || _this2.isOpera) && !!window.CSS,
    isPuppeteer: spUtils.nua.match(/puppeteer/i),
    isIOS: parseFloat((/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(spUtils.nua) || [0, ''])[1].replace('undefined', '3_2').replace('_', '.').replace('_', '')) || false,
    iPadiPhoneFirefox: spUtils.nua.match(/iPod|iPad|iPhone/g) && spUtils.nua.match(/Gecko/g),
    macFirefox: spUtils.nua.match(/Macintosh/g) && spUtils.nua.match(/Gecko/g) && spUtils.nua.match(/rv:/g),
    isAndroid: spUtils.nua.indexOf('Mozilla/5.0') > -1 && spUtils.nua.indexOf('Android ') > -1 && spUtils.nua.indexOf('AppleWebKit') > -1
  };
  spUtils.$document.ready(function () {
    if (Detector.isOpera) spUtils.$html.addClass('opera');
    if (Detector.isMobile) spUtils.$html.addClass('mobile');
    if (Detector.isOSX) spUtils.$html.addClass('osx');
    if (Detector.isFirefox) spUtils.$html.addClass('firefox');
    if (Detector.isSafari) spUtils.$html.addClass('safari');
    if (Detector.isIOS) spUtils.$html.addClass('ios');
    if (Detector.isIE || Detector.isIE11) spUtils.$html.addClass('ie');
    if (Detector.isEdge) spUtils.$html.addClass('edge');
    if (Detector.isChrome) spUtils.$html.addClass('chrome');
    if (Detector.isBlink) spUtils.$html.addClass('blink');
    if (Detector.isPuppeteer) spUtils.$html.addClass('puppeteer');
  });
  return Detector;
}();
/*-----------------------------------------------
|   Documentation and Component Navigation
-----------------------------------------------*/


spUtils.$document.ready(function () {
  var $componentNav = $('#components-nav');

  if ($componentNav.length) {
    var loc = window.location.href;

    var _loc$split = loc.split('#');

    loc = _loc$split[0];
    var location = loc.split('/');
    var url = location[location.length - 2] + "/" + location.pop();
    var urls = $componentNav.children('li').children('a');

    for (var i = 0, max = urls.length; i < max; i += 1) {
      var dom = urls[i].href.split('/');
      var domURL = dom[dom.length - 2] + "/" + dom.pop();

      if (domURL === url) {
        var $targetedElement = $(urls[i]);
        $targetedElement.removeClass('text-800');
        $targetedElement.addClass('font-weight-bold');
        break;
      }
    }
  }
});
/*-----------------------------------------------
|   Draw SVG
-----------------------------------------------*/

/*
  global TimelineMax, TweenMax
*/

(function ($) {
  /*-----------------------------------------------
  |   SVG animation
  -----------------------------------------------*/
  var zanimSVG = $('[data-zanim-svg]');

  if (zanimSVG.length && !spDetector.isPuppeteer) {
    zanimSVG.each(function (index, value) {
      var $this = $(value);
      var path = $this.find('path');
      var controller = $this.data('zanim-svg');
      controller.delay || (controller.delay = 0);
      controller.duration || (controller.duration = 2);
      controller.ease || (controller.ease = 'Expo.easeOut');
      var tl = new TimelineMax();
      var DrawSvgInit = tl.from(path, controller.duration, {
        drawSVG: 0,
        delay: controller.delay,
        ease: controller.ease
      }).pause();

      function svgTrigger() {
        if (spUtils.isScrolledIntoView($this) && controller.trigger === 'scroll') {
          DrawSvgInit.play();
          TweenMax.set(path, {
            visibility: 'visible'
          });
          controller.trigger = false;
        }
      }

      spUtils.$document.ready(function () {
        svgTrigger();
        spUtils.$window.on('scroll', function () {
          svgTrigger();
        });
      });
    });
  }
})(jQuery);
/*
  global TimelineMax
*/

/*-----------------------------------------------
|   Initializing
-----------------------------------------------*/


spUtils.$document.ready(function () {
  var ClassName = {
    SHOW: 'show',
    PLAY: 'play',
    COLLAPSED: 'collapsed',
    BG_BLACK: 'bg-black',
    FANCYNAVBAR_LEFT: 'fancynavbar-left'
  };
  var Selector = {
    FANCYNAVBAR: '.fancynavbar',
    FANCYNAVBAR_LEFT: '.fancynavbar-left',
    FANCYNAVBAR_TOGGLERBAR: '.fancynavbar-togglerbar',
    FANCYNAVBAR_BRAND_IMG: '.fancynavbar-brand-img',
    FANCYNAVBAR_ADDON: '.fancynavbar-addon',
    FANCYNAVBAR_COLLAPSE: '.fancynavbar-collapse',
    FANCYNAVBAR_TOGGLER: '.fancynavbar-toggler',
    FANCYNAVBAR_TOGGLER_ICON: '.fancynavbar-toggler-icon',
    PATH_TOP: '#path-top',
    PATH_MIDDLE: '#path-middle',
    PATH_BOTTOM: '#path-bottom',
    FANCYNAV_LINK: '.fancynav-link',
    FANCY_DROPDOWN: '.fancy-dropdown',
    FANCY_DROPDOWN_MENU: '.fancy-dropdown-menu',
    FANCY_DROPDOWN_TOGGLE: '.fancy-dropdown-toggle',
    FANCY_DROPDOWN_ITEM: '.fancy-dropdown-item'
  };
  var DATA_KEY = {
    ZANIM_MD: 'zanim-md',
    ZANIM_LG: 'zanim-lg',
    EXCLUSIVE: 'exclusive'
  };
  var EASE = 'CubicBezier';
  var $fancynavbar = $(Selector.FANCYNAVBAR);
  var isFancynavbarLeft = $fancynavbar.hasClass(ClassName.FANCYNAVBAR_LEFT);
  /*-----------------------------------------------
  |   RTL compatibility
  -----------------------------------------------*/

  if ((spUtils.isRTL() || isFancynavbarLeft) && !(spUtils.isRTL() && isFancynavbarLeft)) {
    console.log('In the box');
    var $fancyNavbarBrandImg = $(Selector.FANCYNAVBAR_BRAND_IMG);
    var $fancyNavbarTogglerIcon = $(Selector.FANCYNAVBAR_TOGGLER_ICON);
    var $fancyNavbarAddon = $(Selector.FANCYNAVBAR_ADDON);
    $fancynavbar.data(DATA_KEY.ZANIM_LG).from.x = -$fancynavbar.data(DATA_KEY.ZANIM_LG).from.x;
    $fancyNavbarBrandImg.data(DATA_KEY.ZANIM_LG).from.x = -$fancyNavbarBrandImg.data(DATA_KEY.ZANIM_LG).from.x;
    $fancyNavbarTogglerIcon.data(DATA_KEY.ZANIM_LG).from.x = -$fancyNavbarTogglerIcon.data(DATA_KEY.ZANIM_LG).from.x;
    $fancyNavbarAddon.data(DATA_KEY.ZANIM_LG).from.x = -$fancyNavbarAddon.data(DATA_KEY.ZANIM_LG).from.x;
  }

  if ($fancynavbar.length) {
    var $fancyNavbarCollapse = $(Selector.FANCYNAVBAR_COLLAPSE);
    var $fancyNavbarToggler = $(Selector.FANCYNAVBAR_TOGGLER);
    var exclusive = $fancynavbar.data(DATA_KEY.EXCLUSIVE);
    var x = '100%';
    (spUtils.isRTL() || isFancynavbarLeft) && !(spUtils.isRTL() && isFancynavbarLeft) && (x = '-100%');
    /*-----------------------------------------------
    |   Fancy Navbar Collapse Animation
    -----------------------------------------------*/

    var fancyNavbarCollapseTimeline = new TimelineMax().pause();
    var $fancyNavItems = $(Selector.FANCYNAV_LINK + ", " + Selector.FANCY_DROPDOWN_MENU);
    $fancyNavItems.css('opacity', 0);
    fancyNavbarCollapseTimeline.fromTo($fancyNavbarCollapse, 0.6, {
      x: x
    }, {
      x: '0%',
      ease: EASE
    }).staggerFromTo($fancyNavItems.toArray(), 0.8, {
      y: 56,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      ease: EASE
    }, 0.05, '-=0.4');
    /*-----------------------------------------------
    |   End of Drawer Animation
    -----------------------------------------------*/

    /*-----------------------------------------------
    |   Fancy Navbar Toggler Icon Animation
    -----------------------------------------------*/

    var fancyNavbarTogglerIconTimeline = new TimelineMax().pause();

    var _$fancyNavbarTogglerIcon = $(Selector.FANCYNAVBAR_TOGGLER_ICON);

    var $fancyNavbarTogglerIconPathTop = _$fancyNavbarTogglerIcon.children(Selector.PATH_TOP);

    var $fancyNavbarTogglerIconPathMiddle = _$fancyNavbarTogglerIcon.children(Selector.PATH_MIDDLE);

    var $fancyNavbarTogglerIconPathBottom = _$fancyNavbarTogglerIcon.children(Selector.PATH_BOTTOM);

    fancyNavbarTogglerIconTimeline.fromTo($fancyNavbarTogglerIconPathTop, 0.5, {
      'stroke-dashoffset': '0',
      'stroke-dasharray': '30px 88px'
    }, {
      'stroke-dashoffset': '-81px',
      delay: 0,
      ease: EASE
    }, 0).fromTo($fancyNavbarTogglerIconPathMiddle, 0.5, {
      'stroke-dashoffset': '0',
      'stroke-dasharray': '30px 30px'
    }, {
      'stroke-dashoffset': '-15px',
      'stroke-dasharray': '0.1px 30px',
      delay: 0,
      ease: EASE
    }, 0).fromTo($fancyNavbarTogglerIconPathBottom, 0.5, {
      'stroke-dashoffset': '-87.9px',
      'stroke-dasharray': '30px 88.1px'
    }, {
      'stroke-dashoffset': '-6.3px',
      delay: 0,
      ease: EASE
    }, 0);
    /*-----------------------------------------------
    |   End of Fancy Navbar Toggler Icon Animation
    -----------------------------------------------*/

    var animateMenu = function animateMenu() {
      _$fancyNavbarTogglerIcon.hasClass(ClassName.PLAY) ? fancyNavbarTogglerIconTimeline.reverse() : fancyNavbarTogglerIconTimeline.play();

      _$fancyNavbarTogglerIcon.toggleClass(ClassName.PLAY);

      $fancyNavbarToggler.hasClass(ClassName.COLLAPSED) ? fancyNavbarCollapseTimeline.reverse() : fancyNavbarCollapseTimeline.play();
      $fancyNavbarToggler.toggleClass(ClassName.COLLAPSED);
    };

    $fancyNavbarToggler.on('click', animateMenu);
    spUtils.$main.on('click', function () {
      $fancyNavbarToggler.hasClass(ClassName.COLLAPSED) && animateMenu();
    });
    /*-----------------------------------------------
    |   Resize Fancy Dropdown
    -----------------------------------------------*/

    var $fancyDropdownMenus = $(Selector.FANCY_DROPDOWN_MENU);

    if ($fancyDropdownMenus.length) {
      $fancyDropdownMenus.each(function (index, value) {
        var $fancyDropdownMenu = $(value);
        $fancyDropdownMenu.parent(Selector.FANCY_DROPDOWN).height($fancyDropdownMenu.siblings(Selector.FANCY_DROPDOWN_TOGGLE).height());
      });
      /*-----------------------------------------------
      |   On Resize, Adjust the Menu Height
      -----------------------------------------------*/

      spUtils.$window.resize(function () {
        var $fancyDropdownToggles = $(Selector.FANCY_DROPDOWN_TOGGLE);
        $fancyDropdownToggles.each(function (index, value) {
          var $fancyDropdownToggle = $(value);

          if ($fancyDropdownToggle.hasClass(ClassName.SHOW)) {
            $fancyDropdownToggle.parent(Selector.FANCY_DROPDOWN).height($fancyDropdownToggle.height() + $fancyDropdownToggle.siblings(Selector.FANCY_DROPDOWN_MENU).height());
          } else {
            $fancyDropdownToggle.parent(Selector.FANCY_DROPDOWN).height($fancyDropdownToggle.height());
          }
        });
      });
    }
    /*-----------------------------------------------
    |   End of Resize Fancy Dropdown
    -----------------------------------------------*/


    var clickEvent = spDetector.isIOS ? 'click tap' : 'click';
    $(Selector.FANCYNAV_LINK).on(clickEvent, function (e) {
      // Fancyscroll in Fancynav
      var $this = $(e.target);

      function getAttributes($node) {
        var attrs = [];
        var attrsObj = {};
        $.each($node[0].attributes, function (index, attribute) {
          return attrs.push(attribute.name);
        });
        $.each($node[0].attributes, function (i, a) {
          attrsObj[a.name] = a.value;
        });
        return {
          attrs: attrs,
          attrsObj: attrsObj
        };
      }

      var fancyscroll = function fancyscroll(target, elem) {
        $('html, body').animate({
          scrollTop: target.offset().top - (elem.data('offset') || 0)
        }, 400, 'swing', function () {
          var hash = elem.attr('href');
          window.history.pushState ? window.history.pushState(null, null, hash) : window.location.hash = hash;
        });
        animateMenu();
      };

      if ($this.hasClass('fancynav-link') && getAttributes($this).attrs.includes('data-fancyscroll')) {
        fancyscroll($("#" + getAttributes($this).attrsObj.href.split('#')[1]), $this);
        return;
      } else if ($this.parent().hasClass('fancynav-link') && getAttributes($this.parent()).attrs.includes('data-fancyscroll')) {
        fancyscroll($("#" + getAttributes($this.parent()).attrsObj.href.split('#')[1]), $this.parent());
        return;
      } // Keeping the menu open on ctrl/cmd + click


      if (e.ctrlKey || e.metaKey) return;
      var $fancyLink = $(e.currentTarget);
      var fancyDropdownMenuTimeline = new TimelineMax().pause();
      var listOfitems = $fancyLink.siblings(Selector.FANCY_DROPDOWN_MENU).find(Selector.FANCY_DROPDOWN_ITEM).toArray();
      fancyDropdownMenuTimeline.staggerFromTo(listOfitems, 0.3, {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        ease: EASE
      }, 0.01).delay(0.1);

      if ($fancyLink.hasClass(ClassName.SHOW)) {
        fancyDropdownMenuTimeline.reverse();
        $fancyLink.parent(Selector.FANCY_DROPDOWN).height($fancyLink.height());
      } else {
        $fancyLink.parent(Selector.FANCY_DROPDOWN).height($fancyLink.height() + $fancyLink.siblings(Selector.FANCY_DROPDOWN_MENU).height());
        fancyDropdownMenuTimeline.play();
      }
      /*-----------------------------------------------
       |   Exclusive
       -----------------------------------------------*/


      if (exclusive) {
        $fancyLink.closest(Selector.FANCY_DROPDOWN).siblings(Selector.FANCY_DROPDOWN).height($fancyLink.height()).children(Selector.FANCY_DROPDOWN_TOGGLE).removeClass(ClassName.SHOW);
      }

      $fancyLink.closest(Selector.FANCY_DROPDOWN).toggleClass(ClassName.SHOW);
      $fancyLink.toggleClass(ClassName.SHOW);
    });
    /*-----------------------------------------------
    |   Transparency on scroll on mobile
    -----------------------------------------------*/

    var $togglerbar = $(Selector.FANCYNAVBAR_TOGGLERBAR);
    var onscrollFadeIn = $togglerbar.data('onscroll-fade-in');
    var prevBgColor = $togglerbar.css('backgroundColor');
    var prevBgClass = $(Selector.FANCYNAVBAR_TOGGLERBAR).attr('class').split(' ').filter(function (className) {
      return className.indexOf('bg-') === 0;
    })[0];

    if (onscrollFadeIn) {
      var sideNavBackgroundColor = $togglerbar.css('backgroundColor');
      if (sideNavBackgroundColor === 'transparent') sideNavBackgroundColor = 'rgb(0, 0, 0)';

      if (sideNavBackgroundColor.indexOf('a') === -1) {
        sideNavBackgroundColor = sideNavBackgroundColor.replace(')', ', 1)').replace('rgb', 'rgba');
      }

      var backgroundColorAlpha = sideNavBackgroundColor.split(', ')[3].split(')')[0];
      if (spUtils.$window.scrollTop() === 0) backgroundColorAlpha = 0;
      var timer; // Fix for IE resize event handler

      var changeFancyNavBG = function changeFancyNavBG() {
        if (timer) window.clearTimeout(timer);
        timer = window.setTimeout(function () {
          var windowHeight = spUtils.$window.height();

          if (spUtils.$window.width() >= spUtils.breakpoints.lg) {
            $togglerbar.addClass(prevBgClass);
            $togglerbar.css({
              backgroundColor: prevBgColor
            });
          } else {
            $togglerbar.removeClass(prevBgClass);
            var tempBgColor = sideNavBackgroundColor.split(', ');
            tempBgColor[3] = backgroundColorAlpha + ")";
            var bgColor = tempBgColor.join();
            $togglerbar.css({
              'background-color': bgColor
            });
            spUtils.$window.scroll(function () {
              if (spUtils.$window.width() < spUtils.breakpoints.lg) {
                var scrollTop = spUtils.$window.scrollTop();
                backgroundColorAlpha = scrollTop / windowHeight * 2;
                backgroundColorAlpha >= 1 && (backgroundColorAlpha = 1);
                tempBgColor[3] = backgroundColorAlpha + ")";
                bgColor = tempBgColor.join();
                $togglerbar.css({
                  'background-color': bgColor
                });
              }
            });
          }
        }, 100);
      };

      changeFancyNavBG();
      spUtils.$window.on('resize', changeFancyNavBG);
    }
  }
}); // /*-----------------------------------------------
// |   On page scroll for #id targets
// -----------------------------------------------*/
// spUtils.$document.ready(($) => {
//   $('a[data-fancyscroll]').click(function scrollTo(e) {
//     // const $this = $(e.currentTarget);
//     e.preventDefault();
//     const $this = $(this);
//     if (spUtils.location.pathname.replace(/^\//, '')
// === this.pathname.replace(/^\//, '') && spUtils.location.hostname === this.hostname) {
//       let target = $(this.hash);
//       target = target.length ? target : $(`[name=${this.hash.slice(1)}]`);
//       if (target.length) {
//         $('html,body').animate({
//           scrollTop: (target.offset().top - ($this.data('offset') || 0)),
//         }, 400, 'swing', () => {
//           const hash = $this.attr('href');
//           window.history.pushState ?
//             window.history.pushState(null, null, hash) : window.location.hash = hash;
//         });
//         return false;
//       }
//     }
//     return true;
//   });
// });

/*-----------------------------------------------
|   On page scroll for #id targets
-----------------------------------------------*/

spUtils.$document.ready(function ($) {
  $('a[data-fancyscroll]').click(function scrollTo(e) {
    // const $this = $(e.currentTarget);
    var $this = $(this);

    if (spUtils.location.pathname === $this[0].pathname && spUtils.location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && spUtils.location.hostname === this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");

      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - ($this.data('offset') || 0)
        }, 400, 'swing', function () {
          var hash = $this.attr('href');
          window.history.pushState ? window.history.pushState(null, null, hash) : window.location.hash = hash;
        });
        return false;
      }
    }

    return true;
  });
  var hash = window.location.hash;

  if (hash && document.getElementById(hash.slice(1))) {
    var $this = $(hash);
    $('html, body').animate({
      scrollTop: $this.offset().top - $("a[href='" + hash + "']").data('offset')
    }, 400, 'swing', function () {
      window.history.pushState ? window.history.pushState(null, null, hash) : window.location.hash = hash;
    });
  }
});
/*-----------------------------------------------
|   Tabs
-----------------------------------------------*/

spUtils.$document.ready(function () {
  var $fancyTabs = $('.fancy-tab');

  if ($fancyTabs.length) {
    var Selector = {
      TAB_BAR: '.nav-bar',
      TAB_BAR_ITEM: '.nav-bar-item',
      TAB_CONTENTS: '.tab-contents'
    };
    var ClassName = {
      ACTIVE: 'active',
      TRANSITION_REVERSE: 'transition-reverse',
      TAB_INDICATOR: 'tab-indicator'
    };
    /*-----------------------------------------------
    |   Function for active tab indicator change
    -----------------------------------------------*/

    var updateIncicator = function updateIncicator($indicator, $tabs, $tabnavCurrentItem) {
      var _$tabnavCurrentItem$p = $tabnavCurrentItem.position(),
          left = _$tabnavCurrentItem$p.left;

      var right = $tabs.children(Selector.TAB_BAR).outerWidth() - (left + $tabnavCurrentItem.outerWidth());
      $indicator.css({
        left: left,
        right: right
      });
    };

    $fancyTabs.each(function (index, value) {
      var $tabs = $(value);
      var $navBar = $tabs.children(Selector.TAB_BAR);
      var $tabnavCurrentItem = $navBar.children(Selector.TAB_BAR_ITEM + "." + ClassName.ACTIVE);
      $navBar.append("\n        <div class=" + ClassName.TAB_INDICATOR + "></div>\n      ");
      var $indicator = $navBar.children("." + ClassName.TAB_INDICATOR);
      var $preIndex = $tabnavCurrentItem.index();
      updateIncicator($indicator, $tabs, $tabnavCurrentItem);
      $navBar.children(Selector.TAB_BAR_ITEM).click(function (e) {
        $tabnavCurrentItem = $(e.currentTarget);
        var $currentIndex = $tabnavCurrentItem.index();
        var $tabContent = $tabs.children(Selector.TAB_CONTENTS).children().eq($currentIndex);
        $tabnavCurrentItem.siblings().removeClass(ClassName.ACTIVE);
        $tabnavCurrentItem.addClass(ClassName.ACTIVE);
        $tabContent.siblings().removeClass(ClassName.ACTIVE);
        $tabContent.addClass(ClassName.ACTIVE);
        /*-----------------------------------------------
        |   Indicator Transition
        -----------------------------------------------*/

        updateIncicator($indicator, $tabs, $tabnavCurrentItem);

        if ($currentIndex - $preIndex <= 0) {
          $indicator.addClass(ClassName.TRANSITION_REVERSE);
        } else {
          $indicator.removeClass(ClassName.TRANSITION_REVERSE);
        }

        $preIndex = $currentIndex;
      });
      spUtils.$window.on('resize', function () {
        updateIncicator($indicator, $tabs, $tabnavCurrentItem);
      });
    });
  }
});
/*-----------------------------------------------
|   Forms
-----------------------------------------------*/

/*-----------------------------------------------
|   Choose a file
-----------------------------------------------*/

var inputs = document.querySelectorAll('.zinput-file');

(function () {
  Array.prototype.forEach.call(inputs, function (input) {
    var label = input.nextElementSibling;
    var labelVal = label.innerHTML;
    input.addEventListener('change', function (e) {
      var fileName = '';

      if (_this2.files && _this2.files.length > 1) {
        fileName = (_this2.getAttribute('data-multiple-caption') || '').replace('{count}', _this2.files.length);
      } else {
        fileName = e.target.value.split('\\').pop();
      }

      if (fileName) {
        label.querySelector('span').innerHTML = fileName;
      } else {
        label.innerHTML = labelVal;
      }
    }); // Firefox bug fix

    input.addEventListener('focus', function () {
      return input.classList.add('has-focus');
    });
    input.addEventListener('blur', function () {
      return input.classList.remove('has-focus');
    });
  });
})(document, window, 0);

spUtils.$document.ready(function () {
  if (inputs.length) {
    $('.zinput-file + label').prepend('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewbox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>');
  }
});
/*-----------------------------------------------
|   Checkbox and Radio
-----------------------------------------------*/

if (document.createElement('svg').getAttributeNS) {
  var checkbxsCheckmark = Array.prototype.slice.call(document.querySelectorAll('.zinput.zcheckbox input[type="checkbox"]'));
  var pathDefs = {
    checkmark: ['M16.7,62.2c4.3,5.7,21.8,27.9,21.8,27.9L87,16']
  };
  var animDefs = {
    checkmark: {
      speed: 0.2,
      easing: 'ease-in-out'
    }
  };

  var createSVGEl = function createSVGEl(def) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    if (def) {
      svg.setAttributeNS(null, 'viewBox', def.viewBox);
      svg.setAttributeNS(null, 'preserveAspectRatio', def.preserveAspectRatio);
    } else {
      svg.setAttributeNS(null, 'viewBox', '0 0 100 100');
    }

    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    return svg;
  };

  var draw = function draw(el) {
    var paths = [];
    var svg = el.parentNode.querySelector('svg');
    var pathDef = pathDefs.checkmark;
    var animDef = animDefs.checkmark;
    paths.push(document.createElementNS('http://www.w3.org/2000/svg', 'path'));

    for (var i = 0, len = paths.length; i < len; i += 1) {
      var path = paths[i];
      svg.appendChild(path);
      path.setAttributeNS(null, 'd', pathDef[i]);
      var length = path.getTotalLength();
      path.style.strokeDasharray = length + " " + length;

      if (i === 0) {
        path.style.strokeDashoffset = Math.floor(length) - 1;
      } else {
        path.style.strokeDashoffset = length;
      }

      path.getBoundingClientRect();
      path.style.transition = path.style.WebkitTransition;
      path.style.transition = path.style.MozTransition;
      path.style.transition = "stroke-dashoffset " + animDef.speed + "s " + animDef.easing + " " + i * animDef.speed + "s";
      path.style.strokeDashoffset = '0';
    }
  };

  var reset = function reset(el) {
    Array.prototype.slice.call(el.parentNode.querySelectorAll('svg > path')).forEach(function (elem) {
      elem.parentNode.removeChild(elem);
    });
  };

  var controlCheckbox = function controlCheckbox(el, type, svgDef) {
    var svg = createSVGEl(svgDef);
    el.parentNode.appendChild(svg);

    if (el.checked) {
      draw(el, type);
    }

    el.addEventListener('change', function () {
      if (el.checked) {
        draw(el, type);
      } else {
        reset(el);
      }
    });
  };

  checkbxsCheckmark.forEach(function (el) {
    return controlCheckbox(el, 'checkmark');
  });
}
/*-----------------------------------------------
|   Bootstrap validation
-----------------------------------------------*/


(function () {
  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply sparrow Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation'); // Loop over them and prevent submission

    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();
/*-----------------------------------------------
|   Gooogle Map
-----------------------------------------------*/

/*
  global google
*/


function initMap() {
  var $googlemaps = $('.googlemap');

  if ($googlemaps.length) {
    // Visit https://snazzymaps.com/ for more themes
    var mapStyles = {
      Default: [{
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{
          color: '#e9e9e9'
        }, {
          lightness: 17
        }]
      }, {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{
          color: '#f5f5f5'
        }, {
          lightness: 20
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#ffffff'
        }, {
          lightness: 17
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#ffffff'
        }, {
          lightness: 29
        }, {
          weight: 0.2
        }]
      }, {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{
          color: '#ffffff'
        }, {
          lightness: 18
        }]
      }, {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [{
          color: '#ffffff'
        }, {
          lightness: 16
        }]
      }, {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{
          color: '#f5f5f5'
        }, {
          lightness: 21
        }]
      }, {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{
          color: '#dedede'
        }, {
          lightness: 21
        }]
      }, {
        elementType: 'labels.text.stroke',
        stylers: [{
          visibility: 'on'
        }, {
          color: '#ffffff'
        }, {
          lightness: 16
        }]
      }, {
        elementType: 'labels.text.fill',
        stylers: [{
          saturation: 36
        }, {
          color: '#333333'
        }, {
          lightness: 40
        }]
      }, {
        elementType: 'labels.icon',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{
          color: '#f2f2f2'
        }, {
          lightness: 19
        }]
      }, {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#fefefe'
        }, {
          lightness: 20
        }]
      }, {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#fefefe'
        }, {
          lightness: 17
        }, {
          weight: 1.2
        }]
      }],
      Gray: [{
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [{
          saturation: 36
        }, {
          color: '#000000'
        }, {
          lightness: 40
        }]
      }, {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [{
          visibility: 'on'
        }, {
          color: '#000000'
        }, {
          lightness: 16
        }]
      }, {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 20
        }]
      }, {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 17
        }, {
          weight: 1.2
        }]
      }, {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 20
        }]
      }, {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 21
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 17
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 29
        }, {
          weight: 0.2
        }]
      }, {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 18
        }]
      }, {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 16
        }]
      }, {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 19
        }]
      }, {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 17
        }]
      }],
      Midnight: [{
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#ffffff'
        }]
      }, {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 13
        }]
      }, {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#000000'
        }]
      }, {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#144b53'
        }, {
          lightness: 14
        }, {
          weight: 1.4
        }]
      }, {
        featureType: 'landscape',
        elementType: 'all',
        stylers: [{
          color: '#08304b'
        }]
      }, {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{
          color: '#0c4152'
        }, {
          lightness: 5
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#000000'
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#0b434f'
        }, {
          lightness: 25
        }]
      }, {
        featureType: 'road.arterial',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#000000'
        }]
      }, {
        featureType: 'road.arterial',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#0b3d51'
        }, {
          lightness: 16
        }]
      }, {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }]
      }, {
        featureType: 'transit',
        elementType: 'all',
        stylers: [{
          color: '#146474'
        }]
      }, {
        featureType: 'water',
        elementType: 'all',
        stylers: [{
          color: '#021019'
        }]
      }],
      Hopper: [{
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{
          hue: '#165c64'
        }, {
          saturation: 34
        }, {
          lightness: -69
        }, {
          visibility: 'on'
        }]
      }, {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{
          hue: '#b7caaa'
        }, {
          saturation: -14
        }, {
          lightness: -18
        }, {
          visibility: 'on'
        }]
      }, {
        featureType: 'landscape.man_made',
        elementType: 'all',
        stylers: [{
          hue: '#cbdac1'
        }, {
          saturation: -6
        }, {
          lightness: -9
        }, {
          visibility: 'on'
        }]
      }, {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{
          hue: '#8d9b83'
        }, {
          saturation: -89
        }, {
          lightness: -12
        }, {
          visibility: 'on'
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{
          hue: '#d4dad0'
        }, {
          saturation: -88
        }, {
          lightness: 54
        }, {
          visibility: 'simplified'
        }]
      }, {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{
          hue: '#bdc5b6'
        }, {
          saturation: -89
        }, {
          lightness: -3
        }, {
          visibility: 'simplified'
        }]
      }, {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [{
          hue: '#bdc5b6'
        }, {
          saturation: -89
        }, {
          lightness: -26
        }, {
          visibility: 'on'
        }]
      }, {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{
          hue: '#c17118'
        }, {
          saturation: 61
        }, {
          lightness: -45
        }, {
          visibility: 'on'
        }]
      }, {
        featureType: 'poi.park',
        elementType: 'all',
        stylers: [{
          hue: '#8ba975'
        }, {
          saturation: -46
        }, {
          lightness: -28
        }, {
          visibility: 'on'
        }]
      }, {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{
          hue: '#a43218'
        }, {
          saturation: 74
        }, {
          lightness: -51
        }, {
          visibility: 'simplified'
        }]
      }, {
        featureType: 'administrative.province',
        elementType: 'all',
        stylers: [{
          hue: '#ffffff'
        }, {
          saturation: 0
        }, {
          lightness: 100
        }, {
          visibility: 'simplified'
        }]
      }, {
        featureType: 'administrative.neighborhood',
        elementType: 'all',
        stylers: [{
          hue: '#ffffff'
        }, {
          saturation: 0
        }, {
          lightness: 100
        }, {
          visibility: 'off'
        }]
      }, {
        featureType: 'administrative.locality',
        elementType: 'labels',
        stylers: [{
          hue: '#ffffff'
        }, {
          saturation: 0
        }, {
          lightness: 100
        }, {
          visibility: 'off'
        }]
      }, {
        featureType: 'administrative.land_parcel',
        elementType: 'all',
        stylers: [{
          hue: '#ffffff'
        }, {
          saturation: 0
        }, {
          lightness: 100
        }, {
          visibility: 'off'
        }]
      }, {
        featureType: 'administrative',
        elementType: 'all',
        stylers: [{
          hue: '#3a3935'
        }, {
          saturation: 5
        }, {
          lightness: -57
        }, {
          visibility: 'off'
        }]
      }, {
        featureType: 'poi.medical',
        elementType: 'geometry',
        stylers: [{
          hue: '#cba923'
        }, {
          saturation: 50
        }, {
          lightness: -46
        }, {
          visibility: 'on'
        }]
      }],
      Beard: [{
        featureType: 'poi.business',
        elementType: 'labels.text',
        stylers: [{
          visibility: 'on'
        }, {
          color: '#333333'
        }]
      }],
      AssassianCreed: [{
        featureType: 'all',
        elementType: 'all',
        stylers: [{
          visibility: 'on'
        }]
      }, {
        featureType: 'all',
        elementType: 'labels',
        stylers: [{
          visibility: 'off'
        }, {
          saturation: '-100'
        }]
      }, {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [{
          saturation: 36
        }, {
          color: '#000000'
        }, {
          lightness: 40
        }, {
          visibility: 'off'
        }]
      }, {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [{
          visibility: 'off'
        }, {
          color: '#000000'
        }, {
          lightness: 16
        }]
      }, {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 20
        }]
      }, {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 17
        }, {
          weight: 1.2
        }]
      }, {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 20
        }]
      }, {
        featureType: 'landscape',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#4d6059'
        }]
      }, {
        featureType: 'landscape',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#4d6059'
        }]
      }, {
        featureType: 'landscape.natural',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#4d6059'
        }]
      }, {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{
          lightness: 21
        }]
      }, {
        featureType: 'poi',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#4d6059'
        }]
      }, {
        featureType: 'poi',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#4d6059'
        }]
      }, {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{
          visibility: 'on'
        }, {
          color: '#7f8d89'
        }]
      }, {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#7f8d89'
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#7f8d89'
        }, {
          lightness: 17
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#7f8d89'
        }, {
          lightness: 29
        }, {
          weight: 0.2
        }]
      }, {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 18
        }]
      }, {
        featureType: 'road.arterial',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#7f8d89'
        }]
      }, {
        featureType: 'road.arterial',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#7f8d89'
        }]
      }, {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 16
        }]
      }, {
        featureType: 'road.local',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#7f8d89'
        }]
      }, {
        featureType: 'road.local',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#7f8d89'
        }]
      }, {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 19
        }]
      }, {
        featureType: 'water',
        elementType: 'all',
        stylers: [{
          color: '#2b3638'
        }, {
          visibility: 'on'
        }]
      }, {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{
          color: '#2b3638'
        }, {
          lightness: 17
        }]
      }, {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#24282b'
        }]
      }, {
        featureType: 'water',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#24282b'
        }]
      }, {
        featureType: 'water',
        elementType: 'labels',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'water',
        elementType: 'labels.text',
        stylers: [{
          visibility: 'off '
        }]
      }, {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'water',
        elementType: 'labels.icon',
        stylers: [{
          visibility: 'off'
        }]
      }],
      SubtleGray: [{
        featureType: 'administrative',
        elementType: 'all',
        stylers: [{
          saturation: '-100'
        }]
      }, {
        featureType: 'administrative.province',
        elementType: 'all',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'landscape',
        elementType: 'all',
        stylers: [{
          saturation: -100
        }, {
          lightness: 65
        }, {
          visibility: 'on'
        }]
      }, {
        featureType: 'poi',
        elementType: 'all',
        stylers: [{
          saturation: -100
        }, {
          lightness: '50'
        }, {
          visibility: 'simplified'
        }]
      }, {
        featureType: 'road',
        elementType: 'all',
        stylers: [{
          saturation: -100
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'all',
        stylers: [{
          visibility: 'simplified'
        }]
      }, {
        featureType: 'road.arterial',
        elementType: 'all',
        stylers: [{
          lightness: '30'
        }]
      }, {
        featureType: 'road.local',
        elementType: 'all',
        stylers: [{
          lightness: '40'
        }]
      }, {
        featureType: 'transit',
        elementType: 'all',
        stylers: [{
          saturation: -100
        }, {
          visibility: 'simplified'
        }]
      }, {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{
          hue: '#ffff00'
        }, {
          lightness: -25
        }, {
          saturation: -97
        }]
      }, {
        featureType: 'water',
        elementType: 'labels',
        stylers: [{
          lightness: -25
        }, {
          saturation: -100
        }]
      }],
      Tripitty: [{
        featureType: 'all',
        elementType: 'labels',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'administrative',
        elementType: 'all',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'landscape',
        elementType: 'all',
        stylers: [{
          color: '#2c5ca5'
        }]
      }, {
        featureType: 'poi',
        elementType: 'all',
        stylers: [{
          color: '#2c5ca5'
        }]
      }, {
        featureType: 'road',
        elementType: 'all',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'transit',
        elementType: 'all',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'water',
        elementType: 'all',
        stylers: [{
          color: '#193a70'
        }, {
          visibility: 'on'
        }]
      }]
    };
    $googlemaps.each(function (index, value) {
      var $googlemap = $(value);
      var latLng = $googlemap.data('latlng').split(',');
      var markerPopup = $googlemap.html();
      var icon = $googlemap.data('icon') ? $googlemap.data('icon') : 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png';
      var zoom = $googlemap.data('zoom');
      var mapStyle = $googlemap.data('theme');
      var mapElement = value;

      if ($googlemap.data('theme') === 'streetview') {
        var pov = $googlemap.data('pov');
        var _mapOptions = {
          position: {
            lat: Number(latLng[0]),
            lng: Number(latLng[1])
          },
          pov: pov,
          zoom: zoom,
          gestureHandling: 'none',
          scrollwheel: false
        };
        return new google.maps.StreetViewPanorama(mapElement, _mapOptions);
      }

      var mapOptions = {
        zoom: zoom,
        scrollwheel: $googlemap.data('scrollwheel'),
        center: new google.maps.LatLng(latLng[0], latLng[1]),
        styles: mapStyles[mapStyle]
      };
      var map = new google.maps.Map(mapElement, mapOptions);
      var infowindow = new google.maps.InfoWindow({
        content: markerPopup
      });
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(latLng[0], latLng[1]),
        icon: icon,
        map: map
      });
      marker.addListener('click', function () {
        infowindow.open(map, marker);
      });
      return null;
    });
  }
}
/*-----------------------------------------------
|   Masonry with isotope
-----------------------------------------------*/


spUtils.$window.on('load', function () {
  var $sortables = $('.sortable');

  if ($sortables.length) {
    var Selector = {
      SORTABLE_ITEM: '.sortable-item',
      SORTABLE_CONTAINER: '.sortable-container',
      MENU: '.menu',
      ITEM: '.item'
    };
    var ClassName = {
      ACTIVE: 'active'
    };
    var DATA_KEY = {
      OPTIONS: 'options',
      FILTER_GROUP: 'filter-group',
      FILTER: 'filter'
    };
    $sortables.each(function (index, value) {
      var $sortable = $(value);
      var $masonryContainer = $sortable.find(Selector.SORTABLE_CONTAINER);
      var $menu = $sortable.find(Selector.MENU);
      $masonryContainer.isotope($.extend($sortable.data(DATA_KEY.OPTIONS) || {}, {
        itemSelector: Selector.SORTABLE_ITEM,
        masonry: {
          columnWidth: Selector.SORTABLE_ITEM
        }
      }));
      /*-----------------------------------------------
      |   Flatten object by concatting values
      -----------------------------------------------*/

      var concatValues = function concatValues(obj) {
        return Object.keys(obj).map(function (key) {
          return obj[key];
        }).join();
      };
      /*-----------------------------------------------
      |   Store filter for each group
      -----------------------------------------------*/


      var filters = {};
      $menu.on('click', Selector.ITEM, function (e) {
        var $masonryFilter = $(e.target);
        filters[$masonryFilter.parent().data(DATA_KEY.FILTER_GROUP) || 0] = $masonryFilter.data(DATA_KEY.FILTER);
        var filterValue = concatValues(filters);
        $masonryFilter.siblings().removeClass(ClassName.ACTIVE);
        $masonryFilter.addClass(ClassName.ACTIVE);
        $masonryContainer.isotope({
          filter: filterValue
        });
      });
    });
  }
});
/*-----------------------------------------------
|   Lightbox
-----------------------------------------------*/

/*
  global lightbox
*/

spUtils.$document.ready(function () {
  if ($('[data-lightbox]').length) {
    lightbox.option({
      resizeDuration: 400,
      wrapAround: true,
      fadeDuration: 300,
      imageFadeDuration: 300
    });
  }
});
/*-----------------------------------------------
|   Owl Carousel
-----------------------------------------------*/

var $carousel = $('.owl-carousel');
spUtils.$document.ready(function () {
  if ($carousel.length) {
    var Selector = {
      ALL_TIMELINE: '*[data-zanim-timeline]',
      ACTIVE_ITEM: '.owl-item.active'
    };
    var owlZanim = {
      zanimTimeline: function zanimTimeline($el) {
        return $el.find(Selector.ALL_TIMELINE);
      },
      play: function play($el) {
        if (this.zanimTimeline($el).length === 0) return;
        $el.find(Selector.ACTIVE_ITEM + " > " + Selector.ALL_TIMELINE).zanimation(function (animation) {
          animation.play();
        });
      },
      kill: function kill($el) {
        if (this.zanimTimeline($el).length === 0) return;
        this.zanimTimeline($el).zanimation(function (animation) {
          animation.kill();
        });
      }
    };
    $carousel.each(function (index, value) {
      var $this = $(value);
      var options = $this.data('options') || {};
      spUtils.isRTL() && (options.rtl = true);
      options.navText || (options.navText = ['<span class="fas fa-angle-left"></span>', '<span class="fas fa-angle-right"></span>']);
      options.touchDrag = true;
      $this.owlCarousel($.extend(options || {}, {
        onInitialized: function onInitialized(event) {
          owlZanim.play($(event.target));
        },
        onTranslate: function onTranslate(event) {
          owlZanim.kill($(event.target));
        },
        onTranslated: function onTranslated(event) {
          owlZanim.play($(event.target));
        }
      }));
    });
  }
});
/*-----------------------------------------------
|   Inline Player [plyr]
-----------------------------------------------*/

/*
  global Plyr
*/

spUtils.$document.ready(function () {
  var $players = $('.player');

  if ($players.length) {
    $players.each(function (index, value) {
      return new Plyr($(value), {
        captions: {
          active: true
        }
      });
    });
  }

  return false;
});
/*-----------------------------------------------
|   Pre-loader
-----------------------------------------------*/

$.holdReady(true);
$($('main section')[0]).imagesLoaded({
  background: '.bg-holder'
}, function () {
  $.holdReady(false);
});
spUtils.$document.ready(function () {
  var $preloader = $('#preloader');
  $preloader.addClass('loaded');
  setTimeout(function () {
    $preloader.remove();
  }, 800);
});
/*
 global ProgressBar
*/

spUtils.$document.ready(function () {
  // progressbar.js@1.0.0 version is used
  // Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

  /*-----------------------------------------------
  |   Progress Circle
  -----------------------------------------------*/
  var progresCircle = $('.progress-circle');

  if (progresCircle.length) {
    progresCircle.each(function (index, value) {
      var $this = $(value);
      var options = $this.data('options');
      var bar = new ProgressBar.Circle(value, {
        color: '#aaa',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 2,
        trailWidth: 2,
        easing: 'easeInOut',
        duration: 3000,
        svgStyle: {
          'stroke-linecap': 'round',
          display: 'block',
          width: '100%'
        },
        text: {
          autoStyleContainer: false
        },
        from: {
          color: '#aaa',
          width: 2
        },
        to: {
          color: '#333',
          width: 2
        },
        // Set default step function for all animate calls
        step: function step(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);
          var percentage = Math.round(circle.value() * 100);
          circle.setText("<span class='value'>" + percentage + "<b>%</b></span> <span>" + options.text + "</span>");
        }
      });
      var playProgressTriggered = false;

      var progressCircleAnimation = function progressCircleAnimation() {
        if (!playProgressTriggered) {
          if (spUtils.isScrolledIntoView(value) || spDetector.isPuppeteer) {
            bar.animate(options.progress / 100);
            playProgressTriggered = true;
          }
        }

        return playProgressTriggered;
      };

      progressCircleAnimation();
      spUtils.$window.scroll(function () {
        progressCircleAnimation();
      });
    });
  }
  /*-----------------------------------------------
  |   Progress Line
  -----------------------------------------------*/


  var progressLine = $('.progress-line');

  if (progressLine.length) {
    progressLine.each(function (index, value) {
      var $this = $(value);
      var options = $this.data('options');
      var bar = new ProgressBar.Line(value, {
        strokeWidth: 1,
        easing: 'easeInOut',
        duration: 3000,
        color: '#333',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: {
          width: '100%',
          height: '0.25rem',
          'stroke-linecap': 'round',
          'border-radius': '0.125rem'
        },
        text: {
          style: {
            transform: null
          },
          autoStyleContainer: false
        },
        from: {
          color: '#aaa'
        },
        to: {
          color: '#111'
        },
        step: function step(state, line) {
          line.setText("<span class='value'>" + Math.round(line.value() * 100) + "<b>%</b></span> <span>" + options.text + "</span>");
        }
      });
      var playProgressTriggered = false;

      var progressLineAnimation = function progressLineAnimation() {
        if (!playProgressTriggered) {
          if (spUtils.isScrolledIntoView(value) || spDetector.isPuppeteer) {
            bar.animate(options.progress / 100);
            playProgressTriggered = true;
          }
        }

        return playProgressTriggered;
      };

      progressLineAnimation();
      spUtils.$window.scroll(function () {
        progressLineAnimation();
      });
    });
  }
});
/*-----------------------------------------------
|   Rellax [Parallax]
-----------------------------------------------*/

/*
  global Rellax
*/

spUtils.$document.ready(function () {
  var Selector = {
    PARALLAX: '.parallax'
  };

  if ($(Selector.PARALLAX).length) {
    var callRellax = function callRellax() {
      return new Rellax(Selector.PARALLAX, {
        speed: -3
      });
    };

    if (!spDetector.isIE && !spDetector.isIE11 && !spDetector.isPuppeteer) callRellax();
  }
});
/*-----------------------------------------------
|   Remodal [video lightbox]
-----------------------------------------------*/

spUtils.$document.ready(function () {
  var $videoModals = $('.video-modal');

  if ($videoModals.length) {
    spUtils.$body.after("\n      <div id='videoModal' class='remodal remodal-video'>\n        <button data-remodal-action='close' class='remodal-close'></button>\n        <div class='embed-responsive embed-responsive-16by9'>\n          <div id='videoModalIframeWrapper'></div>\n        </div>\n      </div>\n    ");
    var $videoModal = $('#videoModal').remodal();
    var $videoModalIframeWrapper = $('#videoModalIframeWrapper');
    $videoModals.each(function (index, value) {
      $(value).on('click', function (e) {
        e.preventDefault();
        var $this = $(e.currentTarget);
        var ytId = $this.attr('href').split('/');
        var start = $this.data('start');
        var end = $this.data('end');

        if (ytId[2] === 'www.youtube.com') {
          $videoModalIframeWrapper.html("<iframe id='videoModalIframe' src='//www.youtube.com/embed/" + ytId[3].split('?v=')[1] + "?rel=0&amp;autoplay=1&amp;enablejsapi=0&amp;start=" + start + "&ampend=" + end + "' allowfullscreen' frameborder='0' class='embed-responsive-item hide'></iframe>");
        } else if (ytId[2] === 'vimeo.com') {
          $videoModalIframeWrapper.html("<iframe id='videoModalIframe' src='https://player.vimeo.com/video/" + ytId[3] + "?autoplay=1&title=0&byline=0&portrait=0 ?autoplay=1&title=0&byline=0&portrait=0 hide'></iframe>");
        }

        $videoModal.open();
      });
    });
    spUtils.$document.on('closed', '.remodal', function (e) {
      var $this = $(e.currentTarget);

      if ($this.attr('id') === 'videoModal') {
        $videoModalIframeWrapper.html('');
      }
    });
  }
});
/*-----------------------------------------------
|   Sementic UI
-----------------------------------------------*/

spUtils.$document.ready(function () {
  var uiDropdown = $('.ui.dropdown');
  var uiAccordion = $('.ui.accordion');
  /*-----------------------------------------------
  |   Dropdown
  -----------------------------------------------*/

  if (uiDropdown.length) {
    uiDropdown.dropdown();
  }
  /*-----------------------------------------------
  |   Accordion
  -----------------------------------------------*/


  if (uiAccordion.length) {
    uiAccordion.each(function (index, value) {
      var $this = $(value);
      $this.accordion($.extend({
        exclusive: false
      }, $this.data('options') || {}));
    });
  }
});
/*
  global Stickyfill
*/

/*-----------------------------------------------
|   Sticky fill
-----------------------------------------------*/

spUtils.$document.ready(function () {
  Stickyfill.add($('.sticky-top'));
});
/*-----------------------------------------------
|   Sticky Kit
-----------------------------------------------*/

spUtils.$document.ready(function () {
  var stickyKit = $('.sticky-kit');

  if (stickyKit.length) {
    stickyKit.each(function (index, value) {
      $(value).stick_in_parent();
    });
  }
});
/*-----------------------------------------------
|   Typed Text
-----------------------------------------------*/

/*
  global Typed
 */

spUtils.$document.ready(function () {
  var typedText = $('.typed-text');

  if (typedText.length) {
    typedText.each(function (index, value) {
      return new Typed(value, {
        strings: $(value).data('typed-text'),
        typeSpeed: 100,
        loop: true,
        backDelay: 1500
      });
    });
  }
});
/*-----------------------------------------------
|   YTPlayer
-----------------------------------------------*/

spUtils.$document.ready(function () {
  var Selector = {
    BG_YOUTUBE: '.bg-youtube',
    BG_HOLDER: '.bg-holder'
  };
  var DATA_KEY = {
    PROPERTY: 'property'
  };
  var $youtubeBackground = $(Selector.BG_YOUTUBE);

  if ($youtubeBackground.length) {
    $youtubeBackground.each(function (index, value) {
      var $this = $(value);
      $this.data(DATA_KEY.PROPERTY, $.extend($this.data(DATA_KEY.PROPERTY), {
        showControls: false,
        loop: true,
        autoPlay: true,
        mute: true,
        containment: $this.parent(Selector.BG_HOLDER)
      }));
      $this.YTPlayer();
    });
  }
});
/*-----------------------------------------------
|   Global Functions
-----------------------------------------------*/

/*
global TimelineMax, TweenMax, CustomEase
*/

CustomEase.create('CubicBezier', '.77,0,.18,1');

var filterBlur = function filterBlur() {
  var blur = 'blur(5px)';

  if (spDetector.iPadiPhoneFirefox || spDetector.macFirefox) {
    blur = 'blur(0px)';
  }

  return blur;
};

var zanimationEffects = {
  default: {
    from: {
      opacity: 0,
      y: 70
    },
    to: {
      opacity: 1,
      y: 0
    },
    ease: 'CubicBezier',
    duration: 0.8,
    delay: 0
  },
  'slide-down': {
    from: {
      opacity: 0,
      y: -70
    },
    to: {
      opacity: 1,
      y: 0
    },
    ease: 'CubicBezier',
    duration: 0.8,
    delay: 0
  },
  'slide-left': {
    from: {
      opacity: 0,
      x: 70
    },
    to: {
      opacity: 1,
      x: 0
    },
    ease: 'CubicBezier',
    duration: 0.8,
    delay: 0
  },
  'slide-right': {
    from: {
      opacity: 0,
      x: -70
    },
    to: {
      opacity: 1,
      x: 0
    },
    ease: 'CubicBezier',
    duration: 0.8,
    delay: 0
  },
  'zoom-in': {
    from: {
      scale: 0.9,
      opacity: 0,
      filter: filterBlur()
    },
    to: {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)'
    },
    delay: 0,
    ease: 'CubicBezier',
    duration: 0.8
  },
  'zoom-out': {
    from: {
      scale: 1.1,
      opacity: 1,
      filter: filterBlur()
    },
    to: {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)'
    },
    delay: 0,
    ease: 'CubicBezier',
    duration: 0.8
  },
  'zoom-out-slide-right': {
    from: {
      scale: 1.1,
      opacity: 1,
      x: -70,
      filter: filterBlur()
    },
    to: {
      scale: 1,
      opacity: 1,
      x: 0,
      filter: 'blur(0px)'
    },
    delay: 0,
    ease: 'CubicBezier',
    duration: 0.8
  },
  'zoom-out-slide-left': {
    from: {
      scale: 1.1,
      opacity: 1,
      x: 70,
      filter: filterBlur()
    },
    to: {
      scale: 1,
      opacity: 1,
      x: 0,
      filter: 'blur(0px)'
    },
    delay: 0,
    ease: 'CubicBezier',
    duration: 0.8
  },
  'blur-in': {
    from: {
      opacity: 0,
      filter: filterBlur()
    },
    to: {
      opacity: 1,
      filter: 'blur(0px)'
    },
    delay: 0,
    ease: 'CubicBezier',
    duration: 0.8
  }
};

if (spUtils.isRTL()) {
  Object.keys(zanimationEffects).forEach(function (key) {
    if (zanimationEffects[key].from.x) {
      zanimationEffects[key].from.x = -zanimationEffects[key].from.x;
    }
  });
}

var breakPointConst = spUtils.getCurrentScreanBreakpoint();
/*-----------------------------------------------
|   Zanimation
-----------------------------------------------*/

(function zanimation($) {
  /*-----------------------------------------------
  |   Get Controller
  -----------------------------------------------*/
  var controllerZanim;

  var getController = function getController(el) {
    var $this = $(el);
    var options = {};
    var controller = {};
    $.each($this, function (index, value) {
      if (value.hasAttribute("data-zanim-" + breakPointConst.currentScrean)) {
        controllerZanim = "zanim-" + breakPointConst.currentScrean;
      } else {
        /*-----------------------------------------------
        |   Set the mobile first Animation
        -----------------------------------------------*/
        var animationBreakpoints = [];
        $.each(value.attributes, function (i, attribute) {
          if (attribute.name !== 'data-zanim-trigger' && (spDetector.isIE || spDetector.isIE11 || spDetector.isEdge ? attribute.name.match('^data-zanim-') : attribute.name.startsWith('data-zanim-'))) {
            var breakPoint = spUtils.breakpoints[attribute.name.split('data-zanim-')[1]];

            if (breakPoint < breakPointConst.currentBreakpoint) {
              animationBreakpoints.push({
                name: attribute.name.split('data-zanim-')[1],
                size: breakPoint
              });
            }
          }

          return i;
        });
        controllerZanim = undefined;

        if (animationBreakpoints.length !== 0) {
          animationBreakpoints = animationBreakpoints.sort(function (a, b) {
            return a.size - b.size;
          });
          var activeBreakpoint = animationBreakpoints.pop();
          controllerZanim = "zanim-" + activeBreakpoint.name;
        }
      }

      return index;
    });
    controller = $.extend(true, {}, options, $this.data(controllerZanim));

    if (!(controllerZanim === undefined)) {
      if ($this.data(controllerZanim).animation) {
        options = zanimationEffects[$this.data(controllerZanim).animation];
      } else {
        options = zanimationEffects.default;
      }
    }

    if (controllerZanim === undefined) {
      options = {
        delay: 0,
        duration: 0,
        ease: 'Expo.easeOut',
        from: {},
        to: {}
      };
    }
    /*-----------------------------------------------
    |   populating the controller
    -----------------------------------------------*/


    controller.delay || (controller.delay = options.delay);
    controller.duration || (controller.duration = options.duration);
    controller.from || (controller.from = options.from);
    controller.to || (controller.to = options.to);
    controller.ease && (controller.to.ease = controller.ease) && controller.to.ease || (controller.to.ease = options.ease);
    return controller;
  };
  /*-----------------------------------------------
  |   End of Get Controller
  -----------------------------------------------*/


  jQuery.fn.zanimation = function zanim(callback) {
    var $this = $(this);
    /*-----------------------------------------------
    |   For Timeline
    -----------------------------------------------*/

    var zanimTimeline = $this.data('zanim-timeline');

    if (zanimTimeline) {
      var timeline = new TimelineMax(zanimTimeline);
      var timelineElements = $this.find('[data-zanim-xs], [data-zanim-sm], [data-zanim-md], [data-zanim-lg], [data-zanim-xl]');
      timelineElements.map(function (index, value) {
        var controller = getController(value);
        timeline.fromTo($(value), controller.duration, controller.from, controller.to, controller.delay).pause();
        return index;
      });
      $this.imagesLoaded(function () {
        return callback(timeline);
      });
    } else if (!$this.parents('[data-zanim-timeline]').length) {
      /*-----------------------------------------------
      |   For single elements outside timeline
      -----------------------------------------------*/
      var controller = getController($this);
      callback(TweenMax.fromTo($this, controller.duration, controller.from, controller.to).delay(controller.delay).pause());
    }

    callback(new TimelineMax());
  };
})(jQuery);
/*-----------------------------------------------
|   Triggering zanimation when the element enters in the view
-----------------------------------------------*/


(function triggeringZanimation($) {
  var triggerZanimation = function triggerZanimation($this) {
    if (spUtils.isScrolledIntoView($this) && $this.attr('data-zanim-trigger') === 'scroll') {
      $this.zanimation(function (animation) {
        return animation.play();
      });
      if (!$this.data('zanim-repeat')) $this.removeAttr('data-zanim-trigger');
    }
  };

  spUtils.$document.ready(function () {
    /*-----------------------------------------------
    |   Playing zanimation for scroll triggers
    -----------------------------------------------*/
    $("*[data-zanim-trigger = 'scroll']").map(function (index, value) {
      triggerZanimation($(value));
      spUtils.$window.on('scroll', function () {
        triggerZanimation($(value));
      });
      return index;
    });
  });
})(jQuery);