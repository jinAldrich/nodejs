/**
 *
 * Created by yujin on 2018/8/25
 *
 */

const Koa = require('koa');
const Router = require('koa-router');
const render = require('koa-art-template');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const DB = require('./module/DB');

const app = new Koa();
const router = new Router();

app.use(bodyParser());

render(app, {
    root:path.join(__dirname, 'views'),
    extname:'.html',
    debug:process.env.NODE_ENV !== 'production'
});


router.get("/", async (ctx)=>{
    console.time('start');
    let result = await DB.find("userInfo", {});
    console.timeEnd('start');
    console.log(result);
    ctx.render('userInfo', {result:result});
});

router.get("/news", async (ctx)=>{
    console.time('start1');
    let result = await DB.find("userInfo", {});
    console.timeEnd('start1');
});


router.get("/login", async (ctx)=>{
    console.time('start2');
    let result = await DB.find("userInfo", {'userName': '孙悟空'});
    console.timeEnd('start2');
});

router.get("/register", async (ctx)=>{
    console.time('start3');
    let result = await DB.insert("userInfo", {'userId':'10015', 'userName': '孙悟空', 'userPassword':"123456", 'age':27, 'sex':1});
    console.timeEnd('start3');
});

router.get("/delete", async (ctx)=>{
    console.time('start4');
    var reg = new RegExp("\"" , "g");
    let id = ctx.query.id.replace(reg, "");
    let result = await DB.delete("userInfo", {'_id':DB.getObjectId(id)});
    ctx.redirect('/');
    console.timeEnd('start4');
});


router.get("/update", async (ctx)=>{
    var reg = new RegExp("\"" , "g");
    let id = ctx.query.id.replace(reg, "");
    console.log("id:" + id);
    let user = await DB.find("userInfo", {_id: DB.getObjectId(id)});
    console.log(user);
    ctx.render('update', {
        user:user[0]
    });
    // console.time('start5');
    // let result = await DB.update("userInfo", {'userId':'10005'}, { userName : "李彤" });
    // console.timeEnd('start5');
});

router.post("/doUpdate", async (ctx)=>{
    console.log(ctx.request.body);
    let id = ctx.request.body._id;
    let userName = ctx.request.body.userName;
    let userPassword = ctx.request.body.userPassword;
    let age = ctx.request.body.age;
    let sex = ctx.request.body.sex;
    console.log(id);
    console.log(userName);
    console.log(userPassword);
    console.log(age);
    console.log(sex);
    let result = await DB.update("userInfo", {_id:DB.getObjectId(id)}, {
        userName, userPassword, age, sex
    });
    console.log("result:" + result);
    ctx.redirect('/')
});


router.post("/add", async (ctx)=>{
    console.log('add');
    await ctx.render('add');
    console.time('start6');
    let result = await DB.insert("userInfo", ctx.request.body);
    console.timeEnd('start6');
    // ctx.body = ctx.request.body;
    ctx.redirect('/');
});

router.get("/add", async (ctx)=>{
    console.log('add');
    await ctx.render('add', {});
    console.time('start6');
    let result = await DB.insert("userInfo", ctx.request.body);
    console.timeEnd('start6');
    // ctx.body = ctx.request.body;
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(8100, '127.0.0.1');