$(document).ready(() => {
	let nextTaskIndex = 1;
	$("#addItem").on("click", e => {
		e.preventDefault();
		$("#tasksContainer").append(`
			<div class="form-group col-xs-12">
				<label for="description">Task</label>
				<input type="text" id="description" name="listItems[${nextTaskIndex}][description]" class="form-control">
			</div>
			<div class="form-group col-xs-12">
				<label for="value">Points</label>
				<input type="number" id="value" name="listItems[${nextTaskIndex}][value]" class="form-control">
			</div>
		`);
		nextTaskIndex++;
	});
});
