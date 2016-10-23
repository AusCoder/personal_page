
var express = require("express"),
    hbs = require("hbs"),
    helmet = require("helmet"),
    compress = require("compression");
var app = express();


// =======================
// Middleware
// =======================
app.use("/public", express.static(__dirname + "/public"));

app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(helmet.noSniff());
app.use(compress());

// =======================
// Templating engine
// =======================
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.disable("x-powered-by");

// =======================
// Routes
// =======================
app.get("/", function (req, res) {
	res.render('home', { title: 'Home' });
});

// =======================
// Launch Application
// =======================
var PORT = 10101;
app.listen(PORT, function () {
});
