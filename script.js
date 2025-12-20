const gameBoard = (function () {
  let board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ];

  let state = "ONGOING";
  let turn = 0;
  let winner;
  let player1;
  let player2;

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

  const updateState = (symbol) => {
    if (checkDiagonals() || checkColumns() || checkRows()) {
      state = "END";
      if (player1.symbol == symbol) {
        displayController.showWinner(player1)
      } else {
        displayController.showWinner(player2)
      }
    } else if (isBoardFull()) {
      state = "DRAW";
      displayController.showDraw();
    }
  }

  const updateBoard = (position, symbol) => {
    board[position.row][position.col] = symbol;
    updateState();
  };

  const updateTurn = () => {
    turn += 1;
  }

  const checkColumns = () => {
    for (let i = 0; i < board.length; i++) {
      let first = board[0][i];
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

  const setPlayers = (p1, p2) => {
    player1 = p1;
    player2 = p2;
  }
  const getState = () => state;

  const getBoard = () => board;

  const getTurn = () => turn;

  return { 
    isPlayable, 
    updateBoard, 
    updateTurn,
    setPlayers,
    getState, 
    getBoard, 
    getTurn
  };
})();


function player (player_name, player_symbol) {
  const name = player_name;
  const symbol = player_symbol;

  return { name, symbol};
}

const displayController = (function () {
  const rows = document.getElementsByClassName("row");

  const addElement = (event) => {
    let column = event.target;
    let row = column.parentNode;
    let position = {
      row: parseInt(row.dataset.row),
      col: parseInt(column.dataset.column),
    }
    let symbol = "";
    if (gameBoard.isPlayable(position)) {
      const newElement = document.createElement('img');
      if (gameBoard.getTurn() % 2 == 0) {
        newElement.src = "./ex.svg";
        symbol = 'X';
      } else {
        newElement.src = "./circle.svg";
        symbol = 'O';
      }
      column.appendChild(newElement);
      gameBoard.updateBoard(position, symbol);
      gameBoard.updateTurn()
    } else {
      console.error("Error: you can't play on this postion");
    }
  }

  for (let row of rows) {
    for (let col of row.children) {
      col.addEventListener("click", addElement);
    }
  }

  const showWinner = (player) => {
    alert(`${player.name} won the game!`);
  }

  const showDraw = () => alert("It's a draw!"); 

  return { showWinner, showDraw };

})();

const playGame = (function () {
  const player1 = player("Jhon", "X");
  const player2 = player("Doe", "O");

  gameBoard.setPlayers(player1, player2);
})();