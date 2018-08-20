/**
 *
 * Created by yujin on 2018/8/13
 *
 */

var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

//配置路由，ctx包含了req和res等信息
router.get("/", async(ctx)=> {
	ctx.body = "首页";/*类似与原生里的res.writeHead res.end()*/

}).get("/news", async(ctx)=>{
	ctx.body = "这是一个新闻页面";
});;

//中间件：匹配路由之前 或 匹配路由之后要做的一系列操作
app.use(async(ctx)=>{
   ctx.body = '您好koa!';
});


//启动路由
app.use(router.routes())/*启动路由*/
   .use(router.allowedMethods()); /*可以配置也可以不配置，建议配置*/


//Get传值
// router.get("/newscontent", async(ctx)=>{
// 	//从ctx中读取get传值  http://localhost:8100/newscontent?aid=123&aaid=456
//     console.log(ctx.query);                 /* { aid: '123', aaid: '456' } */
//     console.log(ctx.querystring);           /*  aid=123&aaid=456  */
//
// 	//从ctx里面的request里面获取get传值
//     console.log(ctx.url);                   /*  /newscontent?aid=123&aaid=456  */
//     console.log(ctx.request.url);           /*  /newscontent?aid=123&aaid=456  */
//     console.log(ctx.request.query);         /*  { aid: '123', aaid: '456' }  */
//     console.log(ctx.request.querystring);   /*  aid=123&aaid=456  */
//
//     ctx.body = "这是新闻内容页面";
// });


//动态路由
router.get("/newscontent/:aid", async(ctx)=>{  /*  http://localhost:8100/newscontent/xxx  */
    console.log(ctx.params); 		/*  获取动态路由的返回值  { aid: 'xxx' } */
    ctx.body = "这是新闻内容页面";
});
//动态路由 传多个值
router.get("/newscontent/:aid/:cid", async(ctx)=>{
    console.log(ctx.params); 		/*  获取动态路由的返回值  { aid: '123', cid: '456' } */
    ctx.body = "这是新闻内容页面";
});




app.listen('8100', '127.0.0.1');