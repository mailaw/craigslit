var express = require('express');
var router = express.Router();

var models = require("../models.js");
var Post = models.Post;
console.log("POSTY", Post)
Post.find({}, function(err, results){
  if(err){console.error(err)}
  else{
    console.log("RESULTS", results)
  }
})
/* GET home page. */
router.get('/', function(req, res, next) {
  Post.find({}, function(err, results){
    if(err){console.error(err)}
    else{
      console.log("RESULTS", results)
    }
  })
  res.render('index', {posts: results });
});



module.exports = router;
