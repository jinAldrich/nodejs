/**
 *
 * Created by yujin on 2018/8/30
 *
 */

var router = require('koa-router')();
var userRouter = require('./admin/user');
var focusRouter = require('./admin/focus');

router.get("/", async (ctx)=>{
    ctx.body = "这是后台管理首页"
});


router.use('/user', userRouter);
router.use('/focus', focusRouter);

module.exports = router;

