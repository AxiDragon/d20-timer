let tasks = getTasks();

export function getTasks() {
	try {
		return JSON.parse(localStorage.getItem('tasks')) || [];
	}
	catch (error) {
		return [];
	}
}

export function saveTask(task) {
	tasks.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function deleteTask(id) {
	tasks.splice(id, 1);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function checkTask(id, checked) {
	tasks[id].checked = checked;
	localStorage.setItem('tasks', JSON.stringify(tasks));
}