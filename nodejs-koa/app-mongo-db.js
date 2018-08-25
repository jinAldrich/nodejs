/**
 *
 * Created by yujin on 2018/8/25
 *
 */

const Koa = require('koa');
const Router = require('koa-router');
const render = require('koa-art-template');
const path = require('path');
const DB = require('./module/DB');

const app = new Koa();
const router = new Router();

render(app, {
    root:path.join(__dirname, 'views'),
    extname:'.html',
    debug:process.env.NODE_ENV !== 'production'
});


router.get("/", async (ctx)=>{
    console.time('start');
    let result = await DB.find("userInfo", {});
    console.timeEnd('start');
});

router.get("/news", async (ctx)=>{
    console.time('start2');
    let result = await DB.find("userInfo", {});
    console.timeEnd('start2');
});


router.get("/login", async (ctx)=>{
    console.time('start2');
    let result = await DB.find("userInfo", {'userName': '孙悟空'});
    console.log(result);
    console.timeEnd('start2');
});

router.get("/register", async (ctx)=>{
    console.time('start2');
    let result = await DB.insert("userInfo", {'userId':'10015', 'userName': '孙悟空', 'userPassword':"123456", 'age':27, 'sex':1});
    console.log(result);
    console.timeEnd('start2');
});
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(8100, '127.0.0.1');