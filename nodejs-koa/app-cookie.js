/**
 *
 * Created by yujin on 2018/8/23
 *
 * cookie是存储于访问者的计算机中的变量。可以让我们用同一个浏览器访问同一个域名的时候共享数据
 *
 * HTTP 是无状态协议
 *
 */

/**
 * Cookie能做些什么
 *      1、保存用户信息
 *      2、浏览器历史记录
 *      3、猜你喜欢的商品或感兴趣的内容
 *      4、免登录功能
 *      5、多个页面之间传值
 *      6、cookie实现购物车功能
 */

/**
 *
 * ctx.cookies.set(name, value, [options])
 *
 * options名称               options 值
 *   maxAge                  一个数字表示从 Date.now() 得到的毫秒数
 *   expires                 cookie 过期的 Date
 *   path                    cookie 路径, 默认是'/'
 *   domain                  cookie 域名
 *   secure                  安全 cookie 默认 false，设置成 true 表示 只有 https 可以访问
 *   httpOnly                是否只是服务器可访问 cookie, 默认是true
 *   overwrite               一个布尔值，表示是否覆盖以前设置的同名 的 cookie (默认是 false). 如果是 true, 在同 一个请求中设置相同名称的所有 Cookie(不 管路径或域)是否在设置此 Cookie 时从 Set-Cookie 标头中过滤掉
 */

const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const render = require('koa-art-template');
const path = require('path');


var app = new Koa();
var router = new Router();

render(app, {
    root:path.join(__dirname, 'views'),
    extname:'.html',
    debug:process.env.NODE_ENV !== 'production'
});

app.use(async (ctx, next)=>{
    console.log(ctx.request.url);
    await next();
});

router.get('/', async (ctx)=>{
    ctx.cookies.set('userInfo', 'zhangsan', {
        maxAge: 60 * 1000 * 60,
        httpOnly:false //true-只有服务器端可以访问，false-客户端和服务器端都可以访问
    });

    await ctx.render('cookie', {
        name:'zhangsan'
    });
});


router.get('/news', async (ctx)=>{
    var userInfo = ctx.cookies.get('userInfo');
    console.log(userInfo);
    await ctx.render('cookie', {
        name:userInfo
    });
});


router.get('/shop', async (ctx)=>{
    var userInfo = ctx.cookies.get('userInfo');
    console.log(userInfo);
    await ctx.render('cookie', {
        name:userInfo
    });
    ctx.body = '这是一个商品页面';
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8100, '127.0.0.1');
