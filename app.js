//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const homeStartingContent = "Hung-Chun is a graduate student studying EECS at UC Berkeley. He has solid CS fundamentals through courses such as Data Structure, Algorithms, Computer Networks, and Operating Systems, etc. He also became proficient in C++ and gained experience in the Linux environment through several related programming projects. He also worked as a Research Assistant at Academia Sinica, solving computer vision tasks with deep learning methods. During the project, he maintained a code base that could be easily ported with different deep learning models,  so he gained proficiency in object-oriented programming in Python and the ability to handle huge coding projects. During his free time, he also learned full-stack development through online courses, so he had experience building projects using frontend technologies such as Javascript, React.js, backend technologies like Node.js, Express, and database knowledge such as SQL, MongoDB. With solid CS fundamentals, OOP knowledge, experience with huge coding projects, and familiarity with web technologies, he will be a good fit for the software engineering intern role.";
const aboutContent = "I’ve become familiar with CS fundamentals through courses such as Data Structure, Algorithms, and Computer Networks. During my free time, I also learned full-stack development through online courses, so I had experience building projects using frontend technologies such as Javascript, React.js, backend technologies like Node.js, Express, and database knowledge such as SQL, MongoDB. I’m also proficient in several programming languages. I’ve written C++ in most of my school projects, Javascript in my web-related side projects, and Python in my research projects on machine learning.";
const contactContent = "Linkedin: https://www.linkedin.com/in/hcjackchen/; node Github: https://github.com/jackchen03";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-jack:jack91052@cluster0.4q1hv.mongodb.net/postDB", {useNewUrlParser: true});

const Schema = mongoose.Schema;
const postsSchema = new Schema({
  title: String,
  content: String
});
const Post = mongoose.model("Post", postsSchema);

app.get("/", function(req, res){
  Post.find({}, (err, foundPosts) => {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: foundPosts
    });
  });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const newPost = new Post({
    title: _.capitalize(req.body.postTitle),
    content: req.body.postBody
  });
  newPost.save((err) => {
    if (!err) { res.redirect("/"); }
  });
});

app.get("/posts/:postId", function(req, res){
  const id = req.params.postId;
  Post.findById(id, (err, foundPost) => {
    res.render("post", {title: foundPost.title, content: foundPost.content});
  });
});

let port = process.env.PORT;
if (port == null || port == ""){
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started on port 3000");
});
