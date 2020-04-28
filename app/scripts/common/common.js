app.common = {
  name: 'common',
  description: 'application support functions',
  initLazyLoad() {
    new LazyLoad({
      threshold: 50,
      elements_selector: '.lazy-load'
    });
  },
  toggleMobMenu() {
    const $controlElement = $('.js-mob-menu-control');
    const $html = $('html');
    if ($controlElement.length) {
      $controlElement.switchClass({
        removeExisting: true,
        switchClassTo: $('.js-mob-menu').add('.js-mob-menu-overlay'),
        removeEl: $('.js-mob-menu-close').add('.js-mob-menu-overlay'),
        cssScrollFixed: true,
        preventRemoveClass: 'js-mob-menu-prevent-hide',
        modifiers: {
          activeClass: 'mob-menu-is-open'
        },
        afterAdd() {
          $html.addClass('open-only-mob');
        },
        afterRemove() {
          $html.removeClass('open-only-mob');
        }
      });
    }
  }
};
