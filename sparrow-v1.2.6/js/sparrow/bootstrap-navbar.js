'use strict';

import spUtils from './Utils';

/*-----------------------------------------------
|   Top navigation opacity on scroll
-----------------------------------------------*/
spUtils.$document.ready(() => {
  const $navbar = $('.navbar-sparrow');

  if ($navbar.length) {
    const windowHeight = spUtils.$window.height();
    const handleAlpha = () => {
      const scrollTop = spUtils.$window.scrollTop();
      let alpha = (scrollTop / windowHeight) * 2;

      (alpha >= 1) && (alpha = 1);
      $navbar.css({ 'background-color': `rgba(0, 0, 0, ${alpha})` });
    };
    handleAlpha();
    spUtils.$window.scroll(() => handleAlpha());

    // Top navigation background toggle on mobile
    $navbar.on('show.bs.collapse hide.bs.collapse', (e) => {
      $(e.currentTarget).toggleClass('bg-black');
    });
  }
});
