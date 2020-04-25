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
    const app = this;
    const $menu = $(this.initEl);
    var menuInst = $menu.accordionSimple({
      // Elements
      block: app.menuItemEl,
      panel: app.menuPanelEl,
      switcher: app.menuSwitcherEl,
      // Additional settings
      collapsed: true,
      duration: 200,
    });

    // Open current item
    menuInst.accordionSimple('open', $('.current', $menu).closest(app.menuPanelEl));
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
