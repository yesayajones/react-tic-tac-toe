import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
//import the square component
import Square from './components/Square';
//import the pattern on winning combination
import { Patterns } from './Patterns';
import Board from './components/Board';

function App() {
	//create an empty board set array
	const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
	//begin with player o and swap players on game load
	const [player, setPlayer] = useState('O');
	//set the initial state of the result before any wins or draws
	const [result, setResult] = useState({ winner: 'none', state: 'none' });
	//check if someone won
	const [winner, setWinner] = useState(false);
	//winning message
	const [message, setMessage] = useState('');

	//when there is change in board state, call checkWin and CheckIfTie in the case of a draw
	useEffect(() => {
		checkWin();
		checkIfTie();

		//swap players on board state change
		if (player == 'X') {
			setPlayer('O');
		} else {
			setPlayer('X');
		}
	}, [board]);

	//if the is change in result state from none, announce the game result
	useEffect(() => {
		if (result.state != 'none') {
			// alert(`Game Finished! Winning Player: ${result.winner}`);
			setMessage(`Game Finished! Winning Player: ${result.winner}`);
			setWinner(true);
		}
	}, [result]);

	//Function to go through the board array
	//If the chosen square is empty, assign it the valuse of current player
	//Else, return the current value of that square
	const chooseSquare = (square) => {
		setBoard(
			board.map((val, idx) => {
				if (idx == square) {
					if (val == '') {
						return player;
					} else {
						setPlayer((prev) => {
							if (prev === 'X') return 'O';
							else {
								return 'X';
							}
						});
					}
				}

				return val;
			})
		);
	};

	//Check if there is a winner
	const checkWin = () => {
		Patterns.forEach((currPattern) => {
			const firstPlayer = board[currPattern[0]];
			//if no move has been made, don't check for winner
			if (firstPlayer == '') return;
			let foundWinningPattern = true;
			//If any of the squares player is not part of the winning combination, then no winner yet.
			currPattern.forEach((idx) => {
				if (board[idx] != firstPlayer) {
					foundWinningPattern = false;
				}
			});

			//If a winner is found, update the Result's winninng player and state to won.
			if (foundWinningPattern) {
				setResult({ winner: player, state: 'Won' });
			}
		});
	};

	//Check if there is a draw
	const checkIfTie = () => {
		let filled = true;
		//If any of the squares is empty, then there can not be a draw
		board.forEach((square) => {
			if (square == '') {
				filled = false;
			}
		});

		//If all the squares are filled and no winner then its a draw
		if (filled) {
			setResult({ winner: 'No One', state: 'Tie' });
		}
	};

	//Restart game on win or draw
	const restartGame = () => {
		//Reset the board to the initial empty state
		setBoard(['', '', '', '', '', '', '', '', '']);
		//Set first player to 'O'
		setPlayer('O');
		setWinner(false);
	};

	return (
		<div className='App'>
			<Board board={board} chooseSquare={chooseSquare} />
			{winner && (
				<div className='winning-message'>
					<h3>{message}</h3>
					<button id='restartButton' onClick={restartGame}>
						Restart
					</button>
				</div>
			)}
		</div>
	);
}

export default App;
