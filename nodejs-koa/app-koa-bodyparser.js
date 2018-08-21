/**
 *
 * Created by yujin on 2018/8/21
 * koa post提交数据
 * 两种方式：
 *         1、原生Nodejs获取post数据
 *         2、koa中koa-bodyparser中间件获取
 */

var Koa = require('koa');
var Router = require('koa-router');
var views = require('koa-views');
var bodyParser = require('koa-bodyparser');
var common = require('./module/common');

var app = new Koa();
var router = new Router();

//配置了它就不能用原生Nodejs获取post提交的数据了，只能用bodyparser中间件获取了
app.use(bodyParser());

/**
 * 所有ejs模板公用的数据
 */
app.use(async (ctx, next)=>{
    ctx.state = {
        title:"这是公共的数据"
    }
    await next();/* 继续向下匹配路由，一定要在next前面加await */
})

//配置中间件，第三方中间件
app.use(views('views', {
    extension: 'ejs'
}));

router.get('/', async (ctx)=>{
    await ctx.render('index', {
        title:'你好ejs'
    });
});

//接收form表单post提交的数据
router.post('/doAdd', async (ctx)=>{
    //原生Nodejs在Koa中获取表单提交的数据
    // var data = await common.getPostData(ctx);
    // console.log(data); //username=yujin%40sengled.com&password=123456
    // ctx.body = data;

    /**
     * bodyParser中间件在Koa中获取表单提交的数据
     * 1、npm install koa-bodyparser
     * 2、引入 var bodyParser = require('koa-bodyparser');
     * 3、app.use(bodyParser);
     * 4、ctx.request.body;
     */
    console.log(ctx.request.body);
    ctx.body = ctx.request.body; //{ username: 'yujin@sengled.com', password: '123456' }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8100, '127.0.0.1');