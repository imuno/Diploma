//
// Swiper
// init of plugin Swiper JS
//

'use strict';

var WpxSwiper = (function() {

	// Variables

	var $swiperContainer = $(".swiper-js-container"),
	 	animEndEv = 'webkitAnimationEnd animationend';


	// Methods

	function init($this) {

		// Swiper elements

        var $el = $this.find('.swiper-container'),
			pagination = $this.find('.swiper-pagination'),
			navNext = $this.find('.swiper-button-next'),
			navPrev = $this.find('.swiper-button-prev');


		// Swiper options

        var effect = $el.data('swiper-effect') ? $el.data('swiper-effect') : 'slide',
        	direction = $el.data('swiper-direction') ? $el.data('swiper-direction') :  'horizontal',
			initialSlide = $el.data('swiper-initial-slide') ? $el.data('swiper-initial-slide') : 0,
			autoHeight = $el.data('swiper-autoheight') ? $el.data('swiper-autoheight') : false,
			autoplay = $el.data('swiper-autoplay') ? $el.data('swiper-autoplay') : false,
			centeredSlides = $el.data('swiper-centered-slides') ? $el.data('swiper-centered-slides') : false,
			paginationType = $el.data('swiper-pagination-type') ? $el.data('swiper-pagination-type') : 'bullets';



		// Items per slide

        var items = $el.data('swiper-items');
        var itemsSm = $el.data('swiper-sm-items');
        var itemsMd = $el.data('swiper-md-items');
        var itemsLg = $el.data('swiper-lg-items');
		var itemsXl = $el.data('swiper-xl-items');


		// Space between items

        var spaceBetween = $el.data('swiper-space-between');
        var spaceBetweenSm = $el.data('swiper-sm-space-between');
        var spaceBetweenMd = $el.data('swiper-md-space-between');
        var spaceBetweenLg = $el.data('swiper-lg-space-between');
		var spaceBetweenXl = $el.data('swiper-xl-space-between');


		// Slides per view written in data attributes for adaptive resoutions

        items = items ? items : 1;
        itemsSm = itemsSm ? itemsSm : items;
		itemsMd = itemsMd ? itemsMd : itemsSm;
        itemsLg = itemsLg ? itemsLg : itemsMd;
        itemsXl = itemsXl ? itemsXl : itemsLg;


        // Space between slides written in data attributes for adaptive resoutions

        spaceBetween = !spaceBetween ? 0 : spaceBetween;
        spaceBetweenSm = !spaceBetweenSm ? spaceBetween : spaceBetweenSm;
        spaceBetweenMd = !spaceBetweenMd ? spaceBetweenSm : spaceBetweenMd;
        spaceBetweenLg = !spaceBetweenLg ? spaceBetweenMd : spaceBetweenLg;
		spaceBetweenXl = !spaceBetweenXl ? spaceBetweenLg : spaceBetweenXl;

		var $swiper = new Swiper($el, {
            pagination: {
                el: pagination,
                clickable: true,
				type: paginationType
            },
            navigation: {
                nextEl: navNext,
                prevEl: navPrev,
            },
            slidesPerView: items,
            spaceBetween: spaceBetween,
            initialSlide: initialSlide,
            autoHeight: autoHeight,
            centeredSlides: centeredSlides,
            mousewheel: false,
			keyboard: {
			    enabled: true,
			    onlyInViewport: false,
			},
            grabCursor: true,
			autoplay: autoplay,
            effect: effect,
            coverflowEffect: {
                rotate: 10,
                stretch: 0,
                depth: 50,
                modifier: 3,
                slideShadows: false
            },
            speed: 800,
            direction: direction,
            preventClicks: true,
            preventClicksPropagation: true,
            observer: true,
            observeParents: true,
			breakpointsInverse: true,
			breakpoints: {
                575: {
                    slidesPerView: itemsSm,
                    spaceBetweenSlides: spaceBetweenSm
                },
                767: {
                    slidesPerView: itemsMd,
                    spaceBetweenSlides: spaceBetweenMd
                },
                991: {
                    slidesPerView: itemsLg,
                    spaceBetweenSlides: spaceBetweenLg
                },
                1199: {
                    slidesPerView: itemsXl,
                    spaceBetweenSlides: spaceBetweenXl
                }
            }
        });
	}


	// Events
	$(document).ready(function() {
		if ($swiperContainer.length) {
			$swiperContainer.each(function(i, swiperContainer) {
				init($(swiperContainer));
			})
		}
	})

})();
