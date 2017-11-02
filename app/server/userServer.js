/**
 * Created by lailai on 2017/11/2.
 * 处理从Dao层获取的数据返回给controller
 */
const userDao=require('./../userDao.js');

var getUserById=async(userId)=>{
    var users=userDao.getUserById(userId);
    var responseText='';
    for(let user of users){
        responseText+='姓名:'+user.name+'&nbsp;|';
        responseText+='年龄:'+user.age+'&nbsp;|';
        responseText+='身高:'+user.height+'&nbsp;|';
    }
    return responseText;
};
module.exports={
    getUserById: getUserById
};
