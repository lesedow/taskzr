import ID from './id.js';

export class Project {
	constructor(name) {
		this.id = ID.withPrefix('project');
		this.name = name;
		this.tasks = [];
	}
}

export const ProjectMethods = () => {
	function addTask(task) {
		this.tasks.push(task);
	}

	function editTaskAtIndex(index, newTask) {
		this.tasks[index] =	newTask;
	}	

	function removeTaskAtIndex(index) {
		this.tasks.splice(index, 1);
	}

	return { addTask, editTaskAtIndex, removeTaskAtIndex };
}
