import React, { useEffect, useRef, useState } from "react";
import styles from './task.module.css';
import { checkTask, deleteTask } from "../utils/taskManager";

function Task({ taskNumber, task, time = 5, checked = false }) {
	const [isChecked, setIsChecked] = useState(checked);
	const [isVisible, setIsVisible] = useState(true);
	const taskDiv = useRef(null);

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

	if (!isVisible)
		return null;

	return (
		<div ref={taskDiv} className={styles.task}>
			<div className={styles.firstRow}></div>
			<p className={styles.number}>{taskNumber}</p>
			<div className={styles.info}>
				<p style={{ margin: '0px' }}>{task}</p>
				<p id={styles.time}>
					<span id={styles.time} className={`material-symbols-outlined ${styles.icon}`}>timer</span>{time}m
				</p>
			</div>
			<div className={styles.buttons}>
				<span className={`material-symbols-outlined ${styles.icon}`} onClick={handleCheckboxChange}>
					check_circle
				</span>
				<br />
				<span className={`material-symbols-outlined ${styles.icon}`} onClick={handleCancel}>
					cancel
				</span>
			</div>
		</div>
	);
}

export default Task;