/**
 *
 * Created by yujin on 2018/8/30
 *
 */

const router = require('koa-router')();
const detail = require('./news/news-detail');
const list = require('./news/news-list');
const admin = require('./news/news-admin');

router.get("/", async (ctx)=>{
    ctx.body = "这是新闻首页"
});

router.use('/detail', detail);
router.use('/list', list);
router.use('/admin', admin);

module.exports = router.routes();