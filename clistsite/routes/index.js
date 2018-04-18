var express = require('express');
var router = express.Router();

var models = require("../models.js");
var Post = models.Post;
Post.find({}, function(err, results){
  if(err){console.error("ERROR", err)}
  else{
    console.log("RESULTS here", results)
  }
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/', function(req, res, next) {
  res.render('entry');
});

router.post('/savePost', function(request, response, next) {
  console.log("Data received by /savePost",request.body.title, request.body.description, request.body.email, request.body.phone);
  new Post({
    img: request.body.img,
    title: request.body.title ,
    description: request.body.description ,
    email: request.body.email,
    phone: request.body.phone
  }).save(function(err, success){
    if(err){
      console.log("error saving post ", err )
    }
    else{
      console.log("POST SAVED to DB", success)
    }
  })

})

module.exports = router;
