var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var clientModel = new Schema({
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
    membership:
        [{
            fee:{type:String},
            meth_pay:{type:String},
            last_pay:{type:Date},
            term_begin:{type:Date},
            term_end:{type:Date},
            day_pay:{type:String},
            stop_status:{type:String},
            stop_begin:{type:Date},
            stop_end:{type:Date}
        }],
    family_member:[{name:{type:String },id_cli:{type:String }}],
    active_on_class:{type:String},
    attend:
        [{
            id_prof:{type:String},
            data:{type:Date}
        }]
});

module.exports = mongoose.model('Client',clientModel);