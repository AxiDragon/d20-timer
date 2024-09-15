import React, { useState, useEffect } from 'react';
import beep from './audio/beep.mp3';

function Timer({ initialTime }) {
	const [time, setTime] = useState(initialTime);
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		let timer;
		if (isRunning) {
			timer = setInterval(() => {
				setTime(prevTime => Math.max(prevTime - 1, 0));
			}, 1000);
		}
		return () => clearInterval(timer);
	}, [isRunning]);

	useEffect(() => {
		if (time === 0) {
			setIsRunning(false);
			new Audio(beep).play();
		};
	}, [time]);

	const handleStart = () => {
		setIsRunning(true);
	};

	const handleStop = () => {
		setIsRunning(false);
	};

	return (
		<div>
			<h1>Timer</h1>
			<p>{time}</p>
			<button onClick={handleStart}>Start</button>
			<button onClick={handleStop}>Stop</button>
		</div>
	);
}

export default Timer;