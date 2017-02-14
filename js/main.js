function tttManager(card, clickedSpot) {
  if (card.playerXSpots.indexOf(clickedSpot) != -1 || card.playerOSpots.indexOf(clickedSpot) != -1) {
    alert("item already checked"); // REMOVE
    return;
  } else if (card.playerTurn === 'X') {
    card.playerXSpots.push(clickedSpot);
  } else {
    card.playerOSpots.push(clickedSpot);
  }

  if (--card.openSpots === 0) {
    alert("its a drawn"); // REMOVE
    tttReset(card);
    return;
  }
  console.log(card); // REMOVE
  card.playerTurn === 'X' ? card.playerTurn = 'O' : card.playerTurn = 'X';
}

function tttReset(card){
  card.openSpots = 6;
  card.playerTurn = 'X';
  card.playerXSpots = [];
  card.playerOSpots = [];
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
      tttManager(tttCard, this.id);
    } else {
      alert('simon game!'); // REMOVE
    }
  });

});
