app.catSlider = {
  sliderElement: '.js-cat-slider',
  slidesPerView: 3,
  init() {
    if ($(this.sliderElement).length) {
      this.runSlider();
    }
  },
  runSlider() {
    const $slider = $(this.sliderElement);

    if ($slider.length) {
      const self = this;
      $.each($slider, function () {
        const $curSlider = $(this);
        const $nextEl = $curSlider.find('.js-cat-slider__button_next');
        const $prevEl = $curSlider.find('.js-cat-slider__button_prev');
        const slidesLength = $('.swiper-slide', $curSlider).length;

        $curSlider.toggleClass('no-sliding', !(slidesLength > self.slidesPerView)).toggleClass('has-one-slide', slidesLength === 1);

        const sliderInstance = new Swiper($curSlider.find('.swiper-container'), {
          init: false,
          loop: true,
          slidesPerView: self.slidesPerView,
          spaceBetween: 0,
          watchSlidesVisibility: true,

          simulateTouch: slidesLength > self.slidesPerView,
          allowTouchMove: slidesLength > self.slidesPerView,
          followFinger: slidesLength > self.slidesPerView,

          navigation: {
            nextEl: $nextEl,
            prevEl: $prevEl
          },

          breakpoints: {
            991: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 20
            },
            575: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 16
            },
          },
        });

        $curSlider.data('slider-instance', sliderInstance);

        sliderInstance.on('init', function () {
          $curSlider.addClass('is-loaded');
        });

        sliderInstance.init();

        $curSlider.closest('.js-ctrl__target').on('showTarget', function () {
          sliderInstance.update();
        });
      });
    }
  }
};
