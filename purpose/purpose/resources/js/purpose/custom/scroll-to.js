//
// Scroll to (anchor links)
//

'use strict';

var ScrollTo = (function() {

	//
	// Variables
	//

	var $scrollTo = $('.scroll-me, [data-scroll-to], .toc-entry a'),
		urlHash = window.location.hash;


	//
	// Methods
	//

	function init(hash) {
		$('html, body').animate({
	        scrollTop: $(hash).offset().top
	    }, 'slow');
	}

	function scrollTo($this) {
		var $el = $this.attr('href');
        var offset = $this.data('scroll-to-offset') ? $this.data('scroll-to-offset') : 0;
		var options = {
			scrollTop: $($el).offset().top - offset
		};

        // Animate scroll to the selected section
        $('html, body').stop(true, true).animate(options, 600);

        event.preventDefault();
	}


	//
	// Events
	//

	if ($scrollTo.length) {
		// Init scroll on click
		$scrollTo.on('click', function(event) {
			scrollTo($(this));
		});
	}

	$(window).on("load", function () {
		// Init scroll on page load if a hash is present
		if(urlHash && urlHash != '#!' && $(urlHash).length) {
			init(urlHash)
		}
	});
})();
