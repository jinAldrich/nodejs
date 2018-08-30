/**
 *
 * Created by yujin on 2018/8/30
 *
 */

const router = require('koa-router')();

router.get("/", async (ctx)=>{
    ctx.render('admin/focus/index');
});


module.exports = router.routes();
