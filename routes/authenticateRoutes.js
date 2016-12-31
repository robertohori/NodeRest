var express = require("express");
var Config = require("../config.js");

var routes = function(pool)
{
    var authenticateRouter = express.Router();



    var authenticateController = require('../controllers/authenticateController')(pool,Config);
    authenticateRouter.route('/')
        .post(authenticateController.post);

    return authenticateRouter;
};

module.exports = routes;