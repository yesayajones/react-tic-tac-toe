import React from 'react';
import Square from './Square';

const Board = ({ board, chooseSquare }) => (
	<div className='board'>
		{board.map((square, i) => (
			<Square
				val={square}
				chooseSquare={() => {
					chooseSquare(i);
				}}
			/>
		))}
	</div>
);

export default Board;
