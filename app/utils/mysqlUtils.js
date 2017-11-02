/**
 * Created by lailai on 2017/11/2.
 * 数据库操作——数据库连接池控制，连接建立、释放管理，执行Dao发起的数据库操作请求
 */
const mysql=require('mysql');
const config=require('./../../config/config.local.js');

//创建数据库连接池
var connectionPool=mysql.createPool({
    'host': config.database.host,
    'port': config.database.port,
    'user': config.database.user,
    'password': config.database.password,
    'charset': config.database.charset,
    'connectionLimit': config.database.connectionLimit,
    'supportBigNumbers': true,
    'bigNumberStrings': true
});

//释放数据库连接
var release=connection=>{
    connection.end(function (err) {
        if(err){
            console.log('connection closed failed');
        }else{
            console.log('connection closed succeeded');
        }
    })
};
var execQuery=sqlOptions=>{
    var results=new Promise((resolve,reject)=>{
        connectionPool.getConnection((err,connection)=>{
            if(err) {
                console.log("Get connection from mysql pool failed !");
                throw error;
            }
            var sql=sqlOptions['sql'];
            var args=sqlOptions['args'];
            if(!args){
                var query=connection.query(sql,(err,results)=>{
                    if(err){
                        console.log('execute query error');
                        throw error;
                    }
                    resolve(results);
                })
            }else{
                var query=connection.query(sql,args,function(err,results){
                    if(err){
                        console.log('execute query error');
                        throw error;
                    }
                    resolve(results);
                })
            }
            connection.release(function(err){
                if(err){
                    console.log('mysql connection close failed');
                    throw  error;
                }
            })
        })
    }).then(function(chunk){
            return chunk;
        });
    return results;
};

module .exports={
    release: release,
    execQuery: execQuery
};