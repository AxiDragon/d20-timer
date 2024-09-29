let tasks = getTasks();
const tasksByTime = initiateTasksByTime();
let taskNumber = getTaskNumber();

export function getTasks() {
	try {
		return JSON.parse(localStorage.getItem('tasks')) || [];
	}
	catch (error) {
		return [];
	}
}

export function getSortedTasks(targetTime) {
	if (targetTime > 20 || targetTime < 1) {
		return tasks;
	}

	const queue = [targetTime];
	const res = [];

	let i = 1;
	while ((targetTime + i < 20) || (targetTime - i > 1)) {
		if (targetTime + i < 20) {
			queue.push(targetTime + i);
		}
		if (targetTime - i > 1) {
			queue.push(targetTime - i);
		}
		i++;
	}

	while (queue.length > 0) {
		const time = queue.shift();
		if (tasksByTime[time]) {
			res.push(...tasksByTime[time]);
		}
	}

	return res;
}

function initiateTasksByTime() {
	const tasksByTimeHolder = {};

	tasks.forEach(task => {
		if (!tasksByTimeHolder[task.time]) {
			tasksByTimeHolder[task.time] = [];
		}
		tasksByTimeHolder[task.time].push(task);
	});

	return tasksByTimeHolder;
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

	if (!tasksByTime[task.time]) {
		tasksByTime[task.time] = [];
	}
	tasksByTime[task.time].push(task);

	console.log(tasksByTime);

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