'use strict';

import spUtils from './Utils';

/*-----------------------------------------------
|   Count Up
-----------------------------------------------*/
spUtils.$document.ready(() => {
  const $counters = $('[data-countup]');
  if ($counters.length) {
    $counters.each((index, value) => {
      const $counter = $(value);
      const countTo = $counter.attr('data-countup');
      let playCountUpTriggerd = false;
      const countUP = () => {
        if (spUtils.isScrolledIntoView(value) && !playCountUpTriggerd) {
          if (!playCountUpTriggerd) {
            $({ countNum: 0 }).animate(
              { countNum: countTo },
              {
                duration: 3000,
                easing: 'linear',
                step() {
                  $counter.text(Math.floor(this.countNum));
                },
                complete() {
                  $counter.text(this.countNum);
                },
              },
            );
            playCountUpTriggerd = true;
          }
        }
        return playCountUpTriggerd;
      };
      countUP();
      spUtils.$window.scroll(() => {
        countUP();
      });
    });
  }
});
