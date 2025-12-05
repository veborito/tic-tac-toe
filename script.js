const gameBoard = (function () {
  let board = [
    ["X", " ", " "],
    [" ", "O", " "],
    [" ", " ", "X"]
  ];

  let state = "ONGOING"
    
  const isPlayable = (position) => { 
    if (board[position.row][position.col] == " ") {
      return true;
    } else {
      return false;
    }
  };

  const isBoardFull = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] == " ")
          return false
      }
    }
    return true;
  }

  const updateBoard = (position, symbol) => {
    board[position.row][position.col] = symbol;
  };

  const updateState = (player) => {
    if (checkDiagonals() || checkColumns() || checkRows()) {
      displayController.printWinner(player);
      state = "END";
    } else if (isBoardFull()) {
      displayController.printDraw();
      state = "DRAW";
    }
  }

  const checkColumns = () => {
    for (let i = 0; i < board.length; i++) {
      let first = board[0][i];
      console.log(first);
      if (first != " " && first == board[1][i] && first == board[2][i] ) {
        return true;
      }
    }
    return false;
  }

  const checkRows = () => {
    for (let i = 0; i < board.length; i++) {
      let first = board[i][0];
      if (first != " " && first == board[i][1] && first == board[i][2] ) {
        return true;
      }
    }
    return false;
  }

  const checkDiagonals = () => {
    let center = board[1][1];
    
    if (center == " ")
      return false;

    if (center == board[0][0] && center == board[2][2]){
      return true;
    } else if (center == board[0][2] && center == board[2][0]) {
      return true;
    } else {
      return false;
    }
  };

  const getState = () => state;

  const getBoard = () => board;

  return { isPlayable, updateBoard, updateState,getState, getBoard };

})();


function player (player_name, player_symbol) {
  const name = player_name;
  const symbol = player_symbol;

  const play = (position) => {
    if (gameBoard.isPlayable(position)) {
      gameBoard.updateBoard(position, symbol);
    } else {
      throw("Error: you can't play on this postion");
    }
  }

  return { name, symbol, play};
}

const displayController = (function () {
  const board = gameBoard.getBoard();
  const rows = document.getElementsByClassName("row");

  const render = () => {
    for (let i = 0; i < board.length; i++) {
      let row = rows[i];
      console.log(row);
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] == 'O') {
          const newCircle = document.createElement('img');
          console.log(row[j]);
        }
      }
    }
  }

  const printWinner = (player) => {
    console.log(`${player.name} won the game!`);
  }

  const printDraw = () => console.log("It's a draw!"); 

  return { render, printWinner, printDraw };

})();

const playGame = (function () {
  const player1 = player("Jhon", "X");
  const player2 = player("Doe", "O");

  const round = (player) => {
    let inputRow = parseInt(prompt("Chose a row: "));
    let inputCol = parseInt(prompt("Chose a col: "));
    let position = {
      row: inputRow,
      col: inputCol,
    };

    try{
      player.play(position);
    } catch(error) {
      return false;
    }

    displayController.print();
    gameBoard.updateState(player);
    return true;
  }
  // while (gameBoard.getState() == "ONGOING") {
  //   while (!round(player1));
  //   if (gameBoard.getState() != "ONGOING")
  //     break;
  //   while (!round(player2));
  // }
})();

displayController.render();