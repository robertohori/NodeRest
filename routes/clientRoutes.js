
var express = require("express");
var routes = function(Client)
{
    var clientRouter = express.Router();
    var clientController = require('../controllers/clientController')(Client);
    clientRouter.route('/')
        .post(clientController.post)
        .get(clientController.get);

    return clientRouter;
};

module.exports = routes;