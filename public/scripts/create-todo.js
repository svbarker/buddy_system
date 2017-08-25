$(document).ready(() => {
	let nextTaskIndex = 1;
	$("#addItem").on("click", e => {
		e.preventDefault();
		$("#tasksContainer").append(`<div>
			<label for="description">Task:</label>
			<input type="text" id="description" name="listItems[${nextTaskIndex}][description]">

			<label for="value">Task:</label>
			<input type="number" id="value" name="listItems[${nextTaskIndex}][value]">
		</div>`);
		nextTaskIndex++;
	});
});
