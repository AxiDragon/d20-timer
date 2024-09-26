import React, { useEffect, useState } from "react";
import Task from "./Task";
import { getTasks } from "../utils/taskManager.js";
import styles from './css/taskList.module.css';

function TaskList({ initialTasks = getTasks() }) {
	const [tasks, setTasks] = useState(initialTasks);

	useEffect(() => {
		function updateTasks(event) {
			setTasks(getTasks());
			// setTasks(event.detail.tasks);
		};

		document.addEventListener('tasksUpdated', updateTasks);

		return () => {
			document.removeEventListener('tasksUpdated', updateTasks);
		};
	}, []);

	return (
		<div className={styles.taskGrid}>
			{tasks.map((task) => (
				<Task key={task.number} taskNumber={task.number} task={task.text} checked={task.checked} time={task.time} />
			))}
		</div>
	);
}

export default TaskList;