export function ProjectContent(project) {
	const projectContainer = document.createElement('div');
	projectContainer.classList.add('project-container');

	const projectName = document.createElement('h1');
	projectName.setAttribute('id', 'project-name');
	projectName.textContent = project.name;

	const taskList =  document.createElement('div');
	taskList.setAttribute('id', 'task-list');

	project.tasks.forEach(task => {
		const taskElementHTML = `
			<div class="priority-color"></div>
			<div class="task-details">
				<p class="task-title">${task.title}</p>
				<p class="task-description">${task.description}</p>
				<p class="task-date">${task.dueDate}<p>
			</div>
			<div class="task-complete">
				<input type="checkbox">
			</div>
		`;

		const taskElement = document.createElement('div');
		taskElement.setAttribute('data-id', task.id);

		taskElement.innerHTML = taskElementHTML;
		taskList.appendChild(taskElement);
	});

	projectContainer.appendChild(projectName);
	projectContainer.appendChild(taskList);

	return projectContainer;
}