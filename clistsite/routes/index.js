var express = require('express');
var router = express.Router();

var models = require("../models.js");
var Post = models.Post;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('entry');
});

router.get('/feed', function(req, res, next){
  res.render('feed')
})
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
      alert("Error saving post :(")
      console.log("error saving post ", err )
    }
    else{
      alert("Your post had been saved!");
      console.log("POST SAVED to DB", success)
      res.send("entry")
    }
  })
})

module.exports = router;
