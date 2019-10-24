import React, { Component } from 'react';
import TTTMenu from './TTTMenu';
import TTTGrid from './TTTGrid';
import TTTLabels from './TTTLabels';

class TTTController extends Component {
  render() {
    return (
      <div id="TTT">
        <TTTMenu
          onTTTResize={this.resizeGame}
          onTTTRestart={this.restartGame} />
        <TTTLabels
          user={this.props.userSymbol}
          helper={this.props.helperSymbol} />
      </div>
    )
  }
}

export default TTTController;