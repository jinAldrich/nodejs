/**
 *
 * Created by yujin on 2018/8/30
 *
 */

const router = require('koa-router')();

router.get("/", async (ctx)=>{
    ctx.render('admin/user/index');
});
router.get("/edit", async (ctx)=>{
    ctx.render('admin/user/edit');
});
router.get("/add", async (ctx)=>{
    ctx.render('admin/user/add');
});


module.exports = router.routes();
