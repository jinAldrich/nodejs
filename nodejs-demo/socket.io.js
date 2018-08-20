/**
 *
 * Created by yujin on 2018/8/13
 *
 */

const http = require('http');
const io = require('socket.io');

//1.创建http的服务
let httpServer = http.createServer();
httpServer.listen(8080);

//2.创建socket的服务，因为WebSocket协议是基于http协议的，是对http协议存在的缺陷的改进，
// websocket是双工的，前端给后端发，后端也给前端发，这在ajax年代是不可想象的
// websocket是非常好的一个东西，可以实现过去一些无法想象的东西

let wsServer = io.listen(httpServer);

wsServer.on('connection', function (sock) {
    sock.on('a', function (num1, num2) {
        console.log(`接收到了浏览器发送的数据：${num1}, ${num2}`);
    });
    //第隔0.5秒给前端发送一条数据
    setInterval(()=>{
        sock.emit("b", Math.random());

    }, 500);

    
});