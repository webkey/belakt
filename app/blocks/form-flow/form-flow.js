app.formElement = {
  state() {
    const $elem = $('.form-flow__field');

    function toggleStateClass(mod, cond) {
      const $this = $(this);
      $this.add($this.prev('label')).toggleClass(mod, cond);
    }

    if ($elem.length) {

      // Focus
      $elem.on('focus blur', function (e) {
        toggleStateClass.call(this, 'focused', e.handleObj.origType === 'focus');
      });

      // Has value
      $.each($elem, function () {
        toggleStateClass.call(this, 'filled', $(this).val().length !== 0);
      });

      $elem.on('keyup change', function () {
        toggleStateClass.call(this, 'filled', $(this).val().length !== 0);
      });
    }
  }
};
