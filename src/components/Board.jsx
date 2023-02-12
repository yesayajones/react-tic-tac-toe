import React from 'react';
import Cell from './Cell';

function Board() {
	return (
		<div className='board' id='board'>
			<Cell />
			<Cell />
			<Cell />
			<Cell />
			<Cell />
			<Cell />
			<Cell />
			<Cell />
			<Cell />
		</div>
	);
}

export default Board;
