/**
 *
 * Created by yujin on 2018/8/21
 * koa ejs模板引擎
 */



/*
* ejs模板引擎的使用
*
*   1、npm install koa-views --save
*   2、npm install ejs --save
*   3、var views = require('koa-views');
*   4、app.use(views(__dirname, {extension:'ejs'}));
*   5、await ctx.render('index');
*
* 注意：
*   需要在每一个路由的render里都要渲染一个公共数据，若每个都写，成千上百个路由需要写上百次，可以把公共的东西抽出来写成下面这样子
*   ctx.state = {
*       session:this.session,
*       title:'app'
*   }
*/

var Koa = require("koa");
var Router = require('koa-router');
var views = require('koa-views');

var app = new Koa();
var router = new Router();

//配置中间件，第三方中间件
app.use(views('views', {
    extension: 'ejs'
}));

/**
 * 所有ejs模板公用的数据
 */
app.use(async (ctx, next)=>{
    ctx.state = {
        title:"这是公共的数据"
    }
    await next();/* 继续向下匹配路由，一定要在next前面加await */
})

router.get("/", async (ctx)=>{
    await ctx.render('index', {
        title:'你好ejs'
    });
});

router.get("/news", async (ctx)=>{
    // ctx.body = "这是新闻列表页面";

    let arr = ["朝闻天下", "新闻联播", "晚间新闻", "人民日报"];
    let content = `<h2>这是一个h2标签</h2>`;
    let num = 123;
    await ctx.render("news", {
        list: arr,
        content: content,
        num: num
    })
});

router.get("/login", async (ctx)=>{
    // ctx.body = "这是新闻列表页面";

    await ctx.render("login")
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8100, '127.0.0.1');