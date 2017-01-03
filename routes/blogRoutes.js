
module.exports = function(pool,app)
    {
       // var blogRouter = express.Router();
        var blogController = require('../controllers/blogController')(pool);
       
        app.route('/api/blog')
            .post(blogController.post)
            .get(blogController.get);

        app.route('/api/blog/:id_blog')
            .put(blogController.put)
             .delete(blogController.remove);

      //  return blogRouter;
    };