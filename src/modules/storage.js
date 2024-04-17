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
		const today = format(Date.now(), 'yyyy-MM-dd'); 

		const defaultTask = new Task(inbox.id, 'Your first task', 'This is your first task.', 4, today);

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
		const todayDate = format(Date.now(), 'yyyy-MM-dd');
		let counter = 0;

		Storage.projects.forEach(project => {
			counter += project.tasks.filter(task => isEqual(task.dueDate, todayDate)).length;
		});

		return counter;
	}

	static getTodayTasks() {
		const todayDate = format(Date.now(), 'yyyy-MM-dd');

		return Storage.projects.reduce((today, project) => {
			let tasksForToday = project.tasks.filter(task => isEqual(task.dueDate, todayDate));
			today = today.concat(tasksForToday);

			return today;
		}, []);
	}

	static getProjectNumberOfTasks(id) {
		return Storage.getProjectById(id).tasks.length;
	}

	static editTask(projectId, taskId, properties) {
		let project = Storage.getProjectById(projectId);
		let taskIndex = Storage.getTaskIndexById(project, taskId);

		let editedTask = new Task(...properties, taskId);
		project[taskIndex] = editedTask;
		
		// task.title = title || task.title;
		// task.description = description || task.description;
		// task.priority = priority || task.priority;
		// task.dueDate = dueDate || task.dueDate;
		// task.title = completed || task.completed;

		Storage.saveProjectsToStorage();
	}

	static createNewTask(properties) {
		const newTask = new Task(properties);
		Storage.addTaskToProject(newTask, properties.projectID);
	}

	static getTaskIndexById(project, taskId) {
		return project.findIndex((task) => task.id === taskId);
	}

	static getTaskById(projectId, taskId) {
		const project = Storage.getProjectById(projectId);

		return project.tasks.find((task) => task.id === taskId);
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