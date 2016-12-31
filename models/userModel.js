// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
    var userModel = new Schema({
        name: {type:String },
        password: {type:String },
        admin: {type:Boolean,default:false }
    });

module.exports = mongoose.model('User',userModel);