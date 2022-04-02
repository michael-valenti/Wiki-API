const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
const port = 3000;



app.set("view engine", "ejs");

//must use to parse from body
app.use(bodyParser.urlencoded({
  extended: true
}));

//use static files in the folder named public
app.use(express.static("public"));

//connect to new DB name wikiDB
mongoose.connect("mongodb://localhost:27017/wikiDB");


app.listen(port, function() {

  console.log("Server has started successfully!");


});
