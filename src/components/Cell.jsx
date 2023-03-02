import React from 'react';
import '../App.css';

function Cell({ val, chooseSquare }) {
	return (
		<div className='cell' data-cell onClick={chooseSquare}>
			{val}
		</div>
	);
}

export default Cell;
