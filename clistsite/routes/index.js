var express = require('express');
var router = express.Router();

var models = require("../models.js");
var Post = models.Post;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/entry', function(req, res, next) {
  res.render('entry');
});


router.get('/entry_indv/:_id', function(req, res, next) {
  //var postID = :_id
  //console.log(req.params);
  return new Promise(function(resolve, reject){
    Post.findById(req.params._id, function(err, post){
      if(err){
        reject("Error finding post", err)
      }
        resolve(post)
    })
  })
  .then((post)=>{
    console.log("Individual post", post.img)
    console.log("title", post.title)
    console.log("description", post.description)
    console.log("email", post.email)
    console.log("phone", post.phone)
    console.log("uploadDate", post.uploadDate)

    res.status(200).render("entry_indv",{
      img: post.img,
      title: post.title,
      description: post.description,
      email: post.email,
      phone: post.phone,
      uploadDate: post.uploadDate
    });
    //res.status(200).render("post", {img: post.img, title: post.title});
  })
  .catch((err)=> {
    console.log("error ~~~", err)
    res.status(500).json(err)})
});



router.get('/feed', function(req, res, next){
  var postsArray = [];
  return new Promise(function(resolve, reject){
    Post.find(function(err, posts){
      if(err){reject(err)};
      resolve(posts)
    })
    .then((posts)=> res.render('feed', {postsArray: posts}))
  })
  .catch((err)=> console.error("error caught while retrieving posts", err))
});

router.post('/savePost', function(request, response, next) {
  console.log("Data received by /savePost",request.body.description)
  new Post({
    img: request.body.img,
    title: request.body.title ,
    description: request.body.description,
    email: request.body.email,
    phone: request.body.phone,
    date: request.body.uploadDate
  }).save(function(err, success){
    if(err){
      //alert("Error saving post :(")
      console.log("error saving post ", err )
    }
    else{
      //alert("Your post had been saved!");
      console.log("POST SAVED to DB", success)
      response.redirect("/feed")
    }
  })
});

module.exports = router;
