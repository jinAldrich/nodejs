var http = require('http');
var url = require('url');

http.createServer((req, resp)=>{
	console.log("--->" + req.url);
	var query = url.parse(req.url, true);
	console.log("quer1y:" + JSON.stringify(query));

   resp.writeHead(200, {'Content-type':"text/html;charset=utf-8"});
   resp.write("Hello word!!!");
   resp.write("这是我的第一个nodejs程序");
   resp.end();
}).listen(8000);

