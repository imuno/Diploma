//
// Sticky
//

'use strict';

var Sticky = (function() {

	//
	// Variables
	//

	var $sticky = $('[data-toggle="sticky"]');


	//
	// Methods
	//

	function init($this) {

		var offset = $this.data('sticky-offset') ? $this.data('sticky-offset') : 0;
		var options = {
			'offset_top': offset
		};

		if($(window).width() > 1000) {
			$this.stick_in_parent(options);
		} else {
			$this.trigger("sticky_kit:detach");
		}
	}


	//
	// Events
	//

	$(window).on('load resize', function() {
		if ($sticky.length) {

			// Init selects
			$sticky.each(function() {
				init($(this));
			});
		}
	})


})();
