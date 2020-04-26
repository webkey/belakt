app.tooltip = {
  el: '.js-tooltip',
  init() {
    const $el = $(this.el);

    if($el.length) {
      $el.tooltipster({
        animation: 'grow',
        animationDuration: 200,
        maxWidth: 200,
        // trigger: 'click',
        theme: ['tooltipster-style']
      })
    }
  }
}