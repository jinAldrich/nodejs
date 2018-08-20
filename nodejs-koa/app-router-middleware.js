/**
 *
 * Created by yujin on 2018/8/20
 * 路由级中间件
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

router.get('/', async (ctx)=>{
    ctx.body = "这是首页";
});

/*
* 匹配到 /news 路由以后继续向下匹配
* 这就是路由级中间件
* */
router.get('/news', async (ctx, next)=>{
    console.log("这是新闻列表页--1");
    await next();
});

router.get('/news', async (ctx )=>{
    console.log("这是新闻列表页--2");
});

router.get('/login', async (ctx )=>{
    ctx.body = "这是登录页面";
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen("8100", "127.0.0.1");


