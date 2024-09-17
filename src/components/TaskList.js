import React, { useState, useRef } from "react";
import Task from "./Task";

function getTasks() {
	try {
		return JSON.parse(localStorage.getItem('tasks')) || [];
	}
	catch (error) {
		return [];
	}
}

function TaskList({ initialTasks = getTasks() }) {
	const taskInput = useRef(null);
	const [tasks, setTasks] = useState(initialTasks);

	const handleAddTask = () => {
		const newTasks = [...tasks, taskInput.current.value];

		setTasks(newTasks);
		localStorage.setItem('tasks', JSON.stringify(newTasks));
	};

	return (
		<div>
			<h1>Task List</h1>
			<input type="text" ref={taskInput} /><button onClick={handleAddTask}>Add Task</button>
			<ul>
				{tasks.map((task, id) => (
					<Task key={id} task={task} />
				))}
			</ul>
		</div>
	);
}

export default TaskList;