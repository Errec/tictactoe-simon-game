var greenQuadrant  = '#td-11, #td-12, #td-13, #td-21, #td-22, #td-23, #td-31, #td-32, #td-33';
var redQuadrant    = '#td-14, #td-15, #td-16, #td-24, #td-25, #td-26, #td-34, #td-35, #td-36';
var yellowQuadrant = '#td-41, #td-42, #td-43, #td-51, #td-52, #td-53, #td-61, #td-62, #td-63';
var blueQuadrant   = '#td-44, #td-45, #td-46, #td-54, #td-55, #td-56, #td-64, #td-65, #td-66';

$(greenQuadrant).click(function() {
  $(greenQuadrant).css('background-color', '#7BFF91');
  setTimeout(function () {
    $(greenQuadrant).css('background-color', '#45D655');
  }, 200);
});
$(redQuadrant).click(function() {
  $(redQuadrant).css('background-color', '#F68163');
  setTimeout(function () {
    $(redQuadrant).css('background-color', '#DC3B22');
  }, 200);
});
$(yellowQuadrant).click(function() {
  $(yellowQuadrant).css('background-color', '#FFFDA9');
  setTimeout(function () {
    $(yellowQuadrant).css('background-color', '#E1D934');
  }, 200);
});
$(blueQuadrant).click(function() {
  $(blueQuadrant).css('background-color', '#4FEEFF');
  setTimeout(function () {
    $(blueQuadrant).css('background-color', '#00A8F1');
  }, 200);
});

function simonManager (clickedSpot) {
  var spotGroup = convertSpotToColor(clickedSpot);
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
