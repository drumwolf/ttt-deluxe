import React, { Component } from 'react';

/***** secondary component: TTTLabels *****/
class TTTLabels extends Component {
  render() {
    return (
      <div id="TTTLabels">
        <div>
          <b>Player:</b> {this.props.user}
        </div>
        <div>
          <b>Opponent:</b> {this.props.helper}
        </div>
      </div>
    );
  }
};

export default TTTLabels;