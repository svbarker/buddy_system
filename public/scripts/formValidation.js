$(document).ready(() => {
	$("form").on("submit", e => {
		$(e.target.children($("input"))).forEach(inputField => {
			if (!inputField.value) {
				e.preventDefault();
				alert("You must fill in all form fields before submitting.");
			}
		});
	});
});
