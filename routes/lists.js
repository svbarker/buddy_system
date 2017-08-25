const express = require("express");
const router = express.Router();
const { User, List, ListItem } = require("./../models");

router.get("/new", (req, res) => {
	res.render("./lists/newList");
});

router.post("/", (req, res) => {
	//should do a transaction here
	List.create({ ownerId: req.user.id, pending: true })
		.then(list => {
			const listItems = req.body.listItems.map(item => {
				return ListItem.create({
					listId: list.id,
					description: item.description,
					checked: false,
					value: item.value
				});
			});

			return Promise.all(listItems);
		})
		.then(listItems => {
			res.redirect("/");
		});
});

router.get("/:id/send", (req, res) => {
	User.findAll({}).then(users => {
		res.render("./lists/sendList", users);
	});
});

module.exports = router;
