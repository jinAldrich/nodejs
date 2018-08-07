/**
 *
 * Created by yujin on 2018/8/7
 *
 */

var express = require('express');
var bodyParser = require('body-parser');

var session = require('express-session');

var SessionStore = require('express-mysql-session');
const mysqlPool = require('./mysql-pool');

var app = new express();
//配置body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//配置session
var options = {
    host: '23.105.199.23',
    port: 3306,
    user: 'yujin',
    password: '123456',
    database: 'session_test'
}
app.use(session({
    secret: 'keyboard cat',/*随便写，加密字符串*/
    name:'jsessionId',/*保存在本地cookie的一个名字，默认为connect.sid，可以不设置*/
    resave: false, /*强制保存session，即使它没有变化，默认为true*/
    saveUninitialized: true,
    cookie: {
        maxAge:60 * 60 * 1000 /*session过期时间*/
    },
    store: new SessionStore(options)
}));

app.set('view engine', 'ejs');/*配置ejs模板引擎*/

/*使用express.static中间件*/
app.use(express.static('static'));

/*拦截session过期或失效的情况*/
app.use(function (req, res, next) {
    console.log("sessionId=" + req.session.id);
    if (req.session.id) {
        next();
    } else {
        res.send("未登录");
    }
});


app.get('/', function (req, res) {
    console.log('这是首页');
    // res.send("这是首页");
    res.sendfile('./static/index222.html',{}, function (err, data) {
        console.log(err);
        console.log(data);
    })
});

app.post('/doregister', function (req, res) {

});

app.post('/login', function (req, res) {
    console.log('这是登录页');
    console.log(req.body);
});

app.get('/product', function (req, res) {
    console.log('这是商品列表页面');

});

app.get('/addProduct', function (req, res) {
    console.log('这是商品添加页面');

});

app.get("/editProduct", function (req, res) {
    console.log('这是商品编辑页面');

});

app.get('/delProduct', function (req, res) {
    console.log('这是商品删除页面');

});


app.listen(3000, '127.0.0.1');