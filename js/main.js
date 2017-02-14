function tttManager(tttCard, clickedSpot) {
  console.log(tttCard); // REMOVE
  if (tttCard.playerXSpots.indexOf(clickedSpot) != -1 || tttCard.playerOSpots.indexOf(clickedSpot) != -1) {
    alert("item already checked"); // REMOVE
    return;
  } else if (tttCard.playerTurn === 'X') {
    tttCard.playerXSpots.push(clickedSpot);
  } else {
    tttCard.playerOSpots.push(clickedSpot);
  }
}

$(document).ready(function() {
  var tttCard = {
    openSpots    : 6,
    playerTurn   : 'X',
    playerXSpots : [],
    playerOSpots : []
  };

  $('.td').click(function() {
    if ($('.header__button').data('game') === 't') {
      console.log(this.id);
      tttManager(tttCard, this.id);
    } else {
      alert('simon game!'); // REMOVE
    }
  });

});
