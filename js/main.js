$(document).ready(function() {
  $('.td').click(function() {
    if ($('.header__button').data('game') === 't') {
      alert('ticatcatoe');
    } else {
      alert('simon');
    }
    console.log(this.id);
  });
});
