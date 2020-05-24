app.navigation = {
  initEl: '.js-nav',
  init() {
    const $navEl = $(this.initEl);
    if ($navEl.length) {
      $navEl.nav({
        // Elements
        item: '.js-nav-li',
        drop: '.js-nav-drop',
        arrow: '.js-nav-arrow',
        // Additional settings
        arrowEnable: true,
        submenuPosition: false,
        modifiers: {
          hover: 'hover',
          current: 'current',
        }
      });
    }
  }
};
