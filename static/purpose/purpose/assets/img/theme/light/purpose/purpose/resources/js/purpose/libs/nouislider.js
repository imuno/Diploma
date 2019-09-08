//
// No Ui Slider
//

'use strict';


//
// Single slider
//

var SingleSlider = (function() {

	// Variables

	var $sliderContainer = $(".input-slider-container");


	// Methods

	function init($this) {
		var $slider = $this.find('.input-slider');
		var sliderId = $slider.attr('id');
		var minValue = $slider.data('range-value-min');
		var maxValue = $slider.data('range-value-max');

		var sliderValue = $this.find('.range-slider-value');
		var sliderValueId = sliderValue.attr('id');
		var startValue = sliderValue.data('range-value-low');

		var c = document.getElementById(sliderId),
			d = document.getElementById(sliderValueId);

		var options = {
			start: [parseInt(startValue)],
			connect: [true, false],
			//step: 1000,
			range: {
				'min': [parseInt(minValue)],
				'max': [parseInt(maxValue)]
			}
		}

		noUiSlider.create(c, options);

		c.noUiSlider.on('update', function(a, b) {
			d.textContent = a[b];
		});
	}


	// Events

	if ($sliderContainer.length) {
		$sliderContainer.each(function() {
			init($(this));
		});
	}

})();


//
// Range slider
//

var RangeSlider = (function() {

	// Variables

	var $sliderContainer = $("#input-slider-range");


	// Methods

	function init($this) {
		var c = document.getElementById("input-slider-range"),
            d = document.getElementById("input-slider-range-value-low"),
            e = document.getElementById("input-slider-range-value-high"),
            f = [d, e];

        noUiSlider.create(c, {
            start: [parseInt(d.getAttribute('data-range-value-low')), parseInt(e.getAttribute('data-range-value-high'))],
            connect: !0,
            range: {
                min: parseInt(c.getAttribute('data-range-value-min')),
                max: parseInt(c.getAttribute('data-range-value-max'))
            }
        }), c.noUiSlider.on("update", function(a, b) {
            f[b].textContent = a[b]
        })
	}


	// Events

	if ($sliderContainer.length) {
		$sliderContainer.each(function() {
			init($(this));
		});
	}

})();
