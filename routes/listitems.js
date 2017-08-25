const express = require("express");
const router = express.Router({ mergeParams: true });
const { User, List, ListItem } = require("./../models");

router.patch("/:itemId", (req, res) => {
	ListItem.update(
		{ checked: true },
		{ where: { id: req.params.itemId } }
	).then(() => {
		res.redirect("/");
	});
});

module.exports = router;
