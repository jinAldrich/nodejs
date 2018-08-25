/**
 *
 * Created by yujin on 2018/8/22
 * koa中静态资源中间件
 */

/**
 * 静态资源中间件，也叫静态Web服务
 * 1、安装
 *      npm install koa-static --save
 * 2、引入
 *      var static = require('koa-static');
 * 3、配置
 *      app.use(static(__dirname + 'static'));
 */

var Koa = require('koa');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');
var views = require('koa-views');
var static = require('koa-static');

var app = new Koa();
var router = new Router();

app.use(views('views', {
    extension: 'ejs'
}));

app.use(bodyParser());

/**
 * 可以配置多个静态资源中间件   http://localhost:8100/css/basic.css
 */
app.use(static(__dirname + '/static'));
app.use(static(__dirname + '/public'));
app.use(static(__dirname + '/resource'));

router.get('/', async (ctx)=>{
    ctx.render('')
});

router.post('/doAdd', async (ctx)=>{

});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8100, '127.0.0.1');