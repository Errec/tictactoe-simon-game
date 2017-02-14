function tttManager(card, clickedSpot) {
  console.log(card); // REMOVE
  if (card.playerXSpots.indexOf(clickedSpot) != -1 || card.playerOSpots.indexOf(clickedSpot) != -1) {
    alert("item already checked"); // REMOVE
    return;
  } else if (card.playerTurn === 'X') {
    card.playerXSpots.push(clickedSpot);
  } else {
    card.playerOSpots.push(clickedSpot);
  }
if (--card.openSpots === 0) {
  alert("its a draw"); // REMOVE
  return;
}
  card.playerTurn === 'X' ? card.playerTurn = 'O' : card.playerTurn = 'X';
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
