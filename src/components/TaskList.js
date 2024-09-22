import React, { useState, useRef } from "react";
import Task from "./Task";
import { createTask, getTasks } from "../utils/taskManager.js";
import styles from './css/taskList.module.css';

function TaskList({ initialTasks = getTasks() }) {
	const taskText = useRef(null);
	const taskTime = useRef(null);
	const [tasks, setTasks] = useState(initialTasks);

	const handleAddTask = () => {
		const clampedTime = Math.min(20, Math.max(1, taskTime.current.value));
		createTask(taskText.current.value, clampedTime, false);
		setTasks(getTasks());
	};

	return (
		<div>
			<h1>Task List</h1>
			<label htmlFor="task-text">Task Text</label>
			<input type="text" ref={taskText} id="task-text" defaultValue="Insert task..." />
			<br />
			<label htmlFor="task-text">Task Time</label>
			<input type="number" ref={taskTime} id="task-time" min="1" max="20" defaultValue="5" />
			<br />
			<button onClick={handleAddTask}>Add Task</button>
			<div className={styles.taskGrid}>
				{tasks.map((task) => (
					<Task key={task.number} taskNumber={task.number} task={task.text} checked={task.checked} time={task.time} />
				))}
			</div>
		</div>
	);
}

export default TaskList;