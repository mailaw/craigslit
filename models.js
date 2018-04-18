const mongoose = require('mongoose')
var Schema = mongoose.Schema;

//techincally a postSchema
var postSchema = new Schema({
    img: {type: String},
    category: {type: String, default: "personals"},
    title: {type: String, required: true, max: 300},
    description: {type: String, required: true},
    email: {type: String, required: true, max: 100},
    phone: {type: String, max: 20},
    uploadDate: {type: Date, default: Date.now}
    //category: {type: String, required: true, enum: ['for exchange','personals'], default: 'for exchange'},
});


//module.exports = mongoose.model("cList", clistSchema);
//Export model
module.exports = { Post : mongoose.model("cList post", postSchema) }
