/**
 *
 * Created by yujin on 2018/8/3
 *
 */
// import {Log} from "./Log";
var Log = require('./Log');

var express = require('express');
var bodyParser = require('body-parser')

var app = new express();

//配置body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.set('view engine', 'ejs');/*配置ejs模板引擎*/

/*使用express.static中间件*/
app.use(express.static('static'));

/*虚拟目录, '/statics'是路由， 'views/public'是静态资源目录. http://localhost:8100/statics/img/baidu.png*/
app.use('/statics',express.static('views/public'));

/*
 表示匹配任何路由
 应用级中间件
*/
app.use(function (req, res, next) {
    console.log(new Date());
    next();
});

app.use('/news', function (req, res, next) {
    console.log('app.use news路由');
    // next();
});

app.get('/', function (req, res) {
    console.log('/');
    res.send("ejs模板引擎的使用");
});

app.get('/index', function (req, res) {
    console.log('/index');
    Log.i("index---->");
    res.render('index')
});

var arr = ['111', '2222', '3333', '44444'];
app.get('/news', function (req, res, next) {
    console.log('/news');
    res.render('news', {
        list:arr
    });
    next();
});


app.get('/news', function (req, res) {
    console.log('这是路由中间件');
});

// POST /api/users gets JSON bodies
app.get('/login', function (req, res) {
    res.render('login');
    console.log(req.body);
});

app.post('/dologin', function (req, res) {
    console.log('dologin');
    console.log(req.body);
});

/*匹配所有路由，404，错误处理中间件*/
app.use(function (req, res, next) {
    console.log('404');
    res.status(404).send("这是404，表示没有路由");
});

app.listen('8100', '127.0.0.1');