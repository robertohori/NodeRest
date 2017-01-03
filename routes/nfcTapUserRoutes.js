    var express = require("express");
    
    var routes = function(pool)
    {
        var nfcTapUserRouter = express.Router();
        var nfcTapUserController = require('../controllers/nfcTapUserController')(pool);
        nfcTapUserRouter.route('/')
            .post(nfcTapUserController.post)
            .get(nfcTapUserController.get);

        return nfcTapUserRouter;
    };

module.exports = routes;