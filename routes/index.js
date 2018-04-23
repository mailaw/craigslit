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
    //res.status(200).render("post", {img: post.img});
    res.status(200).render("entry_indv",{
      img: post.img,
      title: post.title,
      description: post.description,
      email: post.email,
      phone: post.phone,
      price: post.price,
      uploadDate: post.uploadDate
    });

  })
  .catch((err)=> {
    console.log("error ~~~", err)
    res.status(500).json(err)})
});

router.get('/feed/:cat', function(req, res, next){
  var postsArray = [];
  let cat = req.params.cat;
  if(!req.params.cat){
    cat = req.params.category;
  }
  return new Promise(function(resolve, reject){
    Post.find({category: cat}, function(err, posts){
      if(err){reject(err)};
      resolve(posts)
    })
    .then((posts)=> res.render('feed', {postsArray: posts}))
  })
  .catch((err)=> console.error("error caught while retrieving posts", err))
});

router.post('/savePost', function(request, response, next) {
  console.log("Receieved by index.js /savePost", request.body)
  new Post({
    category: request.body.category,
    img: request.body.img,
    title: request.body.title,
    description: request.body.description,
    email: request.body.email,
    phone: request.body.phone,
    price: request.body.price,
    date: request.body.uploadDate
  }).save(function(err, post){
    if(err){
      //alert("Error saving post :(")
      console.log("error saving post ", err )
    }
    else{
      //alert("Your post had been saved!");
      console.log("POST SAVED to DB", post)
      response.redirect("/entry_indv/"+post._id)
    }
  })
});

module.exports = router;
