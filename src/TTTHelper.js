class TTTHelper {
  constructor() {
    // default player symbols, which can be overriden using 'setPlayerSymbols' function
    this.helper = 'O';  // 'helper' - refers to TTTHelper, the JS object that serves as the 'brain' of the game
    this.user   = 'X';  // 'user' - refers to the human opponent playing the game
  }
  /*** determine which square the Helper will pick, based on the array of squares passed to it ***/
  getSquare(squares) {
    /*
      This object was initially created with:
      (1) the assumption that this game would always be 3x3, and
      (2) the requirement that the user will never beat the game (played by a JS object known as 'TTTHelper').

      For this newly-revised TTTDeluxe web app, the row size can be anywhere from 3 to 6 squares.
      For 3x3 games, I have preserved the original algorithm that prevents TTTHelper from ever losing,
      but I was not asked to keep this requirement for larger grids.  That said, I have implemented some
      degree of reasoning for determining TTTHelper's moves for larger grids.

      Algorithms for 3x3 strategy taken from this URL:
      https://www.quora.com/Is-there-a-way-to-never-lose-at-Tic-Tac-Toe/answer/Arjun-Subramaniam

      Assumption: the user always goes first.
    */
    this.squares = squares;

    /* first move */
    if (this.getMoveCount() === 0) {
      if (this.centerPosition && !squares[this.centerPosition]) {
        return this.centerPosition;  // if there is a center square and the user hasn't already taken it, grab the center
      } else {
        return this.getAvailableCorner(); // if the user has already taken the center or there is no center square, take an available corner
      }
    }
    /* second move */
    else if (this.getMoveCount() === 1) {
      /* to block the user from a win... */
      let attackOrDefenseSquare = this.getAttackOrDefenseSquare();
      if (attackOrDefenseSquare !== null) {
        return attackOrDefenseSquare;  // take whatever square you need to block the user
      }
      /* for 3x3 only: check for diagonal patterns and select a square based on pattern */
      else if (this.rowSize === 3) {
        switch(this.getDiagonalRowPattern()) {
          case 'XOX':
            let edges = [1, 3, 5, 7];
            let index = Math.floor(Math.random() * 4);
            return edges[index];  // take an edge square
          case 'XXO':
            return this.getAvailableCorner(); // take an available corner
          case 'XO_':
            let userCornerIndex;
            let corners = this.cornerPositions;
            for (let i = 0; i < corners.length; i++) {
              if (this.squares[corners[i]] === this.user) {
                userCornerIndex = i;
                break;
              }
            }
            return corners.reverse()[userCornerIndex]; // take the opposite corner from the user
          default:
            return this.getRandomSquare();  // take a random available square
        }
      }
      /* for grids larger than 3x3: take any available corner */
      else {
        return this.getAvailableCorner();
      }
    }
    /* subsequent moves */
    else {
      let attackOrDefenseSquare = this.getAttackOrDefenseSquare();
      return (attackOrDefenseSquare !== null) ? attackOrDefenseSquare : this.getRandomSquare();  // check to see if you can attack or need to defend - if not, then take random square
    }
  }
  /*** choose square based on whether there's an opportunity to fill the whole row, or a need to block the user from filling the row ***/
  getAttackOrDefenseSquare() {
    let defensiveSquare = null;
    for (let i in this.allRows) {
      let helperSquareCount = 0, userSquareCount = 0, emptySquare = null;
      let row = this.allRows[i];
      let squaresInRow = row.map((index) => this.squares[index]);
      for (let j = 0; j < squaresInRow.length; j++) {
        if (squaresInRow[j] === this.helper) { helperSquareCount++; }
        if (squaresInRow[j] === this.user) { userSquareCount++; }
        if (squaresInRow[j] === null) { emptySquare = row[j]; }
      }
      // if the helper has almost filled a row and the last square is empty...
      if (helperSquareCount === (row.length - 1) && userSquareCount === 0) {
        return emptySquare;  // ...take that square immediately and win the game
      }
      // if the user has almost filled a row and the last is empty...
      else if (helperSquareCount === 0 && userSquareCount === (row.length - 1)) {
        defensiveSquare = defensiveSquare || emptySquare;  // hang on to that square and use it only when we've confirmed there's no winning move
      }
    }
    return defensiveSquare;
  }
  /*** choose an available corner square ***/
  getAvailableCorner() {
    let availableCorners = this.cornerPositions.filter((index) => (this.squares[index] === null));
    let index = Math.floor(Math.random() * availableCorners.length);
    return availableCorners[index]; // take an available corner
  }
  /*** FOR 3x3 GAMES ONLY: when Helper is on its second move, check for diagonal pattern ***/
  getDiagonalRowPattern() {
    let X = this.user, O = this.helper;
    let diagonalRows = this.diagonalRows;
    for (let i = 0; i < diagonalRows.length; i++) {
      let squaresInRow = diagonalRows[i].map((index) => this.squares[index] );
      // check for "XOX" diagonal (where X = user, O = helper)
      if (squaresInRow[0] === X && squaresInRow[1] === O && squaresInRow[2] === X) {
        return 'XOX';
      }
      // check for "XXO/OXX" diagonal (where X = user, O = helper)
      else if ((squaresInRow[0] === X && squaresInRow[1] === X && squaresInRow[2] === O) ||
        (squaresInRow[0] === O && squaresInRow[1] === X && squaresInRow[2] === X)) {
        return 'XXO';
      }
      // check for "_OX/XO_" diagonal (where X = user, O = helper)
      else if ((squaresInRow[0] === null && squaresInRow[1] === O && squaresInRow[2] === X) ||
        (squaresInRow[0] === X && squaresInRow[1] === O && squaresInRow[2] === null)) {
        return 'XO_';
      }
    }
    return null;
  }
  /*** how many moves the Helper has made already ***/
  getMoveCount() {
    let count = 0;
    for (let index in this.squares) {
      if (this.squares[index] === this.helper) {
        count++;
      }
    }
    return count;
  }
  /*** choose any random available square ***/
  getRandomSquare() {
    let emptySquares = [];
    for (let i = 0; i < this.squares.length; i++) {
      if (this.squares[i] === null) {
        emptySquares.push(i);
      }
    }
    let random = Math.floor(Math.random() * emptySquares.length);
    return emptySquares[random];
  }
  /*** override default helper and user symbols with custom symbols if applicable ***/
  setPlayerSymbols(helper, user) {
    this.helper = helper;
    this.user = user;
  }
  /*** update TTTHelper based on row size ***/
  setRowSize(rowSize) {
    this.rowSize = rowSize;
    this.setRowCombinations();
    this.setCenterPosition();
    this.setCornerPositions();
  }
  /*** set row combinations ***/
  setRowCombinations() {
    let rowSize = this.rowSize;
    let allRows = [], diagonalRow1 = [], diagonalRow2 = [];
    for (let i = 0; i < rowSize; i++) {
      // get horizontal and vertical rows
      let horizontalRow = [], verticalRow = [];
      for (let j = 0; j < rowSize; j++) {
        horizontalRow.push(j + (i * rowSize));
        verticalRow.push(i + (j * rowSize));
      }
      allRows.push(horizontalRow);
      allRows.push(verticalRow);
      // diagonal rows
      diagonalRow1.push(i + (rowSize * i));
      diagonalRow2.push( (rowSize - 1) * (i + 1) );
    }
    allRows.push(diagonalRow1);
    allRows.push(diagonalRow2);
    // set row properties
    this.allRows = allRows;
    this.diagonalRows = [diagonalRow1, diagonalRow2];
  }
  /*** set center position index ***/
  setCenterPosition() {
    if (this.rowSize % 2 === 1) {
      this.centerPosition = Math.floor(Math.pow(this.rowSize, 2)/2);
    } else {
      this.centerPosition = null;
    }
  }
  /*** set corner position indices ***/
  setCornerPositions() {
    this.cornerPositions = [
      0,
      this.rowSize - 1,
      Math.pow(this.rowSize, 2) - this.rowSize,
      Math.pow(this.rowSize, 2) - 1
    ];
  }
}

export default TTTHelper;