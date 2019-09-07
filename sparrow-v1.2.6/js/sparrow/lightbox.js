'use strict';

import spUtils from './Utils';

/*-----------------------------------------------
|   Lightbox
-----------------------------------------------*/
/*
  global lightbox
*/
spUtils.$document.ready(() => {
  if ($('[data-lightbox]').length) {
    lightbox.option({
      resizeDuration: 400,
      wrapAround: true,
      fadeDuration: 300,
      imageFadeDuration: 300,
    });
  }
});
