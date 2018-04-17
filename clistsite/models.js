const mongoose = require('mongoose')
//var??
var Schema = mongoose.Schema;

//techincally a postSchema
var postSchema = new Schema({
    img: { data: String, contentType: String },
    title: {type: String, required: true, max: 300},
    description: {type: String, required: true},
    email: {type: String, required: true, max: 100},
    phone: {type: String, max: 20},
    uploadDate: {type: Date, default: Date.now}
    //category: {type: String, required: true, enum: ['for exchange','personals'], default: 'for exchange'},
});

// Virtual for post's URL
//returns the absolute URL required to get a particular instance of the model
postSchema
.virtual('url')
.get(function () {
  return '/catalog/post/' + this._id;
});


//potentially change clist > post
//module.exports = mongoose.model("cList", clistSchema);
//Export model
module.exports = { Post : mongoose.model("cList post", postSchema) }
