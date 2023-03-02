import React from 'react';
import '../App.css';

function Square({ val, chooseSquare }) {
	return (
		<div className='cell' data-cell onClick={chooseSquare}>
			{val}
		</div>
	);
}

export default Square;
