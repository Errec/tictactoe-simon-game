function pickSpot(t, takenSpots, mySpots) {
  var edges        = ['T2', 'M3', 'B2', 'M1'];
  var corners      = ['T1', 'T3', 'B1', 'B3'];
  var upCorners    = ['T1', 'T3'];
  var downCorners  = ['B1', 'B3'];
  var leftCorners  = ['T1', 'B1'];
  var rightCorners = ['T3', 'B3'];
  var center       = ['M2'];
  var allGroups    = edges.concat(corners.concat(center));

  if (t.openSpots === 9) {
    return corners.concat(center)[Math.floor(Math.random()*corners.concat(center).length)];
  }

  if (t.openSpots === 8) {
    switch (takenSpots[0]) {
      case 'M2':
        return corners[Math.floor(Math.random()*corners.length)];
      case 'T1':
      case 'T3':
      case 'B1':
      case 'B3':
        return 'M2';
      case 'T2':
        return upCorners[Math.round(Math.random())];
      case 'B2':
        return downCorners[Math.round(Math.random())];
      case 'M3':
        return rightCorners[Math.round(Math.random())];
      case 'M1':
        return leftCorners[Math.round(Math.random())];
    }
  }

  if (t.openSpots === 7) {
    switch (takenSpots[0]) {
      case 'M2':
        switch (mySpots[0]) {
          case 'T1':
            return 'B3';
          case 'T3':
            return 'B1';
          case 'B1':
            return 'T3';
          case 'B3':
            return 'T1';
        }
        break;
      case 'T1':
      case 'T3':
      case 'B1':
      case 'B3':
        if (mySpots[0] === 'M2') {
          return pickRandom(t, allGroups);
        } else {
            return pickRandom(t, corners);
          }
        break;
      case 'T2':
      case 'B2':
      case 'M3':
      case 'M1':
        if (mySpots[0] === 'M2') {
          return pickRandom(t, corners);
        } else {
            return 'M2';
          }
        break;
    }
  }

  if (t.openSpots === 6) {
    var defend = checkTwoInRow(takenSpots, mySpots).defense;
    if (defend !== null) {
      return defend;
    }

    switch (mySpots[0]) {
      case 'M2':
        if (takenSpots[1].indexOf(corners) > -1) {
          return pickRandom(t, edges);
        } else {
          return pickRandom(t, allGroups);
        }
        break;
      case 'T1':
      case 'T3':
      case 'B1':
      case 'B3':
        if ('M2'.indexOf(takenSpots) > -1) {
          return pickRandom(t, corners);
        } else {
          return  'M2';
        }
    }
  }
}

function pickRandom(t, group) {
  currentOpenSpots = group.filter(function(elemen) {
    return t.playerXSpots.concat(t.playerOSpots).indexOf(elemen) === -1;
  });
  return currentOpenSpots[Math.floor(Math.random()*currentOpenSpots.length)];
}

function convertToTd(group) {
  switch (group) {
    case 'T1':
      return 'td-11';
    case 'T2':
      return 'td-13';
    case 'T3':
      return 'td-15';
    case 'M1':
      return 'td-31';
    case 'M2':
      return 'td-33';
    case 'M3':
      return 'td-35';
    case 'B1':
      return 'td-51';
    case 'B2':
      return 'td-53';
    case 'B3':
      return 'td-55';
  }
}

function twoInRow(takenSpots, mySpots) {
  var completeTheRow = {
    defense : null,
    atack   : null
  };

  var winArr = [['T1', 'T2', 'T3'],
                ['M1', 'M2', 'M3'],
                ['B1', 'B2', 'B3'],
                ['T1', 'M2', 'B3'],
                ['T1', 'M1', 'B1'],
                ['T2', 'M2', 'B2'],
                ['T3', 'M3', 'B3'],
                ['B1', 'M2', 'T3']];

    for (var i = 0; i < winArr.length; i++) {
    verifyOponentRow = winArr[i].filter(function (elem) {
      return takenSpots.indexOf(elem) === -1;
    });
    if (verifyOponentRow.length === 1 && verifyOponentRow[0].indexOf(mySpots) === -1) {
      completeTheRow.defense = verifyOponentRow[0];
      break;
    }
  }
    for (var i = 0; i < winArr.length; i++) {
    verifyMyRow = winArr[i].filter(function (elem) {
      return mySpots.indexOf(elem) === -1;
    });
    if (verifyMyRow.length === 1 && verifyMyRow[0].indexOf(takenSpots) === -1) {
      completeTheRow.atack = verifyMyRow[0];
      break;
    }
  }

  return completeTheRow;
}
