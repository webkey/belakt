app.controlPanel = {
  initEl: '.js-control-panel',
  categoriesEl: '.js-control-panel__category',
  slidesPerView: 3,
  init() {
    this.runSlider();
  },
  runSlider() {
    const app = this;
    const $slider = $(this.categoriesEl);

    if ($slider.length) {
      const $nextEl = $('.js-control-panel__prev');
      const $prevEl = $('.js-control-panel__next');
      const slidesLength = $('.swiper-slide', $slider).length;

      $slider
          .toggleClass('no-sliding', !(slidesLength > self.slidesPerView));

      const sliderInstance = new Swiper($slider, {
        init: false,
        direction: 'vertical',
        loop: false,
        slidesPerView: self.slidesPerView,
        spaceBetween: 0,
        watchSlidesVisibility: true,

        simulateTouch: false,
        allowTouchMove: false,
        followFinger: false,

        navigation: {
          nextEl: $nextEl,
          prevEl: $prevEl
        },
      });

      sliderInstance.on('init', function () {
        $slider.addClass('is-loaded');
      });

      sliderInstance.init();
    }
  }
}