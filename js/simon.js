var greenQuadrantIDs  = '#td-11, #td-12, #td-13, #td-21, #td-22, #td-23, #td-31, #td-32, #td-33';
var redQuadrantIDs    = '#td-14, #td-15, #td-16, #td-24, #td-25, #td-26, #td-34, #td-35, #td-36';
var yellowQuadrantIDs = '#td-41, #td-42, #td-43, #td-51, #td-52, #td-53, #td-61, #td-62, #td-63';
var blueQuadrantIDs   = '#td-44, #td-45, #td-46, #td-54, #td-55, #td-56, #td-64, #td-65, #td-66';

var green  = new quadrant(greenQuadrantIDs,'green','#7BFF91','#45D655');
var red    = new quadrant(redQuadrantIDs,'red','#F68163','#DC3B22');
var yellow = new quadrant(yellowQuadrantIDs,'yellow','#FFFDA9','#E1D934');
var blue   = new quadrant(blueQuadrantIDs,'blue','#4FEEFF','#00A8F1');

function simonManager(s) {
  machineTurn(s);
}

function playerTurn(s) {
  var clickCount = 0;
  console.log(clickCount);
  s.playerFail = false;
  setTimeout(function() {
    $(".td").css("pointer-events", "auto");
  }, 250 * s.machineStreak.length);
  $(greenQuadrantIDs).click(function() {
    green.activate();
    clickCount++;
    checkGameStatus(s, clickCount, green); // TODO
  });
  $(redQuadrantIDs).click(function() {
    red.activate();
    clickCount++;
    checkGameStatus(s, clickCount, red); // TODO
  });
  $(yellowQuadrantIDs).click(function() {
    yellow.activate();
    clickCount++;
    checkGameStatus(s, clickCount, yellow); // TODO
  });
  $(blueQuadrantIDs).click(function() {
    blue.activate();
    clickCount++;
    checkGameStatus(s, clickCount, blue); // TODO
  });
}

function checkGameStatus(s, clickCount, quadrant) {
  if (s.machineStreak[clickCount - 1] === quadrant) {
    s.playerStreak.push(quadrant);
    if (s.machineStreak.length === clickCount) {
      setTimeout(function() {
        machineTurn(s);
      }, 250);
    }
  } else {
      s.playerFail = true;
      setTimeout(function() {
        machineTurn(s);
      }, 250);
    }
}

function machineTurn(s) {
  $(".td").css("pointer-events", "none");
  if(!s.playerFail) {
    pushNewColor(s.machineStreak);
  }
  if (s.machineStreak.length) {
    activateAllColorsStreak(s.machineStreak);
  }
  playerTurn(s);
}

function pushNewColor(streak) {
  var colors = [green, red, yellow, blue];
  streak.push(colors[Math.floor(Math.random()*colors.length)]);
}

function convertClickedSpot(p) {
  switch (p) {
    case greenQuadrantIDs.indexOf(p) > -1:
      return {td:greenQuadrantIDs, color:'green'};
    case redQuadrantIDs.indexOf(p) > -1:
      return {td:redQuadrantIDs, color:'red'};
    case yellowQuadrantIDs.indexOf(p) > -1:
      return {td:yellowQuadrantIDs, color:'yellow'};
    case blueQuadrantIDs.indexOf(p) > -1:
      return {td:blueQuadrantIDs, color:'blue'};
  }
}

function quadrant(IDs, colorName, hexLight, hexDark) {
  var that = this;
  this.IDs              = IDs;
  this.colorName        = colorName;
  this.hexLight         = hexLight;
  this.hexDark          = hexDark;
  this.activate = function() {
    $(".td").css("pointer-events", "none");
    var audio = document.getElementById(this.colorName);
    audio.currentTime = 0;
    audio.play();
    $(this.IDs).css('background-color', this.hexLight);
    setTimeout(function() {
      $(that.IDs).css('background-color', that.hexDark);
      $(".td").css("pointer-events", "auto");
    }, 250);
  };
}

function activateAllColorsStreak(streak) {
  for (var i = 0; i < streak.length; i++) {
    setTimeout(function(j) {
      streak[j].activate();
    }, i * 250, i);
  }
}
