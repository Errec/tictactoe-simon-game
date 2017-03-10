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
  $('.header__button').click(function () {
    if ($('.header__button').data('game') === 't') {
      $('.header__button').data('game', 's');
      $('.main').css('display', 'flex');
      $('.ttt').hide();
      $('.simon').show();
      $('.ttt-l').css('border-left', 'none');
      $('.ttt-b').css('border-bottom', 'none');
      $('.simon-l').css('border-left', 'solid black 5px');
      $('.simon-b').css('border-bottom', 'solid black 5px');
      $('.main__table').css('width', '300px').css('height', '300px');
      $(".td").css("pointer-events", "none");
      $(greenQuadrantIDs).css('background-color', '#45D655');
      $(redQuadrantIDs).css('background-color', '#DC3B22');
      $(yellowQuadrantIDs).css('background-color', '#E1D934');
      $(blueQuadrantIDs).css('background-color', '#00A8F1');
      $('.td').off();
      tttData.click = false;
      simonOnClick(simonData);
    } else {
        $('.header__button').data('game', 't');
        $('.main').css('display', 'flex');
        $('.simon').hide();
        $('.ttt').show();
        $('.simon-l').css('border-left', 'none');
        $('.simon-b').css('border-bottom', 'none');
        $('.ttt-l').css('border-left', 'solid white 2px');
        $('.ttt-b').css('border-bottom', 'solid white 2px');
        $('.main__table').css('width', '220px').css('height', '220px');
        $('.td').css('background-color', 'transparent');
        $('.td').off();
        simonData.click = false;
        tttOnClick(tttData);
      }
  });

  $('.main__simon-bt-play').click(function() {
    $('#simon-play-svg').css('display', 'none');
    $('.main__simon-bt-play').css("pointer-events", "none");
    simonManager(simonData);
  });
});
