app.menu = {
  initEl: '.js-menu',
  menuItemEl: '.js-menu-li',
  menuPanelEl: '.js-menu-drop',
  menuSwitcherEl: '.js-menu-arrow',
  switcherMenuEl: '.js-menu-app-switcher',
  init() {
    if ($(this.initEl).length) {
      this.events();
    }

    if ($(this.switcherMenuEl).length) {
      this.toggleMenuPanel(this.switcherMenuEl);
    }
  },
  events() {
    const self = this;
    const $menu = $(this.initEl);
    const menuAccordion = $menu.accordionSimple({
      // Elements
      block: self.menuItemEl,
      panel: self.menuPanelEl,
      switcher: self.menuSwitcherEl,
      // Additional settings
      collapsed: false,
      duration: 200,
    });
  },
  toggleMenuPanel(el) {
    const $switcherEl = $(el);
    const $html = $('html');
    $switcherEl.switchClass({
      removeExisting: true,
      switchClassTo: $('.js-menu-app').add('.js-menu-app-overlay'),
      removeEl: $('.js-menu-app-close').add('.js-menu-app-overlay'),
      cssScrollFixed: true,
      preventRemoveClass: 'js-prevent-hide',
      modifiers: {
        activeClass: 'menu-app-is-open'
      },
      afterAdd() {
        $html.addClass('open-only-mob');
      },
      afterRemove() {
        $html.removeClass('open-only-mob');
      }
    });
  },
};
