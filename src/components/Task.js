import React, { useEffect, useRef, useState } from "react";
import './task.css';
import { checkTask } from "../utils/taskManager";

function Task({ id, task, time = 5, checked = false }) {
	const [isChecked, setIsChecked] = useState(checked);
	const taskDiv = useRef(null);

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	useEffect(() => {
		if (isChecked) {
			taskDiv.current.className = 'checked';
		} else {
			taskDiv.current.className = '';
		}

		checkTask(id, isChecked);
	}, [isChecked]);

	return (
		<div ref={taskDiv}>
			<input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
			{task} <span class="material-symbols-outlined">timer</span>{time}m
			<span class="material-symbols-outlined">cancel</span>
		</div>
	);
}

export default Task;