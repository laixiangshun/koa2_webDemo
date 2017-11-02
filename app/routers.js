/**
 * Created by lailai on 2017/11/2.
 * 路由文件
 * 自动扫描controller文件夹中的文件来加载请求映射，不需要挨个请求单独配置
 */
const fs=require('fs');
const router=require('koa-router')();

function addMapping(router,mapping){
    for(var url in mapping){
        if(url.startsWith('GET')){
            var path=url.substring(4);
            router.get(path,mapping[url]);
            console.log('register URL mapping :GET ${path}');
        }else if(url.startsWith('POST')){
            var path=url.substring(5);
            router.post(path,mapping[url]);
            console.log('URL mapping :post ${path}');
        }else if(url.startsWith('PUT')){
            var path=url.substring('4');
            router.put(path,mapping[url]);
            console.log('url mapping : put ${path}');
        }else if(url.startsWith('DELETE')){
            var path=url.substring('7');
            router.del(url,mapping[url]);
            console.log('url mapping :delete ${path}');
        }else{
            console.log('invalid url: ${url}');
        }
    }
}

function addControllers(router,dir){
    fs.readdirSync(__dirname+'/'+dir).filter((f)=>{
        return f.endsWith('.js');
    }).forEach((f)=>{
        console.log('process controller:${f}......');
        let mapping=require(__dirname+'/'+dir+'/'+f);//加载每个controller中的js文件
        addMapping(router,mapping);
    })
}

module .exports=function(dir){
    var controllerDir= dir || controller;
    addControllers(router,controllerDir);
    return router.routes();
};