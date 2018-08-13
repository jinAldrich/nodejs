/**
 *
 * Created by yujin on 2018/8/3
 *
 */

var express = require('express');/*引入express框架*/

var app = new express();/*实例化express*/


app.get('/', function (req, res) {
    res.send("你好");
});

/*静态路由*/
app.get('/news', function (req, res) {
    console.log(req.params);
    res.send("新闻");
});

/*动态路由，可以传值  http://localhost:8100/news/asdfasdf */
app.get('/news/:aaa', function (req, res) {
    console.log(req.params);
    var a = req.params.aaa;
    console.log('a=' + a);
    res.send("新闻");
});

/*获取get传值  http://localhost:8100/product?aid=1234556*/
app.get("/product" , function (req, res) {
    console.log("req.query=" + JSON.stringify(req.query)); /* req.query获取get传值 */
    console.log(req.query.aid);
    res.send("product");
});
app.listen(8100, '127.0.0.1');