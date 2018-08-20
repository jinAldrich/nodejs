/**
 *
 * Created by yujin on 2018/8/20
 * 应用级中间件
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

var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();
var router = new Router();


app.use(async (ctx, next)=>{
    // ctx.body = "这是一个中间件";
    console.log(new Date());
    await next();       /*  当前路由匹配完成后继续向下匹配*/
});

router.get("/", async (ctx)=>{
    ctx.body = "这是首页";
});

router.get("/news", async (ctx)=>{
    ctx.body = "新闻列表页面";
});

router.get('/login', async (ctx)=>{
    ctx.body = "这是登录页面";
});


//配置路由，将app与router关联
app.use(router.routes());
app.use(router.allowedMethods());
app.listen("8100", '127.0.0.1');