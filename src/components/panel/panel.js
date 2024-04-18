import './panel.css';

function TaskTitleInput(value = '') {
	const taskTitleInput = document.createElement('input');
	taskTitleInput.type = 'text';
	taskTitleInput.classList.add('task-panel-title');
	taskTitleInput.placeholder = 'Title';
	taskTitleInput.required = true;
	taskTitleInput.name = 'title';

	taskTitleInput.value = value;

	return taskTitleInput;
}

function TaskDescription(value = '') {
	const taskDescription = document.createElement('textarea');
	taskDescription.classList.add('task-panel-description');
	taskDescription.cols = 30;
	taskDescription.rows = 5;
	taskDescription.placeholder = 'Description';
	taskDescription.required = true;
	taskDescription.name = 'description';

	taskDescription.value = value;

	return taskDescription;
}

function TaskDate(value = '') {
	const taskDate = document.createElement('input');
	taskDate.type = 'date';
	taskDate.name = 'date';

	taskDate.required = true;

	taskDate.value = value;

	return taskDate;
}

function TaskPriority(value) {
	const taskPriority = document.createElement('select');
	taskPriority.name = 'priority';
	// taskPriority.setAttribute('id', 'priority');

	taskPriority.innerHTML = `
		<option value="1">Priority 1</option>
		<option value="2">Priority 2</option>
		<option value="3">Priority 3</option>
		<option value="4">Priority 4</option>
	`;

	if (value !== undefined) {
		taskPriority.value = value;
	}

	return taskPriority;
}

function ProjectOptions(projects, value) {
	const projectSelect = document.createElement('select');
	projectSelect.name = 'projectID';
	projectSelect.setAttribute('id', 'project-select');

	projects.forEach(project => {
		const option = document.createElement('option');
		option.value = project.id;
		option.textContent = project.name;

		projectSelect.appendChild(option);
	});

	if (value !== undefined) {
		projectSelect.value = value;
	}

	return projectSelect;
}

function Details(projects, task = {}) {
	const details1 = document.createElement('div');
	details1.classList.add('details-1');

	details1.appendChild(TaskTitleInput(task.title));
	details1.appendChild(TaskDescription(task.description));

	const details2 = document.createElement('div');
	details2.classList.add('details-2');

	details2.appendChild(TaskDate(task.dueDate));
	details2.appendChild(TaskPriority(task.priority));
	details2.appendChild(ProjectOptions(projects, task.projectID));

	return [details1, details2];
}

export function EditTaskPanel(projects, task, onSubmit, onRemove) {
	const backdrop = document.createElement('div');
	backdrop.classList.add('backdrop');

	const editTaskContainer = document.createElement('div');
	editTaskContainer.classList.add('task-panel');
	backdrop.appendChild(editTaskContainer);

	const editTaskForm = document.createElement('form');
	editTaskForm.action = '#';
	editTaskForm.setAttribute('id', 'task-form');
	editTaskForm.setAttribute('data-id', task.id);
	editTaskForm.setAttribute('data-project', task.projectID);
	editTaskContainer.appendChild(editTaskForm);

	const details = Details(projects, task);
	editTaskForm.replaceChildren(...details);

	const submitButton = document.createElement('button');
	submitButton.type = 'submit';
	submitButton.textContent = 'Edit Task';
	editTaskForm.appendChild(submitButton);

	const removeTaskButton = document.createElement('button');
	removeTaskButton.textContent = 'Remove Task';
	removeTaskButton.addEventListener('click', onRemove);
	editTaskForm.appendChild(removeTaskButton);

	editTaskContainer.addEventListener('submit', onSubmit);

	return backdrop;
}

export function NewTaskPanel(projects, onSubmit) {
	const backdrop = document.createElement('div');
	backdrop.classList.add('backdrop');

	const newTaskContainer = document.createElement('div');
	newTaskContainer.classList.add('task-panel');
	backdrop.appendChild(newTaskContainer);

	const newTaskForm = document.createElement('form');
	newTaskForm.action = '#';
	newTaskForm.setAttribute('id', 'task-form');
	newTaskContainer.appendChild(newTaskForm);

	const details = Details(projects);
	newTaskForm.replaceChildren(...details);

	const submitButton = document.createElement('button');
	submitButton.classList.add('span-2');
	submitButton.type = 'submit';
	submitButton.textContent = 'Add Task';
	newTaskForm.appendChild(submitButton);

	newTaskContainer.addEventListener('submit', onSubmit);

	return backdrop;
}

export function NewProjectPanel() {

}

export function EditProjectPanel() {

}

