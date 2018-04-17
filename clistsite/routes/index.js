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
  //this is a test
  //res.render('index', {title: 'Express'});

  Post.find({}, function(err, results){
    if(err){console.error(err)}
    else{
      console.log("RESULTS here", results)
    }
  })
  res.render('index', {posts: results });
});

router.post('/savePost', function(request, response, next) {
  console.log("YO", request.body);
  // new Post(
  //   img: ,
  //   title: ,
  //   description: ,
  //   email: ,
  //   phone:
  // )}

})

module.exports = router;
