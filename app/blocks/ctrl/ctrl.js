app.ctrl = {
  initEl: '.js-ctrl',
  catEl: '.js-ctrl__category',
  prevBtnEl: '.js-ctrl__prev',
  nextBtnEl: '.js-ctrl__next',
  targetsEl: '.js-ctrl__targets',
  targetEl: '.js-ctrl__target',
  hideEl: '.js-ctrl__hide',
  closeEl: '.js-ctrl__close',
  slidesPerView: 3,
  isActive: false,
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
      const initIdx = $slide.filter('.current').length && $slide.filter('.current').index() || 0;

      $slider
          .toggleClass('no-sliding', !(slidesLength > self.slidesPerView));

      app.controlPanelCat = new Swiper($slider, {
        init: false,
        initialSlide: initIdx,
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

        const $curSlide = $slide.eq(initIdx);
        $curSlide.addClass('current');
        app.visibleSlides(initIdx, $curSlide);

        const $activeSlide = $slide.filter('.active');
        app.isActive = !!$activeSlide.length;

        if (app.isActive) {
          app.showTarget($activeSlide.attr('href'));
        }
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

      if (!$curSl.hasClass('active')) {
        $slide.removeClass('current').removeClass('active').removeClass('visible');
        $curSl.addClass('current active visible');

        app.visibleSlides(idx, $curSl);
        app.isActive = true;

        app.showTarget($curSl.attr('href'));
      } else {
        $slide.removeClass('active');

        app.hideTarget();
        app.isActive = false;
      }
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

        if (app.isActive) {
          $prevSl.addClass('active');
          app.showTarget($prevSl.attr('href'));
        }
      } else if (idx > 0) {
        const $prevSl = $slide.eq(prevIdx);

        $prevSl.addClass('current visible');
        $prevSl.next().addClass('visible').next().addClass('visible');
        app.controlPanelCat.slideTo(prevIdx, app.speed);

        if (app.isActive) {
          $prevSl.addClass('active');
          app.showTarget($prevSl.attr('href'));
        }
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

        if (app.isActive) {
          $nextSl.addClass('active');
          app.showTarget($nextSl.attr('href'));
        }
      } else if (idx < slideLength - 1) {
        const $nextSl = $slide.eq(nextIdx);

        $nextSl.addClass('current visible');
        $nextSl.prev().addClass('visible').prev().addClass('visible');
        app.controlPanelCat.slideTo(nextIdx, app.speed);

        if (app.isActive) {
          $nextSl.addClass('active');
          app.showTarget($nextSl.attr('href'));
        }
      }
    });

    $body.on('click', app.closeEl, function (e) {
      e.preventDefault();

      app.hideTarget();
      $slide.removeClass('active');
    })
  },
  visibleSlides(idx, $curSl) {
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
  },
  showTarget(el) {
    $(this.targetEl).removeClass('active');
    $(el).addClass('active').closest(this.targetsEl).addClass('active');
    $(el).trigger('showTarget');
    $(this.hideEl).addClass('active');
  },
  hideTarget() {
    $(this.targetsEl).removeClass('active');
    $(this.hideEl).removeClass('active');
  }
}