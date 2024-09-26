import React, { useRef } from "react";
import { createTask } from "../utils/taskManager";

function TaskCreator() {
	const taskText = useRef(null);
	const taskTime = useRef(null);

	const handleAddTask = () => {
		const clampedTime = Math.min(20, Math.max(1, taskTime.current.value));
		createTask(taskText.current.value, clampedTime);
	};

	return (
		<div>
			<label htmlFor="task-text">Task</label>
			<input type="text" ref={taskText} id="task-text" defaultValue="Insert task..." />
			<br />
			<label htmlFor="task-text">Time</label>
			<input type="number" ref={taskTime} id="task-time" min="1" max="20" defaultValue="5" />
			<br />
			<button onClick={handleAddTask}>Create</button>
		</div>
	);
}

export default TaskCreator;