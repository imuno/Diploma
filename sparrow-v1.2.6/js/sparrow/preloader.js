'use strict';

import spUtils from './Utils';

/*-----------------------------------------------
|   Pre-loader
-----------------------------------------------*/
$.holdReady(true);

$($('main section')[0]).imagesLoaded({ background: '.bg-holder' }, () => {
  $.holdReady(false);
});

spUtils.$document.ready(() => {
  const $preloader = $('#preloader');
  $preloader.addClass('loaded');
  setTimeout(() => {
    $preloader.remove();
  }, 800);
});
