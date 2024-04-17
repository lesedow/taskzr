import './button.css';

export function Button(icon, func, text = '') {
	const button = document.createElement("div");
	button.classList.add('button');

	button.innerHTML = `
		<img class="icon" src="${icon}" alt="Icon">
	`;

	if (text) {
		const textElement = document.createElement('p');
		textElement.textContent = text;
		button.appendChild(textElement);
	}

	button.addEventListener('click', func);

	return button;
}

export function TypeButton(icon, func, title, dataType) {
	const button = Button(icon, func, title);
	button.setAttribute('data-type', dataType);

	const totalTasks = document.createElement('p');
	totalTasks.classList.add('total-tasks');

	button.appendChild(totalTasks);

	return button;
}

export function ProjectButton(icon, func, title, dataID) {
	const button = Button(icon, func, title);

	// if (dataID) {
	button.setAttribute("data-id", dataID);
	// }

	const totalTasks = document.createElement('p');
	totalTasks.classList.add('total-tasks');

	button.appendChild(totalTasks);

	return button;
}