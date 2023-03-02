import './App.css';
import { useState, useEffect } from 'react';
//import the square component
import Square from './components/Square';
//import the pattern on winning combination
import { Patterns } from './Patterns';

function App() {
	//create an empty board set array
	const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
	//begin with player o and swap players on game load
	const [player, setPlayer] = useState('O');
	//set the initial state of the result before any wins or draws
	const [result, setResult] = useState({ winner: 'none', state: 'none' });
	//check if someone won
	const [winner, setWinner] = useState(false);

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
			setWinner(true);
		}
	}, [result]);

	//Function to go through the board array
	//If the chosen square is empty, assign it the valuse of current player
	//Else, return the current value of that square
	const chooseSquare = (square) => {
		setBoard(
			board.map((val, idx) => {
				if (idx == square && val == '') {
					return player;
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
			{winner === false && (
				<div className='board'>
					<Square
						// pass the value of the corresponding board array index
						val={board[0]}
						chooseSquare={() => {
							chooseSquare(0);
						}}
					/>
					<Square
						val={board[1]}
						chooseSquare={() => {
							chooseSquare(1);
						}}
					/>
					<Square
						val={board[2]}
						chooseSquare={() => {
							chooseSquare(2);
						}}
					/>
					<Square
						// pass the value of the corresponding board array index
						val={board[3]}
						chooseSquare={() => {
							chooseSquare(3);
						}}
					/>
					<Square
						val={board[4]}
						chooseSquare={() => {
							chooseSquare(4);
						}}
					/>
					<Square
						val={board[5]}
						chooseSquare={() => {
							chooseSquare(5);
						}}
					/>
					<Square
						// pass the value of the corresponding board array index
						val={board[6]}
						chooseSquare={() => {
							chooseSquare(6);
						}}
					/>
					<Square
						val={board[7]}
						chooseSquare={() => {
							chooseSquare(7);
						}}
					/>
					<Square
						val={board[8]}
						chooseSquare={() => {
							chooseSquare(8);
						}}
					/>
				</div>
			)}
			{winner && (
				<div className='winning-message'>
					<h3>The winner is Yesaya</h3>
					<button id='restartButton' onClick={restartGame}>
						Restart
					</button>
				</div>
			)}
		</div>
	);
}

export default App;
