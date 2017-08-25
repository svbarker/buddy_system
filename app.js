const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");
const { User, List, ListItem } = require("./models");

app.use(bodyParser.urlencoded({ extended: true }));

const hbs = exphbs.create({
	partialsDir: "views/partials",
	defaultLayout: "main"
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(
	session({
		secret: "ia ia cthulhu fhtagn",
		resave: false,
		saveUninitialized: false
	})
);

app.get("/", (req, res) => {
	User.findById(1, {
		include: [{ model: List, include: [{ model: ListItem }] }]
	}).then(user => {
		res.send(`<pre>${JSON.stringify(user, null, 2)}</pre>`);
	});
});

app.listen(3000, () => {
	console.log("Now listening...");
});
