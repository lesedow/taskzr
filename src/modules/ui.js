// CSS
import '../style.css';

// Modules
import { Project } from './project.js';
import Task from './task.js';
import Storage from './storage.js';
import { format, isEqual } from "date-fns";

// Icons 
import CalendarTodayIcon from '../assets/calendar-today.svg';
import PlusIcon from '../assets/plus-box.svg';
import SimplePlusIcon from '../assets/plus.svg';
import CalendarWeekIcon from '../assets/calendar-week.svg';
import InboxIcon from '../assets/inbox.svg';

// Components
import { Button, ProjectButton, TypeButton } from '../components/button/button.js';
import { ProjectContent } from '../components/project/projectContent.js';
import { NewTaskPanel, EditTaskPanel, NewProjectPanel, EditProjectPanel } from '../components/panel/panel.js';

export default class UI {
	
	static #pageContainer = document.getElementById('page-container');
	static #mainSection = document.getElementById('main-section');
	static #projectsSection = document.getElementById('projects');
	static #projectContainer = document.getElementById('project');
	static #projectHeader = document.getElementById('projects-header');

	static #currentActivePanel = null;
	static #currentlySelectedButton;

	static test() {
		console.log('test')
	}

	static showTodayTasks() {
		// Show today tasks
		const todayTasks = {
			name: 'Today',
			tasks: Storage.getTodayTasks()
		};

		const projectContent = ProjectContent(todayTasks, UI.onTaskClicked);
		UI.#projectContainer.replaceChildren(projectContent);
	}

	static onTodayButtonClicked() {
		UI.#currentlySelectedButton = 'today';
		UI.showTodayTasks();
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

	static refreshProjectContent(data) {
		if (data.projectID === UI.#currentlySelectedButton) {
			UI.displayProject();
		}

		UI.updateProjectButton(data.projectID); // In case the task's project was edited
		
		if (UI.#currentlySelectedButton.startsWith('project')) {
			UI.updateProjectButton(UI.#currentlySelectedButton);
		}
	}

	static refreshWeekContent(data) {
		const today = format(Date.now(), 'yyyy-MM-dd');
		UI.updateTodayTaskCounter();
		
		if (UI.#currentlySelectedButton === 'today') {
			UI.showTodayTasks();
		}
	
	}

	static loadInboxTasks() {
		UI.#currentlySelectedButton = Storage.projects[0].id; // Inbox
		UI.displayProject();
	}

	static updateProjectButton(id) {
		const projectButton = document.querySelector(`[data-id="${id}"]`);
		projectButton.lastElementChild.textContent = Storage.getProjectNumberOfTasks(id);
	}

	static onNewTaskSubmit(event) {
		event.preventDefault();
		
		const formData = new FormData(event.target);
		const formProps = Object.fromEntries(formData);

		Storage.createNewTask(formProps);

		UI.refreshProjectContent(formProps);
		UI.refreshWeekContent(formProps);
		UI.removeCurrentActivePanel(event);
	}

	static removeCurrentActivePanel(event) {
		document.body.removeChild(event.target.parentElement.parentElement);
		UI.#currentActivePanel = null;
	}

	static addPanelToPage(panel) {
		document.body.appendChild(panel);
		UI.#currentActivePanel = panel;
	}

	static onEditTaskSubmit(event) {
		event.preventDefault();

		const formData = new FormData(event.target);
		const formProps = Object.fromEntries(formData);

		const taskID = event.target.getAttribute('data-id');
		const currentProjectID = event.target.getAttribute('data-project');

		Storage.editTask(currentProjectID, taskID, formProps);

		UI.refreshProjectContent(formProps);
		UI.refreshWeekContent(formProps);
		UI.removeCurrentActivePanel(event);
	}

	static onTaskClicked(event) {
		const isCheckButton = event.target.hasAttribute("data-complete");
		const taskID = this.getAttribute('data-id');
		const taskProjectID = this.getAttribute('data-project');

		if (isCheckButton) {
			const checkStatus = event.target.checked;
			Storage.toggleTaskCheck(taskID, taskProjectID, checkStatus);

			return;
		}

		UI.showEditTaskPanel(event, taskID, taskProjectID);

	}

	static onProjectButtonClick(event) {
		UI.#currentlySelectedButton = event.target.getAttribute('data-id');
		UI.displayProject();
	}

	static showNewTaskPanel(event) {
		event.stopPropagation();
		const newTaskPanel = NewTaskPanel(Storage.projects, UI.onNewTaskSubmit);
		
		UI.addPanelToPage(newTaskPanel);
	}

	static showEditTaskPanel(event, taskID, taskProjectID) {
		event.stopPropagation();

		const task = Storage.getTaskById(taskProjectID, taskID);
		const editTaskPanel = EditTaskPanel(Storage.projects, task, UI.onEditTaskSubmit, UI.test);

		UI.addPanelToPage(editTaskPanel);
	}

	static showAddProjectPanel(event) {
		event.stopPropagation();
		const newProjectPanel = NewProjectPanel(UI.onAddProjectSubmit);
		document.body.appendChild(newProjectPanel);

		UI.#currentActivePanel = newProjectPanel;
	}

	static displayProject(event) {
		let targetID = event ? event.target.getAttribute('data-id') : UI.#currentlySelectedButton;

		if (!targetID) return;

		const project = Storage.getProjectById(targetID);
		const projectContent = ProjectContent(project, UI.onTaskClicked);

		UI.#projectContainer.replaceChildren(projectContent);
  }

	static updateInboxButtonTaskCount(button) {
		const inboxProject = Storage.getProjectById(button.getAttribute('data-id'));
		button.lastElementChild.textContent = inboxProject.tasks.length || "";
	} 

	static updateTodayTaskCounter() {
		const todayTaskCounter = document.querySelector('[data-type="today"]').lastElementChild;
		todayTaskCounter.textContent = Storage.getTodayTasksCount() || "";
	}

	static createTodayButton() {
		const todayTasks = TypeButton(CalendarTodayIcon, UI.onTodayButtonClicked, 'Today', 'today');
		UI.#mainSection.appendChild(todayTasks);

		UI.updateTodayTaskCounter();
	}

	static createInboxButton() {
		const inboxID = Storage.projects[0].id; // First project is always the inbox 
		const inboxButton = ProjectButton(InboxIcon, UI.onProjectButtonClick, 'Inbox', inboxID);
		UI.#mainSection.appendChild(inboxButton);
		UI.updateInboxButtonTaskCount(inboxButton);
	}

	static createUpcomingButton() {
		const upcomingTasks = TypeButton(CalendarWeekIcon, UI.test, 'Upcoming');
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
		UI.loadInboxTasks();
	}
}