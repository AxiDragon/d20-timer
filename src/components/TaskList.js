import React, { useState, useRef } from "react";
import Task from "./Task";
import { getTasks, saveTask } from "../utils/taskManager.js";

function TaskList({ initialTasks = getTasks() }) {
	const taskText = useRef(null);
	const taskTime = useRef(null);
	const [tasks, setTasks] = useState(initialTasks);

	const handleAddTask = () => {
		const newTask = { text: taskText.current.value, time: taskTime.current.value, checked: false };
		setTasks([...tasks, newTask]);
		saveTask(newTask);
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
			<ul>
				{tasks.map((task, i) => (
					<Task key={i} id={i} task={task.text} checked={task.checked} time={task.time} />
				))}
			</ul>
		</div>
	);
}

export default TaskList;