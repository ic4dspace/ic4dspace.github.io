$('body').imagesLoaded().always( function( instance ) {
    setTimeout(function(){
	
        var interleaveOffset = 0.5;
	    var interleaveOffsetCaption = 1;
	
	    // Caption
        var halfSliderCaption = new Swiper('.slider__caption', {
            slidesPerView: 1,
            loop: true,
            effect: 'fade',
	        direction: 'vertical',
	        parallax: true,
            speed: 1500,
            simulateTouch: false
        });
	
	    // Image
        var halfSliderImage = new Swiper('.slider__image', {
            slidesPerView: 1,
            loop: true,
			speed: 1500,
			direction: 'vertical',
            simulateTouch: false,
	        roundLengths: true,
	        parallax: true,
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction',
		        clickable: true
            },
            autoplay: {
                disableOnInteraction: false,
            },
            keyboard: {
	            enabled: true
	        },
            mousewheel: {
		        eventsTarged: '.hero',
		        sensitivity: 1
	        },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            on: {
                progress: function() {
                    var swiper = this;
                    for (var i = 0; i < swiper.slides.length; i++) {
                        var slideProgress = swiper.slides[i].progress,
                            innerOffset = swiper.height * interleaveOffset,
                            innerTranslate = slideProgress * innerOffset;
                            swiper.slides[i].querySelector('.cover-slider').style.transform =
                            'translateY(' + innerTranslate + 'px)';
                        }
                },
                touchStart: function() {
                    var swiper = this;
                    for (var i = 0; i < swiper.slides.length; i++) {
                        swiper.slides[i].style.transition = '';
                    }
                },
                setTransition: function(speed) {
                    var swiper = this;
                    for (var i = 0; i < swiper.slides.length; i++) {
                        swiper.slides[i].style.transition = speed + 'ms';
                        swiper.slides[i].querySelector('.cover-slider').style.transition =
                        speed + 'ms';
                    }
                }
            }
        });
    
	    // Details
        var halfSliderDetails = new Swiper('.slider-container-details', {
            slidesPerView: 1,
            loop: true,
            effect: 'fade',
	        parallax: true,
            speed: 1500,
            simulateTouch: false
        });
		
		// halfSliderCaption and halfSliderImage 
        halfSliderCaption.controller.control = halfSliderImage;
        halfSliderImage.controller.control = halfSliderCaption;

        // halfSliderImage and halfSliderDetails 
        halfSliderImage.controller.control = halfSliderDetails;
        halfSliderDetails.controller.control = halfSliderImage;
		
        // halfSliderCaption and halfSliderDetails 
        halfSliderCaption.controller.control = halfSliderDetails;
        halfSliderDetails.controller.control = halfSliderCaption;
	
    }, 2500);
});