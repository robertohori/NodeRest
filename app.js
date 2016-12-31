var express = require('express'),
 //   mongoose = require("mongoose"),
    bodyParser = require("body-parser");

//var db = mongoose.connect('mongodb://localhost/keswickPI');
//var  User = require("./models/userModel");

var Config = require("./config.js");
var mysql = require('mysql'),
    connectionsArray = [];
var app = express();
var port = process.env.PORT ||4000;
pool = mysql.createPool({
    host : '127.0.0.1',
    user : 'root',
    password : '!@#123roberto',
    database : 'nfc'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
authenticateRouter = require("./routes/authenticateRoutes")(pool);
app.use('/api/authenticate',authenticateRouter);
app.get('/',function(req,res){
    res.send('welcome');
});




config = new Config;






app.set('superSecret',config.secret.secret);


app.use(function(req,res,next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    //console.log(token);

    // decode token
    if (token) {
        // verifies secret and checks exp

        jwt.verify(token,app.get('superSecret') , function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes

                //console.log(decoded);
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }

});
userRouter = require("./routes/userRoutes")(pool);
nfcTapUserRouter = require("./routes/nfcTapUserRoutes")(pool);
blogRouter = require("./routes/blogRoutes")(pool);
app.use('/api/users',userRouter);
app.use('/api/nfc',nfcTapUserRouter);
app.use('/api/blog',blogRouter);
//




app.listen(port, function(){
   console.log('Running on port:'+port);
});

