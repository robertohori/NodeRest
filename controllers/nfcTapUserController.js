var nfcTapUserController = function(pool){


    var post = function(req,res){



        pool.getConnection(function(err, connection) {

            var num_nfc = req.body.num_nfc ;
            var hour =  req.body.hour ;
            if (num_nfc !== "") {
                num_nfc = connection.escape(num_nfc);
                hour = connection.escape(hour);
                var sql = 'select a.id_user,a.name,b.id_class, c.name,a.who_is from tb_user a ';
                sql +=' inner join tb_class_user b on  a.id_user = b.id_user ';
                sql +=' inner join tb_class c on c.id_class = b.id_class ';
                sql += ' WHERE a.num_nfc like ' + num_nfc + ' and a.who_is=1';

                if (hour == "NULL"){
                   // sql += " and  c.hour between  CURRENT_TIME() - INTERVAL 15 MINUTE and  CURRENT_TIME() + INTERVAL 15 MINUTE and c.weekday like DAYNAME(NOW())";
                    sql += " and  c.hour between ADDTIME(NOW(),'-00:15:00')  and ADDTIME(NOW(),'00:15:00') and c.weekday like  DAYNAME(NOW())";
                }else {
                    sql += " and  c.hour between ADDTIME("+hour+",'-00:15:00')  and ADDTIME("+hour+",'00:15:00') and c.weekday like  DAYNAME("+hour+")";
                }
                console.log('teste');

                var query = connection.query(sql, function (err, resuslt) {
                    if (!err) {
                        if (typeof resuslt[0] ==="undefined") {
                            return res.status(500).json("Professor is not valid.");
                        }else{

                            var query3 =  connection.query("select  IFNULL(sum(click),0) as click from tb_tp_class_user_click  where id_user =? ",resuslt[0].id_user, function (err, resuslt2) {

                                if (!err) {

                                    if(resuslt2[0].click =="0") {
                                        connection.query("insert into tb_tp_class_user_click (id_user,hour,click) values ("+resuslt[0].id_user+",now(),1)")
                                        return  res.status(200).send("Tap one more time to start your class ")
                                    }else{

                                        if(resuslt2[0].click==1){
                                            var query2 = connection.query("select  IFNULL(sum( hour),0) as hour from tb_tp_class_user_click where id_user="+resuslt[0].id_user+" and ADDTIME(hour,'00:01:00') >= NOW() order by hour desc limit 1", function (err, resuslt3) {
                                              if (!err) {
                                                  if (resuslt3[0].hour > 0 ) {
                                                      connection.query("insert into tb_class_running (id_user,id_class) values (" + resuslt[0].id_user + "," + resuslt[0].id_class + ")");
                                                      connection.query("delete from tb_tp_class_user_click where id_user=?", +resuslt[0].id_user);
                                                      return res.status(200).send("Start your class ")
                                                  }else{
                                                      connection.query("delete from tb_tp_class_user_click where id_user=?", +resuslt[0].id_user);
                                                      return res.status(200).send("Time expired ")
                                                  }
                                              }else{
                                                  connection.query('INSERT INTO tb_logs (error,name_table,action,query) values ("' + err + '","tb_class_user join tb_class","post","'+query2.sql+'")');
                                                  return res.status(500).json(err);
                                              }
                                            });
                                        }else {
                                          connection.query("delete from tb_tp_class_user_click where id_user=?",resuslt[0].id_user);
                                            return res.status(200).send("Time expired ")
                                        }

                                    }

                                }else{
                                    console.log(err);
                                }
                            });

                        }
                        //return res.status(201).send(resuslt);
                    } else {
                       connection.query('INSERT INTO tb_logs (error,name_table,action,query) values ("' + err + '","tb_tp_class_user_click","post","'+query.sql+'")');
                        return res.status(500).json(err);
                    }
                });
                connection.release();

            }else{
                return res.status(500).json("Not found")
            }

    });
    };
    var get = function(req,res){

    };

    var patch = function(req,res){


    };

    return{
        post:post,
        get:get,
        patch:patch
    }
};
module.exports = nfcTapUserController;
