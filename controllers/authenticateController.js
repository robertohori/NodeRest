var express = require("express");
jwt    = require('jsonwebtoken');


var authenticateController = function(pool,Config){

    var post = function(req,res) {


        pool.getConnection(function (err, connection) {


            var r_password = req.body.password || req.query.password || req.headers['password'];

            var r_user = connection.escape( req.body.user || req.query.user || req.headers['user']);

            if (err)
                throw (err);



            if (!r_user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else {

                var sql = 'select * from tb_user_system ';
                sql += ' WHERE user like ' + r_user + ' and active=1' ;
                // console.log(sql);
                var query = connection.query(sql, function (err, resuslt) {
                  //  console.log(resuslt[0].password);
                //    console.log(":");
               //     console.log(r_password);


                    if (typeof resuslt[0] != 'undefined'){
                       // console.log("is not undefined");
                        if (resuslt[0].password !== r_password)  {
                            res.json({ success: false, message: 'Authentication failed.', data:{} });
                        } else {

                             // if user is found and password is right
                             // create a token
                             var config = new Config;

                             var token = jwt.sign({data: resuslt[0].id_user_system}, config.secret.secret, { expiresIn: '24h' });

                             // return the information including token as JSON
                             res.json({
                             success: true,
                             message: 'Enjoy your token!',
                             data: {token: token}
                             });



                          //  console.log(config.secret.secret);
                             }



                    // check if password matches
                    }else{
                        res.json({ success: false, message: 'Authentication failed.' });
                    }

                });

            };
            connection.release();

        });

    };


    return{
        post:post


    };
};
module.exports = authenticateController;