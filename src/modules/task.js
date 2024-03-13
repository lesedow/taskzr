import ID from './id.js';

export default class Task {
	constructor(title, description, priority, dueDate = '') {
		this.id = ID.withPrefix('task');
		this.title = title;
		this.description = description;
		this.priority = priority;
		this.dueDate = dueDate
	}
}
