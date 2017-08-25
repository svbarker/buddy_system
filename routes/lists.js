const express = require("express");
const router = express.Router();
const { User, List, ListItem } = require("./../models");

router.get("/new", (req, res) => {
	res.render("./lists/newList");
});

router.post("/", (req, res) => {
	//should do a transaction here
	List.create({ ownerId: req.user.id, pending: true, complete: false })
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
	User.findAll({ where: { id: { $ne: req.user.id } } }).then(users => {
		res.render("./lists/sendList", { users: users, listId: req.params.id });
	});
});

router.patch("/send", (req, res) => {
	List.update(
		{ buddyId: req.body.user },
		{ where: { id: req.body.list } }
	).then(() => {
		res.redirect("/");
	});
});

router.patch("/:id/approve", (req, res) => {
	List.update({ pending: false }, { where: { id: req.params.id } }).then(() => {
		res.redirect("/");
	});
});

module.exports = router;
