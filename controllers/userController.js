var userController = function(User){
    var post = function(req,res){

       var user = new User(req.body);
        user.save();
        res.status(201).send(user);
    };
    var get = function(req,res){

        //  var responseJson = {hello:"This is my api"};
        var query = {};
        if(req.query.name){
            query.name = req.query.name;
        }

        User.find(query,function(err,users){
            if(err)
                res.status(500).send(err);
            else
                res.json(users);
        });
        //   res.json(responseJson)
    };


    return{
        post:post,
        get:get

    }
};
module.exports = userController;