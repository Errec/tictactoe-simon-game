  var winArr = [['T1', 'T2', 'T3'],
                ['M1', 'M2', 'M3'],
                ['B1', 'B2', 'B3'],
                ['T1', 'M2', 'B3'],
                ['T1', 'M1', 'B1'],
                ['T2', 'M2', 'B2'],
                ['T3', 'M3', 'B3'],
                ['B1', 'M2', 'T3']];

var tttData = {
  openSpots    : 9,
  xType        : 'human',
  oType        : 'machine',
  playerTurn   : 'x',
  playerXSpots : [],
  playerOSpots : [],
  click        : false,
  score        : {
    humanX   : 0,
    humanO   : 0,
    machineX : 0,
    machineO : 0
  }
};

var simonData = {
  machineStreak : [],
  playerStreak  : [],
  playerFail    : false,
  clickCount    : 0,
  maxTurns      : 3,
  click         : false
};

$(document).ready(function() {
  $('.btn-wrapper__left-bt--click').on('click', function() {
    $('.btn-wrapper__right-bt').addClass('header__button').removeClass('btn-wrapper__right-bt--click').css({top : '2vh', width: '40px', height: '40px'});
    $('.btn-wrapper__left-bt--click').fadeOut(200);
    displayTTT(tttData, simonData);
    setGameBtnClick();
    $(this).data('game', 's');
  });

  $('.btn-wrapper__right-bt--click').on('click', function() {
    $('.btn-wrapper__left-bt').addClass('header__button').removeClass('btn-wrapper__left-bt--click').css({top : '2vh', width: '40px', height: '40px'});
    $('.btn-wrapper__right-bt--click').fadeOut(200);
    displaySimon(tttData, simonData);
    setGameBtnClick();
    $(this).data('game', 't');
  });

  function setGameBtnClick() {
    $('.header__button').off();
    $('.header__button').on('click', function () {
      if ($(this).data('game') === 't') {
        $(this).css('background-image','url(../img/tttbt.svg)');
        displaySimon(tttData, simonData);
      } else {
          $(this).css('background-image','url(../img/simonbt.svg)');
          displayTTT(tttData, simonData);
        }
    });
  }


  $('.main__simon-bt-play').click(function() {
    $('#simon-play-svg').css('display', 'none');
    $(this).css("pointer-events", "none");
    simonManager(simonData);
  });
});

function displaySimon(tttData, simonData) {
  $('.td').css('pointer-events', 'none');
  tttData.xType = 'human';
  tttData.oType = 'machine';
  setTimeout(function () {
    tttData.openSpots    = 9;
    tttData.playerTurn   = 'x';
    tttData.playerXSpots = [];
    tttData.playerOSpots = [];
    tttData.click        = false;
    $('.main__ttt-bt-x-img').attr('src', 'img/human.jpeg');
    $('.main__ttt-bt-o-img').attr('src', 'img/pc.png');
    $('.tr').find('.x').remove();
    $('.tr').find('.o').remove();
  }, 700);
  $('.header__button').data('game', 's');
  $('.main').css('display', 'flex');
  $('.ttt').fadeOut(500);
  $('.simon').fadeIn(500);
  $('.main-wrapper').fadeIn(1200);
  $('.ttt-l').css('border-left', 'none');
  $('.ttt-b').css('border-bottom', 'none');
  $('.simon-l').css('border-left', 'solid black 5px');
  $('.simon-b').css('border-bottom', 'solid black 5px');
  $('.main__table').css('width', '300px').css('height', '300px');
  $(greenQuadrantIDs).css('background-color', '#45D655');
  $(redQuadrantIDs).css('background-color', '#DC3B22');
  $(yellowQuadrantIDs).css('background-color', '#E1D934');
  $(blueQuadrantIDs).css('background-color', '#00A8F1');
  $('.td').off();
  simonOnClick(simonData);
}

function displayTTT(tttData, simonData) {
  simonData.machineStreak = [];
  simonData.playerStreak  = [];
  simonData.playerFail    = false;
  simonData.clickCount    = 0;
  simonData.maxTurns      = 3;
  simonData.click         = false;
  $(".td").css("pointer-events", "auto");
  clearTimeout(afterClickAlertAFK);
  clearTimeout(alertAFK);
  $('.main__simon-bt-play').text('');
  $('.main__simon-bt-play').append(playIcon);
  $('.main__simon-bt-play').css("pointer-events", "auto");
  $('.header__button').data('game', 't');
  $('.main').css('display', 'flex');
  $('.simon').fadeOut(500);
  $('.ttt').fadeIn(500);
  $('.main-wrapper').fadeIn(1500);
  $('.simon-l').css('border-left', 'none');
  $('.simon-b').css('border-bottom', 'none');
  $('.ttt-l').css('border-left', 'solid white 2px');
  $('.ttt-b').css('border-bottom', 'solid white 2px');
  $('.main__table').css('width', '220px').css('height', '220px');
  $('.td').css('background-color', 'transparent');
  $('.td').off();
  tttOnClick(tttData);
}
