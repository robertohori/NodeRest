var param = require('jquery-param');
var blogController = function(pool){


var remove = function(req,res){
     
        id_blog = req.params.id_blog ;
  
        if(id_blog){

        pool.getConnection(function(err, connection) {


            var query = connection.query('DELETE FROM tb_blog where id_blog=?', id_blog, function(err, resuslt){
                if (!err){

                    res.status(201).send({ success: true, message: 'Cadastro excluido',data: id_blog });
                }else{
                    if (typeof query !=="undefined"){
                        query = query.sql;
                    }else
                    {
                        query = "undefined"
                    }
                    var query2 = connection.query('INSERT INTO tb_logs (error,name_table,query) values ("'+err+'","tb_blog","remove","'+query+'")', function(err2, resuslt){
                        if(err2){

                        }
                    });

                    res.status(500).json({ success: false, message: err,data:{} });

                }
            });
          //  console.log(query.sql);
            connection.release();
         //   connection.end();


        });
        }else{
     res.status(500).json({ success: false, message: "Id nao indentificado",data:{}});
}

        }

    var post = function(req,res){
        console.log("post")
        post_t = req.body ;



        pool.getConnection(function(err, connection) {


            var query = connection.query('INSERT INTO tb_blog SET ?', post_t, function(err, resuslt){
                if (!err){


                    console.log(query.sql);
                    post_t.id_blog = resuslt.insertId;



                    res.status(201).send({ success: true, message: 'Cadastro concluido',data: post_t });
                }else{
                    if (typeof query !=="undefined"){
                        query = query.sql;
                    }else
                    {
                        query = "undefined"
                    }
                    var query2 = connection.query('INSERT INTO tb_logs (error,name_table,query) values ("'+err+'","tb_blog","post","'+query+'")', function(err2, resuslt){
                        if(err2){

                        }
                    });

                    res.status(500).json({ success: false, message: err,data:{} });

                }
            });
          //  console.log(query.sql);
            connection.release();
         //   connection.end();

        });




    };
    var get = function(req,res){
      //  console.log("get")
       var query_i ="";
       var type = req.headers['type'];
        if (type ==='1'){
            type = 'and'
        }else{
            type = 'or'
        };



        pool.getConnection(function(err, connection) {
            var query = req.query; 
            if (query ===null)
                    query = false;
            if(query ){
                post_t = req.query
                for(var p in post_t)
                {
                    query_i +=" "+type+" " + p+" like '%"+post_t[p]+"%'" ;
                }
                query_i = query_i.substring(4);
                


            }
            if (typeof query_i ==="undefined" || query_i ===''){
                query_i = "1=1";
            }

            var query = connection.query('SELECT * FROM tb_blog where '+query_i , function (err, resuslt) {
                if (!err) {
                   //
                        if( resuslt.length >0){
                            res.status(201).send({ success: true, message: 'Done',data:resuslt  });
                        }else{
                            res.status(201).send({ success: false, message: 'Done',data:resuslt  });
                        }


                } else {
                    if (typeof query !=="undefined"){
                        query = query.sql;
                    }else
                    {
                        query = "undefined"
                    }
                    var query2 = connection.query('INSERT INTO tb_logs (error,name_table,action,query) values ("' + err + '","tb_blog","get","'+query+'")', function (err2, resuslt) {
                        if (err2) {
                         //   console.log("teste:" + err2);
                         //   console.log('error: ', query2.sql);
                        }
                    });
                    res.status(500).json({ success: false, message: err ,data:{}});
                }
            });
            //  console.log(query.sql);
            connection.release();
        });





    };

    var put = function(req,res) {


            pool.getConnection(function(err, connection) {
                if(req.body ){
                    var type = req.headers['type'];
                    if (type !=='1'){
                        type = 'and'
                    }else{
                        type = 'or'
                    };


                    var query_i ="";
                    var query_2 ="";
                    var values = req.body.values;
                    var wheres = req.body.wheres;



                    for(var p in wheres)
                    {
                        query_i +=" "+type+" " + p+" like "+connection.escape(wheres[p])+"" ;
                    }
                    query_i = query_i.substring(4);

                    for(var p in values)
                    {
                        query_2 +=", " + p+" = "+connection.escape(values[p])+"" ;
                    }
                    query_2 = query_2.substring(2);



                }


                var query = connection.query('UPDATE tb_blog SET '+query_2+' where '+query_i , function (err, resuslt) {
                    if (!err) {
                        var query = connection.query('SELECT * FROM tb_blog where '+query_i , function (err, resuslt) {
                            if (!err) {
                                res.status(201).send({ success: true, message: 'Done', data: resuslt  });
                            }
                        });


                    } else {
                        if (typeof query !=="undefined"){
                            query = query.sql;
                        }else
                        {
                            query = "undefined"
                        }
                        var query2 = connection.query('INSERT INTO tb_logs (error,name_table,action,query) values ("' + err + '","tb_blog","get","'+query+'")', function (err2, resuslt) {
                            if (err2) {
                                //   console.log("teste:" + err2);
                                //   console.log('error: ', query2.sql);
                            }
                        });
                        res.status(500).json({ success: false, message: err ,data:{}});
                    }
                });
                //  console.log(query.sql);
                connection.release();
            });

    }
;


    return{
        post:post,
        get:get,
        put:put,
        remove:remove


    }
};
module.exports = blogController;