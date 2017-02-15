$(document).ready(function() {
  var tttData = {
    openSpots    : 9,
    playerTurn   : 'X',
    playerXSpots : [],
    playerOSpots : [],
    score        : {
      X: 0,
      O: 0
    }
  };

  $('.td').click(function() {
    if ($('.header__button').data('game') === 't') {
      tttManager(tttData, this.id);
    } else {
      alert('simon game!'); // REMOVE
    }
  });

});
