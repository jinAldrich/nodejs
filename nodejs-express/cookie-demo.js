/**
 *
 * Created by yujin on 2018/8/6
 *
 */
var express = require('express');
var cookieParser = require("cookie-parser");

var app = new express();

app.use(cookieParser());

app.get('/', function (req, res) {
    console.log(new Date());
    console.log('req.cookies=' + req.cookies);
    res.send('首页');
});

app.get('/news', function (req, res) {
    console.log('req.cookies=' + JSON.stringify(req.cookies));
    res.send('news');
});

app.get('/set', function (req, res) {
    //参数1：名字
    //参数2:cookie的值
    //参数3：cookie的配置信息
    res.cookie('username','cookie的值',{maxAge:60000});
    res.cookie('usernick', 'zhangsan',{maxAge:60000});
    res.cookie('page', 'set page',{maxAge:60000});
    res.send("设置cookie成功");
});

app.get('/tripe', function (req, res) {
    var city = req.query.city;

    var citys = req.cookies.citys;
    if (citys) {
        citys.push(city);
    } else {
        citys = [];
        citys.push(city);
    }
    res.cookie('citys', citys, {maxAge:60*1000});
    res.send("你浏览过的城市" + citys);
});



app.listen('8100', '127.0.0.1');