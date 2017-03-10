var greenQuadrantIDs  = '#td-11, #td-12, #td-13, #td-21, #td-22, #td-23, #td-31, #td-32, #td-33';
var redQuadrantIDs    = '#td-14, #td-15, #td-16, #td-24, #td-25, #td-26, #td-34, #td-35, #td-36';
var yellowQuadrantIDs = '#td-41, #td-42, #td-43, #td-51, #td-52, #td-53, #td-61, #td-62, #td-63';
var blueQuadrantIDs   = '#td-44, #td-45, #td-46, #td-54, #td-55, #td-56, #td-64, #td-65, #td-66';
var playIcon = '<svg id="simon-play-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 394.28572 455.28192" width="65%" height="65%"><path d="M354.286 227.641L20 420.641v-386z" fill="none" stroke="#45d655" stroke-width="40"/></svg>';
var playerTime  = 230;
var machineTime = 270;
var alertAFK;
var afterClickAlertAFK;
var green  = new Quadrant(greenQuadrantIDs,'green','#7BFF91','#45D655');
var red    = new Quadrant(redQuadrantIDs,'red','#F68163','#DC3B22');
var yellow = new Quadrant(yellowQuadrantIDs,'yellow','#FFFDA9','#E1D934');
var blue   = new Quadrant(blueQuadrantIDs,'blue','#4FEEFF','#00A8F1');

$('.main__simon-bt-mode').click(function () {
  resetSimonData(simonData);
  $(".td").css("pointer-events", "none");
  $('.main__simon-bt-mode').data('mode') === 's' ? $('.main__simon-bt-mode').data('mode' , 'n').text('N').css('color', '#00A8F1') : $('.main__simon-bt-mode').data('mode' , 's').text('S').css('color', '#DC3B22');
  $('.main__simon-bt-play').text('');
  $('.main__simon-bt-play').append(playIcon);
  $('.main__simon-bt-play').css("pointer-events", "auto");
  clearTimeout(alertAFK);
  clearTimeout(afterClickAlertAFK);
});

function simonOnClick(simonData) {
  if (simonData.click === false) {
    simonData.click = true;
    $(greenQuadrantIDs).on('click', function() {
      $(".td").css("pointer-events", "none");
      green.activate(playerTime);
      simonData.clickCount++;
      clearTimeout(alertAFK);
      clearTimeout(afterClickAlertAFK);
      afterClickAlertAFK = setTimeout(function(){ playerMistake(simonData); }, 5000);
      checkGameStatus(simonData, green);
    });
    $(redQuadrantIDs).on('click', function() {
      $(".td").css("pointer-events", "none");
      red.activate(playerTime);
      simonData.clickCount++;
      clearTimeout(alertAFK);
      clearTimeout(afterClickAlertAFK);
      afterClickAlertAFK = setTimeout(function(){ playerMistake(simonData); }, 5000);
      checkGameStatus(simonData, red);
    });
    $(yellowQuadrantIDs).on('click', function() {
      $(".td").css("pointer-events", "none");
      yellow.activate(playerTime);
      simonData.clickCount++;
      clearTimeout(alertAFK);
      clearTimeout(afterClickAlertAFK);
      afterClickAlertAFK = setTimeout(function(){ playerMistake(simonData); }, 5000);
      checkGameStatus(simonData, yellow);
    });
    $(blueQuadrantIDs).on('click', function() {
      $(".td").css("pointer-events", "none");
      blue.activate(playerTime);
      simonData.clickCount++;
      clearTimeout(alertAFK);
      clearTimeout(afterClickAlertAFK);
      afterClickAlertAFK = setTimeout(function(){ playerMistake(simonData); }, 5000);
      checkGameStatus(simonData, blue);
    });
  }
}

function simonManager(s) {
  $(".td").css("pointer-events", "none");
  $('#simon-play-svg').css('display', 'none');
  resetSimonData(s);
  setScore(s);
  machineTurn(s);
}

function setScore(s) {
  currentRound = s.machineStreak.length + 1;
  function n(n) {
    return n > 9 ? "" + n: "0" + n;
  }
  $('.main__simon-bt-play').text(n(currentRound));
}

function playerTurn(s) {
  alertAFK = setTimeout(function(){ playerMistake(s); }, 5000);
  s.playerStreak  = [];
  s.playerFail = false;
  setTimeout(function() {
    if ($('.main__simon-bt-play').text()) {
      $(".td").css("pointer-events", "auto");
    }
  }, machineTime * 2 * s.machineStreak.length);
}

function checkGameStatus(s, quadrant) {
  if (s.machineStreak[s.clickCount - 1].colorName === quadrant.colorName) {
    playerScore(s, quadrant);
  } else {
      playerMistake(s);
    }
}

function playerScore(s, quadrant) {
  if(s.clickCount === s.maxTurns) {
    winEvent();
    $('.main__simon-bt-play').css("pointer-events", "auto");
    clearTimeout(afterClickAlertAFK);
    clearTimeout(alertAFK);
    return;
  } else {
    $(".td").css("pointer-events", "auto");
    }

  s.playerStreak.push(quadrant);
  if (s.machineStreak.length === s.clickCount) {
    setTimeout(function () {
      machineTurn(s);
    }, playerTime / 2);
  }
}

function winEvent() {
  document.getElementById('win').play();
  $('.main__simon-bt-play').text('');
  $('.main__simon-bt-play').append(playIcon);
  $('html').css('backgroundImage', "url(http://res.cloudinary.com/dt4qeehms/image/upload/v1488934896/427118_1_n0wxq7.jpg)");
  $('body').fadeOut("slow", function () {
      $('body').css({display:"none"});
  });
  setTimeout(function () {
    $('body').fadeIn("slow", function () {
      $('body').css({display:"block"});
    });
    $('html').css('backgroundImage', "none");
  }, machineTime * 7);
}

function playerMistake(s) {
  $(".td").css("pointer-events", "none");
  s.playerFail = true;
  setTimeout(function () {
    mistakeEvent();
    if ($('.main__simon-bt-mode').data('mode') === 'n') {
      setTimeout(function () {
      machineTurn(s);
      }, machineTime * 2);
    } else {
      setTimeout(function () {
        $('.main__simon-bt-play').text('');
        $('.main__simon-bt-play').append(playIcon);
        $('.main__simon-bt-play').css("pointer-events", "auto");
        clearTimeout(afterClickAlertAFK);
        clearTimeout(alertAFK);
      }, machineTime * 2);
      return;
    }
  }, playerTime * 1.5);
}

function mistakeEvent() {
  document.getElementById('lose').play();
  green.activate(playerTime * 1.4, false);
  red.activate(playerTime * 1.4, false);
  yellow.activate(playerTime * 1.4, false);
  blue.activate(playerTime * 1.4, false);
}

function machineTurn(s) {
  $(".td").css("pointer-events", "none");
  clearTimeout(afterClickAlertAFK);
  clearTimeout(alertAFK);
  setTimeout(function() {
    s.clickCount = 0;
    if(!s.playerFail) {
      setScore(s);
      pushNewColor(s.machineStreak);
    }
    activateAllColorsStreak(s.machineStreak);
    playerTurn(s);
  }, machineTime * 2);
}

function pushNewColor(streak) {
  var colors = [green, red, yellow, blue];
  streak.push(colors[Math.floor(Math.random()*colors.length)]);
}

function Quadrant(IDs, colorName, hexLight, hexDark) {
  var that = this;
  this.IDs              = IDs;
  this.colorName        = colorName;
  this.hexLight         = hexLight;
  this.hexDark          = hexDark;
  this.activate = function(time, playAudio) {
    playAudio = (typeof playAudio !== 'undefined') ?  playAudio : true;
    if (playAudio) {
      var audio = document.getElementById(this.colorName);
      audio.currentTime = 0;
      audio.play();
    }
    $(this.IDs).css('background-color', this.hexLight);
    setTimeout(function() {
      $(that.IDs).css('background-color', that.hexDark);
    }, time);
  };
}

function activateAllColorsStreak(streak) {
  for (var i = 0; i < streak.length; i++) {
    setTimeout(function(j) {
      streak[j].activate(machineTime, true);
    }, i * machineTime * 2, i);
  }
}

function resetSimonData(s) {
  s.machineStreak = [];
  s.playerStreak = [];
  s.clickCount = 0;
  s.playerFail = false;
}
