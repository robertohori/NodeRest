var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var profModel = new Schema({
    rfid:{type:String},
    name:{type:String },
    email:{type:String},
    date_birth:{type:Date},
    access:[{ password:{type:String},user:{type:String}}],
    address:{type:String},
    zip:{type:String},
    province:{type:String},
    number:{type:String},
    country:{type:String},
    contact:[{phone:{type:String},emergency:{type:String}}],
    class:
        [{
            name:{type:String},
            week:{type:String},
            hour_begin:{type:Date},
            hour_end:{type:Date}

        }],
    active_on_class:{type:Boolean},
    attend:
        [{
            id_client:{type:String},
            data:{type:Date}
        }]
});

module.exports = mongoose.model('Prof',profModel);