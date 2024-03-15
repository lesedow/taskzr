import { Project, ProjectMethods } from './project.js';
import Task from './task.js';
import { format, isEqual } from 'date-fns'; 

export default class Storage {
	static projects = [];

	static get projects() {
		return Storage.projects;
	}

	static set projects(newProjectList) {
		Storage.projects = newProjectList;
	}

	static #createDefaultProject() {
		const inbox = Object.assign(new Project('Inbox'), ProjectMethods());
		const today = format(Date.now(), 'MM/dd/yyyy'); 

		const defaultTask = new Task('Your first task', 'This is your first task.', 4, today);

		inbox.addTask(defaultTask);
		Storage.addProject(inbox);
		Storage.saveProjectsToStorage();
	}

	static loadProjectsFromStorage() {
		const loadedProjects = JSON.parse(localStorage.getItem('projects'));
		if (!loadedProjects) {
			Storage.#createDefaultProject();
			return;
		} 

		Storage.projects = loadedProjects.map(project => {
			return Object.assign(project, ProjectMethods());
		});
		
		Storage.saveProjectsToStorage();
	}

	static getTodayTasksCount() {
		const todayDate = format(Date.now(), 'MM/dd/yyyy');
		let counter = 0;

		Storage.projects.forEach(project => {
			counter += project.tasks.filter(task => isEqual(task.dueDate, todayDate)).length;
		});

		return counter;
	}

	static getProjectNumberOfTasks(id) {
		return Storage.getProjectById(id).tasks.length;
	}

	static addTaskToProject(task, id) {
		const targetProject = Storage.getProjectById(id);

		targetProject.addTask(task);
		Storage.saveProjectsToStorage();
	}

	static saveProjectsToStorage() {
		localStorage.setItem('projects', JSON.stringify(Storage.projects));
	}

	static addProject(project) {
		Storage.projects.push(project);
	}

	static getProjectById(id) {
		return Storage.projects.find((project) => project.id === id);
	}
}