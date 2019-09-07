'use strict';

import spUtils from './Utils';

/*-----------------------------------------------
|   Typed Text
-----------------------------------------------*/
/*
  global Typed
 */

spUtils.$document.ready(() => {
  const typedText = $('.typed-text');
  if (typedText.length) {
    typedText.each((index, value) => new Typed(value, {
      strings: $(value).data('typed-text'),
      typeSpeed: 100,
      loop: true,
      backDelay: 1500,
    }));
  }
});
