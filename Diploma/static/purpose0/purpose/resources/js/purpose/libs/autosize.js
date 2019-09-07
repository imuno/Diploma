//
// Autosize textarea
//

var TextareaAutosize = (function() {

	// Variables

	var $textarea = $('[data-toggle="autosize"]');


	// Methods

	function init() {
		autosize($textarea);
	}


	// Events

	if ($textarea.length) {
		init();
	}

})();
