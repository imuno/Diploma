//
// pricing.js
// Theme module
//

(function() {
  
  //
  // Variables
  //

  var toggle = document.querySelector('[data-toggle="price"]');
  var DURATION = 1;


  //
  // Functions
  //

  function update(e) {
    var input = e.target;
    var checked = input.checked;

    var target = input.dataset.target;
    var targets = document.querySelectorAll(target);

    [].forEach.call(targets, function(e) {
      var annual = e.dataset.annual;
      var monthly = e.dataset.monthly;

      var countUp = (!checked) ? new CountUp(e, monthly, annual, null, DURATION) : new CountUp(e, annual, monthly, null, DURATION);
      
      if (!countUp.error) {
        countUp.start();
      } else {
        console.error(countUp.error);
      }
    });
  }

  //
  // Events
  //

  if (typeof CountUp !== 'undefined' && toggle) {
    toggle.addEventListener('change', function(e) {
      update(e);
    });
  }

})();