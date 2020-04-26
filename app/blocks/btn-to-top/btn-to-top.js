app.scrollToTop = {
  el: '.js-btn-to-top',
  minScrollTop: 500,
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
      let currentScrollTop = $(window).scrollTop();
      $btn.toggleClass('btn-to-top--show', (currentScrollTop >= app.minScrollTop));
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
