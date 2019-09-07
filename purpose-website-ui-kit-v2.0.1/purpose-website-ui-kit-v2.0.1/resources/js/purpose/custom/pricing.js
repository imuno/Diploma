//
// Pricing
//

'use strict';


var Pricing = (function() {

	// Variables

	var $pricingContainer = $('.pricing-container'),
		$btn = $('.pricing-container button[data-pricing]');


	// Methods

	function init($this) {
        var a = $this.data('pricing'),
            b = $this.parents('.pricing-container'),
            c = $('.'+b.attr('class')+' [data-pricing-value]');


        if(!$this.hasClass('active')) {
            // Toggle active classes for monthly/yearly buttons
            $('.'+b.attr('class')+' button[data-pricing]').removeClass('active');
            $this.addClass('active');

            // Change price values
            c.each(function() {
                var new_val = $(this).data('pricing-value');
                var old_val = $(this).find('span.price').text();

                $(this).find('span.price').text(new_val);
                $(this).data('pricing-value', old_val);
            });
        }
	}


	// Events

	if ($pricingContainer.length) {
		$btn.on({
    		'click': function() {
    			init($(this));
    		}
    	})
	}

})();
