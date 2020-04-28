app.tableInfo = {
  initEl: '.table-info',
  init() {
    if ($(this.initEl).length) {
      $(this.initEl).find('th, td').children().matchHeight();
    }
  }
};
