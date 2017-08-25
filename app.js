const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");
const { User, List, ListItem } = require("./models");

// Basic middleware

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

// Passport

const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

const LocalStrategy = require("passport-local").Strategy;

passport.use(
	new LocalStrategy(function(username, password, done) {
		User.find({
			where: { username: username }
		}).then(user => {
			console.log(user);
			if (!user || !user.validatePassword(password)) {
				return done(null, false);
			}
			return done(null, user);
		});
	})
);

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id).then(user => {
		done(null, user);
	});
});

//routes

app.get("/", (req, res) => {
	if (req.user) {
		User.findById(req.user.id, {
			include: [{ model: List, include: [{ model: ListItem }] }]
		}).then(user => {
			user = JSON.stringify(user, null, 2);
			res.render("dashboard", { user });
		});
	} else {
		res.render("login");
	}
});

app.get("/login", (req, res) => {
	res.render("login");
});

app.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
		failureFlash: true
	})
);

app.listen(3000, () => {
	console.log("Now listening...");
});
