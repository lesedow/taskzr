import ID from './id.js';

export default class Task {
	constructor(properties, id) {
		this.id = id || ID.withPrefix('task');
		
		this.projectID = properties.projectID;
		this.title = properties.title;
		this.description = properties.description;
		this.priority = properties.priority;
		this.dueDate = properties.date;
		
		this.completed = false;
	}
}
