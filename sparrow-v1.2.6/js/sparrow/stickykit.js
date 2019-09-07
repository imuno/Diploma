'use strict';

import spUtils from './Utils';

/*-----------------------------------------------
|   Sticky Kit
-----------------------------------------------*/
spUtils.$document.ready(() => {
  const stickyKit = $('.sticky-kit');
  if (stickyKit.length) {
    stickyKit.each((index, value) => {
      $(value).stick_in_parent();
    });
  }
});
