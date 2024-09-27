import React, { useRef, useState } from "react";
import { createTask, getTaskNumber } from "../utils/taskManager";
import styles from './css/task.module.css';

function TaskCreator() {
	const taskText = useRef(null);
	const taskTime = useRef(null);
	const [taskNumber, setTaskNumber] = useState(getTaskNumber());

	const handleAddTask = () => {
		const clampedTime = Math.min(20, Math.max(1, taskTime.current.value));
		createTask(taskText.current.value, clampedTime);
		setTaskNumber(getTaskNumber());
	};

	function handleTextInputChange() {
		if (taskText === null)
			return;

		const fontSize = Math.min(400 / taskText.current.value.length, 45);

		taskText.current.style.fontSize = `${fontSize}px`;
	}

	return (
		<div className="topElement">
			<h1>Create a task.</h1>
			<div className={styles.task}>
				<div className={styles.info}>
					<p id={styles.number}>{taskNumber}</p>
					<input
						type="text"
						ref={taskText}
						id={styles.textInput}
						defaultValue="Insert task..."
						onChange={handleTextInputChange} />
					<p id={styles.time}>
						<span id={styles.time} className={`material-symbols-outlined ${styles.icon}`}>timer</span>
						<input type="number" ref={taskTime} id={styles.timeInput} min="1" max="20" defaultValue="5" />m
					</p>
				</div>
				<div className={styles.buttons}>
					<p className={`material-symbols-outlined ${styles.icon}`} onClick={handleAddTask}>
						add_circle
					</p>
				</div>
			</div>
		</div>
	);
}

export default TaskCreator;