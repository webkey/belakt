app.categories = {
  initEl: '.js-control-panel',
  catEl: '.js-control-panel__category',
  prevBtnEl: '.js-control-panel__prev',
  nextBtnEl: '.js-control-panel__next',
  slidesPerView: 3,
  speed: 0,
  init() {
    this.run();
    this.event();
  },
  run() {
    const app = this;
    const $slider = $(this.catEl);
    const $slide = $('.swiper-slide', $(this.catEl));

    if ($slider.length) {
      const slidesLength = $('.swiper-slide', $slider).length;
      const initSlide = $slider.find('.current').index() || 0;

      $slider
          .toggleClass('no-sliding', !(slidesLength > self.slidesPerView));

      app.controlPanelCat = new Swiper($slider, {
        init: false,
        initialSlide: initSlide,
        speed: app.speed,
        direction: 'vertical',
        slidesPerView: 'auto',
        parallax:true,
        simulateTouch: false,
        allowTouchMove: false,
        followFinger: false,
      });

      app.controlPanelCat.on('init', function () {
        $slider.addClass('is-loaded');
        $slide.eq(initSlide).addClass('current');
        app.showSlides(initSlide, $slide.eq(initSlide));
      });

      app.controlPanelCat.init();
    }
  },
  event () {
    const app = this;
    const $body = $('body');
    const $slide = $('.swiper-slide', $(app.catEl));
    const slideLength = $slide.length;

    $body.on('click', app.catEl + ' a', function (e) {
      e.preventDefault();
      const $curSl = $(this);
      const idx = $curSl.index();
      $slide.removeClass('current').removeClass('active').removeClass('visible');
      $curSl.addClass('current active visible');

      app.showSlides(idx, $curSl);

    })

    $body.on('click', app.prevBtnEl, function (e) {
      e.preventDefault();
      const idx = $slide.filter('.current').index();
      let prevIdx = idx;

      if (idx > 0) {
        prevIdx = idx - 1;

        $slide.removeClass('active').removeClass('current').removeClass('visible');
      }

      if (idx > 1) {
        const $prevSl = $slide.eq(prevIdx);

        $prevSl.addClass('current visible');
        $prevSl.prev().addClass('visible');
        $prevSl.next().addClass('visible');
        app.controlPanelCat.slideTo(prevIdx - 1, app.speed);
      } else if (idx > 0) {
        const $prevSl = $slide.eq(prevIdx);

        $prevSl.addClass('current visible');
        $prevSl.next().addClass('visible').next().addClass('visible');
        app.controlPanelCat.slideTo(prevIdx, app.speed);
      }
    })

    $body.on('click', app.nextBtnEl, function (e) {
      e.preventDefault();
      const idx = $slide.filter('.current').index();
      let nextIdx = idx;

      if (idx < slideLength - 1) {
        nextIdx = idx + 1;

        $slide.removeClass('active').removeClass('current').removeClass('visible');
      }

      if (idx < slideLength - 2) {
        const $nextSl = $slide.eq(nextIdx);

        $nextSl.addClass('current visible');
        $nextSl.prev().addClass('visible');
        $nextSl.next().addClass('visible');
        app.controlPanelCat.slideTo(nextIdx - 1, app.speed);
      } else if (idx < slideLength - 1) {
        const $nextSl = $slide.eq(nextIdx);

        $nextSl.addClass('current visible');
        $nextSl.prev().addClass('visible').prev().addClass('visible');
        app.controlPanelCat.slideTo(nextIdx, app.speed);
      }
    })
  },
  showSlides(idx, $curSl) {
    const app = this;
    const slideLength = $('.swiper-slide', $(this.catEl)).length;
    $curSl.addClass('visible');

    if (idx > 0 && idx < slideLength - 1) {
      $curSl.prev().addClass('visible');
      $curSl.next().addClass('visible');

      app.controlPanelCat.slideTo(idx - 1, app.speed);
    } else if (idx === 0) {

      $curSl.next().addClass('visible').next().addClass('visible');
      app.controlPanelCat.slideTo(idx, app.speed);
    } else if (idx === slideLength - 1) {

      $curSl.prev().addClass('visible').prev().addClass('visible');
      app.controlPanelCat.slideTo(idx, app.speed);
    }
  }
}