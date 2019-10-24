import React, { Component } from 'react';
import TTTMenu from './TTTMenu';
import TTTGrid from './TTTGrid';
import TTTLabels from './TTTLabels';

class TTTController extends Component {
  // component functions (for when TTT game first starts)
  initialRowSize = 3;
  state = this.getStateByRowSize(this.initialRowSize);

  constructor(props) {
    super(props);
    // set custom symbols for players: "user" (the person playing the game) and "helper" (the JS object 'TTTHelper' that serves as the 'brain' of the game)
    let helper = this.props.helperSymbol;
    let user = this.props.userSymbol;
    this.props.helper.setPlayerSymbols(helper, user);
  }
  // custom functions for player moves
  userMoves(index) {
    this.setState({ waitingMode: true });
    this.fillSquare(this.props.userSymbol, index);
    setTimeout(() => {
      this.findWinningRow();
      if (!this.state.winningRow) {
        this.helperMoves();
      }
    }, 500);
  }
  helperMoves() {
    let squares = this.state.squares;
    let newSquare = this.props.helper.getSquare(squares);
    this.fillSquare(this.props.helperSymbol, newSquare);
    this.findWinningRow();
    this.setState({ waitingMode: false });
  }
  // helper method to reset application state based on row size
  getStateByRowSize(rowSize) {
    this.props.helper.setRowSize(rowSize);
    return {
      rowSize: rowSize,
      squares: Array(Math.pow(rowSize, 2)).fill(null),
      waitingMode: false,
      winningRow: null
    }
  }
  // helper methods used by player move functions
  fillSquare(playerSymbol, index) {
    let squares = this.state.squares.slice();
    squares[index] = playerSymbol;
    this.setState({ squares: squares });
  }
  findWinningRow() {
    let winningRow = null;
    let rows = this.props.helper.allRows;
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i];
      let squaresInRow = row.map(index => this.state.squares[index]);
      if (this.isWinningRow(squaresInRow)) {
        this.setState({ winningRow: row });
        break;
      }
    }
  }
  isWinningRow(squaresInRow) {
    if (squaresInRow[0]) {
      for (let i = 1; i < squaresInRow.length; i++) {
        if (squaresInRow[i] !== squaresInRow[0]) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
  // helper methods to reset or resize game
  restartGame() {
    let newState = this.getStateByRowSize(this.state.rowSize);
    this.setState(newState);
  }
  resizeGame(rowSize) {
    let resizedState = this.getStateByRowSize(rowSize);
    this.setState(resizedState);
  }
  // render the React component
  render() {
    return (
      <div id="TTT">
        <TTTMenu
          onTTTResize={this.resizeGame.bind(this)}
          onTTTRestart={this.restartGame.bind(this)} />
        <TTTGrid
          rowSize={this.state.rowSize}
          squares={this.state.squares}
          winningRow={this.state.winningRow}
          waitingMode={this.state.waitingMode}
          onClickSquare={this.userMoves.bind(this)} />
        <TTTLabels
          user={this.props.userSymbol}
          helper={this.props.helperSymbol} />
      </div>
    )
  }
}

export default TTTController;