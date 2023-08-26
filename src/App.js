import React, { useState, useEffect } from 'react';
import './App.css';
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

		//Send a POST request to the server with the square value as the request body
		fetch('/move', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ square: square }),
		})
			.then((response) => response.json())
			.then((data) => {
				//Update the game state based on the response from the server
				setBoard(data.board);
				setPlayer(data.player);
				setResult(data.result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	//Check if there is a winner
	const checkWin = () => {
		//Send a GET request to the server to check if there is a winner
		fetch('/check-win')
			.then((response) => response.json())
			.then((data) => {
				//If a winner is found, update the Result's winnin player and state to won.
				if (data.winner != 'none') {
					setResult({ winner: data.winner, state: 'Won' });
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	//Check if there is a draw
	const checkIfTie = () => {
		//Send a GET request to the server to check if there is a draw
		fetch('/check-tie')
			.then((response) => response.json())
			.then((data) => {
				//If all the squares are filled and no winner then its a draw
				if (data.state == 'Tie') {
					setResult({ winner: 'No One', state: 'Tie' });
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	//Restart game on win or draw
	const restartGame = () => {
		//Send a GET request to the server to restart the game
		fetch('/restart')
			.then((response) => response.json())
			.then((data) => {
				//Reset the board to the initial empty state
				setBoard(data.board);
				//Set first player to 'O'
				setPlayer('O');
				setWinner(false);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
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
