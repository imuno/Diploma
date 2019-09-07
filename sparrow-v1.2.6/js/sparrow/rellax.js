'use strict';

import spUtils from './Utils';
import spDetector from './detector';

/*-----------------------------------------------
|   Rellax [Parallax]
-----------------------------------------------*/
/*
  global Rellax
*/
spUtils.$document.ready(() => {
  const Selector = { PARALLAX: '.parallax' };
  if ($(Selector.PARALLAX).length) {
    const callRellax = () => new Rellax(Selector.PARALLAX, { speed: -3 });

    if (!spDetector.isIE && !spDetector.isIE11 && !spDetector.isPuppeteer) callRellax();
  }
});
