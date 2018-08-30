/**
 *
 * Created by yujin on 2018/8/30
 * 路由模块化，将app.js里的代码抽离到不同的module.js里
 */

const Koa = require('koa');
const router = require('koa-router')();
const render = require('koa-art-template');
const path = require('path');
const bodyParser = require('koa-bodyparser');

/**
 * 引入子模块，也叫子路由，有两种写法，可以加.js后缀也可以不加
 */
var admin = require('./routes/admin.js');
var news = require('./routes/news');

var app = new Koa();

app.use(bodyParser());

render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});

router.get('/', async (ctx)=>{
    ctx.body = "这是首页";
});

/**
 * 配置子路由，也叫层级路由，下面有两种不同的写法，都可以
 */
router.use('/admin', admin.routes());
router.use('/news', news);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8100, '127.0.0.1');