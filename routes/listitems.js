const express = require("express");
const router = express.Router({ mergeParams: true });
const { User, List, ListItem, sequelize } = require("./../models");

router.patch("/:itemId", (req, res) => {
	let value;
	sequelize.transaction(t => {
		return ListItem.update(
			{ checked: true },
			{ where: { id: req.params.itemId }, returning: true, transaction: t }
		)
			.then(listItem => {
				value = listItem[1][0].value;
				return List.find({
					where: { id: req.params.listId },
					transaction: t
				});
			})
			.then(list => {
				return User.increment("currency", {
					by: value,
					where: { id: list.ownerId },
					transaction: t
				});
			})
			.then(user => {
				res.redirect("/");
			})
			.catch(e => {
				req.flash("danger", e.message);
			});
	});
});

module.exports = router;
