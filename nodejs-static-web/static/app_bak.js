var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var mysql      = require('mysql');

console.log('mysql：' + mysql);

var connection = mysql.createConnection({
    host     : '23.105.199.23',
    user     : 'yujin',
    password : '123456',
    database : 'test'
});
connection.connect();
console.log('connection：' + connection);


var id = 0;
http.createServer((req, res)=>{
    console.log("--->" + req.url);

    if (req.url == '/login') {
        console.log("000000000");
        res.writeHead(200, { 'Content-Type': 'text/html'})
        fs.readFile('./html/login.html','utf8', function(err, data) {
            console.log("11111111");
            if (err) {
                console.log(err);
                throw err
            }
            res.end(data)
        })
    } else if (req.url == '/css/login.css') {
        res.writeHead(200, { 'Content-Type': 'text/css'})
        fs.readFile('./css/login.css','utf8', function(err, data) {
            console.log("11111111");
            if (err) {
                console.log(err);
                throw err
            }
            res.end(data)
        })
    } else if (req.url == '/js/login.js') {
        res.writeHead(200, { 'Content-Type': 'text/js'})
        fs.readFile('./js/login.js','utf8', function(err, data) {
            console.log("11111111");
            if (err) {
                console.log(err);
                throw err
            }
            res.end(data)
        })
    } else if (req.url == '/register.html') {
        res.writeHead(200, { 'Content-Type': 'text/html'})
        fs.readFile('./html/register.html','utf8', function(err, data) {
            console.log("11111111");
            if (err) {
                console.log(err);
                throw err
            }
            res.end(data)
        })
    } else if (req.url == '/js/register.js') {
        res.writeHead(200, { 'Content-Type': 'text/js'})
        fs.readFile('./js/register.js','utf8', function(err, data) {
            console.log("11111111");
            if (err) {
                console.log(err);
                throw err
            }
            res.end(data)
        })
    } else if (req.url == '/css/register.css') {
        res.writeHead(200, { 'Content-Type': 'text/css'})
        fs.readFile('./css/register.css','utf8', function(err, data) {
            console.log("11111111");
            if (err) {
                console.log(err);
                throw err
            }
            res.end(data)
        })
    } else if (req.url == '/doregister') {
        console.log('---doregister---');
        var data = '';
        req.on('data', function (chunk) {
            console.log('----data-----');
            data += chunk;
            console.log('----chunk-----' + data);
        });
        req.on('end', function () {
            console.log('----end-----' + data);
            var tempObj = JSON.parse(data);
            var userAddSql = 'INSERT INTO user(username,pwd) VALUES(?,?)';

            var userAddSql_Params = [tempObj.email, tempObj.pwd];
            connection.query(userAddSql, userAddSql_Params, function (error, result) {
                if(error){
                    console.log('[INSERT ERROR] - ',error.message);
                    return;
                }
                console.log('--------------------------INSERT----------------------------');
                console.log('INSERT ID:',result);
                console.log('-----------------------------------------------------------------\n\n');
                res.end(null);
            });
        });
    } else {
        res.end(null)
    }
}).listen(8000);



