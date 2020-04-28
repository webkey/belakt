app.menu = {
  initEl: '.js-menu',
  menuEl: '.js-menu-app',
  menuItemEl: '.js-menu-li',
  menuPanelEl: '.js-menu-drop',
  menuSwitcherEl: '.js-menu-arrow',
  switcherMenuEl: '.js-menu-app-switcher',
  init() {
    if ($(this.initEl).length) {
      this.events();
    }

    if ($(this.switcherMenuEl).length) {
      this.toggleMenuPanel();
    }
  },
  events() {
    const app = this;
    const $menu = $(this.initEl);
    const menuInst = $menu.accordionSimple({
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
  toggleMenuPanel() {
    const app = this;

    $('body').on('click', app.switcherMenuEl, function (e) {
      e.preventDefault();
      const $curBtn = $(this);
      const $menu = $(app.menuEl);

      if ($curBtn.hasClass('menu-app-is-open')) {
        $curBtn.removeClass('menu-app-is-open');
        $menu.stop().slideUp();
      } else {
        $curBtn.addClass('menu-app-is-open');
        $menu.stop().slideDown();
      }
    });
  },
};
