const express = require("express");
const router = express.Router();
const { User, List, ListItem, sequelize } = require("./../models");

// Middleware for form validation

const listFormValid = (req, res, next) => {
	let valid = true;
	req.body.listItems.forEach(item => {
		if (!item.description || !item.value) {
			valid = false;
		}
	});
	if (valid) {
		next();
	} else {
		req.flash("danger", "All form fields are required.");
		res.redirect("back");
	}
};

router.get("/new", (req, res) => {
	res.render("./lists/newList");
});

router.post("/", listFormValid, (req, res) => {
	sequelize.transaction(t => {
		return List.create(
			{ ownerId: req.user.id, pending: true, complete: false },
			{ transaction: t }
		)
			.then(list => {
				const listItems = req.body.listItems.map(item => {
					return ListItem.create(
						{
							listId: list.id,
							description: item.description,
							checked: false,
							value: item.value
						},
						{ transaction: t }
					);
				});

				return Promise.all(listItems);
			})
			.then(listItems => {
				res.redirect("/");
			})
			.catch(e => {
				req.flash("danger", e.message);
				res.redirect("back");
			});
	});
});

router.get("/:id/send", (req, res) => {
	User.findAll({ where: { id: { $ne: req.user.id } } }).then(users => {
		res.render("./lists/sendList", { users: users, listId: req.params.id });
	});
});

router.patch("/send", (req, res) => {
	List.update({ buddyId: req.body.user }, { where: { id: req.body.list } })
		.then(() => {
			res.redirect("/");
		})
		.catch(e => {
			req.flash("danger", e.message);
			res.redirect("back");
		});
});

router.patch("/:id/approve", (req, res) => {
	List.update({ pending: false }, { where: { id: req.params.id } })
		.then(() => {
			res.redirect("/");
		})
		.catch(e => {
			req.flash("danger", e.message);
			res.redirect("back");
		});
});

module.exports = router;
