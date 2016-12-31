    var express = require("express");
    var routes = function(pool)
    {
        var userRouter = express.Router();
        var userController = require('../controllers/userController')(pool);
        userRouter.route('/')
            .post(userController.post)
            .get(userController.get)
        .put(userController.put);

        return userRouter;
    };

module.exports = routes;