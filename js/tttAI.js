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
          case 'T2':
            return upCorners[Math.round(Math.random())];
          case 'B2':
            return downCorners[Math.round(Math.random())];
          case 'M3':
            return rightCorners[Math.round(Math.random())];
          case 'M1':
            return leftCorners[Math.round(Math.random())];
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
          switch (takenSpots[0]) {
            case 'T2':
              return upCorners[Math.round(Math.random())];
            case 'B2':
              return downCorners[Math.round(Math.random())];
            case 'M3':
              return rightCorners[Math.round(Math.random())];
            case 'M1':
              return leftCorners[Math.round(Math.random())];
          }
          break;
        } else {
            return 'M2';
          }
        break;
    }
  }

  if (t.openSpots === 6) {
    var defend = twoInRow(takenSpots, mySpots).defense;
    if (defend !== null) {
      return defend;
    }

    switch (mySpots[0]) {
      case 'M2':
        if (corners.indexOf(takenSpots[1]) > -1) {
          return pickRandom(t, edges);
        } else {
          return pickRandom(t, allGroups);
        }
        break;
      case 'T1':
      case 'T3':
      case 'B1':
      case 'B3':
        if (takenSpots.indexOf('M2') > -1) {
          return pickRandom(t, corners);
        } else {
          return  'M2';
        }
        break;
      default:
        return pickRandom(t, allGroups);
    }
  }

  if (t.openSpots < 6) {
    fillRow = twoInRow(takenSpots, mySpots);
    addToRow = oneInRow(takenSpots, mySpots);
    if (fillRow.attack !== null) {
      return fillRow.attack;
    } else if (fillRow.defense !== null) {
      return fillRow.defense;
    } else if(addToRow) {
      return addToRow;
    } else {
      return pickRandom(t, allGroups);
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
  var fillRow = {
    defense : null,
    attack   : null
  };

    for (var i = 0; i < winArr.length; i++) {
    verifyOponentRow = winArr[i].filter(function (elem) {
      return takenSpots.indexOf(elem) === -1;
    });
    if (verifyOponentRow.length === 1 && mySpots.indexOf(verifyOponentRow[0]) === -1) {
      fillRow.defense = verifyOponentRow[0];
      break;
    }
  }
    for (i = 0; i < winArr.length; i++) {
    verifyMyRow = winArr[i].filter(function (elem) {
      return mySpots.indexOf(elem) === -1;
    });
    if (verifyMyRow.length === 1 && takenSpots.indexOf(verifyMyRow[0]) === -1) {
      fillRow.attack = verifyMyRow[0];
      break;
    }
  }

  return fillRow;
}

function  oneInRow(takenSpots, mySpots) {

  var openSpots = [];
  for (var i = 0; i < winArr.length; i++) {

    verifyOponentRow = winArr[i].filter(function (elem) {
      return takenSpots.indexOf(elem) === -1;
    });
    verifyMyRow = verifyOponentRow.filter(function (elem) {
      return mySpots.indexOf(elem) > -1;
    });
    if (verifyOponentRow.length === 2 && verifyMyRow.length === 0) {
      openSpots = verifyOponentRow;
      break;
    }
  }

  return openSpots[Math.floor(Math.random()*openSpots.length)];
}

