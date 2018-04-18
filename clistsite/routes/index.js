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
  res.send("id is set as" + req.params._id);
  //res.render('entry_indv');
  //res.render('entry_indv', function(err, html){
    //res.send('<p>some html{{:id}}</p>');
    //res.send('entry_indv');
  //});
});



router.get('/feed', function(req, res, next){
  var postsArray = [];
  Post.find(function(err, posts){
    postsArray = posts
    console.log(posts)
  })
  console.log(postsArray);
  setTimeout(function(){res.render('feed', {postsArray: postsArray})}, 500)
});
// { uploadDate: 2018-04-17T23:34:06.729Z,
//     _id: 5ad6846e02ab0c105eb08945,
//     title: 'asd',
//     description: 'asd',
//     email: 'email',
//     phone: 'phone',
//     __v: 0 }
router.post('/savePost', function(request, response, next) {
  console.log("Data received by /savePost",request.body)
  new Post({
    img: request.body.img,
    title: request.body.title ,
    description: request.body.description ,
    email: request.body.email,
    phone: request.body.phone
  }).save(function(err, success){
    if(err){
      //alert("Error saving post :(")
      console.log("error saving post ", err )
    }
    else{
      //alert("Your post had been saved!");
      console.log("POST SAVED to DB", success)
      response.send("entry")
    }
  })
});

module.exports = router;
