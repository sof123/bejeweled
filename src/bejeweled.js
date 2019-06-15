var shapeToImageUrl = {
  jewel: "https://vignette.wikia.nocookie.net/bejeweled/images/0/05/Bejeweled_Blue_Gem.png",
  silverOctagon: "https://vignette.wikia.nocookie.net/bejeweled/images/8/85/Bejeweled_White_Gem.png/revision/latest?cb=20160328181310",
  triangle: "https://vignette.wikia.nocookie.net/bejeweled/images/5/5f/Bejeweled_Purple_Gem.png/revision/latest?cb=20160328181213",
  greenOctagon: "https://vignette.wikia.nocookie.net/bejeweled/images/7/77/Bejeweled_Green_Gem.png/revision/latest?cb=20160328181039",
  diamond: "https://vignette.wikia.nocookie.net/bejeweled/images/1/19/Bejeweled_Yellow_Gem.png/revision/latest?cb=20160328180956",
  hexagon: "https://vignette.wikia.nocookie.net/bejeweled/images/d/d7/Bejeweled_Orange_Gem.png/revision/latest?cb=20160328180752",
  square: "https://vignette.wikia.nocookie.net/bejeweled/images/2/28/Bejeweled_Red_Gem.png/revision/latest?cb=20160328180521"
};
var board = [];
function generateBoard(numRows, numColumns){
  var table = document.getElementById("bejeweledTable");
  for (var row = 0; row < numRows; row++){
    var tr = document.createElement('tr');
    //init row
    board[row] = [];
    for (var column = 0; column < numColumns; column++){
      var td = document.createElement('td');
      var image = document.createElement('img');
      board[row][column] = generateTile(board, row, column);
      image.src = shapeToImageUrl[board[row][column]];
      td.appendChild(image);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

function printBoard(theBoard, numRows, numColumns){
  printedBoard = "";
  for (var row = 0; row < numRows; row++){
    for (var column = 0; column < numColumns; column++){
      printedBoard += theBoard[row][column] + " "
    }
    printedBoard += '\n'
  }
  console.log(printedBoard)
}

function generateTile(theBoard, row, column){
  possibles = ["jewel", "silverOctagon", "triangle", "greenOctagon", "diamond",
    "hexagon", "square"
  ]
  index = Math.floor(Math.random() * 7);
  hasPlayableMove = false;
  
  //don't want to generate three in a row
  while (wouldMakeThreeInARow(possibles[index], theBoard, row, column)){
    index = Math.floor(Math.random() * 7);
  }

  // create one playableMove
  if (!hasPlayableMove && canCreateOneMove(theBoard, row, column)){
    wouldCreateOneMoveFlag = wouldCreateOneMove(possibles[index], theBoard, row, column);
    while(!wouldCreateOneMove ||
    wouldMakeThreeInARow(possibles[index], theBoard, row, column)){
      index = Math.floor(Math.random() * 7);
    }
    hasPlayableMove = true;
  }
  return possibles[index];
}

function wouldMakeThreeInARow(tile, theBoard, row, column){
  if (row >= 2){
    if (theBoard[row-1][column] === tile && theBoard[row-2][column] === tile){
      return true;
    }
  }
  if (column>=2){
    if (theBoard[row][column-1] === tile && theBoard[row][column-2] === tile){
      return true;
    }
  }
  return false;
}

function wouldCreateOneMove(tile, theBoard, row, column){
  if (row >= 3){
    if (theBoard[row-2][column] === tile && theBoard[row-3][column] === tile){
      return true;
    }
  }

  if (column >= 3){
    if (theBoard[row][column-2] === tile && theBoard[row][column-3] === tile){
      return true;
    }
  }

  return false;
}

function canCreateOneMove(theBoard, row, column){
  if (row >= 3){
    if (theBoard[row-2][column] === theBoard[row-3][column]){
      return true;
    }
  }
  if (column >= 3){
    if (theBoard[row][column-2] == theBoard[row][column-3]){
      return true;
    }
  }
  return false;
}

generateBoard(8,8);
