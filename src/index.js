import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TTTController from './TTTController';
import TTTHelper from './TTTHelper';

ReactDOM.render(<TTTController userSymbol='X' helperSymbol='O' helper={new TTTHelper()} />,
  document.getElementById('main')
);
