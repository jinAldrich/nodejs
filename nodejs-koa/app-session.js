/**
 *
 * Created by yujin on 2018/8/23
 * Koa中session的使用
 */


/**
 * 1、安装
 *      npm install koa-session --save
 * 2、引入
 *      const session = require('koa-session');
 * 3、配置
        const CONFIG = {
            maxAge: 86400000,
            overwrite: true,
            httpOnly: true, // (boolean) httpOnly or not (default true)
            signed: true, // (boolean) signed or not (default true)
            rolling: false, // (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false)
            renew: false, // (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)
        };
        app.use(session(CONFIG, app));
 */

const Koa = require('koa');
const Router = require('koa-router');
const render = require('koa-art-template');
const session = require('koa-session');
const path = require('path');

const app = new Koa();
const router = new Router();

render(app, {
    root:path.join(__dirname, 'views'),
    extname:'.html',
    debug:process.env.NODE_ENV !== 'production'
});

//Session配置，以下代码就当作公式来配置
app.keys = ['some secret hurr']; /*cookie的签名*/
const CONFIG = {
    key:'koa:sess',    //默认
    maxAge: 86400000,  //Cookie的过期时间
    overwrite: true,
    httpOnly: true,    // true-只有服务器端可以访问，false-客户端和服务器端都可以访问
    signed: true,      // 签名默认 true
    rolling: false,    // 在每次请求时强行设置cookie，这将重置cookie过期时间(默认:false)，用户有操作就重新设置过期时间，过期时间重新开始计时
    renew: true,       // (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)
};
app.use(session(CONFIG, app));

router.get('/', async (ctx)=>{
    console.log(ctx.session.userInfo); //获取session
    await ctx.render('session', {
        name:'张三'
    });
});

router.get('/login', async (ctx)=>{
    ctx.session.userInfo = '张三'; //设置session
    ctx.body = "登录成功";
});


app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8100, '127.0.0.1');