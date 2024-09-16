import React, { useState, useEffect, useRef } from 'react';
import beep from './audio/beep.mp3';

function Timer({ initialTime }) {
	const [time, setTime] = useState(initialTime * 1000);
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		let latestDate;
		let beepTimeout;
		const handleVisibilityChange = () => {
			if (!isRunning) {
				return;
			}

			if (document.hidden) {
				//user is away
				latestDate = new Date();
				beepTimeout = setTimeout(() => {
					setTime(0);
				}, time);
			} else {
				//user is back
				const diff = new Date() - latestDate;
				setTime(prevTime => Math.max(prevTime - diff, 0));
				clearTimeout(beepTimeout);
			}
		};

		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	}, [isRunning, time]);

	useEffect(() => {
		let timer;
		if (isRunning) {
			timer = setInterval(() => {
				if (document.hidden) {
					//timing when the tab is hidden is managed differently
					return;
				}
				setTime(prevTime => Math.max(prevTime - 1000, 0));
			}, 1000);
		}

		setInterval(() => {
		}, 1000);

		return () => clearInterval(timer);
	}, [isRunning]);

	useEffect(() => {
		if (time === 0 && isRunning) {
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

	document.addEventListener('visibilitychange', () => {
	});

	return (
		<div>
			<h1>Timer</h1>
			<p>{Math.ceil(time / 1000)}</p>
			<button onClick={() => setTime(Math.ceil(1000 * 1000))}>New Random</button>
			<button onClick={handleStart}>Start</button>
			<button onClick={handleStop}>Stop</button>
		</div>
	);
}

export default Timer;