import React from 'react';

function Board() {
	return (
		<div className='board' id='board'>
			//create nine cells
			<div className='cell' data-cell></div>
			<div className='cell' data-cell></div>
			<div className='cell' data-cell></div>
			<div className='cell' data-cell></div>
			<div className='cell' data-cell></div>
			<div className='cell' data-cell></div>
			<div className='cell' data-cell></div>
			<div className='cell' data-cell></div>
			<div className='cell' data-cell></div>
		</div>
	);
}

export default Board;
