function simonManager (clickedSpot) {
    var spotGroup = convertSpotToColor(clickedSpot);
}

function convertClickedSpot(p) {
  switch (p) {
    case 'td-11':
    case 'td-12':
    case 'td-13':
    case 'td-21':
    case 'td-22':
    case 'td-23':
    case 'td-31':
    case 'td-32':
    case 'td-33':
      return {td:'#td-11, #td-12, #td-13, #td-21, #td-22, #td-23, #td-31, #td-32, #td-33',color:'green'};
    case 'td-14':
    case 'td-15':
    case 'td-16':
    case 'td-24':
    case 'td-25':
    case 'td-26':
    case 'td-34':
    case 'td-35':
    case 'td-36':
      return {td:'#td-14, #td-15, #td-16, #td-24, #td-25, #td-26, #td-34, #td-35, #td-36',color:'red'};
    case 'td-41':
    case 'td-42':
    case 'td-43':
    case 'td-51':
    case 'td-52':
    case 'td-53':
    case 'td-61':
    case 'td-62':
    case 'td-63':
      return {td:'#td-41, #td-42, #td-43, #td-51, #td-52, #td-53, #td-61, #td-62, #td-63',color:'yellow'};
    case 'td-44':
    case 'td-45':
    case 'td-46':
    case 'td-54':
    case 'td-64':
    case 'td-55':
    case 'td-56':
    case 'td-65':
    case 'td-66':
      return {td:'#td-44, #td-45, #td-46, #td-54, #td-55, #td-56, #td-64, #td-65, #td-66',color:'blue'};
  }
}
