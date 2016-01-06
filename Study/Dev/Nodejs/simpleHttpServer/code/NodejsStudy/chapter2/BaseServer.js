// 加载http模块
var http = require("http");

// 回调函数
function onRequest(request, response) {

    console.log('request received.');

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
}

// 创建服务
var server = http.createServer(onRequest);

var port = 8888;
// 开始监听
server.listen(port);

console.log('server started. httpModule://localhost:'+port);