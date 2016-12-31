var clientController = function(Client){
    var post = function(req,res){
        var client = new Client(req.body);
        console.log(client);
        client.save();
        res.status(201).send(client);
    };
    var get = function(req,res){
        //  var responseJson = {hello:"This is my api"};
        var query = {};
        if(req.query.name){
            query.name = req.query.name;
        }
        if(req.query.rfid){
            query.rfid = req.query.rfid;

        }

          if(req.query.address){
                    query.title ={$regex:  req.query.address};
                }

        if(req.query.address){
            query.title ={$regex:  req.query.address};
        }
        Client.find(query,function(err,clients){
            if(err)
                res.status(500).send(err);
            else
                res.json(clients);
        });
        //   res.json(responseJson)
    };
    var put = function(req,res){

    }
    return{
        post:post,
        get:get,
        put:put
    }
};
module.exports = clientController;