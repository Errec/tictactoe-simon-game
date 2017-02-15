function tttManager(t, clickedSpot) {
  var spotGroup = convertClickedSpot(clickedSpot);
  if (t.playerXSpots.indexOf(spotGroup.g) > -1 || t.playerOSpots.indexOf(spotGroup.g) > -1) {
    return;
  } else if (t.playerTurn === 'X') {
    t.playerXSpots.push(spotGroup.g);
    $('#' + spotGroup.tdRef).prepend("<div class='x'></div>");
    if (t.openSpots < 6) {
      if (checkForWin(t.playerXSpots)) {
        t.score.X++;
        tttReset(t);
        return;
      }
    }
  } else {
    t.playerOSpots.push(spotGroup.g);
    $('#' + spotGroup.tdRef).prepend("<div class='o'></div>");
    if (t.openSpots < 6) {
      if (checkForWin(t.playerOSpots)) {
        t.score.O++;
        tttReset(t);
        return;
      }
    }
  }

  if (--t.openSpots === 0) {
    tttReset(t);
    return;
  }
  console.log(t); // REMOVE
  t.playerTurn === 'X' ? t.playerTurn = 'O' : t.playerTurn = 'X';
  return;
}

function convertClickedSpot(p) {
  switch (p) {
    case 'td-11':
    case 'td-12':
    case 'td-21':
    case 'td-22':
      return {tdRef:'td-11',g:'T1'};
    case 'td-13':
    case 'td-14':
    case 'td-23':
    case 'td-24':
      return {tdRef:'td-13',g:'T2'};
    case 'td-15':
    case 'td-16':
    case 'td-25':
    case 'td-26':
      return {tdRef:'td-15',g:'T3'};
    case 'td-31':
    case 'td-32':
    case 'td-41':
    case 'td-42':
      return {tdRef:'td-31',g:'M1'};
    case 'td-33':
    case 'td-34':
    case 'td-43':
    case 'td-44':
      return {tdRef:'td-33',g:'M2'};
    case 'td-35':
    case 'td-36':
    case 'td-45':
    case 'td-46':
      return {tdRef:'td-35',g:'M3'};
    case 'td-51':
    case 'td-52':
    case 'td-61':
    case 'td-62':
      return {tdRef:'td-51',g:'B1'};
    case 'td-53':
    case 'td-54':
    case 'td-63':
    case 'td-64':
      return {tdRef:'td-53',g:'B2'};
    case 'td-55':
    case 'td-56':
    case 'td-65':
    case 'td-66':
      return {tdRef:'td-55',g:'B3'};
  }
}

function checkForWin(playerArr) {
  var win = false;
  var winArr = [['T1', 'T2', 'T3'],
                ['M1', 'M2', 'M3'],
                ['B1', 'B2', 'B3'],
                ['T1', 'M2', 'B3'],
                ['T1', 'M1', 'B1'],
                ['T2', 'M2', 'B2'],
                ['T3', 'M3', 'B3'],
                ['B1', 'M2', 'T3']];

  for (var i = 0; i < winArr.length; i++) {
    win = playerArr.filter(function (elem) {
      return winArr[i].indexOf(elem) > -1;
    }).length === winArr[i].length;
    if(win) {
      break;
    }
  }
  return win;
}

function tttReset(t) {
  $('.td').css('pointer-events', 'none');
  t.openSpots    = 9;
  t.playerTurn   = 'X';
  t.playerXSpots = [];
  t.playerOSpots = [];
  setTimeout(function() {
    $('.tr').find('.x').remove();
    $('.tr').find('.o').remove();
    $('.td').css('pointer-events', 'auto');
  }, 1000);
}
