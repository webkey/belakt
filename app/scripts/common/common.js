app.common = {
  name: 'common',
  description: 'application support functions',
  initLazyLoad() {
    new LazyLoad({
      threshold: 50,
      elements_selector: '.lazy-load'
    });
  },
  sticky() {
    $('.base__share').stickybits();
  }
};
