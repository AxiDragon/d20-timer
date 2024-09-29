import React, { useEffect, useState } from "react";
import Task from "./Task";
import { getSortedTasks } from "../utils/taskManager.js";
import styles from './css/taskList.module.css';

function TaskList() {
	const [timerTime, setTimerTime] = useState(0);

	useEffect(() => {
		function updateTimerTime(event) {
			setTimerTime(event.detail.time / 1000 / 60);
		}

		document.addEventListener('timerUpdated', updateTimerTime);

		return () => {
			document.removeEventListener('timerUpdated', updateTimerTime);
		};
	}, []);

	return (
		<div className={styles.taskGrid}>
			{getSortedTasks(timerTime).map((task) => (
				<Task key={task.number} taskNumber={task.number} task={task.text} time={task.time} />
			))}
		</div>
	);
}

export default TaskList;