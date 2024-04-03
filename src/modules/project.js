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

	return { addTask };
}
