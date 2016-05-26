var bookIdController = function(Book){

    var byId = function(req,res,next){
        Book.findById(req.params.bookId,function(err,book){
            if(err)
                res.status(500).send(err);
            else if(book)
            {
                req.book = book;
                next();
            }else{
                res.status(404).send('no book found');
            }

        });
    };

        var get = function(req,res){
            res.json(req.book);
        };

        var put = function(req,res){
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            req.book.save(function(err){
                if (err){
                    res.status(500).send(err);
                } else{
                    res.json(req.book);
                }
            });
        };

        var patch = function(req,res){
            if(req.body._id)
                delete req.body._id;
            for(var p in req.body)
            {
                req.book[p] = req.body[p];
            }
            req.book.save(function(err){
                if (err){
                    res.status(500).send(err);
                } else{
                    res.json(req.book);
                }
            })
        };

        var del = function(req,res){
            req.book.remove(function(err){
                if(err){
                    res.status(500).send(err);
                }else{
                    res.status(204).send("removed");
                }
            })
        };

    return{
        byId:byId,
        get:get,
        put:put,
        patch:patch,
        del:del

    }
};
module.exports = bookIdController;