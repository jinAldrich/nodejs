/**
 *
 * Created by yujin on 2018/8/20
 * 错误处理中间件
 */

/*
  koa中间件
  中间件：匹配路由之前 或 匹配路由之后要做的一系列操作
  koa中应用使用如下几种中间件
  1、应用级中间件
  2、路由级中间件
  3、错误处理中间件
  4、第三方中间件
**/

var Koa = require("koa");
var Router = require("koa-router");


var app = new Koa();
var router = new Router();

/**
 * 无论 app.use 放在代码最上面还是尾部，执行顺序都是先执行app.use再去执行app.get
 *
 * 洋葱式执行流程，一层一层执行
 * 洋葱从里层到外层顺序：
 *           Pylons app-->Routes Middleware-->Session Middleware-->Cache Middleware-->Error Handler-->Status Code Redirect
 *
 * 请求Request:  从洋葱的  外层--->里层
 * 响应Response: 从洋葱的  里层--->外层
 */

router.get("/", async (ctx, next)=>{
    console.log("这是首页");
    ctx.body = "这是首页";
});

router.get("/news", async (ctx, next)=>{
    console.log("3 这是新闻列表页面");
    ctx.body = "这是新闻列表页面";
});

router.get("/login", async (ctx, next)=>{
    console.log("这是登录页面");
    ctx.body = "这是登录页面";
});

//错误处理中间件
app.use(async (ctx, next)=>{
    console.log("1 这是一个中间件--01");
    await next();
    if (ctx.status == '404') {
        ctx.status = 404;
        ctx.body = "这是一个 404 页面";
    } else {
        console.log(ctx.url);
    }
    console.log("4 匹配路由完成以后，又返回返回来执行中间件");
});

app.use(async (ctx, next)=>{
    console.log("2 这是一个中间件--02");
    await next();
    console.log("5 匹配路由完成以后，又返回返回来执行中间件");
});


app.use(router.routes());
app.use(router.allowedMethods());
app.listen("8100", "127.0.0.1");
