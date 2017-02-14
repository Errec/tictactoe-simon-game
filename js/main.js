function tttManager(t, clickedSpot) {
  var spotGroup = convertClickedSpot(clickedSpot);
  if (t.playerXSpots.indexOf(spotGroup) != -1 || t.playerOSpots.indexOf(spotGroup) != -1) {
    alert("item already checked"); // REMOVE
    return;
  } else if (t.playerTurn === 'X') {
    t.playerXSpots.push(spotGroup);
  } else {
    t.playerOSpots.push(spotGroup);
  }

  if (--t.openSpots === 0) {
    alert("its a drawn"); // REMOVE
    tttReset(t);
    return;
  }
  console.log(t); // REMOVE
  t.playerTurn === 'X' ? t.playerTurn = 'O' : t.playerTurn = 'X';
}

function convertClickedSpot(p) {
  switch (p) {
    case 'td-11':
    case 'td-12':
    case 'td-21':
    case 'td-22':
      return 'T1';
    case 'td-13':
    case 'td-14':
    case 'td-23':
    case 'td-24':
      return 'T2';
    case 'td-15':
    case 'td-16':
    case 'td-25':
    case 'td-26':
      return 'T3';
    case 'td-31':
    case 'td-32':
    case 'td-41':
    case 'td-42':
      return 'M1';
    case 'td-33':
    case 'td-34':
    case 'td-43':
    case 'td-44':
      return 'M2';
    case 'td-35':
    case 'td-36':
    case 'td-45':
    case 'td-46':
      return 'M3';
    case 'td-51':
    case 'td-52':
    case 'td-61':
    case 'td-62':
      return 'B1';
    case 'td-53':
    case 'td-54':
    case 'td-63':
    case 'td-64':
      return 'B2';
    case 'td-55':
    case 'td-56':
    case 'td-65':
    case 'td-66':
      return 'B3';
  }
}

function tttReset(t) {
  t.openSpots    = 9;
  t.playerTurn   = 'X';
  t.playerXSpots = [];
  t.playerOSpots = [];
}

$(document).ready(function() {
  var tttData = {
    openSpots    : 9,
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
