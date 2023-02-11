import React from 'react';
import Cell from './Cell';

function Board() {
	const handleClick = () => {
		console.log('tapped');
	};

	return (
		<div className='board' id='board'>
			<Cell onClick={handleClick} />
			<Cell onClick={handleClick} />
			<Cell onClick={handleClick} />
			<Cell onClick={handleClick} />
			<Cell onClick={handleClick} />
			<Cell onClick={handleClick} />
			<Cell onClick={handleClick} />
			<Cell onClick={handleClick} />
			<Cell onClick={handleClick} />
		</div>
	);
}

export default Board;
