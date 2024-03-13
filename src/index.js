import './style.css';

// Icons
import CalendarTodayIcon from './assets/calendar-today.svg';
import PlusIcon from './assets/plus-box.svg';
import CalendarWeekIcon from './assets/calendar-week.svg';
import InboxIcon from './assets/inbox.svg';

// Components
import { Button, ProjectButton } from './components/button/button.js';
import { ProjectContent } from './components/project/project.js';

// Modules 
import Project from './modules/project.js';
import Task from './modules/task.js';
import Storage from './modules/storage.js';
import ID from './modules/id.js'
import { format } from "date-fns";

const pageContainer = document.getElementById('page-container');
const mainSection = document.getElementById('main-section');
const projectsSection = document.getElementById('projects');
const projectContainer = document.getElementById('project');


// 1. Once the page loads, load every project. If there 
// is no project, create the inbox

// 2. Create the buttons on the page:
// - Add task button - opens a pop up that lets you create a new task
// - Inbox button - should display the tasks of the inbox
// - Today button - shows every task that has its dueDate value set to the current day
// - Upcoming button - shows every task that has its dueDate value set to a day of this week

// - Add project button
// - Collapse button
// - Project buttons - should display each projects content on press

// The total-tasks element should update every time a task is added or removed
// The total-tasks element on the today and upcoming buttons should update everytime
// the date is changed on any task

function test() {
	console.log("test")
}

function showTodayTasks() {
	// Show today tasks
}

function showWeekTasks() {
	// Show week tasks
}

function displayProject(event) {
	const targetID = event.target.getAttribute('data-id');
	if (!targetID) return;

	const project = Storage.getProjectById(targetID);
	const projectContent = ProjectContent(project);

	projectContainer.replaceChildren(projectContent);
}

function createProjectButtons() {
	for (let i = 0; i < Storage.projects.length; i++) {
		if (i == 0 ) { continue; }

		const { id, name } = project;
		const button = ProjectButton(CalendarTodayIcon, displayProject, name, id);


		projectsSection.appendChild(button);

	}
}

function onNewTaskSubmit(event) {
	event.preventDefault();
	
	const [ title, description, date, priority, project ] = event.target;
	const formattedDate = format(date.value, 'MM/dd/yyy');
	
	const newTask = new Task(
		title.value, 
		description.value, 
		priority.value, 
		formattedDate
	);

	Storage.addTaskToProject(newTask, project.value);
	updateTodayTaskCounter();	
}

function updateTodayTaskCounter() {
	const todayTaskCounter = document.querySelector('[data-id="today"]').lastElementChild;
	todayTaskCounter.textContent = Storage.getTodayTasksCount();
}

function showAddTaskPanel() {
	const newTaskContainer = document.createElement('div');

	newTaskContainer.classList.add('new-task');

	newTaskContainer.innerHTML = `
		<form action="#" id="new-task-form">
			<div class="details-1">
				<input type='text' id='new-task-title' placeholder='title' required>
				<textarea id='new-task-description' cols="30" rows="10"></textarea>
			</div>
			<div class="details-2">
				<input type='date' id='new-task-date' required>
				<select name="priority" id="priority">
          <option value="1">Priority 1</option>
          <option value="2">Priority 2</option>
          <option value="3">Priority 3</option>
          <option value="4">Priority 4</option>
      	</select>
      	<select name="project-select" id="project-select">
      	</select>
			<div>
			<button type='submit'>Add</button>
		</form>
	`;
	document.body.appendChild(newTaskContainer);

	const projectSelect = document.getElementById('project-select');

	Storage.projects.forEach(project => {
		const option = document.createElement('option');
		option.value = project.id;
		option.textContent = project.name;

		projectSelect.appendChild(option);
	});

	const newTaskForm = document.getElementById('new-task-form');
	newTaskForm.addEventListener('submit', onNewTaskSubmit);
}

function inboxButtonTaskCount(button) {
	const inboxProject = Storage.getProjectById(button.getAttribute('data-id'));
	button.lastElementChild.textContent = inboxProject.tasks.length;
} 

function createTodayButton() {
	const todayTasks = ProjectButton(CalendarTodayIcon, showTodayTasks, 'Today', 'today');
	mainSection.appendChild(todayTasks);

	updateTodayTaskCounter();
}

function createButtons() {
	const addNewTaskButton = Button(PlusIcon, showAddTaskPanel, 'Add task');
	mainSection.appendChild(addNewTaskButton);

	const inboxButton = ProjectButton(InboxIcon, displayProject, 'Inbox', Storage.projects[0].id);
	mainSection.appendChild(inboxButton);
	inboxButtonTaskCount(inboxButton);

	createTodayButton();

	const upcomingTasks = ProjectButton(CalendarWeekIcon, test, 'Upcoming');
	mainSection.appendChild(upcomingTasks);
}

function windowOnLoad() {
	Storage.loadProjectsFromStorage();
	createButtons();
}

window.addEventListener('load', windowOnLoad);