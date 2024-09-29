import React, { useState, useEffect } from 'react';
import beep from '../assets/audio/beep.mp3';
import D20 from './D20';
import styles from './css/timer.module.css';

function getRandomTime() {
	const min = Number(localStorage.getItem('min') || 0);
	const max = Number(localStorage.getItem('max') || 20);

	return (min + Math.ceil(Math.random() * (max - min))) * 60 * 1000;
}

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
			const sound = new Audio(beep);
			sound.volume = localStorage.getItem('volume') || 0.5;
			sound.play();
		};
	}, [time]);

	const toggleTimer = () => {
		setIsRunning(!isRunning);
	};

	function randomizeTime() {
		let newTime = getRandomTime();
		setTime(newTime);
		document.dispatchEvent(new CustomEvent('timerUpdated', { detail: { time: newTime } }));
	}

	function getIcon() {
		if (isRunning) {
			return 'pause';
		} else {
			return 'play_arrow';
		}
	}

	return (
		<div className={styles.timer}>
			<D20 text={formatTime(time)} onClick={randomizeTime} />
			<button className={styles.button} onClick={toggleTimer}>
				<span style={{ fontSize: '48px' }} className='material-symbols-outlined'>
					{getIcon()}
				</span>
			</button>
		</div>
	);
}

export default Timer;