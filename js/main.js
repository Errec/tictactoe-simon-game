function tttManager(t, clickedSpot) {
  if (t.playerXSpots.indexOf(clickedSpot) != -1 || t.playerOSpots.indexOf(clickedSpot) != -1) {
    alert("item already checked"); // REMOVE
    return;
  } else if (t.playerTurn === 'X') {
    t.playerXSpots.push(clickedSpot);
  } else {
    t.playerOSpots.push(clickedSpot);
  }

  if (--t.openSpots === 0) {
    alert("its a drawn"); // REMOVE
    tttReset(t);
    return;
  }
  console.log(t); // REMOVE
  t.playerTurn === 'X' ? t.playerTurn = 'O' : t.playerTurn = 'X';
}

function tttReset(t){
  t.openSpots = 6;
  t.playerTurn = 'X';
  t.playerXSpots = [];
  t.playerOSpots = [];
}

$(document).ready(function() {
  var tttData = {
    openSpots    : 6,
    playerTurn   : 'X',
    playerXSpots : [],
    playerOSpots : []
  };

  $('.td').click(function() {
    if ($('.header__button').data('game') === 't') {
      tttManager(tttData, this.id);
    } else {
      alert('simon game!'); // REMOVE
    }
  });

});
