import React, { useState, useEffect } from 'react';
import beep from '../assets/audio/beep.mp3';
import D20 from './D20';

const getRandomTime = () => {
	return Math.ceil(Math.random() * 20) * 60 * 1000;
};

function formatTime(time) {
	const minutes = Math.floor(time / 60000);
	const seconds = Math.floor((time % 60000) / 1000);
	return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function Timer({ initialTime = getRandomTime() }) {
	const [time, setTime] = useState(initialTime);
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
			<D20 text={formatTime(time)} />
			<button onClick={() => setTime(getRandomTime())}>New Random</button>
			<button onClick={handleStart}>Start</button>
			<button onClick={handleStop}>Stop</button>
		</div>
	);
}

export default Timer;