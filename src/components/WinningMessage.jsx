import React from 'react';

function WinningMessage() {
	return (
		<div class='winning-message' id='winningMessage'>
			<div data-winning-message-text></div>
			<button id='restartButton'>Restart</button>
		</div>
	);
}

export default WinningMessage;
