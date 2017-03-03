var greenQuadrant  = '#td-11, #td-12, #td-13, #td-21, #td-22, #td-23, #td-31, #td-32, #td-33';
var redQuadrant    = '#td-14, #td-15, #td-16, #td-24, #td-25, #td-26, #td-34, #td-35, #td-36';
var yellowQuadrant = '#td-41, #td-42, #td-43, #td-51, #td-52, #td-53, #td-61, #td-62, #td-63';
var blueQuadrant   = '#td-44, #td-45, #td-46, #td-54, #td-55, #td-56, #td-64, #td-65, #td-66';

function simonManager(s, clickedSpot) {
  $(greenQuadrant).click(function() {
  activateQuadrant(greenQuadrant,'green','#7BFF91','#45D655');
  });
  $(redQuadrant).click(function() {
    activateQuadrant(redQuadrant,'red','#F68163','#DC3B22');
  });
  $(yellowQuadrant).click(function() {
    activateQuadrant(yellowQuadrant,'yellow','#FFFDA9','#E1D934');
  });
  $(blueQuadrant).click(function() {
    activateQuadrant(blueQuadrant,'blue','#4FEEFF','#00A8F1');
  });

  var spotGroup = convertClickedSpot(clickedSpot);
  if (s.turn === 'machine') {
    $(".td").css("pointer-events", "none");
    machineTurn(s.machineStreak, s.playerFail);
  } else {
    playerFail = playerTurn(spotGroup, s.machineStreak, s.playerStreak); // TODO
  }
}


function machineTurn(streak, fail) {
  if (streak.lenght) {
    blinkQuadrants(streak); // TODO
  }
  if(!fail) {
    pushNewColor(streak); // TODO
  }
}

function convertClickedSpot(p) {
  switch (p) {
    case greenQuadrant.indexOf(p) > -1:
      return {td:greenQuadrant, color:'green'};
    case redQuadrant.indexOf(p) > -1:
      return {td:redQuadrant, color:'red'};
    case yellowQuadrant.indexOf(p) > -1:
      return {td:yellowQuadrant, color:'yellow'};
    case blueQuadrant.indexOf(p) > -1:
      return {td:blueQuadrant, color:'blue'};
  }
}

function activateQuadrant(quadrant, colorId, hexLight, hexDark) {
  $(".td").css("pointer-events", "none");
  var audio = document.getElementById(colorId);
  audio.currentTime = 0;
  audio.play();
  $(quadrant).css('background-color', hexLight);
  setTimeout(function () {
    $(quadrant).css('background-color', hexDark);
    $(".td").css("pointer-events", "auto");
  }, 250);
}
