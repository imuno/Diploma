//
// Swiper
// init of plugin Swiper JS
//

'use strict';

var Masonry = (function() {

	// Variables

	var $masonryContainer = $(".masonry-container");


	// Methods

	function init($this) {
		var $el = $this.find('.masonry'),
			$filters = $this.find('.masonry-filter-menu'),
			$defaultFilter = $filters.find('.active'),
			defaultFilterValue = $defaultFilter.data('filter');

		var $masonry = $el.imagesLoaded(function() {

			// Set default filter if exists

			if (defaultFilterValue != undefined && defaultFilterValue != '') {

				if (defaultFilterValue != '*') {
					defaultFilterValue = '.' + defaultFilterValue;
				}

				$defaultFilter.addClass('active');
			}


			// Plugin options
			var options = {
				itemSelector: '.masonry-item',
				filter: defaultFilterValue
			};

			// Init plugin
			$masonry.isotope(options);
		});


		// Sorting buttons (filters)

        $filters.on('click', 'a', function(e) {
			e.preventDefault();

			var $this = $(this),
             	val = $(this).attr('data-filter');

            if (val == '*') {
                val = '';
            } else {
                val = '.' + val;
            }

            $masonry.isotope({
                filter: val
            }).on( 'arrangeComplete', function() {
				$filters.find('[data-filter]').removeClass('active');
				$this.addClass('active');
			} );
        });

	}


	// Events

	if ($masonryContainer.length) {
		$masonryContainer.each(function() {
			init($(this));
		})
	}

})();
