//
// Shape
// extending the functionality of the shape utility classes from purpose/utitlies/_shape.scss
//


'use strict';

var Shape = (function() {

	// Variables

	var $shape = $('.shape-container');


	// Methods

	function init($this) {

		var svgHeight = $this.find('svg').height();
		// alert(svgHeight)
		$this.css({
			'height': svgHeight + 'px'
		});

	}


	// Events

	$(window).on({
		'load resize': function() {
			if ($shape.length) {
				$shape.each(function() {
					init($(this));
				});
			}
		}
	})

})();
