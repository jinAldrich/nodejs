/**
 *
 * Created by yujin on 2018/8/22
 * koa中art-template模板引擎的使用
 */

/**
 * 常见的模板引擎
 *  1、jade/pug           速度：51ms
 *  2、ejs           速度：141ms
 *  3、nunjucks      速度：？？？
 *  4、art-template  速度：25ms 简约超快的模板引擎，比ejs快好多倍
 */

/**
 * 1、安装
 *      npm install art-template --save
 *      npm install koa-art-template --save
 * 2、配置
 *      render(app, {
 *          root:path.join(_dirname, 'views'), //视图的位置
 *          extname:'.art',
 *          debug:process.env.NODE_ENV !== 'production'
 *      });
 *      
 *  3、官网：http://aui.github.io/art-template/zh-cn/docs/syntax.html
 */

const Koa = require('koa');
const Router = require('koa-router');
const render = require('koa-art-template');
const path = require('path');

const app = new Koa();
var router = new Router();

render(app, {
    root:path.join(__dirname, 'views'),
    extname:'.html',
    debug:process.env.NODE_ENV !== 'production'
});


router.get('/', async (ctx)=>{
    let list = {
        name:'zhangsan'
    };
    let arr = ['1111', '22222', '33333', '444444'];
    await ctx.render('index', {
        list:list,
        num:10,
        arr:arr
    });
});

router.get('/news', async (ctx)=>{
    await ctx.render('index');
});


app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8100, '127.0.0.1');