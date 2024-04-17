import './projectContent.css';

function ProjectName(name) {
	const projectName = document.createElement('h1');
	projectName.setAttribute('id', 'project-name');
	projectName.textContent = name;
	
	return projectName;
}

function TaskDetails(task) {
	const taskDetails = document.createElement('div');
	taskDetails.classList.add('task-details');

	const taskTitle = document.createElement('p');
	taskTitle.textContent = task.title;
	taskTitle.classList.add('task-title');
	taskDetails.appendChild(taskTitle);

	const taskDescription = document.createElement('p');
	taskDescription.textContent = task.description;
	taskDescription.classList.add('task-description');
	taskDetails.appendChild(taskDescription);

	const taskDate = document.createElement('p');
	taskDate.classList.add('task-date');
	taskDate.textContent = `Due ${task.dueDate}`;
	taskDetails.appendChild(taskDate);

	return taskDetails;
}

function TaskCheckbox() {
	const container = document.createElement('div');
	container.classList.add('task-complete');

	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.dataset.complete = '';

	container.appendChild(checkbox);

	return container;
}

function Task(task, onTaskClicked) {
	const taskElement = document.createElement('div');
	taskElement.setAttribute('data-id', task.id);
	taskElement.setAttribute('data-project', task.projectID);
	taskElement.addEventListener('click', onTaskClicked);

	const priorityColor = document.createElement('div');
	priorityColor.classList.add('priority-color');

	const taskDetails = TaskDetails(task);
	const taskCheck = TaskCheckbox();

	taskElement.appendChild(priorityColor);
	taskElement.appendChild(taskDetails);
	taskElement.appendChild(taskCheck);

	return taskElement;
}

function TaskList(tasks, onTaskClicked) {
	const taskList =  document.createElement('div');
	taskList.setAttribute('id', 'task-list');

	const taskElements = tasks.map((task) => Task(task, onTaskClicked));
	taskList.append(...taskElements);

	return taskList;
}

export function ProjectContent(project, onTaskClicked) {
	const projectContainer = document.createElement('div');
	projectContainer.classList.add('project-container');

	const projectName = ProjectName(project.name);
	const taskList = TaskList(project.tasks, onTaskClicked);

	projectContainer.appendChild(projectName);
	projectContainer.appendChild(taskList);

	return projectContainer;
}