
var express = require("express");
var routes = function(Prof,connection)
{
    var profRouter = express.Router();
    var profController = require('../controllers/profController')(Prof,connection);
    profRouter.route('/')
        .post(profController.post)
        .get(profController.get)
        .put(profController.put);

    return profRouter;
};

module.exports = routes;