app.rubricsSlider = {
  sliderEl: '.js-rubrics-slider',
  sliderPrevEl: '.js-rubrics-slider__button_prev',
  sliderNextEl: '.js-rubrics-slider__button_next',
  slidesPerView: 3,
  init() {
    if ($(this.sliderEl).length) {
      this.runSlider();
    }
  },
  runSlider() {
    const $slider = $(this.sliderEl);

    if ($slider.length) {
      const self = this;

      $.each($slider, function () {
        const $curSlider = $(this);
        const $prevEl = $curSlider.find(self.sliderPrevEl);
        const $nextEl = $curSlider.find(self.sliderNextEl);
        const $slide = $('.swiper-slide', $curSlider);

        // Match height content
        $slide.find('.widget-rubric').matchHeight();

        const slidesLength = $slide.length;

        $curSlider
          .toggleClass('no-sliding', !(slidesLength > self.slidesPerView))
          .toggleClass('has-one-slide', slidesLength === 1);

        const sliderInstance = new Swiper($curSlider.find('.swiper-container'), {
          init: false,
          loop: false,
          slidesPerView: 3,
          slidesPerGroup: 1,
          // spaceBetween: 20,
          watchSlidesVisibility: true,

          // simulateTouch: slidesLength > self.slidesPerView,
          // allowTouchMove: slidesLength > self.slidesPerView,
          // followFinger: slidesLength > self.slidesPerView,

          navigation: {
            prevEl: $prevEl,
            nextEl: $nextEl
          },

          breakpoints: {
            991: {
              slidesPerView: 'auto',
              loopedSlides: 2,
              slidesPerGroup: 1,
              centeredSlides: true
            }
          },
        });

        $curSlider.data('slider-instance', sliderInstance);

        sliderInstance.on('init', function () {
          $curSlider.addClass('is-loaded');
        });

        sliderInstance.init();

        // sliderInstance.update();
      });
    }
  }
};
