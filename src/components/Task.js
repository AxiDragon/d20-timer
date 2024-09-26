import React, { useEffect, useRef, useState } from "react";
import styles from './css/task.module.css';
import { checkTask, deleteTask } from "../utils/taskManager";

function Task({ taskNumber, task, time = 5, checked = false }) {
	const [isChecked, setIsChecked] = useState(checked);
	const [isVisible, setIsVisible] = useState(true);
	const taskDiv = useRef(null);
	const taskP = useRef(null);

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	const handleCancel = () => {
		deleteTask(taskNumber);
		setIsVisible(false);
	};

	useEffect(() => {
		if (taskDiv.current !== null) {
			if (isChecked) {
				taskDiv.current.classList.add(styles.checked);
			} else {
				taskDiv.current.classList.remove(styles.checked);
			}
		}

		checkTask(taskNumber, isChecked);
	}, [isChecked, taskNumber]);

	useEffect(() => {
		const fontSize = Math.min(400 / task.length, 45);

		taskP.current.style.fontSize = `${fontSize}px`;
	}, []);

	if (!isVisible)
		return null;

	return (
		<div ref={taskDiv} className={styles.task}>
			<div className={styles.info}>
				<p id={styles.number}>{taskNumber}</p>
				<p id={styles.taskText} ref={taskP} style={{ margin: '0px' }}>{task}</p>
				<p id={styles.time}>
					<span id={styles.time} className={`material-symbols-outlined ${styles.icon}`}>timer</span>{time}m
				</p>
			</div>
			<div className={styles.buttons}>
				<p className={`material-symbols-outlined ${styles.icon}`} onClick={handleCheckboxChange}>
					check_circle
				</p>
				<p className={`material-symbols-outlined ${styles.icon}`} onClick={handleCancel}>
					cancel
				</p>
			</div>
		</div>
	);
}

export default Task;