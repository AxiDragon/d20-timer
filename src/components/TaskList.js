import React, { useEffect, useState } from "react";
import Task from "./Task";
import { getTasks } from "../utils/taskManager.js";
import styles from './css/taskList.module.css';

function TaskList({ initialTasks = getTasks() }) {
	const [tasks, setTasks] = useState(initialTasks);
	const [timerTime, setTimerTime] = useState(0);

	useEffect(() => {
		function updateTasks() {
			setTasks(getTasks());
		};

		function updateTimerTime(event) {
			setTimerTime(event.detail.time / 1000 / 60);
		}

		document.addEventListener('tasksUpdated', updateTasks);
		document.addEventListener('timerUpdated', updateTimerTime);

		return () => {
			document.removeEventListener('tasksUpdated', updateTasks);
			document.removeEventListener('timerUpdated', updateTimerTime);
		};
	}, []);

	function sortedTasks() {
		if (timerTime === 0)
			return tasks;

		return tasks.sort((a, b) => Math.abs(timerTime - a.time) - Math.abs(timerTime - b.time));
	}

	return (
		<div className={styles.taskGrid}>
			{sortedTasks().map((task) => (
				<Task key={task.number} taskNumber={task.number} task={task.text} time={task.time} />
			))}
		</div>
	);
}

export default TaskList;