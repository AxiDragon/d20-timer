import React, { useEffect, useState } from "react";
import Task from "./Task";
import { getTasks, getSortedTasks } from "../utils/taskManager.js";
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

	return (
		<div className={styles.taskGrid}>
			{getSortedTasks(timerTime).map((task) => (
				<Task key={task.number} taskNumber={task.number} task={task.text} time={task.time} />
			))}
		</div>
	);
}

export default TaskList;