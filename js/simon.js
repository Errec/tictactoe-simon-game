var greenQuadrantIDs  = '#td-11, #td-12, #td-13, #td-21, #td-22, #td-23, #td-31, #td-32, #td-33';
var redQuadrantIDs    = '#td-14, #td-15, #td-16, #td-24, #td-25, #td-26, #td-34, #td-35, #td-36';
var yellowQuadrantIDs = '#td-41, #td-42, #td-43, #td-51, #td-52, #td-53, #td-61, #td-62, #td-63';
var blueQuadrantIDs   = '#td-44, #td-45, #td-46, #td-54, #td-55, #td-56, #td-64, #td-65, #td-66';
var playerTime  = 230;
var machineTime = 270;
var green  = new quadrant(greenQuadrantIDs,'green','#7BFF91','#45D655');
var red    = new quadrant(redQuadrantIDs,'red','#F68163','#DC3B22');
var yellow = new quadrant(yellowQuadrantIDs,'yellow','#FFFDA9','#E1D934');
var blue   = new quadrant(blueQuadrantIDs,'blue','#4FEEFF','#00A8F1');

$('.main__simon-bt-mode').click(function () {
  resetData(simonData);
  $(".td").css("pointer-events", "none");
  $('.main__simon-bt-mode').data('mode') === 's' ? $('.main__simon-bt-mode').data('mode' , 'n').text('N').css('color', '#00A8F1') : $('.main__simon-bt-mode').data('mode' , 's').text('S').css('color', '#DC3B22');

  $('.main__simon-bt-play').css("pointer-events", "auto");
});

$(greenQuadrantIDs).click(function() {
  green.activate(playerTime);
  simonData.clickCount++;
  $(".td").css("pointer-events", "none");
  checkGameStatus(simonData, green);
});
$(redQuadrantIDs).click(function() {
  red.activate(playerTime);
  simonData.clickCount++;
  $(".td").css("pointer-events", "none");
  checkGameStatus(simonData, red);
});
$(yellowQuadrantIDs).click(function() {
  yellow.activate(playerTime);
  simonData.clickCount++;
  $(".td").css("pointer-events", "none");
  checkGameStatus(simonData, yellow);
});
$(blueQuadrantIDs).click(function() {
  blue.activate(playerTime);
  simonData.clickCount++;
  $(".td").css("pointer-events", "none");
  checkGameStatus(simonData, blue);
});

function simonManager(s) {
  $('#simon-play-svg').css('display', 'none');
  setScore(s);
  $(".td").css("pointer-events", "none");
  resetData(s);
  machineTurn(s);
}

function setScore(s) {
  currentRound = s.machineStreak.length;
  function n(n) {
    return n > 9 ? "" + n: "0" + n;
  }
  $('.main__simon-bt-play').text(n(currentRound));
}

function playerTurn(s) {
  s.playerStreak  = [];
  s.playerFail = false;
  setTimeout(function() {
    $(".td").css("pointer-events", "auto");
  }, machineTime * 2 * s.machineStreak.length);
}

function checkGameStatus(s, quadrant) {
  if (s.machineStreak[s.clickCount - 1].colorName === quadrant.colorName) {
    if(s.clickCount === s.maxTurns) {
      document.getElementById('win').play();
      $('html').css('backgroundImage', "url(http://res.cloudinary.com/dt4qeehms/image/upload/v1488934896/427118_1_n0wxq7.jpg)");
      $('body').fadeOut("slow", function () {
          $('body').css({display:"none"});
      });
      $('.main__simon-bt-play').css("pointer-events", "auto");
      setTimeout(function () {
        $('body').fadeIn("slow", function () {
          $('body').css({display:"block"});
        });
        $('html').css('backgroundImage', "none");
      }, machineTime * 7);
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
  } else {
      s.playerFail = true;
      setTimeout(function () {
        document.getElementById('lose').play();
        green.activate(playerTime * 2, false);
        red.activate(playerTime * 2, false);
        yellow.activate(playerTime * 2, false);
        blue.activate(playerTime * 2, false);

        if ($('.main__simon-bt-mode').data('mode') === 'n') {
          machineTurn(s);
        } else {
          setTimeout(function () {
            alert('you lose!');
            $('.main__simon-bt-play').css("pointer-events", "auto");
          }, machineTime * 2);
          return;
        }
      }, playerTime * 1.5);
    }
}

function machineTurn(s) {
  setScore(s);
  setTimeout(function() {
    s.clickCount = 0;
    if(!s.playerFail) {
      pushNewColor(s.machineStreak);
    }
    activateAllColorsStreak(s.machineStreak);
    playerTurn(s);
  }, machineTime * 3);
}

function pushNewColor(streak) {
  var colors = [green, red, yellow, blue];
  streak.push(colors[Math.floor(Math.random()*colors.length)]);
}

function quadrant(IDs, colorName, hexLight, hexDark) {
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

function resetData(s) {
  s.machineStreak = [];
  s.playerStreak = [];
  s.clickCount = 0;
  s.playerFail = false;
}
