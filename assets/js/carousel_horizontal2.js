$('body').imagesLoaded().always( function( instance ) {
    setTimeout(function(){
 
        // Half slider
        var interleaveOffset = 0.7;
        var halfSliderCaption = new Swiper('.slider__caption', {
            slidesPerView: 1,
            loop: true,
            effect: 'fade',
	        parallax: true,
            speed: 1200,
            simulateTouch: false
        });
			
        var halfSliderImage = new Swiper('.slider__image', {
            slidesPerView: 1,
            loop: true,
			speed: 1200,
            simulateTouch: false,
	        roundLengths: true,
	        parallax: true,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
		        clickable: true
            },
            autoplay: {
                disableOnInteraction: false,
            },
            keyboard: {
	            enabled: true
	        },
            mousewheel: {
		        eventsTarged: '.header-fullscreen',
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
                            innerOffset = swiper.width * interleaveOffset,
                            innerTranslate = slideProgress * innerOffset;					
                        swiper.slides[i].querySelector('.cover-slider').style.transform =
                        'translateX(' + innerTranslate + 'px)';
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
			
        halfSliderCaption.controller.control = halfSliderImage;
        halfSliderImage.controller.control = halfSliderCaption;
		
  }, 2000);
});