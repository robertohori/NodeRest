var express = require("express");
jwt    = require('jsonwebtoken');


var authenticateController = function(User,Config){

    var post = function(req,res){
        // find the user
        User.findOne({
            name: req.body.name
        }, function(err, user) {

            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {

                // check if password matches
                if (user.password != req.body.password) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {

                    // if user is found and password is right
                    // create a token
                    var config = new Config;

                    var token = jwt.sign(user._id,config.secret.secret, {
                        expiresIn: "24h" // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }

            }

        });
    };




    return{
        post:post


    };
};
module.exports = authenticateController;