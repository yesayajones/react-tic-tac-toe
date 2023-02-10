import React from 'react';
import { useState } from 'react';
import Board from './components/Board';
import WinningMessage from './components/WinningMessage';

function App() {
	return (
		<>
			<Board />
			<WinningMessage />
		</>
	);
}

export default App;
