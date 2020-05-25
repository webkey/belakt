app.newsSlider = {
  sliderEl: '.js-news-slider',
  sliderPrevEl: '.js-news-slider__button-prev',
  sliderNextEl: '.js-news-slider__button-next',
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
        const sliderInstance = new Swiper($curSlider.find('.swiper-container'), {
          init: false,
          loop: true,
          slidesPerView: 3,
          slidesPerGroup: 1,
          spaceBetween: 30,
          watchSlidesVisibility: true,
          navigation: {
            prevEl: $prevEl,
            nextEl: $nextEl
          },

          breakpoints: {
            767: {
              slidesPerView: 2,
              slidesPerGroup: 1,
              spaceBetween: 30,
            },
            575: {
              slidesPerView: 1,
              slidesPerGroup: 1
            }
          },
        });

        $curSlider.data('slider-instance', sliderInstance);

        sliderInstance.on('init', function () {
          $curSlider.addClass('is-loaded');
        });

        sliderInstance.init();
      });
    }
  }
};
