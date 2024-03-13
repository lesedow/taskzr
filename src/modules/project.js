import ID from './id.js';

export default class Project {
	constructor(name, color = '') {
		this.id = ID.withPrefix('project');
		this.name = name;
		this.color = color;
		this.tasks = [];
	}

	addTask(task) {
		this.tasks.push(task);
	}
}
