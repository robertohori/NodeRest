var express = require("express");
var Config = require("../config.js");

var routes = function(User)
{
    var authenticateRouter = express.Router();



    var authenticateController = require('../controllers/authenticateController')(User,Config);
    authenticateRouter.route('/')
        .post(authenticateController.post);

    return authenticateRouter;
};

module.exports = routes;