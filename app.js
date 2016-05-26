var express = require('express'),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

var db = mongoose.connect('mongodb://localhost/bookAPI');
var  Book = require("./models/bookModel");
var  User = require("./models/userModel");
var Config = require("./config.js");

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
bookRouter = require("./routes/bookRoutes")(Book);
userRouter = require("./routes/userRoutes")(User);
authenticateRouter = require("./routes/authenticateRoutes")(User);

app.use('/api/authenticate',authenticateRouter);
config = new Config;

app.set('superSecret',config.secret.secret);

app.use(function(req,res,next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp

        jwt.verify(token,app.get('superSecret') , function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes

                console.log(decoded);
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

app.use('/api/users',userRouter);
app.use('/api/books',bookRouter);

//


app.get('/',function(req,res){
    res.send('welcome');
});

app.listen(port, function(){
   console.log('Running on port:'+port);
});
