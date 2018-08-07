/**
 *
 * Created by yujin on 2018/8/6
 *
 */

var express = require('express');
var session = require('express-session');

var SessionStore = require('express-mysql-session');
var mysqlPool = require('./mysql-pool');

var pool = new mysqlPool().getPool();

var options = {
    host: '23.105.199.23',
    port: 3306,
    user: 'yujin',
    password: '123456',
    database: 'session_test'
}


var app = new express();

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

app.use(function (req, res, next) {
    console.log("sessionId=" + req.session.id);
    next();
});

app.get('/', function (req, res) {
    console.log('/');
    console.log(req.session.userinfo);
    if (req.session.userinfo) {
        res.send("您好" + req.session.userinfo + " 欢迎回来");
    } else {
        res.send("未登录");
    }
});

app.get('/login', function (req, res) {
    console.log('login');
    /*设置session*/
    req.session.userinfo = 'zhangsan111';
    res.send("登录成功");
    pool.getConnection(function (err, conn) {
        console.log("conn:" + conn);
        // conn.query("SELECT session_test FROM information_schema.TABLES WHERE table_name ='session_test';", function (err, res) {
        //     console.log("err:" + err);
        //     console.log("res:" + res);
        // });
        conn.query("SELECT * FROM userInfo;", function (err, res) {
            console.log("err:" + err);
            console.log("res:" + JSON.stringify(res));
        });
    })

});

app.get('/logout', function (req, res) {
    req.session.cookie.maxAge = 0; /*这样也可以销毁session*/
    // req.session.destroy(function (err) {/*通过destory接口销毁session*/
    //     console.log(err);
    // });
    res.send("退出登录成功");
});

// pool.getConnection(function(err,conn) {
//
//     // 查询
//     conn.query('SELECT * FROM user WHERE username=' + "\"" +req.body.username + "\"", function(err, rs) {
//         if (err) {
//             console.log('[query] - :'+err);
//             return;
//         }
//         conn.release(); // 放回连接池
//     });
// });


app.listen(8100, '127.0.0.1');