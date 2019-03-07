/*
 * Author: ArtStyles (ArtTemplate)
 * Template Name: ARTEM
 * Version: 1.5.4
*/

'use strict';
$(document).ready(function() {

    /*-----------------------------------------------------------------
      Detect device mobile
    -------------------------------------------------------------------*/
	
    var isMobile = false; 
    if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('html').addClass('touch');
        isMobile = true;
	
    }
    else {
        $('html').addClass('no-touch');
        isMobile = false;
    }

  
    /*-----------------------------------------------------------------
      Preloader
    -------------------------------------------------------------------*/
    
    var e = 0,
        b = $('body, .bg').length,
        t = 0;
	
    $('body, .bg').imagesLoaded({ background: !0 }).always(function(e) {
        setTimeout(function(){
            $('.loading').addClass('fadeOut2');
            $('body').removeClass('preload');
        }, 3000);
    }).progress(function(a, i) {
        var n = 100 * (t = ++e / b);
        $('.progress-bar').css('width', n + '%')
    });


    /*-----------------------------------------------------------------
      Smooth scroll
    -------------------------------------------------------------------*/
	
    $('body').easeScroll({
        frameRate: 60,
        animationTime: 1500,
        stepSize: 120,
        pulseAlgorithm: !0,
        pulseScale: 8,
        pulseNormalize: 1,
        accelerationDelta: 20,
        accelerationMax: 1,
        keyboardSupport: !0,
        arrowScroll: 50
    });


    /*-----------------------------------------------------------------
      Hamburger
    -------------------------------------------------------------------*/

    $('.hamburger').on('click', function() {
        $(this).toggleClass('is-active');
        $('html').toggleClass('is-scroll-disabled');
	    $('body').toggleClass('open');
	    $('.menu').toggleClass('menu-show');
        $('.ef-background').addClass('animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
        function(){
            $(this).removeClass('animated');
        });
    });

    // Closing the menu by Esc
    $(document).on('keyup', function(e) {
        if (e.keyCode === 27) $('.open .hamburger').click();
    });

    // Hovered link
    $('.menu-list__item').on('mouseenter', function(){
        $('.menu-list').addClass('has-hovered-link');
    });
    $('.menu-list__item').on('mouseleave', function(){
        $('.menu-list').removeClass('has-hovered-link');
    });
  
  
    /*-----------------------------------------------------------------
      Toggle Navbar
    -------------------------------------------------------------------*/
  
    $(window).on('scroll', function() {
	    $('.navbar-change').each(function(index, value) {
            var navToggle = $('#start').offset().top;

            if ($(window).scrollTop() >= navToggle){
                $('.navbar').removeClass('navbar--white');
            } else {
                $('.navbar').addClass('navbar--white');
            }
        });
    });


    /*-----------------------------------------------------------------
      Side Nav
    -------------------------------------------------------------------*/
  
    var sideNavOpen = $('.hamburger');
    var tl = new TimelineMax({paused:true, reversed:true});

    $('.sideNav').each(function(i) {
        tl.timeScale(1);
        tl.to('.overlay-sideNav', 0.3, { opacity:1, zIndex:2, visibility:'visible' })

        .to('.sideNav', 0.5, {
            x: 0,
            ease: Power2.easeInOut
        },'-=0.5')

        .staggerFrom('.sideNav__item', 0.2, {
            opacity: 0,
            x: 70,
            ease: Back.easeOut
        },0.06, '-=0.18');
    });  
  
    $(sideNavOpen).on('click', function() {
        tl.reversed() ? tl.play() : tl.reverse();	
    });
  
    // Sub items
    $('.sideNav-collapsed').on('click', function() {
        $(this).toggleClass('sideNav__item-open').parent('li').siblings('li').children('span.sideNav-collapsed').removeClass('sideNav__item-open');
        $(this).parent().toggleClass('sideNav__item-open').children('ul').slideToggle(500).end().siblings('.sideNav__item-open').removeClass('sideNav__item-open').children('ul').slideUp(500);
    });
  
  
    /*-----------------------------------------------------------------
      Cursor
    -------------------------------------------------------------------*/
  
    var $circleCursor = $('.cursor');

    function moveCursor(e) {
	    var t = e.clientX + "px",
            n = e.clientY + "px";
			
	    TweenMax.to($circleCursor, .2, {
            left: t,
            top: n,
	        ease: 'Power1.easeOut'
        });
    }
    $(window).on('mousemove', moveCursor);
  
    // simple zoom
    function zoomCursor(e) {
	    TweenMax.to($circleCursor, .1, {
	        scale: 4,
	        ease: 'Power1.easeOut'
        });
		$($circleCursor).removeClass('cursor-close');
    }  
    $('a, .zoom-cursor').on('mouseenter', zoomCursor);
  
    // close
    function closeCursor(e) {
	    TweenMax.to($circleCursor, .1, {
	        scale: 4,
	        ease: 'Power1.easeOut'
        });
		$($circleCursor).addClass('cursor-close');
    }  
    $('.trigger-close').on('mouseenter', closeCursor);  

    // default
    function defaultCursor(e) {
	    TweenLite.to($circleCursor, .1, {
	        scale: 1,
	        ease: 'Power1.easeOut'
        });
		$($circleCursor).removeClass('cursor-close');
    }
  
    $('a, .zoom-cursor, .trigger-close, .trigger-plus').on('mouseleave', defaultCursor);

  
    /*-----------------------------------------------------------------
      Scroll indicator
    -------------------------------------------------------------------*/
  
    $(window).on('scroll', function() {
        var wintop = $(window).scrollTop(), docheight = 
        $(document).height(), winheight = $(window).height();
 	    var scrolled = (wintop/(docheight-winheight))*100;
  	    $('.scroll-line').css('width', (scrolled + '%'));
    });


    /*-----------------------------------------------------------------
      Slider
    -------------------------------------------------------------------*/

    $('.cover-slider').each(function() {
        $(this).css('background-image', 'url('+$(this).data('bg')+')');
    });
 
    // Slider project
    var interleaveOffsetArticle = 0.7;
    var halfSliderImage = new Swiper('.slider-article', {
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
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },

        on: {
            progress: function() {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slideProgress = swiper.slides[i].progress,
                        innerOffset = swiper.width * interleaveOffsetArticle,
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

  
    // Projects carousel
    var swiper = new Swiper('.projects-carousel', {
		loop: true,
        slidesPerView: 'auto',
        spaceBetween: 140,
        centeredSlides: true,
		speed: 900,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
			type: 'progressbar',
        },		
		keyboard: {
	        enabled: true
	    },
        mousewheel: {
		    eventsTarged: '.grid-carousel',
		    sensitivity: 1
	    },
		breakpoints: {
		    0: {
                spaceBetween: 0
            },
			580: {
				spaceBetween: 0
			},
			768: {
				spaceBetween: 40
			},
			990: {
				spaceBetween: 80
			},
			1200: {
				spaceBetween: 100
			},
			1500: {
				spaceBetween: 120
			}			
        }
    });
	
	
    /*-----------------------------------------------------------------
      Style background image
    -------------------------------------------------------------------*/	
  
    $('.js-image').each(function(){
        var dataImage = $(this).attr('data-image');
        $(this).css('background-image', 'url(' + dataImage + ')');
    });
		

    /*-----------------------------------------------------------------
      Start video
    -------------------------------------------------------------------*/
  
    function videoPlay($wrapper) {
        var $iframe = $wrapper.find('.js-video-iframe'),
        src = $iframe.data('src');
        $wrapper.addClass('is-active'),
	    $iframe.attr('src', src)
    }
    $(document).on('click', '.video__btn', function(e) {
        e.preventDefault();
        var $btn = $(this),
        $wrapper = $btn.closest('.js-video');
        $btn.addClass('is-active'), videoPlay($wrapper)
    });

		
    /*-----------------------------------------------------------------
	  Input
    -------------------------------------------------------------------*/

    $(".js-focus").on('focus',function(){
        $(this).parent().addClass("is-completed");
    });

    $(".js-focus").on('focusout',function(){
        if($(this).val() === "")
        $(this).parent().removeClass("is-completed");
    });
  
	
    /*-----------------------------------------------------------------
      Autoresize textarea
    -------------------------------------------------------------------*/	

    $('textarea').each(function(){
        autosize(this);
    });


    /*-----------------------------------------------------------------
      Switch categories & Filter mobile
    -------------------------------------------------------------------*/	
  
    $('.select').on('click','.placeholder',function(){
      var parent = $(this).closest('.select');
      if ( ! parent.hasClass('is-open')){
          parent.addClass('is-open');
          $('.select.is-open').not(parent).removeClass('is-open');
      }else{
          parent.removeClass('is-open');
      }
    }).on('click','ul>li',function(){
        var parent = $(this).closest('.select');
        parent.removeClass('is-open').find('.placeholder').text( $(this).text() );
        parent.find('input[type=hidden]').attr('value', $(this).attr('data-value') );
	
	    $('.filters__item').removeClass('active');
	    $(this).addClass('active');
	    var selector = $(this).attr('data-filter');
	    $('.masonry, .fitGrid').isotope({
	        filter: selector
	    });
	    return false;	
    });

  
    /*-----------------------------------------------------------------
      Masonry
    -------------------------------------------------------------------*/
  
    var $masonryGrid=$('.masonry').isotope({
        itemSelector: '.item-masonry',
        percentPosition: true,
	    transitionDuration: '0.5s',
        hiddenStyle: {
            opacity: 0,
            transform: 'scale(0.001)'
        },
        visibleStyle: {
            opacity: 1,
            transform: 'scale(1)'
        },	
        masonry: {
	        columnWidth: '.item-masonry',
            gutter: '.gutter-sizer',
            isAnimated: true
        }
    });
  
    $masonryGrid.imagesLoaded().progress( function() {
        $masonryGrid.masonry ({
	        columnWidth: '.item-masonry',
            gutter: '.gutter-sizer',
            isAnimated: true
	    });
    });
 
    // fitGrid
    var $fitGrid=$('.fitGrid').isotope({
        itemSelector: '.item-news',
	    layoutMode: 'fitRows',
        percentPosition: true,
	    transitionDuration: '0.5s',
        hiddenStyle: {
            opacity: 0,
            transform: 'scale(0.001)'
        },
        visibleStyle: {
            opacity: 1,
            transform: 'scale(1)'
        },
        fitRows: {
            gutter: '.gutter-sizer'
        },	
        masonry: {
	        columnWidth: '.item-news',
            gutter: '.gutter-sizer',
            isAnimated: true
        }
    });
  
    $fitGrid.imagesLoaded().progress( function() {
        $fitGrid.isotope ({
	        columnWidth: '.item-news',
            gutter: '.gutter-sizer',
            isAnimated: true,
	        layoutMode: 'fitRows',
            fitRows: {
                gutter: '.gutter-sizer'
            }  	  
	    });
    });  


	/*-----------------------------------------------------------------
	  PhotoSwipe
	-------------------------------------------------------------------*/

    var initPhotoSwipeFromDOM = function(gallerySelector) {
        var parseThumbnailElements = function(el) {
            var thumbElements = el.childNodes,
                numNodes = thumbElements.length,
                items = [],
                childElements,
                thumbnailEl,
                size,
                item;

            for(var i = 0; i < numNodes; i++) {
                el = thumbElements[i];
				
                if(el.nodeType !== 1) {
                    continue;
                }
				
                childElements = el.children;

                size = el.getAttribute('data-size').split('x');
				
                item = {
                    src: el.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10)
                };
				
                item.el = el;
				
                if(childElements.length > 0) {
                    item.msrc = childElements[0].getAttribute('src');
                    if(childElements.length > 1) {
                        item.title = childElements[1].innerHTML;
                    }
                }

                items.push(item);
            }
            return items;
        };

        var closest = function closest(el, fn) {
            return el && (fn(el) ? el : closest(el.parentNode, fn));
        };
		
        var onThumbnailsClick = function(e) {
            e = e || window.event;
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);

            var eTarget = e.target || e.srcElement;

            // find root element of slide
            var clickedListItem = closest(eTarget, function(el) {
                return el.tagName && el.tagName.toUpperCase() === "A";
            });
		
            if (!clickedListItem) {
                return;
            }

            // find index of clicked item by looping through all child nodes
            var clickedGallery = clickedListItem.parentNode,
                childNodes = clickedListItem.parentNode.childNodes,
                numChildNodes = childNodes.length,
                nodeIndex = 0,
                index;
		
            for (var i = 0; i < numChildNodes; i++) {
                if (childNodes[i].nodeType !== 1) {
                    continue;
                }

                if (childNodes[i] === clickedListItem) {
                    index = nodeIndex;
                    break;
                }
                nodeIndex++;
            }	
		
            if (index >= 0) {
                // open PhotoSwipe if valid index found
                openPhotoSwipe(index, clickedGallery);
            }
            return false;
        };

        var photoswipeParseHash = function() {
            var hash = window.location.hash.substring(1),
                params = {};

            if(hash.length < 5) {
                return params;
            }
			
            var vars = hash.split('&');
            for (var i = 0; i < vars.length; i++) {
                if(!vars[i]) {
                    continue;
                }
                var pair = vars[i].split('=');  
                if(pair.length < 2) {
                    continue;
                }           
                params[pair[0]] = pair[1];
            }
            if(params.gid) {
                params.gid = parseInt(params.gid, 10);
            }
            return params;
        };

        var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
            var pswpElement = document.querySelectorAll('.pswp')[0],
                gallery,
                options,
                items;

            items = parseThumbnailElements(galleryElement);
            options = {
                // Buttons/elements
                captionEl: false,
                closeEl: false,
                arrowEl: false,
                fullscreenEl: false,
                shareEl: false,
                counterEl: false,
                zoomEl: false,
                maxSpreadZoom: 1,
				barsSize: { top: 40, bottom: 40, left: 40, right: 40 },
                closeElClasses: [
                    "item",
                    "caption",
                    "zoom-wrap",
                    "ui",
                    "top-bar",
                    "img"
                ],
                // define gallery index (for URL)
				galleryUID: 0,
                //galleryUID: galleryElement.getAttribute("data-pswp-uid"),
                getDoubleTapZoom: function(isMouseClick, item) {
                    return item.initialZoomLevel;
                },
                pinchToClose: false,

                getThumbBoundsFn: function(index) {
                    // See Options -> getThumbBoundsFn section of documentation for more info
                    var thumbnail = items[index].el.getElementsByTagName("img")[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();
                    return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
                }
            };
			
            if (fromURL) {
                if (options.galleryPIDs) {
                    for (var j = 0; j < items.length; j++) {
                        if (items[j].pid == index) {
                            options.index = j;
                            break;
                        }
                    }
                } else {
                    // in URL indexes start from 1
                    options.index = parseInt(index, 10) - 1;
                }
            } else {
                options.index = parseInt(index, 10);
            }

            // exit if index not found
            if (isNaN(options.index)) {
                return;
            }

            if (disableAnimation) {
                options.showAnimationDuration = 0;
            }

            gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
			
            gallery.listen("unbindEvents", function() {
                // This is index of current photoswipe slide
                var getCurrentIndex = gallery.getCurrentIndex();
            });
        };

        var galleryElements = document.querySelectorAll(gallerySelector);

        for(var i = 0, l = galleryElements.length; i < l; i++) {
            galleryElements[i].setAttribute('data-pswp-uid', i+1);
            galleryElements[i].onclick = onThumbnailsClick;
        }

        var hashData = photoswipeParseHash();
        if(hashData.pid && hashData.gid) {
            openPhotoSwipe( hashData.pid,  galleryElements[ hashData.gid - 1 ], true, true );
        }
    };

    initPhotoSwipeFromDOM('.gallery');

	
    /*-----------------------------------------------------------------
      Animations
    -------------------------------------------------------------------*/

    $('body').imagesLoaded().always( function( instance ) {
        setTimeout(function(){
	        // init ScrollMagic
            var ctrl = new ScrollMagic.Controller(); 
            var $split = $('.js-lines'); 
	
            // Text wave for slider
            function textWave(){
                if($(".js-text-wave").length){
                    $(".js-text-wave").each(function(){
                        if(!$(this).hasClass("complete")){
                            $(this).addClass("complete");
		                    var textChange = $(this).html().replace("<br />", "~"),
		                        textChange = textChange.replace("<br>", "~"),
                                textChange = $(this).html(),
                                textArray = textChange.split(""), //  /\r?\n/
                                textDone = "",
                                num;
                            for (var i = 0; i < textArray.length; i++) {
                                if(textArray[i] == " "){
                                    textDone += " ";
                                } else if(textArray[i] == "~"){
                                    textDone += "<br />";
                                } else{
                                    textDone += '<div><span style="transition-delay: '+(i/30)+'s;">'+textArray[i]+'</span></div>';
                                }
                            }
                            $(this).html(textDone);
                        }
                    });
                }
            }	
            textWave();	

	        //splitWords Load
	        var $splitWords = $('.js-words').length;

	        if($splitWords){
	            var $splitWords = new SplitText('.js-words', {type: 'chars, words'});
	            var tweenWords = new TimelineMax();
                tweenWords.add([
                    TweenMax.staggerFrom($splitWords.chars, 0.3, {
                        y: 60,
                        opacity: 0,
			            delay: .3,
                        ease: 'Power2.easeOut'
                    }, 0.05),
                    TweenMax.staggerTo($splitWords.chars, 0.3, {
                        y: 0,
                        opacity: 1,
			            delay: .3,
                        ease: 'Power2.easeOut'
                    }, 0.05)
                ]);
	        }

	        //splitLines Load
	        var $splitLoad = $('.js-lines-l');
	  
            $('.js-lines-l').each(function(i) {
	             var splitoneL = new SplitText($splitLoad[i], {type: 'lines'});
                 var tweenLine = new TimelineMax({
	                delay: .6
	            });
                if (!isMobile) {
                    tweenLine.staggerFrom(splitoneL.lines, .6, {
                        yPercent: 100,
                        opacity: 0,
	                    ease: 'Circ.easeOut'
                    }, 0.2);
                }
            });
	  
	        //DownUp Load
            $('.js-down').each(function() {
                var tweenDown = new TimelineMax({
		            delay: .6,
	            });
                if (!isMobile) {
                    tweenDown.from(this, .6, {
                        yPercent: 100,
			            opacity: 0,
	                    ease: 'Circ.easeOut'
                    }, 0.2);
                }
            });
	  
            // Reveal
            var steps = document.querySelectorAll('.reveal');

            $.each(steps, function(index, step){
		        if (!isMobile) {
                    new ScrollMagic.Scene({
                        triggerElement: step,
		                triggerHook: 'onEnter',
	                    reverse: false
                    })
                    .setClassToggle(step, 'animated')
                    .addTo(ctrl);
		        }
	        });

	        //Scale Load
            $('.js-scale').each(function() {
                var tweenScale = new TimelineMax();
                if (!isMobile) {
                    tweenScale.from(this, .6, {
                        scale: 1.2,
			            opacity: 0,
	                    ease: 'Circ.easeOut'
                    });
                }
            });
	  
            // Animation text line
            $('.js-lines').each(function(i) {
	            var splitone = new SplitText($split[i], {type: 'lines'});
                var tweenLine = new TimelineMax({
		            delay: .6,
	            });
                if (!isMobile) {
                    tweenLine.staggerFrom(splitone.lines, .6, {
                        y: 50,
                        opacity: 0,
	                    ease: 'Circ.easeOut'
                    }, 0.2);
                }
                new ScrollMagic.Scene({
                    triggerElement: this,
	                triggerHook: 'onEnter',
	                reverse: false
                })
                .setTween(tweenLine)
                .addTo(ctrl);
            });

            // Animation DownUp
            $('.js-block').each(function() {
                var tweenBlock = new TimelineMax();
                if (!isMobile) {
                    tweenBlock.from(this, .6, {
                        y: 50,
                        opacity: 0,
                        delay: .6,
	                    ease: 'Circ.easeOut'
                    });
                }
                new ScrollMagic.Scene({
                    triggerElement: this,
	                triggerHook: 'onEnter',
	                reverse: false
                })
                .setTween(tweenBlock)
                .addTo(ctrl);
            });

            // Animation opacity
            $('.js-opacity').each(function() {
                var tweenOpacity = new TimelineMax();
                if (!isMobile) {
                    tweenOpacity.to(this, .6, {
                        y: 50,
                        opacity: 0,
	                    ease: 'Power2.easeOut'
                    });
                }
                new ScrollMagic.Scene({
                    triggerElement: this,
	                triggerHook: 'onLeave',
	                duration: '100%'
                })
                .setTween(tweenOpacity)
                .addTo(ctrl);
            });
  
        }, 3000);
    });  


    /*-----------------------------------------------------------------
      Jarallax
    -------------------------------------------------------------------*/		

    $('.jarallax').jarallax({
        speed: 0.8,
        type: 'scroll'
    });

    $('.jarallaxVideo').jarallax({
        disableVideo: /iPad|iPhone|iPod|Android/
    });


    /*-----------------------------------------------------------------
	  Video
    -------------------------------------------------------------------*/

    var isPlaying = $('#video').length;

    if(isPlaying){
        videojs('#video', {
            controlBar: {
                timeDivider: false,
                fullscreenToggle: false,
                playToggle: false,
                remainingTimeDisplay: false
            }
        });
    }


    /*-----------------------------------------------------------------
	  mediumZoom
    -------------------------------------------------------------------*/
  
    mediumZoom($('[data-zoomable]').toArray())
  
  
    /*-----------------------------------------------------------------
	  Anchor scroll
    -------------------------------------------------------------------*/	
	
    $('a[href^="!#"]').on('click',function (e) {
        e.preventDefault();
        var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });


    /*-----------------------------------------------------------------
      Polyfill object-fit
    -------------------------------------------------------------------*/	
	
    var $someImages = $('img.cover');
    objectFitImages($someImages);


    /*-----------------------------------------------------------------
      Parallax mouse
    -------------------------------------------------------------------*/

	var timeout;
    $('.parallax-container').mousemove(function(e){
        if(timeout) clearTimeout(timeout);
            setTimeout(callParallax.bind(null, e), 200);
  
    });

    function callParallax(e){
        parallaxIt(e, '.error-page', -30);
    }

    function parallaxIt(e, target, movement){
		if (!isMobile) {
            var $this = $('.parallax-container'),
                relX = e.pageX - $this.offset().left,
                relY = e.pageY - $this.offset().top;
  
            TweenMax.to(target, 1, {
                x: (relX - $this.width()/2) / $this.width() * movement,
                y: (relY - $this.height()/2) / $this.height() * movement,
                ease: Power2.easeOut
            })
		}
    }


    /*-----------------------------------------------------------------
	  Subscribe form
    -------------------------------------------------------------------*/
  
    $(".newsletter-form").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formErrorSub();
            submitMSGSub(false, "Please enter your email correctly.");
        } else {
            // everything looks good!
            event.preventDefault();
        }
    });

    function callbackFunction (resp) {
        if (resp.result === "success") {
            formSuccessSub();
        }
        else {
            formErrorSub();
        }
    }

    function formSuccessSub(){
        $(".newsletter-form")[0].reset();
        submitMSGSub(true, "Thank you for subscribing!");
        setTimeout(function() {
            $("#validator-newsletter").addClass('hide');
        }, 4000)
    }

    function formErrorSub(){
        $(".newsletter-form").addClass("animated shake");
	    setTimeout(function() {
            $(".newsletter-form").removeClass("animated shake");
        }, 1000)
    }

    function submitMSGSub(valid, msg){
        if(valid){
            var msgClasses = "validation-success";
        } else {
            var msgClasses = "validation-danger";
        }
        $("#validator-newsletter").removeClass().addClass(msgClasses).text(msg);
    }

    // AJAX MailChimp
    $(".newsletter-form").ajaxChimp({
        url: "http://netgon.us13.list-manage.com/subscribe/post?u=b3954a95f1a55ffe65dd25050&amp;id=50b6fd13c3", // Your url MailChimp
        callback: callbackFunction
    });

 
    /*-----------------------------------------------------------------
      Contacts form
    -------------------------------------------------------------------*/

    $("#contact-form").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            submitMSG(false, "Please fill in the form...");
        } else {
            // everything looks good!
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm(){
        // Initiate Variables With Form Content
        var name = $("#name").val(),
            email = $("#email").val(),
            message = $("#message").val();

        $.ajax({
            type: "POST",
            url: "assets/php/form-contact.php",
            data: "name=" + name + "&email=" + email + "&message=" + message,
            success : function(text){
                if (text == "success"){
                    formSuccess();
                } else {
                    formError();
                    submitMSG(false,text);
                }
            }
        });
    }

    function formSuccess(){
        $("#contact-form")[0].reset();
        submitMSG(true, "Thanks! Your message has been sent.");
    }
  
    function submitMSG(valid, msg){
        if(valid){
            var msgClasses = "validation-success";
        } else {
           var msgClasses = "validation-danger";
        }
        $("#validator-contact").removeClass().addClass(msgClasses).text(msg);
    }
});