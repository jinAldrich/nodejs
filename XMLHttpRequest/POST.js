/**
 *
 * Created by yujin on 2018/8/7
 *
 */
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var data = JSON.stringify({
    "username": "zhangsan",
    "password": "123456"
});
var xhr = new XMLHttpRequest();
xhr.open("POST", "http://localhost:3000/login");
xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(data);