'use strict';

import spUtils from './Utils';

// /*-----------------------------------------------
// |   On page scroll for #id targets
// -----------------------------------------------*/
// spUtils.$document.ready(($) => {
//   $('a[data-fancyscroll]').click(function scrollTo(e) {
//     // const $this = $(e.currentTarget);
//     e.preventDefault();
//     const $this = $(this);
//     if (spUtils.location.pathname.replace(/^\//, '')
// === this.pathname.replace(/^\//, '') && spUtils.location.hostname === this.hostname) {
//       let target = $(this.hash);
//       target = target.length ? target : $(`[name=${this.hash.slice(1)}]`);
//       if (target.length) {
//         $('html,body').animate({
//           scrollTop: (target.offset().top - ($this.data('offset') || 0)),
//         }, 400, 'swing', () => {
//           const hash = $this.attr('href');
//           window.history.pushState ?
//             window.history.pushState(null, null, hash) : window.location.hash = hash;
//         });
//         return false;
//       }
//     }
//     return true;
//   });
// });

/*-----------------------------------------------
|   On page scroll for #id targets
-----------------------------------------------*/
spUtils.$document.ready(($) => {
  $('a[data-fancyscroll]').click(function scrollTo(e) {
    // const $this = $(e.currentTarget);
    const $this = $(this);
    if (spUtils.location.pathname === $this[0].pathname &&
      spUtils.location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
      spUtils.location.hostname === this.hostname) {
      e.preventDefault();
      let target = $(this.hash);
      target = target.length ? target : $(`[name=${this.hash.slice(1)}]`);
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - ($this.data('offset') || 0)),
        }, 400, 'swing', () => {
          const hash = $this.attr('href');
          window.history.pushState ?
            window.history.pushState(null, null, hash) : window.location.hash = hash;
        });
        return false;
      }
    }
    return true;
  });

  const { hash } = window.location;

  if (hash && document.getElementById(hash.slice(1))) {
    const $this = $(hash);
    $('html, body').animate({
      scrollTop: $this.offset().top - $(`a[href='${hash}']`).data('offset'),
    }, 400, 'swing', () => {
      window.history.pushState ?
        window.history.pushState(null, null, hash) : window.location.hash = hash;
    });
  }
});
