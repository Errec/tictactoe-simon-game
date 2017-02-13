function tttManager(tttCard) {
  console.log(tttCard);
}

$(document).ready(function() {
  var tttCard = {
    openSpots: 0,
    playerTurn: 'X',
    playerXSpots: [],
    playerOSpots: []
  };

  $('.td').click(function() {
    if ($('.header__button').data('game') === 't') {
      tttManager(tttCard);
    } else {
    }
    console.log(this.id);
  });

});
