//
// Notify
// init of the bootstrap-notify plugin
//

'use strict';

var Notify = (function() {

	// Variables

	var $notifyBtn = $('[data-toggle="notify"]');


	// Methods

	function notify(placement, align, icon, type, animIn, animOut) {
		$.notify({
			icon: icon,
			title: ' Bootstrap Notify',
			message: 'Turning standard Bootstrap alerts into awesome notifications',
			url: ''
		}, {
			element: 'body',
			type: type,
			allow_dismiss: true,
			placement: {
				from: placement,
				align: align
			},
			offset: {
				x: 15, // Keep this as default
				y: 15 // Unless there'll be alignment issues as this value is targeted in CSS
			},
			spacing: 10,
			z_index: 1080,
			delay: 2500,
			timer: 25000,
			url_target: '_blank',
			mouse_over: false,
			animate: {
				// enter: animIn,
				// exit: animOut
                enter: animIn,
                exit: animOut
			},
			template:   '<div class="alert alert-{0} alert-icon alert-group alert-notify" data-notify="container" role="alert">' +
					  		'<div class="alert-group-prepend align-self-start">' +
					  			'<span class="alert-group-icon"><i data-notify="icon"></i></span>' +
					  		'</div>' +
					  		'<div class="alert-content">' +
								'<strong data-notify="title">{1}</strong>' +
								'<div data-notify="message">{2}</div>' +
							'</div>' +
					  		'<button type="button" class="close" data-notify="dismiss" aria-label="Close">' +
								'<span aria-hidden="true">&times;</span>' +
							'</button>' +
						'</div>'

		});
	}

	// Events

	if ($notifyBtn.length) {
		$notifyBtn.on('click', function(e) {
			e.preventDefault();

			var placement = $(this).attr('data-placement');
			var align = $(this).attr('data-align');
			var icon = $(this).attr('data-icon');
			var type = $(this).attr('data-type');
			var animIn = $(this).attr('data-animation-in');
			var animOut = $(this).attr('data-animation-out');

			notify(placement, align, icon, type, animIn, animOut);
		})
	}

})();
