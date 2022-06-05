var swiper = new Swiper(".mySwiper", {
    autoplay: {
		delay: 5000,
		// disableOnInteraction: false
	},
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
      },
  });



  //        == products ==

  $(document).ready(function() {
    $('#autoWidth').lightSlider({
        autoWidth:true,
        loop:true,
        onSliderLoad: function() {
            $( window ).resize();
        }, onAfterSlide: function() {
            $( window ).resize();
        } 
    });  
    $('#product').lightSlider({
        autoWidth:true,
        loop:true,
        onSliderLoad: function() {
            $( window ).resize();
        }, onAfterSlide: function() {
            $( window ).resize();
        }
    });  
  });

$(function() {

    // Init lightslider
    var slider = $('.lightslider-gallery').lightSlider({
        controls: true,
    });


})
setTimeout(() => {$(window).resize()}, 7000);
