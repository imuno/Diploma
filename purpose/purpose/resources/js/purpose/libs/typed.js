//
// Typed
// text typing animation
//

'use strict';

var Typed = (function() {

	// Variables

	var typed = '.typed',
		$typed = $(typed);


	// Methods

	function init($this) {
		var el = '#' + $this.attr('id'),
        	strings = $this.data('type-this'),
			strings = strings.split(',');

		var options = {
			strings: strings,
            typeSpeed: 100,
            backSpeed: 70,
            loop: true
		};

        var animation = new Typed(el, options);

		inView(el).on('enter', function() {
			animation.start();
		}).on('exit', function() {
			animation.stop();
		});
	}


	// Events

	if ($typed.length) {
		$typed.each(function() {
			init($(this));
		});
	}

})();
