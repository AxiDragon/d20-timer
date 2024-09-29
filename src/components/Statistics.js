import React, { useEffect, useState } from "react";
import styles from "./css/overlayMenuContent.module.css";

function Statistics() {
	const [timeSpent, setTimeSpent] = useState(() => {
		return localStorage.getItem('timeSpent') || 0;
	});

	const [tasksCompleted, setTasksCompleted] = useState(() => {
		return localStorage.getItem('tasksCompleted') || 0;
	});

	const refresh = () => {
		setTimeSpent(localStorage.getItem('timeSpent') || 0);
		setTasksCompleted(localStorage.getItem('tasksCompleted') || 0);
	};

	useEffect(() => {
		document.addEventListener('menuButtonPressed', refresh);

		return () => {
			document.removeEventListener('menuButtonPressed', refresh);
		};
	});

	function formatTime(time) {
		const minutes = Math.floor(time / 60000);
		const seconds = Math.floor((time % 60000) / 1000);
		return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
	}

	return (
		<div className={styles.OverlayMenuContent}>
			<h2>Statistics</h2>
			<div>
				<h4>
					Total time spent
				</h4>
				<p>
					{formatTime(timeSpent)}
				</p>
			</div>
			<div>
				<h4>
					Tasks completed
				</h4>
				<p>
					{tasksCompleted}
				</p>
			</div>
			<a href='https://ko-fi.com/S6S0J74ET' target='_blank'>
				<img height='36' style={{ border: '0', height: '36px' }} src='https://storage.ko-fi.com/cdn/kofi3.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' />
			</a>
		</div>
	);
}

export default Statistics;