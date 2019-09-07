'use strict';

import spUtils from './Utils';

/*
  global Stickyfill
*/

/*-----------------------------------------------
|   Sticky fill
-----------------------------------------------*/
spUtils.$document.ready(() => {
  Stickyfill.add($('.sticky-top'));
});
