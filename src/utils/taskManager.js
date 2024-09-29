let tasks = getTasks();
let taskNumber = getTaskNumber();

export function getTasks() {
	try {
		return JSON.parse(localStorage.getItem('tasks')) || [];
	}
	catch (error) {
		return [];
	}
}

export function getTaskNumber() {
	try {
		return localStorage.getItem('taskNumber') || 1;
	}
	catch (error) {
		return 0;
	}
}

export function createTask(text, time) {
	const task = { number: taskNumber++, text, time };
	localStorage.setItem('taskNumber', taskNumber);
	saveTask(task);
	return task;
}

export function saveTask(task) {
	tasks.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasks));
	document.dispatchEvent(new CustomEvent('tasksUpdated', { detail: { tasks } }));
}

export function deleteTask(number) {
	const i = getIndex(number);
	if (i !== -1) {
		tasks.splice(i, 1);
		localStorage.setItem('tasks', JSON.stringify(tasks));
		document.dispatchEvent(new CustomEvent('tasksUpdated', { detail: { tasks } }));

		//task completed
		localStorage.setItem('tasksCompleted', Number(localStorage.getItem('tasksCompleted') || 0) + 1);
	}
}

function getIndex(number) {
	return tasks.findIndex(task => task.number === number);
}