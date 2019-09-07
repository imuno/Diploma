//
// smooth-scroll.js
// Theme module
//

'use strict';

(function() {

  //
  // Variables
  //

  var toggle = '[data-toggle="smooth-scroll"]';


  //
  // Functions
  //

  function init(toggle) {
    var options = {
      header: '.navbar.fixed-top',
      offset: '24'
    };

    // Init
    new SmoothScroll(toggle, options);
  }


  //
  // Events
  //

  if (typeof SmoothScroll !== 'undefined' && toggle) {
    init(toggle);
  }

})();