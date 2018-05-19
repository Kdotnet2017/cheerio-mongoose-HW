var express = require("express");
var bodyParser = require("body-parser");

// Database connection
var connection = require("./config/connection.js");

var env = require('dotenv').load();
var PORT = process.env.PORT || 5000;

var app = express();

//body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));

//handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//routes
var routes = require("./controllers/appControllers.js");
app.use(routes);

app.listen(PORT, function (error) {
    if (error) {
        console.log(error);
        throw error;
    }
    else {
        console.log("server is UP on " + PORT);
    }
});