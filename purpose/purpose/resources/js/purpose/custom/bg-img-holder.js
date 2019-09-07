//
// Swiper
// init of plugin Swiper JS
//

'use strict';

var BgImgHolder = (function() {

	// Variables

	var $bgImgHolder = $(".bg-img-holder");


	// Methods

	function init($this) {
		var img = $this.children("img").attr("src"),
            position = $this.data('bg-position') ? $this.data('bg-position') : 'initial',
            size = $this.data('bg-size') ? $this.data('bg-size') : 'auto',
            height = $this.data('bg-height') ? $this.data('bg-height') : '100%';

		$this
	        .css("background-image", 'url("'+img+'")')
	        .css("background-position", position)
	        .css("background-size", size)
	        .css("opacity", "1")
	        .css("height", height);
	}


	// Events

	if ($bgImgHolder.length) {
		$bgImgHolder.each(function() {
			init($(this));
		})
	}

})();
