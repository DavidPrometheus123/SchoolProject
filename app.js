const express = require("express"),
      app     = express(),
      bodyParser = require("body-parser"),
      ejs = require("ejs"),
      passport = require("passport"),
      LocalStrategy = require("passport-local"),
      methodOverride = require("method-override"),
      mongoose = require("mongoose"),
      flash = require("connect-flash");
      
mongoose.connect("mongodb://localhost/school_project");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

var commentModel = new mongoose.Schema({
   content: String,
   author: String
});

var Comment = mongoose.model("Comment", commentModel);

var skillModel = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    author: String,
    comments: [commentModel]
});

var Skill = mongoose.model("Skill", skillModel);


app.get("/meir", function(req, res) {
    res.render("meir.ejs");
});

app.get("/hjem", function(req, res) {
    Skill.find({}, function(err, skills) {
       if(err) {
           console.log(err);
       } else {
          res.render("landingPage.ejs", {skills: skills}); 
       }
    });
});

app.get("/kontakt", function(req, res) {
    res.render("KontaktOss.ejs");
});

app.get("/new_skill", function(req, res) {
   res.render("new"); 
});

app.get("/om", function(req, res) {
    res.render("OmOss.ejs");
});

app.post("/hjem", function(req, res) {
   Skill.create(req.body.skill, function(err, skill) {
       if(err) {
           console.log(err);
       } else {
           console.log(skill);
           res.redirect("/hjem");
       }
   });
});

app.get("/skills/:id", function(req, res) {
    Skill.findById(req.params.id, function(err, skill) {
       if(err) {
           console.log(err);
           res.redirect("back");
       } else {
           res.render("show", {skill: skill});
       }
    });
});

app.get("/skills/:id/comments/new", function(req, res) {
    Skill.findById(req.params.id, function(err, skill) {
       if(err) {
           console.log(err);
           res.redirect("back");
       } else {
           res.render("new_comment", {skill: skill});
       }
    });
});

app.post("/skills/:id", function(req, res) {
   Skill.findById(req.params.id, function(err, skill) {
       if(err) {
           console.log(err);
       } else {
           console.log(skill);
           Comment.create(req.body.comment, function(err, comment) {
               if(err) {
                   console.log(err);
               } else {
                   skill.comments.push(comment);
                   skill.save();
                   res.redirect("/skills/" + req.params.id);
               }
           });
       }
   });
});



app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Everything is working fine!");
});
      
