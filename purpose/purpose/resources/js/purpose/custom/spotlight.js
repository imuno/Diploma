//
// Spotlight
//

'use strict';

var Spotlight = (function() {

	// Variables

	var $spotlight = $('[data-spotlight]');


	// Methods

	function init($this) {

		var holderHeight,
			animEndEv = "webkitAnimationEnd animationend";

		if ($this.data('spotlight') == 'fullscreen') {
			if ($this.data('spotlight-offset')) {
				var offsetHeight = $('body').find($this.data('spotlight-offset')).height();
				holderHeight = $(window).height() - offsetHeight;
			} else {
				holderHeight = $(window).height();
			}

			if ($(window).width() > 991) {
				$this.find('.spotlight-holder').css({
					'height': holderHeight + 'px'
				});
			} else {
				$this.find('.spotlight-holder').css({
					'height': 'auto'
				});
			}
		}

		$this.imagesLoaded().done(function(e) {
			$this.find(".animated").each(function() {
				var e = $(this);
				if (!e.hasClass("animation-ended")) {
					var t = e.data("animation-in"),
						a = (e.data("animation-out"), e.data("animation-delay"));
					setTimeout(function() {
						e.addClass("animation-ended " + t, 100).on(animEndEv, function() {
							e.removeClass(t)
						})
					}, a)
				}
			})
		})
	}

	function animate() {

	}

	// Events

	$(window).on({
		'load resize': function() {
			if ($spotlight.length) {
				$spotlight.each(function() {
					init($(this));
				});
			}
		}
	})

})();
