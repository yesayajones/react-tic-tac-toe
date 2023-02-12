import React from 'react';
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

const cellElements = document.querySelectorAll('[data-cell]');

const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');

const winningMessageTextElement = document.querySelector(
	'[data-winning-message-text]'
);

const restartButton = document.getElementById('restartButton');

let circleTurn;

function Cell() {
	function handleClick(e) {
		const cell = e.target;
		const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
		placeMark(cell, currentClass);

		if (checkWin(currentClass)) {
			endGame(false);
		} else if (isDraw()) {
			endGame(true);
		} else {
			swapTurns();
			setBoardHoverClass();
		}
	}

	return <div onClick={handleClick} className='cell' data-cell></div>;
}

export default Cell;

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass);
}

function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some((combination) => {
		return combination.every((index) => {
			return cellElements[index].classList.contains(currentClass);
		});
	});
}
