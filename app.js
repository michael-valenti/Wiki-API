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
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");

//article schema
const articleSchema = {
  title: String,
  content: String
};

//create Article model
const Article = mongoose.model('Article', articleSchema);

//query items inside of articles collection when client visists http://localhost:3000/articles
app.get("/articles", (req, res) =>{
  //query for all articles and log to console
Article.find((err, foundArticles)=>{
  if(!err){console.log(foundArticles);
  }else{
    console.log(err);
  }

});
});


app.listen(port, function() {

  console.log("Server has started successfully!");


});
