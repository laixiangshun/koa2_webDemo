/**
 * Created by lailai on 2017/11/2.
 * 操作数据库
 */
const mysql=require('./../utils/mysqlUtils.js');

var getUserById=async (userId)=>{
    let mysqlOptions={
        sql: 'select * from table_user where user_id=?',
        args: [userId]
    };
    var users=await mysql.execQuery(mysqlOptions);
    if(users.length==0){
        return null;
    }else {
        return users;
    }
};

module .exports={
    getUserById: getUserById
};