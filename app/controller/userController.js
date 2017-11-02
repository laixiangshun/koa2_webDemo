/**
 * Created by lailai on 2017/11/2.
 * 处理具体请求信息以及返回数据
 */
const userServer=require('./../server/userServer.js');

var getUserInfo=(ctx,next)=>{
    let query=ctx.query;
    let userId=query.id;
    let userInfo=userServer.getUserById(userId);
    let html='<html><body>' +'<div> userInfo:&nbsp;'+userInfo+'</div>'
        +'</body></html>';
    ctx.response.type='text/html';
    ctx.response.body=html;
};

var saveUserInfo=(ctx,next)=>{
    const requestString=ctx.data;
    //do
    console.log(requestString);
};

module.exports={
    'GET/getUserInfo': getUserInfo,
    'POST/saveUserInfo': saveUserInfo
};


