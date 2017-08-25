const express = require("express");
const app = express();
const flash = require("express-flash");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const methodOverride = require("method-override");
const getPostSupport = require("express-method-override-get-post-support");
const { User, List, ListItem } = require("./models");

// Basic middleware

app.use(flash());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

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

app.use(express.static(__dirname + "/public"));

app.use(methodOverride(getPostSupport.callback, getPostSupport.options));

// Passport authentication

const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

const LocalStrategy = require("passport-local").Strategy;

passport.use(
	new LocalStrategy(function(username, password, done) {
		User.find({
			where: {
				username: username
			}
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

// middleware for protecting routes and validating forms

const loggedInOnly = (req, res, next) => {
	console.log(req.user);
	if (req.user) {
		next();
	} else {
		res.redirect("/login");
	}
};

const loggedOutOnly = (req, res, next) => {
	if (!req.user) {
		next();
	} else {
		res.redirect("/");
	}
};

const formValid = (req, res, next) => {
	console.log(req.body);
	if (req.body.username && req.body.password) {
		console.log("I satisfied the if!");
		next();
	} else {
		req.flash("danger", "All form fields are required.");
		res.redirect("back");
	}
};

// Login/register/logout routes

app.get("/", loggedInOnly, (req, res) => {
	User.findById(req.user.id, {
		include: [
			{
				model: List,
				as: "ownedLists",
				include: [{ model: ListItem }, { model: User, as: "buddy" }]
			},
			{
				model: List,
				as: "buddyLists",
				include: [{ model: ListItem }, { model: User, as: "owner" }]
			}
		]
	})
		.then(user => {
			res.render("dashboard", { user });
		})
		.catch(e => {
			req.flash(e.message);
		});
});

app.get("/login", loggedOutOnly, (req, res) => {
	res.render("login");
});

app.get("/register", loggedOutOnly, (req, res) => {
	res.render("register");
});

app.post(
	"/login",
	[loggedOutOnly, formValid],
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
		failureFlash: true
	})
);

app.post("/register", [loggedOutOnly, formValid], (req, res) => {
	const params = {
		username: req.body.username,
		password: req.body.password,
		currency: 0
	};
	User.create(params)
		.then(user => {
			res.redirect("/login");
		})
		.catch(e => {
			req.flash("danger", e.message);
			res.redirect("back");
		});
});

app.delete("/logout", loggedInOnly, (req, res) => {
	req.logout();
	req.method = "GET";
	res.redirect("/login");
});

// Routes

app.use("/lists", loggedInOnly, require("./routes/lists"));
app.use(
	"/lists/:listId/listitems",
	loggedInOnly,
	require("./routes/listitems")
);

// Start server

app.listen(3000, () => {
	console.log("Now listening...");
});
