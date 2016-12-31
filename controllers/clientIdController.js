var clientIdController = function(Client){

    var byId = function(req,res,next){
        Client.findById(req.params.clientId,function(err,client){
            if(err)
                res.status(500).send(err);
            else if(client)
            {
                req.client = client;
                next();
            }else{
                res.status(404).send('no client found');
            }

        });
    };

        var get = function(req,res){
            res.json(req.client);
        };

        var put = function(req,res){
            req.client.name = req.body.name;
            req.client.email = req.body.email;

            req.client.save(function(err){
                if (err){
                    res.status(500).send(err);
                } else{
                    res.json(req.client);
                }
            });
        };

        var patch = function(req,res){
            if(req.body._id)
                delete req.body._id;
            for(var p in req.body)
            {
                req.client[p] = req.body[p];
            }
            req.client.save(function(err){
                if (err){
                    res.status(500).send(err);
                } else{
                    res.json(req.client);
                }
            })
        };

        var del = function(req,res){
            req.client.remove(function(err){
                if(err){
                    res.status(500).send(err);
                }else{
                    res.status(204).send("removed");
                }
            })
        };

    return{
        byId:byId,
        get:get,
        put:put,
        patch:patch,
        del:del

    }
};
module.exports = clientIdController;