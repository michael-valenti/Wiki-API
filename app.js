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

//Express chained route handler
app.route("/articles").get((req, res) => {
    //query for all articles and log to console
    Article.find((err, foundArticles) => {
      if (!err) {
        console.log(foundArticles);
      } else {
        console.log(err);
      }

    });
  })

  .post((req, res) => {
    //grab the title and content that was sent and create a new Article
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });
    //then insert it into our collection
    newArticle.save((err) => {
      //tell the server if it was successful, or if it failed send the error.
      if (!err) {
        res.send("Successfully inserted new article!");
      } else {
        res.send(err);
      }
    });
  })

  .delete((req, res) => {
    //delete all if no conditions are defined in {}
    Article.deleteMany({}, (err) => {
      if (!err) {
        res.send("Successfully deleted all of the articles.");
      } else {
        res.send(err);
      }
    });
  });

app.listen(port, function() {

  console.log("Server has started successfully!");


});
