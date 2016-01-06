// 加载http模块
var httpModule = require('http');
var urlModule = require('url');

// 定义导出模块
function startServer(port, route, handleDict) {
    // 回调函数
    function onRequest(request, response) {

        var url = urlModule.parse(request.url);

        var pathname = url.pathname;

        console.log('Request for ' + pathname + ' received.');

        route(handleDict, pathname);

        response.writeHead(200, {"Content-Type": 'text/plain'});
        response.write('Hello World');
        response.end();
    }

    // 创建服务
    var server = httpModule.createServer(onRequest);

    // 开始监听
    server.listen(port);

    console.log('server started. http://localhost:'+port)
}

// 导出模块
exports.startServer = startServer;