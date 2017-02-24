$('.main__ttt-bt-x').click(function() {
  if (tttData.xType === 'human') {
    tttData.xType = 'machine';
    $('.main__ttt-bt-x-img').attr('src', 'img/pc.png');
    updateScore(tttData);
  } else {
    tttData.xType = 'human';
    $('.main__ttt-bt-x-img').attr('src', 'img/human.jpeg');
    updateScore(tttData);
  }
  checkForMachine(tttData);
});

$('.main__ttt-bt-o').click(function() {
  if (tttData.oType === 'human') {
    tttData.oType = 'machine';
    $('.main__ttt-bt-o-img').attr('src', 'img/pc.png');
    updateScore(tttData);
  } else {
    tttData.oType = 'human';
    $('.main__ttt-bt-o-img').attr('src', 'img/human.jpeg');
    updateScore(tttData);
  }
  checkForMachine(tttData);
});

function tttManager(t, clickedSpot) {

  $('.td').css('pointer-events', 'auto');
  var xsvg_1 = '<svg class= "ttt-svg x-svg" version="1.0" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMaxYMax" viewBox="0 0 3400 3400"><g class="svg-curve" id="';
  var xsvg_2 = '" fill="#FFFFFF" stroke="none"><path d="M220 2335 l-225 -225 413 -413 412 -412 -410 -410 c-225 -225 -410 -414 -410 -420 0 -13 448 -461 454 -455 3 3 186 186 408 407 222 222 411 403 418 403 8 0 198 -183 422 -407 l408 -408 225 225 c124 124 225 229 225 235 0 6 -185 195 -410 420 l-410 410 412 412 413 413 -225 225 c-124 124 -229 225 -235 225 -5 0 -193 -183 -417 -407 l-407 -407 -409 407 c-225 224 -413 407 -418 407 -5 0 -110 -101 -234 -225z"/></g></svg>';
  var osvg_1 = '<svg class= "ttt-svg o-svg" version="1.0" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMaxYMax" viewBox="0 0 3400 3400"><g class="svg-curve" id="';
  var osvg_2 = '" fill="#FFFFFF" stroke="none"><path d="M1090 2545 c-52 -7 -140 -28 -195 -45 -434 -139 -758 -493 -861 -940 -25 -107 -30 -378 -10 -500 45 -263 157 -482 349 -678 174 -177 359 -285 584 -341 373 -93 758 -24 1069 191 91 62 265 241 326 333 146 224 208 437 208 716 0 278 -64 493 -214 718 -75 113 -239 278 -342 344 -282 182 -581 248 -914 202z m404 -331 c289 -73 524 -261 651 -519 75 -153 90 -223 90 -415 0 -142 -3 -176 -23 -245 -96 -332 -364 -596 -691 -682 -133 -35 -325 -37 -456 -4 -297 72 -558 302 -674 593 -83 209 -80 471 7 696 96 249 347 477 612 555 119 36 110 35 274 36 104 1 166 -4 210 -15z"/></g></svg>';
  var spotGroup = convertClickedSpot(clickedSpot);

  if (t.score.humanX === 99 || t.score.machineX === 99 || t.score.humanO === 99 || t.score.machineO === 99) {
    t.score.humanX   = 0;
    t.score.humanO   = 0;
    t.score.machineX = 0;
    t.score.machineO = 0;
  }

  if (t.playerXSpots.indexOf(spotGroup.g) > -1 || t.playerOSpots.indexOf(spotGroup.g) > -1) {
    return;
  } else if (t.playerTurn === 'x') {
    t.playerXSpots.push(spotGroup.g);
    $('#' + spotGroup.tdRef).prepend("<div class='x'>" + xsvg_1 + spotGroup.g + xsvg_2 + "</div>");

    if (t.openSpots < 6) {
      if (checkForWin(t.playerTurn, t.playerXSpots, spotGroup.tdRef)) {
        setTimeout(function() {
          console.log('#score-' + t.playerTurn);
          $('#score-x').removeClass("make-green");
          $('.svg-curve').removeClass('make-green');
        }, 1000);
        t.xType === 'human' ? t.score.humanX++ : t.score.machineX++;
        updateScore(t);
        tttReset(t);
        return;
      }
    }
  } else {
    t.playerOSpots.push(spotGroup.g);
    $('#' + spotGroup.tdRef).prepend("<div class='x'>" + osvg_1 + spotGroup.g + osvg_2 + "</div>");

    if (t.openSpots < 6) {
      if (checkForWin(t.playerTurn, t.playerOSpots, spotGroup.tdRef)) {
        setTimeout(function() {
          $('#score-o').removeClass("make-green");
          $('.svg-curve').removeClass('make-green');
        }, 1000);
        t.oType === 'human' ? t.score.humanO++ : t.score.machineO++;
        updateScore(t);
        tttReset(t);
        return;
      }
    }
  }

  if (--t.openSpots === 0) {
    $('#' + spotGroup.tdRef).hide();
    $('#' + spotGroup.tdRef).show();
    $('.svg-curve').addClass('make-red');
    setTimeout(function() {
      console.log('#score-' + t.playerTurn);
      $('.svg-curve').removeClass('make-red');
    }, 1000);
    tttReset(t);
    return;
  }

  t.playerTurn === 'x' ? t.playerTurn = 'o' : t.playerTurn = 'x';
  checkForMachine(t);
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

function checkForWin(turn, playerArr, id) {
  var win = false;
  for (var i = 0; i < winArr.length; i++) {
    win = playerArr.filter(function (elem) {
      return winArr[i].indexOf(elem) > -1;
    }).length === winArr[i].length;
    if(win) {
      $('#' + id).hide();
      $('#' + id).show();
      $('#score-' + turn).addClass("make-green");
      $('#' + winArr[i][0]).addClass("make-green");
      $('#' + winArr[i][1]).addClass("make-green");
      $('#' + winArr[i][2]).addClass("make-green");
      break;
    }
  }
  return win;
}
function updateScore(t) {
  $('.main__x-score').text(function () {
    var value;
    t.xType === 'human' ? value= n(t.score.humanX) : value = n(t.score.machineX);
    return value;
  });
  $('.main__o-score').text(function () {
    var value;
    t.oType === 'human' ? value= n(t.score.humanO) : value = n(t.score.machineO);
    return value;
  });

  function n(n){
      return n > 9 ? "" + n: "0" + n;
  }
}

function tttReset(t) {
  $('.td').css('pointer-events', 'none');
  t.openSpots    = 9;
  t.playerTurn   = 'x';
  t.playerXSpots = [];
  t.playerOSpots = [];
  setTimeout(function() {
    $('.tr').find('.x').remove();
    $('.tr').find('.o').remove();
    $('.td').css('pointer-events', 'auto');
    checkForMachine(tttData);
  }, 1000);

}

function checkForMachine (t) {
  if (t.playerTurn === 'x' && t.xType === 'machine') {
    $('.td').css('pointer-events', 'none');
    setTimeout(function() {
      tttManager(t, convertToTd(pickSpot(t, t.playerOSpots, t.playerXSpots)));
    }, 350);
  }
  if (t.playerTurn === 'o' && t.oType === 'machine') {
    $('.td').css('pointer-events', 'none');
    setTimeout(function() {
      tttManager(t, convertToTd(pickSpot(t, t.playerXSpots, t.playerOSpots)));
    }, 350);
  }
}
