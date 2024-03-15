import './panel.css';

function Details(projects) {
	const details1 = document.createElement('div');
	details1.classList.add('details-1');

	details1.innerHTML = `
		<input type='text' id='new-task-title' placeholder='Title' required>
		<textarea id='new-task-description' cols='30' rows='5' placeholder='Description'></textarea>
	`;

	const details2 = document.createElement('div');
	details2.classList.add('details-2');

	details2.innerHTML = `
		<input type='date' id='new-task-date' required>
		<select name='priority' id='priority'>
			<option value="1">Priority 1</option>
      <option value="2">Priority 2</option>
      <option value="3">Priority 3</option>
      <option value="4">Priority 4</option>
		</select>
	`;

	const projectSelect = document.createElement('select');
	projectSelect.name = "project-select";
	projectSelect.setAttribute('id', 'project-select');
	details2.appendChild(projectSelect);

	projects.forEach(project => {
		const option = document.createElement('option');
		option.value = project.id;
		option.textContent = project.name;

		projectSelect.appendChild(option);
	});

	return [details1, details2]; 
}

export function NewTaskPanel(projects, func) {
	const backdrop = document.createElement('div');
	backdrop.classList.add('backdrop');

	const newTaskContainer = document.createElement('div');
	newTaskContainer.classList.add('new-task');
	backdrop.appendChild(newTaskContainer);

	const newTaskForm = document.createElement('form');
	newTaskForm.action = '#';
	newTaskForm.setAttribute('id', 'new-task-form');
	newTaskContainer.appendChild(newTaskForm);

	const details = Details(projects);
	newTaskForm.replaceChildren(...details);

	const submitButton = document.createElement('button');
	submitButton.type = 'submit';
	submitButton.textContent = 'Add Task';
	newTaskForm.appendChild(submitButton);

	newTaskContainer.addEventListener('submit', func);

	return backdrop;
}

export function NewProjectPanel() {

}

