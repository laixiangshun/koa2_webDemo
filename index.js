/**
 * Created by lailai on 2017/11/2.
 * 程序入口文件
 */
const koa=require('koa');
const app=new koa();
const router=require('./app/routers.js');
const config=require('./config/config.local.js');

//koa-xml-body自动解析请求的报文是xml格式
const xmlParse=require('koa-xml-body');
app.use(xmlParse()).use((ctx,next)=>{
    ctx.data=ctx.request.body;
    return next();
});

app.use(router());
app.listen(config.port);
console.log('server start on port '+config.port);