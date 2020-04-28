app.formElement = {
  togglePassword() {
    const showPassBtnElement = '.js-show-pass';
    const showPassActiveClass = 'is-show';

    if ($(showPassBtnElement).length) {
      $('body').on('click', showPassBtnElement, function (e) {
        e.preventDefault();

        const $curBtn = $(this);
        const $curInput = $curBtn.parent().find('input');

        $curInput.attr('type', 'text');

        if (!$curBtn.hasClass(showPassActiveClass)) {
          $curBtn.addClass(showPassActiveClass);
          $curInput.attr('type', 'text');
        } else {
          $curBtn.removeClass(showPassActiveClass);
          $curInput.attr('type', 'password');
        }
      });
    }
  },
  confirmPassword() {
    const $pass1 = $('.js-main-password');
    const $pass2 = $('.js-confirm-password');

    function matchPasswords(pass1, pass2) {
      const val1 = pass1.val();
      const val2 = pass2.val();
      const $pass = $pass1.add($pass2);
      $pass
          .toggleClass('confirm-error', val1 !== val2)
          .toggleClass('confirm-success', val1 === val2);
    }

    if ($pass1.length && $pass2.length) {
      let timeout1;
      $pass1.keyup(function () {
        const $curPassword = $(this);
        clearTimeout(timeout1);
        timeout1 = setTimeout(function () {
          matchPasswords($curPassword, $curPassword.closest('form').find($pass2));
        }, 300);
      });

      let timeout2;
      $pass2.keyup(function () {
        const $curPassword = $(this);
        clearTimeout(timeout2);
        timeout2 = setTimeout(function () {
          matchPasswords($curPassword, $curPassword.closest('form').find($pass1));
        }, 300);
      });
    }
  },
};
