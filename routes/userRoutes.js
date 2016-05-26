    var express = require("express");
    var routes = function(User)
    {
        var userRouter = express.Router();
        var userController = require('../controllers/userController')(User);
        userRouter.route('/')
            .post(userController.post)
            .get(userController.get);

        return userRouter;
    };

module.exports = routes;