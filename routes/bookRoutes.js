    var express = require("express");
    var routes = function(Book){
    var bookRouter = express.Router();
    var bookController = require('../controllers/bookController')(Book);
    var bookIdController = require('../controllers/bookIdController')(Book);
    bookRouter.route('/')
        .post(bookController.post)
        .get(bookController.get);
    bookRouter.use('/:bookId',bookIdController.byId);
    bookRouter.route('/:bookId')
        .get(bookIdController.get)
        .put(bookIdController.put)
        .patch(bookIdController.patch)
        .delete(bookIdController.del);

    return bookRouter;
};

module.exports = routes;