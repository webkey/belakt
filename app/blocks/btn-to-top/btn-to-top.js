app.scrollToTop = {
  el: '.js-btn-to-top',
  minScrollTop: 250,
  init() {
    if ($(this.el).length) {
      this.run();
    }
  },
  run() {
    const $page = $('html, body');
    const app = this;
    const $btn = $(app.el);

    $(window).on('load scroll resize', function () {
      let scrollTop = $(window).scrollTop();
      $btn.toggleClass('active', (scrollTop >= app.minScrollTop));
    });

    $btn.on('click', function (e) {
      e.preventDefault();
      if (!$page.is(':animated')) {
        $page.stop().animate({
          scrollTop: 0
        }, 300);
      }
    })
  }
};
