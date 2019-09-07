'use strict';

import spUtils from './Utils';

/*-----------------------------------------------
|   Inline Player [plyr]
-----------------------------------------------*/
/*
  global Plyr
*/
spUtils.$document.ready(() => {
  const $players = $('.player');
  if ($players.length) {
    $players.each((index, value) => new Plyr($(value), { captions: { active: true } }));
  }
  return false;
});
