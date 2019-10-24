import React, { Component } from 'react';

/***** sub-component of TTTGrid: TTTSquare *****/
class TTTSquare extends Component {
	onClickSquare() {
		this.props.onClickSquare(this.props.index);
	}
	getClassNames() {
		if (this.props.inWinningRow) {
			return 'highlight frozen';
		} else if (this.props.symbol) {
			return 'frozen';
		}
		return null;
	}
	render() {
		return <li className={this.getClassNames()} onClick={this.onClickSquare}>{this.props.symbol}</li>;
	}
};

/***** secondary component: TTTGrid *****/
class TTTGrid extends Component {
	inWinningRow(index) {
		return (this.props.winningRow) ? (this.props.winningRow.indexOf(index) !== -1) : false;
	}
	isGameOver() {
		let isGridFilled = true;
		for (let i = 0; i < this.props.squares.length; i++) {
			if (this.props.squares[i] === null) {
				isGridFilled = false;
				break;
			}
		}
		return (this.props.winningRow || isGridFilled);
	}
	getClassNames() {
		let classNames = ['TTTGrid-size-' + this.props.rowSize];
		if (this.isGameOver()) {
			classNames.push('TTTGrid-game-over frozen');
		} else if (this.props.waitingMode) {
			classNames.push('frozen');
		}
		return classNames.join(' ');
	}
	render() {
		let squares = this.props.squares.map((symbol, index) =>
			<TTTSquare
				symbol={symbol}
				key={index}
				index={index}
				inWinningRow={this.inWinningRow(index)}
				onClickSquare={this.props.onClickSquare} />
		);
		return <ul id="TTTGrid" className={this.getClassNames()}>{squares}</ul>;
	}
};

export default TTTGrid;