// CSS
import '../style.css';

// Modules
import { Project } from './project.js';
import Task from './task.js';
import Storage from './storage.js';
import { format } from "date-fns";

// Icons 
import CalendarTodayIcon from '../assets/calendar-today.svg';
import PlusIcon from '../assets/plus-box.svg';
import SimplePlusIcon from '../assets/plus.svg';
import CalendarWeekIcon from '../assets/calendar-week.svg';
import InboxIcon from '../assets/inbox.svg';

// Components
import { Button, ProjectButton } from '../components/button/button.js';
import { ProjectContent } from '../components/project/project.js';
import { NewTaskPanel, NewProjectPanel } from '../components/panel/panel.js';

export default class UI {
	
	static #pageContainer = document.getElementById('page-container');
	static #mainSection = document.getElementById('main-section');
	static #projectsSection = document.getElementById('projects');
	static #projectContainer = document.getElementById('project');
	static #projectHeader = document.getElementById('projects-header');

	static #currentActivePanel = null;

	static test() {
		console.log('test')
	}


	static showTodayTasks() {
		// Show today tasks
	}

	static showWeekTasks() {
		// Show week tasks
	}

	static bindOutsideClickEvent() {
		document.addEventListener("click", (e) => {
			if(!UI.#currentActivePanel) return;
			const outsideClick = !UI.#currentActivePanel.firstElementChild.contains(e.target);
			if (outsideClick) {
				document.body.removeChild(UI.#currentActivePanel);
				UI.#currentActivePanel = null;
			}
		});
	}

	static updateCurrentProjectButton(id) {
		const currentProjectButton = document.querySelector(`[data-id="${id}"]`);
		currentProjectButton.lastElementChild.textContent = Storage.getProjectNumberOfTasks(id);
	}

	static onNewTaskSubmit(event) {
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
		UI.updateTodayTaskCounter();	
		UI.updateCurrentProjectButton(project.value);

		document.body.removeChild(event.target.parentElement.parentElement);
		UI.#currentActivePanel = null;
	}

	static showNewTaskPanel(event) {
		event.stopPropagation();
		const newTaskPanel = NewTaskPanel(Storage.projects, UI.onNewTaskSubmit);
		document.body.appendChild(newTaskPanel);

		UI.#currentActivePanel = newTaskPanel;
	}

	static showAddProjectPanel(event) {
		event.stopPropagation();
		const newProjectPanel = NewProjectPanel(UI.onAddProjectSubmit);
		document.body.appendChild(newProjectPanel);

		UI.#currentActivePanel = newProjectPanel;
	}

	static displayProject(event) {
		const targetID = event.target.getAttribute('data-id');
		if (!targetID) return;

		const project = Storage.getProjectById(targetID);
		const projectContent = ProjectContent(project);

		UI.#projectContainer.replaceChildren(projectContent);
  }

	static updateInboxButtonTaskCount(button) {
		const inboxProject = Storage.getProjectById(button.getAttribute('data-id'));
		button.lastElementChild.textContent = inboxProject.tasks.length || "";
	} 

	static updateTodayTaskCounter() {
		const todayTaskCounter = document.querySelector('[data-id="today"]').lastElementChild;
		todayTaskCounter.textContent = Storage.getTodayTasksCount() || "";
	}

	static createTodayButton() {
		const todayTasks = ProjectButton(CalendarTodayIcon, UI.showTodayTasks, 'Today', 'today');
		UI.#mainSection.appendChild(todayTasks);

		UI.updateTodayTaskCounter();
	}

	static createInboxButton() {
		const inboxID = Storage.projects[0].id; 
		const inboxButton = ProjectButton(InboxIcon, UI.displayProject, 'Inbox', inboxID);
		UI.#mainSection.appendChild(inboxButton);
		UI.updateInboxButtonTaskCount(inboxButton);
	}

	static createUpcomingButton() {
		const upcomingTasks = ProjectButton(CalendarWeekIcon, UI.test, 'Upcoming');
		UI.#mainSection.appendChild(upcomingTasks);
	}

	static createNewProjectButton() {
		const addNewProjectButton = Button(SimplePlusIcon, UI.showAddProjectPanel);
		UI.#projectHeader.appendChild(addNewProjectButton);
	}

	static createNewTaskButton() {
		const addNewTaskButton = Button(PlusIcon, UI.showNewTaskPanel, 'Add task');
		UI.#mainSection.appendChild(addNewTaskButton);
	}

	static createButtons() {
		UI.createNewTaskButton();
		UI.createInboxButton();
		UI.createTodayButton();
		UI.createUpcomingButton();
		UI.createNewProjectButton();
	}

	static initializeUI() {
		Storage.loadProjectsFromStorage();
		UI.createButtons();
		UI.bindOutsideClickEvent();
	}
}