var express=require("express");
var mongoose=require("mongoose");
var cheerio=require("cheerio");
var connection=require("./config/connection.js");
var env = require('dotenv').load();
var PORT = process.env.PORT || 5000;

var app=express();

app.use(express.static("./public"));

var routes=require("./controllers/appControllers.js");
app.use(routes);

//I will move it to configuration folder later
//mongoose.connect("mongodb://localhost/CheerioMongooseHW");

app.listen(PORT,function(error){
    if(error){
        console.log(error);
        throw error;
    }
    else{
    console.log("server is UP on "+PORT);
    }
});