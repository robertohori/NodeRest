var profController = function(Prof,connection){


    var post = function(req,res){
        var prof = new Prof(req.body);
            prof.save();
            res.status(201).send(prof);
        };
    var put = function(req,res){

        var query = {};
        if(req.query.rfid){
            query.rfid = req.query.rfid;
        }
        console.log(req.query.rfid);
        Prof.find(query,function(err,prof){
            if(err) {
                res.status(500).send(err);
                console.log(err);
            }
            else if(prof)
            {
                req.prof = prof;

                for(var p in req.prof[0])
                {
                    console.log(p);
                   // req.prof[p] = req.body[p];
                    console.log("Teste:"+req.prof[p]);
                }


            }else{
                res.status(404).send('no prof found');
            }


        //    console.log(prof);

        });


    };
    var get = function(req,res){

        //  var responseJson = {hello:"This is my api"};
        var query = {};
        if(req.query.rfid){
            query.rfid = req.query.rfid;
        }

        Prof.find(query,function(err,profs){
            if(err)
                res.status(500).send(err);
            else
                res.json(profs);
        });
        //   res.json(responseJson)
    };


    return{
        post:post,
        get:get,
        put:put

    }
};
module.exports = profController;