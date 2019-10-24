import React, { Component } from 'react';

/***** secondary component: TTTMenu *****/
class TTTMenu extends Component {
	onTTTResize(e) {
		this.props.onTTTResize(e.target.value);
	}
	onTTTRestart() {
		let confirmRestart = window.confirm("Are you sure you wish to restart this game?");
		if (confirmRestart) {
			this.props.onTTTRestart();
		}
	}
	render() {
		let options = [3, 4, 5, 6].map((value, index) =>
			<option key={index} value={value}>{value}</option>
		);
		return (
			<menu id="TTTMenu">
				<menu-item class="resize">
					<select onChange={this.onTTTResize}>{options}</select>
					squares per row
				</menu-item>
				<menu-item class="restart">
					<a href="#" onClick={this.onTTTRestart}>Start New Game</a>
				</menu-item>
			</menu>
		);
	}
};

export default TTTMenu;