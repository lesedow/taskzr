import ID from './id.js';

export class Project {
	constructor(name, color = '') {
		this.id = ID.withPrefix('project');
		this.name = name;
		this.color = color;
		this.tasks = [];
	}

	// addTask(task) {
	// 	this.tasks.push(task);
	// }
}

export const ProjectMethods = () => {
	function addTask(task) {
		this.tasks.push(task);
	}

	return { addTask };
}
