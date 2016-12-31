    var express = require("express");
    var routes = function(pool)
    {
        var blogRouter = express.Router();
        var blogController = require('../controllers/blogController')(pool);
        blogRouter.route('/')
            .post(blogController.post)
            .get(blogController.get)
        .put(blogController.put);

        return blogRouter;
    };

module.exports = routes;