// page init
jQuery(function(){

	initAccordion();

});

// accordion init
function initAccordion() {
	jQuery('ul.simple-accordion').slideAccordion({
		opener:'>a.opener',
		slider:'>div.slide',
		collapsible:false,
		animSpeed: 300
	});
	jQuery('ul.multilevel-accordion').slideAccordion({
		opener:'>a.opener',
		slider:'>div.slide',
		collapsible:true,
		animSpeed: 300
	});
}

/*
 * jQuery Accordion plugin
 */
;(function($){

	$.fn.slideAccordion = function(opt){

		// default options
		var options = $.extend({
			addClassBeforeAnimation: false,
			activeClass:'active',
			opener:'.opener',
			slider:'.slide',
			animSpeed: 300,
			collapsible:true,
			event:'click'
		},opt);


		return this.each(function(){

			// options
			var accordion = $(this);
			var items = accordion.find(':has('+options.slider+')');

			var allowOpen = false;

			items.each(function(){
				var item = $(this);
				var opener = item.find(options.opener);
				var slider = item.find(options.slider);


				opener.bind(options.event, function(e){


					if(customerInfoFlag && paymentInfoFlag && addressInfoFlag)
					{
						$('#submitOrder').show();
					}
					else
					{
						$('#submitOrder').hide();
					}



					var id = opener.attr("id");

					if (id == "personalInfoOpener") {


						if(userObject.name != "") {

							$("#name_text").val(userObject.name);

						}

						if(userObject.email != "") {

							$("#email_text").val(userObject.email);

						}

						if(userObject.contact != "")
						{
							$("#contact_text").val(userObject.contact);
						}


						$("#email").removeClass("error");
						$("#name").removeClass("error");
						$("#contact").removeClass("error");
						$("#error-name").html('');
						$("#error-email").html('');
						$("#error-contact").html('');

						allowOpen = true;
					}
					else if (id == "addressOpener" && customerInfoFlag ) {


						if (!userObject.pickFromRestaurant) {

							$('#checkbox-id-23').prop('checked', true);
							$('#checkbox-id-12').prop('checked', false);
							$('#deliveryFieldsParent').addClass('show');


							if (userObject.deliveryAddress != "") {

								$("#address").val(userObject.deliveryAddress);
							}

							if (userObject.deliveryAptNo != "")
							{
								$("#appt-no").val(userObject.deliveryAptNo);

							}


							$("#appt-no").removeClass("error");
							$("#address").removeClass("error");
							$("#area").removeClass("error");
							$("#error-appt-no").hide();
							$("#error-address").hide();
							$("#error-area").hide();
						}
						else {

							$('#checkbox-id-12').prop('checked', true);
							$('#checkbox-id-23').prop('checked', false);
							$('#deliveryFieldsParent').removeClass('show');

						}

						allowOpen = true;

					}
					else if (id == "paymentOpener" && addressInfoFlag && customerInfoFlag) {

						$('#coupon').removeClass('error');
						$("#error-coupon").html("");
						$(".payment-errors").html("");

						if ($('#checkbox-id-13').is(":checked")) {

							$('#checkbox-id-13').prop('checked', true);
							$('#checkbox-id-24').prop('checked', false);
							$('#show_credit_card').removeClass('show');
						}

						if ($('#checkbox-id-24').is(":checked")) {

							$('#checkbox-id-13').prop('checked', false);
							$('#checkbox-id-24').prop('checked', true);
							$('#show_credit_card').addClass('show');
						}

						allowOpen = true;
					}


					if(allowOpen) {

						if (!slider.is(':animated')) {

							if (item.hasClass(options.activeClass)) {

								if (options.collapsible) {

									slider.slideUp(options.animSpeed, function () {
										hideSlide(slider);
										item.removeClass(options.activeClass);
									});
								}
							}
							else {
								// show active
								var levelItems = item.siblings('.' + options.activeClass);
								var sliderElements = levelItems.find(options.slider);
								item.addClass(options.activeClass);
								showSlide(slider).hide().slideDown(options.animSpeed);


								// collapse others
								sliderElements.slideUp(options.animSpeed, function () {
									levelItems.removeClass(options.activeClass);
									hideSlide(sliderElements);
								});

							}
						}

					}


					e.preventDefault();

				});



				if(item.hasClass(options.activeClass)) showSlide(slider); else hideSlide(slider);
			});
		});
	};


	// accordion slide visibility
	var showSlide = function(slide) {
		return slide.css({position:'', top: '', left: '', width: '' });
	};

	var hideSlide = function(slide) {
		return slide.show().css({position:'absolute', top: -9999, left: -9999, width: slide.width() });
	};


}(jQuery));