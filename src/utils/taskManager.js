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
		return localStorage.getItem('taskNumber') || 0;
	}
	catch (error) {
		return 0;
	}
}

export function createTask(text, time, checked) {
	const task = { number: taskNumber++, text, time, checked };
	saveTask(task);
	localStorage.setItem('taskNumber', taskNumber);
	return task;
}

export function saveTask(task) {
	tasks.push(task);
	console.log('saving task', task);
	console.log('tasks', tasks);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function deleteTask(number) {
	console.log('deleting task', number);
	const i = getIndex(number);
	if (i !== -1) {
		tasks.splice(i, 1);
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}
}

export function checkTask(number, checked) {
	const i = getIndex(number);
	if (i !== -1) {
		tasks[i].checked = checked;
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}
}

function getIndex(number) {
	return tasks.findIndex(task => task.number === number);
}