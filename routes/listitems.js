const express = require("express");
const router = express.Router({ mergeParams: true });
const { User, List, ListItem } = require("./../models");

router.patch("/:itemId", (req, res) => {
	let value;
	console.log(`Item ID: ${req.params.itemId}`);
	ListItem.update(
		{ checked: true },
		{ where: { id: req.params.itemId }, returning: true }
	)
		.then(listItem => {
			value = listItem[1][0].value;
			return List.find({
				where: { id: req.params.listId }
			});
		})
		.then(list => {
			console.log(JSON.stringify(list, null, 2));
			return User.increment("currency", {
				by: value,
				where: { id: list.ownerId }
			});
		})
		.then(user => {
			console.log(user);
			res.redirect("/");
		});
});

module.exports = router;
