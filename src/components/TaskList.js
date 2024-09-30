import React, { useEffect, useState } from "react";
import Task from "./Task";
import { getSortedTasks } from "../utils/taskManager.js";
import styles from './css/taskList.module.css';

function TaskList() {
	const [timerTime, setTimerTime] = useState(0);
	const [tasks, setTasks] = useState(getSortedTasks(timerTime));

	useEffect(() => {
		function updateTasks() {
			setTasks(getSortedTasks(timerTime));
		};

		function updateTimerTime(event) {
			setTimerTime(event.detail.time / 1000 / 60);
			setTasks(getSortedTasks(event.detail.time / 1000 / 60));
		}

		document.addEventListener('tasksUpdated', updateTasks);
		document.addEventListener('timerUpdated', updateTimerTime);

		return () => {
			document.removeEventListener('tasksUpdated', updateTasks);
			document.removeEventListener('timerUpdated', updateTimerTime);
		};
	}, [timerTime]);

	return (
		<div className={styles.taskGrid}>
			{tasks.map((task) => (
				<Task key={task.number} taskNumber={task.number} task={task.text} time={task.time} />
			))}
		</div>
	);
}

export default TaskList;