const mongoose = require('mongoose')

var Schema = mongoose.Schema;

var clistSchema = new Schema({
    img: { data: String, contentType: String },
    title: {type: String, required: true},
    description: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String},
    uploadDate: {type: Date, default: Date.now}
});

module.exports = {
  Post : mongoose.model("cList", clistSchema)
}
