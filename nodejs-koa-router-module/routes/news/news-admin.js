/**
 *
 * Created by yujin on 2018/8/30
 *
 */

const router = require('koa-router')();

router.get("/", async (ctx)=>{
    ctx.render('news/admin');
});


module.exports = router.routes();
