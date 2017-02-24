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
  xType: 'human',
  oType: 'machine',
  playerTurn   : 'x',
  playerXSpots : [],
  playerOSpots : [],
  score        : {
    humanX: 0,
    humanO: 0,
    machineX: 0,
    machineO: 0
  }
};

$(document).ready(function() {

  // simulate toggle btn
  $('.ttt').hide();
  $('.ttt-l').css('border-left', 'none');
  $('.ttt-b').css('border-bottom', 'none');
  $('.simon-l').css('border-left', 'solid black 2px');
  $('.simon-b').css('border-bottom', 'solid black 2px');
  $('.main__table').css('width', '300px').css('height', '300px');

  $('.td').click(function() {
    if ($('.header__button').data('game') === 't') {
      tttManager(tttData, this.id);
      console.log(tttData);
    } else {
      simonManager(this.id);
    }
  });

});
