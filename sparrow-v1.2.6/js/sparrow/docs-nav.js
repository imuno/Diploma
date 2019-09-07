'use strict';

import spUtils from './Utils';

/*-----------------------------------------------
|   Documentation and Component Navigation
-----------------------------------------------*/
spUtils.$document.ready(() => {
  const $componentNav = $('#components-nav');
  if ($componentNav.length) {
    let loc = window.location.href;
    [loc] = loc.split('#');
    const location = loc.split('/');
    const url = `${location[location.length - 2]}/${location.pop()}`;
    const urls = $componentNav.children('li').children('a');

    for (let i = 0, max = urls.length; i < max; i += 1) {
      const dom = urls[i].href.split('/');
      const domURL = `${dom[dom.length - 2]}/${dom.pop()}`;
      if (domURL === url) {
        const $targetedElement = $(urls[i]);
        $targetedElement.removeClass('text-800');
        $targetedElement.addClass('font-weight-bold');
        break;
      }
    }
  }
});
